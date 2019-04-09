# StreamAPI Reference

The StreamAPI enables interaction with ParadigmCore via JSONRPC/WebSocket.

The API is served by the `StreamServer`, an optional component included as part of the `api` module in ParadigmCore.

StreamAPI follows the JSONRPC-2.0 specification. More information available at http://www.jsonrpc.org/specification.

<strong>Version 0.1-rc-4</strong>

---

- [subscription.start](#subscription.start)
- [subscription.end](#subscription.end)
- [order.submit](#order.submit)
- [state.latestHeight](#state.latestHeight)
- [state.orderCounter](#state.orderCounter)
- [state.query](#state.query)
- [session.end](#session.end)

---

<a name="subscription.start"></a>

## subscription.start

Subscribe to a specific ParadigmCore event.

### Description

Initiate a subscription to an OrderStream node for specific blockchain and state-related events.

The `eventName` parameter is used to subscribe to specific blockchain events. Currently, you can subscribe to `block` events, or `orders`.

A `block` subscription (with no filters) will push various blockchain and header data to the client upon a new block being committed. The `filters` parameter can be used to filter out irrelevant data.

If no strings are included in the `filters` parameter, all block data will be returned.

The `orders` subscription will alert the client with an array of all accepted `order` transactions for each new block. By default, a notification is sent to the client every block, even if there were no `order` transactions in that block.

### Parameters

| Name             | Type   | Description                                                                                                                         |
| ---------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| params           | object |                                                                                                                                     |
| params.eventName | string | The name of the event you are subscribing to. Can be 'orders' or 'block' currently.                                                 |
| params?.filters  | array  | An array of strings to be used as response filters. If present, only the keys in the filter array will be included in the response. |

### Result

| Name                   | Type   | Description                                                          |
| ---------------------- | ------ | -------------------------------------------------------------------- |
| result                 | object |                                                                      |
| result.response        | string | The server's response to the subscription-start request.             |
| result?.subscriptionId | string | A unique ID that can be used for filtering many event subscriptions. |

### Errors

| Code   | Message            | Description                                             |
| ------ | ------------------ | ------------------------------------------------------- |
| -32602 | Invalid Parameters | The provided parameters are invalid.                    |
| -32600 | Parse Error        | The request object is invalid.                          |
| -32603 | Internal Error     | The server encountered an error processing the request. |

### Examples

#### Request

```json
{
  "jsonrpc": "2.0",
  "id": "1234567890",
  "method": "subscription.start",
  "params": {
    "eventName": "block",
    "filters": ["height", "time"]
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
    "subscriptionId": "84a55ba0-7f87-4430-b921-738f84857889"
  }
}
```

<a name="subscription.end"></a>

## subscription.end

Unsubscribe from a specific ParadigmCore event.

### Description

Immediately end a subscription to a certain event, and stop receiving notifications.

### Parameters

| Name                  | Type   | Description                                                    |
| --------------------- | ------ | -------------------------------------------------------------- |
| params                | object |                                                                |
| params.subscriptionId | string | A unique ID provided by the server upon an event subscription. |

### Result

| Name            | Type   | Description                                            |
| --------------- | ------ | ------------------------------------------------------ |
| result          | object |                                                        |
| result.response | string | The server's response to the subscription-end request. |

### Errors

| Code   | Message            | Description                                             |
| ------ | ------------------ | ------------------------------------------------------- |
| -32602 | Invalid Parameters | The provided parameters are invalid.                    |
| -32600 | Parse Error        | The request object is invalid.                          |
| -32603 | Internal Error     | The server encountered an error processing the request. |

### Examples

#### Request

```json
{
  "jsonrpc": "2.0",
  "id": "1234567890",
  "method": "subscription.end",
  "params": {
    "subscriptionId": "84a55ba0-7f87-4430-b921-738f84857889"
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

<a name="order.submit"></a>

## order.submit

Propose an order to be broadcast to the network.

### Description

Submit a signed Paradigm order object to a validator to be broadcast to the network.

Allows selection of `mode` which can be set to `async`, in which case the RPC will respond immediately without waiting for the order to be verified by the node.

The mode can also be set to `sync` where the RPC will respond after the order has been accepted or rejected by the node's local mempool.

To wait for the order to be included in a block (up to 3 seconds), set the mode to `commit`.

Orders can be created and signed with the ParadigmConnect library.

### Parameters

| Name                                                         | Type   | Description                                                                                                |
| ------------------------------------------------------------ | ------ | ---------------------------------------------------------------------------------------------------------- |
| params                                                       | object |                                                                                                            |
| params.order                                                 | object | The signed Paradigm order object (in object notation) to be submitted.                                     |
| The example shows a 0x order wrapped for the 0x SubContract. |
| params.order.subContract                                     | string | The Ethereum address of the Paradigm SubContract the order is for.                                         |
| params.order.maker                                           | string | The Ethereum address of the order's maker and signing party.                                               |
| params.order?.makerArguments                                 | array  | An array of objects that define the order's required maker arguments                                       |
| params.order?.takerArguments                                 | array  | An array of objects that define the order's required taker arguments                                       |
| params.order.makerValues                                     | object | An object that defines the order's maker values, as defined in the `makerArguments`.                       |
| params.order?.makerSignature                                 | object | An optional field that defines the order's maker signature, independent from the `makerValues`.            |
| params.order.posterSignature                                 | object | An object that contains the signature of the poster submitting the order. May also be signed by the maker. |
| params?.mode                                                 | string | The broadcast mode to be used for the underlying Tendermint remote procedural call.                        |

### Result

| Name             | Type   | Description                                                                                      |
| ---------------- | ------ | ------------------------------------------------------------------------------------------------ |
| result           | object |                                                                                                  |
| result.message   | string | The response from the node to the order submission. Will include ID in some cases.               |
| result.processed | string | The date and time at which the request was processed by the node.                                |
| result.code      | number | The raw response code returned by the ParadigmCore ABCI application. Only `0` indicates success. |

### Errors

| Code   | Message            | Description                                             |
| ------ | ------------------ | ------------------------------------------------------- |
| -32602 | Invalid Parameters | The provided parameters are invalid.                    |
| -32600 | Parse Error        | The request object is invalid.                          |
| -32603 | Internal Error     | The server encountered an error processing the request. |

### Examples

#### Request

```json
{
  "jsonrpc": "2.0",
  "id": "1234567890",
  "method": "order.submit",
  "params": {
    "order": {
      "subContract": "0x0afd97c4548d6a5db854d6b1b4b18138327f944c",
      "maker": "0xdbffce76e8ab7b64b8d4400778bf514b92facb66",
      "makerArguments": [
        {
          "dataType": "address",
          "name": "orderMaker"
        },
        {
          "dataType": "address",
          "name": "orderTaker"
        },
        {
          "dataType": "address",
          "name": "orderMakerTokenAddress"
        },
        {
          "dataType": "address",
          "name": "orderTakerTokenAddress"
        },
        {
          "dataType": "address",
          "name": "orderFeeRecipient"
        }
      ],
      "takerArguments": [
        {
          "dataType": "address",
          "name": "orderMaker"
        },
        {
          "dataType": "address",
          "name": "orderTaker"
        },
        {
          "dataType": "address",
          "name": "orderMakerTokenAddress"
        },
        {
          "dataType": "address",
          "name": "orderTakerTokenAddress"
        },
        {
          "dataType": "address",
          "name": "orderFeeRecipient"
        }
      ],
      "makerValues": {},
      "makerSignature": {},
      "posterSignature": {}
    },
    "mode": "sync"
  }
}
```

#### Response

```json
{
  "jsonrpc": "2.0",
  "id": "1234567890",
  "result": {
    "message": "new order rejected: invalid poster or no poster stake",
    "processed": "4/1/2019, 10:22:48 AM",
    "code": 1
  }
}
```

<a name="state.latestHeight"></a>

## state.latestHeight

Return the height of the best known block.

### Description

The `block.latestHeight` method will return the integer height of the latest block committed to the blockchain.

### Result

| Name          | Type   | Description                                       |
| ------------- | ------ | ------------------------------------------------- |
| result        | object |                                                   |
| result.height | number | The integer height of the latest committed block. |

### Errors

| Code   | Message            | Description                                             |
| ------ | ------------------ | ------------------------------------------------------- |
| -32602 | Invalid Parameters | The provided parameters are invalid.                    |
| -32600 | Parse Error        | The request object is invalid.                          |
| -32603 | Internal Error     | The server encountered an error processing the request. |

### Examples

#### Request

```json
{
  "jsonrpc": "2.0",
  "id": "1234567890",
  "method": "state.latestHeight"
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

| Code   | Message            | Description                                             |
| ------ | ------------------ | ------------------------------------------------------- |
| -32602 | Invalid Parameters | The provided parameters are invalid.                    |
| -32600 | Parse Error        | The request object is invalid.                          |
| -32603 | Internal Error     | The server encountered an error processing the request. |

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

The `state.query` method allows RPCs to return information about the node (and a connected network's) public state.  
The `params.path` field can be used to direct a query to a particular path of the current state. The `path` is passed to ParadigmCore's ABCI `query` method, and the result of that function is returned.

### Parameters

| Name        | Type   | Description                                                                                                           |
| ----------- | ------ | --------------------------------------------------------------------------------------------------------------------- |
| params      | object |                                                                                                                       |
| params.path | string | The `path` string is passed to the `abci_query` method and directs a query towards a particular state account object. |

### Result

| Name            | Type   | Description                                                            |
| --------------- | ------ | ---------------------------------------------------------------------- |
| result          | object |                                                                        |
| result.response | number | The result of the query, as a string (more documentation coming soon). |

### Errors

| Code   | Message            | Description                                             |
| ------ | ------------------ | ------------------------------------------------------- |
| -32602 | Invalid Parameters | The provided parameters are invalid.                    |
| -32600 | Parse Error        | The request object is invalid.                          |
| -32603 | Internal Error     | The server encountered an error processing the request. |

### Examples

#### Request

```json
{
  "jsonrpc": "2.0",
  "id": "1234567890",
  "method": "state.query",
  "params": {
    "path": "posters/0xaa554d0c5ff879387fc234de5d22ec02983baa27/limit"
  }
}
```

#### Response

```json
{
  "jsonrpc": "2.0",
  "id": "1234567890",
  "result": {
    "response": "12000"
  }
}
```

<a name="session.end"></a>

## session.end

End a StreamAPI session.

### Description

Terminate a StreamAPI session immediately.

Calling this method will cancel all subscriptions, and immediately close the client/server connection.

### Errors

| Code   | Message            | Description                                             |
| ------ | ------------------ | ------------------------------------------------------- |
| -32602 | Invalid Parameters | The provided parameters are invalid.                    |
| -32600 | Parse Error        | The request object is invalid.                          |
| -32603 | Internal Error     | The server encountered an error processing the request. |

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
  "id": "1234567890"
}
```
