/**
 * ===========================
 * ParadigmCore: Blind Star
 * @name StreamServer.ts
 * @module src/api/stream
 * ===========================
 *
 * @author Henry Harder
 * @date (initial)  05-February-2019
 * @date (modified) 08-February-2018
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

7. add filters
8. add ability to select compressed or uncompressed tx's
*/

// request class
import { JsonRequest as Request } from "./JsonRequest";
import { JsonResponse as Response } from "./JsonResponse";

// request/response schemas
import * as api from "./api.json";

// paradigmcore common imports
import { log, warn, err } from "../../common/log";

// third-party and stdlib imports
import * as WebSocket from "ws";
import * as zlib from "zlib";
import { setInterval } from "timers";
import { EventEmitter } from "events";

/**
 * ParadigmCore Stream Server, built to the JSONRPC-2.0 specification.
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
    
    /** Session ID string for ABCI WebSocket connection. */
    private abciSessionId: string;

    /** ABCI server URI/L (supplied during construction). */
    private abciURL: URL;

    /** 
     * The latest data from the ABCI server, updated each time a new block is
     * committed. 
     * 
     * @todo create interface def.
     **/
    private latestAbciData: any;

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

    private connections: ConnectionMap;

    // EMITTERS, ETC.

    /** EventEmitter to track new block messages from ABCI connection. */
    private newBlockEmitter: EventEmitter;

    /**
     * Instantiate a StreamServer.
     * 
     * @param options see 'StreamServerOptions' type definition/docs.
     */
    constructor(options: StreamServerOptions) {
        // validate URL
        this.abciURL = new URL(options.abciURL);
        this.abciSessionId = null;
        this.latestAbciData = null;

        // set number of times to try to reconnect ABCI WS upon conn drop
        this.retryTimeout = options.retryTimeout || 25;

        // set delay between attempts (in ms)
        this.retryInterval = options.retryInterval || 1000;

        // init counter to o (used during reconnecting processes)
        this.retryCounter = 0;

        // create empty obj for client map
        this.clients = {};
        this.connections = {}

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
    public async start(timeout): Promise<void> {
        try {
            // connect to ABCI server over WS
            const res = await this.connectAbci(timeout);
            console.log(`Connected Response: ${res}`);

            // start stream server
            const options = {
                host: this.host,
                port: this.port,
            };

            // initialize the RPC server (public api)
            this.setupServer(options);

            // setup emitters
            this.newBlockEmitter = new EventEmitter();
        } catch (err) {
            throw new Error(`Failed to start: ${err}`);
        }
        return;
    }

    // ACTUALLY SERVER RELATED
    //  - Client class

    // ABCI CONNECTION RELATED

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

            // handles messages from the client
            // @todo - move to method, make more meaningful hash/id etc
            const id = `id${Math.floor((Math.random() * 90000) + 10000)}`

            this.connections[id] = conn;

            conn.on("message", this.handleClientMessageWrapper(id));

            /*
            @todo implement following and others (?)
            conn.on("close"
            conn.on("error"
            */
        }
    }

    // @todo implement, generalize 'newConnHandlerWrapper' further?
    // @id is server-side
    private handleClientMessageWrapper(ssID: string): (m: string) => void {
        return (msg: string) => {
            let res;
            const req = new Request(msg);
            const error = req.validate();

            // respond with val error, if present
            if (error) {
                res = new Response({ error });
                this.sendMessageToClient(ssID, res);
                return;
            } 

            // is new client if ID is not found in mapping already
            switch (req.parsed.method) {
                case "session.start": {
                    this.handleNewSession(ssID, req.parsed);
                    return;
                }
                case "session.end": {
                    // @ todo require the session to have been started
                    this.connections[ssID].close();
                    return;
                }

                // this is an irresponsible hack. make better asap.
                case "subscription.start": {
                    this.newBlockEmitter.on("newBlock", (data) => { 
                        const res = new Response({
                            id: req.parsed.id,
                            result: data.txs
                        });
                        this.sendMessageToClient(ssID, res);
                    });
                }
                default: {
                    warn("api", `unknown method '${req.parsed.method}' call from: '${req.parsed.id}'`);
                    return;
                }
            }
        }
    }

    private getPseudoRandomSessionId(): string {
        const msFromTime = Date.now().toString().slice(-4).toString();
        const randomInts = Math.floor((Math.random() * 9000) + 1000).toString();
        return `${msFromTime}${randomInts}`
    }

    /**
     * Handler for new client connections.
     * @todo remove hard-coded stuff
     * 
     * @param ssID server-side connection id
     * @param req connection request object
     */
    private handleNewSession(ssID: string, req: IParsedRequest): void {
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
                conn: this.connections[ssID],
                ssID, 
                method,
                params,
            }

            const result = `session ${id} starting. End with 'session.end' method.`;
            res = new Response({ id, result });
            log("api", `new client added with id: '${id}'`);
        }
        this.sendMessageToClient(ssID, res);
    }
    

    /**
     * Send a JSON response to a client identified by server-side ID string.
     * 
     * @param ssID the server-side client ID string
     * @param res a JsonResponse object
     */
    private sendMessageToClient(ssID: string, res: Response) {
        // @todo make sure to properly handle disconnects
        const conn = this.connections[ssID];
        if (!conn) return;
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

                // attempt to connect to ABCI client 'timeout' times
                if (this.retryCounter > timeout) {
                    reject("Connection timeout.");
                }

                // clear old listeners before trying again (avoid dup conn.)
                if (this.abciConn && this.abciConn.listeners.length > 0) {
                    this.abciConn.removeEventListener("open");
                }

                this.attemptConnection(resolve, timer);

                // this.retryInterval can be configured upon construction
            }, this.retryInterval);
        });
    }

    /**
     * Attempt an individual connection to the ABCI server.
     * 
     * @param resolve resolve handler from timeout promise
     * @param timer the interval timer object currently in use
     */
    private attemptConnection(resolve: Function, timer): void {
        this.retryCounter++;
        this.abciConn = new WebSocket(this.abciURL.href);
        // this.abciConn.removeAllListeners();

        // if it fails just try again (until timeout)
        this.abciConn.on("error", () => null);

        // attach one-off open handler to resolve upon connect
        this.abciConn.once("open", () => {

            // attach new handlers, and re-subscribe
            this.attachHandlersABCI();

            // subscribe to 'NewBlock' Tendermint events
            this.subscribeToParadigmCoreEvent("NewBlock");
            
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
        // @todo validate message data-type
        this.abciConn.on("message", (data: string) => {
            this.handleNewABCIMessage(data);
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
                // @todo remove
                process.exit(1);
            }
        }
    }

    /**
     * Will be the error handler for client (and ABCI?) errors.
     * @todo implement.
     * 
     * @param msg error message from client connection
     */
    private clientErrorHandler(msg: string): void {
        console.log(`error from client connection: ${msg}`);
    }

    /**
     * Handles incoming data from ABCI WebSocket connection.
     * 
     * @param data received data from ABCI WebSocket connection.
     */
    private handleNewABCIMessage(data: string): void {
        const parsed = JSON.parse(data);

        // ignore ABCI messages that are not events (temporary?)
        // @todo investigate later?
        if (parsed.id !== `${this.abciSessionId}#event`) {
            return;
        }

        // general parsing
        const type = parsed.result.data.type
        const res = parsed.result.data.value;

        // take action depending on event type
        // @todo avoid hard-code
        switch (type) {
            case "tendermint/event/NewBlock": {
                this.newBlockHandler(res);
                break;
            }

            default: {
                warn("api", "received non-implemented ABCI response message type.");
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
     * Decode and decompress a raw encoded/compressed tx array.
     */
    private decodeTxArr(txs: string[]): string[] {
         // check if empty
         if (txs.length <= 0) { return txs; }

         // decode/decompress txs
         return txs.map((tx) => {
            let inBuff: Buffer; // input buffer
            let dcBuff: Buffer; // decompressed buffer
            let outStr: string; // decoded string
    
            try {
                inBuff = Buffer.from(Buffer.from(tx, "base64").toString("utf8"), "base64");
                dcBuff = zlib.inflateSync(inBuff);
                outStr = dcBuff.toString("utf8");
            } catch (error) {
                warn("api", "error decoding transaction from block.");
                return tx;
            }

            // return json string
            return outStr;
         });
    }

    /**
     * Handler for new block events.
     * 
     * @param data event message/data
     */
    private newBlockHandler(res: any): void {
        // destructure block data (header and body)
        const { header, data } = res.block;

        // build response object
        const abciData = {
            // blockchain data from tendermint
            lastBlockHeight: header.height,
            lastBlockUnixTime: this.getUnixTimeFromISO(header.time),
            lastBlockDataHash: header.data_hash ? header.data_hash : null,
            lastBlockProposer: header.proposer_address,
            
            // paradigm-core data via abci
            txs: data.txs ? this.decodeTxArr(data.txs) : [],
            txCount: header.num_txs,
            lastBlockAppHash: header.app_hash,
        }

        // emit event with block data
        this.latestAbciData = abciData;
        this.newBlockEmitter.emit("newBlock", abciData);
        return;
    }

    /**
     * Subscribes to the "NewBlock" event over the ABCI server. The option to
     * provide a `fullParam` allows subscriptions to arbitrary tags/events in
     * the Tendermint chain.
     * 
     * @param name the name of the tendermint ABCI event to subscribe to
     * @param fullQuery if supplied, will replace `params[0]` in JSONRPC req.
     * 
     * @todo move subscribe options somewhere else
     * @todo define valid tm event (name param)
     */
    private subscribeToParadigmCoreEvent(eventName: string, fullParam?: string): void {
        // TEMPORARY
        // @todo remove line below (eventually)
        if (eventName !== "NewBlock") { 
            console.log("DEV: temporarily ignoring non 'NewBlock' event.");
            return;
        }

        // return if not ready to receive data
        if (this.abciConn.readyState !== 1) return;

        // pick a random-ism session id string
        if (this.abciSessionId !== null) {
            this.abciSessionId = this.getPseudoRandomSessionId();
        }

        // use fullParam as param if provided
        const param = fullParam ? fullParam : `tm.event='${eventName}'`;

        // subscribe options
        const subscribeOptions = {
            method: "subscribe",
            jsonrpc: "2.0",
            params: [param],
            
            // indicate primary connection ID
            id: this.abciSessionId,
        };

        // send subscribe message
        this.abciConn.send(JSON.stringify(subscribeOptions));
        return;
    }

    // PUBLIC FUNCTIONS BELOW

    /**
     * Returns the connection state of the ABCI WebSocket connection.
     */
    public getAbciReadyState(): number {
        return this.abciConn.readyState;
    }
}
