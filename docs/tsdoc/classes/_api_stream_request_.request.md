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
* [api](_api_stream_request_.request.md#api)
* [schema](_api_stream_request_.request.md#schema)

### Methods

* [addValErr](_api_stream_request_.request.md#addvalerr)
* [close](_api_stream_request_.request.md#close)
* [toJSON](_api_stream_request_.request.md#tojson)
* [validate](_api_stream_request_.request.md#validate)
* [validateExpParam](_api_stream_request_.request.md#validateexpparam)
* [validateMethodParams](_api_stream_request_.request.md#validatemethodparams)
* [validateOptionParam](_api_stream_request_.request.md#validateoptionparam)
* [validateRequestProperties](_api_stream_request_.request.md#validaterequestproperties)
* [validateRequiredParam](_api_stream_request_.request.md#validaterequiredparam)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Request**(input: *`any`*): [Request](_api_stream_request_.request.md)

*Defined in [api/stream/Request.ts:59](https://github.com/paradigmfoundation/paradigmcore/blob/99f4a81/src/api/stream/Request.ts#L59)*

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

*Defined in [api/stream/Request.ts:53](https://github.com/paradigmfoundation/paradigmcore/blob/99f4a81/src/api/stream/Request.ts#L53)*

The first validation error encountered, if any.

___
<a id="parsed"></a>

###  parsed

**● parsed**: *`IParsedRequest`*

*Defined in [api/stream/Request.ts:48](https://github.com/paradigmfoundation/paradigmcore/blob/99f4a81/src/api/stream/Request.ts#L48)*

Parsed request object.

___
<a id="raw"></a>

### `<Private>` raw

**● raw**: *`string`*

*Defined in [api/stream/Request.ts:43](https://github.com/paradigmfoundation/paradigmcore/blob/99f4a81/src/api/stream/Request.ts#L43)*

Raw input string, deleted after parsing.

___
<a id="valid"></a>

### `<Private>` valid

**● valid**: *`boolean`*

*Defined in [api/stream/Request.ts:59](https://github.com/paradigmfoundation/paradigmcore/blob/99f4a81/src/api/stream/Request.ts#L59)*

Set to true or false depending on result of `JsonRequest.prototype. validate()`, and set to `null` beforehand.

___
<a id="api"></a>

### `<Static>``<Private>` api

**● api**: *`IStreamAPI`* =  api

*Defined in [api/stream/Request.ts:38](https://github.com/paradigmfoundation/paradigmcore/blob/99f4a81/src/api/stream/Request.ts#L38)*

Top-level definitions for JSONRPC request/responses.

___
<a id="schema"></a>

### `<Static>``<Private>` schema

**● schema**: *`IStreamSchema`* =  schema

*Defined in [api/stream/Request.ts:33](https://github.com/paradigmfoundation/paradigmcore/blob/99f4a81/src/api/stream/Request.ts#L33)*

Stream API definition JSON.

___

## Methods

<a id="addvalerr"></a>

### `<Private>` addValErr

▸ **addValErr**(code: *`number`*, msg?: *`string`*): `void`

*Defined in [api/stream/Request.ts:253](https://github.com/paradigmfoundation/paradigmcore/blob/99f4a81/src/api/stream/Request.ts#L253)*

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

*Defined in [api/stream/Request.ts:266](https://github.com/paradigmfoundation/paradigmcore/blob/99f4a81/src/api/stream/Request.ts#L266)*

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

*Defined in [api/stream/Request.ts:75](https://github.com/paradigmfoundation/paradigmcore/blob/99f4a81/src/api/stream/Request.ts#L75)*

Generate valid JSON object only will necessary params.

**Returns:** `IParsedRequest`

___
<a id="validate"></a>

###  validate

▸ **validate**(): `ValidationError`

*Defined in [api/stream/Request.ts:85](https://github.com/paradigmfoundation/paradigmcore/blob/99f4a81/src/api/stream/Request.ts#L85)*

Trigger validation steps.

*__todo__*: expand doc of this function.

**Returns:** `ValidationError`

___
<a id="validateexpparam"></a>

### `<Private>` validateExpParam

▸ **validateExpParam**(key: *`string`*, rgxp: *`string`*, code: *`number`*, log: *`string`*): `void`

*Defined in [api/stream/Request.ts:224](https://github.com/paradigmfoundation/paradigmcore/blob/99f4a81/src/api/stream/Request.ts#L224)*

Validate params that can be validated via regular expression testing.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| key | `string` |  target parameter key string |
| rgxp | `string` |  regex string to test against |
| code | `number` |  error code if param failure detected |
| log | `string` |  error log message if param failure |

**Returns:** `void`

___
<a id="validatemethodparams"></a>

###  validateMethodParams

▸ **validateMethodParams**(method?: *`string`*, params?: *`IParam`*): `void`

*Defined in [api/stream/Request.ts:214](https://github.com/paradigmfoundation/paradigmcore/blob/99f4a81/src/api/stream/Request.ts#L214)*

Not implemented yet.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| `Optional` method | `string` |  \- |
| `Optional` params | `IParam` |   |

**Returns:** `void`

___
<a id="validateoptionparam"></a>

### `<Private>` validateOptionParam

▸ **validateOptionParam**(code: *`number`*, options: *`string`[]*, query: *`string`*): `void`

*Defined in [api/stream/Request.ts:239](https://github.com/paradigmfoundation/paradigmcore/blob/99f4a81/src/api/stream/Request.ts#L239)*

Validate a param where the possible values are contained within `options`.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| code | `number` |
| options | `string`[] |  array of possible string values |
| query | `string` |  the string key included in the request |

**Returns:** `void`

___
<a id="validaterequestproperties"></a>

### `<Private>` validateRequestProperties

▸ **validateRequestProperties**(prop: *`IRequestProperty`*): `void`

*Defined in [api/stream/Request.ts:167](https://github.com/paradigmfoundation/paradigmcore/blob/99f4a81/src/api/stream/Request.ts#L167)*

Not implemented yet.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| prop | `IRequestProperty` |   |

**Returns:** `void`

___
<a id="validaterequiredparam"></a>

### `<Private>` validateRequiredParam

▸ **validateRequiredParam**(def: *`ISchemaProperty`*, param: *`any`*, name: *`string`*): `void`

*Defined in [api/stream/Request.ts:141](https://github.com/paradigmfoundation/paradigmcore/blob/99f4a81/src/api/stream/Request.ts#L141)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| def | `ISchemaProperty` |
| param | `any` |
| name | `string` |

**Returns:** `void`

___

