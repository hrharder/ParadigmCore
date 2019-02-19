"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../common/log");
const utils_1 = require("./util/utils");
const messages_1 = require("../common/static/messages");
const order_1 = require("./handlers/order");
const witness_1 = require("./handlers/witness");
const rebalance_1 = require("./handlers/rebalance");
function deliverTxWrapper(state, Order) {
    return (request) => {
        const rawTx = request.tx;
        let tx;
        try {
            tx = utils_1.decodeTx(rawTx);
        }
        catch (error) {
            log_1.warn("state", messages_1.messages.abci.errors.decompress);
            return utils_1.invalidTx(messages_1.messages.abci.errors.decompress);
        }
        if (!utils_1.preVerifyTx(tx, state)) {
            log_1.warn("state", messages_1.messages.abci.messages.badSig);
            return utils_1.invalidTx(messages_1.messages.abci.messages.badSig);
        }
        switch (tx.type) {
            case "order": {
                return order_1.deliverOrder(tx, state, Order);
            }
            case "witness": {
                return witness_1.deliverWitness(tx, state);
            }
            case "rebalance": {
                return rebalance_1.deliverRebalance(tx, state);
            }
            default: {
                log_1.warn("state", messages_1.messages.abci.errors.txType);
                return utils_1.invalidTx(messages_1.messages.abci.errors.txType);
            }
        }
    };
}
exports.deliverTxWrapper = deliverTxWrapper;
