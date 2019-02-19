"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const log_1 = require("../../common/log");
const utils_1 = require("./utils");
class TxBroadcaster {
    constructor(options) {
        const _this = this;
        this.client = options.client;
        this.tracker = new events_1.EventEmitter();
        this.queue = [];
        this.client.on("error", (error) => {
            log_1.err("tx", `in tendermint abci connection: ${error}`);
            throw new Error("error encountered in tendermint connection");
        });
        this.client.on("close", (error) => {
            log_1.err("tx", `connection to abci server closed: ${error}`);
            throw new Error("tendermint connection terminated unexpectedly");
        });
        this.tracker.on("tx", () => {
            if (!(_this.broadcasting)) {
                _this.broadcast();
            }
        });
        this.broadcasting = false;
        this.started = false;
        return;
    }
    start() {
        this.started = true;
        return this.started;
    }
    async send(tx) {
        const ee = new events_1.EventEmitter();
        const res = new Promise((resolve, reject) => {
            ee.on("sent", resolve);
            ee.on("failed", reject);
            ee.on("error", reject);
        });
        this.enqueue([tx, ee]);
        return await res;
    }
    async broadcast() {
        if (!(this.started)) {
            return;
        }
        const _this = this;
        this.broadcasting = true;
        const txArr = this.dequeue();
        if (txArr === null || txArr.length !== 2) {
            return;
        }
        const txObject = txArr[0];
        const txEmitter = txArr[1];
        const payload = utils_1.encodeTx(txObject);
        try {
            const res = await this.client.broadcastTxSync({
                tx: `"${payload}"`,
            });
            txEmitter.emit("sent", res);
        }
        catch (error) {
            txEmitter.emit("failed", error);
            log_1.err("tx", `failed to send abci transaction: ${error.message}`);
        }
        if (_this.isEmpty()) {
            this.broadcasting = false;
            return;
        }
        this.broadcast();
        return;
    }
    isEmpty() {
        return this.queue.length === 0;
    }
    enqueue(item) {
        this.queue.push(item);
        this.tracker.emit("tx");
        return;
    }
    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        return this.queue.shift();
    }
}
exports.TxBroadcaster = TxBroadcaster;
