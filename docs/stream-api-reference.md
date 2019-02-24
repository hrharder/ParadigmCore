# StreamAPI Reference

The StreamAPI enables interaction with the ParadigmCore via JSONRPC/WebSocket.

The API is served by the `StreamServer`, an optional component included as part of the `api` module in ParadigmCore.

StreamAPI follows the JSONRPC-2.0 specification. More information available at http://www.jsonrpc.org/specification.

<strong>Version 0.1-rc-2</strong>

---

- [session.end](#session.end)
- [subscription.start](#subscription.start)
- [subscription.end](#subscription.end)
- [block.latestHeight](#block.latestHeight)
- [state.orderCounter](#state.orderCounter)
- [state.query](#state.query)

---

<a name="session.end"></a>

## session.end

End a StreamAPI session.

### Description

Terminate a StreamAPI session immediately.

Calling this method will cancel all subscriptions, and immediately close the client/server connection.

### Result

| Name            | Type   | Description                                            |
| --------------- | ------ | ------------------------------------------------------ |
| result          | object |                                                        |
| result.response | string | The server's response to the connection-close request. |

### Errors

| Code | Message        | Description                              |
| ---- | -------------- | ---------------------------------------- |
| 1    | UnknownSession | The provided 'id' is invalid, or unused. |

### Examples

#### Request

```json
{
  "jsonrpc": "2.0",
  "id": "1234567890",
  "method": "session.end"
}
```

#### Response

```json
{
  "jsonrpc": "2.0",
  "id": "1234567890",
  "result": {
    "response": "Closing connection."
  }
}
```

<a name="subscription.start"></a>

## subscription.start

Subscribe to a specific ParadigmCore event.

### Description

Initiate a subscription to an OrderStream node for specific blockchain and state-related events.

### Parameters

| Name             | Type   | Description                                                                        |
| ---------------- | ------ | ---------------------------------------------------------------------------------- |
| params           | object |                                                                                    |
| params.eventName | string | The name of the event you are subscribing to. Can be 'order' or 'block' currently. |

### Result

| Name            | Type   | Description                                                          |
| --------------- | ------ | -------------------------------------------------------------------- |
| result          | object |                                                                      |
| result.response | string | The server's response to the subscription-start request.             |
| result?.eventId | string | A unique ID that can be used for filtering many event subscriptions. |

### Errors

| Code | Message           | Description                          |
| ---- | ----------------- | ------------------------------------ |
| 1    | InvalidParameters | The provided parameters are invalid. |

### Examples

#### Request

```json
{
  "jsonrpc": "2.0",
  "id": "1234567890",
  "method": "subscription.start",
  "params": {
    "eventName": "order"
  }
}
```

#### Response

```json
{
  "jsonrpc": "2.0",
  "id": "1234567890",
  "result": {
    "response": "Successfully started subscription",
    "eventId": "132162"
  }
}
```

<a name="subscription.end"></a>

## subscription.end

Unsubscribe from a specific ParadigmCore event.

### Description

Immediately end a subscription to a certain event, and stop receiving notifications.

### Parameters

| Name           | Type   | Description                                                    |
| -------------- | ------ | -------------------------------------------------------------- |
| params         | object |                                                                |
| params.eventId | string | A unique ID provided by the server upon an event subscription. |

### Result

| Name            | Type   | Description                                            |
| --------------- | ------ | ------------------------------------------------------ |
| result          | object |                                                        |
| result.response | string | The server's response to the subscription-end request. |

### Errors

| Code | Message           | Description                          |
| ---- | ----------------- | ------------------------------------ |
| 1    | InvalidParameters | The provided parameters are invalid. |

### Examples

#### Request

```json
{
  "jsonrpc": "2.0",
  "id": "1234567890",
  "method": "subscription.end",
  "params": {
    "eventId": "132162"
  }
}
```

#### Response

```json
{
  "jsonrpc": "2.0",
  "id": "1234567890",
  "result": {
    "response": "Successfully ended event subscription."
  }
}
```

<a name="block.latestHeight"></a>

## block.latestHeight

Return the height of the best known block.

### Description

The `block.latestHeight` method will return the integer height of the latest block committed to the blockchain.

### Result

| Name          | Type   | Description                                       |
| ------------- | ------ | ------------------------------------------------- |
| result        | object |                                                   |
| result.height | number | The integer height of the latest committed block. |

### Examples

#### Request

```json
{
  "jsonrpc": "2.0",
  "id": "1234567890",
  "method": "block.latestHeight"
}
```

#### Response

```json
{
  "jsonrpc": "2.0",
  "id": "1234567890",
  "result": {
    "height": 42341
  }
}
```

<a name="state.orderCounter"></a>

## state.orderCounter

Query the `state.orderCounter` field.

### Description

Return the incremental counter that tracks the in-state number of total `order` transactions.

### Result

| Name            | Type   | Description                                                                                                     |
| --------------- | ------ | --------------------------------------------------------------------------------------------------------------- |
| result          | object |                                                                                                                 |
| result.response | number | The result of the query, as a number. Counts the number of total orders processed by the network since genesis. |

### Errors

| Code | Message           | Description                          |
| ---- | ----------------- | ------------------------------------ |
| 1    | InvalidParameters | The provided parameters are invalid. |

### Examples

#### Request

```json
{
  "jsonrpc": "2.0",
  "id": "1234567890",
  "method": "state.orderCounter"
}
```

#### Response

```json
{
  "jsonrpc": "2.0",
  "id": "1234567890",
  "result": {
    "response": 113415
  }
}
```

<a name="state.query"></a>

## state.query

Query the permitted fields of an OrderStream node's state.

### Description

The `state.query` method allows RPC's to return information about the node (and a connected network's) public state.  
The `params.path` field can be used to direct a query to a particular path of the current state. The `path` is passed to ParadigmCore's ABCI `query` method, and the result of that function is returned.

### Parameters

| Name        | Type   | Description                                                    |
| ----------- | ------ | -------------------------------------------------------------- |
| params      | object |                                                                |
| params.path | string | A unique ID provided by the server upon an event subscription. |

### Result

| Name        | Type   | Description                                |
| ----------- | ------ | ------------------------------------------ |
| result      | object |                                            |
| result.data | string | The response data from the `query` method. |

### Errors

| Code | Message           | Description                          |
| ---- | ----------------- | ------------------------------------ |
| 1    | InvalidParameters | The provided parameters are invalid. |

### Examples

#### Request

```json
{
  "jsonrpc": "2.0",
  "id": "1234567890",
  "method": "state.query",
  "params": {
    "path": "posters/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
  }
}
```

#### Response

```json
{
  "jsonrpc": "2.0",
  "id": "1234567890",
  "result": {
    "data": "tbd"
  }
}
```
