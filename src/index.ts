/**
 * ===========================
 * ParadigmCore: Blind Star
 * @name index.ts
 * @module src
 * ===========================
 *
 * @author Henry Harder
 * @date (initial)  12-September-2018
 * @date (modified) 21-January-2019
 *
 * Startup script for ParadigmCore. Provide configuration through environment.
*/

// Load configuration from environment
require("dotenv").config();

// ParadigmConnect protocol driver and library
import * as Paradigm from "paradigm-connect";

// Standard lib and 3rd party NPM modules
import Web3 = require("web3");
import * as tendermint from "../lib/tendermint";

// ParadigmCore classes
import { Witness } from "./witness/Witness";
import { TxBroadcaster } from "./core/util/TxBroadcaster";
import { TxGenerator } from "./core/util/TxGenerator";

// State object templates
import { commitState as cState } from "./state/commitState";
import { deliverState as dState } from "./state/deliverState";

// Initialization functions
import { start as startAPIserver } from "./api/post/HttpServer";
// import { start as startStreamServer } from "./api/stream/WsServer";
import { start as startMain } from "./core/main";

// General utilities and misc.
import { err, log, logStart, warn } from "./common/log";
import { messages as msg } from "./common/static/messages";
import { StreamServer } from "./api/stream/StreamServer";

// VALIDATOR MODULES
let witness:        Witness;
let broadcaster:    TxBroadcaster;  // internal ABCI transaction broadcaster
let generator:      TxGenerator;    // construct and sign paradigm-core tx's
let web3: Web3;                 // web3 instance
let paradigm;                   // paradigm instance (paradigm-connect)
let node;                       // tendermint node child process instance

/**
 * This function executes immediately upon this file being loaded. It is
 * responsible for starting all dependant modules.
 *
 * Provide configuration options via environment (or use .env file)
 *
 * @param env   {object}    environment variables (expected as process.env)
 */
(async (env) => {
    // welcome :)
    logStart();

    // validate startup-environment
    if (!env.npm_package_version) {
        err("start", "paradigm-core should be started with npm or yarn");
        err("start", msg.general.errors.fatal);
        process.exit(1);
    }

    // tendermint core
    log("tm", "starting tendermint core...");
    try {
        // todo: define options object
        let options: any  = {
            moniker: env.MONIKER,
            rpc: {
                laddr: `tcp://${env.ABCI_HOST}:${env.ABCI_RPC_PORT}`,
            },
        };
        if (env.SEEDS !== "" && env.SEEDS !== undefined) {
            options.p2p = {
                seeds: env.SEEDS
            };
        }

        // create tendermint subprocess
        node = tendermint.node(env.TM_HOME, options);

        // if in debug mode, pipe tendermint logs to STDOUT
        if (env.DEBUG) node.stdout.pipe(process.stdout);
    } catch (error) {
        err("tm", "tendermint may not be installed or configured.");
        err("tm", "use `npm i` to configure tendermint and set up paradigmcore.");
        return { 
            message: error.message,
            info: `unable to start tendermint-core`,
            comp: "tm"
        };
    }

    // paradigm-connect and web3
    log("api", "setting up paradigm-connect and web3 connection...");
    try {
        web3 = new Web3(env.WEB3_PROVIDER);
        paradigm = new Paradigm({ provider: web3.currentProvider });
    } catch (error) {
        return { 
            message: error.message,
            info: "failed creating paradigm-connect instance",
            comp: "api"
        };
        
    }

    // local transaction broadcaster
    log("tx", "setting up validator transaction broadcaster...");
    try {
        broadcaster = new TxBroadcaster({ client: node.rpc });
    } catch (error) {
        throw { 
            message: error.message,
            info: "failed creating transaction broadcaster instance",
            comp: "tx"
        };
        
    }

    log("tx", "setting up validator transaction signer...");
    try {
        generator = new TxGenerator({
            encoding: env.SIG_ENC,
            privateKey: env.PRIV_KEY,
            publicKey: env.PUB_KEY,
        });
    } catch (error) {
        throw { 
            message: error.message,
            info: "failed to construct transaction generator",
            comp: "tx"
        };
    }

    log("api", "starting WS API server...");
    try {
        // create new stream-api server ...
    } catch (error) {
        throw { 
            message: error.message,
            info: "failed initializing the stream-api server",
            comp: "api"
        };
    }

    log("api", "starting HTTP API server...");
    try {
        await startAPIserver({
            // Paradigm instance
            paradigm,

            // Tx generator/broadcaster
            broadcaster, generator,

            // Rate limiter config
            rateWindow: parseInt(env.WINDOW_MS, 10),
            rateMax: parseInt(env.WINDOW_MAX, 10),

            // API bind port (HTTP)
            port: parseInt(env.POST_PORT, 10)
        });
    } catch (error) {
        throw { 
            message: error.message,
            info: "failed initializing api server.",
            comp: "api"
        };
    }

    log("witness", "creating witness instance...");
    try {
        witness = await Witness.create({
            // validator signer/transaction generator
            generator,

            // tendermint rpc config
            tendermintRpcUrl: "ws://localhost:26657",
            reconnAttempts: 20,
            reconnInterval: 1000,

            // web3 provider url and contract config
            provider: env.WEB3_PROVIDER,

            // initial consensus params
            finalityThreshold: parseInt(env.FINALITY_THRESHOLD, 10),
            periodLength: parseInt(env.PERIOD_LENGTH, 10),
            periodLimit: parseInt(env.PERIOD_LIMIT, 10),
        });
        log("peg", "waiting to start new witness instance...");
    } catch (error) {
        throw { 
            message: error.message,
            info: "failed initializing witness component.",
            comp: "witness"
        };
    }

    // start main paradigmcore
    log("state", "starting paradigmcore...");
    try {
        await startMain({
            // Paradigm instance, order tracker, and witness component
            paradigm,
            witness,

            // ABCI configuration options
            abciServPort: parseInt(env.ABCI_PORT, 10),
            commitState: cState,
            deliverState: dState,
            version: env.npm_package_version,

            // Rebalancer and consensus options
            finalityThreshold: parseInt(env.FINALITY_THRESHOLD, 10),
            periodLength: parseInt(env.PERIOD_LENGTH, 10),
            periodLimit: parseInt(env.PERIOD_LIMIT, 10),
            maxOrderBytes: parseInt(env.MAX_ORDER_SIZE, 10),
            txGenerator: generator,
        });
        log("tm", "waiting for tendermint to synchronize...");

        // Wait for Tendermint to load and synchronize
        await node.synced();
        log("tm", "tendermint initialized and synchronized");

        // Activate transaction broadcaster
        log("tx", "starting validator transaction broadcaster...");
        broadcaster.start();

        // activate order tracker
        log("api", "activating order-stream websocket api...");
        // tracker.activate();

        // Start state rebalancer sub-process AFTER sync
        log("peg", "starting witness component...");
        if (await witness.start() !== 0) { throw Error("failed to start witness."); }
        log("peg", msg.rebalancer.messages.activated);
    } catch (error) {
        throw { 
            message: error.message,
            info: "failed initializing abci application",
            comp: "state"
        };
    }
    return;
})(process.env).then(() => {
    logStart("paradigm-core startup successfully completed");
}).catch((error) => {
    err(error.comp, error.info);
    err("start", error.message);
    err("start", msg.general.errors.fatal);
    process.exitCode = 1;
});

