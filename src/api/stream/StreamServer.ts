/**
 * ===========================
 * ParadigmCore: Blind Star
 * @name StreamServer.ts
 * @module src/api/stream
 * ===========================
 *
 * @author Henry Harder
 * @date (initial)  05-February-2019
 * @date (modified) 06-February-2018
**/

/*
NOTES:
1. Should store latest data in memory
2. Trigger events for new blocks to update connected clients
3. Check if block.txs !== null, if so parse and process
4. Update necessary clients with new orders
5. To start, have two subscribe options:
  - New Blocks (and just header data: height, hash, etc.)
  - Orders (will transmit upon each non-empty block)
6. Look into heartbeat message
*/

// request class
import { JsonRequest as Request } from "./JsonRequest";
import { JsonResponse as Response } from "./JsonResponse";

// request/response schemas
import * as api from "./api.json";

// third-party and stdlib imports
import * as WebSocket from "ws";
import { setInterval } from "timers";
import { EventEmitter } from "events";

/**
 * ParadigmCore Stream Server, built to be JSONRPC-2.0 compliant.
 * 
 * Allow access to various state events and blockchain data (WIP).
 */
export class StreamServer {

    // STATIC

    /** StreamAPI request/method definitions. */
    public static api: IStreamAPI = api;

    // ABCI RELATED

    /** Client connection to the Tendermint ABCI server. */
    private abciConn: WebSocket;

    /** ABCI server URI/L (supplied during construction). */
    private abciURL: URL;

    /** Number of times to try to reconnect to ABCI upon closure. */
    private retryTimeout: number;

    /** Counts the number of attempts made during re-connection. */
    private retryCounter: number;

    /** Interval (in ms) between ABCI reconnect attempts. */
    private retryInterval: number;

    // STREAM SERVER

    /** WebSocket server instance. */
    private server: WebSocket.Server;

    /** Port to serve StreamAPI on. */
    private port: number;

    /** Host to bind StreamServer to, defaults to 'localhost' */
    private host: string;

    /** Client tracking object. */
    private clients: ClientMap;

    // EMITTERS, ETC.

    /** EventEmitter to track new block messages from ABCI connection. */
    private newBlockEmitter: EventEmitter;

    /**
     * Instantiate a StreamServer.
     * 
     * @param options see 'StreamServerOptions' type definition/docs.
     */
    constructor(options: StreamServerOptions) {
        this.abciURL = new URL(options.abciURL);

        // set number of times to try to reconnect ABCI WS
        this.retryTimeout = options.retryTimeout || 5; // || options.maxRetry
        this.retryInterval = 1000; // || options.retryInterval

        // init counter to o (used during reconnecting processes)
        this.retryCounter = 0;

        // create empty obj for client map
        this.clients = {};

        // server options
        this.port = options.port;
        this.host = options.host || "localhost";
    }

    /**
     * Start StreamServer; connect to the ABCI server over WebSocket, and start
     * the StreamAPI server.
     * 
     * @param timeout number of times to attempt ABCI connection.
     */
    public async start(timeout: number = 2000): Promise<void> {
        try {
            // connect to ABCI server over WS
            const res = await this.connectAbci(timeout);
            console.log(`Connected Response: ${res}`);

            // start stream server
            const options = {
                host: this.host,
                port: this.port,
            };

            this.setupServer(options);

            // setup emitters
            this.newBlockEmitter = new EventEmitter();
            this.newBlockEmitter.on("newBlock", (blockData) => {
                console.log("got new block");
            });
        } catch (err) {
            throw new Error(`Failed to start: ${err}`);
        }
        return;
    }

    /**
     * Setup and configure the StreamAPI WebSocket server (and handlers).
     * 
     * @param options WebSocket server options (see 'ws' docs)
     */
    private setupServer(options) {
        this.server = new WebSocket.Server(options);
        this.server.on("connection", this.newConnHandlerWrapper());
    }

    /**
     * Returns a function to be used as the new connection handler.
     * 
     * Exists as a wrapper to carry over 'this' into handler scope.
     */
    private newConnHandlerWrapper(): (c: WebSocket) => void {
        return (conn: WebSocket) => {
            conn.once("message", (msg: string) => {
                let res;
                const req = new Request(msg);
                const error = req.validate();

                if (!error) {
                    const reqJSON = req.toJSON();
                    this.handleNewClient(conn, reqJSON);
                } else {
                    res = new Response({ error });
                    conn.send(JSON.stringify(res));
                }
            });
        }
    }

    private handleClientRequest(conn: WebSocket): (m: string) => void {
        return (msg: string) => {
            let res;
            const req = new Request(msg);
            const error = req.validate();

            if (!error) {
                const reqJSON = req.toJSON();
                this.handleNewClient(conn, reqJSON);
            } else {
                res = new Response({ error });
                conn.send(JSON.stringify(res));
            }
        }
    }

    /**
     * Handler for new client connections.
     * @todo
     * 
     * @param conn connection instance
     * @param req connection request object
     */
    private handleNewClient(conn: WebSocket, req: IParsedRequest): void {
        let res;
        const { id, method, params } = req;
        if (this.clients.hasOwnProperty(id)) {
            const error = {
                code: "-32602",
                message: "Please pick a different 'id'."
            }
            res = new Response({ error });
        } else {
            this.clients[id] = {
                conn, 
                method,
                params,
            }

            this.newBlockEmitter.on("newBlock", (blockData) => {
                const res = new Response({
                    id,
                    result: blockData
                });
                this.sendMessageToClientByConn(conn, res);
            });

            const result = "session initiated.";
            res = new Response({ id, result });
        }
        this.sendMessageToClientByConn(conn, res);
    }

    /**
     * Send a JSON response to a client identified by connection object.
     * 
     * @param conn the socket instance
     * @param res a JsonResponse object
     */
    private sendMessageToClientByConn(conn: WebSocket, res: Response) {
        // @todo make sure to properly handle disconnects
        if(conn.readyState !== conn.OPEN) { return; }
        conn.send(JSON.stringify(res));
        return;
    }

    /**
     * Trigger a series of attempts to connect to the WebSocket ABCI endpoint.
     * 
     * @param timeout number of times to attempt connection
     */
    private connectAbci(timeout: number): Promise<string> {
        console.log(`Attempting to connect ${timeout} time(s) every ${this.retryInterval} ms...`);
        
        // attempt to connect until timeout reached
        return new Promise((resolve, reject) => {
            // reject if fails within timeoutS
            const timer = setInterval(() => {
                console.log('trying');
                if (this.retryCounter > timeout) {
                    reject("Connection timeout.");
                }
                if (this.abciConn && this.abciConn.listeners.length > 0) {
                    this.abciConn.removeEventListener("open");
                }
                this.attemptConnection(resolve, reject, timer);
            }, this.retryInterval);
        });
    }

    /**
     * Attempt an individual connection to the ABCI server.
     * 
     * @param resolve resolve handler from timeout promise
     * @param reject reject handler from timeout promise
     * @param timer the interval timer object currently in use
     */
    private attemptConnection(resolve: Function, reject: Function, timer): void {
        this.retryCounter++;
        this.abciConn = new WebSocket(this.abciURL.href);
        // this.abciConn.removeAllListeners();

        // if it fails just try again (until timeout)
        this.abciConn.on("error", () => null);

        // attach one-off open handler to resolve upon connect
        this.abciConn.once("open", () => {
            console.log("connect");
            // attach new handlers, and re-subscribe
            this.attachHandlersABCI();
            this.subscribeToNewBlock();
            
            // resolve upon success
            clearInterval(timer);
            const num = this.retryCounter;
            this.retryCounter = 0;
            resolve(`Connected after ${num} attempts.`);
        });
    }

    /**
     * Attach handlers to a successful ABCI socket connection emitter.
     * 
     * @param timeout number of times to attempt re-connection on socket drop
     */
    private attachHandlersABCI(timeout: number = 2000): void {
        // clear listeners
        this.abciConn.removeAllListeners();

        // general error handler
        this.abciConn.on("error", this.clientErrorHandler);

        // message handler wrapper
        this.abciConn.on("message", (data) => {
            this.clientMessageHandlerABCI(data);
        });

        // close connection handler wrapper
        this.abciConn.once("close", this.fatalCloseHandlerWrapper(timeout));
    }

    /**
     * Handler for a failed n(th) reconnect attempt.
     * 
     * This method is important as it is the logic that is executed when it is 
     * determined reconnecting to Tendermint is impossible (via ABCI drop).
     * 
     * @param timeout number of times to attempt final connection
     */
    private fatalCloseHandlerWrapper(timeout: number): () => void {
        return async () => {
            try {
                console.log(`Connection lost, attempting to reconnect...`)
                await this.connectAbci(timeout); // todo make configurable
            } catch (err) {
                console.log(err);
                console.log("Fatal, failed to reconnect to ABCI server.");

                // TODO: don't kill the process from here
                process.exit(1);
            }
        }
    }

    /**
     * Will be the error handler for client (and ABCI?) errors.
     * @todo implement.
     * 
     * @param msg error message from client
     */
    private clientErrorHandler(msg: string): void {
        console.log(`error from client connection: ${msg}`);
    }

    /**
     * Handles incoming data from ABCI WebSocket connection.
     * 
     * @param data received data from ABCI WebSocket connection.
     */
    private clientMessageHandlerABCI(data: any): void {
        const parsed = JSON.parse(data);
        if (parsed.id !== "main#event") { console.log(parsed.id); return; }

        // general parsing
        const type = parsed.result.data.type
        const res = parsed.result.data.value;

        // take action depending on event type
        switch (type) {
            case "tendermint/event/NewBlock": {
                this.newBlockHandler(res);
                break;
            }

            default: {
                console.log("No action.");
                break;
            }
        }
        
    }

    /**
     * Convert an ISO date string to a UNIX timestamp string.
     * 
     * @param isoDate an ISO date string
     */
    private getUnixTimeFromISO(isoDate: string): string {
        const date = new Date(isoDate);
        const rawUnixTimeMs = date.getTime();
        const outputUnixTime = Math.round(rawUnixTimeMs);
        return outputUnixTime.toString();
    }

    /**
     * Handler for new block events.
     * 
     * @param data event message/data
     */
    private newBlockHandler(data: any): void {
        const { header } = data.block;

        // pull values
        const lastBlockHeight = header.height
        const lastBlockUnixTime = this.getUnixTimeFromISO(header.time);
        const lastBlockAppHash = header.app_hash;
        const lastBlockDataHash = header.data_hash;
        const lastBlockProposer = header.proposer_address;
        const txCount = header.num_txs;

        // build response object
        const outputObject = {
            lastBlockHeight,
            lastBlockUnixTime,
            lastBlockAppHash,
            lastBlockDataHash,
            lastBlockProposer,
            txCount,
        }

        // emit event with data
        this.newBlockEmitter.emit("newBlock", outputObject);

        // for now, just log the object
        // console.log(`\n${JSON.stringify(outputObject, null, 2)}`);
        return;
    }

    /**
     * Subscribes to the "NewBlock" event over the ABCI server.
     * 
     * @todo move subscribe options somewhere else 
     */
    private subscribeToNewBlock(): void {
        // return if not ready to receive data
        if (this.abciConn.readyState !== 1) return;

        // subscribe options
        const subscribeOptions = {
            "method":"subscribe",
            "jsonrpc":"2.0",
            "params":["tm.event='NewBlock'"],
            
            // indicate primary connection ID
            "id":"main"
        };

        // send subscribe message
        this.abciConn.send(JSON.stringify(subscribeOptions));
        return;
    }

    // public funcs below

    /**
     * Returns the connection state of the ABCI WebSocket connection.
     */
    public getAbciReadyState(): number {
        return this.abciConn.readyState;
    }
}
