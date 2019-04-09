[ParadigmCore](../README.md) > ["common/log"](../modules/_common_log_.md)

# External module: "common/log"

## Index

### Variables

* [level](_common_log_.md#level)
* [version](_common_log_.md#version)

### Functions

* [err](_common_log_.md#err)
* [log](_common_log_.md#log)
* [logStart](_common_log_.md#logstart)
* [print](_common_log_.md#print)
* [ts](_common_log_.md#ts)
* [warn](_common_log_.md#warn)

---

## Variables

<a id="level"></a>

### `<Const>` level

**● level**: *`number`* =  process.env.LOG_LEVEL ? parseInt(process.env.LOG_LEVEL, 10) : 0

*Defined in [common/log.ts:21](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/log.ts#L21)*

___
<a id="version"></a>

### `<Const>` version

**● version**: *`string`* =  process.env.npm_package_version

*Defined in [common/log.ts:22](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/log.ts#L22)*

___

## Functions

<a id="err"></a>

###  err

▸ **err**(mod: *`string`*, msg: *`string`*): `void`

*Defined in [common/log.ts:119](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/log.ts#L119)*

General error log function.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| mod | `string` |  module reporting error |
| msg | `string` |  error message |

**Returns:** `void`

___
<a id="log"></a>

###  log

▸ **log**(mod: *`string`*, msg: *`string`*, height?: *`number`*, hash?: *`string`*): `void`

*Defined in [common/log.ts:77](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/log.ts#L77)*

General info log function.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| mod | `string` |  module reporting information |
| msg | `string` |  the reported information message |
| `Optional` height | `number` |  optional block height for core messages |
| `Optional` hash | `string` |  optional appHash for commit messages |

**Returns:** `void`

___
<a id="logstart"></a>

###  logStart

▸ **logStart**(msg?: *`any`*): `void`

*Defined in [common/log.ts:49](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/log.ts#L49)*

Logger used during startup, with special case for very first message.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| `Optional` msg | `any` |  startup message |

**Returns:** `void`

___
<a id="print"></a>

###  print

▸ **print**(msg: *`any`*, lvl: *`any`*): `void`

*Defined in [common/log.ts:38](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/log.ts#L38)*

Output log message (formatted) to stdout.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| msg | `any` |  message to write to stdout |
| lvl | `any` |  log level of message |

**Returns:** `void`

___
<a id="ts"></a>

###  ts

▸ **ts**(): `string`

*Defined in [common/log.ts:27](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/log.ts#L27)*

Creates a pretty timestamp string.

**Returns:** `string`

___
<a id="warn"></a>

###  warn

▸ **warn**(mod: *`string`*, msg: *`string`*): `void`

*Defined in [common/log.ts:100](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/log.ts#L100)*

General warning log function.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| mod | `string` |  module reporting warning |
| msg | `string` |  warning message |

**Returns:** `void`

___

