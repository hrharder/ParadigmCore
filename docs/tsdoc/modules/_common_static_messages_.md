[ParadigmCore](../README.md) > ["common/static/messages"](../modules/_common_static_messages_.md)

# External module: "common/static/messages"

## Index

### Object literals

* [messages](_common_static_messages_.md#messages)

---

## Object literals

<a id="messages"></a>

### `<Let>` messages

**messages**: *`object`*

*Defined in [common/static/messages.ts:15](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/static/messages.ts#L15)*

\=========================== ParadigmCore: Blind Star

*__name__*: contractABI.ts

*__module__*: src/util/static
===============

*__author__*: Henry Harder

*__date__*: (initial) 01-October-2018

*__date__*: (modified) 18-December-2018

Log message templates and statuses for various modules.

<a id="messages.abci"></a>

####  abci

**abci**: *`object`*

*Defined in [common/static/messages.ts:32](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/static/messages.ts#L32)*

<a id="messages.abci.errors"></a>

####  errors

**errors**: *`object`*

*Defined in [common/static/messages.ts:33](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/static/messages.ts#L33)*

<a id="messages.abci.errors.broadcast"></a>

####  broadcast

**● broadcast**: *`string`* = "failed broadcasting orders (may require process termination)"

*Defined in [common/static/messages.ts:38](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/static/messages.ts#L38)*

___
<a id="messages.abci.errors.decompress"></a>

####  decompress

**● decompress**: *`string`* = "bad order object: error decompressing transaction"

*Defined in [common/static/messages.ts:34](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/static/messages.ts#L34)*

___
<a id="messages.abci.errors.fatal"></a>

####  fatal

**● fatal**: *`string`* = "fatal error initializing application, exiting"

*Defined in [common/static/messages.ts:36](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/static/messages.ts#L36)*

___
<a id="messages.abci.errors.format"></a>

####  format

**● format**: *`string`* = "bad order object: invalid Paradigm order format"

*Defined in [common/static/messages.ts:35](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/static/messages.ts#L35)*

___
<a id="messages.abci.errors.signature"></a>

####  signature

**● signature**: *`string`* = "error encountered recovering validator signature"

*Defined in [common/static/messages.ts:40](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/static/messages.ts#L40)*

___
<a id="messages.abci.errors.tmfatal"></a>

####  tmFatal

**● tmFatal**: *`string`* = "fatal error starting Tendermint core, exiting"

*Defined in [common/static/messages.ts:37](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/static/messages.ts#L37)*

___
<a id="messages.abci.errors.txtype"></a>

####  txType

**● txType**: *`string`* = "invalid transaction type rejected"

*Defined in [common/static/messages.ts:39](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/static/messages.ts#L39)*

___

___
<a id="messages.abci.messages-1"></a>

####  messages

**messages**: *`object`*

*Defined in [common/static/messages.ts:42](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/static/messages.ts#L42)*

<a id="messages.abci.messages-1.badsig"></a>

####  badSig

**● badSig**: *`string`* = "rejected ABCI transaction with invalid validator signature"

*Defined in [common/static/messages.ts:51](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/static/messages.ts#L51)*

___
<a id="messages.abci.messages-1.mempool"></a>

####  mempool

**● mempool**: *`string`* = "new order passed mempool verification"

*Defined in [common/static/messages.ts:47](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/static/messages.ts#L47)*

___
<a id="messages.abci.messages-1.nostake"></a>

####  noStake

**● noStake**: *`string`* = "new order rejected: invalid poster or no poster stake"

*Defined in [common/static/messages.ts:48](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/static/messages.ts#L48)*

___
<a id="messages.abci.messages-1.rounddiff"></a>

####  roundDiff

**● roundDiff**: *`string`* = "this round deliverTx state is more than 1 period ahead of committed state"

*Defined in [common/static/messages.ts:50](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/static/messages.ts#L50)*

___
<a id="messages.abci.messages-1.verified"></a>

####  verified

**● verified**: *`string`* = "new order verified and added to OrderStream queue"

*Defined in [common/static/messages.ts:49](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/static/messages.ts#L49)*

___
<a id="messages.abci.messages-1.incoming"></a>

####  incoming

**incoming**: *`object`*

*Defined in [common/static/messages.ts:43](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/static/messages.ts#L43)*

<a id="messages.abci.messages-1.incoming.checktx"></a>

####  checkTx

**● checkTx**: *`string`* = "incoming abci transaction in 'checkTx()'"

*Defined in [common/static/messages.ts:44](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/static/messages.ts#L44)*

___
<a id="messages.abci.messages-1.incoming.delivertx"></a>

####  deliverTx

**● deliverTx**: *`string`* = "incoming abci transaction in 'deliverTx()'"

*Defined in [common/static/messages.ts:45](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/static/messages.ts#L45)*

___

___

___

___
<a id="messages.api"></a>

####  api

**api**: *`object`*

*Defined in [common/static/messages.ts:54](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/static/messages.ts#L54)*

<a id="messages.api.errors-1"></a>

####  errors

**errors**: *`object`*

*Defined in [common/static/messages.ts:55](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/static/messages.ts#L55)*

<a id="messages.api.errors-1.badjson"></a>

####  badJSON

**● badJSON**: *`string`* = "bad json format, check tx and try again"

*Defined in [common/static/messages.ts:56](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/static/messages.ts#L56)*

___
<a id="messages.api.errors-1.fatal-1"></a>

####  fatal

**● fatal**: *`string`* = "fatal error starting API server, exiting"

*Defined in [common/static/messages.ts:59](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/static/messages.ts#L59)*

___
<a id="messages.api.errors-1.parsing"></a>

####  parsing

**● parsing**: *`string`* = "failed parsing order, check format and try again"

*Defined in [common/static/messages.ts:57](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/static/messages.ts#L57)*

___
<a id="messages.api.errors-1.response"></a>

####  response

**● response**: *`string`* = "failed sending http response"

*Defined in [common/static/messages.ts:58](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/static/messages.ts#L58)*

___

___

___
<a id="messages.general"></a>

####  general

**general**: *`object`*

*Defined in [common/static/messages.ts:16](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/static/messages.ts#L16)*

<a id="messages.general.errors-2"></a>

####  errors

**errors**: *`object`*

*Defined in [common/static/messages.ts:20](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/static/messages.ts#L20)*

<a id="messages.general.errors-2.fatal-2"></a>

####  fatal

**● fatal**: *`string`* = "fatal error detected, exiting"

*Defined in [common/static/messages.ts:21](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/static/messages.ts#L21)*

___

___
<a id="messages.general.messages-2"></a>

####  messages

**messages**: *`object`*

*Defined in [common/static/messages.ts:17](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/static/messages.ts#L17)*

<a id="messages.general.messages-2.start"></a>

####  start

**● start**: *`string`* = "initialization complete, starting new block production"

*Defined in [common/static/messages.ts:18](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/static/messages.ts#L18)*

___

___

___
<a id="messages.rebalancer"></a>

####  rebalancer

**rebalancer**: *`object`*

*Defined in [common/static/messages.ts:62](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/static/messages.ts#L62)*

<a id="messages.rebalancer.errors-3"></a>

####  errors

**errors**: *`object`*

*Defined in [common/static/messages.ts:72](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/static/messages.ts#L72)*

<a id="messages.rebalancer.errors-3.badblockevent"></a>

####  badBlockEvent

**● badBlockEvent**: *`string`* = "bad block event"

*Defined in [common/static/messages.ts:75](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/static/messages.ts#L75)*

___
<a id="messages.rebalancer.errors-3.badstakeevent"></a>

####  badStakeEvent

**● badStakeEvent**: *`string`* = "bad stake event"

*Defined in [common/static/messages.ts:74](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/static/messages.ts#L74)*

___
<a id="messages.rebalancer.errors-3.fatalstake"></a>

####  fatalStake

**● fatalStake**: *`string`* = "fatal error encountered processing stake event"

*Defined in [common/static/messages.ts:73](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/static/messages.ts#L73)*

___

___
<a id="messages.rebalancer.messages-3"></a>

####  messages

**messages**: *`object`*

*Defined in [common/static/messages.ts:63](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/static/messages.ts#L63)*

<a id="messages.rebalancer.messages-3.accept"></a>

####  accept

**● accept**: *`string`* = "valid rebalance proposal accepted"

*Defined in [common/static/messages.ts:67](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/static/messages.ts#L67)*

___
<a id="messages.rebalancer.messages-3.activated"></a>

####  activated

**● activated**: *`string`* = "witness activated, subscribed to Ethereum events"

*Defined in [common/static/messages.ts:64](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/static/messages.ts#L64)*

___
<a id="messages.rebalancer.messages-3.iaccept"></a>

####  iAccept

**● iAccept**: *`string`* = "valid initial (genesis) rebalance proposal accepted"

*Defined in [common/static/messages.ts:65](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/static/messages.ts#L65)*

___
<a id="messages.rebalancer.messages-3.ireject"></a>

####  iReject

**● iReject**: *`string`* = "invalid initial (genesis) rebalance proposal rejected"

*Defined in [common/static/messages.ts:66](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/static/messages.ts#L66)*

___
<a id="messages.rebalancer.messages-3.nomatch"></a>

####  noMatch

**● noMatch**: *`string`* = "rejected proposal that does not match local mapping"

*Defined in [common/static/messages.ts:70](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/static/messages.ts#L70)*

___
<a id="messages.rebalancer.messages-3.reject"></a>

####  reject

**● reject**: *`string`* = "invalid rebalance proposal rejected"

*Defined in [common/static/messages.ts:68](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/static/messages.ts#L68)*

___
<a id="messages.rebalancer.messages-3.wronground"></a>

####  wrongRound

**● wrongRound**: *`string`* = "rejected proposal for incorrect staking period"

*Defined in [common/static/messages.ts:69](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/static/messages.ts#L69)*

___

___

___
<a id="messages.websocket"></a>

####  websocket

**websocket**: *`object`*

*Defined in [common/static/messages.ts:24](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/static/messages.ts#L24)*

<a id="messages.websocket.errors-4"></a>

####  errors

**errors**: *`object`*

*Defined in [common/static/messages.ts:25](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/static/messages.ts#L25)*

<a id="messages.websocket.errors-4.broadcast-1"></a>

####  broadcast

**● broadcast**: *`string`* = "failed broadcasting websocket event"

*Defined in [common/static/messages.ts:26](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/static/messages.ts#L26)*

___
<a id="messages.websocket.errors-4.connect"></a>

####  connect

**● connect**: *`string`* = "failed establishing websocket connection"

*Defined in [common/static/messages.ts:27](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/static/messages.ts#L27)*

___
<a id="messages.websocket.errors-4.fatal-3"></a>

####  fatal

**● fatal**: *`string`* = "fatal error starting websocket server, exiting"

*Defined in [common/static/messages.ts:29](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/static/messages.ts#L29)*

___
<a id="messages.websocket.errors-4.message"></a>

####  message

**● message**: *`string`* = "failed sending websocket message"

*Defined in [common/static/messages.ts:28](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/static/messages.ts#L28)*

___

___

___

___

