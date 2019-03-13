/**
 * ===========================
 * ParadigmCore: Blind Star
 * @name commit.ts
 * @module core
 * ===========================
 *
 * @author Henry Harder
 * @date (initial)  21-January-2019
 * @date (modified) 12-March-2019
 *
 * ABCI commit implementation.
*/

// paradigmcore classes/types
import { State } from "../state/State";
import { ResponseCommit } from "../typings/abci";

// util functions
import { err, log } from "../common/log";
import { bigIntReplacer } from "../common/static/bigIntUtils";

/**
 * Persist application state, synchronize commit and deliver states, and
 * trigger the broadcast of valid orders in that block.
 *
 * @param request {object} raw transaction as delivered by Tendermint core.
 */
export function commitWrapper(
    deliverState: State,
    commitState: State
): () => ResponseCommit {
    return () => {
        // store string encoded state hash
        let stateHash: Buffer;

        // perform commit responsibilities
        try {
            // temporarily log state if a rebalance event occurred
            // Round diff === 1 means rebalance tx included in block
            const roundDiff = deliverState.round.number - commitState.round.number;
            if (roundDiff === 1) {
                console.log(`\nLATEST STATE:\n${JSON.stringify(deliverState, bigIntReplacer)}\n`);
            }

            // increment in-state height
            deliverState.lastBlockHeight++;

            // Generate new state hash and update
            stateHash = deliverState.generateAppHash();
            deliverState.lastBlockAppHash = stateHash;

            // sync states
            commitState.acceptNew(deliverState.toJSON());

            // write state contents to disk
            commitState.writeToDisk();

            log(
                "state",
                `new state hash: ` +
                `${stateHash.toString("hex").slice(0, 5)}...` +
                `${stateHash.toString("hex").slice(-5)}`,
                commitState.lastBlockHeight,
                stateHash.toString("hex").toUpperCase()
            );
        } catch (error) {
            err("state", `commit failed for block #${deliverState.lastBlockHeight }: ${error.message}`);
        }

        // Return state's hash to be included in next block header
        return { data: stateHash };
    };
}
