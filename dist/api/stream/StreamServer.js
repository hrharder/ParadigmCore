"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Request_1 = require("./Request");
const log_1 = require("../../common/log");
const TendermintRPC_js_1 = require("../../common/TendermintRPC.js");
const utils_js_1 = require("./utils.js");
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
        this.subscriptions = [];
        this.connectionMap = {};
        this.methods = {};
        this.latestBlockData = {};
        this.streamPort = options.port || 14342;
        this.streamHost = options.host || "localhost";
        this.retryMax = options.retryMax || 30;
        this.retryInterval = options.retryInterval || 2000;
        this.rpcClient = new TendermintRPC_js_1.TendermintRPC(options.tendermintRpcUrl, this.retryMax, this.retryInterval);
        this.started = false;
        return;
    }
    async start() {
        this.rpcClient.on("open", this.createTendermintHandler());
        await this.rpcClient.connect(this.retryMax, this.retryInterval);
        this.setupServer(this.streamHost, this.streamPort);
        return;
    }
    bind(methodName, method) {
        this.methods[methodName] = method;
    }
    createTendermintHandler() {
        return () => {
            log_1.log("api", "connected to tendermint rpc server");
            this.rpcClient.subscribe("tm.event='NewBlock'", this.createNewBlockHandler());
            return;
        };
    }
    createNewBlockHandler() {
        return (data) => {
            const { height } = data.block.header;
            this.latestBlockData.height = parseInt(height, 10);
            log_1.log("api", `received new tendermint block: ${height}`);
            return;
        };
    }
    setupServer(host, port) {
        const options = { host, port };
        this.server = new WebSocket.Server(options);
        this.server.on("connection", this.createConnectionHandler());
    }
    createConnectionHandler() {
        return (connection) => {
            const connectionId = StreamServer.generateConnectionId(this.secret, StreamServer.generate32RandomBytes());
            this.connectionMap[connectionId] = connection;
            connection.on("close", this.createConnCloseHandler(connectionId));
            connection.on("message", this.createConnMessageHandler(connectionId));
            connection.on("open", this.createConnOpenHandler(connectionId));
            connection.on("error", this.createConnErrorHandler(connectionId));
        };
    }
    createConnCloseHandler(connId) {
        return () => {
            log_1.log("api", `Disconnect from connection "id": "${connId}"`);
            delete this.connectionMap[connId];
        };
    }
    createConnOpenHandler(connId) {
        return () => {
            log_1.log("api", `Got new connection with "id": "${connId}"`);
            return;
        };
    }
    createConnErrorHandler(connId) {
        return (error) => {
            const intError = utils_js_1.createValError(-32603, `Internal error: ${error.message}`);
            const res = utils_js_1.createResponse(null, null, intError);
            log_1.warn("api", "Sending error message (internal) to client.");
            this.sendMessageToClient(connId, res);
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
    createConnMessageHandler(connId) {
        return (msg) => {
            log_1.log("api", `Message from connection '${connId}': '${msg}'`);
            let res, req, error;
            req = new Request_1.Request(msg);
            error = req.validate();
            if (error) {
                res = utils_js_1.createResponse(null, null, error);
                this.sendMessageToClient(connId, res);
                return;
            }
            if (!_.isObject(req.parsed)) {
                const methError = utils_js_1.createValError(-32700, "unable to parse request.");
                res = utils_js_1.createResponse(null, null, methError);
                this.sendMessageToClient(connId, res);
                return;
            }
            const { params, id, method } = req.parsed;
            if (!this.methods[method]) {
                const methError = utils_js_1.createValError(-32601, "method not implemented.");
                res = utils_js_1.createResponse(null, null, methError);
                this.sendMessageToClient(connId, res);
                return;
            }
            const result = this.methods[method](this, this.connectionMap[connId], params);
            log_1.log("api", `Executing method for connection '${connId}'`);
            res = utils_js_1.createResponse(result, id, null);
            this.sendMessageToClient(connId, res);
            return;
        };
    }
}
exports.StreamServer = StreamServer;
