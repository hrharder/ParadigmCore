"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./util/utils");
const log_1 = require("../common/log");
const valFunctions_1 = require("./util/valFunctions");
function beginBlockWrapper(state) {
    return (request) => {
        const currHeight = Number(request.header.height);
        const proposer = request.header.proposerAddress.toString("hex");
        const lastVotes = request.lastCommitInfo.votes;
        if (lastVotes !== undefined && lastVotes.length > 0) {
            lastVotes.forEach((vote) => {
                const nodeId = vote.validator.address.toString("hex");
                const power = Number(vote.validator.power);
                if (vote.signedLastBlock) {
                    state.validators[nodeId].totalVotes += 1;
                    state.validators[nodeId].lastVoted = (currHeight - 1);
                }
                state.validators[nodeId].active = vote.signedLastBlock;
                if (nodeId === proposer) {
                    state.validators[nodeId].lastProposed = currHeight;
                }
                state.validators[nodeId].power = power;
                if (state.validators[nodeId].genesis) {
                    state.validators[nodeId].ethAccount = "0x0";
                }
            });
            valFunctions_1.doForEachValidator(state, (key) => {
                const validator = state.validators[key];
                if ((validator.lastVoted + 1) === currHeight) {
                    validator.active = true;
                }
                else {
                    validator.active = false;
                }
            });
        }
        state.consensusParams.confirmationThreshold = utils_1.computeConf(lastVotes.length);
        log_1.log("state", `current proposer: ${proposer.slice(0, 5)}...${proposer.slice(-5)}`, currHeight);
        return {};
    };
}
exports.beginBlockWrapper = beginBlockWrapper;
