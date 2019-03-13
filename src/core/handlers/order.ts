/**
 * ===========================
 * ParadigmCore: Blind Star
 * @name order.ts
 * @module core/handlers
 * ===========================
 *
 * @author Henry Harder
 * @date (initial)  23-October-2018
 * @date (modified) 21-January-2019
 *
 * Handler functions for verifying ABCI Order transactions, originating from
 * external API calls. Implements state transition logic as specified in the
 * spec for this TX type.
 */

// ParadigmCore classes
import { Hasher } from "../../crypto/Hasher";

// ParadigmCore utilities
import { ResponseCheckTx, ResponseDeliverTx } from "src/typings/abci";
import { err, log, warn } from "../../common/log";
import { messages as msg } from "../../common/static/messages";
import { invalidTx, newKVPair, validTx, verifyOrder } from "../util/utils";

/**
 * Performs light verification of OrderBroadcast transactions before accepting
 * to local mempool.
 *
 * @param tx    {SignedOrderTx} decoded transaction body
 * @param state {State}         current round state
 */
export function checkOrder(tx: SignedOrderTx, state: IState, Order): ResponseCheckTx {
    let order: Order;   // Paradigm order object
    let poster: string; // Recovered poster address from signature

    // Construct and verify order object, and recover poster signature
    try {
        // Construct order object
        order = new Order(tx.data);

        // Verify order size
        if (!verifyOrder(order, state)) {
            warn("mem", "rejected order that exceeds maximum size");
            return invalidTx("order exceeds maximum size");
        }

        // Recover poster address
        poster = order.recoverPoster().toLowerCase();
    } catch (err) {
        warn("mem", msg.abci.errors.format);
        return invalidTx(msg.abci.errors.format);
    }

    // Does poster have a staked balance?
    if (
        state.posters.hasOwnProperty(poster) &&
        state.posters[poster].limit > 0n
    ) {
        log("mem", msg.abci.messages.mempool);
        return validTx(`(unconfirmed) orderID: ${Hasher.hashOrder(order)}`);
    } else {
        warn("mem", msg.abci.messages.noStake);
        return invalidTx(msg.abci.messages.noStake);
    }
}

/**
 * Execute an OrderBroadcast transaction in full, and perform state
 * modification.
 *
 * @param tx    {SignedOrderTx} decoded transaction body
 * @param state {State}         current round state
 * @param q     {OrderTracker}  valid order queue
 */
export function deliverOrder(tx: SignedOrderTx, state: IState, Order): ResponseDeliverTx {
    let order: Order;   // Paradigm order object
    let poster: string; // Recovered poster address from signature
    let tags: KVPair[] = [];

    // Construct order object, and recover poster signature
    try {
        order = new Order(tx.data);
        poster = order.recoverPoster().toLowerCase();
    } catch (err) {
        warn("state", msg.abci.errors.format);
        return invalidTx(msg.abci.errors.format);
    }

    // Verify poster balance and modify state
    if (
        state.posters.hasOwnProperty(poster) &&
        state.posters[poster].limit > 0n
    ) {
        // Hash order to generate orderID
        order.id = Hasher.hashOrder(order);

        // Begin state modification
        state.posters[poster].limit -= 1;
        state.orderCounter += 1;
        state.round.limitUsed += 1;
        // End state modification

        // add tags (for stream/search)
        const tag = newKVPair("order.id", order.id);
        tags.push(tag);

        // validate with OK res
        log("state", msg.abci.messages.verified);
        return validTx(`orderID: ${order.id}`, tags);
    } else {
        // No stake or insufficient quota remaining
        warn("state", msg.abci.messages.noStake);
        return invalidTx(msg.abci.messages.noStake);
    }
}
