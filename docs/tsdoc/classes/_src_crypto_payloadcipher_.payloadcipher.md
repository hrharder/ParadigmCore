[paradigm-contracts](../README.md) > ["src/crypto/PayloadCipher"](../modules/_src_crypto_payloadcipher_.md) > [PayloadCipher](../classes/_src_crypto_payloadcipher_.payloadcipher.md)

# Class: PayloadCipher

Provides static methods for encoding/compressing and decoding/decompressing transaction objects.

## Hierarchy

**PayloadCipher**

## Index

### Properties

* [inEncoding](_src_crypto_payloadcipher_.payloadcipher.md#inencoding)
* [outEncoding](_src_crypto_payloadcipher_.payloadcipher.md#outencoding)

### Methods

* [ABCIdecode](_src_crypto_payloadcipher_.payloadcipher.md#abcidecode)
* [decodeToObject](_src_crypto_payloadcipher_.payloadcipher.md#decodetoobject)
* [decodeToString](_src_crypto_payloadcipher_.payloadcipher.md#decodetostring)
* [encodeFromObject](_src_crypto_payloadcipher_.payloadcipher.md#encodefromobject)
* [encodeFromString](_src_crypto_payloadcipher_.payloadcipher.md#encodefromstring)
* [txEncodeFromObject](_src_crypto_payloadcipher_.payloadcipher.md#txencodefromobject)

---

## Properties

<a id="inencoding"></a>

### `<Static>``<Private>` inEncoding

**● inEncoding**: *`string`* = "utf8"

*Defined in [src/crypto/PayloadCipher.ts:163](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/crypto/PayloadCipher.ts#L163)*

___
<a id="outencoding"></a>

### `<Static>``<Private>` outEncoding

**● outEncoding**: *`string`* = "base64"

*Defined in [src/crypto/PayloadCipher.ts:166](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/crypto/PayloadCipher.ts#L166)*

___

## Methods

<a id="abcidecode"></a>

### `<Static>` ABCIdecode

▸ **ABCIdecode**(inBuff: *`Buffer`*): `SignedTransaction`

*Defined in [src/crypto/PayloadCipher.ts:155](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/crypto/PayloadCipher.ts#L155)*

ABCIdecode (public static method): Use to decode an incoming Buffer as delivered via Tendermint core.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| inBuff | `Buffer` |   |

**Returns:** `SignedTransaction`

___
<a id="decodetoobject"></a>

### `<Static>` decodeToObject

▸ **decodeToObject**(input: *`string`*): `SignedTransaction`

*Defined in [src/crypto/PayloadCipher.ts:126](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/crypto/PayloadCipher.ts#L126)*

Construct transaction object from encoded and compressed string.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| input | `string` |  encoded input string |

**Returns:** `SignedTransaction`

___
<a id="decodetostring"></a>

### `<Static>` decodeToString

▸ **decodeToString**(input: *`string`*): `string`

*Defined in [src/crypto/PayloadCipher.ts:106](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/crypto/PayloadCipher.ts#L106)*

Construct decoded and decompressed output string from encoded and compressed input.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| input | `string` |  encoded input string |

**Returns:** `string`

___
<a id="encodefromobject"></a>

### `<Static>` encodeFromObject

▸ **encodeFromObject**(payload: *`object`*): `string`

*Defined in [src/crypto/PayloadCipher.ts:62](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/crypto/PayloadCipher.ts#L62)*

encodeFromObject (public static method): Construct encoded and compressed output string from raw input object.

**Parameters:**

| Name | Type |
| ------ | ------ |
| payload | `object` |

**Returns:** `string`

___
<a id="encodefromstring"></a>

### `<Static>` encodeFromString

▸ **encodeFromString**(payload: *`string`*): `string`

*Defined in [src/crypto/PayloadCipher.ts:84](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/crypto/PayloadCipher.ts#L84)*

Construct encoded and compressed output string from raw input string.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| payload | `string` |  raw input string (uncompressed) |

**Returns:** `string`

___
<a id="txencodefromobject"></a>

### `<Static>` txEncodeFromObject

▸ **txEncodeFromObject**(payload: *`object`*): `string`

*Defined in [src/crypto/PayloadCipher.ts:32](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/crypto/PayloadCipher.ts#L32)*

Construct encoded and compressed output string from raw input object. This method implements a replacer to allow serialization of objects containing `bigint` types.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| payload | `object` |  raw input object |

**Returns:** `string`

___

