# StreamAPI

The StreamAPI enables interaction with the ParadigmCore via ABCI  
This api follows the json-rpc 2.0 specification. More information available at http://www.jsonrpc.org/specification.

<strong>Version 0.1-rc</strong>

---

- [session.start](#session.start)
- [session.end](#session.end)
- [subscription.start](#subscription.start)
- [subscription.end](#subscription.end)

---

<a name="session.start"></a>

## session.start

Start a StreamAPI session.

### Description

The client-provided 'id' will be included in all future responses from the server, and must be included in all requests by the client for the duration of the session.

### Result

| Name           | Type   | Description                                                                |
| -------------- | ------ | -------------------------------------------------------------------------- |
| result         | object | Values specific to an individual session. End with `.end`.                 |
| result.id      | string | The client-provided top-level 'id' used in all session responses/requests. |
| result?.status | string | The session status. Can be 'CONNECTING', 'CLOSED', or 'OPEN'.              |

### Errors

| Code | Message      | Description                              |
| ---- | ------------ | ---------------------------------------- |
| 1    | BadSessionID | The provided 'id' is invalid, or in use. |

### Examples

#### Request

```json
{
  "jsonrpc": "2.0",
  "id": "1234567890",
  "method": "session.start"
}
```

#### Response

```json
{
  "jsonrpc": "2.0",
  "id": "1234567890",
  "result": {
    "id": "sID-23189",
    "status": "CONNECTING"
  }
}
```

<a name="session.end"></a>

## session.end

End a StreamAPI session.

### Description

Terminate a StreamAPI session immediately and cancel all subscriptions.

### Result

| Name           | Type   | Description                                                                |
| -------------- | ------ | -------------------------------------------------------------------------- |
| result         | object | Values specific to an individual session. End with `.end`.                 |
| result.id      | string | The client-provided top-level 'id' used in all session responses/requests. |
| result?.status | string | The session status. Can be 'CONNECTING', 'CLOSED', or 'OPEN'.              |

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
    "id": "sID-23189",
    "status": "CONNECTING"
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

| Name      | Type   | Description                                                            |
| --------- | ------ | ---------------------------------------------------------------------- |
| result    | object |                                                                        |
| result.id | string | The server-provided 'subscription.id' used in all event notifications. |

### Errors

| Code | Message            | Description                           |
| ---- | ------------------ | ------------------------------------- |
| 1    | InvalidCredentials | The provided credentials are invalid. |

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
    "id": "sID-23189"
  }
}
```

<a name="subscription.end"></a>

## subscription.end

Unsubscribe from a specific ParadigmCore event.

### Description

Immediately end a subscription to a certain event, and stop receiving notifications.

### Parameters

| Name         | Type   | Description                                                                        |
| ------------ | ------ | ---------------------------------------------------------------------------------- |
| params       | object |                                                                                    |
| params.event | string | The name of the event you are subscribing to. Can be 'order' or 'block' currently. |

### Result

| Name      | Type   | Description                                                            |
| --------- | ------ | ---------------------------------------------------------------------- |
| result    | object |                                                                        |
| result.id | string | The server-provided 'subscription.id' used in all event notifications. |

### Errors

| Code | Message            | Description                           |
| ---- | ------------------ | ------------------------------------- |
| 1    | InvalidCredentials | The provided credentials are invalid. |

### Examples

#### Request

```json
{
  "jsonrpc": "2.0",
  "id": "1234567890",
  "method": "subscription.end",
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
    "id": "sID-23189"
  }
}
```
