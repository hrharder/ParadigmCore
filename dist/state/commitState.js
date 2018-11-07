"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commitState = {
    round: {
        number: 0,
        startsAt: 0,
        endsAt: 0,
        limit: 0
    },
    events: {},
    balances: {},
    limits: {},
    lastEvent: {
        add: 0,
        remove: 0
    },
    orderCounter: 0,
    validators: {},
    lastBlockHeight: 0,
    lastBlockAppHash: null
};
