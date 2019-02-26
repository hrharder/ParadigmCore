[ParadigmCore](../README.md) > ["witness/Witness"](../modules/_witness_witness_.md) > [Witness](../classes/_witness_witness_.witness.md)

# Class: Witness

A Witness supports a one way peg-zone between Ethereum and the OrderStream to enable tracking of the PosterStaking contract and witness events.

See spec for more details.

## Hierarchy

**Witness**

## Index

### Constructors

* [constructor](_witness_witness_.witness.md#constructor)

### Properties

* [currHeight](_witness_witness_.witness.md#currheight)
* [eventEmitterContract](_witness_witness_.witness.md#eventemittercontract)
* [events](_witness_witness_.witness.md#events)
* [finalityThreshold](_witness_witness_.witness.md#finalitythreshold)
* [generator](_witness_witness_.witness.md#generator)
* [initHeight](_witness_witness_.witness.md#initheight)
* [initialized](_witness_witness_.witness.md#initialized)
* [periodEnd](_witness_witness_.witness.md#periodend)
* [periodLength](_witness_witness_.witness.md#periodlength)
* [periodLimit](_witness_witness_.witness.md#periodlimit)
* [periodNumber](_witness_witness_.witness.md#periodnumber)
* [periodStart](_witness_witness_.witness.md#periodstart)
* [posterBalances](_witness_witness_.witness.md#posterbalances)
* [rebalanceEmitter](_witness_witness_.witness.md#rebalanceemitter)
* [reconnAttempts](_witness_witness_.witness.md#reconnattempts)
* [reconnInterval](_witness_witness_.witness.md#reconninterval)
* [started](_witness_witness_.witness.md#started)
* [tmRpc](_witness_witness_.witness.md#tmrpc)
* [tmRpcUrl](_witness_witness_.witness.md#tmrpcurl)
* [txEmitter](_witness_witness_.witness.md#txemitter)
* [txQueue](_witness_witness_.witness.md#txqueue)
* [web3](_witness_witness_.witness.md#web3)
* [web3provider](_witness_witness_.witness.md#web3provider)

### Methods

* [connectWeb3](_witness_witness_.witness.md#connectweb3)
* [execEventTx](_witness_witness_.witness.md#execeventtx)
* [execRebalanceTx](_witness_witness_.witness.md#execrebalancetx)
* [getProvider](_witness_witness_.witness.md#getprovider)
* [handleBlock](_witness_witness_.witness.md#handleblock)
* [handleParadigmEvent](_witness_witness_.witness.md#handleparadigmevent)
* [initialize](_witness_witness_.witness.md#initialize)
* [start](_witness_witness_.witness.md#start)
* [subscribe](_witness_witness_.witness.md#subscribe)
* [synchronize](_witness_witness_.witness.md#synchronize)
* [updateBalance](_witness_witness_.witness.md#updatebalance)
* [create](_witness_witness_.witness.md#create)
* [genLimits](_witness_witness_.witness.md#genlimits)

---

## Constructors

<a id="constructor"></a>

### `<Private>` constructor

⊕ **new Witness**(opts: *`any`*): [Witness](_witness_witness_.witness.md)

*Defined in [witness/Witness.ts:217](https://github.com/paradigmfoundation/paradigmcore/blob/adc87ed/src/witness/Witness.ts#L217)*

PRIVATE constructor. Do not use. Create new `witness` instances with Witness.create(options)

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| opts | `any` |  options object - see .create() docstring |

**Returns:** [Witness](_witness_witness_.witness.md)

___

## Properties

<a id="currheight"></a>

### `<Private>` currHeight

**● currHeight**: *`number`*

*Defined in [witness/Witness.ts:162](https://github.com/paradigmfoundation/paradigmcore/blob/adc87ed/src/witness/Witness.ts#L162)*

The "best" (highest) known height of the Ethereum blockchain.

___
<a id="eventemittercontract"></a>

### `<Private>` eventEmitterContract

**● eventEmitterContract**: *`any`*

*Defined in [witness/Witness.ts:192](https://github.com/paradigmfoundation/paradigmcore/blob/adc87ed/src/witness/Witness.ts#L192)*

The `web3.Contract` instance of the EventEmitter contract, used to interface with the paradigm contract system.

___
<a id="events"></a>

### `<Private>` events

**● events**: *`any`*

*Defined in [witness/Witness.ts:210](https://github.com/paradigmfoundation/paradigmcore/blob/adc87ed/src/witness/Witness.ts#L210)*

Mapping that tracks pending events from the Ethereum contracts.

___
<a id="finalitythreshold"></a>

### `<Private>` finalityThreshold

**● finalityThreshold**: *`number`*

*Defined in [witness/Witness.ts:152](https://github.com/paradigmfoundation/paradigmcore/blob/adc87ed/src/witness/Witness.ts#L152)*

THe currently agreed up block-maturation threshold for Ethereum events. This value should be agreed upon by all validators.

___
<a id="generator"></a>

### `<Private>` generator

**● generator**: *[TxGenerator](_core_util_txgenerator_.txgenerator.md)*

*Defined in [witness/Witness.ts:207](https://github.com/paradigmfoundation/paradigmcore/blob/adc87ed/src/witness/Witness.ts#L207)*

ABCI transaction generator and signer (for validators).

___
<a id="initheight"></a>

### `<Private>` initHeight

**● initHeight**: *`number`*

*Defined in [witness/Witness.ts:159](https://github.com/paradigmfoundation/paradigmcore/blob/adc87ed/src/witness/Witness.ts#L159)*

The height of the Ethereum blockchain when this `Witness` instance was started. Used to check if historical events (before witness started) are confirmed or not.

___
<a id="initialized"></a>

### `<Private>` initialized

**● initialized**: *`boolean`*

*Defined in [witness/Witness.ts:127](https://github.com/paradigmfoundation/paradigmcore/blob/adc87ed/src/witness/Witness.ts#L127)*

Boolean value that indicates weather or not `.initialize()` has been called successfully.

___
<a id="periodend"></a>

### `<Private>` periodEnd

**● periodEnd**: *`number`*

*Defined in [witness/Witness.ts:179](https://github.com/paradigmfoundation/paradigmcore/blob/adc87ed/src/witness/Witness.ts#L179)*

The block at which current period ends.

___
<a id="periodlength"></a>

### `<Private>` periodLength

**● periodLength**: *`number`*

*Defined in [witness/Witness.ts:170](https://github.com/paradigmfoundation/paradigmcore/blob/adc87ed/src/witness/Witness.ts#L170)*

The length of the current period (in Ethereum blocks).

___
<a id="periodlimit"></a>

### `<Private>` periodLimit

**● periodLimit**: *`number`*

*Defined in [witness/Witness.ts:173](https://github.com/paradigmfoundation/paradigmcore/blob/adc87ed/src/witness/Witness.ts#L173)*

The number of transactions accepted in a period. Used for rebalance.

___
<a id="periodnumber"></a>

### `<Private>` periodNumber

**● periodNumber**: *`number`*

*Defined in [witness/Witness.ts:167](https://github.com/paradigmfoundation/paradigmcore/blob/adc87ed/src/witness/Witness.ts#L167)*

The incremental number tracking the current rebalance period.

___
<a id="periodstart"></a>

### `<Private>` periodStart

**● periodStart**: *`number`*

*Defined in [witness/Witness.ts:176](https://github.com/paradigmfoundation/paradigmcore/blob/adc87ed/src/witness/Witness.ts#L176)*

The block at which the current period ends.

___
<a id="posterbalances"></a>

### `<Private>` posterBalances

**● posterBalances**: *`PosterBalances`*

*Defined in [witness/Witness.ts:213](https://github.com/paradigmfoundation/paradigmcore/blob/adc87ed/src/witness/Witness.ts#L213)*

Mapping that tracks poster balances. Used to submit proposals.

___
<a id="rebalanceemitter"></a>

### `<Private>` rebalanceEmitter

**● rebalanceEmitter**: *`EventEmitter`*

*Defined in [witness/Witness.ts:186](https://github.com/paradigmfoundation/paradigmcore/blob/adc87ed/src/witness/Witness.ts#L186)*

Event emitter triggered when a rebalance TX is included in a block.

*__todo__*: better doc

___
<a id="reconnattempts"></a>

### `<Private>` reconnAttempts

**● reconnAttempts**: *`number`*

*Defined in [witness/Witness.ts:201](https://github.com/paradigmfoundation/paradigmcore/blob/adc87ed/src/witness/Witness.ts#L201)*

Number of time to attempt to recover connection to Tendermint RPC.

___
<a id="reconninterval"></a>

### `<Private>` reconnInterval

**● reconnInterval**: *`number`*

*Defined in [witness/Witness.ts:204](https://github.com/paradigmfoundation/paradigmcore/blob/adc87ed/src/witness/Witness.ts#L204)*

Interval (in ms) between each attempt to reconnect with the RPC server.

___
<a id="started"></a>

### `<Private>` started

**● started**: *`boolean`*

*Defined in [witness/Witness.ts:133](https://github.com/paradigmfoundation/paradigmcore/blob/adc87ed/src/witness/Witness.ts#L133)*

Boolean value that indicates if the instance is "listening" and attesting to (via ABCI transaction) Ethereum events.

___
<a id="tmrpc"></a>

### `<Private>` tmRpc

**● tmRpc**: *[TendermintRPC](_common_tendermintrpc_.tendermintrpc.md)*

*Defined in [witness/Witness.ts:195](https://github.com/paradigmfoundation/paradigmcore/blob/adc87ed/src/witness/Witness.ts#L195)*

Witness class's connection to the Tendermint RPC server.

___
<a id="tmrpcurl"></a>

### `<Private>` tmRpcUrl

**● tmRpcUrl**: *`URL`*

*Defined in [witness/Witness.ts:198](https://github.com/paradigmfoundation/paradigmcore/blob/adc87ed/src/witness/Witness.ts#L198)*

Node URL object of provided Tendermint RPC URl.

___
<a id="txemitter"></a>

### `<Private>` txEmitter

**● txEmitter**: *`EventEmitter`*

*Defined in [witness/Witness.ts:215](https://github.com/paradigmfoundation/paradigmcore/blob/adc87ed/src/witness/Witness.ts#L215)*

___
<a id="txqueue"></a>

### `<Private>` txQueue

**● txQueue**: *`SignedTransaction`[]*

*Defined in [witness/Witness.ts:217](https://github.com/paradigmfoundation/paradigmcore/blob/adc87ed/src/witness/Witness.ts#L217)*

___
<a id="web3"></a>

### `<Private>` web3

**● web3**: *`Web3`*

*Defined in [witness/Witness.ts:144](https://github.com/paradigmfoundation/paradigmcore/blob/adc87ed/src/witness/Witness.ts#L144)*

The `web3.js` provider instance, configured when assigned based on witness configuration options.

___
<a id="web3provider"></a>

### `<Private>` web3provider

**● web3provider**: *`URL`*

*Defined in [witness/Witness.ts:138](https://github.com/paradigmfoundation/paradigmcore/blob/adc87ed/src/witness/Witness.ts#L138)*

URL of the configured `web3` provider.

___

## Methods

<a id="connectweb3"></a>

### `<Private>` connectWeb3

▸ **connectWeb3**(): `number`

*Defined in [witness/Witness.ts:421](https://github.com/paradigmfoundation/paradigmcore/blob/adc87ed/src/witness/Witness.ts#L421)*

Used to create web3 instance (based on provider generated in `this.getProvider()` method).

**Returns:** `number`

___
<a id="execeventtx"></a>

### `<Private>` execEventTx

▸ **execEventTx**(event: *`WitnessData`*): `Promise`<`void`>

*Defined in [witness/Witness.ts:644](https://github.com/paradigmfoundation/paradigmcore/blob/adc87ed/src/witness/Witness.ts#L644)*

Generate and send and event witness transaction.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| event | `WitnessData` |  event object |

**Returns:** `Promise`<`void`>

___
<a id="execrebalancetx"></a>

### `<Private>` execRebalanceTx

▸ **execRebalanceTx**(round: *`any`*, start: *`any`*, length: *`any`*): `SignedTransaction`

*Defined in [witness/Witness.ts:609](https://github.com/paradigmfoundation/paradigmcore/blob/adc87ed/src/witness/Witness.ts#L609)*

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

*Defined in [witness/Witness.ts:372](https://github.com/paradigmfoundation/paradigmcore/blob/adc87ed/src/witness/Witness.ts#L372)*

Used to connect to Web3 provider. Called during initialization, and if a web3 disconnect is detected.

**Returns:** `WebsocketProvider`

___
<a id="handleblock"></a>

### `<Private>` handleBlock

▸ **handleBlock**(error: *`any`*, res: *`any`*): `void`

*Defined in [witness/Witness.ts:525](https://github.com/paradigmfoundation/paradigmcore/blob/adc87ed/src/witness/Witness.ts#L525)*

New Ethereum block event handler. Updates balances and executes ABCI transactions at appropriate finality blocks.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| error | `any` |  error object |
| res | `any` |  event response object |

**Returns:** `void`

___
<a id="handleparadigmevent"></a>

### `<Private>` handleParadigmEvent

▸ **handleParadigmEvent**(error: *`any`*, res: *`any`*): `void`

*Defined in [witness/Witness.ts:482](https://github.com/paradigmfoundation/paradigmcore/blob/adc87ed/src/witness/Witness.ts#L482)*

Stake event handler. NOTE: events are indexed by the block they occur in, not the finality block for that event.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| error | `any` |  error object |
| res | `any` |  event response object |

**Returns:** `void`

___
<a id="initialize"></a>

###  initialize

▸ **initialize**(): `Promise`<`number`>

*Defined in [witness/Witness.ts:288](https://github.com/paradigmfoundation/paradigmcore/blob/adc87ed/src/witness/Witness.ts#L288)*

Initialize rebalancer instance by connecting to a web3 endpoint and instantiating contract instance. Uses error codes.

**Returns:** `Promise`<`number`>
Promise that resolves to 0 if OK

___
<a id="start"></a>

###  start

▸ **start**(): `Promise`<`number`>

*Defined in [witness/Witness.ts:326](https://github.com/paradigmfoundation/paradigmcore/blob/adc87ed/src/witness/Witness.ts#L326)*

Starts rebalancer instance after node synchronization, and connects to local Tendermint instance via ABCI.

**Returns:** `Promise`<`number`>
0 if OK

___
<a id="subscribe"></a>

### `<Private>` subscribe

▸ **subscribe**(from?: *`number`*): `number`

*Defined in [witness/Witness.ts:442](https://github.com/paradigmfoundation/paradigmcore/blob/adc87ed/src/witness/Witness.ts#L442)*

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

*Defined in [witness/Witness.ts:353](https://github.com/paradigmfoundation/paradigmcore/blob/adc87ed/src/witness/Witness.ts#L353)*

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

*Defined in [witness/Witness.ts:583](https://github.com/paradigmfoundation/paradigmcore/blob/adc87ed/src/witness/Witness.ts#L583)*

Perform "state transition" of instance balances. NOTE: this function does not modify the state of the ABCI application, however it implements the same logic as the state machine to ensure balances in state are up-to-date with the instance balances.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| event | `WitnessData` |  event object |

**Returns:** `void`

___
<a id="create"></a>

### `<Static>` create

▸ **create**(options: *`any`*): `Promise`<[Witness](_witness_witness_.witness.md)>

*Defined in [witness/Witness.ts:59](https://github.com/paradigmfoundation/paradigmcore/blob/adc87ed/src/witness/Witness.ts#L59)*

Static generator to create new rebalancer instances.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| options | `any` |  options object with the following parameters:*   options.provider {string} web3 provider URL*   options.periodLimit {number} max transactions per period*   options.periodLength {number} staking period length (ETH blocks)*   options.finalityThreshold {number} required block maturity*   options.tendermintRpcUrl {string} url of the local tendermint rpc server*   options.txGenerator {TxGenerator} tx generator/signer |

**Returns:** `Promise`<[Witness](_witness_witness_.witness.md)>
Promise that resolves to a new rebalancer instance.

___
<a id="genlimits"></a>

### `<Static>` genLimits

▸ **genLimits**(bals: *`PosterBalances`*, limit: *`number`*): `Limits`

*Defined in [witness/Witness.ts:89](https://github.com/paradigmfoundation/paradigmcore/blob/adc87ed/src/witness/Witness.ts#L89)*

Generates an output address:limit mapping based on a provided address:balance mapping, and a total throughput limit.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| bals | `PosterBalances` |  current address:balance mapping |
| limit | `number` |  total number of orders accepted per period |

**Returns:** `Limits`

___

