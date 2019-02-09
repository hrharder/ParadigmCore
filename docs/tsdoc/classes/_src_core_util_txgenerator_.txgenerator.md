[ParadigmCore](../README.md) > ["src/core/util/TxGenerator"](../modules/_src_core_util_txgenerator_.md) > [TxGenerator](../classes/_src_core_util_txgenerator_.txgenerator.md)

# Class: TxGenerator

Generates and signs ABCI transactions from validators.

## Hierarchy

**TxGenerator**

## Index

### Constructors

* [constructor](_src_core_util_txgenerator_.txgenerator.md#constructor)

### Properties

* [address](_src_core_util_txgenerator_.txgenerator.md#address)
* [encoding](_src_core_util_txgenerator_.txgenerator.md#encoding)
* [privKey](_src_core_util_txgenerator_.txgenerator.md#privkey)
* [pubKey](_src_core_util_txgenerator_.txgenerator.md#pubkey)

### Methods

* [create](_src_core_util_txgenerator_.txgenerator.md#create)
* [isValidInput](_src_core_util_txgenerator_.txgenerator.md#isvalidinput)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new TxGenerator**(options: *`any`*): [TxGenerator](_src_core_util_txgenerator_.txgenerator.md)

*Defined in [src/core/util/TxGenerator.ts:113](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/core/util/TxGenerator.ts#L113)*

Create a new TransactionGenerator instance.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| options | `any` |  options object with properties:*   options.privateKey {string} base64 encoded ed25519 private key*   options.publicKey {string} base64 encoded ed25519 public key |

**Returns:** [TxGenerator](_src_core_util_txgenerator_.txgenerator.md)

___

## Properties

<a id="address"></a>

### `<Private>` address

**● address**: *`Buffer`*

*Defined in [src/core/util/TxGenerator.ts:110](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/core/util/TxGenerator.ts#L110)*

___
<a id="encoding"></a>

### `<Private>` encoding

**● encoding**: *`string`*

*Defined in [src/core/util/TxGenerator.ts:113](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/core/util/TxGenerator.ts#L113)*

___
<a id="privkey"></a>

### `<Private>` privKey

**● privKey**: *`Buffer`*

*Defined in [src/core/util/TxGenerator.ts:109](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/core/util/TxGenerator.ts#L109)*

___
<a id="pubkey"></a>

### `<Private>` pubKey

**● pubKey**: *`Buffer`*

*Defined in [src/core/util/TxGenerator.ts:108](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/core/util/TxGenerator.ts#L108)*

___

## Methods

<a id="create"></a>

###  create

▸ **create**(rawTx: *`RawTransaction`*): `SignedTransaction`

*Defined in [src/core/util/TxGenerator.ts:169](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/core/util/TxGenerator.ts#L169)*

Create and sign an ABCI transaction. Returns a signed transaction object.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| rawTx | `RawTransaction` |  raw and unsigned transaction object |

**Returns:** `SignedTransaction`

___
<a id="isvalidinput"></a>

### `<Static>` isValidInput

▸ **isValidInput**(rawTx: *`RawTransaction`*): `boolean`

*Defined in [src/core/util/TxGenerator.ts:36](https://github.com/paradigmfoundation/paradigmcore/blob/d73b640/src/core/util/TxGenerator.ts#L36)*

Returns true if an ABCI transaction is structurally valid (stateless validity).

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| rawTx | `RawTransaction` |  raw transaction object |

**Returns:** `boolean`

___

