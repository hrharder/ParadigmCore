[ParadigmCore](../README.md) > ["api/stream/Response"](../modules/_api_stream_response_.md) > [Response](../classes/_api_stream_response_.response.md)

# Class: Response

The `Response` class represents a JSONRPC server response. It includes safety checks to ensure messages sent by the server conform to the JSONRPC-2.0 spec.

To construct a **valid** response object, pass in an options object with an `id` and `result` field. The `id` should be the same as the string provided by the client when the request was initially made.

To construct an **invalid** (i.e. error) response object, only pass in the `error` field in the `options` object (to the constructor). The id will automatically be filled in as `null` as per the JSONRPC 2.0 spec.

Also see [https://www.jsonrpc.org/specification](https://www.jsonrpc.org/specification)

## Hierarchy

**Response**

## Index

### Constructors

* [constructor](_api_stream_response_.response.md#constructor)

### Properties

* [error](_api_stream_response_.response.md#error)
* [id](_api_stream_response_.response.md#id)
* [result](_api_stream_response_.response.md#result)
* [jsonrpc](_api_stream_response_.response.md#jsonrpc)

### Methods

* [toJSON](_api_stream_response_.response.md#tojson)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Response**(options: *`IResponseOptions`*): [Response](_api_stream_response_.response.md)

*Defined in [api/stream/Response.ts:58](https://github.com/paradigmfoundation/paradigmcore/blob/8eaa498/src/api/stream/Response.ts#L58)*

Create a new response object.

Only include `options.id` and `options.result` for requests that do not illicit an error.

Requests that result in errors (validation or otherwise) will result in response objects with an `id` field of `null` and have no `result`. Only pass in `options.error` for error responses.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| options | `IResponseOptions` |  response options object (see \[\[IResponseOptions\]\]) |

**Returns:** [Response](_api_stream_response_.response.md)

___

## Properties

<a id="error"></a>

### `<Private>` error

**● error**: *`ValidationError`* =  null

*Defined in [api/stream/Response.ts:58](https://github.com/paradigmfoundation/paradigmcore/blob/8eaa498/src/api/stream/Response.ts#L58)*

Any validation (or process) errors.

The `error` option should only be included in the constructor for response messages that are the result of requests that encounter errors.

___
<a id="id"></a>

### `<Private>` id

**● id**: *`string`* =  null

*Defined in [api/stream/Response.ts:43](https://github.com/paradigmfoundation/paradigmcore/blob/8eaa498/src/api/stream/Response.ts#L43)*

The client-provided id string.

Should only be included in the constructor for **non-error** responses.

___
<a id="result"></a>

### `<Private>` result

**● result**: *`any`* =  null

*Defined in [api/stream/Response.ts:50](https://github.com/paradigmfoundation/paradigmcore/blob/8eaa498/src/api/stream/Response.ts#L50)*

Arbitrary result data included in response.

The result data should be able to be serialized as a JSON string.

___
<a id="jsonrpc"></a>

### `<Static>``<Private>` jsonrpc

**● jsonrpc**: *`string`* = "2.0"

*Defined in [api/stream/Response.ts:36](https://github.com/paradigmfoundation/paradigmcore/blob/8eaa498/src/api/stream/Response.ts#L36)*

Static JSONRPC version string for v2

Included in all response messages, both error and non-error.

___

## Methods

<a id="tojson"></a>

###  toJSON

▸ **toJSON**(): `IJsonResponse`

*Defined in [api/stream/Response.ts:91](https://github.com/paradigmfoundation/paradigmcore/blob/8eaa498/src/api/stream/Response.ts#L91)*

**Returns:** `IJsonResponse`

___

