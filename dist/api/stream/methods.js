"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require("uuid/v4");
const Response_1 = require("./Response");
exports.methods = {
    "session.end": async (server, client, req) => {
        client.close(1000, "Client-requested closure.");
    },
    "subscription.start": async (server, client, req) => {
        const { id, params } = req.parsed;
        let subscriptionId, response;
        try {
            subscriptionId = uuid();
            server.addSubscription(subscriptionId, id, client, params);
            response = "Successfully started subscription.";
        }
        catch (error) {
            subscriptionId = null;
            response = "Failed to start subscription.";
        }
        return new Response_1.Response({ id, result: { response, subscriptionId } });
    },
    "subscription.end": async (server, client, req) => {
        const { id, params } = req.parsed;
        let response;
        const { subscriptionId } = params;
        if (server.removeSubscription(subscriptionId)) {
            response = "Successfully ended event subscription.";
        }
        else {
            response = "Failed to end event subscription (id not found).";
        }
        return new Response_1.Response({ id, result: { response } });
    },
    "state.latestHeight": async (server, client, req) => {
        const { id, params } = req.parsed;
        let height;
        height = server.getLatestHeight();
        return new Response_1.Response({ id, result: { height } });
    },
    "state.query": async (server, client, req) => {
        const { id, params } = req.parsed;
        const { path } = params;
        const response = await server.executeTendermintQuery(path);
        return new Response_1.Response({ id, result: { response } });
    },
};
