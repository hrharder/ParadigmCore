[ParadigmCore](../README.md) > ["core/main"](../modules/_core_main_.md)

# External module: "core/main"

## Index

### Variables

* [abci](_core_main_.md#abci)

### Functions

* [start](_core_main_.md#start)

---

## Variables

<a id="abci"></a>

### `<Const>` abci

**● abci**: *`any`* =  require("abci")

*Defined in [core/main.ts:17](https://github.com/paradigmfoundation/paradigmcore/blob/14aa45f/src/core/main.ts#L17)*

\=========================== ParadigmCore: Blind Star

*__name__*: main.ts

*__module__*: src/core
========

*__author__*: Henry Harder

*__date__*: (initial) 15-October-2018

*__date__*: (modified) 22-January-2019

ParadigmCore primary state machine (via imported handlers) and ABCI application.

___

## Functions

<a id="start"></a>

###  start

▸ **start**(options: *`ParadigmCoreOptions`*): `Promise`<`null`>

*Defined in [core/main.ts:50](https://github.com/paradigmfoundation/paradigmcore/blob/14aa45f/src/core/main.ts#L50)*

Initialize and start the ABCI application.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| options | `ParadigmCoreOptions` |  Options object with parameters:*   options.version {string} paradigmcore version string*   options.deliverState {object} deliverTx state object*   options.commitState {object} commit state object*   options.abciServPort {number} local ABCI server port*   options.finalityThreshold {number} Ethereum block finality threshold*   options.maxOrderBytes {number} maximum order size in bytes*   options.periodLength {number} length of rebalance period*   options.periodLimit {number} transactions accepted per period*   options.paradigm {Paradigm} paradigm-connect instance |

**Returns:** `Promise`<`null`>

___

