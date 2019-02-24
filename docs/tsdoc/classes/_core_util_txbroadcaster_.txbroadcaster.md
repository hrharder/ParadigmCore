[ParadigmCore](../README.md) > ["core/util/TxBroadcaster"](../modules/_core_util_txbroadcaster_.md) > [TxBroadcaster](../classes/_core_util_txbroadcaster_.txbroadcaster.md)

# Class: TxBroadcaster

The `TxBroadcaster` is responsible for executing local ABCI transactions. It implements a queue, and allows multiple "concurrent" usage of a given instance for local ABCI txs, so only one instance should be used per node.

## Hierarchy

**TxBroadcaster**

## Index

### Constructors

* [constructor](_core_util_txbroadcaster_.txbroadcaster.md#constructor)

### Properties

* [broadcasting](_core_util_txbroadcaster_.txbroadcaster.md#broadcasting)
* [client](_core_util_txbroadcaster_.txbroadcaster.md#client)
* [queue](_core_util_txbroadcaster_.txbroadcaster.md#queue)
* [started](_core_util_txbroadcaster_.txbroadcaster.md#started)
* [tracker](_core_util_txbroadcaster_.txbroadcaster.md#tracker)

### Methods

* [broadcast](_core_util_txbroadcaster_.txbroadcaster.md#broadcast)
* [dequeue](_core_util_txbroadcaster_.txbroadcaster.md#dequeue)
* [enqueue](_core_util_txbroadcaster_.txbroadcaster.md#enqueue)
* [isEmpty](_core_util_txbroadcaster_.txbroadcaster.md#isempty)
* [send](_core_util_txbroadcaster_.txbroadcaster.md#send)
* [start](_core_util_txbroadcaster_.txbroadcaster.md#start)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new TxBroadcaster**(options: *`any`*): [TxBroadcaster](_core_util_txbroadcaster_.txbroadcaster.md)

*Defined in [core/util/TxBroadcaster.ts:31](https://github.com/paradigmfoundation/paradigmcore/blob/8eaa498/src/core/util/TxBroadcaster.ts#L31)*

Create a new TxBroadcaster instance.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| options | `any` |  Options object with:*   options.client {RpcClient} Tendermint ABCI client |

**Returns:** [TxBroadcaster](_core_util_txbroadcaster_.txbroadcaster.md)

___

## Properties

<a id="broadcasting"></a>

### `<Private>` broadcasting

**● broadcasting**: *`boolean`*

*Defined in [core/util/TxBroadcaster.ts:31](https://github.com/paradigmfoundation/paradigmcore/blob/8eaa498/src/core/util/TxBroadcaster.ts#L31)*

___
<a id="client"></a>

### `<Private>` client

**● client**: *`any`*

*Defined in [core/util/TxBroadcaster.ts:26](https://github.com/paradigmfoundation/paradigmcore/blob/8eaa498/src/core/util/TxBroadcaster.ts#L26)*

___
<a id="queue"></a>

### `<Private>` queue

**● queue**: *`any`[][]*

*Defined in [core/util/TxBroadcaster.ts:27](https://github.com/paradigmfoundation/paradigmcore/blob/8eaa498/src/core/util/TxBroadcaster.ts#L27)*

___
<a id="started"></a>

### `<Private>` started

**● started**: *`boolean`*

*Defined in [core/util/TxBroadcaster.ts:30](https://github.com/paradigmfoundation/paradigmcore/blob/8eaa498/src/core/util/TxBroadcaster.ts#L30)*

___
<a id="tracker"></a>

### `<Private>` tracker

**● tracker**: *`EventEmitter`*

*Defined in [core/util/TxBroadcaster.ts:28](https://github.com/paradigmfoundation/paradigmcore/blob/8eaa498/src/core/util/TxBroadcaster.ts#L28)*

___

## Methods

<a id="broadcast"></a>

### `<Private>` broadcast

▸ **broadcast**(): `Promise`<`void`>

*Defined in [core/util/TxBroadcaster.ts:114](https://github.com/paradigmfoundation/paradigmcore/blob/8eaa498/src/core/util/TxBroadcaster.ts#L114)*

Internal broadcast function. Executes ABCI transactions via a queue.

**Returns:** `Promise`<`void`>

___
<a id="dequeue"></a>

### `<Private>` dequeue

▸ **dequeue**(): `any`

*Defined in [core/util/TxBroadcaster.ts:180](https://github.com/paradigmfoundation/paradigmcore/blob/8eaa498/src/core/util/TxBroadcaster.ts#L180)*

Returns the top item from the queue, and removes it.

**Returns:** `any`

___
<a id="enqueue"></a>

### `<Private>` enqueue

▸ **enqueue**(item: *`any`*): `void`

*Defined in [core/util/TxBroadcaster.ts:171](https://github.com/paradigmfoundation/paradigmcore/blob/8eaa498/src/core/util/TxBroadcaster.ts#L171)*

Add an item to the queue.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| item | `any` |  item to add to queue |

**Returns:** `void`

___
<a id="isempty"></a>

### `<Private>` isEmpty

▸ **isEmpty**(): `boolean`

*Defined in [core/util/TxBroadcaster.ts:162](https://github.com/paradigmfoundation/paradigmcore/blob/8eaa498/src/core/util/TxBroadcaster.ts#L162)*

Returns true if transaction queue is empty

**Returns:** `boolean`

___
<a id="send"></a>

###  send

▸ **send**(tx: *`SignedTransaction`*): `Promise`<`any`>

*Defined in [core/util/TxBroadcaster.ts:93](https://github.com/paradigmfoundation/paradigmcore/blob/8eaa498/src/core/util/TxBroadcaster.ts#L93)*

*__module__*: core

*__description__*: The `send()` method is the external API for broadcasting local ABCI transactions. Provide the raw transaction object, and it will be encoded, compressed, and added to the broadcast queue.

*__summary__*: The promise that is returned by `this.send()` resolves upon successful ABCI broadcast, with the JSON response. It will reject or throw an error if the transaction fails to submit, but will resolve even on a successful but rejected ABCI transaction.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| tx | `SignedTransaction` |  raw transaction object to enqueue |

**Returns:** `Promise`<`any`>

___
<a id="start"></a>

###  start

▸ **start**(): `boolean`

*Defined in [core/util/TxBroadcaster.ts:74](https://github.com/paradigmfoundation/paradigmcore/blob/8eaa498/src/core/util/TxBroadcaster.ts#L74)*

Call once Tendermint is synchronized. No transactions will be broadcast until TxBroadcaster.prototype.start() is called.

**Returns:** `boolean`

___

