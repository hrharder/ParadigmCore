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

*Defined in [common/log.ts:5](https://github.com/paradigmfoundation/paradigmcore/blob/adc87ed/src/common/log.ts#L5)*

___
<a id="version"></a>

### `<Const>` version

**● version**: *`string`* =  process.env.npm_package_version

*Defined in [common/log.ts:6](https://github.com/paradigmfoundation/paradigmcore/blob/adc87ed/src/common/log.ts#L6)*

___

## Functions

<a id="err"></a>

###  err

▸ **err**(mod: *`string`*, msg: *`string`*): `void`

*Defined in [common/log.ts:69](https://github.com/paradigmfoundation/paradigmcore/blob/adc87ed/src/common/log.ts#L69)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| mod | `string` |
| msg | `string` |

**Returns:** `void`

___
<a id="log"></a>

###  log

▸ **log**(mod: *`string`*, msg: *`string`*, height?: *`number`*, hash?: *`string`*): `void`

*Defined in [common/log.ts:39](https://github.com/paradigmfoundation/paradigmcore/blob/adc87ed/src/common/log.ts#L39)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| mod | `string` |
| msg | `string` |
| `Optional` height | `number` |
| `Optional` hash | `string` |

**Returns:** `void`

___
<a id="logstart"></a>

###  logStart

▸ **logStart**(msg?: *`any`*): `void`

*Defined in [common/log.ts:19](https://github.com/paradigmfoundation/paradigmcore/blob/adc87ed/src/common/log.ts#L19)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` msg | `any` |

**Returns:** `void`

___
<a id="print"></a>

###  print

▸ **print**(msg: *`any`*, lvl: *`any`*): `void`

*Defined in [common/log.ts:13](https://github.com/paradigmfoundation/paradigmcore/blob/adc87ed/src/common/log.ts#L13)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| msg | `any` |
| lvl | `any` |

**Returns:** `void`

___
<a id="ts"></a>

###  ts

▸ **ts**(): `string`

*Defined in [common/log.ts:8](https://github.com/paradigmfoundation/paradigmcore/blob/adc87ed/src/common/log.ts#L8)*

**Returns:** `string`

___
<a id="warn"></a>

###  warn

▸ **warn**(mod: *`string`*, msg: *`string`*): `void`

*Defined in [common/log.ts:56](https://github.com/paradigmfoundation/paradigmcore/blob/adc87ed/src/common/log.ts#L56)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| mod | `string` |
| msg | `string` |

**Returns:** `void`

___

