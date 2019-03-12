[ParadigmCore](../README.md) > ["api/stream/StreamServer"](../modules/_api_stream_streamserver_.md) > [IBlockData](../interfaces/_api_stream_streamserver_.iblockdata.md)

# Interface: IBlockData

Defines the parsed block data from the tendermint `NewBlock` event.

*__todo__*: move to `typings` module

## Hierarchy

**IBlockData**

## Index

### Properties

* [height](_api_stream_streamserver_.iblockdata.md#height)
* [time](_api_stream_streamserver_.iblockdata.md#time)
* [txs](_api_stream_streamserver_.iblockdata.md#txs)

---

## Properties

<a id="height"></a>

### `<Optional>` height

**● height**: *`number`*

*Defined in [api/stream/StreamServer.ts:66](https://github.com/paradigmfoundation/paradigmcore/blob/e540330/src/api/stream/StreamServer.ts#L66)*

The best known tendermint block (height).

___
<a id="time"></a>

### `<Optional>` time

**● time**: *`number`*

*Defined in [api/stream/StreamServer.ts:71](https://github.com/paradigmfoundation/paradigmcore/blob/e540330/src/api/stream/StreamServer.ts#L71)*

The unix timestamp of the time the block was committed.

___
<a id="txs"></a>

### `<Optional>` txs

**● txs**: *`string`[]*

*Defined in [api/stream/StreamServer.ts:76](https://github.com/paradigmfoundation/paradigmcore/blob/e540330/src/api/stream/StreamServer.ts#L76)*

An array of stringified (yet parsed) transaction objects

___

