/**
 * ===========================
 * ParadigmCore: Blind Star
 * @name witness.ts
 * @module src/abci/handlers
 * ===========================
 *
 * @author Henry Harder
 * @date (initial)  23-October-2018
 * @date (modified) 05-November-2018
 *
 * Handler functions for verifying ABCI evet Witness transactions,
 * originating from validator nodes. Implements state transition logic as
 * specified in the spec for this TX type.
 */

 // ParadigmCore classes
import { Logger } from "../../util/Logger";
import { Vote } from "../util/Vote";

// TEMPORARY
const { CONF_THRESHOLD, NODE_ENV } = process.env;

/**
 * Performs mempool verification of Ethereum StakeEvent transactions.
 *
 * @param tx    {object} decoded transaction body
 * @param state {object} current round state
 */
export function checkWitness(tx: SignedWitnessTx, state: State): Vote {
    if (isValidStakeEvent(tx.data, state)) {
        Logger.mempool("Stake witness transaction accepted.");
        return Vote.valid("Stake witnesss transaction accepted.");
    } else {
        Logger.mempoolWarn("Invalid witness event rejected.");
        return Vote.invalid("Invalid witness event rejected.");
    }
}

/**
 * Performs state modification of Stake Event transactions (modify staker's
 * balance).
 *
 * @param tx    {object} decoded transaction body
 * @param state {object} current round state
 *
 * @todo: options for confirmation threshold
 */
export function deliverWitness(tx: SignedWitnessTx, state: State): Vote {
    // Check structural validity
    if (!(isValidStakeEvent(tx.data, state))) {
        Logger.consensusWarn("Invalid witness event rejected.");
        return Vote.invalid();
    }

    // Unpack event data into local variables
    const staker: string = tx.data.staker;
    const type: string = tx.data.type;
    const block: number = tx.data.block;
    const amount: BigInt = BigInt.fromString(tx.data.amount);

    switch (state.events.hasOwnProperty(block)) {
        // Block is already in state
        case true: {
            if (
                state.events[block].hasOwnProperty(staker) &&
                state.events[block][staker].amount === amount &&
                state.events[block][staker].type === type
            ) {
                // Event is already in state, add confirmation
                state.events[block][staker].conf += 1;
                updateMappings(state, staker, block, amount, type);

                // Voted for valid existing event
                Logger.consensus("Voted for valid stake event (existing).");
                return Vote.valid();

            } else if (!(state.events[block].hasOwnProperty(staker))) {
                // Block in state, event is not
                state.events[block][staker] = {
                    amount,
                    conf: 1,
                    type,
                };

                // If running with single node, update balances
                if (NODE_ENV === "development") {
                    updateMappings(state, staker, block, amount, type);
                }

                // Voted for valid new event
                Logger.consensus("Voted for new valid stake event.");
                return Vote.valid();

            } else {
                // Block and event are in state, but does not match Tx
                Logger.consensusWarn("Event Tx does not match event in state.");
                return Vote.invalid();
            }
        }

        // Block is not already in state
        case false: {
            // Block is not in state yet, add new one
            state.events[block] = {};

            // Add event to block
            state.events[block][staker] = {
                amount,
                conf: 1,
                type,
            };

            // If running with single node, update balances
            if (NODE_ENV === "development") {
                updateMappings(state, staker, block, amount, type);
            }

            // Added new event to state
            Logger.consensus("Voted for valid stake event (new).");
            return Vote.valid();
        }

        // Shouldn't happen!
        default: {
            return Vote.invalid();
        }
    }
}

/**
 * Checks if a stake event is structurally valid. Considered
 * state-less verification (validity does not depend on state).
 *
 * @param data  {object}    the stake event to validate
 */
function isValidStakeEvent(data: any, state: State): boolean {
    // TODO: add info about proposer to validation condition
    if (
        !(data.hasOwnProperty("staker") &&
        data.hasOwnProperty("type") &&
        data.hasOwnProperty("block") &&
        data.hasOwnProperty("amount") &&
        Object.keys(data).length === 4)
    ) {
        return false;
    } else if (
        typeof(data.staker) !== "string" ||
        typeof(data.type) !== "string" ||
        typeof(data.block) !== "number" ||
        typeof(data.amount) !== "string"
    ) {
        return false;
    } else if (!(data.type === "add" || data.type === "remove")) {
        return false;
    } else if (data.block <= state.lastEvent[data.type]) {
        return false;
    } else {
        return true;
    }
}

/**
 * Update state upon event confirmation
 *
 * @param state     {object}    current state object
 * @param staker    {string}    staker's address
 * @param block     {number}    relevant block height
 * @param amount    {number}    amount staked (or unstaked)
 * @param type      {string}    event type (stake made or removed)
 */
function updateMappings(
    state: State,
    staker: string,
    block: number,
    amount: BigInt,
    type: string
) {
    if (
        state.events.hasOwnProperty(block) &&
        state.events[block].hasOwnProperty(staker) &&
        state.events[block][staker].type === type &&
        state.events[block][staker].amount === amount
    ) {
        // Is this event now confirmed?
        if (state.events[block][staker].conf >= parseInt(CONF_THRESHOLD, 10)) {
            Logger.consensus("Witness event confirmed. Updating balances.");

            // See if staker already has a balance
            switch (state.balances.hasOwnProperty(staker)) {
                // Staker already has balance, we are updating
                case true: {
                    applyEvent(state, staker, amount, type);
                    break;
                }

                // Staker does not have a current balance
                case false: {
                    state.balances[staker] = BigInt(0);
                    applyEvent(state, staker, amount, type);
                    break;
                }

                // Shouldn't happen!
                default: { return; }
            }

            // Remove events that were just applied to state
            delete state.events[block][staker];

            // Remove event block entry if empty
            if (Object.keys(state.events[block]).length === 0) {
                delete state.events[block];
            }

            // Remove balance entry if now empty
            if (state.balances[staker] === 0) {
                delete state.balances[staker];
            }

            // Update highest event block accepted
            if (state.lastEvent[type] < block) {
                state.lastEvent[type] = block;
            }

            // Done
            return;
        } else {
            // Witness account added, but event is not confirmed yet
            Logger.consensus("Confirmation added for pending witness event.");
            return;
        }
    } else {
        // Event in state does not match event TX
        Logger.consensusWarn("Disagreement about event data. Potential failure.");
        return;
    }
}

/**
 * Apply event state transition of balances.
 *
 * @param state     {object}    current state object
 * @param staker    {string}    staker's address
 * @param amount    {number}    amount staked (or unstaked)
 * @param type      {string}    event type (add or remove)
 */
function applyEvent(
    state: State,
    staker: string,
    amount: any,
    type: string
): void {
    switch (type) {
        // Staker is adding stake
        case "add": {
            state.balances[staker] += amount;
            break;
        }

        // Staker is removing stake
        case "remove": {
            state.balances[staker] -= amount;
            break;
        }

        // Unknown event type
        default: { return; }
    }

    // Return upon completion of updates
    return;
}
