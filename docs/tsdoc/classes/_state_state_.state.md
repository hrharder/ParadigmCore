[ParadigmCore](../README.md) > ["state/State"](../modules/_state_state_.md) > [State](../classes/_state_state_.state.md)

# Class: State

A class representing the OrderStream network state.

Provides methods for hashing (generation of `AppHash` and Merkle root) and various state transitions.

## Hierarchy

**State**

## Index

### Constructors

* [constructor](_state_state_.state.md#constructor)

### Properties

* [_path](_state_state_.state.md#_path)
* [_readOnly](_state_state_.state.md#_readonly)
* [consensusParams](_state_state_.state.md#consensusparams)
* [events](_state_state_.state.md#events)
* [lastBlockAppHash](_state_state_.state.md#lastblockapphash)
* [lastBlockHeight](_state_state_.state.md#lastblockheight)
* [lastEvent](_state_state_.state.md#lastevent)
* [orderCounter](_state_state_.state.md#ordercounter)
* [posters](_state_state_.state.md#posters)
* [round](_state_state_.state.md#round)
* [validators](_state_state_.state.md#validators)

### Methods

* [acceptNew](_state_state_.state.md#acceptnew)
* [applyOrderTx](_state_state_.state.md#applyordertx)
* [applyRebalanceTx](_state_state_.state.md#applyrebalancetx)
* [applyWitnessTx](_state_state_.state.md#applywitnesstx)
* [generateAppHash](_state_state_.state.md#generateapphash)
* [internalReadFile](_state_state_.state.md#internalreadfile)
* [internalWriteFile](_state_state_.state.md#internalwritefile)
* [readFromDisk](_state_state_.state.md#readfromdisk)
* [toJSON](_state_state_.state.md#tojson)
* [updateHashBoolean](_state_state_.state.md#updatehashboolean)
* [updateHashNumber](_state_state_.state.md#updatehashnumber)
* [updateHashObject](_state_state_.state.md#updatehashobject)
* [updateHashString](_state_state_.state.md#updatehashstring)
* [updateHashUndefined](_state_state_.state.md#updatehashundefined)
* [updateHashValue](_state_state_.state.md#updatehashvalue)
* [writeToDisk](_state_state_.state.md#writetodisk)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new State**(readOnly: *`boolean`*, path?: *`string`*, name?: *`string`*): [State](_state_state_.state.md)

*Defined in [state/State.ts:100](https://github.com/paradigmfoundation/paradigmcore/blob/f3a8acd/src/state/State.ts#L100)*

Create a new `State` object instance.

Initializes a null (genesis) state object. The hash of a null state (the `AppHash`) will always be the same.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| readOnly | `boolean` |
| `Optional` path | `string` |  the (absolute) path to write state contents to disk with |
| `Optional` name | `string` |

**Returns:** [State](_state_state_.state.md)

___

## Properties

<a id="_path"></a>

### `<Private>` _path

**● _path**: *`URL`*

*Defined in [state/State.ts:91](https://github.com/paradigmfoundation/paradigmcore/blob/f3a8acd/src/state/State.ts#L91)*

The (absolute) file path to read to and write from.

___
<a id="_readonly"></a>

### `<Private>` _readOnly

**● _readOnly**: *`boolean`*

*Defined in [state/State.ts:100](https://github.com/paradigmfoundation/paradigmcore/blob/f3a8acd/src/state/State.ts#L100)*

If set to true, the `State` instance will ONLY read, and will refuse to write to disk.

Useful when managing many state instances, with only one that should be committed to disk with each block.

___
<a id="consensusparams"></a>

###  consensusParams

**● consensusParams**: *`ConsensusParams`*

*Defined in [state/State.ts:67](https://github.com/paradigmfoundation/paradigmcore/blob/f3a8acd/src/state/State.ts#L67)*

A variety of consensus-critical parameters are stored in the `consensusParams` mapping. Keep in mind that the app-state consensus parameters (this object) is separate from the Tendermint-specific consensus parameters, such as `MaxBlockSize`.

___
<a id="events"></a>

###  events

**● events**: *`Events`*

*Defined in [state/State.ts:38](https://github.com/paradigmfoundation/paradigmcore/blob/f3a8acd/src/state/State.ts#L38)*

Pending witness attestations (delivered via `witness` transactions) are stored here while they await confirmation by sufficient validators submitting attestations to the same event. Indexed by block, then by a hash of the event data, you can read more about hte \[\[Events\]\] interface.

___
<a id="lastblockapphash"></a>

###  lastBlockAppHash

**● lastBlockAppHash**: *`Buffer`*

*Defined in [state/State.ts:84](https://github.com/paradigmfoundation/paradigmcore/blob/f3a8acd/src/state/State.ts#L84)*

The `AppHash` of the previous commit.

___
<a id="lastblockheight"></a>

###  lastBlockHeight

**● lastBlockHeight**: *`number`*

*Defined in [state/State.ts:79](https://github.com/paradigmfoundation/paradigmcore/blob/f3a8acd/src/state/State.ts#L79)*

The last Tendermint block height at which a successful commit occurred.

___
<a id="lastevent"></a>

###  lastEvent

**● lastEvent**: *`number`*

*Defined in [state/State.ts:59](https://github.com/paradigmfoundation/paradigmcore/blob/f3a8acd/src/state/State.ts#L59)*

The `lastEvent` is updated each time an Ethereum event is accepted, and is used to prevent acceptance of historical events that the state has already been updated with.

___
<a id="ordercounter"></a>

###  orderCounter

**● orderCounter**: *`number`*

*Defined in [state/State.ts:74](https://github.com/paradigmfoundation/paradigmcore/blob/f3a8acd/src/state/State.ts#L74)*

Incrementally counts the number of orders accepted by the network since genesis. The `orderCounter` is incremented by 1 each time a valid `order` transaction is accepted during consensus (in `DeliverTx`).

___
<a id="posters"></a>

###  posters

**● posters**: *`PosterInfo`*

*Defined in [state/State.ts:45](https://github.com/paradigmfoundation/paradigmcore/blob/f3a8acd/src/state/State.ts#L45)*

The `posters` object is where poster accounts are created, updated, and stored. Each poster with registered stake in the `PosterRegistry` contract system has an account object that follows the \[\[Poster\]\] interface.

___
<a id="round"></a>

###  round

**● round**: *`RoundInfo`*

*Defined in [state/State.ts:30](https://github.com/paradigmfoundation/paradigmcore/blob/f3a8acd/src/state/State.ts#L30)*

The `round` object tracks rebalance round information. It is used to maintain sync with the Ethereum chain, which is used to mark the beginning and end of each rebalance round.

___
<a id="validators"></a>

###  validators

**● validators**: *`ValidatorInfo`*

*Defined in [state/State.ts:52](https://github.com/paradigmfoundation/paradigmcore/blob/f3a8acd/src/state/State.ts#L52)*

Validator information is kept in the `validators` object, where each validator has an account. Contained within each \[\[Validator\]\] is their public key, Ethereum address, staked balance, and other fields.

___

## Methods

<a id="acceptnew"></a>

###  acceptNew

▸ **acceptNew**(newState: *`IState`*): `void`

*Defined in [state/State.ts:161](https://github.com/paradigmfoundation/paradigmcore/blob/f3a8acd/src/state/State.ts#L161)*

Overwrite all existing state values with those from the object passed in.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| newState | `IState` |  an existing full state object (meets \[\[IState\]\] interface) |

**Returns:** `void`

___
<a id="applyordertx"></a>

###  applyOrderTx

▸ **applyOrderTx**(poster: *`string`*): `void`

*Defined in [state/State.ts:180](https://github.com/paradigmfoundation/paradigmcore/blob/f3a8acd/src/state/State.ts#L180)*

Applies state transition for an `order` transaction.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| poster | `string` |  the Ethereum address of the relevant poster account |

**Returns:** `void`

___
<a id="applyrebalancetx"></a>

###  applyRebalanceTx

▸ **applyRebalanceTx**(proposal: *`RebalanceData`*): `void`

*Defined in [state/State.ts:195](https://github.com/paradigmfoundation/paradigmcore/blob/f3a8acd/src/state/State.ts#L195)*

Applies state transition for a `rebalance` transaction.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| proposal | `RebalanceData` |  the rebalance proposal to apply (already accepted) |

**Returns:** `void`

___
<a id="applywitnesstx"></a>

###  applyWitnessTx

▸ **applyWitnessTx**(): `void`

*Defined in [state/State.ts:213](https://github.com/paradigmfoundation/paradigmcore/blob/f3a8acd/src/state/State.ts#L213)*

**Returns:** `void`

___
<a id="generateapphash"></a>

###  generateAppHash

▸ **generateAppHash**(): `Buffer`

*Defined in [state/State.ts:307](https://github.com/paradigmfoundation/paradigmcore/blob/f3a8acd/src/state/State.ts#L307)*

Generates a hash of all state values. Represents the `AppHash` and the Merkle root of the `state` trie.

Does **not** modify the state of the object prototype.

**Returns:** `Buffer`

___
<a id="internalreadfile"></a>

### `<Private>` internalReadFile

▸ **internalReadFile**(): `function`

*Defined in [state/State.ts:274](https://github.com/paradigmfoundation/paradigmcore/blob/f3a8acd/src/state/State.ts#L274)*

Returns a promise executor that wraps the async `fs.readFile` method.

**Returns:** `function`

___
<a id="internalwritefile"></a>

### `<Private>` internalWriteFile

▸ **internalWriteFile**(data: *`string`*): `function`

*Defined in [state/State.ts:289](https://github.com/paradigmfoundation/paradigmcore/blob/f3a8acd/src/state/State.ts#L289)*

Returns a promise executor that wraps the async `fs.writeFile` method.

**Parameters:**

| Name | Type |
| ------ | ------ |
| data | `string` |

**Returns:** `function`

___
<a id="readfromdisk"></a>

###  readFromDisk

▸ **readFromDisk**(): `Promise`<`void`>

*Defined in [state/State.ts:226](https://github.com/paradigmfoundation/paradigmcore/blob/f3a8acd/src/state/State.ts#L226)*

Reads the contents of the file path specified upon construction from disk, and loads its contents into state, over-writing any and all current data.

Handles parsing the custom-stringified data kept in the JSON file.

The actual process of reading the file from disk is handled by the internal `internalReadFile` method.

**Returns:** `Promise`<`void`>

___
<a id="tojson"></a>

###  toJSON

▸ **toJSON**(): `IState`

*Defined in [state/State.ts:427](https://github.com/paradigmfoundation/paradigmcore/blob/f3a8acd/src/state/State.ts#L427)*

Convert state object to plain object (without method definitions).

Should not be used for serialization – don't call `JSON.stringify(state)` as it is non-deterministic.

**Returns:** `IState`

___
<a id="updatehashboolean"></a>

### `<Private>` updateHashBoolean

▸ **updateHashBoolean**(hash: *`Hash`*, bool: *`boolean`*): `void`

*Defined in [state/State.ts:410](https://github.com/paradigmfoundation/paradigmcore/blob/f3a8acd/src/state/State.ts#L410)*

Defines a method of hashing a boolean value. Values that are `true` are included as a `ff` byte in the raw hash input, and `false` values are included as a `00` byte. Both appended prior to digestion.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| hash | `Hash` |  the hash being operated on |
| bool | `boolean` |  a boolean value ot include in the hash |

**Returns:** `void`

___
<a id="updatehashnumber"></a>

### `<Private>` updateHashNumber

▸ **updateHashNumber**(hash: *`Hash`*, number: *`number` \| `bigint`*): `void`

*Defined in [state/State.ts:382](https://github.com/paradigmfoundation/paradigmcore/blob/f3a8acd/src/state/State.ts#L382)*

Converts a number value (either `bigint` or `number` type) to a hexadecimal string value to be included in the hash.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| hash | `Hash` |  the hash being operated on |
| number | `number` \| `bigint` |  a number value (\`bigint\` or \`number\`) to include |

**Returns:** `void`

___
<a id="updatehashobject"></a>

### `<Private>` updateHashObject

▸ **updateHashObject**(hash: *`Hash`*, obj: *`object`*): `void`

*Defined in [state/State.ts:328](https://github.com/paradigmfoundation/paradigmcore/blob/f3a8acd/src/state/State.ts#L328)*

Iterates over an objects enumerable properties and defers to the correct logic for generating a hash of all the object's values.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| hash | `Hash` |  the hash object being operated on |
| obj | `object` |  the object whose properties should be included in a hash |

**Returns:** `void`

___
<a id="updatehashstring"></a>

### `<Private>` updateHashString

▸ **updateHashString**(hash: *`Hash`*, string: *`string`*): `void`

*Defined in [state/State.ts:370](https://github.com/paradigmfoundation/paradigmcore/blob/f3a8acd/src/state/State.ts#L370)*

Converts a string to a `Buffer` object to update a hash object with.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| hash | `Hash` |  the hash being operated on |
| string | `string` |  a string to include in the hash |

**Returns:** `void`

___
<a id="updatehashundefined"></a>

### `<Private>` updateHashUndefined

▸ **updateHashUndefined**(hash: *`Hash`*): `void`

*Defined in [state/State.ts:396](https://github.com/paradigmfoundation/paradigmcore/blob/f3a8acd/src/state/State.ts#L396)*

Defines a manner to hash null or 0 values. For `null`, `undefined` or 0 (including `false`) values, simply append a `00` byte to the binary has input (prior to digestion).

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| hash | `Hash` |  the hash being operated on |

**Returns:** `void`

___
<a id="updatehashvalue"></a>

### `<Private>` updateHashValue

▸ **updateHashValue**(hash: *`Hash`*, value: *`any`*): `void`

*Defined in [state/State.ts:347](https://github.com/paradigmfoundation/paradigmcore/blob/f3a8acd/src/state/State.ts#L347)*

Selects the correct method of serialization to binary data for a given type to be included in a `Hash` object.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| hash | `Hash` |  the hash object to update with a given value |
| value | `any` |  the value to include in the provided hash |

**Returns:** `void`

___
<a id="writetodisk"></a>

###  writeToDisk

▸ **writeToDisk**(): `Promise`<`void`>

*Defined in [state/State.ts:257](https://github.com/paradigmfoundation/paradigmcore/blob/f3a8acd/src/state/State.ts#L257)*

Writes the contents of state to the file path specified upon construction.

Handles generation of a custom-stringified data to be kept in the JSON file, which is necessary due to the currently un-serializable `bigint`.

The actual process of writing the file to disk is handled by the internal `internalWriteFile` method.

**Returns:** `Promise`<`void`>

___

