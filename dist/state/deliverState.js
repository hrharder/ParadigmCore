"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deliverState = {
    round: {
        number: 0,
        startsAt: 0,
        endsAt: 0,
        limit: 0
    },
    events: {},
    posters: {},
    lastEvent: -1,
    validators: {},
    consensusParams: {
        finalityThreshold: null,
        periodLength: null,
        periodLimit: null,
        maxOrderBytes: null,
        confirmationThreshold: null
    },
    orderCounter: 0,
    lastBlockHeight: 0,
    lastBlockAppHash: null
};
