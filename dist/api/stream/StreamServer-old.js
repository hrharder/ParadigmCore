"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JsonRequest_1 = require("./JsonRequest");
const JsonResponse_1 = require("./JsonResponse");
const api = require("./api.json");
const log_1 = require("../../common/log");
const WebSocket = require("ws");
const zlib = require("zlib");
const timers_1 = require("timers");
const events_1 = require("events");
class StreamServer {
    constructor(options) {
        this.abciURL = new URL(options.abciURL);
        this.abciSessionId = null;
        this.latestAbciData = null;
        this.retryTimeout = options.retryTimeout || 25;
        this.retryInterval = options.retryInterval || 1000;
        this.retryCounter = 0;
        this.clients = {};
        this.connections = {};
        this.port = options.port;
        this.host = options.host || "localhost";
    }
    async start(timeout) {
        try {
            const res = await this.connectAbci(timeout);
            console.log(`Connected Response: ${res}`);
            const options = {
                host: this.host,
                port: this.port,
            };
            this.setupServer(options);
            this.newBlockEmitter = new events_1.EventEmitter();
        }
        catch (err) {
            throw new Error(`Failed to start: ${err}`);
        }
        return;
    }
    setupServer(options) {
        this.server = new WebSocket.Server(options);
        this.server.on("connection", this.newConnHandlerWrapper());
    }
    newConnHandlerWrapper() {
        return (conn) => {
            const id = `id${Math.floor((Math.random() * 90000) + 10000)}`;
            this.connections[id] = conn;
            conn.on("message", this.handleClientMessageWrapper(id));
        };
    }
    handleClientMessageWrapper(ssID) {
        return (msg) => {
            let res;
            const req = new JsonRequest_1.JsonRequest(msg);
            const error = req.validate();
            if (error) {
                res = new JsonResponse_1.JsonResponse({ error });
                this.sendMessageToClient(ssID, res);
                return;
            }
            switch (req.parsed.method) {
                case "session.start": {
                    this.handleNewSession(ssID, req.parsed);
                    return;
                }
                case "session.end": {
                    this.connections[ssID].close();
                    return;
                }
                case "subscription.start": {
                    this.newBlockEmitter.on("newBlock", (data) => {
                        const res = new JsonResponse_1.JsonResponse({
                            id: req.parsed.id,
                            result: data.txs
                        });
                        this.sendMessageToClient(ssID, res);
                    });
                    return;
                }
                default: {
                    log_1.warn("api", `unknown method '${req.parsed.method}' call from: '${req.parsed.id}'`);
                    return;
                }
            }
        };
    }
    getPseudoRandomSessionId() {
        const msFromTime = Date.now().toString().slice(-4).toString();
        const randomInts = Math.floor((Math.random() * 9000) + 1000).toString();
        return `${msFromTime}${randomInts}`;
    }
    handleNewSession(ssID, req) {
        let res;
        const { id, method, params } = req;
        if (this.clients.hasOwnProperty(id)) {
            const error = {
                code: "-32602",
                message: "Please pick a different 'id'."
            };
            res = new JsonResponse_1.JsonResponse({ error });
        }
        else {
            this.clients[id] = {
                conn: this.connections[ssID],
                ssID,
                method,
                params,
            };
            const result = `session ${id} starting. End with 'session.end' method.`;
            res = new JsonResponse_1.JsonResponse({ id, result });
            log_1.log("api", `new client added with id: '${id}'`);
        }
        this.sendMessageToClient(ssID, res);
    }
    sendMessageToClient(ssID, res) {
        const conn = this.connections[ssID];
        if (!conn)
            return;
        if (conn.readyState !== conn.OPEN) {
            return;
        }
        conn.send(JSON.stringify(res));
        return;
    }
    connectAbci(timeout) {
        console.log(`Attempting to connect ${timeout} time(s) every ${this.retryInterval} ms...`);
        return new Promise((resolve, reject) => {
            const timer = timers_1.setInterval(() => {
                if (this.retryCounter > timeout) {
                    reject("Connection timeout.");
                }
                if (this.abciConn && this.abciConn.listeners.length > 0) {
                    this.abciConn.removeEventListener("open");
                }
                this.attemptConnection(resolve, timer);
            }, this.retryInterval);
        });
    }
    attemptConnection(resolve, timer) {
        this.retryCounter++;
        this.abciConn = new WebSocket(this.abciURL.href);
        this.abciConn.on("error", () => null);
        this.abciConn.once("open", () => {
            this.attachHandlersABCI();
            this.subscribeToParadigmCoreEvent("NewBlock");
            clearInterval(timer);
            const num = this.retryCounter;
            this.retryCounter = 0;
            resolve(`Connected after ${num} attempts.`);
        });
    }
    attachHandlersABCI(timeout = 2000) {
        this.abciConn.removeAllListeners();
        this.abciConn.on("error", this.clientErrorHandler);
        this.abciConn.on("message", (data) => {
            this.handleNewABCIMessage(data);
        });
        this.abciConn.once("close", this.fatalCloseHandlerWrapper(timeout));
    }
    fatalCloseHandlerWrapper(timeout) {
        return async () => {
            try {
                console.log(`Connection lost, attempting to reconnect...`);
                await this.connectAbci(timeout);
            }
            catch (err) {
                console.log(err);
                console.log("Fatal, failed to reconnect to ABCI server.");
                process.exit(1);
            }
        };
    }
    clientErrorHandler(msg) {
        console.log(`error from client connection: ${msg}`);
    }
    handleNewABCIMessage(data) {
        const parsed = JSON.parse(data);
        if (parsed.id !== `${this.abciSessionId}#event`) {
            return;
        }
        const type = parsed.result.data.type;
        const res = parsed.result.data.value;
        switch (type) {
            case "tendermint/event/NewBlock": {
                this.newBlockHandler(res);
                break;
            }
            default: {
                log_1.warn("api", "received non-implemented ABCI response message type.");
                break;
            }
        }
    }
    getUnixTimeFromISO(isoDate) {
        const date = new Date(isoDate);
        const rawUnixTimeMs = date.getTime();
        const outputUnixTime = Math.round(rawUnixTimeMs);
        return outputUnixTime.toString();
    }
    decodeTxArr(txs) {
        if (txs.length <= 0) {
            return txs;
        }
        return txs.map((tx) => {
            let inBuff;
            let dcBuff;
            let outStr;
            try {
                inBuff = Buffer.from(Buffer.from(tx, "base64").toString("utf8"), "base64");
                dcBuff = zlib.inflateSync(inBuff);
                outStr = dcBuff.toString("utf8");
            }
            catch (error) {
                log_1.warn("api", "error decoding transaction from block.");
                return tx;
            }
            return outStr;
        });
    }
    newBlockHandler(res) {
        const { header, data } = res.block;
        const abciData = {
            lastBlockHeight: header.height,
            lastBlockUnixTime: this.getUnixTimeFromISO(header.time),
            lastBlockDataHash: header.data_hash ? header.data_hash : null,
            lastBlockProposer: header.proposer_address,
            txs: data.txs ? this.decodeTxArr(data.txs) : [],
            txCount: header.num_txs,
            lastBlockAppHash: header.app_hash,
        };
        this.latestAbciData = abciData;
        this.newBlockEmitter.emit("newBlock", abciData);
        return;
    }
    subscribeToParadigmCoreEvent(eventName, fullParam) {
        if (eventName !== "NewBlock") {
            console.log("DEV: temporarily ignoring non 'NewBlock' event.");
            return;
        }
        if (this.abciConn.readyState !== 1)
            return;
        if (this.abciSessionId !== null) {
            this.abciSessionId = this.getPseudoRandomSessionId();
        }
        const param = fullParam ? fullParam : `tm.event='${eventName}'`;
        const subscribeOptions = {
            method: "subscribe",
            jsonrpc: "2.0",
            params: [param],
            id: this.abciSessionId,
        };
        this.abciConn.send(JSON.stringify(subscribeOptions));
        return;
    }
    getAbciReadyState() {
        return this.abciConn.readyState;
    }
}
StreamServer.api = api;
exports.StreamServer = StreamServer;
