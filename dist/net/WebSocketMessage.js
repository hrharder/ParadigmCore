"use strict";
/*
  =========================
  ParadigmCore: Blind Star
  WebSocketMessage.ts @ {master}
  =========================
  
  @date_initial 27 August 2018
  @date_modified 19 October 2018
  @author Henry Harder

  Simple class for creating and sending JSON messages using WebSocket.
*/
Object.defineProperty(exports, "__esModule", { value: true });
class WebSocketMessage {
    static sendMessage(ws, message) {
        let msg = {
            "event": "message",
            "timestamp": Math.floor(Date.now() / 1000),
            "data-type": "string",
            "data": message
        };
        try {
            ws.send(`${JSON.stringify(msg)}\n`, (err) => {
                if (err != undefined) {
                    throw new Error("Error in ws.send(...)");
                }
            });
        }
        catch (error) {
            throw new Error('Error sending WS event.');
        }
    }
    static sendOrder(ws, order) {
        let msg = {
            "event": "order",
            "timestamp": Math.floor(Date.now() / 1000),
            "data-type": "JSON",
            "data": order
        };
        try {
            ws.send(`${JSON.stringify(msg)}\n`, (err) => {
                if (err != undefined) {
                    throw new Error("Error in ws.send(...)");
                }
            });
        }
        catch (error) {
            throw new Error('Error sending WS event.');
        }
    }
    static sendStream(ws, stream) {
        let msg = {
            "event": "stream",
            "timestamp": Math.floor(Date.now() / 1000),
            "data-type": "JSON",
            "data": stream
        };
        try {
            ws.send(`${JSON.stringify(msg)}\n`, (err) => {
                if (err != undefined) {
                    throw new Error("Error in ws.send(...)");
                }
            });
        }
        catch (error) {
            throw new Error('Error sending WS event.');
        }
    }
}
exports.WebSocketMessage = WebSocketMessage;
