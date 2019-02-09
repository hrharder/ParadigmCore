[ParadigmCore](../README.md) > ["src/api/stream/StreamServer"](../modules/_src_api_stream_streamserver_.md) > [StreamServer](../classes/_src_api_stream_streamserver_.streamserver.md)

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
* [connections](_src_api_stream_streamserver_.streamserver.md#connections)
* [host](_src_api_stream_streamserver_.streamserver.md#host)
* [latestAbciData](_src_api_stream_streamserver_.streamserver.md#latestabcidata)
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
* [connectAbci](_src_api_stream_streamserver_.streamserver.md#connectabci)
* [decodeTxArr](_src_api_stream_streamserver_.streamserver.md#decodetxarr)
* [fatalCloseHandlerWrapper](_src_api_stream_streamserver_.streamserver.md#fatalclosehandlerwrapper)
* [getAbciReadyState](_src_api_stream_streamserver_.streamserver.md#getabcireadystate)
* [getUnixTimeFromISO](_src_api_stream_streamserver_.streamserver.md#getunixtimefromiso)
* [handleClientMessageWrapper](_src_api_stream_streamserver_.streamserver.md#handleclientmessagewrapper)
* [handleNewABCIMessage](_src_api_stream_streamserver_.streamserver.md#handlenewabcimessage)
* [handleNewSession](_src_api_stream_streamserver_.streamserver.md#handlenewsession)
* [newBlockHandler](_src_api_stream_streamserver_.streamserver.md#newblockhandler)
* [newConnHandlerWrapper](_src_api_stream_streamserver_.streamserver.md#newconnhandlerwrapper)
* [sendMessageToClient](_src_api_stream_streamserver_.streamserver.md#sendmessagetoclient)
* [setupServer](_src_api_stream_streamserver_.streamserver.md#setupserver)
* [start](_src_api_stream_streamserver_.streamserver.md#start)
* [subscribeToParadigmCoreEvent](_src_api_stream_streamserver_.streamserver.md#subscribetoparadigmcoreevent)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new StreamServer**(options: *`StreamServerOptions`*): [StreamServer](_src_api_stream_streamserver_.streamserver.md)

*Defined in [src/api/stream/StreamServer.ts:103](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/api/stream/StreamServer.ts#L103)*

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

*Defined in [src/api/stream/StreamServer.ts:59](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/api/stream/StreamServer.ts#L59)*

Client connection to the Tendermint ABCI server.

___
<a id="abcisessionid"></a>

### `<Private>` abciSessionId

**● abciSessionId**: *`string`*

*Defined in [src/api/stream/StreamServer.ts:62](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/api/stream/StreamServer.ts#L62)*

Session ID string for ABCI WebSocket connection.

___
<a id="abciurl"></a>

### `<Private>` abciURL

**● abciURL**: *`URL`*

*Defined in [src/api/stream/StreamServer.ts:65](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/api/stream/StreamServer.ts#L65)*

ABCI server URI/L (supplied during construction).

___
<a id="clients"></a>

### `<Private>` clients

**● clients**: *`ClientMap`*

*Defined in [src/api/stream/StreamServer.ts:96](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/api/stream/StreamServer.ts#L96)*

Client tracking object.

___
<a id="connections"></a>

### `<Private>` connections

**● connections**: *`ConnectionMap`*

*Defined in [src/api/stream/StreamServer.ts:98](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/api/stream/StreamServer.ts#L98)*

___
<a id="host"></a>

### `<Private>` host

**● host**: *`string`*

*Defined in [src/api/stream/StreamServer.ts:93](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/api/stream/StreamServer.ts#L93)*

Host to bind StreamServer to, defaults to 'localhost'

___
<a id="latestabcidata"></a>

### `<Private>` latestAbciData

**● latestAbciData**: *`any`*

*Defined in [src/api/stream/StreamServer.ts:73](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/api/stream/StreamServer.ts#L73)*

The latest data from the ABCI server, updated each time a new block is committed.

*__todo__*: create interface def.

___
<a id="newblockemitter"></a>

### `<Private>` newBlockEmitter

**● newBlockEmitter**: *`EventEmitter`*

*Defined in [src/api/stream/StreamServer.ts:103](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/api/stream/StreamServer.ts#L103)*

EventEmitter to track new block messages from ABCI connection.

___
<a id="port"></a>

### `<Private>` port

**● port**: *`number`*

*Defined in [src/api/stream/StreamServer.ts:90](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/api/stream/StreamServer.ts#L90)*

Port to serve StreamAPI on.

___
<a id="retrycounter"></a>

### `<Private>` retryCounter

**● retryCounter**: *`number`*

*Defined in [src/api/stream/StreamServer.ts:79](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/api/stream/StreamServer.ts#L79)*

Counts the number of attempts made during re-connection.

___
<a id="retryinterval"></a>

### `<Private>` retryInterval

**● retryInterval**: *`number`*

*Defined in [src/api/stream/StreamServer.ts:82](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/api/stream/StreamServer.ts#L82)*

Interval (in ms) between ABCI reconnect attempts.

___
<a id="retrytimeout"></a>

### `<Private>` retryTimeout

**● retryTimeout**: *`number`*

*Defined in [src/api/stream/StreamServer.ts:76](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/api/stream/StreamServer.ts#L76)*

Number of times to try to reconnect to ABCI upon closure.

___
<a id="server"></a>

### `<Private>` server

**● server**: *`Server`*

*Defined in [src/api/stream/StreamServer.ts:87](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/api/stream/StreamServer.ts#L87)*

WebSocket server instance.

___
<a id="api"></a>

### `<Static>` api

**● api**: *`IStreamAPI`* =  api

*Defined in [src/api/stream/StreamServer.ts:54](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/api/stream/StreamServer.ts#L54)*

StreamAPI request/method definitions.

___

## Methods

<a id="attachhandlersabci"></a>

### `<Private>` attachHandlersABCI

▸ **attachHandlersABCI**(timeout?: *`number`*): `void`

*Defined in [src/api/stream/StreamServer.ts:355](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/api/stream/StreamServer.ts#L355)*

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

*Defined in [src/api/stream/StreamServer.ts:325](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/api/stream/StreamServer.ts#L325)*

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

*Defined in [src/api/stream/StreamServer.ts:402](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/api/stream/StreamServer.ts#L402)*

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

*Defined in [src/api/stream/StreamServer.ts:293](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/api/stream/StreamServer.ts#L293)*

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

*Defined in [src/api/stream/StreamServer.ts:455](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/api/stream/StreamServer.ts#L455)*

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

*Defined in [src/api/stream/StreamServer.ts:380](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/api/stream/StreamServer.ts#L380)*

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

*Defined in [src/api/stream/StreamServer.ts:552](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/api/stream/StreamServer.ts#L552)*

Returns the connection state of the ABCI WebSocket connection.

**Returns:** `number`

___
<a id="getunixtimefromiso"></a>

### `<Private>` getUnixTimeFromISO

▸ **getUnixTimeFromISO**(isoDate: *`string`*): `string`

*Defined in [src/api/stream/StreamServer.ts:445](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/api/stream/StreamServer.ts#L445)*

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

*Defined in [src/api/stream/StreamServer.ts:198](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/api/stream/StreamServer.ts#L198)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| ssID | `string` |

**Returns:** `function`

___
<a id="handlenewabcimessage"></a>

### `<Private>` handleNewABCIMessage

▸ **handleNewABCIMessage**(data: *`string`*): `void`

*Defined in [src/api/stream/StreamServer.ts:411](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/api/stream/StreamServer.ts#L411)*

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

*Defined in [src/api/stream/StreamServer.ts:248](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/api/stream/StreamServer.ts#L248)*

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

*Defined in [src/api/stream/StreamServer.ts:484](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/api/stream/StreamServer.ts#L484)*

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

*Defined in [src/api/stream/StreamServer.ts:177](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/api/stream/StreamServer.ts#L177)*

Returns a function to be used as the new connection handler.

Exists as a wrapper to carry over 'this' into handler scope.

**Returns:** `function`

___
<a id="sendmessagetoclient"></a>

### `<Private>` sendMessageToClient

▸ **sendMessageToClient**(ssID: *`string`*, res: *`Response`*): `void`

*Defined in [src/api/stream/StreamServer.ts:279](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/api/stream/StreamServer.ts#L279)*

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

*Defined in [src/api/stream/StreamServer.ts:167](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/api/stream/StreamServer.ts#L167)*

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

*Defined in [src/api/stream/StreamServer.ts:140](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/api/stream/StreamServer.ts#L140)*

Start StreamServer; connect to the ABCI server over WebSocket, and start the StreamAPI server.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| timeout | `any` |  number of times to attempt ABCI connection. |

**Returns:** `Promise`<`void`>

___
<a id="subscribetoparadigmcoreevent"></a>

### `<Private>` subscribeToParadigmCoreEvent

▸ **subscribeToParadigmCoreEvent**(name: *`string`*): `void`

*Defined in [src/api/stream/StreamServer.ts:516](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/api/stream/StreamServer.ts#L516)*

Subscribes to the "NewBlock" event over the ABCI server.

*__todo__*: move subscribe options somewhere else

*__todo__*: define valid tm event (name param)

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| name | `string` |  the name of the tendermint ABCI event to subscribe to |

**Returns:** `void`

___

