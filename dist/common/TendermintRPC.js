"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tendermint_1 = require("tendermint");
const events_1 = require("events");
const uniqueId = require("uuid/v4");
const log_1 = require("./log");
const utils_1 = require("../core/util/utils");
class TendermintRPC extends events_1.EventEmitter {
    constructor(endpoint, maxRetries, interval) {
        super();
        this.url = new URL(endpoint);
        if (["ws:", "wss:"].indexOf(this.url.protocol) === -1) {
            throw new Error("Please provide a 'ws://' or 'wss://' URl string.");
        }
        this.connected = false;
        this.sending = false;
        this.id = null;
        this.latestBlockData = null;
        this.queue = [];
        this.connecting = false;
        this.shouldRetry = false;
        this.retryInterval = interval || 1000;
        this.maxRetries = maxRetries || 21;
    }
    connect(maxTries, intervalMs) {
        if (this.connected)
            return;
        if (!maxTries || !intervalMs) {
            throw Error("Must supply `maxTries` and `intervalMs` parameters.");
        }
        let counter = 0;
        this.connecting = true;
        log_1.log("tm", "attempting to connect to tendermint rpc server...");
        return new Promise((resolve, reject) => {
            let timer = setInterval(async () => {
                this.connected = false;
                if (++counter >= maxTries) {
                    this.connecting = false;
                    log_1.err("tm", "timeout while attempting to re-connect to tendermint");
                    reject();
                    clearInterval(timer);
                    return;
                }
                this.conn = tendermint_1.RpcClient(this.url.href);
                this.conn.once("close", this.connectionCloseHandler(this));
                this.conn.on("error", this.connectionErrorHandler(this));
                const res = await this.abciInfo(true);
                this.connected = true;
                this.shouldRetry = true;
                this.connecting = false;
                this.emit("open");
                log_1.log("tm", `connected to server after ${counter} attempts`);
                resolve();
                clearInterval(timer);
            }, intervalMs);
        });
    }
    connectionErrorHandler(_this) {
        return (e) => {
            switch (e.message) {
                case "websocket disconnected": {
                    this.conn.emit("close", e.message);
                    break;
                }
                default: {
                    if (!this.connecting)
                        log_1.err("tm", `CONNECTION ERROR: ${e.message}`);
                    break;
                }
            }
            return;
        };
    }
    connectionCloseHandler(_this) {
        return (m) => {
            if (!this.connecting)
                log_1.err("tm", `CONNECTION CLOSE: ${m}`);
            _this.connected = false;
            if (this.shouldRetry === true && this.connecting === false) {
                this.shouldRetry = false;
                this.conn = null;
                log_1.log("tm", `connection lost, attempting reconnect ${this.maxRetries} time(s)..`);
                this.connect(this.maxRetries, this.retryInterval);
            }
            else if (this.connecting === true) {
                return;
            }
            else {
                throw Error("Connection fatally closed, not retrying.");
            }
        };
    }
    async internalSubmitTx() {
        if (!this.connected || this.connecting)
            throw Error("Not connected to Tendermint RPC.");
        this.sending = true;
        for (let i = 0; i < this.queue.length; i++) {
            const { tx, method, id } = this.queue.pop();
            try {
                const payload = utils_1.encodeTx(tx);
                const res = await this.conn[method]({ tx: payload });
                this.emit(id, { ok: true, res });
            }
            catch (error) {
                this.emit(id, {
                    ok: false,
                    res: `Failed to submit tx: ${error.message}`
                });
            }
        }
        this.sending = false;
        return;
    }
    async abciInfo(override) {
        if (!this.connected && !override) {
            throw Error("Not connected to Tendermint RPC.");
        }
        let res;
        try {
            res = await this.conn.abciInfo();
        }
        catch (error) {
            throw Error(`Failed to query info: ${error.message}`);
        }
        return res;
    }
    async subscribe(eventName, cb) {
        if (!this.connected)
            throw Error("Not connected to Tendermint RPC.");
        if (eventName.split("=").length < 2) {
            throw Error("Invalid query syntax for 'subscribe' RPC method.");
        }
        try {
            await this.conn.subscribe([eventName], cb);
        }
        catch (error) {
            throw Error(`Failed to subscribe to event: ${error.message}`);
        }
    }
    async unsubscribe(query) {
        if (!this.connected)
            throw Error("Not connected to Tendermint RPC.");
        if (query.split("=").length < 2) {
            throw Error("Invalid query syntax for 'unsubscribe' RPC method.");
        }
        try {
            await this.conn.unsubscribe({ query });
        }
        catch (error) {
            throw Error(`Failed to unsubscribe from event: ${error.message}`);
        }
    }
    submitTx(tx, mode) {
        let method;
        const methodBuilder = m => `broadcastTx${m}`;
        const parsed = mode ? mode.toLowerCase() : null;
        if (parsed && ["sync", "async", "commit"].indexOf(parsed) >= 0) {
            const firstLetter = parsed.charAt(0).toUpperCase();
            const restLetters = parsed.slice(1);
            method = methodBuilder(`${firstLetter}${restLetters}`);
        }
        else {
            method = methodBuilder("Sync");
        }
        const id = uniqueId();
        return new Promise((resolve, reject) => {
            this.queue.push({ tx, method, id });
            this.once(id, (response) => {
                const { ok, res } = response;
                if (ok) {
                    resolve(res);
                }
                else {
                    reject(res);
                }
            });
            if (!this.sending) {
                this.internalSubmitTx();
            }
        });
    }
    async query(path) {
        const res = await this.conn.abciQuery({ path });
        const { code, info, log, key, value } = res.response;
        return { code, info, log, key, value };
    }
    isConnected() {
        return this.connected;
    }
}
exports.TendermintRPC = TendermintRPC;
