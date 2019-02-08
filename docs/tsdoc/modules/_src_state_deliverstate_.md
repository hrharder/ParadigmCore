[paradigm-contracts](../README.md) > ["src/state/deliverState"](../modules/_src_state_deliverstate_.md)

# External module: "src/state/deliverState"

## Index

### Object literals

* [deliverState](_src_state_deliverstate_.md#deliverstate)

---

## Object literals

<a id="deliverstate"></a>

### `<Let>` deliverState

**deliverState**: *`object`*

*Defined in [src/state/deliverState.ts:15](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/state/deliverState.ts#L15)*

\=========================== ParadigmCore: Blind Star

*__name__*: commitState.ts

*__module__*: src/state
=========

*__author__*: Henry Harder

*__date__*: (initial) 22-October-2018

*__date__*: (modified) 21-January-2019

Object representing the initial and pre-commit state of the network.

<a id="deliverstate.events"></a>

####  events

**● events**: *`object`*

*Defined in [src/state/deliverState.ts:22](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/state/deliverState.ts#L22)*

#### Type declaration

___
<a id="deliverstate.lastblockapphash"></a>

####  lastBlockAppHash

**● lastBlockAppHash**: *`null`* =  null

*Defined in [src/state/deliverState.ts:38](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/state/deliverState.ts#L38)*

___
<a id="deliverstate.lastblockheight"></a>

####  lastBlockHeight

**● lastBlockHeight**: *`number`* = 0

*Defined in [src/state/deliverState.ts:37](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/state/deliverState.ts#L37)*

___
<a id="deliverstate.ordercounter"></a>

####  orderCounter

**● orderCounter**: *`number`* = 0

*Defined in [src/state/deliverState.ts:36](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/state/deliverState.ts#L36)*

___
<a id="deliverstate.posters"></a>

####  posters

**● posters**: *`object`*

*Defined in [src/state/deliverState.ts:23](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/state/deliverState.ts#L23)*

#### Type declaration

___
<a id="deliverstate.validators"></a>

####  validators

**● validators**: *`object`*

*Defined in [src/state/deliverState.ts:28](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/state/deliverState.ts#L28)*

#### Type declaration

___
<a id="deliverstate.consensusparams"></a>

####  consensusParams

**consensusParams**: *`object`*

*Defined in [src/state/deliverState.ts:29](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/state/deliverState.ts#L29)*

<a id="deliverstate.consensusparams.confirmationthreshold"></a>

####  confirmationThreshold

**● confirmationThreshold**: *`null`* =  null

*Defined in [src/state/deliverState.ts:34](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/state/deliverState.ts#L34)*

___
<a id="deliverstate.consensusparams.finalitythreshold"></a>

####  finalityThreshold

**● finalityThreshold**: *`null`* =  null

*Defined in [src/state/deliverState.ts:30](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/state/deliverState.ts#L30)*

___
<a id="deliverstate.consensusparams.maxorderbytes"></a>

####  maxOrderBytes

**● maxOrderBytes**: *`null`* =  null

*Defined in [src/state/deliverState.ts:33](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/state/deliverState.ts#L33)*

___
<a id="deliverstate.consensusparams.periodlength"></a>

####  periodLength

**● periodLength**: *`null`* =  null

*Defined in [src/state/deliverState.ts:31](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/state/deliverState.ts#L31)*

___
<a id="deliverstate.consensusparams.periodlimit"></a>

####  periodLimit

**● periodLimit**: *`null`* =  null

*Defined in [src/state/deliverState.ts:32](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/state/deliverState.ts#L32)*

___

___
<a id="deliverstate.lastevent"></a>

####  lastEvent

**lastEvent**: *`object`*

*Defined in [src/state/deliverState.ts:24](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/state/deliverState.ts#L24)*

<a id="deliverstate.lastevent.add"></a>

####  add

**● add**: *`number`* = 0

*Defined in [src/state/deliverState.ts:25](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/state/deliverState.ts#L25)*

___
<a id="deliverstate.lastevent.remove"></a>

####  remove

**● remove**: *`number`* = 0

*Defined in [src/state/deliverState.ts:26](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/state/deliverState.ts#L26)*

___

___
<a id="deliverstate.round"></a>

####  round

**round**: *`object`*

*Defined in [src/state/deliverState.ts:16](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/state/deliverState.ts#L16)*

<a id="deliverstate.round.endsat"></a>

####  endsAt

**● endsAt**: *`number`* = 0

*Defined in [src/state/deliverState.ts:19](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/state/deliverState.ts#L19)*

___
<a id="deliverstate.round.limit"></a>

####  limit

**● limit**: *`number`* = 0

*Defined in [src/state/deliverState.ts:20](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/state/deliverState.ts#L20)*

___
<a id="deliverstate.round.number"></a>

####  number

**● number**: *`number`* = 0

*Defined in [src/state/deliverState.ts:17](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/state/deliverState.ts#L17)*

___
<a id="deliverstate.round.startsat"></a>

####  startsAt

**● startsAt**: *`number`* = 0

*Defined in [src/state/deliverState.ts:18](https://github.com/paradigmfoundation/paradigmcore/blob/9a91704/src/state/deliverState.ts#L18)*

___

___

___

