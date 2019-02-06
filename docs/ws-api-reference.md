---
title: JSONRPC Reference
---

# ParadigmCore JSONRPC (over WS)

_NOTE: as of 2/6/19 this API is a work-in-progress. Slated for inclusion in ParadigmCore `v0.8.0`.

ParadigmCore includes the optional `api` module which includes the `StreamServer`, which serves a [JSONRPC 2.0 compliant](https://www.jsonrpc.org/specification) WebSocket API for interacting with the OrderStream network.

The primary appeal of the `StreamServer`'s `stream` API is it's ability to deliver real-time updates about the OrderStream blockchain and state to remote clients. This includes the `order/stream` API which is used to subscribe to the valid order event stream.

## Configuration

By default, the `StreamServer` class is enabled, with the JSONRPC `stream` API served on `ws://localhost:4242`. 

The `stream` API can be disabled via environment variables, but is designed to provide to convenient way to access the OrderStream blockchain. Serious application developers will likely implement their own processes for accessing the encoded/compressed OS blockchain data. 

## Request/response format

([See the JSONRPC spec](https://www.jsonrpc.org/specification) for more details.)

- All client-to-server requests should have the following top-level format:

    ```json
    {
        "jsonrpc":  "2.0",          // always "2.0"
        "method":   "subscribe",    // currently the only method
        "params":   {},             // method-specific object
        "id":       "any-id",    // ID set by client during connection   
    }
    ```

- All successful server-to-client responses will have the following top-level-format

    ```json
    {
        "jsonrpc":  "2.0",      // always "2.0"
        "result":   {},         // request-specific format
        "id":       "any-id",   // ID set by client during connection   
    }
    ```

- All  server-to-client responses containing an error will have the following top-level-format

    ```json
    {
        "jsonrpc":  "2.0",      // always "2.0"
        "error":   {
            "code": "-32700",   // see all error codes below 
            "message": "...",   // additional error information
        },
        "id":       "any-id",   // ID set by client during connection   
    }
    ```

## Error handling

## Methods