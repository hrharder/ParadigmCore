"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const valFunctions_1 = require("./util/valFunctions");
function endBlockWrapper(state) {
    return (request) => {
        const validatorUpdates = [];
        let totalStake = BigInt(0);
        let needToUpdate = false;
        valFunctions_1.doForEachValidator(state, (nodeId) => {
            const validator = state.validators[nodeId];
            if (!validator.genesis)
                totalStake += validator.balance;
            if (!validator.applied)
                needToUpdate = true;
        });
        return { validatorUpdates: [] };
    };
}
exports.endBlockWrapper = endBlockWrapper;
