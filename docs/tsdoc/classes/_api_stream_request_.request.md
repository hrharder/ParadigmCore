[ParadigmCore](../README.md) > ["api/stream/Request"](../modules/_api_stream_request_.md) > [Request](../classes/_api_stream_request_.request.md)

# Class: Request

JSON-RPC 2.0 compliant implementation of the Stream API request messages.

A work in progress as of 06 Feb. 2019

See: [https://www.jsonrpc.org/specification](https://www.jsonrpc.org/specification)

## Hierarchy

**Request**

## Index

### Constructors

* [constructor](_api_stream_request_.request.md#constructor)

### Properties

* [err](_api_stream_request_.request.md#err)
* [parsed](_api_stream_request_.request.md#parsed)
* [raw](_api_stream_request_.request.md#raw)
* [valid](_api_stream_request_.request.md#valid)
* [errors](_api_stream_request_.request.md#errors)
* [schema](_api_stream_request_.request.md#schema)

### Methods

* [addValErr](_api_stream_request_.request.md#addvalerr)
* [close](_api_stream_request_.request.md#close)
* [toJSON](_api_stream_request_.request.md#tojson)
* [validate](_api_stream_request_.request.md#validate)
* [validateRequiredParam](_api_stream_request_.request.md#validaterequiredparam)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Request**(input: *`any`*): [Request](_api_stream_request_.request.md)

*Defined in [api/stream/Request.ts:59](https://github.com/paradigmfoundation/paradigmcore/blob/e540330/src/api/stream/Request.ts#L59)*

Create a new JSONRPC request instance.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| input | `any` |  raw input JSONRPC request string. |

**Returns:** [Request](_api_stream_request_.request.md)

___

## Properties

<a id="err"></a>

### `<Private>` err

**● err**: *`ValidationError`*

*Defined in [api/stream/Request.ts:53](https://github.com/paradigmfoundation/paradigmcore/blob/e540330/src/api/stream/Request.ts#L53)*

The first validation error encountered, if any.

___
<a id="parsed"></a>

###  parsed

**● parsed**: *`IParsedRequest`*

*Defined in [api/stream/Request.ts:43](https://github.com/paradigmfoundation/paradigmcore/blob/e540330/src/api/stream/Request.ts#L43)*

Parsed request object.

___
<a id="raw"></a>

### `<Private>` raw

**● raw**: *`string`*

*Defined in [api/stream/Request.ts:48](https://github.com/paradigmfoundation/paradigmcore/blob/e540330/src/api/stream/Request.ts#L48)*

Raw input string, deleted after parsing.

___
<a id="valid"></a>

### `<Private>` valid

**● valid**: *`boolean`*

*Defined in [api/stream/Request.ts:59](https://github.com/paradigmfoundation/paradigmcore/blob/e540330/src/api/stream/Request.ts#L59)*

Set to true or false depending on result of `JsonRequest.prototype. validate()`, and set to `null` beforehand.

___
<a id="errors"></a>

### `<Static>``<Private>` errors

**● errors**: *`IErrors`* =  errors

*Defined in [api/stream/Request.ts:38](https://github.com/paradigmfoundation/paradigmcore/blob/e540330/src/api/stream/Request.ts#L38)*

Top-level definitions for JSONRPC request/responses.

___
<a id="schema"></a>

### `<Static>``<Private>` schema

**● schema**: *`IStreamSchema`* =  schema

*Defined in [api/stream/Request.ts:33](https://github.com/paradigmfoundation/paradigmcore/blob/e540330/src/api/stream/Request.ts#L33)*

Stream API definition JSON.

___

## Methods

<a id="addvalerr"></a>

### `<Private>` addValErr

▸ **addValErr**(code: *`number`*, msg?: *`string`*): `void`

*Defined in [api/stream/Request.ts:155](https://github.com/paradigmfoundation/paradigmcore/blob/e540330/src/api/stream/Request.ts#L155)*

Add a newly detected validation error to the array of detected errors.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| code | `number` |
| `Optional` msg | `string` |  the additional validation error log |

**Returns:** `void`

___
<a id="close"></a>

### `<Private>` close

▸ **close**(err?: *`ValidationError`*): `any`

*Defined in [api/stream/Request.ts:168](https://github.com/paradigmfoundation/paradigmcore/blob/e540330/src/api/stream/Request.ts#L168)*

Finish a validation and set the result to prevent future testing.

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` err | `ValidationError` |

**Returns:** `any`

___
<a id="tojson"></a>

###  toJSON

▸ **toJSON**(): `IParsedRequest`

*Defined in [api/stream/Request.ts:75](https://github.com/paradigmfoundation/paradigmcore/blob/e540330/src/api/stream/Request.ts#L75)*

Generate valid JSON object only will necessary params.

**Returns:** `IParsedRequest`

___
<a id="validate"></a>

###  validate

▸ **validate**(): `ValidationError`

*Defined in [api/stream/Request.ts:85](https://github.com/paradigmfoundation/paradigmcore/blob/e540330/src/api/stream/Request.ts#L85)*

Trigger validation steps.

*__todo__*: expand doc of this function.

**Returns:** `ValidationError`

___
<a id="validaterequiredparam"></a>

### `<Private>` validateRequiredParam

▸ **validateRequiredParam**(def: *`ISchemaProperty`*, param: *`any`*, name: *`string`*): `void`

*Defined in [api/stream/Request.ts:130](https://github.com/paradigmfoundation/paradigmcore/blob/e540330/src/api/stream/Request.ts#L130)*

*__todo__*: document

**Parameters:**

| Name | Type |
| ------ | ------ |
| def | `ISchemaProperty` |
| param | `any` |
| name | `string` |

**Returns:** `void`

___

