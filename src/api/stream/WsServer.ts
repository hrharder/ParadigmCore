/**
 * ===========================
 * ParadigmCore: Blind Star
 * @name WsServer.ts
 * @module src/api/stream
 * ===========================
 *
 * @author Henry Harder
 * @date (initial)  03-December-2018
 * @date (modified) 03-December-2018
 *
 * Implementation of the OrderStream WebSocket server. Creates an "event stream"
 * of valid order and stream broadcast transactions.
 */

// Standard lib imports
import { EventEmitter } from "events";
import { Server } from "ws";

// ParadigmCore imports
import { Logger as log } from "../../util/Logger";
import { messages as msg } from "../../util/static/messages";
import { WsMessage as Message } from "./WsMessage";

// "Globals"
let wss: Server;    // OrderStream event server (WebSocket)
let stream: EventEmitter;   // Global order/stream tracker

/**
 * Bind OrderStream API handlers to WebSocket server connections.
 *
 * @param server {ws.Server}    websocket server
 */
function bind(server: Server): Server {
    return server.on("connection", (connection) => {
        // Send connection message
        try {
            Message.sendMessage(connection, msg.websocket.messages.connected);
        } catch (err) {
            log.websocketErr(msg.websocket.errors.connect);
        }

        // New order/stream transaction
        stream.on("tx", (tx) => {
            try {
                wss.clients.forEach((client) => {
                    if ((client.readyState === 1) && (client === connection)) {
                        Message.sendOrder(client, tx);
                    }
                });
            } catch (err) {
                log.websocketErr(msg.websocket.errors.broadcast);
            }
        });

        // If the connection sends data
        connection.on("message", (message) => {
            if (message === "close") {
                return connection.close();
            } else {
                Message.sendMessage(connection, `Not implemented.`);
            }
        });
    });
}

/**
 * Start and bind OrderStream server (WebSocket).
 *
 * @param port      {number}        event stream WebSocket server bind port
 * @param emitter   {EventEmitter}  global event tracker object
 */
export function start(port: number, emitter: EventEmitter) {
    try {
        // Create WebSocket server
        let server = new Server({ port }, () => {
            log.websocketEvt(msg.websocket.messages.servStart);
        });

        // Load global order emitter
        stream = emitter;

        // Bind handlers to global server object
        wss = bind(server);
    } catch (error) {
        throw new Error("Error starting WebSocket server.");
    }
}
