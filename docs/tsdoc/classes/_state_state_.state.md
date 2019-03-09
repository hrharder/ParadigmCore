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
* [generateAppHash](_state_state_.state.md#generateapphash)
* [toJSON](_state_state_.state.md#tojson)
* [updateHashBoolean](_state_state_.state.md#updatehashboolean)
* [updateHashNumber](_state_state_.state.md#updatehashnumber)
* [updateHashObject](_state_state_.state.md#updatehashobject)
* [updateHashString](_state_state_.state.md#updatehashstring)
* [updateHashUndefined](_state_state_.state.md#updatehashundefined)
* [updateHashValue](_state_state_.state.md#updatehashvalue)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new State**(): [State](_state_state_.state.md)

*Defined in [state/State.ts:19](https://github.com/paradigmfoundation/paradigmcore/blob/acc965b/src/state/State.ts#L19)*

Create a new `State` object instance.

Initializes a null (genesis) state object. The hash of a null state (the `AppHash`) will always be the same.

**Returns:** [State](_state_state_.state.md)

___

## Properties

<a id="consensusparams"></a>

###  consensusParams

**● consensusParams**: *`ConsensusParams`*

*Defined in [state/State.ts:16](https://github.com/paradigmfoundation/paradigmcore/blob/acc965b/src/state/State.ts#L16)*

___
<a id="events"></a>

###  events

**● events**: *`Events`*

*Defined in [state/State.ts:12](https://github.com/paradigmfoundation/paradigmcore/blob/acc965b/src/state/State.ts#L12)*

___
<a id="lastblockapphash"></a>

###  lastBlockAppHash

**● lastBlockAppHash**: *`Buffer`*

*Defined in [state/State.ts:19](https://github.com/paradigmfoundation/paradigmcore/blob/acc965b/src/state/State.ts#L19)*

___
<a id="lastblockheight"></a>

###  lastBlockHeight

**● lastBlockHeight**: *`number`*

*Defined in [state/State.ts:18](https://github.com/paradigmfoundation/paradigmcore/blob/acc965b/src/state/State.ts#L18)*

___
<a id="lastevent"></a>

###  lastEvent

**● lastEvent**: *`number`*

*Defined in [state/State.ts:15](https://github.com/paradigmfoundation/paradigmcore/blob/acc965b/src/state/State.ts#L15)*

___
<a id="ordercounter"></a>

###  orderCounter

**● orderCounter**: *`number`*

*Defined in [state/State.ts:17](https://github.com/paradigmfoundation/paradigmcore/blob/acc965b/src/state/State.ts#L17)*

___
<a id="posters"></a>

###  posters

**● posters**: *`PosterInfo`*

*Defined in [state/State.ts:13](https://github.com/paradigmfoundation/paradigmcore/blob/acc965b/src/state/State.ts#L13)*

___
<a id="round"></a>

###  round

**● round**: *`RoundInfo`*

*Defined in [state/State.ts:11](https://github.com/paradigmfoundation/paradigmcore/blob/acc965b/src/state/State.ts#L11)*

___
<a id="validators"></a>

###  validators

**● validators**: *`ValidatorInfo`*

*Defined in [state/State.ts:14](https://github.com/paradigmfoundation/paradigmcore/blob/acc965b/src/state/State.ts#L14)*

___

## Methods

<a id="acceptnew"></a>

###  acceptNew

▸ **acceptNew**(newState: *`IState`*): `void`

*Defined in [state/State.ts:60](https://github.com/paradigmfoundation/paradigmcore/blob/acc965b/src/state/State.ts#L60)*

Overwrite all existing state values with those from the object passed in.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| newState | `IState` |  an existing full state object (meets \[\[IState\]\] interface) |

**Returns:** `void`

___
<a id="generateapphash"></a>

###  generateAppHash

▸ **generateAppHash**(): `Buffer`

*Defined in [state/State.ts:78](https://github.com/paradigmfoundation/paradigmcore/blob/acc965b/src/state/State.ts#L78)*

Generates a hash of all state values. Represents the `AppHash` and the Merkle root of the `state` trie.

Does **not** modify the state of the object prototype.

**Returns:** `Buffer`

___
<a id="tojson"></a>

###  toJSON

▸ **toJSON**(): `IState`

*Defined in [state/State.ts:198](https://github.com/paradigmfoundation/paradigmcore/blob/acc965b/src/state/State.ts#L198)*

Convert state object to plain object (without method definitions).

Should not be used for serialization – don't call `JSON.stringify(state)` as it is non-deterministic.

**Returns:** `IState`

___
<a id="updatehashboolean"></a>

### `<Private>` updateHashBoolean

▸ **updateHashBoolean**(hash: *`Hash`*, bool: *`boolean`*): `void`

*Defined in [state/State.ts:181](https://github.com/paradigmfoundation/paradigmcore/blob/acc965b/src/state/State.ts#L181)*

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

*Defined in [state/State.ts:153](https://github.com/paradigmfoundation/paradigmcore/blob/acc965b/src/state/State.ts#L153)*

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

*Defined in [state/State.ts:123](https://github.com/paradigmfoundation/paradigmcore/blob/acc965b/src/state/State.ts#L123)*

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

*Defined in [state/State.ts:141](https://github.com/paradigmfoundation/paradigmcore/blob/acc965b/src/state/State.ts#L141)*

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

▸ **updateHashUndefined**(hash: *`Hash`*, nullVal: *`undefined` \| `null`*): `void`

*Defined in [state/State.ts:167](https://github.com/paradigmfoundation/paradigmcore/blob/acc965b/src/state/State.ts#L167)*

Defines a manner to hash null or 0 values. For `null`, `undefined` or 0 (including `false`) values, simply append a `00` byte to the binary has input (prior to digestion).

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| hash | `Hash` |  the hash being operated on |
| nullVal | `undefined` \| `null` |  a null or 0 value to include in the hash |

**Returns:** `void`

___
<a id="updatehashvalue"></a>

### `<Private>` updateHashValue

▸ **updateHashValue**(hash: *`Hash`*, value: *`any`*): `void`

*Defined in [state/State.ts:99](https://github.com/paradigmfoundation/paradigmcore/blob/acc965b/src/state/State.ts#L99)*

Selects the correct method of serialization to binary data for a given type to be included in a `Hash` object.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| hash | `Hash` |  the hash object to update with a given value |
| value | `any` |  the value to include in the provided hash |

**Returns:** `void`

___

