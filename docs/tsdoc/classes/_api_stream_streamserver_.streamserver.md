[ParadigmCore](../README.md) > ["api/stream/StreamServer"](../modules/_api_stream_streamserver_.md) > [StreamServer](../classes/_api_stream_streamserver_.streamserver.md)

# Class: StreamServer

The `StreamServer` class is a TypeScript implementation of the StreamAPI, intended to be used with JSONRPC(2.0)/WebSocket.

Certain endpoints may be implemented with an HTTP server to support JSONRPC(2.0)/POST for things like submitting an order transaction via RPC.

## Hierarchy

 `EventEmitter`

**↳ StreamServer**

## Index

### Constructors

* [constructor](_api_stream_streamserver_.streamserver.md#constructor)

### Properties

* [connectionMap](_api_stream_streamserver_.streamserver.md#connectionmap)
* [latestBlockData](_api_stream_streamserver_.streamserver.md#latestblockdata)
* [methods](_api_stream_streamserver_.streamserver.md#methods)
* [retryInterval](_api_stream_streamserver_.streamserver.md#retryinterval)
* [retryMax](_api_stream_streamserver_.streamserver.md#retrymax)
* [rpcClient](_api_stream_streamserver_.streamserver.md#rpcclient)
* [secret](_api_stream_streamserver_.streamserver.md#secret)
* [server](_api_stream_streamserver_.streamserver.md#server)
* [started](_api_stream_streamserver_.streamserver.md#started)
* [streamHost](_api_stream_streamserver_.streamserver.md#streamhost)
* [streamPort](_api_stream_streamserver_.streamserver.md#streamport)
* [subscriptions](_api_stream_streamserver_.streamserver.md#subscriptions)
* [defaultMaxListeners](_api_stream_streamserver_.streamserver.md#defaultmaxlisteners)

### Methods

* [addListener](_api_stream_streamserver_.streamserver.md#addlistener)
* [bind](_api_stream_streamserver_.streamserver.md#bind)
* [bindMethods](_api_stream_streamserver_.streamserver.md#bindmethods)
* [createConnCloseHandler](_api_stream_streamserver_.streamserver.md#createconnclosehandler)
* [createConnErrorHandler](_api_stream_streamserver_.streamserver.md#createconnerrorhandler)
* [createConnMessageHandler](_api_stream_streamserver_.streamserver.md#createconnmessagehandler)
* [createConnOpenHandler](_api_stream_streamserver_.streamserver.md#createconnopenhandler)
* [createConnectionHandler](_api_stream_streamserver_.streamserver.md#createconnectionhandler)
* [createErrorHandler](_api_stream_streamserver_.streamserver.md#createerrorhandler)
* [createNewBlockHandler](_api_stream_streamserver_.streamserver.md#createnewblockhandler)
* [createTendermintHandler](_api_stream_streamserver_.streamserver.md#createtenderminthandler)
* [emit](_api_stream_streamserver_.streamserver.md#emit)
* [eventNames](_api_stream_streamserver_.streamserver.md#eventnames)
* [getMaxListeners](_api_stream_streamserver_.streamserver.md#getmaxlisteners)
* [listenerCount](_api_stream_streamserver_.streamserver.md#listenercount)
* [listeners](_api_stream_streamserver_.streamserver.md#listeners)
* [off](_api_stream_streamserver_.streamserver.md#off)
* [on](_api_stream_streamserver_.streamserver.md#on)
* [once](_api_stream_streamserver_.streamserver.md#once)
* [prependListener](_api_stream_streamserver_.streamserver.md#prependlistener)
* [prependOnceListener](_api_stream_streamserver_.streamserver.md#prependoncelistener)
* [rawListeners](_api_stream_streamserver_.streamserver.md#rawlisteners)
* [removeAllListeners](_api_stream_streamserver_.streamserver.md#removealllisteners)
* [removeListener](_api_stream_streamserver_.streamserver.md#removelistener)
* [sendMessageToClient](_api_stream_streamserver_.streamserver.md#sendmessagetoclient)
* [setMaxListeners](_api_stream_streamserver_.streamserver.md#setmaxlisteners)
* [setupServer](_api_stream_streamserver_.streamserver.md#setupserver)
* [start](_api_stream_streamserver_.streamserver.md#start)
* [generate32RandomBytes](_api_stream_streamserver_.streamserver.md#generate32randombytes)
* [generateConnectionId](_api_stream_streamserver_.streamserver.md#generateconnectionid)
* [generateEventId](_api_stream_streamserver_.streamserver.md#generateeventid)
* [listenerCount](_api_stream_streamserver_.streamserver.md#listenercount-1)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new StreamServer**(options?: *[IOptions](../interfaces/_api_stream_streamserver_.ioptions.md)*): [StreamServer](_api_stream_streamserver_.streamserver.md)

*Defined in [api/stream/StreamServer.ts:324](https://github.com/paradigmfoundation/paradigmcore/blob/6bbcaa8/src/api/stream/StreamServer.ts#L324)*

Create a new `StreamServer` instance.

*__description__*: more docs coming soon.

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `Default value` options | [IOptions](../interfaces/_api_stream_streamserver_.ioptions.md) |  {} |  see [IOptions](../interfaces/_api_stream_streamserver_.ioptions.md) interface definition |

**Returns:** [StreamServer](_api_stream_streamserver_.streamserver.md)

___

## Properties

<a id="connectionmap"></a>

### `<Private>` connectionMap

**● connectionMap**: *[IConnectionMap](../interfaces/_api_stream_streamserver_.iconnectionmap.md)*

*Defined in [api/stream/StreamServer.ts:316](https://github.com/paradigmfoundation/paradigmcore/blob/6bbcaa8/src/api/stream/StreamServer.ts#L316)*

Mapping of active `connectionId` strings to connection objects

*__description__*: Used to quickly find a connection object pointer (to an instance of\[\[WebSocket\]\]), used to send messages, etc.

___
<a id="latestblockdata"></a>

### `<Private>` latestBlockData

**● latestBlockData**: *[IBlockData](../interfaces/_api_stream_streamserver_.iblockdata.md)*

*Defined in [api/stream/StreamServer.ts:248](https://github.com/paradigmfoundation/paradigmcore/blob/6bbcaa8/src/api/stream/StreamServer.ts#L248)*

Data for the latest Tendermint block.

*__description__*: The most recent (parsed) block-data from the Tendermint RPC server, not including transactions.

___
<a id="methods"></a>

### `<Private>` methods

**● methods**: *[IMethods](../interfaces/_api_stream_streamserver_.imethods.md)*

*Defined in [api/stream/StreamServer.ts:231](https://github.com/paradigmfoundation/paradigmcore/blob/6bbcaa8/src/api/stream/StreamServer.ts#L231)*

Mapping of method handler functions.

___
<a id="retryinterval"></a>

### `<Private>` retryInterval

**● retryInterval**: *`number`*

*Defined in [api/stream/StreamServer.ts:264](https://github.com/paradigmfoundation/paradigmcore/blob/6bbcaa8/src/api/stream/StreamServer.ts#L264)*

Interval (in ms) between retry attempts

*__description__*: The millisecond interval between attempts to reconnect to the Tendermint RPC server. Used by the [TendermintRPC](_common_tendermintrpc_.tendermintrpc.md) class.

___
<a id="retrymax"></a>

### `<Private>` retryMax

**● retryMax**: *`number`*

*Defined in [api/stream/StreamServer.ts:256](https://github.com/paradigmfoundation/paradigmcore/blob/6bbcaa8/src/api/stream/StreamServer.ts#L256)*

Number of times to attempt RPC connection.

*__description__*: Used to facilitate reestablishment of WebSocket connection upon error or unexpected closure.

___
<a id="rpcclient"></a>

### `<Private>` rpcClient

**● rpcClient**: *[TendermintRPC](_common_tendermintrpc_.tendermintrpc.md)*

*Defined in [api/stream/StreamServer.ts:240](https://github.com/paradigmfoundation/paradigmcore/blob/6bbcaa8/src/api/stream/StreamServer.ts#L240)*

Tendermint RPC client instance.

*__description__*: Instance of `TendermintRPC`, the custom wrapper used to interact with Tendermint and the ParadigmCore chain via the local Tendermint RPC server. See [TendermintRPC](_common_tendermintrpc_.tendermintrpc.md) documentation for more info.

___
<a id="secret"></a>

### `<Private>` secret

**● secret**: *`Buffer`*

*Defined in [api/stream/StreamServer.ts:226](https://github.com/paradigmfoundation/paradigmcore/blob/6bbcaa8/src/api/stream/StreamServer.ts#L226)*

Server secret bytes

A pseudo-random 32 byte `Buffer` used (along with the UNIX time) as salt when hashing client-provided `request.id` strings. Should not be shared with the client (as a precaution).

___
<a id="server"></a>

### `<Private>` server

**● server**: *`Server`*

*Defined in [api/stream/StreamServer.ts:287](https://github.com/paradigmfoundation/paradigmcore/blob/6bbcaa8/src/api/stream/StreamServer.ts#L287)*

StreamAPI WebSocket server instance

*__description__*: The actual `ws.Server` instance used to handle requests. Not to be confused with the `StreamServer` class, which is the actual implementation of the JSONRPC spec for transport over WebSocket.

___
<a id="started"></a>

### `<Private>` started

**● started**: *`boolean`*

*Defined in [api/stream/StreamServer.ts:324](https://github.com/paradigmfoundation/paradigmcore/blob/6bbcaa8/src/api/stream/StreamServer.ts#L324)*

Server status

*__description__*: Only true if `StreamServer.prototype.start()` has executed and the promise has resolved/not been rejected.

___
<a id="streamhost"></a>

### `<Private>` streamHost

**● streamHost**: *`string`*

*Defined in [api/stream/StreamServer.ts:278](https://github.com/paradigmfoundation/paradigmcore/blob/6bbcaa8/src/api/stream/StreamServer.ts#L278)*

Stream host

*__description__*: The network host to bind the StreamAPI server to.

___
<a id="streamport"></a>

### `<Private>` streamPort

**● streamPort**: *`number`*

*Defined in [api/stream/StreamServer.ts:271](https://github.com/paradigmfoundation/paradigmcore/blob/6bbcaa8/src/api/stream/StreamServer.ts#L271)*

StreamAPI port

*__description__*: The port to expose the StreamAPI WebSocket server on.

___
<a id="subscriptions"></a>

### `<Private>` subscriptions

**● subscriptions**: *[ISubscription](../interfaces/_api_stream_streamserver_.isubscription.md)[]*

*Defined in [api/stream/StreamServer.ts:308](https://github.com/paradigmfoundation/paradigmcore/blob/6bbcaa8/src/api/stream/StreamServer.ts#L308)*

Array of subscription objects

*__description__*: Master array of active subscriptions, where each entry has a `subscription.connectionId` which is the the utf8 hex-string of the first 8 bytes of the hash of the client-provided `request.id` concatenated with the fist 16 bytes of a random byte array (which includes a time-hash). The `connectionId` maps to an actual WebSocket connection object, and should be kept private from clients;

The `subscription.eventId` (used to track individual event subscriptions) is the first 16 bytes of the SHA256 hash of connectionId , as a hex encoded string.

```ts
connectionId = StreamServer.generateSecretBytes();
eventId = StreamServer.genEventIdFromConnId(connectionId);
```

___
<a id="defaultmaxlisteners"></a>

### `<Static>` defaultMaxListeners

**● defaultMaxListeners**: *`number`*

*Inherited from EventEmitter.defaultMaxListeners*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/@types/node/index.d.ts:1110*

___

## Methods

<a id="addlistener"></a>

###  addListener

▸ **addListener**(event: *`string` \| `symbol`*, listener: *`function`*): `this`

*Inherited from EventEmitter.addListener*

*Overrides EventEmitter.addListener*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/@types/node/index.d.ts:1112*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` \| `symbol` |
| listener | `function` |

**Returns:** `this`

___
<a id="bind"></a>

###  bind

▸ **bind**(methodName: *`string`*, method: *`function`*): `void`

*Defined in [api/stream/StreamServer.ts:400](https://github.com/paradigmfoundation/paradigmcore/blob/6bbcaa8/src/api/stream/StreamServer.ts#L400)*

Bind a method to the StreamServer.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| methodName | `string` |  the name of the method to bind to |
| method | `function` |  the function object of the method implementation, using the correct call signature |

**Returns:** `void`

___
<a id="bindmethods"></a>

### `<Private>` bindMethods

▸ **bindMethods**(methods: *[IMethods](../interfaces/_api_stream_streamserver_.imethods.md)*): `void`

*Defined in [api/stream/StreamServer.ts:419](https://github.com/paradigmfoundation/paradigmcore/blob/6bbcaa8/src/api/stream/StreamServer.ts#L419)*

Bind an object of pre-defined methods to the server.

Used to optionally bind an object with pre-defined methods supplied to the StreamServer's constructor.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| methods | [IMethods](../interfaces/_api_stream_streamserver_.imethods.md) |  a user-provided object with pre-defined method implementations |

**Returns:** `void`

___
<a id="createconnclosehandler"></a>

### `<Private>` createConnCloseHandler

▸ **createConnCloseHandler**(connId: *`string`*): `function`

*Defined in [api/stream/StreamServer.ts:544](https://github.com/paradigmfoundation/paradigmcore/blob/6bbcaa8/src/api/stream/StreamServer.ts#L544)*

Create an close event handler.

This wrapper method builds a function to handle "close" events from the connected clients. Currently, it will remove the client-tracking object for the connection the disconnect event is received over.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| connId | `string` |  the server-side id string used to identify the connection |

**Returns:** `function`

___
<a id="createconnerrorhandler"></a>

### `<Private>` createConnErrorHandler

▸ **createConnErrorHandler**(connId: *`string`*): `function`

*Defined in [api/stream/StreamServer.ts:577](https://github.com/paradigmfoundation/paradigmcore/blob/6bbcaa8/src/api/stream/StreamServer.ts#L577)*

Create a client error handler.

This wrapper function creates an error-handler function that handles any internal server errors that occur during the client<>server connection, or processing of client requests.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| connId | `string` |  the unique server-side id string used to identify the connection |

**Returns:** `function`

___
<a id="createconnmessagehandler"></a>

### `<Private>` createConnMessageHandler

▸ **createConnMessageHandler**(connId: *`string`*): `function`

*Defined in [api/stream/StreamServer.ts:618](https://github.com/paradigmfoundation/paradigmcore/blob/6bbcaa8/src/api/stream/StreamServer.ts#L618)*

Build a message handler function for a client.

This method builds a function to handle incoming messages (requests) from connected clients. It is used to delegate the processing of requests via bound method definitions, that are attached with the `bind` method, or passed into the constructor.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| connId | `string` |  the connectionId of the client the handler is for |

**Returns:** `function`

___
<a id="createconnopenhandler"></a>

### `<Private>` createConnOpenHandler

▸ **createConnOpenHandler**(connId: *`string`*): `function`

*Defined in [api/stream/StreamServer.ts:561](https://github.com/paradigmfoundation/paradigmcore/blob/6bbcaa8/src/api/stream/StreamServer.ts#L561)*

Create an open event handler.

This wrapper method builds a function to handle "open" events from the connected clients. Currently it is just used to log new connections, but in the future may handle additional processing of new connections.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| connId | `string` |  the server-side id string used to identify the connection |

**Returns:** `function`

___
<a id="createconnectionhandler"></a>

### `<Private>` createConnectionHandler

▸ **createConnectionHandler**(): `function`

*Defined in [api/stream/StreamServer.ts:509](https://github.com/paradigmfoundation/paradigmcore/blob/6bbcaa8/src/api/stream/StreamServer.ts#L509)*

Create a server connection handler.

This method is used to create a handler function for connected clients. It establishes the correct handler functions for connection events, and binds method definitions to the connection object to handle JSONRPC requests.

*__todo__*: document better

**Returns:** `function`

___
<a id="createerrorhandler"></a>

### `<Private>` createErrorHandler

▸ **createErrorHandler**(): `function`

*Defined in [api/stream/StreamServer.ts:487](https://github.com/paradigmfoundation/paradigmcore/blob/6bbcaa8/src/api/stream/StreamServer.ts#L487)*

Creates an error handler for server errors.

A generic method used to create an async (event) error handler. Currently only used to handler server (not client<>server) errors, but in the future may also handle additional errors.

**Returns:** `function`

___
<a id="createnewblockhandler"></a>

### `<Private>` createNewBlockHandler

▸ **createNewBlockHandler**(): `function`

*Defined in [api/stream/StreamServer.ts:449](https://github.com/paradigmfoundation/paradigmcore/blob/6bbcaa8/src/api/stream/StreamServer.ts#L449)*

Creates a handler function for Tendermint `NewBlock` events.

Currently used to update the in-memory tracking of the current Tendermint blockchain height. In the future may be used to pull additional block data to be stored in-memory.

**Returns:** `function`

___
<a id="createtenderminthandler"></a>

### `<Private>` createTendermintHandler

▸ **createTendermintHandler**(): `function`

*Defined in [api/stream/StreamServer.ts:432](https://github.com/paradigmfoundation/paradigmcore/blob/6bbcaa8/src/api/stream/StreamServer.ts#L432)*

Creates a handler function for the TendermintRPC connection.

Currently only subscribes to the Tendermint `NewBlock` event, but in the future may be used to subscribe to additional tags and blockchain events, used to notify clients an update the server's state.

**Returns:** `function`

___
<a id="emit"></a>

###  emit

▸ **emit**(event: *`string` \| `symbol`*, ...args: *`any`[]*): `boolean`

*Inherited from EventEmitter.emit*

*Overrides EventEmitter.emit*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/@types/node/index.d.ts:1124*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` \| `symbol` |
| `Rest` args | `any`[] |

**Returns:** `boolean`

___
<a id="eventnames"></a>

###  eventNames

▸ **eventNames**(): `Array`<`string` \| `symbol`>

*Inherited from EventEmitter.eventNames*

*Overrides EventEmitter.eventNames*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/@types/node/index.d.ts:1125*

**Returns:** `Array`<`string` \| `symbol`>

___
<a id="getmaxlisteners"></a>

###  getMaxListeners

▸ **getMaxListeners**(): `number`

*Inherited from EventEmitter.getMaxListeners*

*Overrides EventEmitter.getMaxListeners*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/@types/node/index.d.ts:1121*

**Returns:** `number`

___
<a id="listenercount"></a>

###  listenerCount

▸ **listenerCount**(type: *`string` \| `symbol`*): `number`

*Inherited from EventEmitter.listenerCount*

*Overrides EventEmitter.listenerCount*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/@types/node/index.d.ts:1126*

**Parameters:**

| Name | Type |
| ------ | ------ |
| type | `string` \| `symbol` |

**Returns:** `number`

___
<a id="listeners"></a>

###  listeners

▸ **listeners**(event: *`string` \| `symbol`*): `Function`[]

*Inherited from EventEmitter.listeners*

*Overrides EventEmitter.listeners*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/@types/node/index.d.ts:1122*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` \| `symbol` |

**Returns:** `Function`[]

___
<a id="off"></a>

###  off

▸ **off**(event: *`string` \| `symbol`*, listener: *`function`*): `this`

*Inherited from EventEmitter.off*

*Overrides EventEmitter.off*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/@types/node/index.d.ts:1118*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` \| `symbol` |
| listener | `function` |

**Returns:** `this`

___
<a id="on"></a>

###  on

▸ **on**(event: *`string` \| `symbol`*, listener: *`function`*): `this`

*Inherited from EventEmitter.on*

*Overrides EventEmitter.on*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/@types/node/index.d.ts:1113*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` \| `symbol` |
| listener | `function` |

**Returns:** `this`

___
<a id="once"></a>

###  once

▸ **once**(event: *`string` \| `symbol`*, listener: *`function`*): `this`

*Inherited from EventEmitter.once*

*Overrides EventEmitter.once*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/@types/node/index.d.ts:1114*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` \| `symbol` |
| listener | `function` |

**Returns:** `this`

___
<a id="prependlistener"></a>

###  prependListener

▸ **prependListener**(event: *`string` \| `symbol`*, listener: *`function`*): `this`

*Inherited from EventEmitter.prependListener*

*Overrides EventEmitter.prependListener*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/@types/node/index.d.ts:1115*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` \| `symbol` |
| listener | `function` |

**Returns:** `this`

___
<a id="prependoncelistener"></a>

###  prependOnceListener

▸ **prependOnceListener**(event: *`string` \| `symbol`*, listener: *`function`*): `this`

*Inherited from EventEmitter.prependOnceListener*

*Overrides EventEmitter.prependOnceListener*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/@types/node/index.d.ts:1116*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` \| `symbol` |
| listener | `function` |

**Returns:** `this`

___
<a id="rawlisteners"></a>

###  rawListeners

▸ **rawListeners**(event: *`string` \| `symbol`*): `Function`[]

*Inherited from EventEmitter.rawListeners*

*Overrides EventEmitter.rawListeners*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/@types/node/index.d.ts:1123*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` \| `symbol` |

**Returns:** `Function`[]

___
<a id="removealllisteners"></a>

###  removeAllListeners

▸ **removeAllListeners**(event?: *`string` \| `symbol`*): `this`

*Inherited from EventEmitter.removeAllListeners*

*Overrides EventEmitter.removeAllListeners*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/@types/node/index.d.ts:1119*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` event | `string` \| `symbol` |

**Returns:** `this`

___
<a id="removelistener"></a>

###  removeListener

▸ **removeListener**(event: *`string` \| `symbol`*, listener: *`function`*): `this`

*Inherited from EventEmitter.removeListener*

*Overrides EventEmitter.removeListener*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/@types/node/index.d.ts:1117*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` \| `symbol` |
| listener | `function` |

**Returns:** `this`

___
<a id="sendmessagetoclient"></a>

### `<Private>` sendMessageToClient

▸ **sendMessageToClient**(id: *`string`*, res: *`Res`*): `void`

*Defined in [api/stream/StreamServer.ts:599](https://github.com/paradigmfoundation/paradigmcore/blob/6bbcaa8/src/api/stream/StreamServer.ts#L599)*

Send a message to a connected client+

*__description__*: Send a JSON response to a client identified by server-side connectionId string.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| id | `string` |  the server-side client ID string |
| res | `Res` |  a JsonResponse object |

**Returns:** `void`

___
<a id="setmaxlisteners"></a>

###  setMaxListeners

▸ **setMaxListeners**(n: *`number`*): `this`

*Inherited from EventEmitter.setMaxListeners*

*Overrides EventEmitter.setMaxListeners*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/@types/node/index.d.ts:1120*

**Parameters:**

| Name | Type |
| ------ | ------ |
| n | `number` |

**Returns:** `this`

___
<a id="setupserver"></a>

### `<Private>` setupServer

▸ **setupServer**(host: *`string`*, port: *`number`*): `void`

*Defined in [api/stream/StreamServer.ts:467](https://github.com/paradigmfoundation/paradigmcore/blob/6bbcaa8/src/api/stream/StreamServer.ts#L467)*

Setup the StreamAPI WebSocket server

*__description__*: Configure and start the StreamAPI JSONRPC(2.0) WebSocket server, on the provided host and port.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| host | `string` |  network host to bind server to |
| port | `number` |  network port to bind server to |

**Returns:** `void`

___
<a id="start"></a>

###  start

▸ **start**(): `Promise`<`void`>

*Defined in [api/stream/StreamServer.ts:382](https://github.com/paradigmfoundation/paradigmcore/blob/6bbcaa8/src/api/stream/StreamServer.ts#L382)*

Start the StreamAPI server.

An async function that binds the WebSocket server, and connects to the local TendermintRPC instance.

**Returns:** `Promise`<`void`>

___
<a id="generate32randombytes"></a>

### `<Static>``<Private>` generate32RandomBytes

▸ **generate32RandomBytes**(start?: *`number`*): `Buffer`

*Defined in [api/stream/StreamServer.ts:145](https://github.com/paradigmfoundation/paradigmcore/blob/6bbcaa8/src/api/stream/StreamServer.ts#L145)*

Generate a pseudo-random byte array

*__description__*: This static method returns a pseudo-random 32 byte SHA256 hash used for various security mechanisms within the class. Generated by concatenating 16 random bytes from memory, plus the raw bytes of the string characters that represent the current unix timestamp (in ms), and digesting the 32 byte SHA256 hash of the result.

Highly non-deterministic; each call will produce different output.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| `Optional` start | `number` |  if provided, indicates from which byte (0-indexed) to slice |

**Returns:** `Buffer`

___
<a id="generateconnectionid"></a>

### `<Static>``<Private>` generateConnectionId

▸ **generateConnectionId**(secret: *`Buffer`*, salt: *`Buffer`*): `string`

*Defined in [api/stream/StreamServer.ts:206](https://github.com/paradigmfoundation/paradigmcore/blob/6bbcaa8/src/api/stream/StreamServer.ts#L206)*

Generate secret `connectionId`

*__description__*: Every connected client has a secret `connectionId` generated from the server's `secret` and some salt. The `connectionId` string is a hex-string of the hash of the server's `secret` salted with an arbitrary number of "random" bytes.

Assume to be deterministic (given same input/salt).

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| secret | `Buffer` |  the server's \`secret\` 32 bytes |
| salt | `Buffer` |  an arbitrary number of random-ish bytes to be used as salt |

**Returns:** `string`

___
<a id="generateeventid"></a>

### `<Static>``<Private>` generateEventId

▸ **generateEventId**(connectionId: *`string`*, salt: *`Buffer`*): `string`

*Defined in [api/stream/StreamServer.ts:179](https://github.com/paradigmfoundation/paradigmcore/blob/6bbcaa8/src/api/stream/StreamServer.ts#L179)*

Generate client-safe `eventId` from secret connectionId

*__description__*: The `subscription.eventId` (used to track individual event subscriptions) is the first 16 bytes of the SHA256 hash of connectionId, with 16 bytes of salt, as a hex encoded string.

Assume to be deterministic (given same input/salt).

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| connectionId | `string` |  a 32 byte |
| salt | `Buffer` |

**Returns:** `string`

___
<a id="listenercount-1"></a>

### `<Static>` listenerCount

▸ **listenerCount**(emitter: *`EventEmitter`*, event: *`string` \| `symbol`*): `number`

*Inherited from EventEmitter.listenerCount*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/@types/node/index.d.ts:1109*

*__deprecated__*: since v4.0.0

**Parameters:**

| Name | Type |
| ------ | ------ |
| emitter | `EventEmitter` |
| event | `string` \| `symbol` |

**Returns:** `number`

___

