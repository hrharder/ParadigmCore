"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function infoWrapper(state, version) {
    return (request) => {
        return {
            data: "ParadigmCore (alpha)",
            lastBlockAppHash: state.lastBlockAppHash,
            lastBlockHeight: parseInt(state.lastBlockHeight.toString(), 10),
            version,
            arb: "any"
        };
    };
}
exports.infoWrapper = infoWrapper;
