/**
 * ===========================
 * ParadigmCore: Blind Star
 * @name TendermintRPC.ts
 * @module common
 * ===========================
 *
 * @author Henry Harder
 * @date (initial)  15-October-2018
 * @date (modified) 12-February-2019
**/

// stdlib and third-party imports
import { RpcClient } from "tendermint";
import { EventEmitter } from "events";

// ParadigmCore local imports
import { log, warn, err } from "./log";
import { encodeTx } from "../core/util/utils";

/**
 * A wrapper class facilitating a WebSocket connection to the Tendermint RPC 
 * server.
 * 
 * @description The `Tendermint` class is primarily a wrapper for the NPM 
 * `tendermint` library, which facilitates access to the Tendermint RPC server.
 * This class adds additional functionality to simplify the management of an 
 * RPC connection, and will eventually support automatic re-connection in the
 * case of network drop.
 */
export class TendermintRPC extends EventEmitter {

    /**
     * The URL of the Tendermint RPC (ABCI) server port.
     */
    private url: URL;

    /**
     * True if connected to Tendermint RPC server.
     */
    private connected: boolean;

    /**
     * The connection to the Tendermint RPC server over WebSocket is initialized
     * when `WrapABCI.prototype.connect()` is called.
     */
    private conn: RpcClient;

    /**
     * A pseudo-randomly generated ID string to support a unique client<>server
     * session identifier with Tendermint.
     */
    private id: string;

    /**
     * The number of times a `TendermintRPC` instance will try to reconnect to
     * the Tendermint RPC server after a connection is lost (following an
     * initially successful connection).
     */
    private maxRetries: number;

    /**
     * The amount of time (in ms) to wait between each attempt to connect to the
     * Tendermint RPC server.
     */
    private retryInterval: number;

    /**
     * The in-memory representation of the latest block-data that has been
     * received by the instance.
     */
    private latestBlockData: any;
    
    /**
     * Used to enable re-connections upon connection loss between the instance
     * and the Tendermint RPC server.
     */
    private shouldRetry: boolean;

    /**
     * Only `true` if connection attempts are in progress.
     */
    private connecting: boolean;

    /**
     * Create a new Tendermint RPC instance.
     * 
     * @param endpoint 
     */
    constructor(endpoint: string, maxRetries, interval) {
        super();
        this.url = new URL(endpoint);
        if (["ws:", "wss:"].indexOf(this.url.protocol) === -1) {
            throw new Error("Please provide a 'ws://' or 'wss://' URl string.");
        }

        this.connected = false;
        this.id = null;
        this.latestBlockData = null;

        // reconnect things
        this.connecting = false;
        this.shouldRetry = false;
        this.retryInterval = interval || 1000;
        this.maxRetries = maxRetries || 21;
    }

    /**
     * Initialize connection to Tendermint RPC server.
     * 
     * @returns a promise that resolves (to void) upon successful connection, 
     * and rejects on (and to) any error encountered.
     */
    public connect(maxTries: number, intervalMs: number): Promise<void> {
        // don't try if already connected
        if (this.connected) return;

        // required parameters
        if (!maxTries || !intervalMs) {
            throw Error("Must supply `maxTries` and `intervalMs` parameters.");
        }

        // counter number of retry attempts
        let counter = 0;

        // indicate connection attempts are in progress
        this.connecting = true;

        // attempt connection
        log("tm", "attempting to connect to tendermint rpc server...");
        return new Promise((resolve, reject) => {
            let timer = setInterval(async () => {
                this.connected = false;

                // reject on timeout
                if (++counter >= maxTries) {
                    this.connecting = false;
                    err("tm", "timeout while attempting to re-connect to tendermint")
                    reject();
                    clearInterval(timer);
                    return;
                }

                // try again
                this.conn = RpcClient(this.url.href);

                // attach handlers upon successful connection
                this.conn.once("close", this.connectionCloseHandler(this));
                this.conn.on("error", this.connectionErrorHandler(this));

                // see if connection is active by querying
                const res = await this.abciInfo(true);

                // set connection status
                this.connected = true;
                this.shouldRetry = true;
                this.connecting = false;
                log("tm", `connected to server after ${counter} attempts`);
                resolve();
                clearInterval(timer);
            }, intervalMs)
        });
    }

    /**
     * Generate a handler function for connection closure.
     * 
     * @returns a function to be used as an event handler for the Tendermint
     * RPC connection.
     * 
     * @todo implement actual error/close handling.
     * 
     * @param _this `this` reference for calling class.
     */
    private connectionErrorHandler(_this: TendermintRPC): (e) => void {
        return (e: Error) => {
            switch (e.message) {
                case "websocket disconnected": {
                    this.conn.emit("close", e.message);
                    break;
                }
                default: {
                    if (!this.connecting) err("tm", `CONNECTION ERROR: ${e.message}`);
                    break;
                }
            }
            return;
        }
    }

    /**
     * Generate a handler function for connection closure.
     * 
     * @returns a function to be used as an event handler for the Tendermint
     * RPC connection.
     * 
     * @todo implement actual error/close handling.
     * 
     * @param _this `this` reference for calling class.
     */
    private connectionCloseHandler(_this: TendermintRPC): (m) => void {
        return (m) => {
            if (!this.connecting) err("tm", `CONNECTION CLOSE: ${m}`);
            _this.connected = false;

            // attempt to reconnect
            if (this.shouldRetry === true && this.connecting === false) {
                this.shouldRetry = false;
                this.conn = null;
                log("tm", `connection lost, attempting reconnect ${this.maxRetries} time(s)..`);
                this.connect(this.maxRetries, this.retryInterval);
            } else if (this.connecting === true ){
                return;
            } else {
                throw Error("Connection fatally closed, not retrying.");
            }
            
        }
    }

    /**
     * Query the ABCI `info` method.
     * 
     * @description A wrapper for the Tendermint RPC method `abci_info`, for 
     * more details, see https://tendermint.com/rpc and type definition.
     */
    public async abciInfo(override?: boolean): Promise<ResponseInfo> {
        // don't try to sub if not connected
        if (!this.connected && !override) {
            throw Error("Not connected to Tendermint RPC.");
        }

        // will store abci response
        let res: ResponseInfo;
        try {
            res = await this.conn.abciInfo();
        } catch (error) {
            throw Error(`Failed to query info: ${error.message}`);
        }
        return res;
    }

    /**
     * Subscribe to an event in the Tendermint chain.
     * 
     * @description Wrapper for the `tendermint` JS library that allows
     * subscription to various Tendermint and ParadigmCore events. See the full
     * syntax for the 'subscribe' method at https://tendermint.com/rpc
     * 
     * @param eventName the string of the event to subscribe to.
     * @param cb callback function to be executed upon each event.
     */
    public async subscribe(eventName: string, cb: Function): Promise<void> {
        // don't try to sub if not connected
        if (!this.connected) throw Error("Not connected to Tendermint RPC.");

        // check for valid event
        if (eventName.split("=").length < 2) {
            throw Error("Invalid query syntax for 'subscribe' RPC method.");
        }

        // subscribe to event
        try {
            await this.conn.subscribe([eventName], cb);
        } catch (error) {
            throw Error(`Failed to subscribe to event: ${error.message}`);
        }
    }

    /**
     * Unsubscribe from an event in the Tendermint chain.
     * 
     * @description Wrapper for the `tendermint` JS library that allows
     * subscription to various Tendermint and ParadigmCore events. See the full
     * syntax for the 'unsubscribe' method at https://tendermint.com/rpc
     * 
     * @param eventName the string of the event to subscribe to.
     * @param cb callback function to be executed upon each event.
     */
    public async unsubscribe(query: string): Promise<void> {
        // don't try to sub if not connected
        if (!this.connected) throw Error("Not connected to Tendermint RPC.");

        // check for valid event
        if (query.split("=").length < 2) {
            throw Error("Invalid query syntax for 'unsubscribe' RPC method.");
        }

        // subscribe to event
        try {
            await this.conn.unsubscribe({ query });
        } catch (error) {
            throw Error(`Failed to unsubscribe from event: ${error.message}`);
        }
    }

    /**
     * Submit a transaction to Tendermint via RPC.
     * 
     * @description Accepts a [SignedTransaction] as the first argument, which 
     * gets compressed/encoded using the [PayloadCipher] class. The second 
     * (optional) parameter can be used to specify a broadcast mode, which can
     * be any of `sync`, `async`, or `commit`. See https://tendermint.com/rpc 
     * for more details.
     * 
     * @param tx the string of the event to subscribe to.
     * @param mode an optional mode to use, defaults to `sync`
     */
    public async submitTx(tx: SignedTransaction, mode?: string): Promise<any> {
        // don't try to sub if not connected
        if (!this.connected || this.connecting) throw Error("Not connected to Tendermint RPC.");

        // the default broadcast method
        let method;
        let res;
        const methodBuilder = m => `broadcastTx${m}`;
        const parsed = mode ? mode.toLowerCase(): null;

        // check for/set broadcast connection mode
        if (parsed && ["sync", "async", "commit"].indexOf(parsed) >= 0) {
            const firstLetter = parsed.charAt(0).toUpperCase();
            const restLetters = parsed.slice(1);
            method = methodBuilder(`${firstLetter}${restLetters}`);
        } else {
            method = methodBuilder("Sync");
        }

        // submit tx
        try {
            const payload = encodeTx(tx);
            res = await this.conn[method]({ tx: payload });
        } catch (error) {
            throw Error(`Failed to submit tx: ${error.message}`);
        }

        // resolve to response from Tendermint RPC
        return res;
    }

    /**
     * Public getter method to check connection status. 
     * 
     * @returns `true` if connected to Tendermint RPC, and `false` otherwise.
     */
    public isConnected(): boolean {
        return this.connected;
    }
}