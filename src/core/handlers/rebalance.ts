/**
 * ===========================
 * ParadigmCore: Blind Star
 * @name rebalance.ts
 * @module src/core/handlers
 * ===========================
 *
 * @author Henry Harder
 * @date (initial)  23-October-2018
 * @date (modified) 12-March-2019
 *
 * Handler functions for verifying ABCI Rebalance transactions, originating
 * from validator nodes. Implements state transition logic as specified in the
 * spec for this TX type.
 */

// 3rd party and STDLIB imports
import { isEqual } from "lodash";

// ParadigmCore utilities
import { log, warn } from "../../common/log";
import { messages as msg } from "../../common/static/messages";
import { genLimits, newKVPair, invalidTx, validTx } from "../util/utils";

// ParadigmCore type defs
import { ResponseDeliverTx, ResponseCheckTx } from "../../typings/abci";

/**
 * Verify a Rebalance proposal before accepting it into the local mempool.
 *
 * @param tx    {SignedRebalanceTx} decoded transaction body
 * @param state {State}             current round state
 */
export function checkRebalance(tx: SignedRebalanceTx, state: IState): ResponseCheckTx {
    // Load proposal from rebalance tx
    const proposal: RebalanceData = tx.data;

    // check if this is the initial rebalance period
    if (state.round.number === 0) {
        if (proposal.round.number === 1) {
            // Accept valid initial rebalance proposal to mempool
            log("mem", msg.rebalancer.messages.iAccept);
            return validTx();
        } else {
            // Reject invalid initial rebalance proposal from mempool
            warn("mem", msg.rebalancer.messages.iReject);
            return invalidTx();
        }
    } else {
        if ((1 + state.round.number) === proposal.round.number) {
            // Accept valid rebalance proposal to mempool
            log("mem", msg.rebalancer.messages.accept);
            return validTx(msg.rebalancer.messages.accept);
        } else {
            // Reject invalid rebalance proposal from mempool
            warn("mem", msg.rebalancer.messages.reject);
            return invalidTx(msg.rebalancer.messages.reject);
        }
    }
}

/**
 * Execute a Rebalance transaction and adopt the new mapping in state.
 *
 * @param tx    {SignedRebalanceTx} decoded transaction body
 * @param state {State}             current round state
 * @param rb    {StakeRebalancer}   the current rebalancer instance
 */
export function deliverRebalance(tx: SignedRebalanceTx, state: IState): ResponseDeliverTx {
    // unpack proposal from transaction
    const proposal: RebalanceData = tx.data;
    let tags: KVPair[] = [];

    // @todo DRY
    // Main verification switch block
    switch (state.round.number) {
        // Initial rebalance period
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
                state.round.limit = proposal.round.limit;
                // End state modification

                // create tags based on accepted transaction
                const txType = newKVPair("tx.type", "rebalance");
                const rNumber = newKVPair("round.number", state.round.number);
                const rStartBlock = newKVPair("round.start", state.round.startsAt);
                const rEndBlock = newKVPair("round.end", state.round.endsAt);
                
                // add tags to be included in ABCI response
                tags.push(txType, rNumber, rStartBlock, rEndBlock);

                log("state", msg.rebalancer.messages.iAccept);
                return validTx("proposal accepted.", tags);
            } else {
                // Reject invalid initial rebalance proposal from mempool
                warn("state", msg.rebalancer.messages.iReject);
                return invalidTx("proposal rejected.");
            }
        }

        // All other periods (period > 0)
        default: {
            if ((1 + state.round.number) === proposal.round.number) {
                // Limits from proposal
                const propLimits = proposal.limits;

                // Compute limits from in-state balances
                const localLimits = genLimits(state.posters, state.round.limit);

                // TODO: add condition around period length
                if (isEqual(propLimits, localLimits)) {
                    // If proposed mapping matches mapping constructed from
                    // in state balances, we accept.

                    // Begin state modification
                    state.round.number += 1;
                    state.round.startsAt = proposal.round.startsAt;
                    state.round.endsAt = proposal.round.endsAt;
                    state.round.limit = proposal.round.limit
                    state.round.limitUsed = 0;

                    // copy limits from proposal to each balance
                    Object.keys(propLimits).forEach((i) => {
                        state.posters[i].limit = propLimits[i];
                    });
                    // End state modification

                    // create tags based on accepted transaction
                    const txType = newKVPair("tx.type", "rebalance");
                    const rNumber = newKVPair("round.number", state.round.number);
                    const rStartBlock = newKVPair("round.start", state.round.startsAt);
                    const rEndBlock = newKVPair("round.end", state.round.endsAt);
                    
                    // add tags to be included in ABCI response
                    tags.push(txType, rNumber, rStartBlock, rEndBlock);

                    // Vote to accept
                    log("state", msg.rebalancer.messages.accept);
                    return validTx(msg.rebalancer.messages.accept, tags);
                } else {
                    // Proposal does not match local mapping
                    warn("state", msg.rebalancer.messages.noMatch);
                    return invalidTx(msg.rebalancer.messages.noMatch);
                }

            // Proposal is for incorrect period
            } else if ((1 + state.round.number) < proposal.round.number) {
                warn("state", msg.rebalancer.messages.wrongRound);
                return invalidTx(msg.rebalancer.messages.wrongRound);

            // Reject invalid rebalance proposals
            } else {
                warn("state", msg.rebalancer.messages.reject);
                return invalidTx(msg.rebalancer.messages.reject);
            }
        }
    }
}
