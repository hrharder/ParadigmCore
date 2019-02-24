"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.methods = {
    "session.end": (server, client, params) => {
        client.close();
    }
};
