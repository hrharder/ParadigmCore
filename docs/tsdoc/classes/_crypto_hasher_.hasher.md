[ParadigmCore](../README.md) > ["crypto/Hasher"](../modules/_crypto_hasher_.md) > [Hasher](../classes/_crypto_hasher_.hasher.md)

# Class: Hasher

Currently only used to generate the `orderId` for `order` transactions.

Should be nuked and replaced with a real hashing algorithm.

## Hierarchy

**Hasher**

## Index

### Methods

* [hashOrder](_crypto_hasher_.hasher.md#hashorder)

---

## Methods

<a id="hashorder"></a>

### `<Static>` hashOrder

▸ **hashOrder**(order: *`Order`*): `string`

*Defined in [crypto/Hasher.ts:33](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/crypto/Hasher.ts#L33)*

Generate the hash of an order to be used as the OrderID.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| order | `Order` |  A Paradigm order object to be hashed |

**Returns:** `string`

___

