"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const valFunctions_1 = require("./util/valFunctions");
const utils_1 = require("./util/utils");
function initChainWrapper(deliverState, commitState, params) {
    const { finalityThreshold, periodLimit, periodLength, maxOrderBytes } = params;
    return (request) => {
        request.validators.forEach((validator) => {
            const pubKey = validator.pubKey.data;
            const nodeId = valFunctions_1.pubToAddr(pubKey).toString("hex");
            const power = Number(validator.power);
            if (!(deliverState.validators.hasOwnProperty(nodeId))) {
                deliverState.validators[nodeId] = {
                    balance: BigInt(-1),
                    power,
                    publicKey: pubKey,
                    ethAccount: null,
                    lastProposed: null,
                    lastVoted: 0,
                    totalVotes: 0,
                    active: true,
                    genesis: true,
                    applied: true,
                };
            }
        });
        deliverState.consensusParams = {
            finalityThreshold,
            periodLength,
            periodLimit,
            maxOrderBytes,
            confirmationThreshold: utils_1.computeConf(request.validators.length),
        };
        utils_1.syncStates(deliverState, commitState);
        return {};
    };
}
exports.initChainWrapper = initChainWrapper;
