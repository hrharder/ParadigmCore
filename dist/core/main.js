"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abci = require("abci");
const log_1 = require("../common/log");
const beginBlock_1 = require("./beginBlock");
const checkTx_1 = require("./checkTx");
const deliverTx_1 = require("./deliverTx");
const initChain_1 = require("./initChain");
const commit_1 = require("./commit");
const info_1 = require("./info");
const endBlock_1 = require("./endBlock");
async function start(options) {
    try {
        let version = options.version;
        let Order = options.paradigm.Order;
        let dState = options.deliverState;
        let cState = options.commitState;
        let consensusParams = {
            finalityThreshold: options.finalityThreshold,
            periodLength: options.periodLength,
            periodLimit: options.periodLimit,
            maxOrderBytes: options.maxOrderBytes
        };
        let handlers = {
            info: info_1.infoWrapper(cState, version),
            initChain: initChain_1.initChainWrapper(dState, cState, consensusParams),
            checkTx: checkTx_1.checkTxWrapper(cState, Order),
            beginBlock: beginBlock_1.beginBlockWrapper(dState),
            deliverTx: deliverTx_1.deliverTxWrapper(dState, Order),
            endBlock: endBlock_1.endBlockWrapper(dState),
            commit: commit_1.commitWrapper(dState, cState),
        };
        await abci(handlers).listen(options.abciServPort);
        log_1.log("state", `abci server connected on port ${options.abciServPort}`);
    }
    catch (error) {
        throw new Error(`initializing abci application: ${error.message}`);
    }
    return;
}
exports.start = start;
