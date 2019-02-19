"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../../common/log");
const utils_1 = require("../util/utils");
function checkWitness(tx, state) {
    try {
        utils_1.parseWitness(tx.data);
        log_1.log("mem", "stake witness transaction accepted");
        return utils_1.validTx("stake witness transaction accepted");
    }
    catch (error) {
        log_1.warn("mem", `invalid witness event rejected: ${error.message}`);
        return utils_1.invalidTx("invalid witness event rejected");
    }
}
exports.checkWitness = checkWitness;
function deliverWitness(tx, state) {
    let parsedTx;
    let eventId;
    try {
        parsedTx = utils_1.parseWitness(tx.data);
        eventId = utils_1.createWitnessEventHash({
            subject: tx.data.subject,
            type: tx.data.type,
            amount: tx.data.amount,
            block: tx.data.block,
            address: tx.data.address,
            publicKey: tx.data.publicKey
        });
        if (eventId !== tx.data.id) {
            throw new Error("reported eventId does not match actual");
        }
    }
    catch (error) {
        log_1.warn("mem", `invalid witness event rejected: ${error.message}`);
        return utils_1.invalidTx();
    }
    const { subject, block, id } = parsedTx;
    let accepted;
    if (state.lastEvent >= block) {
        log_1.warn("state", "ignoring existing event that may have been applied");
        return utils_1.invalidTx();
    }
    if (state.events.hasOwnProperty(block)) {
        if (state.events[block].hasOwnProperty(id)) {
            accepted = utils_1.addConfMaybeApplyEvent(state, parsedTx);
        }
        else {
            accepted = utils_1.addNewEvent(state, parsedTx);
        }
    }
    else {
        state.events[block] = {};
        accepted = utils_1.addNewEvent(state, parsedTx);
    }
    if (accepted === true) {
        log_1.log("state", "accepting witness transaction");
        return utils_1.validTx();
    }
    else if (accepted === false) {
        log_1.log("state", "rejecting witness transaction");
        return utils_1.invalidTx();
    }
    else if (accepted === undefined) {
        log_1.warn("state", "no reported status on witness transaction");
        return utils_1.invalidTx();
    }
}
exports.deliverWitness = deliverWitness;
