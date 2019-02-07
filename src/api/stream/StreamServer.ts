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

export class StreamServer {
    // STATIC
    public static api: IStreamAPI = api;

    // connection to abci ws server
    private abciConn: WebSocket;
    private abciURL: URL;

    // client config
    private retryTimeout: number;
    private retryCounter: number;

    // server options
    private server: WebSocket.Server;
    private port: number;
    private host: string;
    public clients: Set<any>;

    constructor(options: StreamServerOptions) {
        this.abciURL = new URL(options.abciURL);

        // set number of times to try to reconnect ABCI WS
        this.retryTimeout = 5; // || options.maxRetry
        this.retryCounter = 0;

        // server options
        this.port = options.port;
        this.host = options.host || "localhost";
    }

    public async start(timeout: number = 2000): Promise<void> {
        try {
            // connect to ABCI server over WS
            //const res = await this.connectAbci(timeout);
            //console.log(`Connected Response: ${res}`);

            // start stream server
            const options = {
                host: this.host,
                port: this.port,
            };

            this.setupServer(options);
            
        } catch (err) {
            throw new Error(`Failed to start: ${err}`);
        }
        return;
    }

    private setupServer(options) {
        this.server = new WebSocket.Server(options);
        this.server.on("connection", this.newConnHandlerWrapper());
    }

    private newConnHandlerWrapper(): (c: WebSocket) => void {
        return (conn: WebSocket) => {
            conn.once("message", (msg) => {
                const req = new Request(msg);
                const error = req.validate();
                const result = error ? null : "welcome!";

                const res = new Response({
                    id: req.toJSON().id || null,
                    error,
                    result
                })

                conn.send(JSON.stringify(res));
                conn.close();
            });
        }
    }

    private connectAbci(timeout: number): Promise<string> {
        console.log(`Attempting to connect ${timeout} time(s)...`);
        
        // attempt to connect until timeout reached
        return new Promise((resolve, reject) => {
            // reject if fails within timeout
            const timer = setInterval(() => {
                if (this.retryCounter++ > timeout) {
                    reject("Connection timeout.");
                }
                this.attemptConnection(resolve, reject, timer);
            }, 500);

            // start the recursive connect attempts
        });
    }

    private attemptConnection(resolve: Function, reject: Function, timer): void {
        this.retryCounter++;
        this.abciConn = new WebSocket(this.abciURL.href);
        this.abciConn.removeAllListeners();

        // attach one-off open handler to resolve upon connect
        this.abciConn.once("open", () => {
            // attach new handlers, and re-subscribe
            this.attachHandlers();
            this.subscribeToNewBlock();
            
            // resolve upon success
            clearInterval(timer);
            resolve(`Connected after ${this.retryCounter} attempts.`);
            this.retryCounter = 0;
        });

        // if it fails just try again (until timeout)
        this.abciConn.once("error", (e) => { 
            this.attemptConnection(resolve, reject, timer);
        });
    }

    private attachHandlers(timeout: number = 2000): void {
        // clear listeners
        this.abciConn.removeAllListeners();

        // general error handler
        this.abciConn.on("error", this.clientErrorHandler);

        // message handler wrapper
        this.abciConn.on("message", (data) => {
            this.clientMessageHandler(data);
        });

        // close connection handler wrapper
        this.abciConn.once("close", this.fatalCloseHandlerWrapper(timeout));
    }

    private fatalCloseHandlerWrapper(timeout: number): () => void {
        return async () => {
            try {
                console.log(`Connection lost, attempting to reconnect...`)
                await this.connectAbci(timeout); // todo make configurable
            } catch (err) {
                console.log("Fatal, failed to reconnect to ABCI server.");
                process.exit(1);
            }
        }
    }

    private clientErrorHandler(msg: string): void {
        console.log(`error from client connection: ${msg}`);
    }

    private clientMessageHandler(data: any): void {
        const parsed = JSON.parse(data);
        if (parsed.id !== "main#event") return;

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

    private getUnixTimeFromISO(isoDate: string): string {
        const date = new Date(isoDate);
        const rawUnixTimeMs = date.getTime();
        const outputUnixTime = Math.round(rawUnixTimeMs);
        return outputUnixTime.toString();
    }

    // todo: develop type defs
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

        // for now, just log the object
        console.log(`\n${JSON.stringify(outputObject, null, 2)}`);
        return;
    }

    public subscribeToNewBlock(): void {
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

    public getAbciReadyState(): number {
        return this.abciConn.readyState;
    }
}
