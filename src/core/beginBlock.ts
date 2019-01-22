/**
 * ===========================
 * ParadigmCore: Blind Star
 * @name beginBlock.ts
 * @module src/core
 * ===========================
 *
 * @author Henry Harder
 * @date (initial)  21-January-2019
 * @date (modified) 21-January-2019
 *
 * ABCI beginBlock implementation.
*/

// custom typings
import { ResponseBeginBlock } from "../typings/abci";

// util functions
import { computeConf } from "./util/utils";
import { bigIntReplacer } from "../util/static/bigIntUtils";
import { log } from "../util/log";

/**
 * Called at the beginning of each new block. Updates proposer and block height.
 *
 * @param request {object} raw transaction as delivered by Tendermint core.
 */
export function beginBlockWrapper(state: State): (r) => ResponseBeginBlock {
    // TODO: remove this log
    // console.log(`\n... (begin) state: ${JSON.stringify(state, bigIntReplacer)}\n`);

    return (request) => {
        // Parse height and proposer from header
        const currHeight: bigint = BigInt(request.header.height);
        const currProposer: string = request.header.proposerAddress.toString("hex");

        // Store array of last votes
        const lastVotes: object[] | undefined = request.lastCommitInfo.votes;

        // Parse validators that voted on the last block
        if (lastVotes !== undefined && lastVotes.length > 0) {
            // Iterate over votes array (supplied by Tendermint)
            lastVotes.forEach((vote: any) => {
                const nodeId = vote.validator.address.toString("hex");
                const power = BigInt(vote.validator.power);

                // Create entry if validator has not voted yet
                if (!(state.validators.hasOwnProperty(nodeId))) {
                    state.validators[nodeId] = {
                        balance: BigInt(0), // @TODO re-examine
                        power,
                        publicKey: "probably shouldn't be reading this",
                        ethAccount: "not implemented",
                        lastVoted: null,
                        lastProposed: null,
                        totalVotes: BigInt(0),
                        genesis: false,
                    };
                }

                // Update vote and height trackers
                state.validators[nodeId].totalVotes += 1n;
                state.validators[nodeId].lastVoted = (currHeight - 1n);

                // Record if they are proposer this round
                if (nodeId === currProposer) {
                    state.validators[nodeId].lastProposed = currHeight;
                }

                // Update (or re-record) validator vote power
                state.validators[nodeId].power = power;

                // TEMPORARY
                // @TODO remove
                if (state.validators[nodeId].genesis) {
                    state.validators[nodeId].ethAccount = "updated from gen dude";
                }
            });
        }

        // update confirmation threshold based on number of active validators
        // confirmation threshold is >=2/3 active validators, unless there is
        // only one active validator, in which case it MUST be 1 in order for
        // state.balances to remain accurate.
        state.consensusParams.confirmationThreshold = computeConf(lastVotes.length);

        // Indicate new round, return no indexing tags
        log(
            "state",
            `block #${currHeight} being proposed by validator ...${currProposer.slice(-5)}`
        );

        console.log("... end of beginBlock: " + JSON.stringify(state, bigIntReplacer));
        return {};
    };
}