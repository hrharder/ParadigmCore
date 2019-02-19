"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Hasher_1 = require("../crypto/Hasher");
const utils_1 = require("./util/utils");
const log_1 = require("../common/log");
const bigIntUtils_1 = require("../common/static/bigIntUtils");
function commitWrapper(deliverState, commitState) {
    return () => {
        let stateHash;
        try {
            deliverState.lastBlockHeight += 1;
            stateHash = Hasher_1.Hasher.hashState(deliverState);
            deliverState.lastBlockAppHash = stateHash;
            const roundDiff = deliverState.round.number - commitState.round.number;
            if (roundDiff === 1) {
                console.log(`\nLATEST STATE:\n${JSON.stringify(deliverState, bigIntUtils_1.bigIntReplacer)}\n`);
            }
            utils_1.syncStates(deliverState, commitState);
            log_1.log("state", `new state hash: ` +
                `${stateHash.toString("hex").slice(0, 5)}...` +
                `${stateHash.toString("hex").slice(-5)}`, commitState.lastBlockHeight, stateHash.toString("hex").toUpperCase());
        }
        catch (error) {
            log_1.err("state", `commit failed for block #${deliverState.lastBlockHeight}: ${error.message}`);
        }
        return { data: stateHash };
    };
}
exports.commitWrapper = commitWrapper;
