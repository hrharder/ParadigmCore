[paradigm-contracts](../README.md) > ["src/crypto/Hasher"](../modules/_src_crypto_hasher_.md) > [Hasher](../classes/_src_crypto_hasher_.hasher.md)

# Class: Hasher

## Hierarchy

**Hasher**

## Index

### Methods

* [hashOrder](_src_crypto_hasher_.hasher.md#hashorder)
* [hashState](_src_crypto_hasher_.hasher.md#hashstate)

---

## Methods

<a id="hashorder"></a>

### `<Static>` hashOrder

▸ **hashOrder**(order: *`Order`*): `string`

*Defined in [src/crypto/Hasher.ts:31](https://github.com/paradigmfoundation/paradigmcore/blob/86b6b78/src/crypto/Hasher.ts#L31)*

Generate the hash of an order to be used as the OrderID.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| order | `Order` |  A Paradigm order object to be hashed |

**Returns:** `string`

___
<a id="hashstate"></a>

### `<Static>` hashState

▸ **hashState**(state: *`State`*): `Buffer`

*Defined in [src/crypto/Hasher.ts:54](https://github.com/paradigmfoundation/paradigmcore/blob/86b6b78/src/crypto/Hasher.ts#L54)*

Generate a hash of the state.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| state | `State` |  the current state object |

**Returns:** `Buffer`

___

