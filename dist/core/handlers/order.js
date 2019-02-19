"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Hasher_1 = require("../../crypto/Hasher");
const log_1 = require("../../common/log");
const messages_1 = require("../../common/static/messages");
const utils_1 = require("../util/utils");
function checkOrder(tx, state, Order) {
    let order;
    let poster;
    try {
        order = new Order(tx.data);
        if (!utils_1.verifyOrder(order, state)) {
            log_1.warn("mem", "rejected order that exceeds maximum size");
            return utils_1.invalidTx("order exceeds maximum size");
        }
        poster = order.recoverPoster().toLowerCase();
    }
    catch (err) {
        log_1.warn("mem", messages_1.messages.abci.errors.format);
        return utils_1.invalidTx(messages_1.messages.abci.errors.format);
    }
    if (state.posters.hasOwnProperty(poster) &&
        state.posters[poster].limit > 0n) {
        log_1.log("mem", messages_1.messages.abci.messages.mempool);
        return utils_1.validTx(`(unconfirmed) orderID: ${Hasher_1.Hasher.hashOrder(order)}`);
    }
    else {
        log_1.warn("mem", messages_1.messages.abci.messages.noStake);
        return utils_1.invalidTx(messages_1.messages.abci.messages.noStake);
    }
}
exports.checkOrder = checkOrder;
function deliverOrder(tx, state, Order) {
    let order;
    let poster;
    let tags = [];
    try {
        order = new Order(tx.data);
        poster = order.recoverPoster().toLowerCase();
    }
    catch (err) {
        log_1.warn("state", messages_1.messages.abci.errors.format);
        return utils_1.invalidTx(messages_1.messages.abci.errors.format);
    }
    if (state.posters.hasOwnProperty(poster) &&
        state.posters[poster].limit > 0n) {
        order.id = Hasher_1.Hasher.hashOrder(order);
        state.posters[poster].limit -= 1;
        state.orderCounter += 1;
        const tag = utils_1.newKVPair("order.id", order.id);
        tags.push(tag);
        log_1.log("state", messages_1.messages.abci.messages.verified);
        return utils_1.validTx(`orderID: ${order.id}`, tags);
    }
    else {
        log_1.warn("state", messages_1.messages.abci.messages.noStake);
        return utils_1.invalidTx(messages_1.messages.abci.messages.noStake);
    }
}
exports.deliverOrder = deliverOrder;
