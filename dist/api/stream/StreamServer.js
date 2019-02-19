"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JsonRequest_1 = require("./JsonRequest");
const JsonResponse_1 = require("./JsonResponse");
const log_1 = require("../../common/log");
const _ = require("lodash");
const events_1 = require("events");
const WebSocket = require("ws");
const crypto_1 = require("crypto");
class StreamServer extends events_1.EventEmitter {
    static generate32RandomBytes(start) {
        let output;
        const hash = crypto_1.createHash("sha256");
        const timestampString = Date.now().toString();
        const timestampBytes = Buffer.from(timestampString, "utf8");
        const unsafeBytes = Buffer.allocUnsafe(16);
        hash.update(timestampBytes);
        hash.update(unsafeBytes);
        output = hash.digest();
        return start ? output.slice(start) : output;
    }
    static generateEventId(connectionId, salt) {
        const hash = crypto_1.createHash("sha256");
        const connectionIdBytes = Buffer.from(connectionId, "hex");
        hash.update(connectionIdBytes);
        hash.update(salt);
        const output = hash.digest().slice(0, 16);
        const eventId = output.toString("hex");
        return eventId;
    }
    static generateConnectionId(secret, salt) {
        const hash = crypto_1.createHash("sha256");
        hash.update(secret);
        hash.update(salt);
        const output = hash.digest().slice(0, 32);
        const connectionId = output.toString("hex");
        return connectionId;
    }
    constructor(options = {}) {
        super();
        this.secret = StreamServer.generate32RandomBytes();
        this.retryMax = options.retryMax || 30;
        this.retryInterval = options.retryInterval || 2000;
        this.subscriptions = [];
        this.connectionMap = {};
        this.streamPort = options.port || 14342;
        this.streamHost = options.host || "localhost";
        this.started = false;
        return;
    }
    async start() {
        this.setupServer(this.streamHost, this.streamPort);
        return;
    }
    setupServer(host, port) {
        const options = { host, port };
        this.server = new WebSocket.Server(options);
        this.server.on("connection", this.createConnectionHandler());
    }
    createConnectionHandler() {
        return (conn) => {
            const connectionId = StreamServer.generateConnectionId(this.secret, StreamServer.generate32RandomBytes());
            this.connectionMap[connectionId] = conn;
            conn.on("close", () => {
                log_1.log("api", `Disconnect from connection "id": "${connectionId}"`);
                this.connectionMap[connectionId] = undefined;
            });
            conn.on("message", (msg) => {
                if (!_.isString(msg)) {
                    log_1.warn("api", `Non-string message from connection '${connectionId}' of type '${typeof msg}'`);
                    conn.send("strings only pls.");
                    return;
                }
                log_1.log("api", `Message from connection '${connectionId}': '${msg}'`);
                let res;
                const req = new JsonRequest_1.JsonRequest(msg);
                const error = req.validate();
                if (error) {
                    res = new JsonResponse_1.JsonResponse({ error });
                    this.sendMessageToClient(connectionId, res);
                    log_1.warn("api", `Send error message to connection '${connectionId}'`);
                    return;
                }
                else {
                    res = new JsonResponse_1.JsonResponse({ id: "none", result: "yeah this is okay." });
                    this.sendMessageToClient(connectionId, res);
                    log_1.log("api", `Send OK message to connection '${connectionId}'`);
                    return;
                }
            });
            conn.on("open", () => {
                console.log("\nya it open bud\n");
                const res = new JsonResponse_1.JsonResponse({ id: "none", result: "welcome brudda" });
                this.sendMessageToClient(connectionId, res);
                log_1.log("api", `Send open message to connection '${connectionId}'`);
                return;
            });
            conn.on("error", (error) => {
                log_1.warn("api", `Error from connection '${connectionId}': ${error.message}`);
                const res = new JsonResponse_1.JsonResponse({ id: "none", result: "goodbye, error found." });
                this.sendMessageToClient(connectionId, res);
                log_1.warn("api", `Send error message to connection '${connectionId}'`);
                this.connectionMap[connectionId] = undefined;
                return;
            });
            log_1.log("api", `Got new connection "id": "${connectionId}"`);
            return;
        };
    }
    sendMessageToClient(id, res) {
        const conn = this.connectionMap[id];
        if (!conn)
            return;
        if (conn.readyState !== conn.OPEN) {
            return;
        }
        conn.send(JSON.stringify(res));
        return;
    }
}
exports.StreamServer = StreamServer;
