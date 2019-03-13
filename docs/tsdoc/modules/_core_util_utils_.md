[ParadigmCore](../README.md) > ["core/util/utils"](../modules/_core_util_utils_.md)

# External module: "core/util/utils"

## Index

### Functions

* [addConfMaybeApplyEvent](_core_util_utils_.md#addconfmaybeapplyevent)
* [addNewEvent](_core_util_utils_.md#addnewevent)
* [applyPosterEvent](_core_util_utils_.md#applyposterevent)
* [applyValidatorEvent](_core_util_utils_.md#applyvalidatorevent)
* [computeConf](_core_util_utils_.md#computeconf)
* [createWitnessEventHash](_core_util_utils_.md#createwitnesseventhash)
* [createWitnessEventObject](_core_util_utils_.md#createwitnesseventobject)
* [decodeTx](_core_util_utils_.md#decodetx)
* [encodeTx](_core_util_utils_.md#encodetx)
* [genLimits](_core_util_utils_.md#genlimits)
* [invalidTx](_core_util_utils_.md#invalidtx)
* [newKVPair](_core_util_utils_.md#newkvpair)
* [parseWitness](_core_util_utils_.md#parsewitness)
* [preVerifyTx](_core_util_utils_.md#preverifytx)
* [stateUpdateConfThreshold](_core_util_utils_.md#stateupdateconfthreshold)
* [syncStates](_core_util_utils_.md#syncstates)
* [validTx](_core_util_utils_.md#validtx)
* [verifyOrder](_core_util_utils_.md#verifyorder)

---

## Functions

<a id="addconfmaybeapplyevent"></a>

###  addConfMaybeApplyEvent

▸ **addConfMaybeApplyEvent**(state: *`IState`*, tx: *`ParsedWitnessData`*): `boolean`

*Defined in [core/util/utils.ts:366](https://github.com/paradigmfoundation/paradigmcore/blob/e540330/src/core/util/utils.ts#L366)*

Used in `witness` transaction execution. Responsible for increasing the conf counter on pending events, and deterministically applying the event to state if the required confirmation threshold (enough attestations) is reached.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| state | `IState` |  the current deliverState object |
| tx | `ParsedWitnessData` |  the witness transaction being executed |

**Returns:** `boolean`

___
<a id="addnewevent"></a>

###  addNewEvent

▸ **addNewEvent**(state: *`IState`*, tx: *`ParsedWitnessData`*): `boolean`

*Defined in [core/util/utils.ts:306](https://github.com/paradigmfoundation/paradigmcore/blob/e540330/src/core/util/utils.ts#L306)*

Add a new witness event to state, or add confirmation to existing

*__todo:__*: move logic from witness.ts to here

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| state | `IState` |  current state object |
| tx | `ParsedWitnessData` |  the witness attestation tx being executed |

**Returns:** `boolean`

___
<a id="applyposterevent"></a>

###  applyPosterEvent

▸ **applyPosterEvent**(state: *`IState`*, tx: *`ParsedWitnessData`*): `boolean`

*Defined in [core/util/utils.ts:418](https://github.com/paradigmfoundation/paradigmcore/blob/e540330/src/core/util/utils.ts#L418)*

Used in `witness` transaction execution, where `witness.subject` is "poster". This function "applies" a pending, and recently confirmed witness event to state, by updating the poster's balance in-state depending on the event type.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| state | `IState` |  the current deliverState object |
| tx | `ParsedWitnessData` |  the witness transaction being executed |

**Returns:** `boolean`

___
<a id="applyvalidatorevent"></a>

###  applyValidatorEvent

▸ **applyValidatorEvent**(state: *`IState`*, tx: *`ParsedWitnessData`*): `boolean`

*Defined in [core/util/utils.ts:483](https://github.com/paradigmfoundation/paradigmcore/blob/e540330/src/core/util/utils.ts#L483)*

Used in `witness` transaction execution, where `witness.subject` is "validator". This function "applies" a pending, and recently confirmed witness event to state, by updating the validator's balance in-state depending on the event type (add vs remove).

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| state | `IState` |  the current deliverState object |
| tx | `ParsedWitnessData` |  the witness transaction being executed |

**Returns:** `boolean`

___
<a id="computeconf"></a>

###  computeConf

▸ **computeConf**(active: *`number`*): `number`

*Defined in [core/util/utils.ts:163](https://github.com/paradigmfoundation/paradigmcore/blob/e540330/src/core/util/utils.ts#L163)*

Compute the witness confirmation threshold based on number of active validators.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| active | `number` |  number of active validators (or initial) |

**Returns:** `number`

___
<a id="createwitnesseventhash"></a>

###  createWitnessEventHash

▸ **createWitnessEventHash**(tx: *`WitnessData`*): `string`

*Defined in [core/util/utils.ts:497](https://github.com/paradigmfoundation/paradigmcore/blob/e540330/src/core/util/utils.ts#L497)*

Creates a hash of a witness event, for validation inside state machine

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| tx | `WitnessData` |  a raw witness transaction |

**Returns:** `string`

___
<a id="createwitnesseventobject"></a>

###  createWitnessEventObject

▸ **createWitnessEventObject**(eventData: *`ParadigmEvent`*, block: *`number`*): `WitnessData`

*Defined in [core/util/utils.ts:520](https://github.com/paradigmfoundation/paradigmcore/blob/e540330/src/core/util/utils.ts#L520)*

Creates a witness tx object from raw input data.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| eventData | `ParadigmEvent` |
| block | `number` |  the block number (ethereum) of the event |

**Returns:** `WitnessData`

___
<a id="decodetx"></a>

###  decodeTx

▸ **decodeTx**(raw: *`Buffer`*): `SignedTransaction`

*Defined in [core/util/utils.ts:92](https://github.com/paradigmfoundation/paradigmcore/blob/e540330/src/core/util/utils.ts#L92)*

Decode and decompress input transaction.

*__todo__*: better document

*__todo__*: deterministic stringify/buffer

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| raw | `Buffer` |  encoded/compressed raw transaction |

**Returns:** `SignedTransaction`

___
<a id="encodetx"></a>

###  encodeTx

▸ **encodeTx**(raw: *`SignedTransaction`*): `string`

*Defined in [core/util/utils.ts:121](https://github.com/paradigmfoundation/paradigmcore/blob/e540330/src/core/util/utils.ts#L121)*

Encode and compress input transaction.

*__todo__*: better document

*__todo__*: deterministic stringify/buffer

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| raw | `SignedTransaction` |  encoded/compressed raw transaction |

**Returns:** `string`

___
<a id="genlimits"></a>

###  genLimits

▸ **genLimits**(posters: *`PosterInfo`*, limit: *`number`*): `Limits`

*Defined in [core/util/utils.ts:209](https://github.com/paradigmfoundation/paradigmcore/blob/e540330/src/core/util/utils.ts#L209)*

Generates a rate-limit mapping based on staked balances and the total order limit per staking period, from in-state 'posters' object.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| posters | `PosterInfo` |  current in-state poster balances/limits |
| limit | `number` |  the total number of orders accepted in the period |

**Returns:** `Limits`

___
<a id="invalidtx"></a>

###  invalidTx

▸ **invalidTx**(logMsg?: *`string`*, tags?: *`KVPair`[]*, code?: *`number`*): `ResponseDeliverTx` \| `ResponseCheckTx`

*Defined in [core/util/utils.ts:603](https://github.com/paradigmfoundation/paradigmcore/blob/e540330/src/core/util/utils.ts#L603)*

Generate a response for an invalid ABCI tx.

This function returns an object that conforms to the `ResponseDeliverTx` and/or `ResponseCheckTx` interfaces.

Optionally, pass a third `code` parameter to override the default `invalid` code (1). If a 0 (the valid code) is passed in, the function will throw.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| `Optional` logMsg | `string` |  string output from the tx execution function |
| `Optional` tags | `KVPair`[] |  tags to be included in the tendermint chain |
| `Optional` code | `number` |  an optional non-0 code to override the default invalid code with |

**Returns:** `ResponseDeliverTx` \| `ResponseCheckTx`

___
<a id="newkvpair"></a>

###  newKVPair

▸ **newKVPair**(keyStr: *`string`*, val: *`string` \| `number`*): `KVPair`

*Defined in [core/util/utils.ts:151](https://github.com/paradigmfoundation/paradigmcore/blob/e540330/src/core/util/utils.ts#L151)*

Returns an ABCI transaction/event tag (as in ResponseDelverTx)

**Parameters:**

| Name | Type |
| ------ | ------ |
| keyStr | `string` |
| val | `string` \| `number` |

**Returns:** `KVPair`

___
<a id="parsewitness"></a>

###  parseWitness

▸ **parseWitness**(data: *`WitnessData`*): `ParsedWitnessData`

*Defined in [core/util/utils.ts:243](https://github.com/paradigmfoundation/paradigmcore/blob/e540330/src/core/util/utils.ts#L243)*

Parses and validates a `witness` transaction from a validator's witness module.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| data | `WitnessData` |  raw witness event transaction (from Witness module) |

**Returns:** `ParsedWitnessData`

___
<a id="preverifytx"></a>

###  preVerifyTx

▸ **preVerifyTx**(tx: *`SignedTransaction`*, state: *`IState`*): `boolean`

*Defined in [core/util/utils.ts:36](https://github.com/paradigmfoundation/paradigmcore/blob/e540330/src/core/util/utils.ts#L36)*

Verify validator signature, and confirm transaction originated from an active validator.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| tx | `SignedTransaction` |  signed transaction object (decoded) |
| state | `IState` |  current state |

**Returns:** `boolean`

___
<a id="stateupdateconfthreshold"></a>

###  stateUpdateConfThreshold

▸ **stateUpdateConfThreshold**(state: *`IState`*, last: *`object`[]*): `void`

*Defined in [core/util/utils.ts:182](https://github.com/paradigmfoundation/paradigmcore/blob/e540330/src/core/util/utils.ts#L182)*

Compute and apply the value of 2/3 the active validators as the required confirmation threshold for pending events. Essentially a wrapper (that applies transition) of `computeConf()`.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| state | `IState` |  current network state object |
| last | `object`[] |  array of 'lastVotes' (from RequestBeginBlock) |

**Returns:** `void`

___
<a id="syncstates"></a>

###  syncStates

▸ **syncStates**(source: *`IState`*, target: *`IState`*): `void`

*Defined in [core/util/utils.ts:74](https://github.com/paradigmfoundation/paradigmcore/blob/e540330/src/core/util/utils.ts#L74)*

Clones the 'source' state into the 'target' state.

*__todo__*: expand, add additional checks

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| source | `IState` |  the state to copy FROM |
| target | `IState` |  the state to copy TO |

**Returns:** `void`

___
<a id="validtx"></a>

###  validTx

▸ **validTx**(log?: *`string`*, tags?: *`KVPair`[]*): `ResponseDeliverTx` \| `ResponseCheckTx`

*Defined in [core/util/utils.ts:575](https://github.com/paradigmfoundation/paradigmcore/blob/e540330/src/core/util/utils.ts#L575)*

Generate a response for a valid ABCI tx

This function returns an object that conforms to the `ResponseDeliverTx` and/or `ResponseCheckTx` interfaces.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| `Optional` log | `string` |  string output from the tx execution function |
| `Optional` tags | `KVPair`[] |  tags to be included in the tendermint chain |

**Returns:** `ResponseDeliverTx` \| `ResponseCheckTx`

___
<a id="verifyorder"></a>

###  verifyOrder

▸ **verifyOrder**(order: *`any`*, state: *`IState`*): `boolean`

*Defined in [core/util/utils.ts:193](https://github.com/paradigmfoundation/paradigmcore/blob/e540330/src/core/util/utils.ts#L193)*

Verify an order conforms to max size requirement.

*__todo__*: make size parameter an in-state parameter

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| order | `any` |  paradigm order object |
| state | `IState` |

**Returns:** `boolean`

___

