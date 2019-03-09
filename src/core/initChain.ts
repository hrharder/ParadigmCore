/**
 * ===========================
 * ParadigmCore: Blind Star
 * @name initChain.ts
 * @module src/core
 * ===========================
 *
 * @author Henry Harder
 * @date (initial)  21-January-2019
 * @date (modified) 21-January-2019
 *
 * ABCI initChain implementation.
*/

// custom typings
import { ResponseInitChain } from "../typings/abci";

// util functions
import { pubToAddr } from "./util/valFunctions";
import { computeConf, syncStates } from "./util/utils";

import * as _ from "lodash"

/**
 * Called once upon chain initialization. Sets initial validators and consensus
 * parameters.
 *
 * @param request {RequestInitChain}    genesis information
 */
export function initChainWrapper(
    deliverState: IState,
    commitState: IState,
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
        
        // load genesis state
        const stateBytes = Buffer.from(request.appStateBytes, "base64");
        const stateJson = JSON.parse(stateBytes.toString());

        // set initial states
        // deliverState = _.cloneDeep(stateJson);
        // commitState = _.cloneDeep(stateJson);
        

        // add genesis validators to in-state validator list
        request.validators.forEach((validator) => {
            // Generate hexadecimal nodeID from public key
            const pubKey: Buffer = validator.pubKey.data;
            const nodeId: string = pubToAddr(pubKey).toString("hex");
            const power: number = Number(validator.power);

            // Create entry if validator has not voted yet
            if (!(deliverState.validators.hasOwnProperty(nodeId))) {
                deliverState.validators[nodeId] = {
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
        deliverState.consensusParams = {
            finalityThreshold,
            periodLength,
            periodLimit,
            maxOrderBytes,
            confirmationThreshold: computeConf(request.validators.length),
        };

        // synchronize states upon network genesis
        syncStates(deliverState, commitState);

        // Do not change any other parameters here
        return {};
    };
}