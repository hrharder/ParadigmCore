/**
 * ===========================
 * ParadigmCore: Blind Star
 * @name witness.ts
 * @module src/core/handlers
 * ===========================
 *
 * @author Henry Harder
 * @date (initial)  23-October-2018
 * @date (modified) 23-January-2019
 *
 * Handler functions for verifying ABCI event Witness transactions,
 * originating from validator nodes. Implements state transition logic as
 * specified in the spec for this TX type.
 */

 // ParadigmCore classes
import { log, warn } from "../../util/log";
import { Vote } from "../util/Vote";

// ParadigmCore utilities/types
import { ParsedWitnessData } from "../../typings/abci";
import {
    parseWitness,
    createWitnessEventHash,
    addNewEvent,
    addConfMaybeApplyEvent
} from "../util/utils";

/**
 * Performs mempool verification of Ethereum StakeEvent transactions. Condition
 * for validity is purely structural. I.E. are all necessary parameters present?
 *
 * @param tx    {object} decoded transaction body
 * @param state {object} current round state
 */
export function checkWitness(tx: SignedWitnessTx, state: State): Vote {
    try {
        parseWitness(tx.data);
        log("mem", "stake witness transaction accepted");
        return Vote.valid("stake witness transaction accepted");
    } catch (error) {
        warn("mem", `invalid witness event rejected: ${error.message}`);
        return Vote.invalid("invalid witness event rejected");
    }
}

/**
 * Performs state modification of Stake Event transactions (modify staker's
 * balance).
 *
 * @param tx    {object} decoded transaction body
 * @param state {object} current round state
 */
export function deliverWitness(tx: SignedWitnessTx, state: State): Vote {
    // will store parsed event data (after validation)
    let parsedTx: ParsedWitnessData;
    
    // unique eventId, hash of event contents
    let eventId: string;

    try {
        // parse valid event data (also validates)
        parsedTx = parseWitness(tx.data);

        // compute hash of event as ID to confirm validity
        eventId = createWitnessEventHash({
            subject: tx.data.subject,
            type: tx.data.type,
            amount: tx.data.amount,
            block: tx.data.block,
            address: tx.data.address,
            publicKey: tx.data.publicKey
        });
       
        // confirm id in event matches hash of event data
        if (eventId !== tx.data.id) {
            throw new Error("reported eventId does not match actual");
        }
    } catch (error) {
        warn("mem", `invalid witness event rejected: ${error.message}`);
        return Vote.invalid();
    }

    // unpack/parse event data after id is confirmed
    const { block, id } = parsedTx;
    
    // will be true if transaction is ultimately valid
    let accepted: boolean;

    if (state.events.hasOwnProperty(block)) {
        // block is already in state
        if (state.events[block].hasOwnProperty(id)) {
            accepted = addConfMaybeApplyEvent(state, parsedTx);
        } else {
            accepted = addNewEvent(state, parsedTx);
        }
    } else {
        // create new event block, and add event to block
        state.events[block] = {};
        accepted = addNewEvent(state, parsedTx);
    }

    // so explicit because of possibility accepted never gets set
    if (accepted === true) {
        log("state", "accepting witness transaction");
        return Vote.valid();
    } else if (accepted === false) {
        log("state", "rejecting witness transaction");
        return Vote.invalid();
    } else if (accepted === undefined) {
        // this block is temporary
        warn("state", "no reported status on witness transaction");
        return Vote.invalid();
    }
}
