[paradigm-contracts](../README.md) > ["src/api/stream/JsonRequest"](../modules/_src_api_stream_jsonrequest_.md) > [JsonRequest](../classes/_src_api_stream_jsonrequest_.jsonrequest.md)

# Class: JsonRequest

JSON-RPC 2.0 compliant implementation of the Stream API request messages.

A work in progress as of 06 Feb. 2019

See: [https://www.jsonrpc.org/specification](https://www.jsonrpc.org/specification)

## Hierarchy

**JsonRequest**

## Index

### Constructors

* [constructor](_src_api_stream_jsonrequest_.jsonrequest.md#constructor)

### Properties

* [err](_src_api_stream_jsonrequest_.jsonrequest.md#err)
* [parsed](_src_api_stream_jsonrequest_.jsonrequest.md#parsed)
* [raw](_src_api_stream_jsonrequest_.jsonrequest.md#raw)
* [valid](_src_api_stream_jsonrequest_.jsonrequest.md#valid)
* [api](_src_api_stream_jsonrequest_.jsonrequest.md#api)

### Methods

* [addValErr](_src_api_stream_jsonrequest_.jsonrequest.md#addvalerr)
* [close](_src_api_stream_jsonrequest_.jsonrequest.md#close)
* [toJSON](_src_api_stream_jsonrequest_.jsonrequest.md#tojson)
* [validate](_src_api_stream_jsonrequest_.jsonrequest.md#validate)
* [validateExpParam](_src_api_stream_jsonrequest_.jsonrequest.md#validateexpparam)
* [validateMethodParams](_src_api_stream_jsonrequest_.jsonrequest.md#validatemethodparams)
* [validateOptionParam](_src_api_stream_jsonrequest_.jsonrequest.md#validateoptionparam)
* [validateRequestProperties](_src_api_stream_jsonrequest_.jsonrequest.md#validaterequestproperties)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new JsonRequest**(input: *`string`*): [JsonRequest](_src_api_stream_jsonrequest_.jsonrequest.md)

*Defined in [src/api/stream/JsonRequest.ts:50](https://github.com/paradigmfoundation/paradigmcore/blob/11f2a53/src/api/stream/JsonRequest.ts#L50)*

Create a new JSONRPC request instance.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| input | `string` |  raw input JSONRPC request string. |

**Returns:** [JsonRequest](_src_api_stream_jsonrequest_.jsonrequest.md)

___

## Properties

<a id="err"></a>

### `<Private>` err

**● err**: *`ValidationError`*

*Defined in [src/api/stream/JsonRequest.ts:44](https://github.com/paradigmfoundation/paradigmcore/blob/11f2a53/src/api/stream/JsonRequest.ts#L44)*

The first validation error encountered, if any.

___
<a id="parsed"></a>

###  parsed

**● parsed**: *`IParsedRequest`*

*Defined in [src/api/stream/JsonRequest.ts:39](https://github.com/paradigmfoundation/paradigmcore/blob/11f2a53/src/api/stream/JsonRequest.ts#L39)*

Parsed request object.

___
<a id="raw"></a>

### `<Private>` raw

**● raw**: *`string`*

*Defined in [src/api/stream/JsonRequest.ts:34](https://github.com/paradigmfoundation/paradigmcore/blob/11f2a53/src/api/stream/JsonRequest.ts#L34)*

Raw input string, deleted after parsing.

___
<a id="valid"></a>

### `<Private>` valid

**● valid**: *`boolean`*

*Defined in [src/api/stream/JsonRequest.ts:50](https://github.com/paradigmfoundation/paradigmcore/blob/11f2a53/src/api/stream/JsonRequest.ts#L50)*

Set to true or false depending on result of `JsonRequest.prototype. validate()`, and set to `null` beforehand.

___
<a id="api"></a>

### `<Static>``<Private>` api

**● api**: *`IStreamAPI`* =  api

*Defined in [src/api/stream/JsonRequest.ts:29](https://github.com/paradigmfoundation/paradigmcore/blob/11f2a53/src/api/stream/JsonRequest.ts#L29)*

Stream API definition JSON.

___

## Methods

<a id="addvalerr"></a>

###  addValErr

▸ **addValErr**(code: *`string`*, msg?: *`string`*): `void`

*Defined in [src/api/stream/JsonRequest.ts:194](https://github.com/paradigmfoundation/paradigmcore/blob/11f2a53/src/api/stream/JsonRequest.ts#L194)*

Add a newly detected validation error to the array of detected errors.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| code | `string` |
| `Optional` msg | `string` |  the additional validation error log |

**Returns:** `void`

___
<a id="close"></a>

###  close

▸ **close**(err?: *`ValidationError`*): `any`

*Defined in [src/api/stream/JsonRequest.ts:207](https://github.com/paradigmfoundation/paradigmcore/blob/11f2a53/src/api/stream/JsonRequest.ts#L207)*

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

*Defined in [src/api/stream/JsonRequest.ts:66](https://github.com/paradigmfoundation/paradigmcore/blob/11f2a53/src/api/stream/JsonRequest.ts#L66)*

Generate valid JSON object only will necessary params.

**Returns:** `IParsedRequest`

___
<a id="validate"></a>

###  validate

▸ **validate**(): `ValidationError`

*Defined in [src/api/stream/JsonRequest.ts:76](https://github.com/paradigmfoundation/paradigmcore/blob/11f2a53/src/api/stream/JsonRequest.ts#L76)*

Trigger validation steps.

*__todo__*: expand doc of this function.

**Returns:** `ValidationError`

___
<a id="validateexpparam"></a>

###  validateExpParam

▸ **validateExpParam**(key: *`string`*, rgxp: *`string`*, code: *`string`*, log: *`string`*): `void`

*Defined in [src/api/stream/JsonRequest.ts:165](https://github.com/paradigmfoundation/paradigmcore/blob/11f2a53/src/api/stream/JsonRequest.ts#L165)*

Validate params that can be validated via regular expression testing.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| key | `string` |  target parameter key string |
| rgxp | `string` |  regex string to test against |
| code | `string` |  error code if param failure detected |
| log | `string` |  error log message if param failure |

**Returns:** `void`

___
<a id="validatemethodparams"></a>

###  validateMethodParams

▸ **validateMethodParams**(method?: *`string`*, params?: *`IParam`*): `void`

*Defined in [src/api/stream/JsonRequest.ts:155](https://github.com/paradigmfoundation/paradigmcore/blob/11f2a53/src/api/stream/JsonRequest.ts#L155)*

Not implemented yet.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| `Optional` method | `string` |  \- |
| `Optional` params | `IParam` |   |

**Returns:** `void`

___
<a id="validateoptionparam"></a>

###  validateOptionParam

▸ **validateOptionParam**(code: *`string`*, options: *`string`[]*, query: *`string`*): `void`

*Defined in [src/api/stream/JsonRequest.ts:180](https://github.com/paradigmfoundation/paradigmcore/blob/11f2a53/src/api/stream/JsonRequest.ts#L180)*

Validate a param where the possible values are contained within `options`.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| code | `string` |
| options | `string`[] |  array of possible string values |
| query | `string` |  the string key included in the request |

**Returns:** `void`

___
<a id="validaterequestproperties"></a>

###  validateRequestProperties

▸ **validateRequestProperties**(prop: *`IRequestProperty`*): `void`

*Defined in [src/api/stream/JsonRequest.ts:110](https://github.com/paradigmfoundation/paradigmcore/blob/11f2a53/src/api/stream/JsonRequest.ts#L110)*

Not implemented yet.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| prop | `IRequestProperty` |   |

**Returns:** `void`

___

