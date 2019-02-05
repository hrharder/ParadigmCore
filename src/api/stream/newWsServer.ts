import * as WebSocket from "ws";
import { EventEmitter } from "events";
import { log } from "src/util/log";

export class StreamServer {
    // connection to abci ws server
    private abciConn: WebSocket;
    private abciURL: URL;

    // ws server
    // private server: WebSocket.Server;

    // emitters
    // private newBlockEmiter: EventEmitter;
    // private newOrderEmitter: EventEmitter;

    // config
    private retryTimeout: number;

    constructor(options: StreamServerOptions) {
        this.abciURL = new URL(options.abciURL);

        // set number of times to try to reconnect ABCI WS
        this.retryTimeout = 5; // || options.maxRetry

        // establish ws abci connection
        this.connectAbci();
        this.attachHandlers();
    }

    private connectAbci(): void {
        this.abciConn = new WebSocket(this.abciURL.href, {
            handshakeTimeout: 2500
        });
    }

    private attachHandlers(): void {
        this.abciConn.on("open", this.clientOpenHandler);
        this.abciConn.on("close", this.clientCloseHandler);
        this.abciConn.on("error", this.clientErrorHandler);
        this.abciConn.on("message", this.clientMessageHandler)
    }

    private clientOpenHandler(): void {
        console.log("connected to abci WS");
    }

    private clientCloseHandler(): void {
        console.log("abci ws connection closed");
    }

    private clientErrorHandler(msg: string): void {
        console.log(`error from client connection: ${msg}`);
    }

    private clientMessageHandler(data: any): void {
        console.log(data);
    }

    public subscribeToNewBlock(): void {
        if (this.abciConn.readyState !== 1) return;

        // subscribe options
        const subscribeOptions = {
            "method":"subscribe",
            "jsonrpc":"2.0",
            "params":["tm.event='NewBlock'"],
            "id":"none"
        };

        // send subscribe message
        this.abciConn.send(JSON.stringify(subscribeOptions));
        return;
    }

    // public funcs below

    public getAbciReadyState(): number {
        return this.abciConn.readyState;
    }

    public start(): void {
        this.connectAbci();
    }
}

interface StreamServerOptions {
    abciURL: string;
    maxRetry: number;
}