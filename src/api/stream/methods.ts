/**
 * ===========================
 * ParadigmCore: Blind Star
 * @name methods.ts
 * @module api/stream
 * ===========================
 *
 * @author Henry Harder
 * @date (initial)  24-February-2019
 * @date (modified) 24-February-2018
**/

// using for type definition
import * as WebSocket from "ws";
import * as uuid from "uuid/v4";

// stream server and related classes
import { StreamServer } from "./StreamServer";
import { Request } from "./Request";
import { Response } from "./Response";

/**
 * Method implementations for the JSONRPC StreamAPI server (StreamServer)
 */
export const methods = {
    "session.end": async (server: StreamServer, client: WebSocket, req: Request) => {
        client.close(1000, "Client-requested closure.");
    },

    "subscription.start": async (server: StreamServer, client: WebSocket, req: Request) => {
        // destructure id and params
        const { id, params } = req.parsed;
        let subscriptionId, response;

        // generate random subscriptionId and add to mapping
        try {
            subscriptionId = uuid();
            server.addSubscription(subscriptionId, id, client, params);
            response = "Successfully started subscription.";
        } catch (error) {
            subscriptionId = null;
            response = "Failed to start subscription.";
        }

        // create and return response object
        return new Response({ id, result: { response, subscriptionId }});
    },

    "subscription.end": async (server: StreamServer, client: WebSocket, req: Request) => {
        // destructure id and params
        const { id, params } = req.parsed;
        let response;

        // subscriptionId to remove
        const { subscriptionId } = params;

        // attempt to remove subscription
        if (server.removeSubscription(subscriptionId)) {
            response = "Successfully ended event subscription.";
        } else {
            response = "Failed to end event subscription (id not found).";
        }

        // create and return response object
        return new Response({ id, result: { response }});
    },

    "state.latestHeight": async (server: StreamServer, client: WebSocket, req: Request) => {
        // destructure id and params
        const { id, params } = req.parsed;
        let height;

        // get current (latest commit) height
        height = server.getLatestHeight();

        // create and return response object
        return new Response({ id, result: { height }});
    },

    "state.query": async (server: StreamServer, client: WebSocket, req: Request) => {
        // destructure id and params
        const { id, params } = req.parsed;

        // destructure individual params
        const { path } = params;

        // get current (latest commit) height
        const response = await server.executeTendermintQuery(path);

        // create and return response object
        return new Response({ id, result: { response }});
    },
}
