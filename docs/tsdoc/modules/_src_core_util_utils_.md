[paradigm-contracts](../README.md) > ["src/core/util/utils"](../modules/_src_core_util_utils_.md)

# External module: "src/core/util/utils"

## Index

### Functions

* [addConfMaybeApplyEvent](_src_core_util_utils_.md#addconfmaybeapplyevent)
* [addNewEvent](_src_core_util_utils_.md#addnewevent)
* [applyPosterEvent](_src_core_util_utils_.md#applyposterevent)
* [applyValidatorEvent](_src_core_util_utils_.md#applyvalidatorevent)
* [computeConf](_src_core_util_utils_.md#computeconf)
* [createWitnessEventHash](_src_core_util_utils_.md#createwitnesseventhash)
* [createWitnessEventObject](_src_core_util_utils_.md#createwitnesseventobject)
* [decodeTx](_src_core_util_utils_.md#decodetx)
* [genLimits](_src_core_util_utils_.md#genlimits)
* [parseWitness](_src_core_util_utils_.md#parsewitness)
* [preVerifyTx](_src_core_util_utils_.md#preverifytx)
* [stateUpdateConfThreshold](_src_core_util_utils_.md#stateupdateconfthreshold)
* [syncStates](_src_core_util_utils_.md#syncstates)
* [verifyOrder](_src_core_util_utils_.md#verifyorder)

---

## Functions

<a id="addconfmaybeapplyevent"></a>

###  addConfMaybeApplyEvent

▸ **addConfMaybeApplyEvent**(state: *`State`*, tx: *`ParsedWitnessData`*): `boolean`

*Defined in [src/core/util/utils.ts:309](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/core/util/utils.ts#L309)*

Used in `witness` transaction execution. Responsible for increasing the conf counter on pending events, and deterministically applying the event to state if the required confirmation threshold (enough attestations) is reached.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| state | `State` |  the current deliverState object |
| tx | `ParsedWitnessData` |  the witness transaction being executed |

**Returns:** `boolean`

___
<a id="addnewevent"></a>

###  addNewEvent

▸ **addNewEvent**(state: *`State`*, tx: *`ParsedWitnessData`*): `boolean`

*Defined in [src/core/util/utils.ts:255](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/core/util/utils.ts#L255)*

Add a new witness event to state, or add confirmation to existing

*__todo:__*: move logic from witness.ts to here

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| state | `State` |  current state object |
| tx | `ParsedWitnessData` |  the witness attestation tx being executed |

**Returns:** `boolean`

___
<a id="applyposterevent"></a>

###  applyPosterEvent

▸ **applyPosterEvent**(state: *`State`*, tx: *`ParsedWitnessData`*): `boolean`

*Defined in [src/core/util/utils.ts:361](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/core/util/utils.ts#L361)*

Used in `witness` transaction execution, where `witness.subject` is "poster". This function "applies" a pending, and recently confirmed witness event to state, by updating the poster's balance in-state depending on the event type.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| state | `State` |  the current deliverState object |
| tx | `ParsedWitnessData` |  the witness transaction being executed |

**Returns:** `boolean`

___
<a id="applyvalidatorevent"></a>

###  applyValidatorEvent

▸ **applyValidatorEvent**(state: *`State`*, tx: *`ParsedWitnessData`*): `boolean`

*Defined in [src/core/util/utils.ts:440](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/core/util/utils.ts#L440)*

Used in `witness` transaction execution, where `witness.subject` is "validator". This function "applies" a pending, and recently confirmed witness event to state, by updating the validator's balance in-state depending on the event type (add vs remove).

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| state | `State` |  the current deliverState object |
| tx | `ParsedWitnessData` |  the witness transaction being executed |

**Returns:** `boolean`

___
<a id="computeconf"></a>

###  computeConf

▸ **computeConf**(active: *`number`*): `number`

*Defined in [src/core/util/utils.ts:102](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/core/util/utils.ts#L102)*

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

*Defined in [src/core/util/utils.ts:454](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/core/util/utils.ts#L454)*

Creates a hash of a witness event, for validation inside state machine

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| tx | `WitnessData` |  a raw witness transaction |

**Returns:** `string`

___
<a id="createwitnesseventobject"></a>

###  createWitnessEventObject

▸ **createWitnessEventObject**(subject: *`string`*, type: *`string`*, amount: *`string`*, block: *`number`*, address: *`string`*, publicKey?: *`string`*): `WitnessData`

*Defined in [src/core/util/utils.ts:477](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/core/util/utils.ts#L477)*

Creates a witness tx object from raw input data.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| subject | `string` |  state modification subject (validator or poster) |
| type | `string` |  state modification type (add or remove) |
| amount | `string` |  amount of tokens (added or removed) to modify by |
| block | `number` |  the block number (ethereum) of the event |
| address | `string` |  ethereum address of the relevant party |
| `Optional` publicKey | `string` |  tendermint public key (only for validator witness tx's) |

**Returns:** `WitnessData`

___
<a id="decodetx"></a>

###  decodeTx

▸ **decodeTx**(raw: *`Buffer`*): `SignedTransaction`

*Defined in [src/core/util/utils.ts:92](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/core/util/utils.ts#L92)*

Decode and decompress input transaction. Wrapper for PayloadCipher class.

*__todo__*: implement logic directly in this function

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| raw | `Buffer` |  encoded/compressed raw transaction |

**Returns:** `SignedTransaction`

___
<a id="genlimits"></a>

###  genLimits

▸ **genLimits**(posters: *`PosterInfo`*, limit: *`number`*): `Limits`

*Defined in [src/core/util/utils.ts:148](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/core/util/utils.ts#L148)*

Generates a rate-limit mapping based on staked balances and the total order limit per staking period, from in-state 'posters' object.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| posters | `PosterInfo` |  current in-state poster balances/limits |
| limit | `number` |  the total number of orders accepted in the period |

**Returns:** `Limits`

___
<a id="parsewitness"></a>

###  parseWitness

▸ **parseWitness**(data: *`WitnessData`*): `ParsedWitnessData`

*Defined in [src/core/util/utils.ts:188](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/core/util/utils.ts#L188)*

Parses and validates a `witness` transaction from a validator's witness module.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| data | `WitnessData` |  raw witness event transaction (from Witness module) |

**Returns:** `ParsedWitnessData`

___
<a id="preverifytx"></a>

###  preVerifyTx

▸ **preVerifyTx**(tx: *`SignedTransaction`*, state: *`State`*): `boolean`

*Defined in [src/core/util/utils.ts:37](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/core/util/utils.ts#L37)*

Verify validator signature, and confirm transaction originated from an active validator.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| tx | `SignedTransaction` |  signed transaction object (decoded) |
| state | `State` |  current state |

**Returns:** `boolean`

___
<a id="stateupdateconfthreshold"></a>

###  stateUpdateConfThreshold

▸ **stateUpdateConfThreshold**(state: *`State`*, last: *`object`[]*): `void`

*Defined in [src/core/util/utils.ts:121](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/core/util/utils.ts#L121)*

Compute and apply the value of 2/3 the active validators as the required confirmation threshold for pending events. Essentially a wrapper (that applies transition) of `computeConf()`.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| state | `State` |  current network state object |
| last | `object`[] |  array of 'lastVotes' (from RequestBeginBlock) |

**Returns:** `void`

___
<a id="syncstates"></a>

###  syncStates

▸ **syncStates**(source: *`State`*, target: *`State`*): `void`

*Defined in [src/core/util/utils.ts:75](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/core/util/utils.ts#L75)*

Clones the 'source' state into the 'target' state.

*__todo__*: expand, add additional checks

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| source | `State` |  the state to copy FROM |
| target | `State` |  the state to copy TO |

**Returns:** `void`

___
<a id="verifyorder"></a>

###  verifyOrder

▸ **verifyOrder**(order: *`any`*, state: *`State`*): `boolean`

*Defined in [src/core/util/utils.ts:132](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/core/util/utils.ts#L132)*

Verify an order conforms to max size requirement.

*__todo__*: make size parameter an in-state parameter

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| order | `any` |  paradigm order object |
| state | `State` |

**Returns:** `boolean`

___

