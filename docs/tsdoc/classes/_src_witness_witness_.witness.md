[ParadigmCore](../README.md) > ["src/witness/Witness"](../modules/_src_witness_witness_.md) > [Witness](../classes/_src_witness_witness_.witness.md)

# Class: Witness

A Witness supports a one way peg-zone between Ethereum and the OrderStream to enable tracking of the PosterStaking contract and witness events.

See spec for more details.

## Hierarchy

**Witness**

## Index

### Constructors

* [constructor](_src_witness_witness_.witness.md#constructor)

### Properties

* [broadcaster](_src_witness_witness_.witness.md#broadcaster)
* [currHeight](_src_witness_witness_.witness.md#currheight)
* [events](_src_witness_witness_.witness.md#events)
* [finalityThreshold](_src_witness_witness_.witness.md#finalitythreshold)
* [generatorator](_src_witness_witness_.witness.md#generatorator)
* [initHeight](_src_witness_witness_.witness.md#initheight)
* [initialized](_src_witness_witness_.witness.md#initialized)
* [periodEnd](_src_witness_witness_.witness.md#periodend)
* [periodLength](_src_witness_witness_.witness.md#periodlength)
* [periodLimit](_src_witness_witness_.witness.md#periodlimit)
* [periodNumber](_src_witness_witness_.witness.md#periodnumber)
* [periodStart](_src_witness_witness_.witness.md#periodstart)
* [posterBalances](_src_witness_witness_.witness.md#posterbalances)
* [stakeContract](_src_witness_witness_.witness.md#stakecontract)
* [started](_src_witness_witness_.witness.md#started)
* [web3](_src_witness_witness_.witness.md#web3)
* [web3provider](_src_witness_witness_.witness.md#web3provider)

### Methods

* [connectWeb3](_src_witness_witness_.witness.md#connectweb3)
* [execAbciTx](_src_witness_witness_.witness.md#execabcitx)
* [execEventTx](_src_witness_witness_.witness.md#execeventtx)
* [genRebalanceTx](_src_witness_witness_.witness.md#genrebalancetx)
* [getProvider](_src_witness_witness_.witness.md#getprovider)
* [handleBlock](_src_witness_witness_.witness.md#handleblock)
* [handleStake](_src_witness_witness_.witness.md#handlestake)
* [handleValidator](_src_witness_witness_.witness.md#handlevalidator)
* [initialize](_src_witness_witness_.witness.md#initialize)
* [start](_src_witness_witness_.witness.md#start)
* [subscribe](_src_witness_witness_.witness.md#subscribe)
* [synchronize](_src_witness_witness_.witness.md#synchronize)
* [updateBalance](_src_witness_witness_.witness.md#updatebalance)
* [create](_src_witness_witness_.witness.md#create)
* [genLimits](_src_witness_witness_.witness.md#genlimits)

---

## Constructors

<a id="constructor"></a>

### `<Private>` constructor

⊕ **new Witness**(opts: *`any`*): [Witness](_src_witness_witness_.witness.md)

*Defined in [src/witness/Witness.ts:157](https://github.com/paradigmfoundation/paradigmcore/blob/7d688ae/src/witness/Witness.ts#L157)*

PRIVATE constructor. Do not use. Create new rebalancers with Witness.create(options)

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| opts | `any` |  options object - see .create() docstring |

**Returns:** [Witness](_src_witness_witness_.witness.md)

___

## Properties

<a id="broadcaster"></a>

### `<Private>` broadcaster

**● broadcaster**: *[TxBroadcaster](_src_core_util_txbroadcaster_.txbroadcaster.md)*

*Defined in [src/witness/Witness.ts:152](https://github.com/paradigmfoundation/paradigmcore/blob/7d688ae/src/witness/Witness.ts#L152)*

___
<a id="currheight"></a>

### `<Private>` currHeight

**● currHeight**: *`number`*

*Defined in [src/witness/Witness.ts:139](https://github.com/paradigmfoundation/paradigmcore/blob/7d688ae/src/witness/Witness.ts#L139)*

___
<a id="events"></a>

### `<Private>` events

**● events**: *`any`*

*Defined in [src/witness/Witness.ts:156](https://github.com/paradigmfoundation/paradigmcore/blob/7d688ae/src/witness/Witness.ts#L156)*

___
<a id="finalitythreshold"></a>

### `<Private>` finalityThreshold

**● finalityThreshold**: *`number`*

*Defined in [src/witness/Witness.ts:137](https://github.com/paradigmfoundation/paradigmcore/blob/7d688ae/src/witness/Witness.ts#L137)*

___
<a id="generatorator"></a>

### `<Private>` generatorator

**● generatorator**: *[TxGenerator](_src_core_util_txgenerator_.txgenerator.md)*

*Defined in [src/witness/Witness.ts:153](https://github.com/paradigmfoundation/paradigmcore/blob/7d688ae/src/witness/Witness.ts#L153)*

___
<a id="initheight"></a>

### `<Private>` initHeight

**● initHeight**: *`number`*

*Defined in [src/witness/Witness.ts:138](https://github.com/paradigmfoundation/paradigmcore/blob/7d688ae/src/witness/Witness.ts#L138)*

___
<a id="initialized"></a>

### `<Private>` initialized

**● initialized**: *`boolean`*

*Defined in [src/witness/Witness.ts:129](https://github.com/paradigmfoundation/paradigmcore/blob/7d688ae/src/witness/Witness.ts#L129)*

End static methods.

Instance methods and variables below.

___
<a id="periodend"></a>

### `<Private>` periodEnd

**● periodEnd**: *`number`*

*Defined in [src/witness/Witness.ts:146](https://github.com/paradigmfoundation/paradigmcore/blob/7d688ae/src/witness/Witness.ts#L146)*

___
<a id="periodlength"></a>

### `<Private>` periodLength

**● periodLength**: *`number`*

*Defined in [src/witness/Witness.ts:143](https://github.com/paradigmfoundation/paradigmcore/blob/7d688ae/src/witness/Witness.ts#L143)*

___
<a id="periodlimit"></a>

### `<Private>` periodLimit

**● periodLimit**: *`number`*

*Defined in [src/witness/Witness.ts:144](https://github.com/paradigmfoundation/paradigmcore/blob/7d688ae/src/witness/Witness.ts#L144)*

___
<a id="periodnumber"></a>

### `<Private>` periodNumber

**● periodNumber**: *`number`*

*Defined in [src/witness/Witness.ts:142](https://github.com/paradigmfoundation/paradigmcore/blob/7d688ae/src/witness/Witness.ts#L142)*

___
<a id="periodstart"></a>

### `<Private>` periodStart

**● periodStart**: *`number`*

*Defined in [src/witness/Witness.ts:145](https://github.com/paradigmfoundation/paradigmcore/blob/7d688ae/src/witness/Witness.ts#L145)*

___
<a id="posterbalances"></a>

### `<Private>` posterBalances

**● posterBalances**: *`PosterBalances`*

*Defined in [src/witness/Witness.ts:157](https://github.com/paradigmfoundation/paradigmcore/blob/7d688ae/src/witness/Witness.ts#L157)*

___
<a id="stakecontract"></a>

### `<Private>` stakeContract

**● stakeContract**: *`any`*

*Defined in [src/witness/Witness.ts:149](https://github.com/paradigmfoundation/paradigmcore/blob/7d688ae/src/witness/Witness.ts#L149)*

___
<a id="started"></a>

### `<Private>` started

**● started**: *`boolean`*

*Defined in [src/witness/Witness.ts:130](https://github.com/paradigmfoundation/paradigmcore/blob/7d688ae/src/witness/Witness.ts#L130)*

___
<a id="web3"></a>

### `<Private>` web3

**● web3**: *`Web3`*

*Defined in [src/witness/Witness.ts:134](https://github.com/paradigmfoundation/paradigmcore/blob/7d688ae/src/witness/Witness.ts#L134)*

___
<a id="web3provider"></a>

### `<Private>` web3provider

**● web3provider**: *`URL`*

*Defined in [src/witness/Witness.ts:133](https://github.com/paradigmfoundation/paradigmcore/blob/7d688ae/src/witness/Witness.ts#L133)*

___

## Methods

<a id="connectweb3"></a>

### `<Private>` connectWeb3

▸ **connectWeb3**(): `number`

*Defined in [src/witness/Witness.ts:323](https://github.com/paradigmfoundation/paradigmcore/blob/7d688ae/src/witness/Witness.ts#L323)*

Used to create web3 instance (based on provider generated in `this.getProvider()` method).

**Returns:** `number`

___
<a id="execabcitx"></a>

### `<Private>` execAbciTx

▸ **execAbciTx**(tx: *`SignedTransaction`*): `number`

*Defined in [src/witness/Witness.ts:694](https://github.com/paradigmfoundation/paradigmcore/blob/7d688ae/src/witness/Witness.ts#L694)*

Encodes and compresses a transactions, then submits it to Tendermint via the broadcaster connection.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| tx | `SignedTransaction` |  raw transaction object |

**Returns:** `number`

___
<a id="execeventtx"></a>

### `<Private>` execEventTx

▸ **execEventTx**(event: *`WitnessData`*): `void`

*Defined in [src/witness/Witness.ts:663](https://github.com/paradigmfoundation/paradigmcore/blob/7d688ae/src/witness/Witness.ts#L663)*

Generate and send and event witness transaction.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| event | `WitnessData` |  event object |

**Returns:** `void`

___
<a id="genrebalancetx"></a>

### `<Private>` genRebalanceTx

▸ **genRebalanceTx**(round: *`any`*, start: *`any`*, length: *`any`*): `SignedTransaction`

*Defined in [src/witness/Witness.ts:629](https://github.com/paradigmfoundation/paradigmcore/blob/7d688ae/src/witness/Witness.ts#L629)*

Generates a rebalance transaction object by computing proportional allocation of transaction throughput based on stake size.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| round | `any` |  the current staking period number |
| start | `any` |  period starting ETG block number |
| length | `any` |  the length of each period in ETH blocks |

**Returns:** `SignedTransaction`

___
<a id="getprovider"></a>

### `<Private>` getProvider

▸ **getProvider**(): `WebsocketProvider`

*Defined in [src/witness/Witness.ts:274](https://github.com/paradigmfoundation/paradigmcore/blob/7d688ae/src/witness/Witness.ts#L274)*

Used to connect to Web3 provider. Called during initialization, and if a web3 disconnect is detected.

**Returns:** `WebsocketProvider`

___
<a id="handleblock"></a>

### `<Private>` handleBlock

▸ **handleBlock**(error: *`any`*, res: *`any`*): `void`

*Defined in [src/witness/Witness.ts:505](https://github.com/paradigmfoundation/paradigmcore/blob/7d688ae/src/witness/Witness.ts#L505)*

New Ethereum block event handler. Updates balances and executes ABCI transactions at appropriate finality blocks.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| error | `any` |  error object |
| res | `any` |  event response object |

**Returns:** `void`

___
<a id="handlestake"></a>

### `<Private>` handleStake

▸ **handleStake**(error: *`any`*, res: *`any`*): `void`

*Defined in [src/witness/Witness.ts:384](https://github.com/paradigmfoundation/paradigmcore/blob/7d688ae/src/witness/Witness.ts#L384)*

Stake event handler. NOTE: events are indexed by the block they occur in, not the finality block for that event.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| error | `any` |  error object |
| res | `any` |  event response object |

**Returns:** `void`

___
<a id="handlevalidator"></a>

### `<Private>` handleValidator

▸ **handleValidator**(error: *`any`*, res: *`any`*): `void`

*Defined in [src/witness/Witness.ts:442](https://github.com/paradigmfoundation/paradigmcore/blob/7d688ae/src/witness/Witness.ts#L442)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| error | `any` |
| res | `any` |

**Returns:** `void`

___
<a id="initialize"></a>

###  initialize

▸ **initialize**(): `Promise`<`number`>

*Defined in [src/witness/Witness.ts:200](https://github.com/paradigmfoundation/paradigmcore/blob/7d688ae/src/witness/Witness.ts#L200)*

Initialize rebalancer instance by connecting to a web3 endpoint and instantiating contract instance. Uses error codes.

**Returns:** `Promise`<`number`>
Promise that resolves to 0 if OK

___
<a id="start"></a>

###  start

▸ **start**(): `number`

*Defined in [src/witness/Witness.ts:238](https://github.com/paradigmfoundation/paradigmcore/blob/7d688ae/src/witness/Witness.ts#L238)*

Starts rebalancer instance after node synchronization, and connects to local Tendermint instance via ABCI.

**Returns:** `number`
0 if OK

___
<a id="subscribe"></a>

### `<Private>` subscribe

▸ **subscribe**(from?: *`number`*): `number`

*Defined in [src/witness/Witness.ts:344](https://github.com/paradigmfoundation/paradigmcore/blob/7d688ae/src/witness/Witness.ts#L344)*

Subscribe to relevant Ethereum events and attach handlers.

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `Default value` from | `number` | 0 |  the block from which to subscribe to events |

**Returns:** `number`

___
<a id="synchronize"></a>

###  synchronize

▸ **synchronize**(round: *`number`*, startsAt: *`number`*, endsAt: *`number`*): `void`

*Defined in [src/witness/Witness.ts:256](https://github.com/paradigmfoundation/paradigmcore/blob/7d688ae/src/witness/Witness.ts#L256)*

Use in ABCI commit() to update when a new state is accepted. Updates staking period parameters.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| round | `number` |  accepted new stake round (incrementing) |
| startsAt | `number` |  accepted starting block for new period |
| endsAt | `number` |  accepted ending block for new period |

**Returns:** `void`

___
<a id="updatebalance"></a>

### `<Private>` updateBalance

▸ **updateBalance**(event: *`WitnessData`*): `void`

*Defined in [src/witness/Witness.ts:576](https://github.com/paradigmfoundation/paradigmcore/blob/7d688ae/src/witness/Witness.ts#L576)*

Perform "state transition" of instance balances. NOTE: this function does not modify the state of the ABCI application, however it implements the same logic as the state machine to ensure balances in state are up-to-date with the instance balances.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| event | `WitnessData` |  event object |

**Returns:** `void`

___
<a id="create"></a>

### `<Static>` create

▸ **create**(options: *`any`*): `Promise`<[Witness](_src_witness_witness_.witness.md)>

*Defined in [src/witness/Witness.ts:58](https://github.com/paradigmfoundation/paradigmcore/blob/7d688ae/src/witness/Witness.ts#L58)*

Static generator to create new rebalancer instances.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| options | `any` |  options object with the following parameters:*   options.provider {string} web3 provider URL*   options.periodLimit {number} max transactions per period*   options.periodLength {number} staking period length (ETH blocks)*   options.finalityThreshold {number} required block maturity*   options.broadcaster {TxBroadcaster} broadcaster instance*   options.txGenerator {TxGenerator} tx generator/signer |

**Returns:** `Promise`<[Witness](_src_witness_witness_.witness.md)>
Promise that resolves to a new rebalancer instance.

___
<a id="genlimits"></a>

### `<Static>` genLimits

▸ **genLimits**(bals: *`PosterBalances`*, limit: *`number`*): `Limits`

*Defined in [src/witness/Witness.ts:88](https://github.com/paradigmfoundation/paradigmcore/blob/7d688ae/src/witness/Witness.ts#L88)*

Generates an output address:limit mapping based on a provided address:balance mapping, and a total throughput limit.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| bals | `PosterBalances` |  current address:balance mapping |
| limit | `number` |  total number of orders accepted per period |

**Returns:** `Limits`

___

