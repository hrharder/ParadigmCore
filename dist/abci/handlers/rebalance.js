"use strict";
/**
 * ===========================
 * ParadigmCore: Blind Star
 * @name rebalance.ts
 * @module abci/handlers
 * ===========================
 *
 * @author Henry Harder
 * @date (initial)  23-October-2018
 * @date (modified) 01-November-2018
 *
 * Handler functions for verifying ABCI Rebalance transactions, originating
 * from validator nodes. Implements state transition logic as specified in the
 * spec for this TX type.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = require("../../util/Logger");
const messages_1 = require("../../util/static/messages");
const Vote_1 = require("../util/Vote");
/**
 * Verify a Rebalance proposal before accepting it into the local mempool.
 *
 * @param tx    {object} decoded transaction body
 * @param state {object} current round state
 */
function checkRebalance(tx, state) {
    const proposal = tx.data;
    switch (state.round.number) {
        case 0: {
            if (proposal.round.number === 1) {
                // Accept valid initial rebalance proposal to mempool
                Logger_1.Logger.mempool(messages_1.messages.rebalancer.messages.iAccept);
                return Vote_1.Vote.valid();
            }
            else {
                // Reject invalid initial rebalance proposal from mempool
                Logger_1.Logger.mempoolWarn(messages_1.messages.rebalancer.messages.iReject);
                return Vote_1.Vote.invalid();
            }
        }
        default: {
            if ((1 + state.round.number) === proposal.round.number) {
                // Accept valid rebalance proposal to mempool
                Logger_1.Logger.mempool(messages_1.messages.rebalancer.messages.accept);
                return Vote_1.Vote.valid(messages_1.messages.rebalancer.messages.accept);
            }
            else {
                // Reject invalid rebalance proposal from mempool
                Logger_1.Logger.mempoolWarn(messages_1.messages.rebalancer.messages.reject);
                return Vote_1.Vote.invalid(messages_1.messages.rebalancer.messages.reject);
            }
        }
    }
}
exports.checkRebalance = checkRebalance;
/**
 * @name deliverRebalance() {export function} execute a Rebalance transaction
 * and adopt the new mapping in state.
 *
 * @param tx {object} decoded transaction body
 * @param state {object} current round state
 * @param rb {StakeRebalancer} the current rebalancer instance
 */
function deliverRebalance(tx, state, rb) {
    const proposal = tx.data;
    switch (state.round.number) {
        case 0: {
            if (proposal.round.number === 1) {
                /**
                 * NOTE: no mapping is accepted until subsequent rebalance
                 * transactions are executed. The first proposal only serves to
                 * establish the parameters for the first staking period.
                 */
                // Begin state modification
                state.round.number += 1;
                state.round.startsAt = proposal.round.startsAt;
                state.round.endsAt = proposal.round.endsAt;
                // TODO: make sure limit is agreed upon
                state.round.limit = proposal.round.limit;
                // state.mappings.limits = proposal.mapping;
                Logger_1.Logger.consensus(messages_1.messages.rebalancer.messages.iAccept);
                return Vote_1.Vote.valid();
            }
            else {
                // Reject invalid initial rebalance proposal from mempool
                Logger_1.Logger.consensusWarn(messages_1.messages.rebalancer.messages.iReject);
                return Vote_1.Vote.invalid();
            }
        }
        default: {
            if ((1 + state.round.number) === proposal.round.number) {
                // Accept valid rebalance proposal to mempool
                const propLimits = proposal.limits;
                // CHANGE THIS: debug genLimits
                const localLimits = genLimits(state.balances, state.round.limit);
                if (JSON.stringify(propLimits) === JSON.stringify(localLimits)) {
                    // If proposed mapping matches mapping constructed from
                    // in state balances.
                    // Begin state modificiation
                    state.round.number += 1;
                    state.round.startsAt = proposal.round.startsAt;
                    state.round.endsAt = proposal.round.endsAt;
                    state.limits = proposal.limits;
                    // End state modification
                    Logger_1.Logger.consensus(messages_1.messages.rebalancer.messages.accept);
                    return Vote_1.Vote.valid(messages_1.messages.rebalancer.messages.accept);
                }
                else {
                    // Proposal does not match local mapping
                    Logger_1.Logger.consensusWarn(messages_1.messages.rebalancer.messages.noMatch);
                    return Vote_1.Vote.invalid(messages_1.messages.rebalancer.messages.noMatch);
                }
            }
            else if ((1 + state.round.number) < proposal.round.number) {
                // Proposal is for incorrect period
                Logger_1.Logger.consensusWarn(messages_1.messages.rebalancer.messages.wrongRound);
                return Vote_1.Vote.invalid(messages_1.messages.rebalancer.messages.wrongRound);
            }
            else {
                // Reject invalid rebalance proposal from mempool
                Logger_1.Logger.consensusWarn(messages_1.messages.rebalancer.messages.reject);
                return Vote_1.Vote.invalid(messages_1.messages.rebalancer.messages.reject);
            }
        }
    }
}
exports.deliverRebalance = deliverRebalance;
/**
 * @name genLimits()
 * @description Generates a rate-limit mapping based on staked balances and
 * the total order limit per staking period.
 *
 * @param balances  {object} current in-state staked balances
 * @param limit     {number} the total number of orders accepted in the period
 */
function genLimits(balances, limit) {
    let total = 0; // total amount currenty staked
    const output = {}; // generated output mapping
    // Calculate total balance currently staked
    Object.keys(balances).forEach((k, _) => {
        if (balances.hasOwnProperty(k) && typeof (balances[k]) === "number") {
            total += balances[k];
        }
    });
    // Compute the rate-limits for each staker based on stake size
    Object.keys(balances).forEach((k, _) => {
        if (balances.hasOwnProperty(k) && typeof (balances[k]) === "number") {
            output[k] = {
                // orderLimit is proportional to stake size
                orderLimit: Math.floor((balances[k] / total) * limit),
                // streamLimit is always 1, regardless of stake size
                streamLimit: 1,
            };
        }
    });
    // Return computed output mapping
    return output;
}
