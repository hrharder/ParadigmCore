[paradigm-contracts](../README.md) > ["src/api/stream/StreamServer"](../modules/_src_api_stream_streamserver_.md) > [StreamServer](../classes/_src_api_stream_streamserver_.streamserver.md)

# Class: StreamServer

ParadigmCore Stream Server, built to the JSONRPC-2.0 specification.

Allow access to various state events and blockchain data (WIP).

## Hierarchy

**StreamServer**

## Index

### Constructors

* [constructor](_src_api_stream_streamserver_.streamserver.md#constructor)

### Properties

* [abciConn](_src_api_stream_streamserver_.streamserver.md#abciconn)
* [abciSessionId](_src_api_stream_streamserver_.streamserver.md#abcisessionid)
* [abciURL](_src_api_stream_streamserver_.streamserver.md#abciurl)
* [clients](_src_api_stream_streamserver_.streamserver.md#clients)
* [host](_src_api_stream_streamserver_.streamserver.md#host)
* [newBlockEmitter](_src_api_stream_streamserver_.streamserver.md#newblockemitter)
* [port](_src_api_stream_streamserver_.streamserver.md#port)
* [retryCounter](_src_api_stream_streamserver_.streamserver.md#retrycounter)
* [retryInterval](_src_api_stream_streamserver_.streamserver.md#retryinterval)
* [retryTimeout](_src_api_stream_streamserver_.streamserver.md#retrytimeout)
* [server](_src_api_stream_streamserver_.streamserver.md#server)
* [api](_src_api_stream_streamserver_.streamserver.md#api)

### Methods

* [attachHandlersABCI](_src_api_stream_streamserver_.streamserver.md#attachhandlersabci)
* [attemptConnection](_src_api_stream_streamserver_.streamserver.md#attemptconnection)
* [clientErrorHandler](_src_api_stream_streamserver_.streamserver.md#clienterrorhandler)
* [clientMessageHandlerABCI](_src_api_stream_streamserver_.streamserver.md#clientmessagehandlerabci)
* [connectAbci](_src_api_stream_streamserver_.streamserver.md#connectabci)
* [decodeTxArr](_src_api_stream_streamserver_.streamserver.md#decodetxarr)
* [fatalCloseHandlerWrapper](_src_api_stream_streamserver_.streamserver.md#fatalclosehandlerwrapper)
* [getAbciReadyState](_src_api_stream_streamserver_.streamserver.md#getabcireadystate)
* [getUnixTimeFromISO](_src_api_stream_streamserver_.streamserver.md#getunixtimefromiso)
* [handleClientMessageWrapper](_src_api_stream_streamserver_.streamserver.md#handleclientmessagewrapper)
* [handleNewClient](_src_api_stream_streamserver_.streamserver.md#handlenewclient)
* [newBlockHandler](_src_api_stream_streamserver_.streamserver.md#newblockhandler)
* [newConnHandlerWrapper](_src_api_stream_streamserver_.streamserver.md#newconnhandlerwrapper)
* [sendMessageToClientByConn](_src_api_stream_streamserver_.streamserver.md#sendmessagetoclientbyconn)
* [setupServer](_src_api_stream_streamserver_.streamserver.md#setupserver)
* [start](_src_api_stream_streamserver_.streamserver.md#start)
* [subscribeToParadigmCoreEvent](_src_api_stream_streamserver_.streamserver.md#subscribetoparadigmcoreevent)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new StreamServer**(options: *`StreamServerOptions`*): [StreamServer](_src_api_stream_streamserver_.streamserver.md)

*Defined in [src/api/stream/StreamServer.ts:93](https://github.com/paradigmfoundation/paradigmcore/blob/86b6b78/src/api/stream/StreamServer.ts#L93)*

Instantiate a StreamServer.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| options | `StreamServerOptions` |  see 'StreamServerOptions' type definition/docs. |

**Returns:** [StreamServer](_src_api_stream_streamserver_.streamserver.md)

___

## Properties

<a id="abciconn"></a>

### `<Private>` abciConn

**● abciConn**: *`WebSocket`*

*Defined in [src/api/stream/StreamServer.ts:59](https://github.com/paradigmfoundation/paradigmcore/blob/86b6b78/src/api/stream/StreamServer.ts#L59)*

Client connection to the Tendermint ABCI server.

___
<a id="abcisessionid"></a>

### `<Private>` abciSessionId

**● abciSessionId**: *`string`*

*Defined in [src/api/stream/StreamServer.ts:62](https://github.com/paradigmfoundation/paradigmcore/blob/86b6b78/src/api/stream/StreamServer.ts#L62)*

Session ID string for ABCI WebSocket connection.

___
<a id="abciurl"></a>

### `<Private>` abciURL

**● abciURL**: *`URL`*

*Defined in [src/api/stream/StreamServer.ts:65](https://github.com/paradigmfoundation/paradigmcore/blob/86b6b78/src/api/stream/StreamServer.ts#L65)*

ABCI server URI/L (supplied during construction).

___
<a id="clients"></a>

### `<Private>` clients

**● clients**: *`ClientMap`*

*Defined in [src/api/stream/StreamServer.ts:88](https://github.com/paradigmfoundation/paradigmcore/blob/86b6b78/src/api/stream/StreamServer.ts#L88)*

Client tracking object.

___
<a id="host"></a>

### `<Private>` host

**● host**: *`string`*

*Defined in [src/api/stream/StreamServer.ts:85](https://github.com/paradigmfoundation/paradigmcore/blob/86b6b78/src/api/stream/StreamServer.ts#L85)*

Host to bind StreamServer to, defaults to 'localhost'

___
<a id="newblockemitter"></a>

### `<Private>` newBlockEmitter

**● newBlockEmitter**: *`EventEmitter`*

*Defined in [src/api/stream/StreamServer.ts:93](https://github.com/paradigmfoundation/paradigmcore/blob/86b6b78/src/api/stream/StreamServer.ts#L93)*

EventEmitter to track new block messages from ABCI connection.

___
<a id="port"></a>

### `<Private>` port

**● port**: *`number`*

*Defined in [src/api/stream/StreamServer.ts:82](https://github.com/paradigmfoundation/paradigmcore/blob/86b6b78/src/api/stream/StreamServer.ts#L82)*

Port to serve StreamAPI on.

___
<a id="retrycounter"></a>

### `<Private>` retryCounter

**● retryCounter**: *`number`*

*Defined in [src/api/stream/StreamServer.ts:71](https://github.com/paradigmfoundation/paradigmcore/blob/86b6b78/src/api/stream/StreamServer.ts#L71)*

Counts the number of attempts made during re-connection.

___
<a id="retryinterval"></a>

### `<Private>` retryInterval

**● retryInterval**: *`number`*

*Defined in [src/api/stream/StreamServer.ts:74](https://github.com/paradigmfoundation/paradigmcore/blob/86b6b78/src/api/stream/StreamServer.ts#L74)*

Interval (in ms) between ABCI reconnect attempts.

___
<a id="retrytimeout"></a>

### `<Private>` retryTimeout

**● retryTimeout**: *`number`*

*Defined in [src/api/stream/StreamServer.ts:68](https://github.com/paradigmfoundation/paradigmcore/blob/86b6b78/src/api/stream/StreamServer.ts#L68)*

Number of times to try to reconnect to ABCI upon closure.

___
<a id="server"></a>

### `<Private>` server

**● server**: *`Server`*

*Defined in [src/api/stream/StreamServer.ts:79](https://github.com/paradigmfoundation/paradigmcore/blob/86b6b78/src/api/stream/StreamServer.ts#L79)*

WebSocket server instance.

___
<a id="api"></a>

### `<Static>` api

**● api**: *`IStreamAPI`* =  api

*Defined in [src/api/stream/StreamServer.ts:54](https://github.com/paradigmfoundation/paradigmcore/blob/86b6b78/src/api/stream/StreamServer.ts#L54)*

StreamAPI request/method definitions.

___

## Methods

<a id="attachhandlersabci"></a>

### `<Private>` attachHandlersABCI

▸ **attachHandlersABCI**(timeout?: *`number`*): `void`

*Defined in [src/api/stream/StreamServer.ts:327](https://github.com/paradigmfoundation/paradigmcore/blob/86b6b78/src/api/stream/StreamServer.ts#L327)*

Attach handlers to a successful ABCI socket connection emitter.

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `Default value` timeout | `number` | 2000 |  number of times to attempt re-connection on socket drop |

**Returns:** `void`

___
<a id="attemptconnection"></a>

### `<Private>` attemptConnection

▸ **attemptConnection**(resolve: *`Function`*, reject: *`Function`*, timer: *`any`*): `void`

*Defined in [src/api/stream/StreamServer.ts:297](https://github.com/paradigmfoundation/paradigmcore/blob/86b6b78/src/api/stream/StreamServer.ts#L297)*

Attempt an individual connection to the ABCI server.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| resolve | `Function` |  resolve handler from timeout promise |
| reject | `Function` |  reject handler from timeout promise |
| timer | `any` |  the interval timer object currently in use |

**Returns:** `void`

___
<a id="clienterrorhandler"></a>

### `<Private>` clientErrorHandler

▸ **clientErrorHandler**(msg: *`string`*): `void`

*Defined in [src/api/stream/StreamServer.ts:374](https://github.com/paradigmfoundation/paradigmcore/blob/86b6b78/src/api/stream/StreamServer.ts#L374)*

Will be the error handler for client (and ABCI?) errors.

*__todo__*: implement.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| msg | `string` |  error message from client connection |

**Returns:** `void`

___
<a id="clientmessagehandlerabci"></a>

### `<Private>` clientMessageHandlerABCI

▸ **clientMessageHandlerABCI**(data: *`string`*): `void`

*Defined in [src/api/stream/StreamServer.ts:383](https://github.com/paradigmfoundation/paradigmcore/blob/86b6b78/src/api/stream/StreamServer.ts#L383)*

Handles incoming data from ABCI WebSocket connection.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| data | `string` |  received data from ABCI WebSocket connection. |

**Returns:** `void`

___
<a id="connectabci"></a>

### `<Private>` connectAbci

▸ **connectAbci**(timeout: *`number`*): `Promise`<`string`>

*Defined in [src/api/stream/StreamServer.ts:264](https://github.com/paradigmfoundation/paradigmcore/blob/86b6b78/src/api/stream/StreamServer.ts#L264)*

Trigger a series of attempts to connect to the WebSocket ABCI endpoint.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| timeout | `number` |  number of times to attempt connection |

**Returns:** `Promise`<`string`>

___
<a id="decodetxarr"></a>

### `<Private>` decodeTxArr

▸ **decodeTxArr**(txs: *`string`[]*): `string`[]

*Defined in [src/api/stream/StreamServer.ts:427](https://github.com/paradigmfoundation/paradigmcore/blob/86b6b78/src/api/stream/StreamServer.ts#L427)*

Decode and decompress a raw encoded/compressed tx array.

**Parameters:**

| Name | Type |
| ------ | ------ |
| txs | `string`[] |

**Returns:** `string`[]

___
<a id="fatalclosehandlerwrapper"></a>

### `<Private>` fatalCloseHandlerWrapper

▸ **fatalCloseHandlerWrapper**(timeout: *`number`*): `function`

*Defined in [src/api/stream/StreamServer.ts:352](https://github.com/paradigmfoundation/paradigmcore/blob/86b6b78/src/api/stream/StreamServer.ts#L352)*

Handler for a failed n(th) reconnect attempt.

This method is important as it is the logic that is executed when it is determined reconnecting to Tendermint is impossible (via ABCI drop).

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| timeout | `number` |  number of times to attempt final connection |

**Returns:** `function`

___
<a id="getabcireadystate"></a>

###  getAbciReadyState

▸ **getAbciReadyState**(): `number`

*Defined in [src/api/stream/StreamServer.ts:523](https://github.com/paradigmfoundation/paradigmcore/blob/86b6b78/src/api/stream/StreamServer.ts#L523)*

Returns the connection state of the ABCI WebSocket connection.

**Returns:** `number`

___
<a id="getunixtimefromiso"></a>

### `<Private>` getUnixTimeFromISO

▸ **getUnixTimeFromISO**(isoDate: *`string`*): `string`

*Defined in [src/api/stream/StreamServer.ts:417](https://github.com/paradigmfoundation/paradigmcore/blob/86b6b78/src/api/stream/StreamServer.ts#L417)*

Convert an ISO date string to a UNIX timestamp string.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| isoDate | `string` |  an ISO date string |

**Returns:** `string`

___
<a id="handleclientmessagewrapper"></a>

### `<Private>` handleClientMessageWrapper

▸ **handleClientMessageWrapper**(conn: *`WebSocket`*): `function`

*Defined in [src/api/stream/StreamServer.ts:180](https://github.com/paradigmfoundation/paradigmcore/blob/86b6b78/src/api/stream/StreamServer.ts#L180)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| conn | `WebSocket` |

**Returns:** `function`

___
<a id="handlenewclient"></a>

### `<Private>` handleNewClient

▸ **handleNewClient**(conn: *`WebSocket`*, req: *`IParsedRequest`*): `void`

*Defined in [src/api/stream/StreamServer.ts:214](https://github.com/paradigmfoundation/paradigmcore/blob/86b6b78/src/api/stream/StreamServer.ts#L214)*

Handler for new client connections.

*__todo__*: remove hard-coded stuff

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| conn | `WebSocket` |  connection instance |
| req | `IParsedRequest` |  connection request object |

**Returns:** `void`

___
<a id="newblockhandler"></a>

### `<Private>` newBlockHandler

▸ **newBlockHandler**(res: *`any`*): `void`

*Defined in [src/api/stream/StreamServer.ts:456](https://github.com/paradigmfoundation/paradigmcore/blob/86b6b78/src/api/stream/StreamServer.ts#L456)*

Handler for new block events.

**Parameters:**

| Name | Type |
| ------ | ------ |
| res | `any` |

**Returns:** `void`

___
<a id="newconnhandlerwrapper"></a>

### `<Private>` newConnHandlerWrapper

▸ **newConnHandlerWrapper**(): `function`

*Defined in [src/api/stream/StreamServer.ts:165](https://github.com/paradigmfoundation/paradigmcore/blob/86b6b78/src/api/stream/StreamServer.ts#L165)*

Returns a function to be used as the new connection handler.

Exists as a wrapper to carry over 'this' into handler scope.

**Returns:** `function`

___
<a id="sendmessagetoclientbyconn"></a>

### `<Private>` sendMessageToClientByConn

▸ **sendMessageToClientByConn**(conn: *`WebSocket`*, res: *`Response`*): `void`

*Defined in [src/api/stream/StreamServer.ts:252](https://github.com/paradigmfoundation/paradigmcore/blob/86b6b78/src/api/stream/StreamServer.ts#L252)*

Send a JSON response to a client identified by connection object.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| conn | `WebSocket` |  the socket instance |
| res | `Response` |  a JsonResponse object |

**Returns:** `void`

___
<a id="setupserver"></a>

### `<Private>` setupServer

▸ **setupServer**(options: *`any`*): `void`

*Defined in [src/api/stream/StreamServer.ts:155](https://github.com/paradigmfoundation/paradigmcore/blob/86b6b78/src/api/stream/StreamServer.ts#L155)*

Setup and configure the StreamAPI WebSocket server (and handlers).

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| options | `any` |  WebSocket server options (see 'ws' docs) |

**Returns:** `void`

___
<a id="start"></a>

###  start

▸ **start**(timeout?: *`number`*): `Promise`<`void`>

*Defined in [src/api/stream/StreamServer.ts:128](https://github.com/paradigmfoundation/paradigmcore/blob/86b6b78/src/api/stream/StreamServer.ts#L128)*

Start StreamServer; connect to the ABCI server over WebSocket, and start the StreamAPI server.

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `Default value` timeout | `number` | 2000 |  number of times to attempt ABCI connection. |

**Returns:** `Promise`<`void`>

___
<a id="subscribetoparadigmcoreevent"></a>

### `<Private>` subscribeToParadigmCoreEvent

▸ **subscribeToParadigmCoreEvent**(name: *`string`*): `void`

*Defined in [src/api/stream/StreamServer.ts:487](https://github.com/paradigmfoundation/paradigmcore/blob/86b6b78/src/api/stream/StreamServer.ts#L487)*

Subscribes to the "NewBlock" event over the ABCI server.

*__todo__*: move subscribe options somewhere else

*__todo__*: define valid tm event (name param)

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| name | `string` |  the name of the tendermint ABCI event to subscribe to |

**Returns:** `void`

___

