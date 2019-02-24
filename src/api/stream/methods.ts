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

import * as WebSocket from "ws";
import { StreamServer } from "./StreamServer";

/**
 * Method implementations for the JSONRPC StreamAPI server (StreamServer)
 */
export const methods = {
    "session.end": (server: StreamServer, client: WebSocket, params: any) => {
        client.close();
    }
}
