/**
 * ===========================
 * ParadigmCore: Blind Star
 * @name beginBlock.ts
 * @module core
 * ===========================
 *
 * @author Henry Harder
 * @date (initial)  21-January-2019
 * @date (modified) 12-March-2019
 *
 * ABCI beginBlock implementation.
*/

// custom typings
import { ResponseBeginBlock } from "../typings/abci";

// util functions
import { log } from "../common/log";
import { State } from "../state/State";
import { computeConf } from "./util/utils";
import { doForEachValidator } from "./util/valFunctions";

/**
 * Called at the beginning of each new block. Updates proposer and block height.
 *
 * @param request {object} raw transaction as delivered by Tendermint core.
 */
export function beginBlockWrapper(state: State): (r) => ResponseBeginBlock {
    return (request) => {
        // parse height and proposer from header
        console.log(` \npre: ${JSON.stringify(Object.keys(state.validators))}\n`);
        const currHeight: number = Number(request.header.height);
        const proposer: string = request.header.proposerAddress.toString("hex");
        const appHash: Buffer = Buffer.from(request.header.appHash, "base64");

        state.lastBlockHeight = currHeight;
        state.lastBlockAppHash = appHash; // Buffer.alloc(0);

        // store array of last votes
        const lastVotes: object[] | undefined = request.lastCommitInfo.votes;

        if (lastVotes !== undefined && lastVotes.length > 0) {
            lastVotes.forEach((vote: any) => {
                // pull/parse nodeId and current vote power
                const nodeId = vote.validator.address.toString("hex");
                const power = Number(vote.validator.power);

                // TODO: should we check for new validators here?

                // update vote and height trackers
                if (vote.signedLastBlock) {
                    state.validators[nodeId].totalVotes += 1;
                    state.validators[nodeId].lastVoted = (currHeight - 1);
                }

                // record if validator was active last round
                console.log('here1');
                state.validators[nodeId].active = vote.signedLastBlock;

                // record if they are proposer this round
                if (nodeId === proposer) {
                    state.validators[nodeId].lastProposed = currHeight;
                }

                // update (or re-record) validator vote power
                state.validators[nodeId].power = power;

                // update (or skip) first vote
                if (!state.validators[nodeId].firstVote) {
                    state.validators[nodeId].firstVote = currHeight;
                }

                /**
                 * TEMPORARY
                 * @todo remove
                 */
                if (state.validators[nodeId].genesis) {
                    state.validators[nodeId].ethAccount = "0x0";
                }
            });

            // update inactive validators
            doForEachValidator(state, (key) => {
                // current validator
                const validator = state.validators[key];

                // mark active if vote recorded on last block
                if ((validator.lastVoted + 1) === currHeight) {
                    console.log('here2', JSON.stringify(validator), validator);
                    validator.active = true;
                } else {
                    console.log('here3', JSON.stringify(validator), validator);
                    validator.active = false;
                }
            });

            // parse validators that voted on the last block, update values
            const toDelete = [];

            doForEachValidator(state, (nodeId) => {
                const validator = state.validators[nodeId];
                if (validator.balance === 0n && validator.applied === true) {
                    toDelete.push(nodeId);
                }
            });

            toDelete.forEach((id) => {
                delete state.validators[id];
            });
        }
        console.log(` \nposts: ${JSON.stringify(Object.keys(state.validators))}\n`);

        // update confirmation threshold based on number of active validators
        // confirmation threshold is >=2/3 active validators, unless there is
        // only one active validator, in which case it MUST be 1 in order for
        // state.balances to remain accurate.
        state.consensusParams.confirmationThreshold = computeConf(lastVotes.length);

        // Indicate new round, return no indexing tags
        log(
            "state",
            `current proposer: ${proposer.slice(0, 5)}...${proposer.slice(-5)}`,
            currHeight
        );
        return {};
    };
}
