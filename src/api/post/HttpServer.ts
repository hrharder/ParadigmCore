/**
 * ===========================
 * ParadigmCore: Blind Star
 * @name HttpServer.ts
 * @module api/post
 * ===========================
 *
 * @author Henry Harder
 * @date (initial)  24-September-2018
 * @date (modified) 19-December-2018
 *
 * ExpressJS server to enable incoming orders to be received as POST requests.
 *
 * @10-16: TODO: support StreamBroadcast type.
 */

// 3rd party imports
import * as bodyParser from "body-parser";
import cors = require("cors");
import * as express from "express";
import * as wrapAsync from "express-async-handler";
import * as rateLimit from "express-rate-limit";
import * as helmet from "helmet";

// ParadigmCore classes and imports
import { err, log as Log, warn } from "../../common/log";
import { messages as msg } from "../../common/static/messages";
import { TendermintRPC } from "../../common/TendermintRPC";
import { TxGenerator } from "../../core/util/TxGenerator";
import { HttpMessage as Message } from "./HttpMessage";

// Type defs
import { NextFunction, Request, Response } from "express";

// "Globals"
let client: TendermintRPC;  // connection to tendermint rpc server
let generator: TxGenerator; // Generates and signs ABCI tx's
let app = express();        // Express.js server
let ready = false;

/**
 * Start and bind API server.
 *
 * @param options {object} options object with:
 * - options.tendermintHost {string}        the network host tendermint running on
 * - options.tendermintPort {number}        the port the tendermint rpc server is on
 * - options.generator      {TxGenerator}   validator tx generator instance
 * - options.paradigm       {Paradigm}      paradigm-connect instance
 * - options.port           {number}        port to bind HTTP server to
 * - options.rateWindow     {number}        window (in ms) to rate-limit over
 * - options.rateMax        {number}        no. of requests allowed per window
 */
export async function start(options) {
    try {
        // validate tendermint rpc url
        const url = new URL(
            `ws://${options.tendermintHost}:${options.tendermintPort}/websocket`
        );

        // create tendermint-rpc connection and store generator reference
        client = new TendermintRPC(url.href, 100, 2000);
        generator = options.generator;

        // set up rate limiting
        const limiter = rateLimit({
            windowMs: options.rateWindow,
            max: options.rateMax,
            message: {
              error: 429,
              message: "burst request limit reached"
            }
        });

        // setup express server
        app.enable("trust proxy");
        app.use(limiter);
        app.use(helmet());
        app.use(cors());
        app.use(bodyParser.json());

        // attach handlers
        app.post("/*", wrapAsync(postHandler));
        app.use(errorHandler);

        // start API server
        await app.listen(options.port);

        // connect to tendermint rpc instance
        client.connect(100, 2000).then(() => {
            ready = true;
        }).catch((e) => {
            ready = false;
            err("api", `Client (tendermint) error: ${e.message}`);
        });

        // finish
        Log("api", `http api server started on port ${options.port}`);
        return;
    } catch (error) {
        throw new Error(error.message);
    }
}

/**
 * Express POST handler for incoming orders (and eventually stream tx's).
 */
async function postHandler(req: Request, res: Response, next: NextFunction) {
    // don't try to send if not ready
    if (!ready) {
        Message.staticSend(res, "Server not ready yet. Try again later.");
        return;
    }

    // Create transaction object
    const tx: SignedTransaction = generator.create({ data: req.body, type: "order" });

    // submit transaction to mempool and network
    const { log } = await client.submitTx(tx);

    // send response from application back to client
    Message.staticSend(res, log);
    return;
}

/**
 * General error handler.
 */
function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
    warn("api", `POST request failed with: ${error.message}`);
    try {
        Message.staticSendError(res, `request failed with error: ${error.message}`, 500);
    } catch (caughtError) {
        err("api", msg.api.errors.response);
        err("api", `reported error: ${caughtError.message}`);
    }
}
