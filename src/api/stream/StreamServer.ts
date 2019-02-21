/**
 * ===========================
 * ParadigmCore: Blind Star
 * @name StreamServer.ts
 * @module api/stream
 * ===========================
 *
 * @author Henry Harder
 * @date (initial)  05-February-2019
 * @date (modified) 20-February-2019
**/

// request/response schemas
import * as api from "./api.json";

// request/response objects
import { Request as Req } from "./Request";
import { Response as Res } from "./Response";

// common imports
import { log, warn, err } from "../../common/log";
import { TendermintRPC } from "../../common/TendermintRPC.js";

// stream server utils
import {
    createResponse,
    createValError
} from "./utils.js";

// third party/std-lib
import * as _ from "lodash";
import { EventEmitter } from "events";
import * as WebSocket from "ws";
import { createHash, Hash } from "crypto";


/**
 * Defines the object provided to the `StreamServer` constructor.
 */
interface IOptions {
    /** URL of the local Tendermint RPC server. */
    tendermintRpcUrl?: string;

    /** Interval between connection attempts (in ms). */
    retryInterval?: number;

    /** The maximum number of times to retry connection before throwing. */
    retryMax?: number;

    /** Port to bind the StreamAPI server to. */
    port?: number;

    /** Network host to bind StreamAPI server. */
    host?: string;
}

/**
 * Defines the parsed block data from the tendermint `NewBlock` event.
 * 
 * @todo move to `typings` module
 */
interface IBlockData {
    /**
     * The best known tendermint block (height).
     */
    height?: number;
}

/**
 * Raw block data as delivered over Tendermint JSONRPC (pre-parsing).
 */
interface RawBlockData {
    block: {
        header: {
            version: {
                block: string;
                app: string;
            },
            chain_id: string;
            height: string;
            time: string;
            num_txs: string;
            total_txs: string;
        }
    }
}

/**
 * Defines the object type used to represent an event subscription.
 */
interface ISubscription {
    serverId: string;
    clientId: string;
    connection: WebSocket;
    params: {
        eventName: string;
    }
}

/**
 * Defines the ConnectionMap interface.
 */
interface IConnectionMap {
    [connectionId: string]: WebSocket
}

/**
 * Mapping of methods to method implementations;
 */
interface IMethods {
    [methodName: string]: (params: any) => any;
}

/**
 * The `StreamServer` class is a TypeScript implementation of the StreamAPI, 
 * intended to be used with JSONRPC(2.0)/WebSocket. 
 * 
 * Certain endpoints may be
 * implemented with an HTTP server to support JSONRPC(2.0)/POST for things like
 * submitting an order transaction via RPC.
 */
export class StreamServer extends EventEmitter {

    /**
     * Generate a pseudo-random byte array
     * 
     * @description This static method returns a pseudo-random 32 byte SHA256 
     * hash used for various security mechanisms within the class. Generated by
     * concatenating 16 random bytes from memory, plus the raw bytes of the
     * string characters that represent the current unix timestamp (in ms),
     * and digesting the 32 byte SHA256 hash of the result.
     * 
     * Highly non-deterministic; each call will produce different output.
     * 
     * @param start if provided, indicates from which byte (0-indexed) to slice
     */
    private static generate32RandomBytes(start?: number): Buffer {
        // hash engine and output buffer
        let output: Buffer;
        const hash: Hash = createHash("sha256");

        // generate byes of timestamp string
        const timestampString: string = Date.now().toString();
        const timestampBytes = Buffer.from(timestampString, "utf8");

        // grab 16 byes from memory (unsafe-ish, shouldn't leave function scope)
        const unsafeBytes: Buffer = Buffer.allocUnsafe(16);

        // update hash with bytes from timestamp and memory
        hash.update(timestampBytes);
        hash.update(unsafeBytes);

        // digest hash and store output buffer
        output = hash.digest();

        // return full or part output bytes
        return start ? output.slice(start) : output;
    }

    /**
     * Generate client-safe `eventId` from secret connectionId
     * 
     * @description The `subscription.eventId` (used to track individual event
     * subscriptions) is the first 16 bytes of the SHA256 hash of connectionId,
     * with 16 bytes of salt, as a hex encoded string.
     * 
     * Assume to be deterministic (given same input/salt).
     * 
     * @param connectionId a 32 byte 
     */
    private static generateEventId(connectionId: string, salt: Buffer): string {
        const hash: Hash = createHash("sha256");
        const connectionIdBytes: Buffer = Buffer.from(connectionId, "hex");
        
        // update hash with id bytes and salt
        hash.update(connectionIdBytes);
        hash.update(salt);

        // convert to hex string and slice first bytes
        const output: Buffer = hash.digest().slice(0, 16);
        const eventId: string = output.toString("hex");
        return eventId;
    }

    /**
     * Generate secret `connectionId`
     * 
     * @description Every connected client has a secret `connectionId` generated
     * from the server's `secret` and some salt. The `connectionId` string is a 
     * hex-string of the hash of the server's `secret` salted with an arbitrary
     * number of "random" bytes.
     * 
     * Assume to be deterministic (given same input/salt).
     * 
     * @param secret the server's `secret` 32 bytes
     * @param salt an arbitrary number of random-ish bytes to be used as salt
     */
    private static generateConnectionId(secret: Buffer, salt: Buffer): string {
        const hash: Hash = createHash("sha256");
        
        // update hash with secret and salt
        hash.update(secret);
        hash.update(salt);

        // digest hash and convert output bytes to hex string
        const output: Buffer = hash.digest().slice(0, 32);
        const connectionId: string = output.toString("hex");
        return connectionId;
    }

    /**
     * Server secret bytes
     * 
     * A pseudo-random 32 byte `Buffer` used (along with the UNIX time) as salt 
     * when hashing client-provided `request.id` strings. Should not be shared
     * with the client (as a precaution).
     */
    private secret: Buffer;

    /**
     * Mapping of method handler functions.
     */
    private methods: IMethods;

    /**
     * Tendermint RPC client instance.
     * 
     * @description Instance of `TendermintRPC`, the custom wrapper used to
     * interact with Tendermint and the ParadigmCore chain via the local
     * Tendermint RPC server. See [[TendermintRPC]] documentation for more info.
     */
    private rpcClient: TendermintRPC;

    /**
     * Data for the latest Tendermint block.
     * 
     * @description The most recent (parsed) block-data from the Tendermint RPC
     * server, not including transactions.
     */
    private latestBlockData: IBlockData;

    /**
     * Number of times to attempt RPC connection.
     * 
     * @description Used to facilitate reestablishment of WebSocket connection 
     * upon error or unexpected closure.
     */
    private retryMax: number;

    /**
     * Interval (in ms) between retry attempts
     * 
     * @description The millisecond interval between attempts to reconnect to
     * the Tendermint RPC server. Used by the [[TendermintRPC]] class.
     */
    private retryInterval: number;

    /**
     * StreamAPI port
     * 
     * @description The port to expose the StreamAPI WebSocket server on.
     */
    private streamPort: number;

    /**
     * Stream host
     * 
     * @description The network host to bind the StreamAPI server to.
     */
    private streamHost: string;

    /**
     * StreamAPI WebSocket server instance
     * 
     * @description The actual `ws.Server` instance used to handle requests. 
     * Not to be confused with the `StreamServer` class, which is the actual
     * implementation of the JSONRPC spec for transport over WebSocket.
     */
    private server: WebSocket.Server;

    /**
     * Array of subscription objects
     * 
     * @description Master array of active subscriptions, where each entry has a
     * `subscription.connectionId` which is the the utf8 hex-string of the first
     * 8 bytes of the hash of the client-provided `request.id` concatenated with
     * the fist 16 bytes of a random byte array (which includes a time-hash).
     * The `connectionId` maps to an actual WebSocket connection object, and
     * should be kept private from clients;
     * 
     * The `subscription.eventId` (used to track individual event subscriptions)
     * is the first 16 bytes of the SHA256 hash of connectionId , as a hex
     * encoded string.
     *
     * ```ts
     * connectionId = StreamServer.generateSecretBytes();
     * eventId = StreamServer.genEventIdFromConnId(connectionId);
     * ```
     */
    private subscriptions: ISubscription[];

    /**
     * Mapping of active `connectionId` strings to connection objects
     * 
     * @description Used to quickly find a connection object pointer (to an
     * instance of[[WebSocket]]), used to send messages, etc.
     */
    private connectionMap: IConnectionMap;
    
    /**
     * Server status
     * 
     * @description Only true if `StreamServer.prototype.start()` has executed
     * and the promise has resolved/not been rejected.
     */
    private started: boolean;
    /**
     * Create a new `StreamServer` instance.
     * 
     * @description more docs coming soon.
     * 
     * @param options see [[IOptions]] interface definition
     */
    constructor(options: IOptions = {}){
        // inherit this from EventEmitter
        super();

        // generate server secret (used for the duration of the process)
        this.secret = StreamServer.generate32RandomBytes();

        // setup subscription and connection tracking objects
        this.subscriptions = [];
        this.connectionMap = {};

        // setup methods object
        this.methods = {};

        // setup block data tracker
        this.latestBlockData = {};

        // server config
        this.streamPort = options.port || 14342;
        this.streamHost = options.host || "localhost";

        // set params for Tendermint RPC connection
        this.retryMax = options.retryMax || 30;
        this.retryInterval = options.retryInterval || 2000;

        // tendermint rpc connection
        this.rpcClient = new TendermintRPC(
            options.tendermintRpcUrl,
            this.retryMax,
            this.retryInterval,
        );

        // status
        this.started = false;
        return;
    }
    
    // BEGIN public methods

    /**
     * Start the StreamAPI server.
     * 
     * An async function that binds the WebSocket server, and connects to the 
     * local TendermintRPC instance. 
     */
    public async start(): Promise<void> {
        // TEMPORARY testing RPC
        // @todo move elsewhere
        this.rpcClient.on("open", () => {
            log("api", "connected to tendermint rpc server");

            // handle each new block
            this.rpcClient.subscribe("tm.event='NewBlock'", (data: RawBlockData) => {
                // console.log(`\n${JSON.stringify(data)}\n`);

                // update latest height
                const { height } = data.block.header;
                this.latestBlockData.height = parseInt(height, 10);

                // temporary log height
                log("api", `just received tendermint block: ${height}`);
            });
        });

        // connect to tendermint rpc server
        await this.rpcClient.connect(this.retryMax, this.retryInterval);

        // start listening to client requests
        this.setupServer(this.streamHost, this.streamPort);
        return;
    }

    /**
     * Bind a method to the StreamServer.
     */
    public bind(methodName: string, method: (params: any) => any): void {
        this.methods[methodName] = method;
    }

    // END public methods

    // BEGIN private methods

    /**
     * Setup the StreamAPI WebSocket server
     * 
     * @description Configure and start the StreamAPI JSONRPC(2.0) WebSocket
     * server, on the provided host and port.
     * 
     * @param host network host to bind server to
     * @param port network port to bind server to
     */
    private setupServer(host: string, port: number): void {
        // set options and initialize
        const options = { host, port };
        this.server = new WebSocket.Server(options);

        // attach new connection handler
        this.server.on("connection", this.createConnectionHandler());
    }

    /**
     * Create a server connection handler
     * 
     * @description Creates a `StreamServer` connection handler function. 
     * 
     * @todo document better
     */
    private createConnectionHandler(): (conn: WebSocket) => void {
        return (conn: WebSocket) => {
            // generate a unique id string for this connection
            const connectionId = StreamServer.generateConnectionId(
                this.secret,
                StreamServer.generate32RandomBytes()
            );

            // store connection in mapping
            this.connectionMap[connectionId] = conn;

            // setup close/error handler
            // @todo revisit/expand
            conn.on("close", () => {
                // TEMPORARY
                log("api", `Disconnect from connection "id": "${connectionId}"`);

                // remove from connection mapping
                delete this.connectionMap[connectionId];
            })

            // setup message handler
            // @todo revisit, expand, and move
            conn.on("message", (msg: WebSocket.Data) => {

                // TEMPORARY
                log("api", `Message from connection '${connectionId}': '${msg}'`);

                // scope eventual response/request objects
                let res: Res, req: Req, error: ValidationError;

                try {
                    // create request object and validate
                    req = new Req(msg);
                    error = req.validate();

                    if (error) {
                        res = createResponse(null, null, error);
                        warn("api", `Sending error message to connection '${connectionId}'`);
                    } else if (!error && _.isObject(req.parsed)) {
                        // this is where we will handle the request.
                        const { params, id, method} = req.parsed;

                        if (!this.methods[method]) {
                            const methError = createValError(-32601, "method not implemented.");
                            res = createResponse(null, null, methError);
                        } else {
                            log("api", `Executing method for connection '${connectionId}'`);
                            const result = this.methods[method](params);
                            res = createResponse(result, id, null);
                        }
                    } else {
                        throw Error();
                    }                
                } catch (_) {
                    const intError = createValError(-32603, "Internal error.");
                    res = createResponse(null, null, intError);
                    warn("api", "Sending error message (internal) to client.");
                }
                this.sendMessageToClient(connectionId, res);
                return;
            });

            conn.on("open", () => {
                console.log("\nya it open bud\n");
                const res = new Res({id: "none", result: "welcome brudda" });
                this.sendMessageToClient(connectionId, res);
                log("api", `Send open message to connection '${connectionId}'`);
                return;
            })

            conn.on("error", (error: Error) => {
                // TEMPORARY
                warn("api", `Error from connection '${connectionId}': ${error.message}`);
                const res = new Res({id: "none", result: "goodbye, error found." });
                this.sendMessageToClient(connectionId, res);
                warn("api", `Send error message to connection '${connectionId}'`);
                // remove from connection mapping
                this.connectionMap[connectionId] = undefined;
                return;
            })

            // TEMPORARY
            log("api", `Got new connection "id": "${connectionId}"`);
            return;
        }
    }

    /**
     * Send a message to a connected client+
     * 
     * @description Send a JSON response to a client identified by server-side
     * connectionId string.
     * 
     * @param id the server-side client ID string
     * @param res a JsonResponse object
     */
    private sendMessageToClient(id: string, res: Res) {
        // @todo make sure to properly handle disconnects
        const conn = this.connectionMap[id];
        if (!conn) return;
        if(conn.readyState !== conn.OPEN) { return; }
        conn.send(JSON.stringify(res));
        return;
    }
}