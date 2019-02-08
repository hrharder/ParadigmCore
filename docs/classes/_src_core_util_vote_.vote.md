[paradigm-contracts](../README.md) > ["src/core/util/Vote"](../modules/_src_core_util_vote_.md) > [Vote](../classes/_src_core_util_vote_.vote.md)

# Class: Vote

Contains static methods for responding to checkTx() and deliverTx().

## Hierarchy

**Vote**

## Index

### Methods

* [invalid](_src_core_util_vote_.vote.md#invalid)
* [valid](_src_core_util_vote_.vote.md#valid)

---

## Methods

<a id="invalid"></a>

### `<Static>` invalid

▸ **invalid**(log?: *`string`*, tags?: *`KVPair`[]*): `object`

*Defined in [src/core/util/Vote.ts:38](https://github.com/paradigmfoundation/paradigmcore/blob/11f2a53/src/core/util/Vote.ts#L38)*

Represents a Tendermint INVALID tx response message.

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` log | `string` |
| `Optional` tags | `KVPair`[] |

**Returns:** `object`

___
<a id="valid"></a>

### `<Static>` valid

▸ **valid**(log?: *`string`*, tags?: *`KVPair`[]*): `object`

*Defined in [src/core/util/Vote.ts:24](https://github.com/paradigmfoundation/paradigmcore/blob/11f2a53/src/core/util/Vote.ts#L24)*

Represents a Tendermint VALID tx response message.

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` log | `string` |
| `Optional` tags | `KVPair`[] |

**Returns:** `object`

___

