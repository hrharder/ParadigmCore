[ParadigmCore](../README.md) > ["api/stream/StreamServer-old"](../modules/_api_stream_streamserver_old_.md) > [StreamServer](../classes/_api_stream_streamserver_old_.streamserver.md)

# Class: StreamServer

ParadigmCore Stream Server, built to the JSONRPC-2.0 specification.

Allow access to various state events and blockchain data (WIP).

## Hierarchy

**StreamServer**

## Index

### Constructors

* [constructor](_api_stream_streamserver_old_.streamserver.md#constructor)

### Properties

* [abciConn](_api_stream_streamserver_old_.streamserver.md#abciconn)
* [abciSessionId](_api_stream_streamserver_old_.streamserver.md#abcisessionid)
* [abciURL](_api_stream_streamserver_old_.streamserver.md#abciurl)
* [clients](_api_stream_streamserver_old_.streamserver.md#clients)
* [connections](_api_stream_streamserver_old_.streamserver.md#connections)
* [host](_api_stream_streamserver_old_.streamserver.md#host)
* [latestAbciData](_api_stream_streamserver_old_.streamserver.md#latestabcidata)
* [newBlockEmitter](_api_stream_streamserver_old_.streamserver.md#newblockemitter)
* [port](_api_stream_streamserver_old_.streamserver.md#port)
* [retryCounter](_api_stream_streamserver_old_.streamserver.md#retrycounter)
* [retryInterval](_api_stream_streamserver_old_.streamserver.md#retryinterval)
* [retryTimeout](_api_stream_streamserver_old_.streamserver.md#retrytimeout)
* [server](_api_stream_streamserver_old_.streamserver.md#server)
* [api](_api_stream_streamserver_old_.streamserver.md#api)

### Methods

* [attachHandlersABCI](_api_stream_streamserver_old_.streamserver.md#attachhandlersabci)
* [attemptConnection](_api_stream_streamserver_old_.streamserver.md#attemptconnection)
* [clientErrorHandler](_api_stream_streamserver_old_.streamserver.md#clienterrorhandler)
* [connectAbci](_api_stream_streamserver_old_.streamserver.md#connectabci)
* [decodeTxArr](_api_stream_streamserver_old_.streamserver.md#decodetxarr)
* [fatalCloseHandlerWrapper](_api_stream_streamserver_old_.streamserver.md#fatalclosehandlerwrapper)
* [getAbciReadyState](_api_stream_streamserver_old_.streamserver.md#getabcireadystate)
* [getPseudoRandomSessionId](_api_stream_streamserver_old_.streamserver.md#getpseudorandomsessionid)
* [getUnixTimeFromISO](_api_stream_streamserver_old_.streamserver.md#getunixtimefromiso)
* [handleClientMessageWrapper](_api_stream_streamserver_old_.streamserver.md#handleclientmessagewrapper)
* [handleNewABCIMessage](_api_stream_streamserver_old_.streamserver.md#handlenewabcimessage)
* [handleNewSession](_api_stream_streamserver_old_.streamserver.md#handlenewsession)
* [newBlockHandler](_api_stream_streamserver_old_.streamserver.md#newblockhandler)
* [newConnHandlerWrapper](_api_stream_streamserver_old_.streamserver.md#newconnhandlerwrapper)
* [sendMessageToClient](_api_stream_streamserver_old_.streamserver.md#sendmessagetoclient)
* [setupServer](_api_stream_streamserver_old_.streamserver.md#setupserver)
* [start](_api_stream_streamserver_old_.streamserver.md#start)
* [subscribeToParadigmCoreEvent](_api_stream_streamserver_old_.streamserver.md#subscribetoparadigmcoreevent)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new StreamServer**(options: *`any`*): [StreamServer](_api_stream_streamserver_old_.streamserver.md)

*Defined in api/stream/StreamServer-old.ts:103*

Instantiate a StreamServer.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| options | `any` |  see 'StreamServerOptions' type definition/docs. |

**Returns:** [StreamServer](_api_stream_streamserver_old_.streamserver.md)

___

## Properties

<a id="abciconn"></a>

### `<Private>` abciConn

**● abciConn**: *`WebSocket`*

*Defined in api/stream/StreamServer-old.ts:59*

Client connection to the Tendermint ABCI server.

___
<a id="abcisessionid"></a>

### `<Private>` abciSessionId

**● abciSessionId**: *`string`*

*Defined in api/stream/StreamServer-old.ts:62*

Session ID string for ABCI WebSocket connection.

___
<a id="abciurl"></a>

### `<Private>` abciURL

**● abciURL**: *`URL`*

*Defined in api/stream/StreamServer-old.ts:65*

ABCI server URI/L (supplied during construction).

___
<a id="clients"></a>

### `<Private>` clients

**● clients**: *`ClientMap`*

*Defined in api/stream/StreamServer-old.ts:96*

Client tracking object.

___
<a id="connections"></a>

### `<Private>` connections

**● connections**: *`ConnectionMap`*

*Defined in api/stream/StreamServer-old.ts:98*

___
<a id="host"></a>

### `<Private>` host

**● host**: *`string`*

*Defined in api/stream/StreamServer-old.ts:93*

Host to bind StreamServer to, defaults to 'localhost'

___
<a id="latestabcidata"></a>

### `<Private>` latestAbciData

**● latestAbciData**: *`any`*

*Defined in api/stream/StreamServer-old.ts:73*

The latest data from the ABCI server, updated each time a new block is committed.

*__todo__*: create interface def.

___
<a id="newblockemitter"></a>

### `<Private>` newBlockEmitter

**● newBlockEmitter**: *`EventEmitter`*

*Defined in api/stream/StreamServer-old.ts:103*

EventEmitter to track new block messages from ABCI connection.

___
<a id="port"></a>

### `<Private>` port

**● port**: *`number`*

*Defined in api/stream/StreamServer-old.ts:90*

Port to serve StreamAPI on.

___
<a id="retrycounter"></a>

### `<Private>` retryCounter

**● retryCounter**: *`number`*

*Defined in api/stream/StreamServer-old.ts:79*

Counts the number of attempts made during re-connection.

___
<a id="retryinterval"></a>

### `<Private>` retryInterval

**● retryInterval**: *`number`*

*Defined in api/stream/StreamServer-old.ts:82*

Interval (in ms) between ABCI reconnect attempts.

___
<a id="retrytimeout"></a>

### `<Private>` retryTimeout

**● retryTimeout**: *`number`*

*Defined in api/stream/StreamServer-old.ts:76*

Number of times to try to reconnect to ABCI upon closure.

___
<a id="server"></a>

### `<Private>` server

**● server**: *`Server`*

*Defined in api/stream/StreamServer-old.ts:87*

WebSocket server instance.

___
<a id="api"></a>

### `<Static>` api

**● api**: *`IStreamAPI`* =  api

*Defined in api/stream/StreamServer-old.ts:54*

StreamAPI request/method definitions.

___

## Methods

<a id="attachhandlersabci"></a>

### `<Private>` attachHandlersABCI

▸ **attachHandlersABCI**(timeout?: *`number`*): `void`

*Defined in api/stream/StreamServer-old.ts:368*

Attach handlers to a successful ABCI socket connection emitter.

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `Default value` timeout | `number` | 2000 |  number of times to attempt re-connection on socket drop |

**Returns:** `void`

___
<a id="attemptconnection"></a>

### `<Private>` attemptConnection

▸ **attemptConnection**(resolve: *`Function`*, timer: *`any`*): `void`

*Defined in api/stream/StreamServer-old.ts:338*

Attempt an individual connection to the ABCI server.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| resolve | `Function` |  resolve handler from timeout promise |
| timer | `any` |  the interval timer object currently in use |

**Returns:** `void`

___
<a id="clienterrorhandler"></a>

### `<Private>` clientErrorHandler

▸ **clientErrorHandler**(msg: *`string`*): `void`

*Defined in api/stream/StreamServer-old.ts:415*

Will be the error handler for client (and ABCI?) errors.

*__todo__*: implement.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| msg | `string` |  error message from client connection |

**Returns:** `void`

___
<a id="connectabci"></a>

### `<Private>` connectAbci

▸ **connectAbci**(timeout: *`number`*): `Promise`<`string`>

*Defined in api/stream/StreamServer-old.ts:306*

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

*Defined in api/stream/StreamServer-old.ts:468*

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

*Defined in api/stream/StreamServer-old.ts:393*

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

*Defined in api/stream/StreamServer-old.ts:571*

Returns the connection state of the ABCI WebSocket connection.

**Returns:** `number`

___
<a id="getpseudorandomsessionid"></a>

### `<Private>` getPseudoRandomSessionId

▸ **getPseudoRandomSessionId**(): `string`

*Defined in api/stream/StreamServer-old.ts:248*

**Returns:** `string`

___
<a id="getunixtimefromiso"></a>

### `<Private>` getUnixTimeFromISO

▸ **getUnixTimeFromISO**(isoDate: *`string`*): `string`

*Defined in api/stream/StreamServer-old.ts:458*

Convert an ISO date string to a UNIX timestamp string.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| isoDate | `string` |  an ISO date string |

**Returns:** `string`

___
<a id="handleclientmessagewrapper"></a>

### `<Private>` handleClientMessageWrapper

▸ **handleClientMessageWrapper**(ssID: *`string`*): `function`

*Defined in api/stream/StreamServer-old.ts:204*

**Parameters:**

| Name | Type |
| ------ | ------ |
| ssID | `string` |

**Returns:** `function`

___
<a id="handlenewabcimessage"></a>

### `<Private>` handleNewABCIMessage

▸ **handleNewABCIMessage**(data: *`string`*): `void`

*Defined in api/stream/StreamServer-old.ts:424*

Handles incoming data from ABCI WebSocket connection.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| data | `string` |  received data from ABCI WebSocket connection. |

**Returns:** `void`

___
<a id="handlenewsession"></a>

### `<Private>` handleNewSession

▸ **handleNewSession**(ssID: *`string`*, req: *`IParsedRequest`*): `void`

*Defined in api/stream/StreamServer-old.ts:261*

Handler for new client connections.

*__todo__*: remove hard-coded stuff

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| ssID | `string` |  server-side connection id |
| req | `IParsedRequest` |  connection request object |

**Returns:** `void`

___
<a id="newblockhandler"></a>

### `<Private>` newBlockHandler

▸ **newBlockHandler**(res: *`any`*): `void`

*Defined in api/stream/StreamServer-old.ts:497*

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

*Defined in api/stream/StreamServer-old.ts:183*

Returns a function to be used as the new connection handler.

Exists as a wrapper to carry over 'this' into handler scope.

**Returns:** `function`

___
<a id="sendmessagetoclient"></a>

### `<Private>` sendMessageToClient

▸ **sendMessageToClient**(ssID: *`string`*, res: *`Response`*): `void`

*Defined in api/stream/StreamServer-old.ts:292*

Send a JSON response to a client identified by server-side ID string.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| ssID | `string` |  the server-side client ID string |
| res | `Response` |  a JsonResponse object |

**Returns:** `void`

___
<a id="setupserver"></a>

### `<Private>` setupServer

▸ **setupServer**(options: *`any`*): `void`

*Defined in api/stream/StreamServer-old.ts:173*

Setup and configure the StreamAPI WebSocket server (and handlers).

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| options | `any` |  WebSocket server options (see 'ws' docs) |

**Returns:** `void`

___
<a id="start"></a>

###  start

▸ **start**(timeout: *`any`*): `Promise`<`void`>

*Defined in api/stream/StreamServer-old.ts:140*

Start StreamServer; connect to the ABCI server over WebSocket, and start the StreamAPI server.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| timeout | `any` |  number of times to attempt ABCI connection. |

**Returns:** `Promise`<`void`>

___
<a id="subscribetoparadigmcoreevent"></a>

### `<Private>` subscribeToParadigmCoreEvent

▸ **subscribeToParadigmCoreEvent**(eventName: *`string`*, fullParam?: *`string`*): `void`

*Defined in api/stream/StreamServer-old.ts:532*

Subscribes to the "NewBlock" event over the ABCI server. The option to provide a `fullParam` allows subscriptions to arbitrary tags/events in the Tendermint chain.

*__todo__*: move subscribe options somewhere else

*__todo__*: define valid tm event (name param)

**Parameters:**

| Name | Type |
| ------ | ------ |
| eventName | `string` |
| `Optional` fullParam | `string` |

**Returns:** `void`

___

