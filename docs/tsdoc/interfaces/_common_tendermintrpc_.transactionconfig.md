[ParadigmCore](../README.md) > ["common/TendermintRPC"](../modules/_common_tendermintrpc_.md) > [TransactionConfig](../interfaces/_common_tendermintrpc_.transactionconfig.md)

# Interface: TransactionConfig

Defines the object passed into `TendermintRPC.prototype.queue`

## Hierarchy

**TransactionConfig**

## Index

### Properties

* [id](_common_tendermintrpc_.transactionconfig.md#id)
* [method](_common_tendermintrpc_.transactionconfig.md#method)
* [tx](_common_tendermintrpc_.transactionconfig.md#tx)

---

## Properties

<a id="id"></a>

###  id

**● id**: *`string`*

*Defined in [common/TendermintRPC.ts:34](https://github.com/paradigmfoundation/paradigmcore/blob/acc965b/src/common/TendermintRPC.ts#L34)*

Unique ID used to track result

___
<a id="method"></a>

###  method

**● method**: *"sync" \| "async" \| "commit"*

*Defined in [common/TendermintRPC.ts:31](https://github.com/paradigmfoundation/paradigmcore/blob/acc965b/src/common/TendermintRPC.ts#L31)*

The broadcast mode to use for this transaction

___
<a id="tx"></a>

###  tx

**● tx**: *`SignedTransaction`*

*Defined in [common/TendermintRPC.ts:28](https://github.com/paradigmfoundation/paradigmcore/blob/acc965b/src/common/TendermintRPC.ts#L28)*

The transaction to submit via RPC

___

