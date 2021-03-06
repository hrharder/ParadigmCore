[ParadigmCore](../README.md) > ["common/Queue"](../modules/_common_queue_.md) > [Queue](../classes/_common_queue_.queue.md)

# Class: Queue

\=========================== ParadigmCore: Blind Star

*__name__*: Queue.ts

*__module__*: src/util
========

*__author__*: Henry Harder

*__date__*: (initial) 28-October-2018

*__date__*: (modified) 02-November-2018

Generalized queue implementation. Currently used in Broadcaster class.

## Type parameters
#### T 
#### T 
#### T 
#### T 
#### T 
#### T 
## Hierarchy

 `Array`

**↳ Queue**

## Indexable

\[n: `number`\]:&nbsp;`T`
\=========================== ParadigmCore: Blind Star

## Index

### Constructors

* [constructor](_common_queue_.queue.md#constructor)

### Properties

* [length](_common_queue_.queue.md#length)
* [Array](_common_queue_.queue.md#array)

### Methods

* [__@iterator](_common_queue_.queue.md#___iterator)
* [__@unscopables](_common_queue_.queue.md#___unscopables)
* [add](_common_queue_.queue.md#add)
* [allItems](_common_queue_.queue.md#allitems)
* [concat](_common_queue_.queue.md#concat)
* [copyWithin](_common_queue_.queue.md#copywithin)
* [entries](_common_queue_.queue.md#entries)
* [every](_common_queue_.queue.md#every)
* [fill](_common_queue_.queue.md#fill)
* [filter](_common_queue_.queue.md#filter)
* [find](_common_queue_.queue.md#find)
* [findIndex](_common_queue_.queue.md#findindex)
* [flat](_common_queue_.queue.md#flat)
* [flatMap](_common_queue_.queue.md#flatmap)
* [forEach](_common_queue_.queue.md#foreach)
* [front](_common_queue_.queue.md#front)
* [includes](_common_queue_.queue.md#includes)
* [indexOf](_common_queue_.queue.md#indexof)
* [isEmpty](_common_queue_.queue.md#isempty)
* [join](_common_queue_.queue.md#join)
* [keys](_common_queue_.queue.md#keys)
* [lastIndexOf](_common_queue_.queue.md#lastindexof)
* [map](_common_queue_.queue.md#map)
* [pop](_common_queue_.queue.md#pop)
* [push](_common_queue_.queue.md#push)
* [reduce](_common_queue_.queue.md#reduce)
* [reduceRight](_common_queue_.queue.md#reduceright)
* [remove](_common_queue_.queue.md#remove)
* [reverse](_common_queue_.queue.md#reverse)
* [shift](_common_queue_.queue.md#shift)
* [slice](_common_queue_.queue.md#slice)
* [some](_common_queue_.queue.md#some)
* [sort](_common_queue_.queue.md#sort)
* [splice](_common_queue_.queue.md#splice)
* [toLocaleString](_common_queue_.queue.md#tolocalestring)
* [toString](_common_queue_.queue.md#tostring)
* [unshift](_common_queue_.queue.md#unshift)
* [values](_common_queue_.queue.md#values)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Queue**(): [Queue](_common_queue_.queue.md)

*Defined in [common/Queue.ts:15](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/Queue.ts#L15)*

**Returns:** [Queue](_common_queue_.queue.md)

___

## Properties

<a id="length"></a>

###  length

**● length**: *`number`*

*Inherited from Array.length*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/typescript/lib/lib.es5.d.ts:1199*

Gets or sets the length of the array. This is a number one higher than the highest element defined in an array.

___
<a id="array"></a>

### `<Static>` Array

**● Array**: *`ArrayConstructor`*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/typescript/lib/lib.es5.d.ts:1358*

___

## Methods

<a id="___iterator"></a>

###  __@iterator

▸ **__@iterator**(): `IterableIterator`<`T`>

*Inherited from Array.[Symbol.iterator]*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/typescript/lib/lib.es2015.iterable.d.ts:52*

Iterator

**Returns:** `IterableIterator`<`T`>

___
<a id="___unscopables"></a>

###  __@unscopables

▸ **__@unscopables**(): `object`

*Inherited from Array.[Symbol.unscopables]*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:94*

Returns an object whose properties have the value 'true' when they will be absent when used in a 'with' statement.

**Returns:** `object`

___
<a id="add"></a>

###  add

▸ **add**(item: *`any`*): `void`

*Defined in [common/Queue.ts:28](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/Queue.ts#L28)*

Add an item to the queue.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| item | `any` |  the item to add to the queue. |

**Returns:** `void`

___
<a id="allitems"></a>

###  allItems

▸ **allItems**(): `string`

*Defined in [common/Queue.ts:49](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/Queue.ts#L49)*

Returns a string of all items.

**Returns:** `string`
string

___
<a id="concat"></a>

###  concat

▸ **concat**(...items: *`ConcatArray`<`T`>[]*): `T`[]

▸ **concat**(...items: *(`T` \| `ConcatArray`<`T`>)[]*): `T`[]

*Inherited from Array.concat*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/typescript/lib/lib.es5.d.ts:1221*

Combines two or more arrays.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| `Rest` items | `ConcatArray`<`T`>[] |  Additional items to add to the end of array1. |

**Returns:** `T`[]

*Inherited from Array.concat*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/typescript/lib/lib.es5.d.ts:1226*

Combines two or more arrays.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| `Rest` items | (`T` \| `ConcatArray`<`T`>)[] |  Additional items to add to the end of array1. |

**Returns:** `T`[]

___
<a id="copywithin"></a>

###  copyWithin

▸ **copyWithin**(target: *`number`*, start: *`number`*, end?: *`number`*): `this`

*Inherited from Array.copyWithin*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/typescript/lib/lib.es2015.core.d.ts:64*

Returns the this object after copying a section of the array identified by start and end to the same array starting at position target

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| target | `number` |  If target is negative, it is treated as length+target where length is the length of the array. |
| start | `number` |  If start is negative, it is treated as length+start. If end is negative, it is treated as length+end. |
| `Optional` end | `number` |  If not specified, length of the this object is used as its default value. |

**Returns:** `this`

___
<a id="entries"></a>

###  entries

▸ **entries**(): `IterableIterator`<[`number`, `T`]>

*Inherited from Array.entries*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/typescript/lib/lib.es2015.iterable.d.ts:57*

Returns an iterable of key, value pairs for every entry in the array

**Returns:** `IterableIterator`<[`number`, `T`]>

___
<a id="every"></a>

###  every

▸ **every**(callbackfn: *`function`*, thisArg?: *`any`*): `boolean`

*Inherited from Array.every*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/typescript/lib/lib.es5.d.ts:1286*

Determines whether all the members of an array satisfy the specified test.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| callbackfn | `function` |  A function that accepts up to three arguments. The every method calls the callbackfn function for each element in array1 until the callbackfn returns false, or until the end of the array. |
| `Optional` thisArg | `any` |  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value. |

**Returns:** `boolean`

___
<a id="fill"></a>

###  fill

▸ **fill**(value: *`T`*, start?: *`number`*, end?: *`number`*): `this`

*Inherited from Array.fill*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/typescript/lib/lib.es2015.core.d.ts:53*

Returns the this object after filling the section identified by start and end with value

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| value | `T` |  value to fill array section with |
| `Optional` start | `number` |  index to start filling the array at. If start is negative, it is treated as length+start where length is the length of the array. |
| `Optional` end | `number` |  index to stop filling the array at. If end is negative, it is treated as length+end. |

**Returns:** `this`

___
<a id="filter"></a>

###  filter

▸ **filter**<`S`>(callbackfn: *`function`*, thisArg?: *`any`*): `S`[]

▸ **filter**(callbackfn: *`function`*, thisArg?: *`any`*): `T`[]

*Inherited from Array.filter*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/typescript/lib/lib.es5.d.ts:1310*

Returns the elements of an array that meet the condition specified in a callback function.

**Type parameters:**

#### S :  `T`
**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| callbackfn | `function` |  A function that accepts up to three arguments. The filter method calls the callbackfn function one time for each element in the array. |
| `Optional` thisArg | `any` |  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value. |

**Returns:** `S`[]

*Inherited from Array.filter*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/typescript/lib/lib.es5.d.ts:1316*

Returns the elements of an array that meet the condition specified in a callback function.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| callbackfn | `function` |  A function that accepts up to three arguments. The filter method calls the callbackfn function one time for each element in the array. |
| `Optional` thisArg | `any` |  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value. |

**Returns:** `T`[]

___
<a id="find"></a>

###  find

▸ **find**<`S`>(predicate: *`function`*, thisArg?: *`any`*): `S` \| `undefined`

▸ **find**(predicate: *`function`*, thisArg?: *`any`*): `T` \| `undefined`

*Inherited from Array.find*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/typescript/lib/lib.es2015.core.d.ts:31*

Returns the value of the first element in the array where predicate is true, and undefined otherwise.

**Type parameters:**

#### S :  `T`
**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| predicate | `function` |  find calls predicate once for each element of the array, in ascending order, until it finds one where predicate returns true. If such an element is found, find immediately returns that element value. Otherwise, find returns undefined. |
| `Optional` thisArg | `any` |  If provided, it will be used as the this value for each invocation of predicate. If it is not provided, undefined is used instead. |

**Returns:** `S` \| `undefined`

*Inherited from Array.find*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/typescript/lib/lib.es2015.core.d.ts:32*

**Parameters:**

| Name | Type |
| ------ | ------ |
| predicate | `function` |
| `Optional` thisArg | `any` |

**Returns:** `T` \| `undefined`

___
<a id="findindex"></a>

###  findIndex

▸ **findIndex**(predicate: *`function`*, thisArg?: *`any`*): `number`

*Inherited from Array.findIndex*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/typescript/lib/lib.es2015.core.d.ts:43*

Returns the index of the first element in the array where predicate is true, and -1 otherwise.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| predicate | `function` |  find calls predicate once for each element of the array, in ascending order, until it finds one where predicate returns true. If such an element is found, findIndex immediately returns that element index. Otherwise, findIndex returns -1. |
| `Optional` thisArg | `any` |  If provided, it will be used as the this value for each invocation of predicate. If it is not provided, undefined is used instead. |

**Returns:** `number`

___
<a id="flat"></a>

###  flat

▸ **flat**<`U`>(this: *`U`[][][][][][][][]*, depth: *`7`*): `U`[]

▸ **flat**<`U`>(this: *`U`[][][][][][][]*, depth: *`6`*): `U`[]

▸ **flat**<`U`>(this: *`U`[][][][][][]*, depth: *`5`*): `U`[]

▸ **flat**<`U`>(this: *`U`[][][][][]*, depth: *`4`*): `U`[]

▸ **flat**<`U`>(this: *`U`[][][][]*, depth: *`3`*): `U`[]

▸ **flat**<`U`>(this: *`U`[][][]*, depth: *`2`*): `U`[]

▸ **flat**<`U`>(this: *`U`[][]*, depth?: *`1`*): `U`[]

▸ **flat**<`U`>(this: *`U`[]*, depth: *`0`*): `U`[]

▸ **flat**<`U`>(depth?: *`number`*): `any`[]

*Inherited from Array.flat*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/typescript/lib/lib.esnext.array.d.ts:158*

Returns a new array with all sub-array elements concatenated into it recursively up to the specified depth.

**Type parameters:**

#### U 
**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| this | `U`[][][][][][][][] |
| depth | `7` |  The maximum recursion depth |

**Returns:** `U`[]

*Inherited from Array.flat*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/typescript/lib/lib.esnext.array.d.ts:166*

Returns a new array with all sub-array elements concatenated into it recursively up to the specified depth.

**Type parameters:**

#### U 
**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| this | `U`[][][][][][][] |
| depth | `6` |  The maximum recursion depth |

**Returns:** `U`[]

*Inherited from Array.flat*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/typescript/lib/lib.esnext.array.d.ts:174*

Returns a new array with all sub-array elements concatenated into it recursively up to the specified depth.

**Type parameters:**

#### U 
**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| this | `U`[][][][][][] |
| depth | `5` |  The maximum recursion depth |

**Returns:** `U`[]

*Inherited from Array.flat*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/typescript/lib/lib.esnext.array.d.ts:182*

Returns a new array with all sub-array elements concatenated into it recursively up to the specified depth.

**Type parameters:**

#### U 
**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| this | `U`[][][][][] |
| depth | `4` |  The maximum recursion depth |

**Returns:** `U`[]

*Inherited from Array.flat*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/typescript/lib/lib.esnext.array.d.ts:190*

Returns a new array with all sub-array elements concatenated into it recursively up to the specified depth.

**Type parameters:**

#### U 
**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| this | `U`[][][][] |
| depth | `3` |  The maximum recursion depth |

**Returns:** `U`[]

*Inherited from Array.flat*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/typescript/lib/lib.esnext.array.d.ts:198*

Returns a new array with all sub-array elements concatenated into it recursively up to the specified depth.

**Type parameters:**

#### U 
**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| this | `U`[][][] |
| depth | `2` |  The maximum recursion depth |

**Returns:** `U`[]

*Inherited from Array.flat*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/typescript/lib/lib.esnext.array.d.ts:206*

Returns a new array with all sub-array elements concatenated into it recursively up to the specified depth.

**Type parameters:**

#### U 
**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| this | `U`[][] |
| `Optional` depth | `1` |  The maximum recursion depth |

**Returns:** `U`[]

*Inherited from Array.flat*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/typescript/lib/lib.esnext.array.d.ts:214*

Returns a new array with all sub-array elements concatenated into it recursively up to the specified depth.

**Type parameters:**

#### U 
**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| this | `U`[] |
| depth | `0` |  The maximum recursion depth |

**Returns:** `U`[]

*Inherited from Array.flat*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/typescript/lib/lib.esnext.array.d.ts:222*

Returns a new array with all sub-array elements concatenated into it recursively up to the specified depth. If no depth is provided, flat method defaults to the depth of 1.

**Type parameters:**

#### U 
**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| `Optional` depth | `number` |  The maximum recursion depth |

**Returns:** `any`[]

___
<a id="flatmap"></a>

###  flatMap

▸ **flatMap**<`U`,`This`>(callback: *`function`*, thisArg?: *`This`*): `U`[]

*Inherited from Array.flatMap*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/typescript/lib/lib.esnext.array.d.ts:147*

Calls a defined callback function on each element of an array. Then, flattens the result into a new array. This is identical to a map followed by flat with depth 1.

**Type parameters:**

#### U 
#### This 
**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| callback | `function` |  A function that accepts up to three arguments. The flatMap method calls the callback function one time for each element in the array. |
| `Optional` thisArg | `This` |  An object to which the this keyword can refer in the callback function. If thisArg is omitted, undefined is used as the this value. |

**Returns:** `U`[]

___
<a id="foreach"></a>

###  forEach

▸ **forEach**(callbackfn: *`function`*, thisArg?: *`any`*): `void`

*Inherited from Array.forEach*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/typescript/lib/lib.es5.d.ts:1298*

Performs the specified action for each element in an array.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| callbackfn | `function` |  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array. |
| `Optional` thisArg | `any` |  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value. |

**Returns:** `void`

___
<a id="front"></a>

###  front

▸ **front**(): `any`

*Defined in [common/Queue.ts:42](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/Queue.ts#L42)*

Returns the first item in the queue.

**Returns:** `any`
<T>

___
<a id="includes"></a>

###  includes

▸ **includes**(searchElement: *`T`*, fromIndex?: *`number`*): `boolean`

*Inherited from Array.includes*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/typescript/lib/lib.es2016.array.include.d.ts:27*

Determines whether an array includes a certain element, returning true or false as appropriate.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| searchElement | `T` |  The element to search for. |
| `Optional` fromIndex | `number` |  The position in this array at which to begin searching for searchElement. |

**Returns:** `boolean`

___
<a id="indexof"></a>

###  indexOf

▸ **indexOf**(searchElement: *`T`*, fromIndex?: *`number`*): `number`

*Inherited from Array.indexOf*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/typescript/lib/lib.es5.d.ts:1274*

Returns the index of the first occurrence of a value in an array.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| searchElement | `T` |  The value to locate in the array. |
| `Optional` fromIndex | `number` |  The array index at which to begin the search. If fromIndex is omitted, the search starts at index 0. |

**Returns:** `number`

___
<a id="isempty"></a>

###  isEmpty

▸ **isEmpty**(): `boolean`

*Defined in [common/Queue.ts:56](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/Queue.ts#L56)*

Returns true if queue is empty.

**Returns:** `boolean`
boolean

___
<a id="join"></a>

###  join

▸ **join**(separator?: *`string`*): `string`

*Inherited from Array.join*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/typescript/lib/lib.es5.d.ts:1231*

Adds all the elements of an array separated by the specified separator string.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| `Optional` separator | `string` |  A string used to separate one element of an array from the next in the resulting String. If omitted, the array elements are separated with a comma. |

**Returns:** `string`

___
<a id="keys"></a>

###  keys

▸ **keys**(): `IterableIterator`<`number`>

*Inherited from Array.keys*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/typescript/lib/lib.es2015.iterable.d.ts:62*

Returns an iterable of keys in the array

**Returns:** `IterableIterator`<`number`>

___
<a id="lastindexof"></a>

###  lastIndexOf

▸ **lastIndexOf**(searchElement: *`T`*, fromIndex?: *`number`*): `number`

*Inherited from Array.lastIndexOf*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/typescript/lib/lib.es5.d.ts:1280*

Returns the index of the last occurrence of a specified value in an array.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| searchElement | `T` |  The value to locate in the array. |
| `Optional` fromIndex | `number` |  The array index at which to begin the search. If fromIndex is omitted, the search starts at the last index in the array. |

**Returns:** `number`

___
<a id="map"></a>

###  map

▸ **map**<`U`>(callbackfn: *`function`*, thisArg?: *`any`*): `U`[]

*Inherited from Array.map*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/typescript/lib/lib.es5.d.ts:1304*

Calls a defined callback function on each element of an array, and returns an array that contains the results.

**Type parameters:**

#### U 
**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| callbackfn | `function` |  A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array. |
| `Optional` thisArg | `any` |  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value. |

**Returns:** `U`[]

___
<a id="pop"></a>

###  pop

▸ **pop**(): `T` \| `undefined`

*Inherited from Array.pop*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/typescript/lib/lib.es5.d.ts:1211*

Removes the last element from an array and returns it.

**Returns:** `T` \| `undefined`

___
<a id="push"></a>

###  push

▸ **push**(...items: *`T`[]*): `number`

*Inherited from Array.push*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/typescript/lib/lib.es5.d.ts:1216*

Appends new elements to an array, and returns the new length of the array.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| `Rest` items | `T`[] |  New elements of the Array. |

**Returns:** `number`

___
<a id="reduce"></a>

###  reduce

▸ **reduce**(callbackfn: *`function`*): `T`

▸ **reduce**(callbackfn: *`function`*, initialValue: *`T`*): `T`

▸ **reduce**<`U`>(callbackfn: *`function`*, initialValue: *`U`*): `U`

*Inherited from Array.reduce*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/typescript/lib/lib.es5.d.ts:1322*

Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| callbackfn | `function` |  A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array. |

**Returns:** `T`

*Inherited from Array.reduce*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/typescript/lib/lib.es5.d.ts:1323*

**Parameters:**

| Name | Type |
| ------ | ------ |
| callbackfn | `function` |
| initialValue | `T` |

**Returns:** `T`

*Inherited from Array.reduce*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/typescript/lib/lib.es5.d.ts:1329*

Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.

**Type parameters:**

#### U 
**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| callbackfn | `function` |  A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array. |
| initialValue | `U` |  If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value. |

**Returns:** `U`

___
<a id="reduceright"></a>

###  reduceRight

▸ **reduceRight**(callbackfn: *`function`*): `T`

▸ **reduceRight**(callbackfn: *`function`*, initialValue: *`T`*): `T`

▸ **reduceRight**<`U`>(callbackfn: *`function`*, initialValue: *`U`*): `U`

*Inherited from Array.reduceRight*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/typescript/lib/lib.es5.d.ts:1335*

Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| callbackfn | `function` |  A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array. |

**Returns:** `T`

*Inherited from Array.reduceRight*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/typescript/lib/lib.es5.d.ts:1336*

**Parameters:**

| Name | Type |
| ------ | ------ |
| callbackfn | `function` |
| initialValue | `T` |

**Returns:** `T`

*Inherited from Array.reduceRight*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/typescript/lib/lib.es5.d.ts:1342*

Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.

**Type parameters:**

#### U 
**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| callbackfn | `function` |  A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array. |
| initialValue | `U` |  If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value. |

**Returns:** `U`

___
<a id="remove"></a>

###  remove

▸ **remove**(): `any`

*Defined in [common/Queue.ts:35](https://github.com/paradigmfoundation/paradigmcore/blob/96d110b/src/common/Queue.ts#L35)*

Removes and returns the first item from the queue.

returns

**Returns:** `any`

___
<a id="reverse"></a>

###  reverse

▸ **reverse**(): `T`[]

*Inherited from Array.reverse*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/typescript/lib/lib.es5.d.ts:1235*

Reverses the elements in an Array.

**Returns:** `T`[]

___
<a id="shift"></a>

###  shift

▸ **shift**(): `T` \| `undefined`

*Inherited from Array.shift*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/typescript/lib/lib.es5.d.ts:1239*

Removes the first element from an array and returns it.

**Returns:** `T` \| `undefined`

___
<a id="slice"></a>

###  slice

▸ **slice**(start?: *`number`*, end?: *`number`*): `T`[]

*Inherited from Array.slice*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/typescript/lib/lib.es5.d.ts:1245*

Returns a section of an array.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| `Optional` start | `number` |  The beginning of the specified portion of the array. |
| `Optional` end | `number` |  The end of the specified portion of the array. |

**Returns:** `T`[]

___
<a id="some"></a>

###  some

▸ **some**(callbackfn: *`function`*, thisArg?: *`any`*): `boolean`

*Inherited from Array.some*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/typescript/lib/lib.es5.d.ts:1292*

Determines whether the specified callback function returns true for any element of an array.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| callbackfn | `function` |  A function that accepts up to three arguments. The some method calls the callbackfn function for each element in array1 until the callbackfn returns true, or until the end of the array. |
| `Optional` thisArg | `any` |  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value. |

**Returns:** `boolean`

___
<a id="sort"></a>

###  sort

▸ **sort**(compareFn?: *`function`*): `this`

*Inherited from Array.sort*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/typescript/lib/lib.es5.d.ts:1250*

Sorts an array.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| `Optional` compareFn | `function` |  The name of the function used to determine the order of the elements. If omitted, the elements are sorted in ascending, ASCII character order. |

**Returns:** `this`

___
<a id="splice"></a>

###  splice

▸ **splice**(start: *`number`*, deleteCount?: *`number`*): `T`[]

▸ **splice**(start: *`number`*, deleteCount: *`number`*, ...items: *`T`[]*): `T`[]

*Inherited from Array.splice*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/typescript/lib/lib.es5.d.ts:1256*

Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| start | `number` |  The zero-based location in the array from which to start removing elements. |
| `Optional` deleteCount | `number` |  The number of elements to remove. |

**Returns:** `T`[]

*Inherited from Array.splice*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/typescript/lib/lib.es5.d.ts:1263*

Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| start | `number` |  The zero-based location in the array from which to start removing elements. |
| deleteCount | `number` |  The number of elements to remove. |
| `Rest` items | `T`[] |  Elements to insert into the array in place of the deleted elements. |

**Returns:** `T`[]

___
<a id="tolocalestring"></a>

###  toLocaleString

▸ **toLocaleString**(): `string`

*Inherited from Array.toLocaleString*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/typescript/lib/lib.es5.d.ts:1207*

Returns a string representation of an array. The elements are converted to string using their toLocalString methods.

**Returns:** `string`

___
<a id="tostring"></a>

###  toString

▸ **toString**(): `string`

*Inherited from Array.toString*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/typescript/lib/lib.es5.d.ts:1203*

Returns a string representation of an array.

**Returns:** `string`

___
<a id="unshift"></a>

###  unshift

▸ **unshift**(...items: *`T`[]*): `number`

*Inherited from Array.unshift*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/typescript/lib/lib.es5.d.ts:1268*

Inserts new elements at the start of an array.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| `Rest` items | `T`[] |  Elements to insert at the start of the Array. |

**Returns:** `number`

___
<a id="values"></a>

###  values

▸ **values**(): `IterableIterator`<`T`>

*Inherited from Array.values*

*Defined in /Users/hen/GitHub/paradigmcore-clean/node_modules/typescript/lib/lib.es2015.iterable.d.ts:67*

Returns an iterable of values in the array

**Returns:** `IterableIterator`<`T`>

___

