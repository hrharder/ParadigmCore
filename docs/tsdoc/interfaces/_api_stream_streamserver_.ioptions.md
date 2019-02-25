[ParadigmCore](../README.md) > ["api/stream/StreamServer"](../modules/_api_stream_streamserver_.md) > [IOptions](../interfaces/_api_stream_streamserver_.ioptions.md)

# Interface: IOptions

Defines the object provided to the `StreamServer` constructor.

## Hierarchy

**IOptions**

## Index

### Properties

* [host](_api_stream_streamserver_.ioptions.md#host)
* [methods](_api_stream_streamserver_.ioptions.md#methods)
* [port](_api_stream_streamserver_.ioptions.md#port)
* [retryInterval](_api_stream_streamserver_.ioptions.md#retryinterval)
* [retryMax](_api_stream_streamserver_.ioptions.md#retrymax)
* [tendermintRpcUrl](_api_stream_streamserver_.ioptions.md#tendermintrpcurl)

---

## Properties

<a id="host"></a>

### `<Optional>` host

**● host**: *`string`*

*Defined in [api/stream/StreamServer.ts:47](https://github.com/paradigmfoundation/paradigmcore/blob/922005d/src/api/stream/StreamServer.ts#L47)*

Network host to bind StreamAPI server.

___
<a id="methods"></a>

### `<Optional>` methods

**● methods**: *`object`*

*Defined in [api/stream/StreamServer.ts:50](https://github.com/paradigmfoundation/paradigmcore/blob/922005d/src/api/stream/StreamServer.ts#L50)*

Optional pre-defined method implementations.

#### Type declaration

[name: `string`]: `function`

▸(server: *[StreamServer](../classes/_api_stream_streamserver_.streamserver.md)*, client: *`WebSocket`*, params: *`any`*): `any`

**Parameters:**

| Name | Type |
| ------ | ------ |
| server | [StreamServer](../classes/_api_stream_streamserver_.streamserver.md) |
| client | `WebSocket` |
| params | `any` |

**Returns:** `any`

___
<a id="port"></a>

### `<Optional>` port

**● port**: *`number`*

*Defined in [api/stream/StreamServer.ts:44](https://github.com/paradigmfoundation/paradigmcore/blob/922005d/src/api/stream/StreamServer.ts#L44)*

Port to bind the StreamAPI server to.

___
<a id="retryinterval"></a>

### `<Optional>` retryInterval

**● retryInterval**: *`number`*

*Defined in [api/stream/StreamServer.ts:38](https://github.com/paradigmfoundation/paradigmcore/blob/922005d/src/api/stream/StreamServer.ts#L38)*

Interval between connection attempts (in ms).

___
<a id="retrymax"></a>

### `<Optional>` retryMax

**● retryMax**: *`number`*

*Defined in [api/stream/StreamServer.ts:41](https://github.com/paradigmfoundation/paradigmcore/blob/922005d/src/api/stream/StreamServer.ts#L41)*

The maximum number of times to retry connection before throwing.

___
<a id="tendermintrpcurl"></a>

### `<Optional>` tendermintRpcUrl

**● tendermintRpcUrl**: *`string`*

*Defined in [api/stream/StreamServer.ts:35](https://github.com/paradigmfoundation/paradigmcore/blob/922005d/src/api/stream/StreamServer.ts#L35)*

URL of the local Tendermint RPC server.

___

