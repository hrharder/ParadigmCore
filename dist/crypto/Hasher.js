"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hash = require("object-hash");
const bigIntUtils_1 = require("../common/static/bigIntUtils");
class Hasher {
    static hashOrder(order) {
        let orderHash;
        const hashPrep = {
            makerValues: order.makerValues,
            posterSignature: order.posterSignature,
            subContract: order.subContract,
        };
        try {
            orderHash = hash(hashPrep);
        }
        catch (error) {
            throw new Error(`failed generating order hash: ${error.message}`);
        }
        return orderHash;
    }
    static hashState(state) {
        let stateHash;
        const hashPrep = {
            posters: JSON.stringify(state.posters, bigIntUtils_1.bigIntReplacer),
            endHeight: state.round.endsAt,
            events: JSON.stringify(state.events, bigIntUtils_1.bigIntReplacer),
            lastHeight: parseInt(state.lastBlockHeight.toString(), 10),
            ordernum: parseInt(state.orderCounter.toString(), 10),
            roundNumber: state.round.number,
            startHeight: state.round.startsAt,
            lastHash: state.lastBlockAppHash
        };
        try {
            stateHash = Buffer.from(hash(hashPrep), "hex");
        }
        catch (error) {
            throw new Error(`failed generating state hash: ${error.message}`);
        }
        return stateHash;
    }
}
exports.Hasher = Hasher;
