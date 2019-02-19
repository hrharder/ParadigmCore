"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const Paradigm = require("paradigm-connect");
const Web3 = require("web3");
const tendermint = require("../lib/tendermint");
const Witness_1 = require("./witness/Witness");
const TxBroadcaster_1 = require("./core/util/TxBroadcaster");
const TxGenerator_1 = require("./core/util/TxGenerator");
const commitState_1 = require("./state/commitState");
const deliverState_1 = require("./state/deliverState");
const HttpServer_1 = require("./api/post/HttpServer");
const main_1 = require("./core/main");
const log_1 = require("./common/log");
const messages_1 = require("./common/static/messages");
let witness;
let broadcaster;
let generator;
let web3;
let paradigm;
let node;
(async (env) => {
    log_1.logStart();
    if (!env.npm_package_version) {
        log_1.err("start", "paradigm-core should be started with npm or yarn");
        log_1.err("start", messages_1.messages.general.errors.fatal);
        process.exit(1);
    }
    log_1.log("tm", "starting tendermint core...");
    try {
        let options = {
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
        node = tendermint.node(env.TM_HOME, options);
        if (env.DEBUG)
            node.stdout.pipe(process.stdout);
    }
    catch (error) {
        log_1.err("tm", "tendermint may not be installed or configured.");
        log_1.err("tm", "use `npm i` to configure tendermint and set up paradigmcore.");
        return {
            message: error.message,
            info: `unable to start tendermint-core`,
            comp: "tm"
        };
    }
    log_1.log("api", "setting up paradigm-connect and web3 connection...");
    try {
        web3 = new Web3(env.WEB3_PROVIDER);
        paradigm = new Paradigm({ provider: web3.currentProvider });
    }
    catch (error) {
        return {
            message: error.message,
            info: "failed creating paradigm-connect instance",
            comp: "api"
        };
    }
    log_1.log("tx", "setting up validator transaction broadcaster...");
    try {
        broadcaster = new TxBroadcaster_1.TxBroadcaster({ client: node.rpc });
    }
    catch (error) {
        throw {
            message: error.message,
            info: "failed creating transaction broadcaster instance",
            comp: "tx"
        };
    }
    log_1.log("tx", "setting up validator transaction signer...");
    try {
        generator = new TxGenerator_1.TxGenerator({
            encoding: env.SIG_ENC,
            privateKey: env.PRIV_KEY,
            publicKey: env.PUB_KEY,
        });
    }
    catch (error) {
        throw {
            message: error.message,
            info: "failed to construct transaction generator",
            comp: "tx"
        };
    }
    log_1.log("api", "starting WS API server...");
    try {
    }
    catch (error) {
        throw {
            message: error.message,
            info: "failed initializing the stream-api server",
            comp: "api"
        };
    }
    log_1.log("api", "starting HTTP API server...");
    try {
        await HttpServer_1.start({
            paradigm,
            broadcaster, generator,
            rateWindow: parseInt(env.WINDOW_MS, 10),
            rateMax: parseInt(env.WINDOW_MAX, 10),
            port: parseInt(env.POST_PORT, 10)
        });
    }
    catch (error) {
        throw {
            message: error.message,
            info: "failed initializing api server.",
            comp: "api"
        };
    }
    log_1.log("witness", "creating witness instance...");
    try {
        witness = await Witness_1.Witness.create({
            generator,
            tendermintRpcUrl: "ws://localhost:26657",
            reconnAttempts: 20,
            reconnInterval: 1000,
            provider: env.WEB3_PROVIDER,
            finalityThreshold: parseInt(env.FINALITY_THRESHOLD, 10),
            periodLength: parseInt(env.PERIOD_LENGTH, 10),
            periodLimit: parseInt(env.PERIOD_LIMIT, 10),
        });
        log_1.log("peg", "waiting to start new witness instance...");
    }
    catch (error) {
        throw {
            message: error.message,
            info: "failed initializing witness component.",
            comp: "witness"
        };
    }
    log_1.log("state", "starting paradigmcore...");
    try {
        await main_1.start({
            paradigm,
            witness,
            abciServPort: parseInt(env.ABCI_PORT, 10),
            commitState: commitState_1.commitState,
            deliverState: deliverState_1.deliverState,
            version: env.npm_package_version,
            finalityThreshold: parseInt(env.FINALITY_THRESHOLD, 10),
            periodLength: parseInt(env.PERIOD_LENGTH, 10),
            periodLimit: parseInt(env.PERIOD_LIMIT, 10),
            maxOrderBytes: parseInt(env.MAX_ORDER_SIZE, 10),
            txGenerator: generator,
        });
        log_1.log("tm", "waiting for tendermint to synchronize...");
        await node.synced();
        log_1.log("tm", "tendermint initialized and synchronized");
    }
    catch (error) {
        throw {
            message: error.message,
            info: "failed initializing abci application",
            comp: "state"
        };
    }
    log_1.log("peg", "starting witness component...");
    const witRes = await witness.start();
    if (witRes !== 0) {
        throw {
            message: "failed to start witness.",
            info: "failed initializing abci application",
            comp: "peg"
        };
    }
    log_1.log("peg", messages_1.messages.rebalancer.messages.activated);
    log_1.log("tx", "starting validator transaction broadcaster...");
    broadcaster.start();
    return;
})(process.env).then(() => {
    log_1.logStart("paradigm-core startup successfully completed");
}).catch((error) => {
    log_1.err(error.comp, error.info);
    log_1.err("start", error.message);
    log_1.err("start", messages_1.messages.general.errors.fatal);
    process.exitCode = 1;
});
