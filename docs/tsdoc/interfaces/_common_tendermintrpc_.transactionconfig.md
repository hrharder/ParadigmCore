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

*Defined in [common/TendermintRPC.ts:33](https://github.com/paradigmfoundation/paradigmcore/blob/f520b2a/src/common/TendermintRPC.ts#L33)*

Unique ID used to track result

___
<a id="method"></a>

###  method

**● method**: *"sync" \| "async" \| "commit"*

*Defined in [common/TendermintRPC.ts:30](https://github.com/paradigmfoundation/paradigmcore/blob/f520b2a/src/common/TendermintRPC.ts#L30)*

The broadcast mode to use for this transaction

___
<a id="tx"></a>

###  tx

**● tx**: *`SignedTransaction`*

*Defined in [common/TendermintRPC.ts:27](https://github.com/paradigmfoundation/paradigmcore/blob/f520b2a/src/common/TendermintRPC.ts#L27)*

The transaction to submit via RPC

___

