[ParadigmCore](../README.md) > ["core/util/valFunctions"](../modules/_core_util_valfunctions_.md)

# External module: "core/util/valFunctions"

## Index

### Functions

* [doForEachValidator](_core_util_valfunctions_.md#doforeachvalidator)
* [privToPub](_core_util_valfunctions_.md#privtopub)
* [pubToAddr](_core_util_valfunctions_.md#pubtoaddr)
* [validatorUpdate](_core_util_valfunctions_.md#validatorupdate)

---

## Functions

<a id="doforeachvalidator"></a>

###  doForEachValidator

▸ **doForEachValidator**(state: *`State`*, cb: *`function`*): `void`

*Defined in [core/util/valFunctions.ts:77](https://github.com/paradigmfoundation/paradigmcore/blob/a5bd142/src/core/util/valFunctions.ts#L77)*

Simple wrapper for Object.keys() to execute a function on each validator that is currently in-state.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| state | `State` |  current state object |
| cb | `function` |  callback function to execute on each validator |

**Returns:** `void`

___
<a id="privtopub"></a>

###  privToPub

▸ **privToPub**(input: *`Buffer`*): `Buffer`

*Defined in [core/util/valFunctions.ts:44](https://github.com/paradigmfoundation/paradigmcore/blob/a5bd142/src/core/util/valFunctions.ts#L44)*

Derive Tendermint public key from private key (ed25519 type).

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| input | `Buffer` |  private key bytes |

**Returns:** `Buffer`

___
<a id="pubtoaddr"></a>

###  pubToAddr

▸ **pubToAddr**(input: *`Buffer`*): `Buffer`

*Defined in [core/util/valFunctions.ts:24](https://github.com/paradigmfoundation/paradigmcore/blob/a5bd142/src/core/util/valFunctions.ts#L24)*

Convert a Tendermint ed25519 public key to nodeID/address.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| input | `Buffer` |  public key bytes |

**Returns:** `Buffer`

___
<a id="validatorupdate"></a>

###  validatorUpdate

▸ **validatorUpdate**(pubKey: *`Buffer`*, power: *`bigint`*): `ValidatorUpdate`

*Defined in [core/util/valFunctions.ts:60](https://github.com/paradigmfoundation/paradigmcore/blob/a5bd142/src/core/util/valFunctions.ts#L60)*

Generates a `ValidatorUpdate` object, intended to be used in the EndBlock handler.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| pubKey | `Buffer` |  raw 32 byte public key |
| power | `bigint` |  desired power for validator |

**Returns:** `ValidatorUpdate`

___

