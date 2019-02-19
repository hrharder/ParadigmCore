"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const wrapAsync = require("express-async-handler");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const log_1 = require("../../common/log");
const messages_1 = require("../../common/static/messages");
const HttpMessage_1 = require("./HttpMessage");
let client;
let generator;
let app = express();
async function start(options) {
    try {
        client = options.broadcaster;
        generator = options.generator;
        const limiter = rateLimit({
            windowMs: options.rateWindow,
            max: options.rateMax,
            message: {
                error: 429,
                message: "burst request limit reached"
            }
        });
        app.enable("trust proxy");
        app.use(limiter);
        app.use(helmet());
        app.use(cors());
        app.use(bodyParser.json());
        app.post("/*", wrapAsync(postHandler));
        app.use(errorHandler);
        await app.listen(options.port);
        log_1.log("api", `http api server started on port ${options.port}`);
        return;
    }
    catch (error) {
        throw new Error(error.message);
    }
}
exports.start = start;
async function postHandler(req, res, next) {
    const tx = generator.create({ data: req.body, type: "order" });
    const response = await client.send(tx);
    HttpMessage_1.HttpMessage.staticSend(res, response);
}
function errorHandler(error, req, res, next) {
    log_1.warn("api", `POST request failed with: ${error.message}`);
    try {
        HttpMessage_1.HttpMessage.staticSendError(res, `request failed with error: ${error.message}`, 500);
    }
    catch (caughtError) {
        log_1.err("api", messages_1.messages.api.errors.response);
        log_1.err("api", `reported error: ${caughtError.message}`);
    }
}
