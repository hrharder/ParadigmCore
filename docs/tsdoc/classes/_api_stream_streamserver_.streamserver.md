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
* [createConnectionHandler](_api_stream_streamserver_.streamserver.md#createconnectionhandler)
* [emit](_api_stream_streamserver_.streamserver.md#emit)
* [eventNames](_api_stream_streamserver_.streamserver.md#eventnames)
* [getMaxListeners](_api_stream_streamserver_.streamserver.md#getmaxlisteners)
* [listenerCount](_api_stream_streamserver_.streamserver.md#listenercount)
* [listeners](_api_stream_streamserver_.streamserver.md#listeners)
* [messageHandlerWrapper](_api_stream_streamserver_.streamserver.md#messagehandlerwrapper)
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

*Defined in [api/stream/StreamServer.ts:322](https://github.com/paradigmfoundation/paradigmcore/blob/99f4a81/src/api/stream/StreamServer.ts#L322)*

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

*Defined in [api/stream/StreamServer.ts:314](https://github.com/paradigmfoundation/paradigmcore/blob/99f4a81/src/api/stream/StreamServer.ts#L314)*

Mapping of active `connectionId` strings to connection objects

*__description__*: Used to quickly find a connection object pointer (to an instance of\[\[WebSocket\]\]), used to send messages, etc.

___
<a id="latestblockdata"></a>

### `<Private>` latestBlockData

**● latestBlockData**: *[IBlockData](../interfaces/_api_stream_streamserver_.iblockdata.md)*

*Defined in [api/stream/StreamServer.ts:246](https://github.com/paradigmfoundation/paradigmcore/blob/99f4a81/src/api/stream/StreamServer.ts#L246)*

Data for the latest Tendermint block.

*__description__*: The most recent (parsed) block-data from the Tendermint RPC server, not including transactions.

___
<a id="methods"></a>

### `<Private>` methods

**● methods**: *[IMethods](../interfaces/_api_stream_streamserver_.imethods.md)*

*Defined in [api/stream/StreamServer.ts:229](https://github.com/paradigmfoundation/paradigmcore/blob/99f4a81/src/api/stream/StreamServer.ts#L229)*

Mapping of method handler functions.

___
<a id="retryinterval"></a>

### `<Private>` retryInterval

**● retryInterval**: *`number`*

*Defined in [api/stream/StreamServer.ts:262](https://github.com/paradigmfoundation/paradigmcore/blob/99f4a81/src/api/stream/StreamServer.ts#L262)*

Interval (in ms) between retry attempts

*__description__*: The millisecond interval between attempts to reconnect to the Tendermint RPC server. Used by the [TendermintRPC](_common_tendermintrpc_.tendermintrpc.md) class.

___
<a id="retrymax"></a>

### `<Private>` retryMax

**● retryMax**: *`number`*

*Defined in [api/stream/StreamServer.ts:254](https://github.com/paradigmfoundation/paradigmcore/blob/99f4a81/src/api/stream/StreamServer.ts#L254)*

Number of times to attempt RPC connection.

*__description__*: Used to facilitate reestablishment of WebSocket connection upon error or unexpected closure.

___
<a id="rpcclient"></a>

### `<Private>` rpcClient

**● rpcClient**: *[TendermintRPC](_common_tendermintrpc_.tendermintrpc.md)*

*Defined in [api/stream/StreamServer.ts:238](https://github.com/paradigmfoundation/paradigmcore/blob/99f4a81/src/api/stream/StreamServer.ts#L238)*

Tendermint RPC client instance.

*__description__*: Instance of `TendermintRPC`, the custom wrapper used to interact with Tendermint and the ParadigmCore chain via the local Tendermint RPC server. See [TendermintRPC](_common_tendermintrpc_.tendermintrpc.md) documentation for more info.

___
<a id="secret"></a>

### `<Private>` secret

**● secret**: *`Buffer`*

*Defined in [api/stream/StreamServer.ts:224](https://github.com/paradigmfoundation/paradigmcore/blob/99f4a81/src/api/stream/StreamServer.ts#L224)*

Server secret bytes

A pseudo-random 32 byte `Buffer` used (along with the UNIX time) as salt when hashing client-provided `request.id` strings. Should not be shared with the client (as a precaution).

___
<a id="server"></a>

### `<Private>` server

**● server**: *`Server`*

*Defined in [api/stream/StreamServer.ts:285](https://github.com/paradigmfoundation/paradigmcore/blob/99f4a81/src/api/stream/StreamServer.ts#L285)*

StreamAPI WebSocket server instance

*__description__*: The actual `ws.Server` instance used to handle requests. Not to be confused with the `StreamServer` class, which is the actual implementation of the JSONRPC spec for transport over WebSocket.

___
<a id="started"></a>

### `<Private>` started

**● started**: *`boolean`*

*Defined in [api/stream/StreamServer.ts:322](https://github.com/paradigmfoundation/paradigmcore/blob/99f4a81/src/api/stream/StreamServer.ts#L322)*

Server status

*__description__*: Only true if `StreamServer.prototype.start()` has executed and the promise has resolved/not been rejected.

___
<a id="streamhost"></a>

### `<Private>` streamHost

**● streamHost**: *`string`*

*Defined in [api/stream/StreamServer.ts:276](https://github.com/paradigmfoundation/paradigmcore/blob/99f4a81/src/api/stream/StreamServer.ts#L276)*

Stream host

*__description__*: The network host to bind the StreamAPI server to.

___
<a id="streamport"></a>

### `<Private>` streamPort

**● streamPort**: *`number`*

*Defined in [api/stream/StreamServer.ts:269](https://github.com/paradigmfoundation/paradigmcore/blob/99f4a81/src/api/stream/StreamServer.ts#L269)*

StreamAPI port

*__description__*: The port to expose the StreamAPI WebSocket server on.

___
<a id="subscriptions"></a>

### `<Private>` subscriptions

**● subscriptions**: *[ISubscription](../interfaces/_api_stream_streamserver_.isubscription.md)[]*

*Defined in [api/stream/StreamServer.ts:306](https://github.com/paradigmfoundation/paradigmcore/blob/99f4a81/src/api/stream/StreamServer.ts#L306)*

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

*Defined in [api/stream/StreamServer.ts:405](https://github.com/paradigmfoundation/paradigmcore/blob/99f4a81/src/api/stream/StreamServer.ts#L405)*

Bind a method to the StreamServer.

**Parameters:**

| Name | Type |
| ------ | ------ |
| methodName | `string` |
| method | `function` |

**Returns:** `void`

___
<a id="createconnectionhandler"></a>

### `<Private>` createConnectionHandler

▸ **createConnectionHandler**(): `function`

*Defined in [api/stream/StreamServer.ts:438](https://github.com/paradigmfoundation/paradigmcore/blob/99f4a81/src/api/stream/StreamServer.ts#L438)*

Create a server connection handler

*__description__*: Creates a `StreamServer` connection handler function.

*__todo__*: document better

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
<a id="messagehandlerwrapper"></a>

### `<Private>` messageHandlerWrapper

▸ **messageHandlerWrapper**(connId: *`string`*): `function`

*Defined in [api/stream/StreamServer.ts:512](https://github.com/paradigmfoundation/paradigmcore/blob/99f4a81/src/api/stream/StreamServer.ts#L512)*

Build a message handler function for a client.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| connId | `string` |  the connectionId of the client the handler is for |

**Returns:** `function`

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

*Defined in [api/stream/StreamServer.ts:498](https://github.com/paradigmfoundation/paradigmcore/blob/99f4a81/src/api/stream/StreamServer.ts#L498)*

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

*Defined in [api/stream/StreamServer.ts:422](https://github.com/paradigmfoundation/paradigmcore/blob/99f4a81/src/api/stream/StreamServer.ts#L422)*

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

*Defined in [api/stream/StreamServer.ts:375](https://github.com/paradigmfoundation/paradigmcore/blob/99f4a81/src/api/stream/StreamServer.ts#L375)*

Start the StreamAPI server.

An async function that binds the WebSocket server, and connects to the local TendermintRPC instance.

**Returns:** `Promise`<`void`>

___
<a id="generate32randombytes"></a>

### `<Static>``<Private>` generate32RandomBytes

▸ **generate32RandomBytes**(start?: *`number`*): `Buffer`

*Defined in [api/stream/StreamServer.ts:143](https://github.com/paradigmfoundation/paradigmcore/blob/99f4a81/src/api/stream/StreamServer.ts#L143)*

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

*Defined in [api/stream/StreamServer.ts:204](https://github.com/paradigmfoundation/paradigmcore/blob/99f4a81/src/api/stream/StreamServer.ts#L204)*

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

*Defined in [api/stream/StreamServer.ts:177](https://github.com/paradigmfoundation/paradigmcore/blob/99f4a81/src/api/stream/StreamServer.ts#L177)*

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

