[ParadigmCore](../README.md) > ["common/TendermintRPC"](../modules/_common_tendermintrpc_.md) > [TendermintRPC](../classes/_common_tendermintrpc_.tendermintrpc.md)

# Class: TendermintRPC

A wrapper class facilitating a WebSocket connection to the Tendermint RPC server.

*__description__*: The `Tendermint` class is primarily a wrapper for the NPM `tendermint` library, which facilitates access to the Tendermint RPC server. This class adds additional functionality to simplify the management of an RPC connection, and will eventually support automatic re-connection in the case of network drop.

## Hierarchy

 `EventEmitter`

**↳ TendermintRPC**

## Index

### Constructors

* [constructor](_common_tendermintrpc_.tendermintrpc.md#constructor)

### Properties

* [conn](_common_tendermintrpc_.tendermintrpc.md#conn)
* [connected](_common_tendermintrpc_.tendermintrpc.md#connected)
* [connecting](_common_tendermintrpc_.tendermintrpc.md#connecting)
* [id](_common_tendermintrpc_.tendermintrpc.md#id)
* [latestBlockData](_common_tendermintrpc_.tendermintrpc.md#latestblockdata)
* [maxRetries](_common_tendermintrpc_.tendermintrpc.md#maxretries)
* [queue](_common_tendermintrpc_.tendermintrpc.md#queue)
* [retryInterval](_common_tendermintrpc_.tendermintrpc.md#retryinterval)
* [sending](_common_tendermintrpc_.tendermintrpc.md#sending)
* [shouldRetry](_common_tendermintrpc_.tendermintrpc.md#shouldretry)
* [url](_common_tendermintrpc_.tendermintrpc.md#url)
* [defaultMaxListeners](_common_tendermintrpc_.tendermintrpc.md#defaultmaxlisteners)

### Methods

* [abciInfo](_common_tendermintrpc_.tendermintrpc.md#abciinfo)
* [addListener](_common_tendermintrpc_.tendermintrpc.md#addlistener)
* [connect](_common_tendermintrpc_.tendermintrpc.md#connect)
* [connectionCloseHandler](_common_tendermintrpc_.tendermintrpc.md#connectionclosehandler)
* [connectionErrorHandler](_common_tendermintrpc_.tendermintrpc.md#connectionerrorhandler)
* [emit](_common_tendermintrpc_.tendermintrpc.md#emit)
* [eventNames](_common_tendermintrpc_.tendermintrpc.md#eventnames)
* [getMaxListeners](_common_tendermintrpc_.tendermintrpc.md#getmaxlisteners)
* [internalSubmitTx](_common_tendermintrpc_.tendermintrpc.md#internalsubmittx)
* [isConnected](_common_tendermintrpc_.tendermintrpc.md#isconnected)
* [listenerCount](_common_tendermintrpc_.tendermintrpc.md#listenercount)
* [listeners](_common_tendermintrpc_.tendermintrpc.md#listeners)
* [off](_common_tendermintrpc_.tendermintrpc.md#off)
* [on](_common_tendermintrpc_.tendermintrpc.md#on)
* [once](_common_tendermintrpc_.tendermintrpc.md#once)
* [prependListener](_common_tendermintrpc_.tendermintrpc.md#prependlistener)
* [prependOnceListener](_common_tendermintrpc_.tendermintrpc.md#prependoncelistener)
* [query](_common_tendermintrpc_.tendermintrpc.md#query)
* [rawListeners](_common_tendermintrpc_.tendermintrpc.md#rawlisteners)
* [removeAllListeners](_common_tendermintrpc_.tendermintrpc.md#removealllisteners)
* [removeListener](_common_tendermintrpc_.tendermintrpc.md#removelistener)
* [setMaxListeners](_common_tendermintrpc_.tendermintrpc.md#setmaxlisteners)
* [submitTx](_common_tendermintrpc_.tendermintrpc.md#submittx)
* [subscribe](_common_tendermintrpc_.tendermintrpc.md#subscribe)
* [unsubscribe](_common_tendermintrpc_.tendermintrpc.md#unsubscribe)
* [listenerCount](_common_tendermintrpc_.tendermintrpc.md#listenercount-1)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new TendermintRPC**(endpoint: *`string`*, maxRetries: *`number`*, interval: *`number`*): [TendermintRPC](_common_tendermintrpc_.tendermintrpc.md)

*Defined in [common/TendermintRPC.ts:118](https://github.com/paradigmfoundation/paradigmcore/blob/5e7a947/src/common/TendermintRPC.ts#L118)*

Create a new Tendermint RPC instance.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| endpoint | `string` |  the full URI for the target tendermint rpc server |
| maxRetries | `number` |  the maximum number of times to try reconnect before timeout |
| interval | `number` |  the delay (in ms) between each reconnect attempt |

**Returns:** [TendermintRPC](_common_tendermintrpc_.tendermintrpc.md)

___

## Properties

<a id="conn"></a>

### `<Private>` conn

**● conn**: *`RpcClient`*

*Defined in [common/TendermintRPC.ts:71](https://github.com/paradigmfoundation/paradigmcore/blob/5e7a947/src/common/TendermintRPC.ts#L71)*

The connection to the Tendermint RPC server over WebSocket is initialized when `WrapABCI.prototype.connect()` is called.

___
<a id="connected"></a>

### `<Private>` connected

**● connected**: *`boolean`*

*Defined in [common/TendermintRPC.ts:65](https://github.com/paradigmfoundation/paradigmcore/blob/5e7a947/src/common/TendermintRPC.ts#L65)*

True if connected to Tendermint RPC server.

___
<a id="connecting"></a>

### `<Private>` connecting

**● connecting**: *`boolean`*

*Defined in [common/TendermintRPC.ts:107](https://github.com/paradigmfoundation/paradigmcore/blob/5e7a947/src/common/TendermintRPC.ts#L107)*

Only `true` if connection attempts are in progress.

___
<a id="id"></a>

### `<Private>` id

**● id**: *`string`*

*Defined in [common/TendermintRPC.ts:77](https://github.com/paradigmfoundation/paradigmcore/blob/5e7a947/src/common/TendermintRPC.ts#L77)*

A pseudo-randomly generated ID string to support a unique client<>server session identifier with Tendermint.

___
<a id="latestblockdata"></a>

### `<Private>` latestBlockData

**● latestBlockData**: *`any`*

*Defined in [common/TendermintRPC.ts:96](https://github.com/paradigmfoundation/paradigmcore/blob/5e7a947/src/common/TendermintRPC.ts#L96)*

The in-memory representation of the latest block-data that has been received by the instance.

___
<a id="maxretries"></a>

### `<Private>` maxRetries

**● maxRetries**: *`number`*

*Defined in [common/TendermintRPC.ts:84](https://github.com/paradigmfoundation/paradigmcore/blob/5e7a947/src/common/TendermintRPC.ts#L84)*

The number of times a `TendermintRPC` instance will try to reconnect to the Tendermint RPC server after a connection is lost (following an initially successful connection).

___
<a id="queue"></a>

### `<Private>` queue

**● queue**: *[TransactionConfig](../interfaces/_common_tendermintrpc_.transactionconfig.md)[]*

*Defined in [common/TendermintRPC.ts:112](https://github.com/paradigmfoundation/paradigmcore/blob/5e7a947/src/common/TendermintRPC.ts#L112)*

The broadcast queue of transactions that need to be sent via RPC.

___
<a id="retryinterval"></a>

### `<Private>` retryInterval

**● retryInterval**: *`number`*

*Defined in [common/TendermintRPC.ts:90](https://github.com/paradigmfoundation/paradigmcore/blob/5e7a947/src/common/TendermintRPC.ts#L90)*

The amount of time (in ms) to wait between each attempt to connect to the Tendermint RPC server.

___
<a id="sending"></a>

### `<Private>` sending

**● sending**: *`boolean`*

*Defined in [common/TendermintRPC.ts:118](https://github.com/paradigmfoundation/paradigmcore/blob/5e7a947/src/common/TendermintRPC.ts#L118)*

Boolean status used to track if broadcast via RPC is in progress, or completed/not-started.

___
<a id="shouldretry"></a>

### `<Private>` shouldRetry

**● shouldRetry**: *`boolean`*

*Defined in [common/TendermintRPC.ts:102](https://github.com/paradigmfoundation/paradigmcore/blob/5e7a947/src/common/TendermintRPC.ts#L102)*

Used to enable re-connections upon connection loss between the instance and the Tendermint RPC server.

___
<a id="url"></a>

### `<Private>` url

**● url**: *`URL`*

*Defined in [common/TendermintRPC.ts:60](https://github.com/paradigmfoundation/paradigmcore/blob/5e7a947/src/common/TendermintRPC.ts#L60)*

The URL of the Tendermint RPC (ABCI) server port.

___
<a id="defaultmaxlisteners"></a>

### `<Static>` defaultMaxListeners

**● defaultMaxListeners**: *`number`*

*Inherited from EventEmitter.defaultMaxListeners*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/@types/node/index.d.ts:1110*

___

## Methods

<a id="abciinfo"></a>

###  abciInfo

▸ **abciInfo**(override?: *`boolean`*): `Promise`<`ResponseInfo`>

*Defined in [common/TendermintRPC.ts:301](https://github.com/paradigmfoundation/paradigmcore/blob/5e7a947/src/common/TendermintRPC.ts#L301)*

Query the ABCI `info` method.

*__description__*: A wrapper for the Tendermint RPC method `abci_info`, for more details, see [https://tendermint.com/rpc](https://tendermint.com/rpc) and type definition.

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` override | `boolean` |

**Returns:** `Promise`<`ResponseInfo`>

___
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
<a id="connect"></a>

###  connect

▸ **connect**(maxTries: *`number`*, intervalMs: *`number`*): `Promise`<`void`>

*Defined in [common/TendermintRPC.ts:153](https://github.com/paradigmfoundation/paradigmcore/blob/5e7a947/src/common/TendermintRPC.ts#L153)*

Initialize connection to Tendermint RPC server.

**Parameters:**

| Name | Type |
| ------ | ------ |
| maxTries | `number` |
| intervalMs | `number` |

**Returns:** `Promise`<`void`>
a promise that resolves (to void) upon successful connection,
and rejects on (and to) any error encountered.

___
<a id="connectionclosehandler"></a>

### `<Private>` connectionCloseHandler

▸ **connectionCloseHandler**(_this: *[TendermintRPC](_common_tendermintrpc_.tendermintrpc.md)*): `function`

*Defined in [common/TendermintRPC.ts:245](https://github.com/paradigmfoundation/paradigmcore/blob/5e7a947/src/common/TendermintRPC.ts#L245)*

Generate a handler function for connection closure.

*__todo__*: implement actual error/close handling.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _this | [TendermintRPC](_common_tendermintrpc_.tendermintrpc.md) |  \`this\` reference for calling class. |

**Returns:** `function`
a function to be used as an event handler for the Tendermint
RPC connection.

___
<a id="connectionerrorhandler"></a>

### `<Private>` connectionErrorHandler

▸ **connectionErrorHandler**(_this: *[TendermintRPC](_common_tendermintrpc_.tendermintrpc.md)*): `function`

*Defined in [common/TendermintRPC.ts:219](https://github.com/paradigmfoundation/paradigmcore/blob/5e7a947/src/common/TendermintRPC.ts#L219)*

Generate a handler function for connection closure.

*__todo__*: implement actual error/close handling.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| _this | [TendermintRPC](_common_tendermintrpc_.tendermintrpc.md) |  \`this\` reference for calling class. |

**Returns:** `function`
a function to be used as an event handler for the Tendermint
RPC connection.

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
<a id="internalsubmittx"></a>

### `<Private>` internalSubmitTx

▸ **internalSubmitTx**(): `Promise`<`any`>

*Defined in [common/TendermintRPC.ts:272](https://github.com/paradigmfoundation/paradigmcore/blob/5e7a947/src/common/TendermintRPC.ts#L272)*

(Internal) Submit a transaction to Tendermint via RPC. Use the public `TendermintRPC.prototype.submitTx` method to add transactions to the broadcast queue.

**Returns:** `Promise`<`any`>

___
<a id="isconnected"></a>

###  isConnected

▸ **isConnected**(): `boolean`

*Defined in [common/TendermintRPC.ts:443](https://github.com/paradigmfoundation/paradigmcore/blob/5e7a947/src/common/TendermintRPC.ts#L443)*

Public getter method to check connection status.

**Returns:** `boolean`
`true` if connected to Tendermint RPC, and `false` otherwise.

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
<a id="query"></a>

###  query

▸ **query**(path: *`string`*): `Promise`<`any`>

*Defined in [common/TendermintRPC.ts:433](https://github.com/paradigmfoundation/paradigmcore/blob/5e7a947/src/common/TendermintRPC.ts#L433)*

(in-progress)

*__todo__*: expand

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| path | `string` |  the path to submit to the ABCI query method |

**Returns:** `Promise`<`any`>

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
<a id="submittx"></a>

###  submitTx

▸ **submitTx**(tx: *`SignedTransaction`*, mode?: *"sync" \| "async" \| "commit"*): `Promise`<`ResponseBroadcastTx`>

*Defined in [common/TendermintRPC.ts:382](https://github.com/paradigmfoundation/paradigmcore/blob/5e7a947/src/common/TendermintRPC.ts#L382)*

Submit

*__description__*: Accepts a \[SignedTransaction\] as the first argument, which gets compressed/encoded using the \[PayloadCipher\] class. The second (optional) parameter can be used to specify a broadcast mode, which can be any of `sync`, `async`, or `commit`. See [https://tendermint.com/rpc](https://tendermint.com/rpc) for more details.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| tx | `SignedTransaction` |   |
| `Optional` mode | "sync" \| "async" \| "commit" |

**Returns:** `Promise`<`ResponseBroadcastTx`>

___
<a id="subscribe"></a>

###  subscribe

▸ **subscribe**(eventName: *`string`*, cb: *`Function`*): `Promise`<`void`>

*Defined in [common/TendermintRPC.ts:327](https://github.com/paradigmfoundation/paradigmcore/blob/5e7a947/src/common/TendermintRPC.ts#L327)*

Subscribe to an event in the Tendermint chain.

*__description__*: Wrapper for the `tendermint` JS library that allows subscription to various Tendermint and ParadigmCore events. See the full syntax for the 'subscribe' method at [https://tendermint.com/rpc](https://tendermint.com/rpc)

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| eventName | `string` |  the string of the event to subscribe to. |
| cb | `Function` |  callback function to be executed upon each event. |

**Returns:** `Promise`<`void`>

___
<a id="unsubscribe"></a>

###  unsubscribe

▸ **unsubscribe**(query: *`string`*): `Promise`<`void`>

*Defined in [common/TendermintRPC.ts:354](https://github.com/paradigmfoundation/paradigmcore/blob/5e7a947/src/common/TendermintRPC.ts#L354)*

Unsubscribe from an event in the Tendermint chain.

*__description__*: Wrapper for the `tendermint` JS library that allows subscription to various Tendermint and ParadigmCore events. See the full syntax for the 'unsubscribe' method at [https://tendermint.com/rpc](https://tendermint.com/rpc)

**Parameters:**

| Name | Type |
| ------ | ------ |
| query | `string` |

**Returns:** `Promise`<`void`>

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

