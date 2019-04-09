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
* [signer](_api_stream_streamserver_.streamserver.md#signer)
* [started](_api_stream_streamserver_.streamserver.md#started)
* [streamHost](_api_stream_streamserver_.streamserver.md#streamhost)
* [streamPort](_api_stream_streamserver_.streamserver.md#streamport)
* [subscriptions](_api_stream_streamserver_.streamserver.md#subscriptions)
* [defaultMaxListeners](_api_stream_streamserver_.streamserver.md#defaultmaxlisteners)

### Methods

* [addListener](_api_stream_streamserver_.streamserver.md#addlistener)
* [addSubscription](_api_stream_streamserver_.streamserver.md#addsubscription)
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
* [executeTendermintQuery](_api_stream_streamserver_.streamserver.md#executetendermintquery)
* [getLatestHeight](_api_stream_streamserver_.streamserver.md#getlatestheight)
* [getMaxListeners](_api_stream_streamserver_.streamserver.md#getmaxlisteners)
* [handleBatchRequest](_api_stream_streamserver_.streamserver.md#handlebatchrequest)
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
* [removeSubscription](_api_stream_streamserver_.streamserver.md#removesubscription)
* [sendMessageToClient](_api_stream_streamserver_.streamserver.md#sendmessagetoclient)
* [sendMessageToConn](_api_stream_streamserver_.streamserver.md#sendmessagetoconn)
* [setMaxListeners](_api_stream_streamserver_.streamserver.md#setmaxlisteners)
* [setupServer](_api_stream_streamserver_.streamserver.md#setupserver)
* [start](_api_stream_streamserver_.streamserver.md#start)
* [submitTx](_api_stream_streamserver_.streamserver.md#submittx)
* [subscriptionTrigger](_api_stream_streamserver_.streamserver.md#subscriptiontrigger)
* [generate32RandomBytes](_api_stream_streamserver_.streamserver.md#generate32randombytes)
* [generateConnectionId](_api_stream_streamserver_.streamserver.md#generateconnectionid)
* [generateEventId](_api_stream_streamserver_.streamserver.md#generateeventid)
* [listenerCount](_api_stream_streamserver_.streamserver.md#listenercount-1)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new StreamServer**(options: *[IOptions](../interfaces/_api_stream_streamserver_.ioptions.md)*): [StreamServer](_api_stream_streamserver_.streamserver.md)

*Defined in [api/stream/StreamServer.ts:365](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/api/stream/StreamServer.ts#L365)*

Create a new `StreamServer` instance.

*__description__*: more docs coming soon.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| options | [IOptions](../interfaces/_api_stream_streamserver_.ioptions.md) |  see [IOptions](../interfaces/_api_stream_streamserver_.ioptions.md) interface definition |

**Returns:** [StreamServer](_api_stream_streamserver_.streamserver.md)

___

## Properties

<a id="connectionmap"></a>

### `<Private>` connectionMap

**● connectionMap**: *[IConnectionMap](../interfaces/_api_stream_streamserver_.iconnectionmap.md)*

*Defined in [api/stream/StreamServer.ts:357](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/api/stream/StreamServer.ts#L357)*

Mapping of active `connectionId` strings to connection objects

*__description__*: Used to quickly find a connection object pointer (to an instance of\[\[WebSocket\]\]), used to send messages, etc.

___
<a id="latestblockdata"></a>

### `<Private>` latestBlockData

**● latestBlockData**: *[IBlockData](../interfaces/_api_stream_streamserver_.iblockdata.md)*

*Defined in [api/stream/StreamServer.ts:290](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/api/stream/StreamServer.ts#L290)*

Data for the latest Tendermint block.

*__description__*: The most recent (parsed) block-data from the Tendermint RPC server, not including transactions.

___
<a id="methods"></a>

### `<Private>` methods

**● methods**: *[IMethods](../interfaces/_api_stream_streamserver_.imethods.md)*

*Defined in [api/stream/StreamServer.ts:268](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/api/stream/StreamServer.ts#L268)*

Mapping of method handler functions.

___
<a id="retryinterval"></a>

### `<Private>` retryInterval

**● retryInterval**: *`number`*

*Defined in [api/stream/StreamServer.ts:306](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/api/stream/StreamServer.ts#L306)*

Interval (in ms) between retry attempts

*__description__*: The millisecond interval between attempts to reconnect to the Tendermint RPC server. Used by the [TendermintRPC](_common_tendermintrpc_.tendermintrpc.md) class.

___
<a id="retrymax"></a>

### `<Private>` retryMax

**● retryMax**: *`number`*

*Defined in [api/stream/StreamServer.ts:298](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/api/stream/StreamServer.ts#L298)*

Number of times to attempt RPC connection.

*__description__*: Used to facilitate reestablishment of WebSocket connection upon error or unexpected closure.

___
<a id="rpcclient"></a>

### `<Private>` rpcClient

**● rpcClient**: *[TendermintRPC](_common_tendermintrpc_.tendermintrpc.md)*

*Defined in [api/stream/StreamServer.ts:282](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/api/stream/StreamServer.ts#L282)*

Tendermint RPC client instance.

*__description__*: Instance of `TendermintRPC`, the custom wrapper used to interact with Tendermint and the ParadigmCore chain via the local Tendermint RPC server. See [TendermintRPC](_common_tendermintrpc_.tendermintrpc.md) documentation for more info.

___
<a id="secret"></a>

### `<Private>` secret

**● secret**: *`Buffer`*

*Defined in [api/stream/StreamServer.ts:263](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/api/stream/StreamServer.ts#L263)*

Server secret bytes

A pseudo-random 32 byte `Buffer` used (along with the UNIX time) as salt when hashing client-provided `request.id` strings. Should not be shared with the client (as a precaution).

___
<a id="server"></a>

### `<Private>` server

**● server**: *`Server`*

*Defined in [api/stream/StreamServer.ts:329](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/api/stream/StreamServer.ts#L329)*

StreamAPI WebSocket server instance

*__description__*: The actual `ws.Server` instance used to handle requests. Not to be confused with the `StreamServer` class, which is the actual implementation of the JSONRPC spec for transport over WebSocket.

___
<a id="signer"></a>

### `<Private>` signer

**● signer**: *[TxGenerator](_core_util_txgenerator_.txgenerator.md)*

*Defined in [api/stream/StreamServer.ts:273](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/api/stream/StreamServer.ts#L273)*

Transaction generator/signer for validators running the JSONRPC server.

___
<a id="started"></a>

### `<Private>` started

**● started**: *`boolean`*

*Defined in [api/stream/StreamServer.ts:365](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/api/stream/StreamServer.ts#L365)*

Server status

*__description__*: Only true if `StreamServer.prototype.start()` has executed and the promise has resolved/not been rejected.

___
<a id="streamhost"></a>

### `<Private>` streamHost

**● streamHost**: *`string`*

*Defined in [api/stream/StreamServer.ts:320](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/api/stream/StreamServer.ts#L320)*

Stream host

*__description__*: The network host to bind the StreamAPI server to.

___
<a id="streamport"></a>

### `<Private>` streamPort

**● streamPort**: *`number`*

*Defined in [api/stream/StreamServer.ts:313](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/api/stream/StreamServer.ts#L313)*

StreamAPI port

*__description__*: The port to expose the StreamAPI WebSocket server on.

___
<a id="subscriptions"></a>

### `<Private>` subscriptions

**● subscriptions**: *[ISubscriptions](../interfaces/_api_stream_streamserver_.isubscriptions.md)*

*Defined in [api/stream/StreamServer.ts:349](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/api/stream/StreamServer.ts#L349)*

Mapping of subscription objects (by subscriptionId)

*__description__*: Master array of active subscriptions, where each entry has a `subscription.connectionId` which is the the utf8 hex-string of the first 8 bytes of the hash of the client-provided `request.id` concatenated with the fist 16 bytes of a random byte array (which includes a time-hash). The `connectionId` maps to an actual WebSocket connection object, and should be kept private from clients;

The `subscription.eventId` (used to track individual event subscriptions) is a random `uuid/v4` string.

```ts
connectionId = StreamServer.generateSecretBytes();
eventId = StreamServer.genEventIdFromConnId(connectionId);
```

___
<a id="defaultmaxlisteners"></a>

### `<Static>` defaultMaxListeners

**● defaultMaxListeners**: *`number`*

*Inherited from EventEmitter.defaultMaxListeners*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/@types/node/events.d.ts:8*

___

## Methods

<a id="addlistener"></a>

###  addListener

▸ **addListener**(event: *`string` \| `symbol`*, listener: *`function`*): `this`

*Inherited from EventEmitter.addListener*

*Overrides EventEmitter.addListener*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/@types/node/events.d.ts:10*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` \| `symbol` |
| listener | `function` |

**Returns:** `this`

___
<a id="addsubscription"></a>

###  addSubscription

▸ **addSubscription**(subscriptionId: *`string`*, clientId: *`string`*, connection: *`WebSocket`*, params: *`any`*): `void`

*Defined in [api/stream/StreamServer.ts:470](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/api/stream/StreamServer.ts#L470)*

(In progress)

This method is a public method to allow bound definitions to interact with the private `subscriptions` mapping.

**Parameters:**

| Name | Type |
| ------ | ------ |
| subscriptionId | `string` |
| clientId | `string` |
| connection | `WebSocket` |
| params | `any` |

**Returns:** `void`

___
<a id="bind"></a>

###  bind

▸ **bind**(methodName: *`string`*, method: *`function`*): `void`

*Defined in [api/stream/StreamServer.ts:457](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/api/stream/StreamServer.ts#L457)*

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

*Defined in [api/stream/StreamServer.ts:554](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/api/stream/StreamServer.ts#L554)*

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

*Defined in [api/stream/StreamServer.ts:746](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/api/stream/StreamServer.ts#L746)*

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

*Defined in [api/stream/StreamServer.ts:779](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/api/stream/StreamServer.ts#L779)*

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

*Defined in [api/stream/StreamServer.ts:835](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/api/stream/StreamServer.ts#L835)*

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

*Defined in [api/stream/StreamServer.ts:763](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/api/stream/StreamServer.ts#L763)*

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

*Defined in [api/stream/StreamServer.ts:711](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/api/stream/StreamServer.ts#L711)*

Create a server connection handler.

This method is used to create a handler function for connected clients. It establishes the correct handler functions for connection events, and binds method definitions to the connection object to handle JSONRPC requests.

*__todo__*: document better

**Returns:** `function`

___
<a id="createerrorhandler"></a>

### `<Private>` createErrorHandler

▸ **createErrorHandler**(): `function`

*Defined in [api/stream/StreamServer.ts:689](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/api/stream/StreamServer.ts#L689)*

Creates an error handler for server errors.

A generic method used to create an async (event) error handler. Currently only used to handler server (not client<>server) errors, but in the future may also handle additional errors.

**Returns:** `function`

___
<a id="createnewblockhandler"></a>

### `<Private>` createNewBlockHandler

▸ **createNewBlockHandler**(): `function`

*Defined in [api/stream/StreamServer.ts:629](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/api/stream/StreamServer.ts#L629)*

Creates a handler function for Tendermint `NewBlock` events.

Currently used to update the in-memory tracking of the current Tendermint blockchain height. In the future may be used to pull additional block data to be stored in-memory.

**Returns:** `function`

___
<a id="createtenderminthandler"></a>

### `<Private>` createTendermintHandler

▸ **createTendermintHandler**(): `function`

*Defined in [api/stream/StreamServer.ts:612](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/api/stream/StreamServer.ts#L612)*

Creates a handler function for the TendermintRPC connection.

Currently only subscribes to the Tendermint `NewBlock` event, but in the future may be used to subscribe to additional tags and blockchain events, used to notify clients an update the server's state.

**Returns:** `function`

___
<a id="emit"></a>

###  emit

▸ **emit**(event: *`string` \| `symbol`*, ...args: *`any`[]*): `boolean`

*Inherited from EventEmitter.emit*

*Overrides EventEmitter.emit*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/@types/node/events.d.ts:22*

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

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/@types/node/events.d.ts:23*

**Returns:** `Array`<`string` \| `symbol`>

___
<a id="executetendermintquery"></a>

###  executeTendermintQuery

▸ **executeTendermintQuery**(path: *`string`*): `Promise`<`any`>

*Defined in [api/stream/StreamServer.ts:519](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/api/stream/StreamServer.ts#L519)*

Public function to execute state query over a provided path.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| path | `string` |  the string path to be passed to the ABCI query method |

**Returns:** `Promise`<`any`>

___
<a id="getlatestheight"></a>

###  getLatestHeight

▸ **getLatestHeight**(): `number`

*Defined in [api/stream/StreamServer.ts:510](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/api/stream/StreamServer.ts#L510)*

Public function that returns latest known (most recent commit) block height.

**Returns:** `number`

___
<a id="getmaxlisteners"></a>

###  getMaxListeners

▸ **getMaxListeners**(): `number`

*Inherited from EventEmitter.getMaxListeners*

*Overrides EventEmitter.getMaxListeners*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/@types/node/events.d.ts:19*

**Returns:** `number`

___
<a id="handlebatchrequest"></a>

### `<Private>` handleBatchRequest

▸ **handleBatchRequest**(msg: *`WebSocket.Data`*, connId: *`string`*): `Promise`<`Res`[] \| `Res`>

*Defined in [api/stream/StreamServer.ts:881](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/api/stream/StreamServer.ts#L881)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| msg | `WebSocket.Data` |
| connId | `string` |

**Returns:** `Promise`<`Res`[] \| `Res`>

___
<a id="listenercount"></a>

###  listenerCount

▸ **listenerCount**(type: *`string` \| `symbol`*): `number`

*Inherited from EventEmitter.listenerCount*

*Overrides EventEmitter.listenerCount*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/@types/node/events.d.ts:24*

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

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/@types/node/events.d.ts:20*

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

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/@types/node/events.d.ts:16*

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

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/@types/node/events.d.ts:11*

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

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/@types/node/events.d.ts:12*

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

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/@types/node/events.d.ts:13*

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

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/@types/node/events.d.ts:14*

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

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/@types/node/events.d.ts:21*

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

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/@types/node/events.d.ts:17*

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

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/@types/node/events.d.ts:15*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` \| `symbol` |
| listener | `function` |

**Returns:** `this`

___
<a id="removesubscription"></a>

###  removeSubscription

▸ **removeSubscription**(subscriptionId: *`string`*): `boolean`

*Defined in [api/stream/StreamServer.ts:496](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/api/stream/StreamServer.ts#L496)*

Remove a subscription (by `subscriptionId`).

This method is a public method to allow bound definitions to interact with the private `subscriptions` mapping.

*__todo:__*: add check to ensure only the client that started a subscription can end it

**Parameters:**

| Name | Type |
| ------ | ------ |
| subscriptionId | `string` |

**Returns:** `boolean`

___
<a id="sendmessagetoclient"></a>

### `<Private>` sendMessageToClient

▸ **sendMessageToClient**(id: *`string`*, res: *`Res` \| `Res`[]*): `void`

*Defined in [api/stream/StreamServer.ts:800](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/api/stream/StreamServer.ts#L800)*

Send a message to a connected client (by server id)

Send a JSON response to a client identified by server-side connectionId.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| id | `string` |  the server-side client ID string |
| res | `Res` \| `Res`[] |  a JsonResponse object |

**Returns:** `void`

___
<a id="sendmessagetoconn"></a>

### `<Private>` sendMessageToConn

▸ **sendMessageToConn**(conn: *`WebSocket`*, res: *`Res`*): `void`

*Defined in [api/stream/StreamServer.ts:817](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/api/stream/StreamServer.ts#L817)*

Send a message to a connected client (by conn. instance)

Send a JSON response to a client to a specified connected client instance.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| conn | `WebSocket` |  the instance of the websocket client connection |
| res | `Res` |  a JsonResponse object to be sent |

**Returns:** `void`

___
<a id="setmaxlisteners"></a>

###  setMaxListeners

▸ **setMaxListeners**(n: *`number`*): `this`

*Inherited from EventEmitter.setMaxListeners*

*Overrides EventEmitter.setMaxListeners*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/@types/node/events.d.ts:18*

**Parameters:**

| Name | Type |
| ------ | ------ |
| n | `number` |

**Returns:** `this`

___
<a id="setupserver"></a>

### `<Private>` setupServer

▸ **setupServer**(host: *`string`*, port: *`number`*): `void`

*Defined in [api/stream/StreamServer.ts:669](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/api/stream/StreamServer.ts#L669)*

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

*Defined in [api/stream/StreamServer.ts:433](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/api/stream/StreamServer.ts#L433)*

Start the StreamAPI server.

An async function that binds the WebSocket server, and connects to the local TendermintRPC instance.

**Returns:** `Promise`<`void`>

___
<a id="submittx"></a>

###  submitTx

▸ **submitTx**(tx: *`OrderData`*, mode: *"sync" \| "async" \| "commit"*): `Promise`<`any`>

*Defined in [api/stream/StreamServer.ts:530](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/api/stream/StreamServer.ts#L530)*

Wrapper function that allows validators running the JSONRPC server to accept and propose order transactions.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| tx | `OrderData` |  the Paradigm order transaction data |
| mode | "sync" \| "async" \| "commit" |  the broadcast mode to use for the Tendermint RPC |

**Returns:** `Promise`<`any`>

___
<a id="subscriptiontrigger"></a>

### `<Private>` subscriptionTrigger

▸ **subscriptionTrigger**(): `void`

*Defined in [api/stream/StreamServer.ts:563](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/api/stream/StreamServer.ts#L563)*

Subscription trigger (documentation coming soon)

**Returns:** `void`

___
<a id="generate32randombytes"></a>

### `<Static>``<Private>` generate32RandomBytes

▸ **generate32RandomBytes**(start?: *`number`*): `Buffer`

*Defined in [api/stream/StreamServer.ts:182](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/api/stream/StreamServer.ts#L182)*

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

*Defined in [api/stream/StreamServer.ts:243](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/api/stream/StreamServer.ts#L243)*

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

*Defined in [api/stream/StreamServer.ts:216](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/api/stream/StreamServer.ts#L216)*

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

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/@types/node/events.d.ts:7*

*__deprecated__*: since v4.0.0

**Parameters:**

| Name | Type |
| ------ | ------ |
| emitter | `EventEmitter` |
| event | `string` \| `symbol` |

**Returns:** `number`

___

