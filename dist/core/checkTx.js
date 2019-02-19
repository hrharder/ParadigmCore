"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../common/log");
const messages_1 = require("../common/static/messages");
const utils_1 = require("./util/utils");
const order_1 = require("./handlers/order");
const witness_1 = require("./handlers/witness");
const rebalance_1 = require("./handlers/rebalance");
function checkTxWrapper(state, Order) {
    return (request) => {
        const rawTx = request.tx;
        let tx;
        try {
            tx = utils_1.decodeTx(rawTx);
        }
        catch (error) {
            log_1.warn("mem", messages_1.messages.abci.errors.decompress);
            return utils_1.invalidTx(messages_1.messages.abci.errors.decompress);
        }
        if (!utils_1.preVerifyTx(tx, state)) {
            log_1.warn("mem", messages_1.messages.abci.messages.badSig);
            return utils_1.invalidTx(messages_1.messages.abci.messages.badSig);
        }
        switch (tx.type) {
            case "order": {
                return order_1.checkOrder(tx, state, Order);
            }
            case "witness": {
                return witness_1.checkWitness(tx, state);
            }
            case "rebalance": {
                return rebalance_1.checkRebalance(tx, state);
            }
            default: {
                log_1.warn("mem", messages_1.messages.abci.errors.txType);
                return utils_1.invalidTx(messages_1.messages.abci.errors.txType);
            }
        }
    };
}
exports.checkTxWrapper = checkTxWrapper;
