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
    }

    private connectAbci(timeout: number): Promise<string> {
        console.log(`Attempting to connect for ${Math.floor(timeout/1000)} seconds...`);
        
        // attempt to connect until timeout reached
        return new Promise((resolve, reject) => {
            // reject if fails within timeout
            setTimeout(() => {
                reject("Connection timeout.");
            }, timeout);

            // count the number of attempts
            let counter = 0;

            // the "attempt to connect" function
            const attempt = () => {
                counter++;
                console.log("attempt no: ", counter);
                this.abciConn = new WebSocket(this.abciURL.href);
                this.abciConn.removeAllListeners();

                // attach one-off open handler to resolve upon connect
                this.abciConn.once("open", () => {
                    // attach new handlers, and re-subscribe
                    this.attachHandlers();
                    this.subscribeToNewBlock();
                    
                    // resolve upon success
                    resolve(`Connected after ${counter} attempts.`);
                });

                // if it fails just try again (until timeout)
                this.abciConn.once("error", (e) => { attempt(); });
            };

            // start the recursive connect attempts
            attempt();
        });
    }

    private attachHandlers(timeout: number = 15000): void {
        // general error handler
        this.abciConn.on("error", this.clientErrorHandler);

        // message handler wrapper
        this.abciConn.on("message", (data) => {
            this.clientMessageHandler(data);
        });

        // close connection handler wrapper
        this.abciConn.once("close", async () => {
            try {
                console.log(`Connection lost, attempting to reconnect...`)
                await this.connectAbci(timeout); // todo make configurable
            } catch (err) {
                console.log("Fatal, failed to reconnect to ABCI server.");
                process.exit(1);
            }
        });
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
            //clear
            lastBlockDataHash,
            lastBlockProposer,
            txCount,
        }

        // for now, just log the object
        console.log(`\n${JSON.stringify(outputObject, null, 2)}`);
        return;
    }

    public subscribeToNewBlock(): void {
        if (this.abciConn.readyState !== 1) {
            console.log("readyState is not 1");
            return;
        }

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

    public async start(timeout: number = 5000): Promise<void> {
        try {
            const res = await this.connectAbci(timeout);
            console.log(`Connected Response: ${res}`);
        } catch (err) {
            throw new Error(`Failed to start: ${err.message}`);
        }
        return;
    }
}

interface StreamServerOptions {
    abciURL: string;
    maxRetry: number;
}