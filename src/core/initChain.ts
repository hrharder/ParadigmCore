/**
 * ===========================
 * ParadigmCore: Blind Star
 * @name initChain.ts
 * @module core
 * ===========================
 *
 * @author Henry Harder
 * @date (initial)  21-January-2019
 * @date (modified) 12-March-2019
 *
 * ABCI initChain implementation.
*/

// custom typings
import { ResponseInitChain } from "../typings/abci";

// util functions
import { computeConf, syncStates } from "./util/utils";
import { pubToAddr } from "./util/valFunctions";

import * as _ from "lodash";
import { State } from "../state/State";

/**
 * Called once upon chain initialization. Sets initial validators and consensus
 * parameters.
 *
 * @param request {RequestInitChain}    genesis information
 */
export function initChainWrapper(
    state: State,
    params: ConsensusParams
): (r) => ResponseInitChain {
    // destructure initial consensus parameters
    const {
        finalityThreshold,
        periodLimit,
        periodLength,
        maxOrderBytes
    } = params;

    // Return initChain function
    return (request) => {
        // add genesis validators to in-state validator list
        request.validators.forEach((validator) => {
            // Generate hexadecimal nodeID from public key
            const pubKey: Buffer = validator.pubKey.data;
            const nodeId: string = pubToAddr(pubKey).toString("hex");
            const power: number = Number(validator.power);

            // Create entry if validator has not voted yet
            if (!(state.validators.hasOwnProperty(nodeId))) {
                state.validators[nodeId] = {
                    balance: BigInt(-1),
                    power,
                    publicKey: pubKey,
                    ethAccount: null,
                    lastProposed: null,
                    firstVote: null,
                    lastVoted: null,
                    totalVotes: 0,
                    active: true,
                    genesis: true,
                    applied: true,
                };
            }
        });

        // set initial consensus parameters
        state.consensusParams = {
            finalityThreshold,
            periodLength,
            periodLimit,
            maxOrderBytes,
            confirmationThreshold: computeConf(request.validators.length),
        };

        // Do not change any other parameters here
        return {};
    };
}
