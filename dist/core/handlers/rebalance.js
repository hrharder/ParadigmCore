"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const log_1 = require("../../common/log");
const messages_1 = require("../../common/static/messages");
const utils_1 = require("../util/utils");
function checkRebalance(tx, state) {
    const proposal = tx.data;
    if (state.round.number === 0) {
        if (proposal.round.number === 1) {
            log_1.log("mem", messages_1.messages.rebalancer.messages.iAccept);
            return utils_1.validTx();
        }
        else {
            log_1.warn("mem", messages_1.messages.rebalancer.messages.iReject);
            return utils_1.invalidTx();
        }
    }
    else {
        if ((1 + state.round.number) === proposal.round.number) {
            log_1.log("mem", messages_1.messages.rebalancer.messages.accept);
            return utils_1.validTx(messages_1.messages.rebalancer.messages.accept);
        }
        else {
            log_1.warn("mem", messages_1.messages.rebalancer.messages.reject);
            return utils_1.invalidTx(messages_1.messages.rebalancer.messages.reject);
        }
    }
}
exports.checkRebalance = checkRebalance;
function deliverRebalance(tx, state) {
    const proposal = tx.data;
    let tags = [];
    switch (state.round.number) {
        case 0: {
            if (proposal.round.number === 1) {
                state.round.number += 1;
                state.round.startsAt = proposal.round.startsAt;
                state.round.endsAt = proposal.round.endsAt;
                state.round.limit = proposal.round.limit;
                const txType = utils_1.newKVPair("tx.type", "rebalance");
                const rNumber = utils_1.newKVPair("round.number", state.round.number);
                const rStartBlock = utils_1.newKVPair("round.start", state.round.startsAt);
                const rEndBlock = utils_1.newKVPair("round.end", state.round.endsAt);
                tags.push(txType, rNumber, rStartBlock, rEndBlock);
                log_1.log("state", messages_1.messages.rebalancer.messages.iAccept);
                return utils_1.validTx("proposal accepted.", tags);
            }
            else {
                log_1.warn("state", messages_1.messages.rebalancer.messages.iReject);
                return utils_1.invalidTx("proposal rejected.");
            }
        }
        default: {
            if ((1 + state.round.number) === proposal.round.number) {
                const propLimits = proposal.limits;
                const localLimits = utils_1.genLimits(state.posters, state.round.limit);
                if (lodash_1.isEqual(propLimits, localLimits)) {
                    state.round.number += 1;
                    state.round.startsAt = proposal.round.startsAt;
                    state.round.endsAt = proposal.round.endsAt;
                    Object.keys(propLimits).forEach((i) => {
                        state.posters[i].limit = propLimits[i];
                    });
                    const txType = utils_1.newKVPair("tx.type", "rebalance");
                    const rNumber = utils_1.newKVPair("round.number", state.round.number);
                    const rStartBlock = utils_1.newKVPair("round.start", state.round.startsAt);
                    const rEndBlock = utils_1.newKVPair("round.end", state.round.endsAt);
                    tags.push(txType, rNumber, rStartBlock, rEndBlock);
                    log_1.log("state", messages_1.messages.rebalancer.messages.accept);
                    return utils_1.validTx(messages_1.messages.rebalancer.messages.accept, tags);
                }
                else {
                    log_1.warn("state", messages_1.messages.rebalancer.messages.noMatch);
                    return utils_1.invalidTx(messages_1.messages.rebalancer.messages.noMatch);
                }
            }
            else if ((1 + state.round.number) < proposal.round.number) {
                log_1.warn("state", messages_1.messages.rebalancer.messages.wrongRound);
                return utils_1.invalidTx(messages_1.messages.rebalancer.messages.wrongRound);
            }
            else {
                log_1.warn("state", messages_1.messages.rebalancer.messages.reject);
                return utils_1.invalidTx(messages_1.messages.rebalancer.messages.reject);
            }
        }
    }
}
exports.deliverRebalance = deliverRebalance;
