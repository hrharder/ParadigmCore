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
* [generator](_src_witness_witness_.witness.md#generator)
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

*Defined in [src/witness/Witness.ts:205](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/witness/Witness.ts#L205)*

PRIVATE constructor. Do not use. Create new `witness` instances with Witness.create(options)

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

*Defined in [src/witness/Witness.ts:196](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/witness/Witness.ts#L196)*

ABCI transaction broadcaster

___
<a id="currheight"></a>

### `<Private>` currHeight

**● currHeight**: *`number`*

*Defined in [src/witness/Witness.ts:168](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/witness/Witness.ts#L168)*

The "best" (highest) known height of the Ethereum blockchain.

___
<a id="events"></a>

### `<Private>` events

**● events**: *`any`*

*Defined in [src/witness/Witness.ts:202](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/witness/Witness.ts#L202)*

Mapping that tracks pending events from the Ethereum contracts.

___
<a id="finalitythreshold"></a>

### `<Private>` finalityThreshold

**● finalityThreshold**: *`number`*

*Defined in [src/witness/Witness.ts:158](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/witness/Witness.ts#L158)*

THe currently agreed up block-maturation threshold for Ethereum events. This value should be agreed upon by all validators.

___
<a id="generator"></a>

### `<Private>` generator

**● generator**: *[TxGenerator](_src_core_util_txgenerator_.txgenerator.md)*

*Defined in [src/witness/Witness.ts:199](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/witness/Witness.ts#L199)*

ABCI transaction generator and signer (for validators).

___
<a id="initheight"></a>

### `<Private>` initHeight

**● initHeight**: *`number`*

*Defined in [src/witness/Witness.ts:165](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/witness/Witness.ts#L165)*

The height of the Ethereum blockchain when this `Witness` instance was started. Used to check if historical events (before witness started) are confirmed or not.

___
<a id="initialized"></a>

### `<Private>` initialized

**● initialized**: *`boolean`*

*Defined in [src/witness/Witness.ts:133](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/witness/Witness.ts#L133)*

Boolean value that indicates weather or not `.initialize()` has been called sucessfully.

___
<a id="periodend"></a>

### `<Private>` periodEnd

**● periodEnd**: *`number`*

*Defined in [src/witness/Witness.ts:185](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/witness/Witness.ts#L185)*

The block at which current period ends.

___
<a id="periodlength"></a>

### `<Private>` periodLength

**● periodLength**: *`number`*

*Defined in [src/witness/Witness.ts:176](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/witness/Witness.ts#L176)*

The length of the current period (in Ethereum blocks).

___
<a id="periodlimit"></a>

### `<Private>` periodLimit

**● periodLimit**: *`number`*

*Defined in [src/witness/Witness.ts:179](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/witness/Witness.ts#L179)*

The number of transactions accepted in a period. Used for rebalance.

___
<a id="periodnumber"></a>

### `<Private>` periodNumber

**● periodNumber**: *`number`*

*Defined in [src/witness/Witness.ts:173](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/witness/Witness.ts#L173)*

The incremental number tracking the current rebalance period.

___
<a id="periodstart"></a>

### `<Private>` periodStart

**● periodStart**: *`number`*

*Defined in [src/witness/Witness.ts:182](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/witness/Witness.ts#L182)*

The block at which the current period ends.

___
<a id="posterbalances"></a>

### `<Private>` posterBalances

**● posterBalances**: *`PosterBalances`*

*Defined in [src/witness/Witness.ts:205](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/witness/Witness.ts#L205)*

Mapping that tracks poster balances. Used to submit proposals.

___
<a id="stakecontract"></a>

### `<Private>` stakeContract

**● stakeContract**: *`any`*

*Defined in [src/witness/Witness.ts:193](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/witness/Witness.ts#L193)*

The `web3.Contract` instance of the EventEmitter contract, used to interface with the paradigm contract system.

*__todo__*: update to `EventEmitter` contract

___
<a id="started"></a>

### `<Private>` started

**● started**: *`boolean`*

*Defined in [src/witness/Witness.ts:139](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/witness/Witness.ts#L139)*

Boolean value that indicates if the instance is "listening" and attesting to (via ABCI transaction) Ethereum events.

___
<a id="web3"></a>

### `<Private>` web3

**● web3**: *`Web3`*

*Defined in [src/witness/Witness.ts:150](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/witness/Witness.ts#L150)*

The `web3.js` provider instance, configured when assigned based on witness configuration options.

___
<a id="web3provider"></a>

### `<Private>` web3provider

**● web3provider**: *`URL`*

*Defined in [src/witness/Witness.ts:144](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/witness/Witness.ts#L144)*

URL of the configured `web3` provider.

___

## Methods

<a id="connectweb3"></a>

### `<Private>` connectWeb3

▸ **connectWeb3**(): `number`

*Defined in [src/witness/Witness.ts:371](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/witness/Witness.ts#L371)*

Used to create web3 instance (based on provider generated in `this.getProvider()` method).

**Returns:** `number`

___
<a id="execabcitx"></a>

### `<Private>` execAbciTx

▸ **execAbciTx**(tx: *`SignedTransaction`*): `number`

*Defined in [src/witness/Witness.ts:742](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/witness/Witness.ts#L742)*

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

*Defined in [src/witness/Witness.ts:711](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/witness/Witness.ts#L711)*

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

*Defined in [src/witness/Witness.ts:677](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/witness/Witness.ts#L677)*

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

*Defined in [src/witness/Witness.ts:322](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/witness/Witness.ts#L322)*

Used to connect to Web3 provider. Called during initialization, and if a web3 disconnect is detected.

**Returns:** `WebsocketProvider`

___
<a id="handleblock"></a>

### `<Private>` handleBlock

▸ **handleBlock**(error: *`any`*, res: *`any`*): `void`

*Defined in [src/witness/Witness.ts:553](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/witness/Witness.ts#L553)*

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

*Defined in [src/witness/Witness.ts:432](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/witness/Witness.ts#L432)*

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

*Defined in [src/witness/Witness.ts:490](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/witness/Witness.ts#L490)*

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

*Defined in [src/witness/Witness.ts:248](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/witness/Witness.ts#L248)*

Initialize rebalancer instance by connecting to a web3 endpoint and instantiating contract instance. Uses error codes.

**Returns:** `Promise`<`number`>
Promise that resolves to 0 if OK

___
<a id="start"></a>

###  start

▸ **start**(): `number`

*Defined in [src/witness/Witness.ts:286](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/witness/Witness.ts#L286)*

Starts rebalancer instance after node synchronization, and connects to local Tendermint instance via ABCI.

**Returns:** `number`
0 if OK

___
<a id="subscribe"></a>

### `<Private>` subscribe

▸ **subscribe**(from?: *`number`*): `number`

*Defined in [src/witness/Witness.ts:392](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/witness/Witness.ts#L392)*

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

*Defined in [src/witness/Witness.ts:304](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/witness/Witness.ts#L304)*

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

*Defined in [src/witness/Witness.ts:624](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/witness/Witness.ts#L624)*

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

*Defined in [src/witness/Witness.ts:59](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/witness/Witness.ts#L59)*

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

*Defined in [src/witness/Witness.ts:89](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/witness/Witness.ts#L89)*

Generates an output address:limit mapping based on a provided address:balance mapping, and a total throughput limit.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| bals | `PosterBalances` |  current address:balance mapping |
| limit | `number` |  total number of orders accepted per period |

**Returns:** `Limits`

___

