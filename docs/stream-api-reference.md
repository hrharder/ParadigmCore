# StreamAPI Reference

The StreamAPI enables interaction with the ParadigmCore via JSONRPC/WebSocket.

The API is served by the `StreamServer`, an optional component included as part of the `api` module in ParadigmCore.

StreamAPI follows the JSONRPC-2.0 specification. More information available at http://www.jsonrpc.org/specification.

<strong>Version 0.1-rc</strong>

---

- [session.end](#session.end)
- [subscription.start](#subscription.start)
- [subscription.end](#subscription.end)

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

| Name         | Type   | Description                                                                        |
| ------------ | ------ | ---------------------------------------------------------------------------------- |
| params       | object |                                                                                    |
| params.event | string | The name of the event you are subscribing to. Can be 'order' or 'block' currently. |

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
    "event": "order"
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
