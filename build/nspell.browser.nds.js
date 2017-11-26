(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["nspell"] = factory();
	else
		root["nspell"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {


exports = module.exports = trim;

function trim(str){
  return str.replace(/^\s*|\s*$/g, '');
}

exports.left = function(str){
  return str.replace(/^\s*/, '');
};

exports.right = function(str){
  return str.replace(/\s*$/, '');
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = flag;

var own = {}.hasOwnProperty;

/* Check whether a word has a flag. */
function flag(values, value, flags) {
  return flags &&
    own.call(values, value) &&
    flags.indexOf(values[value]) !== -1;
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var trim = __webpack_require__(0);
var exact = __webpack_require__(10);
var flag = __webpack_require__(1);

module.exports = form;

/* Find a known form of `value`. */
function form(context, value, all) {
  var dict = context.data;
  var flags = context.flags;
  var alternative;

  value = trim(value);

  if (!value) {
    return null;
  }

  if (exact(context, value)) {
    if (!all && flag(flags, 'FORBIDDENWORD', dict[value])) {
      return null;
    }

    return value;
  }

  /* Try sentence-case if the value is upper-case. */
  if (value.toUpperCase() === value) {
    alternative = value.charAt(0) + value.slice(1).toLowerCase();

    if (ignore(flags, dict[alternative], all)) {
      return null;
    }

    if (exact(context, alternative)) {
      return alternative;
    }
  }

  /* Try lower-case. */
  alternative = value.toLowerCase();

  if (alternative !== value) {
    if (ignore(flags, dict[alternative], all)) {
      return null;
    }

    if (exact(context, alternative)) {
      return alternative;
    }
  }

  return null;
}

function ignore(flags, dict, all) {
  return flag(flags, 'KEEPCASE', dict) ||
    all ||
    flag(flags, 'FORBIDDENWORD', dict);
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = ruleCodes;

/* Parse rule codes. */
function ruleCodes(flags, value) {
  var flag = flags.FLAG;
  var result = [];
  var length;
  var index;

  if (!value) {
    return result;
  }

  if (flag === 'long') {
    index = 0;
    length = value.length;

    while (index < length) {
      result.push(value.substr(index, 2));

      index += 2;
    }

    return result;
  }

  return value.split(flag === 'num' ? ',' : '');
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(24)
var ieee754 = __webpack_require__(25)
var isArray = __webpack_require__(26)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(23)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var nspell = __webpack_require__(6);
var aff = __webpack_require__(22);
var dic = __webpack_require__(27);
module.exports = nspell({aff: aff, dic: dic});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var buffer = __webpack_require__(7);
var affix = __webpack_require__(8);

module.exports = NSpell;

var proto = NSpell.prototype;

proto.correct = __webpack_require__(9);
proto.suggest = __webpack_require__(11);
proto.spell = __webpack_require__(14);
proto.add = __webpack_require__(15);
proto.remove = __webpack_require__(16);
proto.wordCharacters = __webpack_require__(17);
proto.dictionary = __webpack_require__(18);
proto.personal = __webpack_require__(21);

/* Construct a new spelling context. */
function NSpell(aff, dic) {
  var length;
  var index;
  var dictionaries;

  if (!(this instanceof NSpell)) {
    return new NSpell(aff, dic);
  }

  if (typeof aff === 'string' || buffer(aff)) {
    if (typeof dic === 'string' || buffer(dic)) {
      dictionaries = [{dic: dic}];
    }
  } else if (aff) {
    if ('length' in aff) {
      dictionaries = aff;
      aff = aff[0] && aff[0].aff;
    } else {
      if (aff.dic) {
        dictionaries = [aff];
      }

      aff = aff.aff;
    }
  }

  if (!aff) {
    throw new Error('Missing `aff` in dictionary');
  }

  aff = affix(aff);

  this.data = {};
  this.compoundRuleCodes = aff.compoundRuleCodes;
  this.replacementTable = aff.replacementTable;
  this.conversion = aff.conversion;
  this.compoundRules = aff.compoundRules;
  this.rules = aff.rules;
  this.flags = aff.flags;

  length = dictionaries ? dictionaries.length : 0;
  index = -1;

  while (++index < length) {
    dic = dictionaries[index];

    if (dic && dic.dic) {
      this.dictionary(dic.dic);
    }
  }
}


/***/ }),
/* 7 */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var trim = __webpack_require__(0);
var parse = __webpack_require__(3);

module.exports = affix;

/* Rule types. */
var T_ONLYINCOMPOUND = 'ONLYINCOMPOUND';
var T_COMPOUNDRULE = 'COMPOUNDRULE';
var T_COMPOUNDMIN = 'COMPOUNDMIN';
var T_WORDCHARS = 'WORDCHARS';
var T_KEEPCASE = 'KEEPCASE';
var T_NOSUGGEST = 'NOSUGGEST';
var T_ICONV = 'ICONV';
var T_OCONV = 'OCONV';
var T_FLAG = 'FLAG';
var T_PFX = 'PFX';
var T_SFX = 'SFX';
var T_REP = 'REP';
var T_TRY = 'TRY';
var T_KEY = 'KEY';

/* Constants. */
var COMBINEABLE = 'Y';
var UTF8 = 'utf8';

/* Relative frequencies of letters in the English language. */
var ALPHABET = 'etaoinshrdlcumwfgypbvkjxqz'.split('');

/* Expressions. */
var RE_WHITE_SPACE = /\s/;
var RE_INLINE_WHITE_SPACE = / +/;

/* Characters. */
var C_LINE = '\n';
var C_HASH = '#';
var C_DOLLAR = '$';
var C_CARET = '^';
var C_SLASH = '/';
var C_DOT = '.';
var C_0 = '0';

/* Defaults. */
var DEFAULT_COMPOUNDMIN = 3;

var DEFAULT_KEY = [
  'qwertzuop',
  'yxcvbnm',
  'qaw',
  'say',
  'wse',
  'dsx',
  'sy',
  'edr',
  'fdc',
  'dx',
  'rft',
  'gfv',
  'fc',
  'tgz',
  'hgb',
  'gv',
  'zhu',
  'jhn',
  'hb',
  'uji',
  'kjm',
  'jn',
  'iko',
  'lkm'
];

/* Parse an affix file. */
function affix(aff) {
  var rules = {};
  var replacementTable = [];
  var conversion = {in: [], out: []};
  var compoundRuleCodes = {};
  var lines = [];
  var flags = {};
  var compoundRules = [];
  var index;
  var length;
  var parts;
  var line;
  var ruleType;
  var entries;
  var count;
  var remove;
  var add;
  var source;
  var entry;
  var ruleLength;
  var position;
  var rule;
  var last;
  var lineEnd;
  var hashIndex;
  var value;
  var offset;
  var character;

  flags[T_KEY] = [];

  /* Process the affix buffer into a list of applicable
   * lines. */
  aff = aff.toString(UTF8);
  index = aff.indexOf(C_LINE);
  hashIndex = aff.indexOf(C_HASH);
  last = 0;

  while (index !== -1) {
    if (hashIndex < last) {
      hashIndex = aff.indexOf(C_HASH, last);
    }

    lineEnd = hashIndex !== -1 && hashIndex < index ? hashIndex : index;
    line = trim(aff.slice(last, lineEnd));

    if (line) {
      lines.push(line);
    }

    last = index + 1;
    index = aff.indexOf(C_LINE, last);
  }

  /* Process each line. */
  index = -1;
  length = lines.length;

  while (++index < length) {
    line = lines[index];
    parts = line.split(RE_WHITE_SPACE);
    ruleType = parts[0];

    if (ruleType === T_REP) {
      count = index + parseInt(parts[1], 10);

      while (++index <= count) {
        parts = lines[index].split(RE_INLINE_WHITE_SPACE);
        replacementTable.push([parts[1], parts[2]]);
      }

      index = count;
    } else if (ruleType === T_ICONV || ruleType === T_OCONV) {
      entry = conversion[ruleType === T_ICONV ? 'in' : 'out'];
      count = index + parseInt(parts[1], 10);

      while (++index <= count) {
        parts = lines[index].split(RE_INLINE_WHITE_SPACE);

        entry.push([new RegExp(parts[1], 'g'), parts[2]]);
      }

      index = count;
    } else if (ruleType === T_COMPOUNDRULE) {
      count = index + parseInt(parts[1], 10);

      while (++index <= count) {
        rule = lines[index].split(RE_INLINE_WHITE_SPACE)[1];
        ruleLength = rule.length;
        position = -1;

        compoundRules.push(rule);

        while (++position < ruleLength) {
          compoundRuleCodes[rule.charAt(position)] = [];
        }
      }

      index = count;
    } else if (ruleType === T_PFX || ruleType === T_SFX) {
      count = index + parseInt(parts[3], 10);
      entries = [];

      rule = {
        type: ruleType,
        combineable: parts[2] === COMBINEABLE,
        entries: entries
      };

      rules[parts[1]] = rule;

      while (++index <= count) {
        parts = lines[index].split(RE_INLINE_WHITE_SPACE);
        remove = parts[2];
        add = parts[3].split(C_SLASH);
        source = parts[4];

        entry = {
          add: '',
          remove: '',
          match: '',
          continuation: parse(flags, add[1])
        };

        entries.push(entry);

        if (add && add[0] !== C_0) {
          entry.add = add[0];
        }

        if (remove !== C_0) {
          entry.remove = ruleType === T_SFX ? end(remove) : remove;
        }

        if (source && source !== C_DOT) {
          entry.match = (ruleType === T_SFX ? end : start)(source);
        }
      }

      index = count;
    } else if (ruleType === T_TRY) {
      source = parts[1];
      count = source.length;
      offset = -1;
      value = [];

      while (++offset < count) {
        character = source.charAt(offset);

        if (character.toLowerCase() === character) {
          value.push(character);
        }
      }

      /* Some dictionaries may forget a character.
       * Notably the enUS forgets the j`, `x`,
       * and `y`. */
      offset = -1;
      count = ALPHABET.length;

      while (++offset < count) {
        character = ALPHABET[offset];

        if (source.indexOf(character) === -1) {
          value.push(character);
        }
      }

      flags[ruleType] = value;
    } else if (ruleType === T_KEY) {
      flags[ruleType] = flags[ruleType].concat(parts[1].split('|'));
    } else if (ruleType === T_COMPOUNDMIN) {
      flags[ruleType] = Number(parts[1]);
    } else if (ruleType === T_ONLYINCOMPOUND) {
      /* If we add this ONLYINCOMPOUND flag to
       * `compoundRuleCodes`, then `parseDic` will do
       * the work of saving the list of words that
       * are compound-only. */
      flags[ruleType] = parts[1];
      compoundRuleCodes[parts[1]] = [];
    } else if (
      ruleType === T_KEEPCASE ||
      ruleType === T_WORDCHARS ||
      ruleType === T_FLAG ||
      ruleType === T_NOSUGGEST
    ) {
      flags[ruleType] = parts[1];
    } else {
      /* Default handling. Set them for now. */
      flags[ruleType] = parts[1];
    }
  }

  /* Default for `COMPOUNDMIN` is `3`.
   * See man 4 hunspell. */
  if (isNaN(flags[T_COMPOUNDMIN])) {
    flags[T_COMPOUNDMIN] = DEFAULT_COMPOUNDMIN;
  }

  if (flags[T_KEY].length === 0) {
    flags[T_KEY] = DEFAULT_KEY;
  }

  /* istanbul ignore if - Dictionaries seem to always have this. */
  if (!flags[T_TRY]) {
    flags[T_TRY] = ALPHABET.concat();
  }

  if (!flags[T_KEEPCASE]) {
    flags[T_KEEPCASE] = false;
  }

  return {
    compoundRuleCodes: compoundRuleCodes,
    replacementTable: replacementTable,
    conversion: conversion,
    compoundRules: compoundRules,
    rules: rules,
    flags: flags
  };
}

/* Wrap the `source` of an expression-like string so that
 * it matches only at the end of a value. */
function end(source) {
  return new RegExp(source + C_DOLLAR);
}

/* Wrap the `source` of an expression-like string so that
 * it matches only at the start of a value. */
function start(source) {
  return new RegExp(C_CARET + source);
}


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var trim = __webpack_require__(0);
var form = __webpack_require__(2);

module.exports = correct;

/* Check spelling of `value`. */
function correct(value) {
  return Boolean(form(this, trim(value)));
}


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var flag = __webpack_require__(1);

module.exports = exact;

var own = {}.hasOwnProperty;

/* Check spelling of `value`, exactly. */
function exact(context, value) {
  var data = context.data;
  var flags = context.flags;
  var codes = own.call(data, value) ? data[value] : null;
  var compound;
  var index;
  var length;

  if (codes) {
    return !flag(flags, 'ONLYINCOMPOUND', codes);
  }

  compound = context.compoundRules;
  length = compound.length;
  index = -1;

  /* Check if this might be a compound word. */
  if (value.length >= flags.COMPOUNDMIN) {
    while (++index < length) {
      if (value.match(compound[index])) {
        return true;
      }
    }
  }

  return false;
}


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var trim = __webpack_require__(0);
var casing = __webpack_require__(12);
var normalize = __webpack_require__(13);
var flag = __webpack_require__(1);
var form = __webpack_require__(2);

module.exports = suggest;

var T_NOSUGGEST = 'NOSUGGEST';

/* Suggest spelling for `value`. */
function suggest(value) {
  var self = this;
  var replacementTable = self.replacementTable;
  var conversion = self.conversion;
  var groups = self.flags.KEY;
  var suggestions = [];
  var weighted = {};
  var memory;
  var replacement;
  var edits = [];
  var values;
  var index;
  var length;
  var offset;
  var position;
  var count;
  var otherOffset;
  var otherCount;
  var otherCharacter;
  var character;
  var group;
  var before;
  var after;
  var upper;
  var insensitive;
  var firstLevel;
  var prev;
  var next;
  var nextCharacter;
  var max;
  var distance;
  var end;
  var size;
  var normalized;
  var suggestion;
  var currentCase;

  value = normalize(trim(value), conversion.in);

  if (!value || self.correct(value)) {
    return [];
  }

  currentCase = casing(value);

  /* Check the replacement table. */
  length = replacementTable.length;
  index = -1;

  while (++index < length) {
    replacement = replacementTable[index];
    offset = value.indexOf(replacement[0]);

    while (offset !== -1) {
      edits.push(value.replace(replacement[0], replacement[1]));
      offset = value.indexOf(replacement[0], offset + 1);
    }
  }

  /* Check the keyboard. */
  length = value.length;
  index = -1;

  while (++index < length) {
    character = value.charAt(index);
    insensitive = character.toLowerCase();
    upper = insensitive !== character;
    offset = -1;
    count = groups.length;

    while (++offset < count) {
      group = groups[offset];
      position = group.indexOf(insensitive);

      if (position === -1) {
        continue;
      }

      before = value.slice(0, position);
      after = value.slice(position + 1);
      otherOffset = -1;
      otherCount = group.length;

      while (++otherOffset < otherCount) {
        if (otherOffset !== position) {
          otherCharacter = group.charAt(otherOffset);

          if (upper) {
            otherCharacter = otherCharacter.toUpperCase();
          }

          edits.push(before + otherCharacter + after);
        }
      }
    }
  }

  /* Check cases where one of a double character was
   * forgotten, or one too many were added, up to three
   * “distances”.
   * This increases the success-rate by 2% and speeds the
   * process up by 13%. */
  length = value.length;
  index = -1;
  nextCharacter = value.charAt(0);
  values = [''];
  max = 1;
  distance = 0;

  while (++index < length) {
    character = nextCharacter;
    nextCharacter = value.charAt(index + 1);
    before = value.slice(0, index);

    replacement = character === nextCharacter ? '' : character + character;
    offset = -1;
    count = values.length;

    while (++offset < count) {
      if (offset <= max) {
        values.push(values[offset] + replacement);
      }

      values[offset] += character;
    }

    if (++distance < 3) {
      max = values.length;
    }
  }

  edits = edits.concat(values);

  /* Ensure the lower-cased, capitalised, and uppercase
   * values are included. */
  values = [value];
  replacement = value.toLowerCase();

  if (value === replacement) {
    values.push(value.charAt(0).toUpperCase() + replacement.slice(1));
  } else {
    values.push(replacement);
  }

  replacement = value.toUpperCase();

  if (value !== replacement) {
    values.push(replacement);
  }

  /* Construct a memory object for `generate`. */
  memory = {
    state: {},
    weighted: weighted,
    suggestions: suggestions
  };

  firstLevel = generate(self, memory, values, edits);

  /* While there are no suggestions based on generated
   * values with an edit-distance of `1`, check the
   * generated values, `SIZE` at a time.
   * Basically, we’re generating values with an
   * edit-distance of `2`, but were doing it in small
   * batches because it’s such an expensive operation. */
  prev = 0;
  max = Math.pow(Math.max(15 - value.length, 3), 3);
  max = Math.min(firstLevel.length, max);
  end = Date.now() + Math.min(30 * value.length, 200);
  size = Math.max(Math.pow(10 - value.length, 3), 1);

  while (!suggestions.length && prev < max) {
    next = prev + size;
    generate(self, memory, firstLevel.slice(prev, next));
    prev = next;

    if (Date.now() > end) {
      break;
    }
  }

  /* Sort the suggestions based on their weight. */
  suggestions.sort(function (a, b) {
    if (weighted[a] > weighted[b]) {
      return -1;
    }

    return weighted[a] === weighted[b] ? 0 : 1;
  });

  /* Normalize the output. */
  values = [];
  normalized = [];
  index = -1;
  length = suggestions.length;

  while (++index < length) {
    suggestion = normalize(suggestions[index], conversion.out);
    suggestions[index] = suggestion;
    replacement = suggestion.toLowerCase();
    offset = normalized.indexOf(replacement);

    if (offset === -1) {
      values.push(suggestion);
      normalized.push(replacement);
    } else if (currentCase && currentCase === casing(suggestion)) {
      values[offset] = suggestion;
    }
  }

  /* BOOM! All done! */
  return values;
}

/* Get a list of values close in edit distance to `words`. */
function generate(context, memory, words, edits) {
  var characters = context.flags.TRY;
  var characterLength = characters.length;
  var data = context.data;
  var flags = context.flags;
  var result = [];
  var upper;
  var length;
  var index;
  var word;
  var position;
  var count;
  var before;
  var after;
  var nextAfter;
  var nextNextAfter;
  var character;
  var nextCharacter;
  var inject;
  var offset;

  /* Check the pre-generated edits. */
  length = edits && edits.length;
  index = -1;

  while (++index < length) {
    check(edits[index], true);
  }

  /* Iterate over given word. */
  length = words.length;
  index = -1;

  while (++index < length) {
    word = words[index];

    before = '';
    character = '';
    nextAfter = word;
    nextNextAfter = word.slice(1);
    nextCharacter = word.charAt(0);
    position = -1;
    count = word.length + 1;

    /* Iterate over every character (including the end). */
    while (++position < count) {
      before += character;
      after = nextAfter;
      nextAfter = nextNextAfter;
      nextNextAfter = nextAfter.slice(1);
      character = nextCharacter;
      nextCharacter = word.charAt(position + 1);
      upper = character.toLowerCase() !== character;

      /* Remove. */
      check(before + nextAfter);

      /* Switch. */
      if (nextAfter) {
        check(before + nextCharacter + character + nextNextAfter);
      }

      /* Iterate over all possible letters. */
      offset = -1;

      while (++offset < characterLength) {
        inject = characters[offset];

        /* Add and replace. */
        check(before + inject + after);
        check(before + inject + nextAfter);

        /* Try upper-case if the original character
         * was upper-cased. */
        if (upper) {
          inject = inject.toUpperCase();

          check(before + inject + after);
          check(before + inject + nextAfter);
        }
      }
    }
  }

  /* Return the list of generated words. */
  return result;

  /* Check and handle a generated value. */
  function check(value, double) {
    var state = memory.state[value];
    var corrected;

    if (state !== Boolean(state)) {
      result.push(value);

      corrected = form(context, value);
      state = corrected && !flag(flags, T_NOSUGGEST, data[corrected]);

      memory.state[value] = state;

      if (state) {
        memory.weighted[value] = double ? 10 : 0;
        memory.suggestions.push(value);
      }
    }

    if (state) {
      memory.weighted[value]++;
    }
  }
}


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = casing;

/* Get the casing of `value`. */
function casing(value) {
  var head = exact(value.charAt(0));
  var rest = value.slice(1);

  if (!rest) {
    return head;
  }

  rest = exact(rest);

  if (head === rest) {
    return head;
  }

  if (head === 'u' && rest === 'l') {
    return 's';
  }

  return null;
}

function exact(value) {
  if (value.toLowerCase() === value) {
    return 'l';
  }

  return value.toUpperCase() === value ? 'u' : null;
}


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = normalize;

/* Normalize `value` with patterns. */
function normalize(value, patterns) {
  var length = patterns.length;
  var index = -1;
  var pattern;

  while (++index < length) {
    pattern = patterns[index];
    value = value.replace(pattern[0], pattern[1]);
  }

  return value;
}


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var form = __webpack_require__(2);
var flag = __webpack_require__(1);

module.exports = spell;

/* Check spelling of `word`. */
function spell(word) {
  var self = this;
  var dict = self.data;
  var flags = self.flags;
  var value = form(self, word, true);

  /* Hunspell also provides `root` (root word of the input word),
   * and `compound` (whether `word` was compound). */
  return {
    correct: self.correct(word),
    forbidden: Boolean(value && flag(flags, 'FORBIDDENWORD', dict[value])),
    warn: Boolean(value && flag(flags, 'WARN', dict[value]))
  };
}


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = add;

var own = {}.hasOwnProperty;

/* Add `value` to the checker. */
function add(value, model) {
  var self = this;
  var dict = self.data;

  dict[value] = [];

  if (model && own.call(dict, model) && dict[model]) {
    dict[value] = dict[model].concat();
  }

  return self;
}


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = remove;

/* Remove `value` from the checker. */
function remove(value) {
  var self = this;

  self.data[value] = null;

  return self;
}


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = wordCharacters;

/* Get the word characters defined in affix. */
function wordCharacters() {
  return this.flags.WORDCHARS || null;
}


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var parse = __webpack_require__(19);

module.exports = add;

/* Add a dictionary file. */
function add(buf) {
  var self = this;
  var compound = self.compoundRules;
  var compoundCodes = self.compoundRuleCodes;
  var index = -1;
  var length = compound.length;
  var rule;
  var source;
  var character;
  var offset;
  var count;

  parse(buf, self, self.data);

  /* Regenerate compound expressions. */
  while (++index < length) {
    rule = compound[index];
    source = '';

    offset = -1;
    count = rule.length;

    while (++offset < count) {
      character = rule.charAt(offset);

      if (compoundCodes[character].length === 0) {
        source += character;
      } else {
        source += '(?:' + compoundCodes[character].join('|') + ')';
      }
    }

    compound[index] = new RegExp(source, 'i');
  }

  return self;
}


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var parseCodes = __webpack_require__(3);
var apply = __webpack_require__(20);

module.exports = parse;

var own = {}.hasOwnProperty;

/* Constants. */
var UTF8 = 'utf8';
var C_LINE = '\n';
var C_SLASH = '/';
var C_ESCAPE = '\\';
var CC_TAB = '\t'.charCodeAt(0);

/* Parse a dictionary. */
function parse(buf, options, dict) {
  var flags = options.flags;
  var rules = options.rules;
  var compoundRuleCodes = options.compoundRuleCodes;
  var index;
  var line;
  var word;
  var codes;
  var position;
  var length;
  var code;
  var rule;
  var newWords;
  var offset;
  var newWord;
  var subposition;
  var combined;
  var otherNewWords;
  var suboffset;
  var last;
  var wordCount;
  var newWordCount;
  var value;

  /* Parse as lines. */
  value = buf.toString(UTF8);
  last = value.indexOf(C_LINE) + 1;
  index = value.indexOf(C_LINE, last);

  while (index !== -1) {
    if (value.charCodeAt(last) !== CC_TAB) {
      line = value.slice(last, index);
      word = line;
      codes = [];

      offset = line.indexOf(C_SLASH);

      while (offset !== -1) {
        if (line.charAt(offset - 1) !== C_ESCAPE) {
          word = line.slice(0, offset);
          codes = parseCodes(flags, line.slice(offset + 1));
          break;
        }

        offset = line.indexOf(C_SLASH, offset + 1);
      }

      /* Compound words. */
      if (!own.call(flags, 'NEEDAFFIX') || codes.indexOf(flags.NEEDAFFIX) === -1) {
        add(word, codes);
      }

      position = -1;
      length = codes.length;

      while (++position < length) {
        code = codes[position];
        rule = rules[code];

        if (code in compoundRuleCodes) {
          compoundRuleCodes[code].push(word);
        }

        if (rule) {
          newWords = apply(word, rule, rules);
          wordCount = newWords.length;
          offset = -1;

          while (++offset < wordCount) {
            newWord = newWords[offset];

            add(newWord);

            if (!rule.combineable) {
              continue;
            }

            subposition = position;

            while (++subposition < length) {
              combined = rules[codes[subposition]];

              if (
                !combined ||
                !combined.combineable ||
                rule.type === combined.type
              ) {
                continue;
              }

              otherNewWords = apply(newWord, combined, rules);
              newWordCount = otherNewWords.length;
              suboffset = -1;

              while (++suboffset < newWordCount) {
                add(otherNewWords[suboffset]);
              }
            }
          }
        }
      }
    }

    last = index + 1;
    index = value.indexOf(C_LINE, last);
  }

  /* Add `rules` for `word` to the table. */
  function add(word, rules) {
    /* Some dictionaries will list the same word multiple times
     * with different rule sets. */
    dict[word] = ((own.call(dict, word) && dict[word]) || []).concat(rules || []);
  }
}


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = apply;

/* Apply a rule. */
function apply(value, rule, rules) {
  var entries = rule.entries;
  var words = [];
  var index = -1;
  var length = entries.length;
  var entry;
  var next;
  var continuationRule;
  var continuation;
  var position;
  var count;

  while (++index < length) {
    entry = entries[index];

    if (!entry.match || value.match(entry.match)) {
      next = value;

      if (entry.remove) {
        next = next.replace(entry.remove, '');
      }

      if (rule.type === 'SFX') {
        next += entry.add;
      } else {
        next = entry.add + next;
      }

      words.push(next);

      continuation = entry.continuation;

      if (continuation && continuation.length !== 0) {
        position = -1;
        count = continuation.length;

        while (++position < count) {
          continuationRule = rules[continuation[position]];

          if (continuationRule) {
            words = words.concat(
              apply(next, continuationRule, rules)
            );
          }
        }
      }
    }
  }

  return words;
}


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var trim = __webpack_require__(0);

module.exports = add;

/* Add a dictionary. */
function add(buf) {
  var self = this;
  var flags = self.flags;
  var lines = buf.toString('utf8').split('\n');
  var length = lines.length;
  var index = -1;
  var line;
  var forbidden;
  var word;
  var model;
  var flag;

  /* Ensure there’s a key for `FORBIDDENWORD`: `false`
   * cannot be set through an affix file so its safe to use
   * as a magic constant. */
  flag = flags.FORBIDDENWORD || false;
  flags.FORBIDDENWORD = flag;

  while (++index < length) {
    line = trim(lines[index]);

    if (!line) {
      continue;
    }

    line = line.split('/');
    word = line[0];
    model = line[1];
    forbidden = word.charAt(0) === '*';

    if (forbidden) {
      word = word.slice(1);
    }

    self.add(word, model);

    if (forbidden) {
      self.data[word].push(flag);
    }
  }

  return self;
}


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {module.exports = new Buffer([35,32,116,104,105,115,32,105,115,32,116,104,101,32,97,102,102,105,120,32,102,105,108,101,32,111,102,32,116,104,101,32,110,100,115,95,68,69,32,72,117,110,115,112,101,108,108,32,100,105,99,116,105,111,110,97,114,121,10,35,10,35,32,67,111,112,121,114,105,103,104,116,32,40,67,41,32,50,48,48,52,45,50,48,49,52,32,98,121,32,72,101,105,107,111,32,69,118,101,114,109,97,110,110,32,60,104,101,105,107,111,64,101,118,101,114,109,97,110,110,46,100,101,62,32,97,110,100,32,83,195,182,110,107,101,32,68,105,98,98,101,114,110,32,60,115,95,100,105,98,98,101,114,110,64,119,101,98,46,100,101,62,10,35,10,35,32,76,105,99,101,110,115,101,58,32,71,80,76,118,50,32,111,114,32,79,65,83,73,83,32,100,105,115,116,114,105,98,117,116,105,111,110,32,108,105,99,101,110,115,101,32,97,103,114,101,101,109,101,110,116,10,35,32,84,104,101,114,101,32,115,104,111,117,108,100,32,98,101,32,97,32,99,111,112,121,32,111,102,32,98,111,116,104,32,111,102,32,116,104,105,115,32,108,105,99,101,110,115,101,115,32,105,110,99,108,117,100,101,100,10,35,32,119,105,116,104,32,101,118,101,114,121,32,100,105,115,116,114,105,98,117,116,105,111,110,32,111,102,32,116,104,105,115,32,100,105,99,116,105,111,110,97,114,121,46,32,77,111,100,105,102,105,101,100,10,35,32,118,101,114,115,105,111,110,115,32,117,115,105,110,103,32,116,104,101,32,71,80,76,32,109,97,121,32,111,110,108,121,32,105,110,99,108,117,100,101,32,116,104,101,32,71,80,76,10,10,83,69,84,32,85,84,70,45,56,10,84,82,89,32,101,115,105,106,97,110,114,116,111,108,99,100,117,103,109,112,104,98,121,102,118,107,119,113,120,122,195,164,195,188,195,182,195,159,195,161,195,169,195,170,195,160,195,162,195,177,69,83,73,74,65,78,82,84,79,76,67,68,85,71,77,80,72,66,89,70,86,75,87,81,88,90,195,132,195,156,195,150,195,137,45,46,10,10,35,35,35,32,76,105,115,116,32,111,102,32,110,101,105,103,104,98,111,117,114,105,110,103,32,99,104,97,114,97,99,116,101,114,115,32,111,110,32,81,87,69,82,84,90,32,107,101,121,98,111,97,114,100,58,10,75,69,89,32,113,119,101,114,116,122,117,105,111,112,195,188,124,97,115,100,102,103,104,106,107,108,195,182,195,164,124,121,120,99,118,98,110,109,10,10,35,35,35,32,82,101,112,108,97,99,101,32,99,111,109,109,111,110,32,109,105,115,45,115,112,101,108,108,105,110,103,115,10,82,69,80,32,50,50,10,82,69,80,32,195,159,32,115,115,10,82,69,80,32,115,115,32,195,159,10,82,69,80,32,115,32,115,115,10,82,69,80,32,115,115,32,115,10,82,69,80,32,111,32,111,104,10,82,69,80,32,111,104,32,111,10,82,69,80,32,97,32,97,104,10,82,69,80,32,97,104,32,97,10,82,69,80,32,101,32,101,104,10,82,69,80,32,101,104,32,101,10,82,69,80,32,97,101,32,195,164,10,82,69,80,32,111,101,32,195,182,10,82,69,80,32,117,101,32,195,188,10,82,69,80,32,65,101,32,195,132,10,82,69,80,32,79,101,32,195,150,10,82,69,80,32,85,101,32,195,156,10,82,69,80,32,102,32,112,104,10,82,69,80,32,112,104,32,102,10,82,69,80,32,100,32,116,10,82,69,80,32,116,32,100,10,82,69,80,32,116,104,32,116,10,82,69,80,32,116,32,116,104,10,10,35,35,35,32,99,111,109,112,111,117,110,100,115,32,119,105,116,104,32,104,121,112,104,101,110,115,32,45,32,105,110,115,116,114,117,99,116,32,104,117,110,115,112,101,108,108,32,116,111,32,98,114,101,97,107,32,97,116,32,104,121,112,104,101,110,32,102,111,114,10,35,35,35,32,105,110,100,105,118,105,100,117,97,108,32,99,111,109,112,111,110,101,110,116,32,99,104,101,99,107,10,66,82,69,65,75,32,50,10,66,82,69,65,75,32,45,10,66,82,69,65,75,32,45,45,10,10,35,35,35,32,77,105,110,105,109,97,108,32,119,111,114,100,32,108,101,110,103,116,104,32,102,111,114,32,99,111,109,112,111,117,110,100,115,32,105,115,32,116,119,111,10,67,79,77,80,79,85,78,68,77,73,78,32,50,10,10,35,35,35,32,84,69,77,80,32,45,32,110,101,101,100,115,32,109,111,114,101,32,116,104,111,117,103,104,116,33,32,70,111,114,32,116,104,101,32,119,104,105,108,101,44,32,102,108,97,103,115,32,115,101,108,101,99,116,32,119,111,114,100,115,10,35,35,35,32,115,117,105,116,97,98,108,101,32,116,111,32,102,111,114,109,32,99,111,109,112,111,117,110,100,115,10,67,79,77,80,79,85,78,68,70,76,65,71,32,99,10,67,79,77,80,79,85,78,68,80,69,82,77,73,84,70,76,65,71,32,100,10,10,35,35,35,35,35,35,32,70,114,101,39,101,32,80,114,101,102,105,120,101,110,58,32,195,132,195,150,44,32,67,32,117,110,100,32,90,32,115,105,110,100,32,119,105,101,100,101,114,32,102,114,101,105,46,10,35,32,86,111,114,115,105,99,104,116,58,32,98,101,105,32,100,101,110,32,85,109,108,97,117,116,101,110,32,105,115,116,32,102,114,97,103,108,105,99,104,44,32,111,98,32,100,105,101,32,71,114,111,195,159,45,32,117,110,100,32,75,108,101,105,110,115,99,104,114,101,105,98,117,110,103,32,100,101,115,32,83,117,102,102,105,120,101,115,32,117,110,116,101,114,115,99,104,105,101,100,101,110,32,119,105,114,100,46,10,35,10,35,32,75,97,110,100,105,116,97,116,101,110,58,32,114,97,110,44,32,114,195,188,109,44,32,109,105,116,10,35,32,71,114,111,195,159,98,117,99,104,115,116,97,98,101,110,58,32,110,111,114,109,97,108,101,32,86,101,114,98,102,111,114,109,101,110,46,10,35,32,75,108,101,105,110,98,117,99,104,115,116,97,98,101,110,58,32,109,105,116,32,45,116,111,45,32,102,195,188,114,32,100,101,110,32,73,110,102,105,110,105,116,105,118,10,35,10,35,9,97,102,9,9,81,32,113,10,35,9,97,110,9,9,65,32,97,10,35,9,98,101,9,9,66,10,35,32,32,32,100,97,108,32,32,32,32,32,76,32,108,10,35,9,100,195,182,114,43,100,195,182,114,99,104,9,82,32,114,10,35,9,104,101,114,9,9,89,32,121,10,35,9,104,101,110,9,9,67,32,99,10,35,9,105,110,9,9,74,32,106,10,35,9,110,97,9,9,72,32,104,10,35,9,111,112,9,9,80,32,112,10,35,9,114,105,110,9,9,90,32,122,10,35,9,114,111,112,9,9,75,32,107,10,35,9,114,117,116,9,9,71,32,103,10,35,9,116,111,9,9,84,32,116,10,35,9,117,116,9,9,85,32,117,10,35,9,118,101,114,9,9,86,10,35,9,118,195,182,114,9,9,70,32,102,10,35,9,119,101,103,9,9,88,32,120,10,35,9,195,188,109,9,9,195,156,32,195,188,10,35,9,45,115,9,9,83,10,10,35,32,117,110,100,32,110,111,99,104,109,97,108,32,110,97,99,104,32,83,117,102,102,105,120,101,110,32,115,111,114,116,105,101,114,116,10,35,9,97,110,9,9,65,32,97,10,35,9,98,101,9,9,66,10,35,9,104,101,110,9,9,67,32,99,10,35,32,68,61,100,117,10,35,32,101,32,65,100,106,101,107,116,105,118,100,101,107,108,105,110,97,116,105,111,110,10,35,9,118,195,182,114,9,9,70,32,102,10,35,9,114,117,116,9,9,71,32,103,10,35,9,110,97,9,9,72,32,104,10,35,32,73,61,105,107,44,32,69,110,110,101,110,32,102,195,182,114,32,49,46,80,101,114,115,111,111,110,10,35,9,105,110,9,9,74,32,106,10,35,9,114,111,112,9,9,75,32,107,10,35,32,32,32,100,97,108,32,32,32,32,32,76,32,108,10,35,32,77,61,77,101,104,114,116,97,108,108,32,118,117,110,39,116,32,80,97,114,116,46,80,101,114,102,46,32,40,34,108,101,101,115,116,101,32,66,195,182,107,101,114,34,41,10,35,32,110,32,65,100,106,101,107,116,105,118,100,101,107,108,105,110,97,116,105,111,110,10,35,32,79,61,80,97,114,116,46,80,101,114,102,46,69,101,110,116,97,108,108,32,105,110,39,110,32,79,98,106,101,107,116,105,118,32,40,34,100,101,110,32,102,111,104,114,116,101,110,32,77,97,110,110,34,41,10,35,9,111,112,9,9,80,32,112,10,35,9,97,102,9,9,81,32,113,10,35,9,100,195,182,114,43,100,195,182,114,99,104,9,82,32,114,10,35,32,83,117,102,102,105,120,32,115,32,102,195,188,114,32,115,99,104,119,97,99,104,101,32,86,101,114,98,101,110,10,35,9,45,115,9,9,83,10,35,9,116,111,9,9,84,32,116,10,35,9,117,116,9,9,85,32,117,10,35,9,195,188,109,9,9,195,156,32,195,188,10,35,9,118,101,114,9,9,86,10,35,9,119,101,103,9,9,88,32,120,10,35,9,104,101,114,9,9,89,32,121,10,35,32,87,61,119,105,10,35,9,114,105,110,9,9,90,32,122,10,10,10,10,10,35,32,85,110,116,101,110,32,107,111,109,109,101,110,32,110,111,99,104,32,100,105,101,32,83,117,102,102,105,120,101,10,35,32,73,61,105,107,44,32,69,110,110,101,110,32,102,195,182,114,32,49,46,80,101,114,115,111,111,110,10,35,32,68,61,100,117,10,35,32,87,61,119,105,10,35,32,77,61,77,101,104,114,116,97,108,108,32,118,117,110,39,116,32,80,97,114,116,46,80,101,114,102,46,32,40,34,108,101,101,115,116,101,32,66,195,182,107,101,114,34,41,10,35,32,79,61,80,97,114,116,46,80,101,114,102,46,69,101,110,116,97,108,108,32,105,110,39,110,32,79,98,106,101,107,116,105,118,32,40,34,100,101,110,32,102,111,104,114,116,101,110,32,77,97,110,110,34,41,10,35,32,122,117,115,195,164,116,122,108,105,99,104,32,100,97,115,32,110,101,117,101,32,83,121,115,116,101,109,10,35,32,83,117,102,102,105,120,32,101,32,117,110,100,32,110,32,102,195,188,114,32,65,100,106,101,107,116,105,118,101,10,35,32,83,117,102,102,105,120,32,115,32,102,195,188,114,32,115,99,104,119,97,99,104,101,32,86,101,114,98,101,110,10,10,80,70,88,32,65,32,89,32,49,10,80,70,88,32,65,32,48,32,97,110,32,46,10,10,80,70,88,32,97,32,78,32,49,10,80,70,88,32,97,32,48,32,97,110,116,111,32,46,10,10,80,70,88,32,81,32,89,32,49,10,80,70,88,32,81,32,48,32,97,102,32,46,10,10,80,70,88,32,113,32,78,32,49,10,80,70,88,32,113,32,48,32,97,102,116,111,32,46,10,10,80,70,88,32,66,32,89,32,49,10,80,70,88,32,66,32,48,32,98,101,32,46,10,10,10,80,70,88,32,76,32,89,32,49,10,80,70,88,32,76,32,48,32,100,97,108,32,46,10,10,80,70,88,32,108,32,78,32,49,10,80,70,88,32,108,32,48,32,100,97,108,116,111,32,46,10,10,80,70,88,32,82,32,89,32,50,10,80,70,88,32,82,32,48,32,100,195,182,114,32,46,10,80,70,88,32,82,32,48,32,100,195,182,114,99,104,32,46,10,10,80,70,88,32,114,32,78,32,50,10,80,70,88,32,114,32,48,32,100,195,182,114,116,111,32,46,10,80,70,88,32,114,32,48,32,100,195,182,114,99,104,116,111,32,46,10,10,80,70,88,32,89,32,89,32,49,10,80,70,88,32,89,32,48,32,104,101,114,32,46,10,10,80,70,88,32,121,32,89,32,49,10,80,70,88,32,121,32,48,32,104,101,114,116,111,32,46,10,10,80,70,88,32,67,32,89,32,49,10,80,70,88,32,67,32,48,32,104,101,110,32,46,10,10,80,70,88,32,99,32,78,32,49,10,80,70,88,32,99,32,48,32,104,101,110,116,111,32,46,10,10,80,70,88,32,74,32,89,32,49,10,80,70,88,32,74,32,48,32,105,110,32,46,10,10,80,70,88,32,106,32,78,32,49,10,80,70,88,32,106,32,48,32,105,110,116,111,32,46,10,10,80,70,88,32,72,32,89,32,49,10,80,70,88,32,72,32,48,32,110,97,32,46,10,10,80,70,88,32,104,32,78,32,49,10,80,70,88,32,104,32,48,32,110,97,116,111,32,46,10,10,80,70,88,32,80,32,89,32,49,10,80,70,88,32,80,32,48,32,111,112,32,46,10,10,80,70,88,32,112,32,78,32,49,10,80,70,88,32,112,32,48,32,111,112,116,111,32,46,10,10,80,70,88,32,90,32,89,32,49,10,80,70,88,32,90,32,48,32,114,105,110,32,46,10,10,80,70,88,32,122,32,78,32,49,10,80,70,88,32,122,32,48,32,114,105,110,116,111,32,46,10,10,80,70,88,32,75,32,89,32,49,10,80,70,88,32,75,32,48,32,114,111,112,32,46,10,10,80,70,88,32,107,32,78,32,49,10,80,70,88,32,107,32,48,32,114,111,112,116,111,32,46,10,10,80,70,88,32,71,32,89,32,49,10,80,70,88,32,71,32,48,32,114,117,116,32,46,10,10,80,70,88,32,103,32,78,32,49,10,80,70,88,32,103,32,48,32,114,117,116,116,111,32,46,10,10,80,70,88,32,84,32,89,32,49,10,80,70,88,32,84,32,48,32,116,111,32,46,10,10,80,70,88,32,116,32,78,32,49,10,80,70,88,32,116,32,48,32,116,111,116,111,32,46,10,10,80,70,88,32,85,32,89,32,49,10,80,70,88,32,85,32,48,32,117,116,32,46,10,10,80,70,88,32,117,32,78,32,49,10,80,70,88,32,117,32,48,32,117,116,116,111,32,46,10,10,80,70,88,32,86,32,89,32,49,10,80,70,88,32,86,32,48,32,118,101,114,32,46,10,10,80,70,88,32,70,32,89,32,49,10,80,70,88,32,70,32,48,32,118,195,182,114,32,46,10,10,80,70,88,32,102,32,78,32,49,10,80,70,88,32,102,32,48,32,118,195,182,114,116,111,32,46,10,10,80,70,88,32,88,32,89,32,49,10,80,70,88,32,88,32,48,32,119,101,103,32,46,10,10,80,70,88,32,120,32,78,32,49,10,80,70,88,32,120,32,48,32,119,101,103,116,111,32,46,10,10,80,70,88,32,195,156,32,89,32,49,10,80,70,88,32,195,156,32,48,32,195,188,109,32,46,10,10,80,70,88,32,195,188,32,78,32,49,10,80,70,88,32,195,188,32,48,32,195,188,109,116,111,32,46,10,10,35,35,35,35,35,35,32,83,117,102,102,105,120,101,110,32,102,195,182,114,32,86,101,114,98,101,110,10,35,32,73,61,105,107,44,32,69,110,110,101,110,32,102,195,182,114,32,49,46,80,101,114,115,111,111,110,10,35,32,68,61,100,117,10,35,32,87,61,119,105,10,35,32,77,61,77,101,104,114,116,97,108,108,32,118,117,110,39,116,32,80,97,114,116,46,80,101,114,102,46,32,40,34,108,101,101,115,116,101,32,66,195,182,107,101,114,34,41,10,35,32,79,61,80,97,114,116,46,80,101,114,102,46,69,101,110,116,97,108,108,32,105,110,39,110,32,79,98,106,101,107,116,105,118,32,40,34,100,101,110,32,102,111,104,114,116,101,110,32,77,97,110,110,34,41,10,35,32,49,46,32,82,101,101,103,58,32,86,101,114,98,101,110,32,111,112,32,45,101,110,32,40,115,99,104,105,99,107,101,110,44,32,109,101,108,108,101,110,41,10,35,32,50,46,32,82,101,101,103,58,32,86,101,114,98,101,110,32,111,112,32,45,114,110,32,117,110,32,45,108,110,32,40,195,164,110,110,101,114,110,44,32,115,101,107,101,114,110,44,32,104,97,110,110,101,108,110,44,32,115,116,97,112,101,108,110,41,10,35,32,51,46,32,82,101,101,103,58,32,86,101,114,98,101,110,32,109,105,116,32,86,111,107,97,97,108,118,101,114,100,117,98,98,101,108,110,44,32,70,111,114,109,101,110,32,119,97,114,114,116,32,118,117,110,32,100,101,32,49,46,80,101,114,115,46,32,97,102,108,101,100,100,116,58,32,109,97,107,101,110,44,32,40,105,107,41,32,109,97,97,107,47,68,87,77,79,59,32,108,101,115,101,110,44,32,40,105,107,41,32,108,101,101,115,47,87,77,79,41,10,35,32,52,46,32,82,101,101,103,58,32,86,101,114,98,101,110,32,111,112,32,45,115,101,110,47,45,116,101,110,32,40,112,97,115,115,101,110,44,32,115,101,116,116,101,110,44,32,115,116,195,188,116,116,101,110,41,41,10,10,83,70,88,32,73,32,89,32,50,10,83,70,88,32,73,32,101,110,32,48,32,101,110,10,83,70,88,32,73,32,110,32,48,32,91,108,114,93,110,10,10,83,70,88,32,68,32,89,32,52,10,83,70,88,32,68,32,101,110,32,115,116,32,91,94,115,93,101,110,10,83,70,88,32,68,32,110,32,115,116,32,91,108,114,93,110,10,83,70,88,32,68,32,48,32,115,116,32,91,94,110,93,10,83,70,88,32,68,32,101,110,32,116,32,115,101,110,10,10,83,70,88,32,87,32,89,32,52,10,83,70,88,32,87,32,101,110,32,116,32,91,94,116,93,101,110,10,83,70,88,32,87,32,110,32,116,32,91,108,114,93,110,10,83,70,88,32,87,32,48,32,116,32,91,94,110,93,10,83,70,88,32,87,32,101,110,32,48,32,116,101,110,10,10,83,70,88,32,77,32,89,32,52,10,83,70,88,32,77,32,101,110,32,116,101,32,91,94,116,93,101,110,10,83,70,88,32,77,32,110,32,116,101,32,101,91,108,114,93,110,10,83,70,88,32,77,32,48,32,116,101,32,91,94,110,93,10,83,70,88,32,77,32,101,110,32,101,32,116,101,110,10,10,83,70,88,32,79,32,89,32,52,10,83,70,88,32,79,32,101,110,32,116,101,110,32,91,94,116,93,101,110,10,83,70,88,32,79,32,110,32,116,101,110,32,101,91,108,114,93,110,10,83,70,88,32,79,32,48,32,116,101,110,32,91,94,110,93,10,83,70,88,32,79,32,101,110,32,101,110,32,116,101,110,10,10,35,32,83,117,102,102,105,120,32,115,58,32,115,99,104,119,97,99,104,101,115,32,86,101,114,98,32,83,116,97,110,100,97,114,100,109,117,115,116,101,114,46,32,73,110,32,100,105,99,45,68,97,116,101,105,32,119,105,114,100,32,100,105,101,32,49,46,32,83,103,32,80,114,195,164,115,101,110,115,10,35,32,97,110,103,101,103,101,98,101,110,44,32,122,46,66,46,32,58,32,109,97,97,107,47,115,10,35,32,73,110,102,105,110,105,116,105,118,58,32,109,97,107,101,110,32,61,62,32,103,101,110,97,117,115,111,32,103,101,98,97,117,116,32,119,105,101,32,83,70,88,45,78,44,32,103,103,102,46,32,86,111,107,97,108,101,110,116,100,111,112,112,101,108,117,110,103,32,98,101,104,97,110,100,101,108,110,10,35,32,50,46,32,83,116,32,80,114,195,164,115,101,110,115,58,32,45,115,116,32,97,110,104,195,164,110,103,101,110,32,61,62,32,109,97,97,107,115,116,10,35,32,51,46,32,83,103,46,32,80,114,195,164,115,101,110,115,58,32,45,116,32,97,110,104,195,164,110,103,101,110,32,61,62,32,109,97,97,107,116,10,35,32,69,105,110,104,101,105,116,115,112,108,117,114,97,108,32,80,114,195,164,115,101,110,115,58,32,45,116,32,97,110,104,195,164,110,103,101,110,32,40,105,100,101,110,116,105,115,99,104,32,109,105,116,32,51,46,32,83,103,32,80,114,195,164,115,101,110,115,41,32,61,62,32,109,97,97,107,116,10,35,32,49,46,32,83,103,32,86,101,114,103,97,110,103,101,110,104,101,105,116,58,32,109,97,97,107,32,61,62,32,71,114,117,110,100,102,111,114,109,10,35,32,50,46,32,83,103,32,86,101,114,103,97,110,103,101,110,104,101,105,116,58,32,109,97,97,107,115,116,32,61,62,32,119,105,101,32,80,114,195,164,115,101,110,115,10,35,32,51,46,32,83,103,46,32,86,101,114,103,97,110,103,101,110,104,101,105,116,58,32,109,97,97,107,32,61,62,32,119,105,101,32,80,114,195,164,115,101,110,115,10,35,32,80,108,117,114,97,108,32,86,101,114,103,97,110,103,101,110,104,101,105,116,58,32,109,97,107,101,110,32,61,62,32,32,119,105,101,32,73,110,102,105,110,105,116,105,118,10,35,32,80,97,114,116,105,122,105,112,58,32,109,97,97,107,116,32,61,62,32,119,105,101,32,51,46,32,83,103,46,32,80,114,195,164,115,101,110,115,46,10,35,32,80,97,114,116,105,122,105,112,32,100,101,107,108,105,110,105,101,114,116,58,32,109,97,97,107,116,101,32,109,97,97,107,116,101,110,32,61,62,32,102,195,188,104,114,116,32,110,105,101,32,122,117,32,86,111,107,97,108,118,101,114,195,164,110,100,101,114,117,110,103,10,83,70,88,32,115,32,89,32,49,48,56,10,83,70,88,32,115,32,48,32,115,116,32,32,32,32,32,32,32,91,94,115,93,10,83,70,88,32,115,32,48,32,116,32,32,32,32,32,32,32,32,115,10,83,70,88,32,115,32,48,32,116,9,9,32,91,94,116,93,10,83,70,88,32,115,32,48,32,116,101,32,32,32,32,32,32,32,91,94,116,93,10,83,70,88,32,115,32,48,32,101,32,32,32,32,32,32,32,32,116,10,83,70,88,32,115,32,48,32,116,101,110,32,32,32,32,32,32,91,94,116,93,10,83,70,88,32,115,32,48,32,101,110,32,32,32,32,32,32,32,116,10,83,70,88,32,115,32,48,32,32,32,101,110,32,32,32,32,32,91,94,97,101,105,111,117,195,182,195,188,93,91,94,97,101,105,111,117,195,182,195,188,93,10,83,70,88,32,115,32,48,32,32,32,110,32,32,32,32,32,32,101,114,10,83,70,88,32,115,32,48,32,32,32,110,32,32,32,32,32,32,101,108,10,83,70,88,32,115,32,97,97,98,32,97,98,101,110,32,32,32,97,97,98,10,83,70,88,32,115,32,97,97,100,32,97,100,101,110,32,32,32,97,97,100,10,83,70,88,32,115,32,97,97,102,32,97,102,101,110,32,32,32,97,97,102,10,83,70,88,32,115,32,97,97,103,32,97,103,101,110,32,32,32,97,97,103,10,83,70,88,32,115,32,97,97,107,32,97,107,101,110,32,32,32,97,97,107,10,83,70,88,32,115,32,97,97,108,32,97,108,101,110,32,32,32,97,97,108,10,83,70,88,32,115,32,97,97,109,32,97,109,101,110,32,32,32,97,97,109,10,83,70,88,32,115,32,97,97,110,32,97,110,101,110,32,32,32,97,97,110,10,83,70,88,32,115,32,97,97,112,32,97,112,101,110,32,32,32,97,97,112,10,83,70,88,32,115,32,97,97,114,32,97,114,101,110,32,32,32,97,97,114,10,83,70,88,32,115,32,97,97,115,32,97,115,101,110,32,32,32,97,97,115,10,83,70,88,32,115,32,97,97,116,32,97,116,101,110,32,32,32,97,97,116,10,83,70,88,32,115,32,97,97,118,32,97,118,101,110,32,32,32,97,97,118,10,83,70,88,32,115,32,97,97,119,32,97,119,101,110,32,32,32,97,97,119,10,83,70,88,32,115,32,101,101,98,32,101,98,101,110,32,32,32,101,101,98,10,83,70,88,32,115,32,101,101,100,32,101,100,101,110,32,32,32,101,101,100,10,83,70,88,32,115,32,101,101,102,32,101,102,101,110,32,32,32,101,101,102,10,83,70,88,32,115,32,101,101,103,32,101,103,101,110,32,32,32,101,101,103,10,83,70,88,32,115,32,101,101,107,32,101,107,101,110,32,32,32,101,101,107,10,83,70,88,32,115,32,101,101,108,32,101,108,101,110,32,32,32,101,101,108,10,83,70,88,32,115,32,101,101,109,32,101,109,101,110,32,32,32,101,101,109,10,83,70,88,32,115,32,101,101,110,32,101,110,101,110,32,32,32,101,101,110,10,83,70,88,32,115,32,101,101,112,32,101,112,101,110,32,32,32,101,101,112,10,83,70,88,32,115,32,101,101,114,32,101,114,101,110,32,32,32,101,101,114,10,83,70,88,32,115,32,101,101,115,32,101,115,101,110,32,32,32,101,101,115,10,83,70,88,32,115,32,101,101,116,32,101,116,101,110,32,32,32,101,101,116,10,83,70,88,32,115,32,101,101,118,32,101,118,101,110,32,32,32,101,101,118,10,83,70,88,32,115,32,101,101,119,32,101,119,101,110,32,32,32,101,101,119,10,83,70,88,32,115,32,111,111,98,32,111,98,101,110,32,32,32,111,111,98,10,83,70,88,32,115,32,111,111,100,32,111,100,101,110,32,32,32,111,111,100,10,83,70,88,32,115,32,111,111,103,32,111,103,101,110,32,32,32,111,111,103,10,83,70,88,32,115,32,111,111,102,32,111,102,101,110,32,32,32,111,111,102,10,83,70,88,32,115,32,111,111,107,32,111,107,101,110,32,32,32,111,111,107,10,83,70,88,32,115,32,111,111,108,32,111,108,101,110,32,32,32,111,111,108,10,83,70,88,32,115,32,111,111,109,32,111,109,101,110,32,32,32,111,111,109,10,83,70,88,32,115,32,111,111,110,32,111,110,101,110,32,32,32,111,111,110,10,83,70,88,32,115,32,111,111,112,32,111,112,101,110,32,32,32,111,111,112,10,83,70,88,32,115,32,111,111,114,32,111,114,101,110,32,32,32,111,111,114,10,83,70,88,32,115,32,111,111,115,32,111,115,101,110,32,32,32,111,111,115,10,83,70,88,32,115,32,111,111,116,32,111,116,101,110,32,32,32,111,111,116,10,83,70,88,32,115,32,111,111,118,32,111,118,101,110,32,32,32,111,111,118,10,83,70,88,32,115,32,111,111,119,32,111,119,101,110,32,32,32,111,111,119,10,83,70,88,32,115,32,117,117,98,32,117,98,101,110,32,32,32,117,117,98,10,83,70,88,32,115,32,117,117,100,32,117,100,101,110,32,32,32,117,117,100,10,83,70,88,32,115,32,117,117,103,32,117,103,101,110,32,32,32,117,117,103,10,83,70,88,32,115,32,117,117,102,32,117,102,101,110,32,32,32,117,117,102,10,83,70,88,32,115,32,117,117,107,32,117,107,101,110,32,32,32,117,117,107,10,83,70,88,32,115,32,117,117,108,32,117,108,101,110,32,32,32,117,117,108,10,83,70,88,32,115,32,117,117,109,32,117,109,101,110,32,32,32,117,117,109,10,83,70,88,32,115,32,117,117,110,32,117,110,101,110,32,32,32,117,117,110,10,83,70,88,32,115,32,117,117,112,32,117,112,101,110,32,32,32,117,117,112,10,83,70,88,32,115,32,117,117,114,32,117,114,101,110,32,32,32,117,117,114,10,83,70,88,32,115,32,117,117,115,32,117,115,101,110,32,32,32,117,117,115,10,83,70,88,32,115,32,117,117,116,32,117,116,101,110,32,32,32,117,117,116,10,83,70,88,32,115,32,117,117,118,32,117,118,101,110,32,32,32,117,117,118,10,83,70,88,32,115,32,117,117,119,32,117,119,101,110,32,32,32,117,117,119,10,83,70,88,32,115,32,195,164,195,164,98,32,195,164,98,101,110,32,32,32,195,164,195,164,98,10,83,70,88,32,115,32,195,164,195,164,100,32,195,164,100,101,110,32,32,32,195,164,195,164,100,10,83,70,88,32,115,32,195,164,195,164,103,32,195,164,103,101,110,32,32,32,195,164,195,164,103,10,83,70,88,32,115,32,195,164,195,164,102,32,195,164,102,101,110,32,32,32,195,164,195,164,102,10,83,70,88,32,115,32,195,164,195,164,107,32,195,164,107,101,110,32,32,32,195,164,195,164,107,10,83,70,88,32,115,32,195,164,195,164,108,32,195,164,108,101,110,32,32,32,195,164,195,164,108,10,83,70,88,32,115,32,195,164,195,164,109,32,195,164,109,101,110,32,32,32,195,164,195,164,109,10,83,70,88,32,115,32,195,164,195,164,110,32,195,164,110,101,110,32,32,32,195,164,195,164,110,10,83,70,88,32,115,32,195,164,195,164,112,32,195,164,112,101,110,32,32,32,195,164,195,164,112,10,83,70,88,32,115,32,195,164,195,164,114,32,195,164,114,101,110,32,32,32,195,164,195,164,114,10,83,70,88,32,115,32,195,164,195,164,115,32,195,164,115,101,110,32,32,32,195,164,195,164,115,10,83,70,88,32,115,32,195,164,195,164,116,32,195,164,116,101,110,32,32,32,195,164,195,164,116,10,83,70,88,32,115,32,195,164,195,164,118,32,195,164,118,101,110,32,32,32,195,164,195,164,118,10,83,70,88,32,115,32,195,164,195,164,119,32,195,164,119,101,110,32,32,32,195,164,195,164,119,10,83,70,88,32,115,32,195,182,195,182,98,32,195,182,98,101,110,32,32,32,195,182,195,182,98,10,83,70,88,32,115,32,195,182,195,182,100,32,195,182,100,101,110,32,32,32,195,182,195,182,100,10,83,70,88,32,115,32,195,182,195,182,102,32,195,182,102,101,110,32,32,32,195,182,195,182,102,10,83,70,88,32,115,32,195,182,195,182,103,32,195,182,103,101,110,32,32,32,195,182,195,182,103,10,83,70,88,32,115,32,195,182,195,182,107,32,195,182,107,101,110,32,32,32,195,182,195,182,107,10,83,70,88,32,115,32,195,182,195,182,108,32,195,182,108,101,110,32,32,32,195,182,195,182,108,10,83,70,88,32,115,32,195,182,195,182,109,32,195,182,109,101,110,32,32,32,195,182,195,182,109,10,83,70,88,32,115,32,195,182,195,182,110,32,195,182,110,101,110,32,32,32,195,182,195,182,110,10,83,70,88,32,115,32,195,182,195,182,112,32,195,182,112,101,110,32,32,32,195,182,195,182,112,10,83,70,88,32,115,32,195,182,195,182,114,32,195,182,114,101,110,32,32,32,195,182,195,182,114,10,83,70,88,32,115,32,195,182,195,182,115,32,195,182,115,101,110,32,32,32,195,182,195,182,115,10,83,70,88,32,115,32,195,182,195,182,116,32,195,182,116,101,110,32,32,32,195,182,195,182,116,10,83,70,88,32,115,32,195,182,195,182,118,32,195,182,118,101,110,32,32,32,195,182,195,182,118,10,83,70,88,32,115,32,195,182,195,182,119,32,195,182,119,101,110,32,32,32,195,182,195,182,119,10,83,70,88,32,115,32,195,188,195,188,98,32,195,188,98,101,110,32,32,32,195,188,195,188,98,10,83,70,88,32,115,32,195,188,195,188,100,32,195,188,100,101,110,32,32,32,195,188,195,188,100,10,83,70,88,32,115,32,195,188,195,188,102,32,195,188,102,101,110,32,32,32,195,188,195,188,102,10,83,70,88,32,115,32,195,188,195,188,103,32,195,188,103,101,110,32,32,32,195,188,195,188,103,10,83,70,88,32,115,32,195,188,195,188,107,32,195,188,107,101,110,32,32,32,195,188,195,188,107,10,83,70,88,32,115,32,195,188,195,188,108,32,195,188,108,101,110,32,32,32,195,188,195,188,108,10,83,70,88,32,115,32,195,188,195,188,109,32,195,188,109,101,110,32,32,32,195,188,195,188,109,10,83,70,88,32,115,32,195,188,195,188,110,32,195,188,110,101,110,32,32,32,195,188,195,188,110,10,83,70,88,32,115,32,195,188,195,188,112,32,195,188,112,101,110,32,32,32,195,188,195,188,112,10,83,70,88,32,115,32,195,188,195,188,114,32,195,188,114,101,110,32,32,32,195,188,195,188,114,10,83,70,88,32,115,32,195,188,195,188,115,32,195,188,115,101,110,32,32,32,195,188,195,188,115,10,83,70,88,32,115,32,195,188,195,188,116,32,195,188,116,101,110,32,32,32,195,188,195,188,116,10,83,70,88,32,115,32,195,188,195,188,118,32,195,188,118,101,110,32,32,32,195,188,195,188,118,10,83,70,88,32,115,32,195,188,195,188,119,32,195,188,119,101,110,32,32,32,195,188,195,188,119,10,10,10,35,32,69,32,97,110,102,195,188,103,101,110,44,32,122,46,66,46,32,65,100,106,101,107,116,105,118,32,103,111,111,100,32,61,62,32,103,111,100,101,10,83,70,88,32,101,32,89,32,49,48,51,10,83,70,88,32,101,32,48,32,32,32,101,32,32,32,32,32,91,94,97,101,105,111,117,195,182,195,188,93,91,94,97,101,105,111,117,195,182,195,188,93,10,83,70,88,32,101,32,48,32,32,32,101,32,32,32,32,32,91,94,97,101,105,111,117,195,182,195,188,93,91,97,101,105,111,117,195,182,195,188,93,91,94,97,101,105,111,117,195,182,195,188,93,10,83,70,88,32,101,32,48,32,32,32,101,32,32,32,32,32,91,94,97,101,105,111,117,195,182,195,188,93,101,114,10,83,70,88,32,101,32,98,101,108,32,98,108,101,32,32,32,98,101,108,10,83,70,88,32,101,32,97,97,98,32,97,98,101,32,32,32,97,97,98,10,83,70,88,32,101,32,97,97,100,32,97,100,101,32,32,32,97,97,100,10,83,70,88,32,101,32,97,97,102,32,97,102,101,32,32,32,97,97,102,10,83,70,88,32,101,32,97,97,103,32,97,103,101,32,32,32,97,97,103,10,83,70,88,32,101,32,97,97,107,32,97,107,101,32,32,32,97,97,107,10,83,70,88,32,101,32,97,97,108,32,97,108,101,32,32,32,97,97,108,10,83,70,88,32,101,32,97,97,109,32,97,109,101,32,32,32,97,97,109,10,83,70,88,32,101,32,97,97,110,32,97,110,101,32,32,32,97,97,110,10,83,70,88,32,101,32,97,97,112,32,97,112,101,32,32,32,97,97,112,10,83,70,88,32,101,32,97,97,114,32,97,114,101,32,32,32,97,97,114,10,83,70,88,32,101,32,97,97,115,32,97,115,101,32,32,32,97,97,115,10,83,70,88,32,101,32,97,97,116,32,97,116,101,32,32,32,97,97,116,10,83,70,88,32,101,32,97,97,118,32,97,118,101,32,32,32,97,97,118,10,83,70,88,32,101,32,97,97,119,32,97,119,101,32,32,32,97,97,119,10,83,70,88,32,101,32,101,101,98,32,101,98,101,32,32,32,101,101,98,10,83,70,88,32,101,32,101,101,100,32,101,100,101,32,32,32,101,101,100,10,83,70,88,32,101,32,101,101,102,32,101,102,101,32,32,32,101,101,102,10,83,70,88,32,101,32,101,101,103,32,101,103,101,32,32,32,101,101,103,10,83,70,88,32,101,32,101,101,107,32,101,107,101,32,32,32,101,101,107,10,83,70,88,32,101,32,101,101,108,32,101,108,101,32,32,32,101,101,108,10,83,70,88,32,101,32,101,101,109,32,101,109,101,32,32,32,101,101,109,10,83,70,88,32,101,32,101,101,110,32,101,110,101,32,32,32,101,101,110,10,83,70,88,32,101,32,101,101,112,32,101,112,101,32,32,32,101,101,112,10,83,70,88,32,101,32,101,101,114,32,101,114,101,32,32,32,101,101,114,10,83,70,88,32,101,32,101,101,115,32,101,115,101,32,32,32,101,101,115,10,83,70,88,32,101,32,101,101,116,32,101,116,101,32,32,32,101,101,116,10,83,70,88,32,101,32,101,101,118,32,101,118,101,32,32,32,101,101,118,10,83,70,88,32,101,32,101,101,119,32,101,119,101,32,32,32,101,101,119,10,83,70,88,32,101,32,105,101,110,32,105,101,110,101,32,32,105,101,110,10,83,70,88,32,101,32,111,111,98,32,111,98,101,32,32,32,111,111,98,10,83,70,88,32,101,32,111,111,100,32,111,100,101,32,32,32,111,111,100,10,83,70,88,32,101,32,111,111,102,32,111,102,101,32,32,32,111,111,102,10,83,70,88,32,101,32,111,111,103,32,111,103,101,32,32,32,111,111,103,10,83,70,88,32,101,32,111,111,107,32,111,107,101,32,32,32,111,111,107,10,83,70,88,32,101,32,111,111,108,32,111,108,101,32,32,32,111,111,108,10,83,70,88,32,101,32,111,111,109,32,111,109,101,32,32,32,111,111,109,10,83,70,88,32,101,32,111,111,110,32,111,110,101,32,32,32,111,111,110,10,83,70,88,32,101,32,111,111,112,32,111,112,101,32,32,32,111,111,112,10,83,70,88,32,101,32,111,111,114,32,111,114,101,32,32,32,111,111,114,10,83,70,88,32,101,32,111,111,115,32,111,115,101,32,32,32,111,111,115,10,83,70,88,32,101,32,111,111,116,32,111,116,101,32,32,32,111,111,116,10,83,70,88,32,101,32,111,111,118,32,111,118,101,32,32,32,111,111,118,10,83,70,88,32,101,32,111,111,119,32,111,119,101,32,32,32,111,111,119,10,83,70,88,32,101,32,117,117,98,32,117,98,101,32,32,32,117,117,98,10,83,70,88,32,101,32,117,117,100,32,117,100,101,32,32,32,117,117,100,10,83,70,88,32,101,32,117,117,102,32,117,102,101,32,32,32,117,117,102,10,83,70,88,32,101,32,117,117,103,32,117,103,101,32,32,32,117,117,103,10,83,70,88,32,101,32,117,117,107,32,117,107,101,32,32,32,117,117,107,10,83,70,88,32,101,32,117,117,108,32,117,108,101,32,32,32,117,117,108,10,83,70,88,32,101,32,117,117,109,32,117,109,101,32,32,32,117,117,109,10,83,70,88,32,101,32,117,117,110,32,117,110,101,32,32,32,117,117,110,10,83,70,88,32,101,32,117,117,112,32,117,112,101,32,32,32,117,117,112,10,83,70,88,32,101,32,117,117,114,32,117,114,101,32,32,32,117,117,114,10,83,70,88,32,101,32,117,117,115,32,117,115,101,32,32,32,117,117,115,10,83,70,88,32,101,32,117,117,116,32,117,116,101,32,32,32,117,117,116,10,83,70,88,32,101,32,117,117,118,32,117,118,101,32,32,32,117,117,118,10,83,70,88,32,101,32,117,117,119,32,117,119,101,32,32,32,117,117,119,10,83,70,88,32,101,32,195,164,195,164,98,32,195,164,98,101,32,32,32,195,164,195,164,98,10,83,70,88,32,101,32,195,164,195,164,100,32,195,164,100,101,32,32,32,195,164,195,164,100,10,83,70,88,32,101,32,195,164,195,164,102,32,195,164,102,101,32,32,32,195,164,195,164,102,10,83,70,88,32,101,32,195,164,195,164,103,32,195,164,103,101,32,32,32,195,164,195,164,103,10,83,70,88,32,101,32,195,164,195,164,107,32,195,164,107,101,32,32,32,195,164,195,164,107,10,83,70,88,32,101,32,195,164,195,164,108,32,195,164,108,101,32,32,32,195,164,195,164,108,10,83,70,88,32,101,32,195,164,195,164,109,32,195,164,109,101,32,32,32,195,164,195,164,109,10,83,70,88,32,101,32,195,164,195,164,110,32,195,164,110,101,32,32,32,195,164,195,164,110,10,83,70,88,32,101,32,195,164,195,164,112,32,195,164,112,101,32,32,32,195,164,195,164,112,10,83,70,88,32,101,32,195,164,195,164,114,32,195,164,114,101,32,32,32,195,164,195,164,114,10,83,70,88,32,101,32,195,164,195,164,115,32,195,164,115,101,32,32,32,195,164,195,164,115,10,83,70,88,32,101,32,195,164,195,164,116,32,195,164,116,101,32,32,32,195,164,195,164,116,10,83,70,88,32,101,32,195,164,195,164,118,32,195,164,118,101,32,32,32,195,164,195,164,118,10,83,70,88,32,101,32,195,164,195,164,119,32,195,164,119,101,32,32,32,195,164,195,164,119,10,83,70,88,32,101,32,195,182,195,182,98,32,195,182,98,101,32,32,32,195,182,195,182,98,10,83,70,88,32,101,32,195,182,195,182,100,32,195,182,100,101,32,32,32,195,182,195,182,100,10,83,70,88,32,101,32,195,182,195,182,102,32,195,182,102,101,32,32,32,195,182,195,182,102,10,83,70,88,32,101,32,195,182,195,182,103,32,195,182,103,101,32,32,32,195,182,195,182,103,10,83,70,88,32,101,32,195,182,195,182,107,32,195,182,107,101,32,32,32,195,182,195,182,107,10,83,70,88,32,101,32,195,182,195,182,108,32,195,182,108,101,32,32,32,195,182,195,182,108,10,83,70,88,32,101,32,195,182,195,182,109,32,195,182,109,101,32,32,32,195,182,195,182,109,10,83,70,88,32,101,32,195,182,195,182,110,32,195,182,110,101,32,32,32,195,182,195,182,110,10,83,70,88,32,101,32,195,182,195,182,112,32,195,182,112,101,32,32,32,195,182,195,182,112,10,83,70,88,32,101,32,195,182,195,182,114,32,195,182,114,101,32,32,32,195,182,195,182,114,10,83,70,88,32,101,32,195,182,195,182,115,32,195,182,115,101,32,32,32,195,182,195,182,115,10,83,70,88,32,101,32,195,182,195,182,116,32,195,182,116,101,32,32,32,195,182,195,182,116,10,83,70,88,32,101,32,195,182,195,182,118,32,195,182,118,101,32,32,32,195,182,195,182,118,10,83,70,88,32,101,32,195,182,195,182,119,32,195,182,119,101,32,32,32,195,182,195,182,119,10,83,70,88,32,101,32,195,188,195,188,98,32,195,188,98,101,32,32,32,195,188,195,188,98,10,83,70,88,32,101,32,195,188,195,188,100,32,195,188,100,101,32,32,32,195,188,195,188,100,10,83,70,88,32,101,32,195,188,195,188,103,32,195,188,103,101,32,32,32,195,188,195,188,103,10,83,70,88,32,101,32,195,188,195,188,102,32,195,188,102,101,32,32,32,195,188,195,188,102,10,83,70,88,32,101,32,195,188,195,188,107,32,195,188,107,101,32,32,32,195,188,195,188,107,10,83,70,88,32,101,32,195,188,195,188,108,32,195,188,108,101,32,32,32,195,188,195,188,108,10,83,70,88,32,101,32,195,188,195,188,109,32,195,188,109,101,32,32,32,195,188,195,188,109,10,83,70,88,32,101,32,195,188,195,188,110,32,195,188,110,101,32,32,32,195,188,195,188,110,10,83,70,88,32,101,32,195,188,195,188,112,32,195,188,112,101,32,32,32,195,188,195,188,112,10,83,70,88,32,101,32,195,188,195,188,114,32,195,188,114,101,32,32,32,195,188,195,188,114,10,83,70,88,32,101,32,195,188,195,188,115,32,195,188,115,101,32,32,32,195,188,195,188,115,10,83,70,88,32,101,32,195,188,195,188,116,32,195,188,116,101,32,32,32,195,188,195,188,116,10,83,70,88,32,101,32,195,188,195,188,118,32,195,188,118,101,32,32,32,195,188,195,188,118,10,83,70,88,32,101,32,195,188,195,188,119,32,195,188,119,101,32,32,32,195,188,195,188,119,10,10,35,32,78,32,97,110,102,195,188,103,101,110,44,32,122,46,66,46,32,65,100,106,101,107,116,105,118,32,103,111,111,100,32,61,62,32,103,111,100,101,10,83,70,88,32,110,32,89,32,49,48,53,10,83,70,88,32,110,32,48,32,32,32,101,110,32,32,32,32,32,91,94,97,101,105,111,117,195,182,195,188,93,91,94,97,101,105,111,117,195,182,195,188,93,10,83,70,88,32,110,32,48,32,32,32,101,110,32,32,32,32,32,91,94,97,101,105,111,117,195,182,195,188,93,91,97,101,105,111,117,195,182,195,188,93,91,94,97,101,105,111,117,195,182,195,188,93,10,83,70,88,32,110,32,48,32,32,32,101,110,32,32,32,32,32,91,94,97,101,105,111,117,195,182,195,188,93,101,114,10,83,70,88,32,110,32,48,32,32,32,110,32,32,32,32,32,32,101,10,83,70,88,32,110,32,48,32,32,32,101,110,32,32,32,32,32,91,105,93,91,94,97,101,105,111,117,195,182,195,188,93,10,83,70,88,32,110,32,98,101,108,32,98,108,101,110,32,32,32,98,101,108,10,83,70,88,32,110,32,97,97,98,32,97,98,101,110,32,32,32,97,97,98,10,83,70,88,32,110,32,97,97,100,32,97,100,101,110,32,32,32,97,97,100,10,83,70,88,32,110,32,97,97,102,32,97,102,101,110,32,32,32,97,97,102,10,83,70,88,32,110,32,97,97,103,32,97,103,101,110,32,32,32,97,97,103,10,83,70,88,32,110,32,97,97,107,32,97,107,101,110,32,32,32,97,97,107,10,83,70,88,32,110,32,97,97,108,32,97,108,101,110,32,32,32,97,97,108,10,83,70,88,32,110,32,97,97,109,32,97,109,101,110,32,32,32,97,97,109,10,83,70,88,32,110,32,97,97,110,32,97,110,101,110,32,32,32,97,97,110,10,83,70,88,32,110,32,97,97,112,32,97,112,101,110,32,32,32,97,97,112,10,83,70,88,32,110,32,97,97,114,32,97,114,101,110,32,32,32,97,97,114,10,83,70,88,32,110,32,97,97,115,32,97,115,101,110,32,32,32,97,97,115,10,83,70,88,32,110,32,97,97,116,32,97,116,101,110,32,32,32,97,97,116,10,83,70,88,32,110,32,97,97,118,32,97,118,101,110,32,32,32,97,97,118,10,83,70,88,32,110,32,97,97,119,32,97,119,101,110,32,32,32,97,97,119,10,83,70,88,32,110,32,101,101,98,32,101,98,101,110,32,32,32,101,101,98,10,83,70,88,32,110,32,101,101,100,32,101,100,101,110,32,32,32,101,101,100,10,83,70,88,32,110,32,101,101,102,32,101,102,101,110,32,32,32,101,101,102,10,83,70,88,32,110,32,101,101,103,32,101,103,101,110,32,32,32,101,101,103,10,83,70,88,32,110,32,101,101,107,32,101,107,101,110,32,32,32,101,101,107,10,83,70,88,32,110,32,101,101,108,32,101,108,101,110,32,32,32,101,101,108,10,83,70,88,32,110,32,101,101,109,32,101,109,101,110,32,32,32,101,101,109,10,83,70,88,32,110,32,101,101,110,32,101,110,101,110,32,32,32,101,101,110,10,83,70,88,32,110,32,101,101,112,32,101,112,101,110,32,32,32,101,101,112,10,83,70,88,32,110,32,101,101,114,32,101,114,101,110,32,32,32,101,101,114,10,83,70,88,32,110,32,101,101,115,32,101,115,101,110,32,32,32,101,101,115,10,83,70,88,32,110,32,101,101,116,32,101,116,101,110,32,32,32,101,101,116,10,83,70,88,32,110,32,101,101,118,32,101,118,101,110,32,32,32,101,101,118,10,83,70,88,32,110,32,101,101,119,32,101,119,101,110,32,32,32,101,101,119,10,83,70,88,32,110,32,105,101,110,32,105,101,110,101,110,32,32,105,101,110,10,83,70,88,32,110,32,111,111,98,32,111,98,101,110,32,32,32,111,111,98,10,83,70,88,32,110,32,111,111,100,32,111,100,101,110,32,32,32,111,111,100,10,83,70,88,32,110,32,111,111,103,32,111,103,101,110,32,32,32,111,111,103,10,83,70,88,32,110,32,111,111,102,32,111,102,101,110,32,32,32,111,111,102,10,83,70,88,32,110,32,111,111,107,32,111,107,101,110,32,32,32,111,111,107,10,83,70,88,32,110,32,111,111,108,32,111,108,101,110,32,32,32,111,111,108,10,83,70,88,32,110,32,111,111,109,32,111,109,101,110,32,32,32,111,111,109,10,83,70,88,32,110,32,111,111,110,32,111,110,101,110,32,32,32,111,111,110,10,83,70,88,32,110,32,111,111,112,32,111,112,101,110,32,32,32,111,111,112,10,83,70,88,32,110,32,111,111,114,32,111,114,101,110,32,32,32,111,111,114,10,83,70,88,32,110,32,111,111,115,32,111,115,101,110,32,32,32,111,111,115,10,83,70,88,32,110,32,111,111,116,32,111,116,101,110,32,32,32,111,111,116,10,83,70,88,32,110,32,111,111,118,32,111,118,101,110,32,32,32,111,111,118,10,83,70,88,32,110,32,111,111,119,32,111,119,101,110,32,32,32,111,111,119,10,83,70,88,32,110,32,117,117,98,32,117,98,101,110,32,32,32,117,117,98,10,83,70,88,32,110,32,117,117,100,32,117,100,101,110,32,32,32,117,117,100,10,83,70,88,32,110,32,117,117,102,32,117,102,101,110,32,32,32,117,117,102,10,83,70,88,32,110,32,117,117,103,32,117,103,101,110,32,32,32,117,117,103,10,83,70,88,32,110,32,117,117,107,32,117,107,101,110,32,32,32,117,117,107,10,83,70,88,32,110,32,117,117,108,32,117,108,101,110,32,32,32,117,117,108,10,83,70,88,32,110,32,117,117,109,32,117,109,101,110,32,32,32,117,117,109,10,83,70,88,32,110,32,117,117,110,32,117,110,101,110,32,32,32,117,117,110,10,83,70,88,32,110,32,117,117,112,32,117,112,101,110,32,32,32,117,117,112,10,83,70,88,32,110,32,117,117,114,32,117,114,101,110,32,32,32,117,117,114,10,83,70,88,32,110,32,117,117,115,32,117,115,101,110,32,32,32,117,117,115,10,83,70,88,32,110,32,117,117,116,32,117,116,101,110,32,32,32,117,117,116,10,83,70,88,32,110,32,117,117,118,32,117,118,101,110,32,32,32,117,117,118,10,83,70,88,32,110,32,117,117,119,32,117,119,101,110,32,32,32,117,117,119,10,83,70,88,32,110,32,195,164,195,164,98,32,195,164,98,101,110,32,32,32,195,164,195,164,98,10,83,70,88,32,110,32,195,164,195,164,100,32,195,164,100,101,110,32,32,32,195,164,195,164,100,10,83,70,88,32,110,32,195,164,195,164,102,32,195,164,102,101,110,32,32,32,195,164,195,164,102,10,83,70,88,32,110,32,195,164,195,164,103,32,195,164,103,101,110,32,32,32,195,164,195,164,103,10,83,70,88,32,110,32,195,164,195,164,107,32,195,164,107,101,110,32,32,32,195,164,195,164,107,10,83,70,88,32,110,32,195,164,195,164,108,32,195,164,108,101,110,32,32,32,195,164,195,164,108,10,83,70,88,32,110,32,195,164,195,164,109,32,195,164,109,101,110,32,32,32,195,164,195,164,109,10,83,70,88,32,110,32,195,164,195,164,110,32,195,164,110,101,110,32,32,32,195,164,195,164,110,10,83,70,88,32,110,32,195,164,195,164,112,32,195,164,112,101,110,32,32,32,195,164,195,164,112,10,83,70,88,32,110,32,195,164,195,164,114,32,195,164,114,101,110,32,32,32,195,164,195,164,114,10,83,70,88,32,110,32,195,164,195,164,115,32,195,164,115,101,110,32,32,32,195,164,195,164,115,10,83,70,88,32,110,32,195,164,195,164,116,32,195,164,116,101,110,32,32,32,195,164,195,164,116,10,83,70,88,32,110,32,195,164,195,164,118,32,195,164,118,101,110,32,32,32,195,164,195,164,118,10,83,70,88,32,110,32,195,164,195,164,119,32,195,164,119,101,110,32,32,32,195,164,195,164,119,10,83,70,88,32,110,32,195,182,195,182,98,32,195,182,98,101,110,32,32,32,195,182,195,182,98,10,83,70,88,32,110,32,195,182,195,182,100,32,195,182,100,101,110,32,32,32,195,182,195,182,100,10,83,70,88,32,110,32,195,182,195,182,102,32,195,182,102,101,110,32,32,32,195,182,195,182,102,10,83,70,88,32,110,32,195,182,195,182,103,32,195,182,103,101,110,32,32,32,195,182,195,182,103,10,83,70,88,32,110,32,195,182,195,182,107,32,195,182,107,101,110,32,32,32,195,182,195,182,107,10,83,70,88,32,110,32,195,182,195,182,108,32,195,182,108,101,110,32,32,32,195,182,195,182,108,10,83,70,88,32,110,32,195,182,195,182,109,32,195,182,109,101,110,32,32,32,195,182,195,182,109,10,83,70,88,32,110,32,195,182,195,182,110,32,195,182,110,101,110,32,32,32,195,182,195,182,110,10,83,70,88,32,110,32,195,182,195,182,112,32,195,182,112,101,110,32,32,32,195,182,195,182,112,10,83,70,88,32,110,32,195,182,195,182,114,32,195,182,114,101,110,32,32,32,195,182,195,182,114,10,83,70,88,32,110,32,195,182,195,182,115,32,195,182,115,101,110,32,32,32,195,182,195,182,115,10,83,70,88,32,110,32,195,182,195,182,116,32,195,182,116,101,110,32,32,32,195,182,195,182,116,10,83,70,88,32,110,32,195,182,195,182,118,32,195,182,118,101,110,32,32,32,195,182,195,182,118,10,83,70,88,32,110,32,195,182,195,182,119,32,195,182,119,101,110,32,32,32,195,182,195,182,119,10,83,70,88,32,110,32,195,188,195,188,98,32,195,188,98,101,110,32,32,32,195,188,195,188,98,10,83,70,88,32,110,32,195,188,195,188,100,32,195,188,100,101,110,32,32,32,195,188,195,188,100,10,83,70,88,32,110,32,195,188,195,188,103,32,195,188,103,101,110,32,32,32,195,188,195,188,103,10,83,70,88,32,110,32,195,188,195,188,102,32,195,188,102,101,110,32,32,32,195,188,195,188,102,10,83,70,88,32,110,32,195,188,195,188,107,32,195,188,107,101,110,32,32,32,195,188,195,188,107,10,83,70,88,32,110,32,195,188,195,188,108,32,195,188,108,101,110,32,32,32,195,188,195,188,108,10,83,70,88,32,110,32,195,188,195,188,109,32,195,188,109,101,110,32,32,32,195,188,195,188,109,10,83,70,88,32,110,32,195,188,195,188,110,32,195,188,110,101,110,32,32,32,195,188,195,188,110,10,83,70,88,32,110,32,195,188,195,188,112,32,195,188,112,101,110,32,32,32,195,188,195,188,112,10,83,70,88,32,110,32,195,188,195,188,114,32,195,188,114,101,110,32,32,32,195,188,195,188,114,10,83,70,88,32,110,32,195,188,195,188,115,32,195,188,115,101,110,32,32,32,195,188,195,188,115,10,83,70,88,32,110,32,195,188,195,188,116,32,195,188,116,101,110,32,32,32,195,188,195,188,116,10,83,70,88,32,110,32,195,188,195,188,118,32,195,188,118,101,110,32,32,32,195,188,195,188,118,10,83,70,88,32,110,32,195,188,195,188,119,32,195,188,119,101,110,32,32,32,195,188,195,188,119,10,10,35,32,65,110,103,101,104,195,164,110,103,116,101,115,32,83,32,122,117,114,32,80,108,117,114,97,108,98,105,108,100,117,110,103,46,10,35,32,70,195,188,104,114,116,32,110,105,101,32,122,117,32,68,111,112,112,101,108,118,111,107,97,108,118,101,114,101,105,110,122,101,108,117,110,103,10,83,70,88,32,83,32,89,32,49,10,83,70,88,32,83,32,48,32,115,10,10,35,32,72,97,109,98,111,114,103,32,61,62,32,80,101,114,115,111,110,32,109,195,164,110,110,108,105,99,104,58,32,72,97,109,98,111,114,103,101,114,32,117,110,100,32,80,108,117,114,97,108,32,72,97,109,98,111,114,103,101,114,115,10,35,32,72,97,109,98,111,114,103,32,61,62,32,80,101,114,115,111,110,32,119,101,105,98,108,105,99,104,58,32,72,97,109,98,111,114,103,101,114,115,99,104,47,101,32,117,110,100,32,80,108,117,114,97,108,32,119,105,101,32,83,105,110,103,117,108,97,114,10,35,32,72,97,109,98,117,114,103,32,61,62,32,65,100,106,101,107,116,105,118,32,72,97,109,98,117,114,103,115,99,104,32,109,105,116,32,68,101,107,108,105,110,97,116,105,111,110,32,47,101,110,10,83,70,88,32,118,32,89,32,56,10,83,70,88,32,118,32,48,32,101,114,32,91,94,101,108,93,10,83,70,88,32,118,32,48,32,101,114,115,32,91,94,101,108,93,10,83,70,88,32,118,32,48,32,101,114,115,99,104,32,91,94,101,108,93,10,83,70,88,32,118,32,48,32,101,114,115,99,104,101,32,91,94,101,108,93,10,83,70,88,32,118,32,48,32,101,114,115,99,104,101,110,32,91,94,101,108,93,10,83,70,88,32,118,32,48,32,115,99,104,32,91,94,101,108,93,10,83,70,88,32,118,32,48,32,115,99,104,101,32,91,94,101,108,93,10,83,70,88,32,118,32,48,32,115,99,104,101,110,32,91,94,101,108,93,10])
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4).Buffer))

/***/ }),
/* 23 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return (b64.length * 3 / 4) - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr((len * 3 / 4) - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0; i < l; i += 4) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ }),
/* 25 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 26 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {module.exports = new Buffer([32,32,32,32,57,53,52,51,10,97,97,97,10,118,101,114,115,99,104,111,111,110,101,101,110,112,117,110,107,116,116,119,101,101,10,65,97,100,98,111,111,114,47,83,10,65,97,100,108,101,114,47,83,10,65,97,102,116,10,65,97,102,116,98,111,111,109,10,65,97,102,116,98,195,182,195,182,109,10,65,97,102,116,103,111,111,114,110,10,65,97,108,10,65,97,108,115,10,65,97,108,98,101,101,114,10,65,97,108,98,101,114,101,110,10,97,97,108,103,108,97,116,116,47,101,110,10,65,97,108,107,114,117,117,116,10,65,97,108,115,117,112,112,10,65,97,108,115,117,112,112,101,110,10,65,97,110,116,10,65,97,110,116,101,110,10,65,97,110,116,101,110,98,114,97,100,101,110,10,65,97,110,116,101,110,102,108,111,116,116,10,65,97,110,116,101,110,112,111,111,108,10,65,97,110,116,101,110,112,195,182,195,182,108,10,65,97,112,47,110,10,65,97,112,107,97,116,116,47,110,10,97,97,112,115,99,104,47,10,65,97,115,10,65,97,115,107,114,97,97,109,10,65,97,115,107,114,101,105,104,47,110,10,65,97,115,118,97,103,101,108,47,83,10,97,98,97,115,105,103,47,101,110,10,65,98,105,116,117,114,10,97,98,115,116,114,97,107,116,47,101,110,10,97,99,104,10,97,99,104,116,47,101,110,10,65,99,104,116,100,97,97,103,115,107,108,111,99,107,47,110,10,65,99,104,116,100,97,97,103,115,116,105,101,116,10,65,99,104,116,101,108,115,116,101,108,108,10,65,99,104,116,101,108,115,116,101,108,108,101,110,10,97,99,104,116,101,110,47,73,68,87,77,79,66,86,10,97,99,104,116,101,114,10,97,99,104,116,101,114,39,110,97,110,110,101,114,10,97,99,104,116,101,114,97,110,10,65,99,104,116,101,114,98,97,99,107,47,110,10,97,99,104,116,101,114,98,97,110,103,47,101,110,10,65,99,104,116,101,114,98,97,110,107,10,65,99,104,116,101,114,98,195,164,110,107,10,65,99,104,116,101,114,98,101,101,110,10,65,99,104,116,101,114,98,101,110,101,110,10,65,99,104,116,101,114,100,101,101,108,10,65,99,104,116,101,114,100,101,108,101,110,10,65,99,104,116,101,114,100,195,182,195,182,114,10,65,99,104,116,101,114,100,195,182,114,101,110,10,65,99,104,116,101,114,101,110,110,10,65,99,104,116,101,114,102,101,110,115,116,101,114,47,83,10,65,99,104,116,101,114,103,97,116,116,10,65,99,104,116,101,114,103,97,116,101,110,10,65,99,104,116,101,114,103,97,116,116,101,110,10,65,99,104,116,101,114,103,101,100,97,110,107,47,110,10,65,99,104,116,101,114,103,114,117,110,100,10,65,99,104,116,101,114,103,114,117,110,100,98,105,108,100,10,65,99,104,116,101,114,103,114,117,110,100,98,105,108,108,101,114,10,65,99,104,116,101,114,103,114,117,110,100,107,108,195,182,195,182,114,47,110,10,65,99,104,116,101,114,103,114,117,110,100,112,101,114,122,101,115,115,47,110,10,65,99,104,116,101,114,103,114,117,110,100,112,114,111,103,114,97,109,109,47,110,10,65,99,104,116,101,114,103,114,117,110,100,115,116,114,97,104,108,47,110,10,65,99,104,116,101,114,104,97,110,100,10,65,99,104,116,101,114,104,195,164,110,110,10,65,99,104,116,101,114,104,97,110,110,101,110,10,65,99,104,116,101,114,104,97,110,100,10,65,99,104,116,101,114,104,97,110,110,101,110,10,65,99,104,116,101,114,104,195,182,195,182,114,110,10,65,99,104,116,101,114,107,97,110,116,47,110,10,65,99,104,116,101,114,107,108,97,112,112,47,110,10,65,99,104,116,101,114,107,111,112,112,10,65,99,104,116,101,114,107,195,182,112,112,10,97,99,104,116,101,114,110,10,97,99,104,116,101,114,110,97,10,65,99,104,116,101,114,110,97,97,109,47,83,10,97,99,104,116,101,114,111,112,10,65,99,104,116,101,114,112,111,111,114,116,47,110,10,65,99,104,116,101,114,112,111,111,116,10,65,99,104,116,101,114,112,111,116,101,110,10,65,99,104,116,101,114,114,101,101,112,10,65,99,104,116,101,114,114,101,112,101,110,10,97,99,104,116,101,114,114,117,116,10,65,99,104,116,101,114,115,105,101,116,10,65,99,104,116,101,114,115,105,101,100,101,110,10,97,99,104,116,101,114,115,105,110,110,105,103,47,101,110,10,97,99,104,116,101,114,115,116,101,47,110,10,65,99,104,116,101,114,115,116,101,118,101,110,47,83,10,65,99,104,116,101,114,115,116,195,188,99,107,47,110,10,65,99,104,116,101,114,115,116,117,117,118,47,110,10,97,99,104,116,101,114,116,195,188,99,107,115,99,104,47,101,110,10,97,99,104,116,101,114,195,188,109,10,97,99,104,116,101,114,117,116,10,65,99,104,116,101,114,119,97,110,100,10,65,99,104,116,101,114,119,195,164,110,110,10,97,99,104,116,115,111,109,10,97,99,104,116,118,117,108,108,47,101,110,10,65,99,107,101,114,47,83,10,65,99,107,101,114,108,97,110,100,10,65,99,107,101,114,109,97,110,110,10,65,99,107,101,114,108,195,188,195,188,100,10,65,99,107,101,114,112,101,101,114,100,10,65,99,107,101,114,112,101,101,114,10,65,100,100,101,108,107,117,104,108,47,110,10,65,100,100,101,108,112,111,111,108,10,65,100,100,101,108,112,195,182,195,182,108,10,65,100,101,114,10,65,100,101,114,110,10,65,100,106,101,107,116,105,118,47,110,10,65,100,106,195,188,195,188,115,10,65,100,109,105,110,105,115,116,114,97,116,101,114,47,83,10,65,100,109,105,110,105,115,116,114,97,116,115,99,104,111,111,110,10,65,100,114,101,115,115,47,110,10,69,45,77,97,105,108,45,65,100,114,101,115,115,47,110,10,65,100,114,101,115,115,97,116,47,110,10,65,100,114,101,115,115,98,111,111,107,10,65,100,114,101,115,115,98,195,182,107,101,114,10,97,100,114,101,115,115,101,101,114,47,115,10,65,100,114,101,115,115,108,105,115,116,47,110,10,65,100,114,101,115,115,111,112,98,97,99,107,101,114,47,115,10,65,100,114,101,115,115,116,121,112,47,110,10,97,100,114,101,116,116,47,101,110,10,97,100,115,99,104,195,188,195,188,115,10,97,102,10,65,102,98,105,108,100,10,65,102,98,105,108,108,101,114,10,97,102,98,105,108,108,47,115,10,97,102,100,101,99,107,47,115,10,65,102,100,101,101,108,47,110,10,97,102,100,101,101,108,47,115,10,97,102,100,111,99,107,47,115,10,97,102,100,114,101,105,104,47,115,10,97,102,100,195,188,107,101,114,47,115,10,97,102,100,195,188,195,188,115,116,101,114,47,115,10,65,102,102,97,108,108,10,65,102,102,195,164,108,108,10,65,102,102,97,108,108,97,109,109,101,114,47,83,10,65,102,102,97,108,108,116,108,97,103,101,114,110,10,65,102,102,97,108,108,116,195,188,110,110,47,110,10,65,102,102,97,108,108,118,101,114,98,114,101,110,110,101,110,10,65,102,102,97,108,108,118,101,114,104,105,110,110,101,114,110,10,65,102,102,97,108,108,119,101,101,114,116,115,99,104,111,112,10,65,102,102,97,108,108,119,101,103,109,97,107,101,110,10,65,102,102,108,111,111,103,47,101,10,65,102,102,108,111,111,103,104,97,108,108,47,110,10,65,102,102,108,111,111,103,116,105,101,116,10,65,102,102,108,111,111,103,116,105,101,100,101,110,10,65,102,102,108,111,111,103,118,101,114,108,195,182,195,182,102,47,110,10,65,102,102,111,104,114,116,115,108,111,111,112,10,65,102,102,111,104,114,116,115,108,195,182,195,182,112,10,65,102,102,114,97,97,103,47,110,10,65,102,103,97,110,103,10,65,102,103,195,164,110,103,10,65,102,103,97,115,47,101,10,97,102,103,114,101,110,122,47,115,10,65,102,103,114,101,110,122,101,114,47,83,10,65,102,103,117,110,115,116,10,97,102,103,195,188,110,115,116,105,103,47,101,110,10,97,102,104,97,97,108,47,115,10,97,102,104,97,110,103,105,103,47,101,110,10,65,102,104,97,110,103,105,103,107,101,105,116,47,110,10,97,102,104,101,101,118,10,97,102,104,101,118,101,110,10,65,102,107,97,97,116,47,110,10,65,102,107,97,116,101,110,107,110,101,101,112,10,65,102,107,108,105,110,103,116,105,101,116,10,65,102,107,108,105,110,103,116,105,101,100,101,110,10,97,102,107,195,182,114,116,47,115,10,65,102,108,97,97,103,47,110,10,97,102,108,97,110,100,105,103,47,101,110,10,65,102,108,105,99,104,116,101,114,47,83,10,65,102,108,111,111,112,10,65,102,108,195,182,195,182,112,10,65,102,108,111,111,112,100,97,116,117,109,10,65,102,108,111,111,112,116,105,101,116,10,65,102,108,111,111,112,116,105,101,100,101,110,10,65,102,109,97,114,115,99,104,10,65,102,110,97,104,109,47,110,10,65,102,114,101,101,100,10,65,102,114,101,100,101,110,10,65,102,114,101,107,101,110,10,65,102,115,97,99,107,101,114,10,65,102,115,97,116,122,10,65,102,115,195,164,116,122,10,65,102,115,99,104,101,101,100,47,110,10,65,102,115,99,104,101,101,100,115,98,114,101,101,102,10,65,102,115,99,104,101,101,100,115,98,114,101,118,101,110,10,65,102,115,101,110,110,101,114,47,83,10,65,102,115,105,99,104,116,47,110,10,65,102,115,105,101,116,10,65,102,115,105,101,100,101,110,10,65,102,115,108,97,103,10,65,102,115,108,195,164,195,164,103,10,65,102,115,108,117,115,115,10,65,102,115,108,195,188,115,115,10,97,102,115,108,117,117,116,47,101,110,10,97,102,115,108,117,117,116,115,10,65,102,115,108,117,117,116,119,101,101,114,116,47,110,10,65,102,115,109,105,101,116,101,110,47,83,10,65,102,115,110,105,116,116,47,110,10,65,102,115,110,101,101,100,10,97,102,115,111,108,117,117,116,47,101,110,10,97,102,115,112,101,99,107,47,115,10,65,102,115,112,101,101,108,108,105,115,116,47,110,10,65,102,115,112,101,108,101,114,47,115,10,65,102,115,112,114,117,110,103,10,65,102,115,112,114,195,188,110,103,10,65,102,115,112,114,117,110,103,98,97,108,107,101,110,47,83,10,65,102,115,112,114,117,110,103,108,105,101,110,47,110,10,65,102,115,116,97,110,100,10,65,102,115,116,195,164,110,110,10,65,102,115,116,105,101,103,47,110,10,65,102,115,116,195,182,114,116,47,110,10,65,102,115,116,195,182,116,101,110,10,65,102,115,116,195,182,195,182,116,10,97,102,115,116,114,97,107,116,47,101,110,10,97,102,115,195,188,110,110,101,114,108,105,99,104,47,101,110,10,65,102,116,97,115,116,101,114,47,83,10,65,102,116,101,101,107,47,110,10,65,102,116,101,107,101,114,47,83,10,65,102,116,101,108,108,114,105,101,109,101,108,10,65,102,116,101,108,108,114,105,101,109,101,108,115,10,65,102,116,111,103,10,65,102,116,195,182,195,182,103,10,65,102,119,97,114,109,115,10,65,102,119,97,116,101,114,47,83,10,65,102,119,101,103,10,65,102,119,101,101,103,10,65,102,119,101,104,114,100,114,195,188,100,100,101,108,47,83,10,65,102,119,101,104,114,101,114,47,83,10,65,102,119,101,104,114,119,105,101,115,47,110,10,65,102,119,105,101,115,101,114,47,83,10,65,102,119,105,110,100,10,65,102,119,105,110,110,10,65,102,119,105,110,110,101,110,10,65,103,101,110,116,47,110,10,65,103,103,114,101,103,97,116,10,65,103,103,114,101,103,97,116,116,111,115,116,97,110,100,10,65,103,103,114,101,103,97,116,116,111,115,116,195,164,110,110,10,97,103,103,114,101,115,115,105,118,47,101,110,10,65,103,114,111,114,112,111,108,105,116,105,107,10,97,104,10,195,164,104,10,65,104,97,10,195,164,104,101,109,10,65,104,108,47,110,10,97,104,110,10,97,104,110,101,110,47,73,68,87,79,77,115,10,97,107,97,100,101,101,109,115,99,104,47,101,110,10,65,107,97,100,101,109,105,101,47,110,10,65,107,107,117,115,97,116,105,118,10,97,107,114,97,97,116,47,101,110,10,97,107,114,97,116,101,114,47,101,110,10,97,107,114,97,97,116,115,116,47,101,110,10,65,107,114,97,97,116,104,101,105,116,47,110,10,65,107,114,111,98,97,116,47,110,10,65,107,114,111,110,121,109,47,110,10,65,107,115,99,104,111,111,110,47,110,10,65,107,115,99,104,111,111,110,115,112,114,111,103,114,97,109,109,47,101,110,10,65,107,116,101,110,116,97,115,99,104,47,110,10,97,107,116,105,118,47,101,110,10,97,107,116,105,118,101,101,114,47,115,10,65,107,116,105,118,105,116,195,164,116,47,110,10,97,107,116,117,97,108,105,115,101,101,114,47,115,10,97,107,116,117,101,108,108,47,101,110,10,97,107,117,115,116,105,115,99,104,47,101,110,10,65,107,122,101,110,116,47,110,10,97,108,10,65,108,97,114,109,47,83,10,65,108,98,97,115,116,101,114,10,65,108,97,98,97,115,116,101,114,10,65,108,98,100,114,111,111,109,10,65,108,98,100,114,195,182,195,182,109,10,97,108,98,101,114,110,47,101,110,10,65,108,98,117,109,10,65,108,98,101,110,10,65,108,99,104,101,109,105,101,10,65,108,99,104,101,109,105,115,116,47,110,10,97,108,102,97,98,101,101,116,115,99,104,47,101,110,10,65,108,102,97,98,101,116,47,110,10,65,108,112,104,97,98,101,116,47,110,10,65,108,103,101,98,114,97,10,65,108,103,111,114,105,116,104,109,117,115,10,65,108,103,111,114,105,116,104,109,101,110,10,97,108,103,111,114,105,116,109,105,115,99,104,47,101,110,10,65,108,105,97,115,10,65,108,105,97,115,101,115,10,65,108,107,97,108,105,109,101,116,97,108,108,47,110,10,65,108,107,111,104,111,108,10,65,108,107,111,118,101,110,47,83,10,97,108,108,10,97,108,108,101,10,97,108,108,101,110,115,10,65,108,108,100,97,103,10,65,108,108,101,101,10,65,108,108,101,101,110,10,97,108,108,101,101,110,10,97,108,108,101,109,97,110,110,10,97,108,108,101,114,98,101,115,116,47,101,110,10,97,108,108,101,114,101,101,114,115,116,47,101,110,10,97,108,108,101,114,104,97,110,100,10,97,108,108,101,114,104,195,182,195,182,99,104,115,116,47,101,110,10,97,108,108,101,114,108,195,164,110,103,115,116,47,101,110,10,97,108,108,101,114,108,101,101,103,115,116,47,101,110,10,97,108,108,101,114,108,101,116,122,116,47,101,110,10,97,108,108,101,114,119,101,103,101,110,115,10,97,108,108,103,101,109,101,101,110,47,101,110,10,97,108,108,109,195,164,99,104,116,105,103,47,101,110,10,97,108,108,116,105,101,116,10,97,108,108,116,111,104,111,111,112,10,65,108,109,97,110,97,99,104,10,97,108,112,104,97,10,97,108,112,104,97,110,117,109,101,101,114,115,99,104,47,101,110,10,97,108,115,111,10,65,76,84,10,65,108,116,10,65,108,116,101,114,110,97,116,105,101,118,10,65,108,116,101,114,110,97,116,105,118,101,110,10,97,108,116,101,114,110,97,116,105,118,47,101,110,10,65,108,116,71,114,10,65,109,98,111,108,116,47,110,10,65,109,101,110,10,65,109,105,100,97,97,109,10,65,109,109,101,114,47,83,10,97,109,109,101,114,119,105,101,115,47,101,110,10,65,109,195,182,195,182,98,47,110,10,65,109,112,108,105,116,117,117,100,47,110,10,65,109,115,101,108,10,65,109,115,101,108,110,10,65,109,116,10,195,132,109,116,101,114,10,69,104,114,101,110,97,109,116,10,69,104,114,101,110,195,164,109,116,101,114,10,65,109,116,115,115,112,114,97,97,107,47,110,10,65,109,116,115,116,105,101,116,10,65,109,116,115,116,105,101,100,101,110,10,97,109,195,188,115,101,101,114,47,115,10,97,110,10,97,110,39,110,10,97,110,39,116,10,97,110,97,108,111,111,103,47,101,110,10,65,110,97,108,121,115,101,47,110,10,97,110,97,108,121,115,101,101,114,47,115,10,65,110,97,110,97,115,10,65,110,97,116,111,109,105,101,10,65,110,98,97,114,103,47,110,10,65,110,98,101,100,101,114,47,83,10,65,110,98,111,116,116,47,110,10,65,110,100,97,99,104,116,47,110,10,65,110,100,101,101,108,47,110,10,65,110,100,101,110,107,101,110,10,97,110,100,111,99,107,47,115,10,97,110,100,111,99,107,98,111,114,47,101,110,10,65,110,100,114,97,103,10,65,110,100,114,195,164,195,164,103,10,65,110,100,114,111,109,101,100,97,47,83,10,65,110,101,109,111,111,110,47,110,10,65,110,102,97,108,108,10,65,110,102,195,164,108,108,10,65,110,102,97,110,103,10,65,110,102,195,164,110,103,10,65,110,102,195,164,110,103,101,114,47,83,10,65,110,102,114,97,97,103,47,110,10,65,110,103,97,97,118,47,110,10,65,110,103,97,97,118,114,117,117,109,10,65,110,103,97,97,118,114,195,188,195,188,109,10,65,110,103,97,110,103,10,65,110,103,195,164,110,103,10,65,110,103,101,108,10,65,110,103,101,108,110,10,65,110,103,101,108,101,103,101,110,104,101,105,116,47,110,10,65,110,103,101,118,101,114,47,83,10,65,110,103,114,101,101,112,47,110,10,97,110,103,114,101,101,112,115,99,104,47,101,110,10,65,110,103,114,101,101,112,115,108,105,101,110,47,110,10,65,110,103,114,101,101,112,115,119,105,101,115,47,110,10,65,110,103,114,101,101,112,115,122,111,111,110,47,110,10,65,110,103,114,105,101,112,101,114,47,83,10,65,110,103,114,105,101,112,101,114,47,83,10,65,110,103,114,105,101,112,101,114,115,99,104,101,47,110,10,65,110,103,115,116,10,65,110,103,115,116,101,110,10,65,110,104,97,110,103,10,65,110,104,195,164,110,103,10,65,110,105,109,97,116,115,99,104,111,111,110,47,110,10,97,110,105,109,101,101,114,47,115,10,65,110,107,101,114,47,83,10,65,110,107,101,114,107,108,195,188,195,188,115,10,65,110,107,101,114,107,108,195,188,115,101,110,10,65,110,107,108,97,97,103,47,110,10,65,110,107,114,195,188,195,188,122,102,101,108,100,10,65,110,107,114,195,188,195,188,122,102,101,108,108,101,114,10,65,110,108,97,97,103,47,110,10,65,110,108,101,103,103,98,114,195,188,99,104,47,110,10,65,110,108,101,103,103,101,114,47,83,10,65,110,108,101,103,103,101,114,115,112,97,110,116,47,110,10,65,110,108,105,103,103,101,110,10,65,110,108,111,111,112,10,65,110,108,195,182,195,182,112,10,65,110,108,111,111,112,98,97,104,110,47,110,10,97,110,110,101,107,116,101,101,114,47,115,10,97,110,110,101,114,47,101,110,10,97,110,110,101,114,110,10,195,164,110,110,101,114,47,115,81,86,10,195,164,110,110,101,114,110,47,113,10,97,110,110,101,114,108,101,116,122,116,10,97,110,110,101,114,115,10,97,110,110,101,114,115,101,101,110,10,97,110,110,101,114,115,114,195,188,109,10,97,110,110,101,114,115,119,97,116,10,97,110,110,101,114,115,119,111,10,97,110,110,101,114,116,104,97,108,118,10,97,110,110,101,114,119,97,114,116,115,10,97,110,110,101,114,119,101,103,101,110,115,10,65,110,110,111,110,103,115,47,110,10,97,110,111,110,121,109,47,101,110,10,65,110,111,114,97,107,47,83,10,97,110,111,114,103,97,97,110,115,99,104,47,101,110,10,65,110,114,195,182,195,182,103,115,99,104,105,114,109,10,65,110,114,111,111,112,10,65,110,114,195,182,195,182,112,10,65,110,114,111,111,112,100,117,101,114,10,65,110,115,99,104,114,105,101,118,101,114,47,83,10,65,110,115,99,104,114,105,101,118,101,114,115,99,104,101,47,110,10,65,110,115,99,104,114,105,102,116,47,110,10,65,110,115,101,103,103,101,114,47,83,10,65,110,115,101,104,110,10,65,110,115,105,99,104,116,47,110,10,65,110,115,108,97,103,10,65,110,115,108,195,164,195,164,103,10,65,110,115,108,117,115,115,10,65,110,115,108,195,188,115,115,10,65,110,115,108,117,115,115,102,108,101,103,101,114,47,83,10,65,110,115,112,101,101,108,107,114,105,110,107,47,110,10,65,110,115,112,101,101,108,112,117,110,107,116,10,65,110,115,112,101,101,108,112,195,188,110,107,116,47,110,10,65,110,115,112,114,97,97,107,47,110,10,65,110,115,116,97,108,116,47,110,10,86,101,114,115,195,182,195,182,107,115,97,110,115,116,97,108,116,47,110,10,65,110,115,116,97,110,100,10,97,110,115,116,195,164,110,110,105,103,47,101,110,10,97,110,115,116,101,101,100,10,65,110,115,116,111,111,116,10,65,110,115,116,195,182,195,182,116,10,65,110,115,116,111,111,116,116,105,101,116,10,65,110,115,116,111,111,116,116,105,101,100,101,110,10,65,110,116,97,108,108,47,110,10,65,110,116,101,110,110,47,110,10,97,110,116,101,114,47,115,66,86,10,65,110,116,101,114,10,65,110,116,101,114,116,105,101,116,10,65,110,116,101,114,116,105,101,100,101,110,10,97,110,116,105,10,65,110,116,105,98,105,111,116,105,107,117,109,10,65,110,116,105,98,105,111,116,105,107,97,10,65,110,116,105,113,117,105,116,195,164,116,47,110,10,65,110,116,111,103,10,65,110,116,195,182,195,182,103,10,65,110,116,114,101,99,107,102,101,108,100,10,65,110,116,114,101,99,107,102,101,108,108,101,114,10,65,110,116,114,101,99,107,107,114,97,102,116,10,65,110,116,119,111,111,114,116,10,65,110,116,119,111,111,114,100,101,110,10,97,110,119,101,110,110,98,111,114,47,101,110,10,65,110,119,105,101,115,101,110,10,97,112,97,114,116,47,101,110,10,97,112,101,110,47,101,110,10,97,112,105,103,47,101,110,10,195,164,10,97,102,102,105,103,10,65,112,111,115,116,114,111,102,47,83,10,65,112,112,97,114,97,116,47,110,10,65,112,112,101,108,10,65,112,112,101,108,110,10,65,112,112,101,108,115,10,65,112,112,101,108,98,111,111,109,10,65,112,112,101,108,98,195,182,195,182,109,10,97,112,112,101,108,100,119,97,116,115,99,104,47,101,110,10,65,112,112,101,108,103,114,195,188,116,116,10,65,112,112,101,108,107,111,107,101,110,10,65,112,112,101,108,115,97,102,116,10,65,112,112,101,108,115,105,101,110,47,110,10,65,112,112,101,108,115,105,110,97,47,83,10,65,112,112,108,97,117,115,10,65,112,112,108,105,107,97,116,115,99,104,111,111,110,47,110,10,65,112,116,105,101,116,10,65,113,117,97,112,108,97,110,105,110,103,10,65,113,117,97,114,105,117,109,10,65,113,117,97,114,105,101,110,10,195,132,113,117,97,116,101,114,10,97,114,98,101,105,100,47,115,81,66,82,74,80,84,90,85,86,70,88,10,97,114,98,101,105,100,47,113,98,114,106,112,116,122,117,118,102,120,10,65,114,98,101,105,100,101,114,47,83,10,65,114,98,101,105,100,101,114,115,99,104,101,47,110,10,65,114,98,101,105,100,101,114,112,97,114,116,101,105,10,65,114,98,101,105,116,10,65,114,98,101,105,100,101,110,10,65,114,98,101,105,116,115,100,97,103,10,65,114,98,101,105,116,115,100,97,97,103,10,65,114,98,101,105,116,115,103,114,117,112,112,47,110,10,65,114,98,101,105,116,115,107,108,101,100,97,97,115,99,104,10,65,114,98,101,105,116,115,111,114,110,101,114,47,83,10,65,114,99,104,105,116,101,107,116,47,110,10,65,114,99,104,105,118,47,110,10,65,114,99,104,105,118,100,97,116,101,105,47,110,10,97,114,99,104,105,118,101,101,114,47,115,10,65,114,99,104,105,118,103,114,195,182,116,116,10,65,114,99,104,105,118,110,97,97,109,47,83,10,65,114,102,10,65,114,102,116,101,110,10,65,114,102,101,110,10,65,114,102,116,101,110,115,117,112,112,47,110,10,65,114,103,101,114,10,97,114,103,101,114,108,105,99,104,47,101,110,10,97,114,103,101,114,110,47,73,68,87,77,79,86,10,65,114,103,117,109,101,110,116,47,110,10,97,114,105,116,104,109,101,101,116,115,99,104,47,101,110,10,65,114,105,116,104,109,101,116,105,107,10,97,114,109,47,101,110,10,97,114,109,101,114,47,101,110,10,65,114,109,47,83,10,65,114,109,97,116,117,114,101,110,98,114,101,116,116,10,65,114,109,97,116,117,114,101,110,98,114,101,116,116,10,65,114,109,97,116,117,114,101,110,98,114,101,101,100,10,65,114,109,97,116,117,114,101,110,98,114,101,100,101,114,10,65,114,109,98,114,117,115,116,10,65,114,109,101,101,10,65,114,109,101,101,110,10,65,114,109,107,108,111,99,107,47,110,10,65,114,109,111,116,10,65,114,109,115,116,111,104,108,10,65,114,109,115,116,195,182,104,108,10,97,114,109,118,117,108,108,10,65,114,114,101,115,116,10,65,114,116,101,102,97,107,116,47,110,10,65,114,116,105,107,101,108,47,83,10,65,114,116,105,115,116,47,110,10,97,114,118,47,115,66,72,86,70,10,97,114,118,47,98,104,102,10,65,114,118,10,65,114,118,101,110,10,65,114,118,100,101,101,108,10,65,114,118,100,101,108,101,110,10,65,114,118,115,99,104,111,112,10,65,114,118,115,99,104,111,112,112,101,110,10,65,114,118,115,116,195,188,99,107,47,110,10,65,114,122,98,105,115,99,104,111,112,10,65,114,122,98,105,115,99,104,195,182,112,10,65,114,122,98,105,115,99,104,111,112,112,101,110,10,65,114,122,98,105,115,100,111,109,10,65,114,122,98,105,115,100,195,182,109,101,114,10,97,115,10,97,115,39,110,10,97,115,39,116,10,65,115,10,65,115,115,101,110,10,65,115,99,104,10,65,115,99,104,97,109,109,101,114,47,83,10,97,115,99,104,101,110,98,108,101,101,107,47,101,110,10,97,115,99,104,103,114,105,101,115,47,101,110,10,97,115,101,110,10,97,97,115,47,68,87,77,79,10,97,115,105,103,47,101,110,81,10,97,115,105,103,101,114,47,101,110,10,97,115,105,103,115,116,47,101,110,10,65,115,112,101,107,116,47,110,10,65,115,115,47,110,10,65,115,115,101,109,98,108,101,114,47,83,10,65,115,115,105,115,116,101,110,116,47,110,10,65,115,116,101,114,105,115,107,47,110,10,65,115,116,101,114,111,105,100,47,110,10,65,115,116,114,111,110,111,109,47,83,10,65,115,116,114,111,110,111,109,105,101,10,97,115,116,114,111,110,111,111,109,115,99,104,47,101,110,10,65,115,121,108,10,65,115,121,108,97,110,100,114,97,103,10,65,115,121,108,97,110,100,114,195,164,195,164,103,10,65,115,121,109,112,116,111,111,116,47,110,10,97,115,121,110,99,104,114,111,111,110,47,101,110,10,65,116,101,110,10,97,116,104,108,101,101,116,115,99,104,47,101,110,10,65,116,104,108,101,116,47,110,10,65,116,109,111,115,112,104,195,164,195,164,114,47,110,10,65,116,111,109,47,110,10,65,116,111,109,98,111,109,98,47,110,10,65,116,111,109,101,110,101,114,103,105,101,47,110,10,65,116,111,109,107,114,97,102,116,119,97,114,107,47,101,110,10,65,116,111,109,109,97,115,115,47,110,10,65,116,111,109,109,111,100,101,108,108,47,110,10,65,116,111,109,116,97,108,108,47,110,10,65,116,111,109,117,116,115,116,105,101,103,47,101,110,10,65,116,111,111,109,47,110,10,97,116,111,111,109,115,99,104,47,101,110,10,97,116,115,99,104,195,188,195,188,115,10,65,116,115,99,104,195,188,195,188,115,10,65,116,116,97,99,107,47,110,10,65,116,116,114,105,98,117,116,47,110,10,97,117,97,10,65,117,100,105,111,10,65,117,101,114,98,97,99,104,115,112,114,117,110,103,10,65,117,101,114,98,97,99,104,115,112,114,195,188,110,103,10,65,117,107,115,99,104,111,111,110,47,110,10,65,117,116,111,47,83,10,65,117,116,111,98,97,104,110,47,110,10,65,117,116,111,98,97,104,110,116,111,108,108,10,65,117,116,111,98,97,104,110,116,195,182,108,108,10,65,117,116,111,100,97,99,107,10,65,117,116,111,100,97,99,107,101,110,10,65,117,116,111,100,195,164,99,107,101,114,10,65,117,116,111,100,195,182,195,182,114,47,110,10,65,117,116,111,102,111,104,114,101,114,47,83,10,65,117,116,111,102,111,104,114,101,114,115,99,104,47,110,10,65,117,116,111,103,114,97,109,109,47,110,10,97,117,116,111,109,97,97,116,115,99,104,47,101,110,10,97,117,116,111,109,10,65,117,116,111,109,97,108,195,182,195,182,114,47,83,10,65,117,116,111,109,97,116,47,110,10,65,117,116,111,109,97,116,105,107,47,110,10,65,117,116,111,114,47,110,10,65,117,116,111,114,105,116,195,164,116,47,110,10,65,117,116,115,99,104,10,65,118,101,110,47,83,10,97,118,101,110,100,10,65,118,101,110,100,47,110,10,65,118,101,110,100,98,114,111,111,116,10,65,118,101,110,100,98,114,111,111,116,115,116,105,101,116,10,65,118,101,110,100,101,116,101,110,10,65,118,101,110,100,108,117,102,116,10,97,118,101,110,100,115,10,65,118,101,110,116,195,188,101,114,10,65,118,101,110,116,195,188,101,114,110,10,65,118,101,110,116,195,188,195,188,114,10,65,118,101,110,116,195,188,114,101,110,10,97,118,101,114,10,97,118,101,114,115,10,65,118,101,114,103,108,111,111,118,10,65,118,101,114,103,108,111,118,101,110,10,97,118,101,114,103,108,195,182,195,182,118,115,99,104,47,101,110,10,65,120,116,10,195,132,120,10,195,132,120,116,10,66,97,97,100,10,66,97,100,101,110,10,66,97,97,100,98,195,188,120,47,110,10,66,97,97,100,102,114,111,10,66,97,97,100,102,114,111,111,110,115,10,66,97,97,100,103,97,115,116,10,66,97,97,100,103,195,164,115,116,10,66,97,97,100,107,97,112,112,47,110,10,66,97,97,100,109,97,110,116,101,108,47,83,10,66,97,97,100,115,116,117,117,118,47,110,10,66,97,97,100,118,101,114,98,111,116,116,47,110,10,66,97,97,100,119,97,110,110,47,110,10,66,97,97,115,47,110,10,66,97,98,117,116,122,47,110,10,66,97,98,121,10,66,97,98,121,112,111,112,112,47,110,10,66,97,99,107,98,101,101,115,116,47,110,10,66,97,99,107,98,111,111,107,10,66,97,99,107,98,195,182,107,101,114,10,66,97,99,107,98,111,111,114,100,10,98,97,99,107,101,110,47,73,68,87,77,79,65,81,82,74,80,85,86,70,10,98,97,99,107,101,110,47,97,113,114,106,112,117,118,102,10,66,97,99,107,101,110,115,116,195,188,99,107,47,110,10,66,195,164,99,107,101,114,47,83,10,98,97,99,107,10,102,97,115,116,98,97,99,107,47,115,10,98,97,99,107,105,103,47,101,110,10,66,97,99,107,115,47,101,10,98,97,99,107,115,105,103,101,47,101,110,10,66,97,99,107,115,116,101,101,110,47,110,10,66,97,100,109,105,110,116,111,110,10,66,97,100,109,105,110,116,111,110,98,97,108,108,10,66,97,100,109,105,110,116,111,110,98,195,164,108,108,10,66,97,100,109,105,110,116,111,110,112,108,97,116,122,10,66,97,100,109,105,110,116,111,110,112,108,195,164,116,122,10,66,97,100,109,105,110,116,111,110,115,108,195,164,103,101,114,47,83,10,98,97,102,102,47,101,110,10,66,97,103,97,97,115,99,104,10,66,97,103,97,108,117,116,47,110,10,66,97,103,101,110,47,83,10,66,97,103,101,110,103,114,97,97,100,10,66,97,103,101,110,108,105,101,110,47,110,10,66,97,103,101,110,109,97,97,116,10,66,97,103,101,110,109,105,110,117,117,116,47,110,10,66,97,103,101,110,115,101,107,117,110,110,47,110,10,66,97,103,101,110,115,101,107,117,110,110,47,110,10,66,97,103,103,101,114,47,83,10,66,97,104,110,47,110,10,98,97,104,110,47,115,10,66,97,104,110,97,110,115,108,117,115,115,10,66,97,104,110,97,110,115,108,195,188,115,115,10,66,97,104,110,104,111,102,102,10,66,97,104,110,104,195,182,195,182,118,10,66,97,104,110,115,116,105,101,103,47,110,10,66,97,104,110,116,106,101,47,83,10,66,97,97,110,116,106,101,47,83,10,66,97,107,116,101,114,105,101,110,10,66,97,107,116,101,114,105,101,110,103,105,102,116,47,101,110,10,66,97,108,97,110,103,115,47,110,10,66,97,108,98,117,116,115,99,104,10,98,97,108,100,10,66,97,108,100,97,99,104,105,110,10,66,97,108,106,101,47,110,10,66,97,108,107,101,110,47,83,10,66,97,108,107,101,110,100,105,97,103,114,97,109,109,47,110,10,66,97,108,107,101,110,103,114,97,102,105,107,47,110,10,98,97,108,108,47,115,10,66,97,108,108,97,97,100,47,110,10,66,97,108,108,97,115,116,10,66,97,108,108,10,66,195,164,108,108,10,98,97,108,108,101,114,47,115,10,66,97,108,108,101,116,116,10,66,97,108,108,111,110,47,83,10,66,97,108,108,111,110,103,47,83,10,98,97,108,108,115,116,195,188,114,105,103,47,101,110,10,98,97,108,115,116,195,188,114,105,103,47,101,110,10,66,97,109,109,101,108,10,98,97,109,109,101,108,47,115,10,66,97,110,97,97,110,10,66,97,110,97,110,101,110,10,66,97,110,100,10,66,195,164,110,110,101,114,10,66,195,164,110,110,10,66,97,110,100,98,114,101,101,100,47,110,10,66,97,110,100,108,111,111,112,119,97,114,107,47,110,10,66,97,110,100,109,97,97,116,10,66,97,110,100,109,97,116,101,110,10,98,97,110,103,47,101,110,10,98,97,110,103,101,114,47,101,110,10,66,97,110,103,98,195,188,120,47,110,10,98,97,110,103,98,195,188,120,105,103,47,101,110,10,98,97,110,103,104,97,102,116,105,103,47,101,110,10,66,97,110,103,104,97,102,116,105,103,107,101,105,116,47,110,10,66,97,110,107,47,110,10,66,195,164,110,107,10,98,97,110,110,47,115,10,66,97,110,110,10,66,97,110,110,101,114,47,83,10,98,97,110,110,105,103,10,66,97,112,116,105,115,116,47,110,10,98,97,114,102,111,111,116,10,66,97,114,103,47,110,10,98,97,114,103,47,115,10,98,97,114,103,100,97,97,108,10,98,97,114,103,111,112,10,66,97,114,103,115,116,105,101,103,101,110,10,66,97,114,107,47,110,10,66,97,114,107,101,110,98,111,111,109,10,66,97,114,107,101,110,98,195,182,195,182,109,10,66,97,114,107,101,110,104,111,108,116,10,66,97,114,109,98,101,107,101,114,47,83,10,66,97,114,111,110,10,66,97,114,114,105,101,101,114,47,110,10,98,97,115,99,104,47,101,110,10,66,97,115,101,98,97,108,108,10,66,97,115,101,98,97,108,108,115,108,195,164,103,101,114,47,83,10,98,97,115,101,101,114,47,115,10,98,97,115,105,103,47,101,110,10,98,97,115,105,103,101,114,47,101,110,10,98,97,115,105,103,115,116,47,101,110,10,66,97,115,105,108,105,115,107,47,110,10,66,97,115,105,115,10,66,97,115,101,110,10,66,97,115,105,115,107,108,97,115,115,47,110,10,66,97,115,105,115,111,114,110,101,114,10,66,97,115,107,101,116,98,97,108,108,10,66,97,115,107,101,116,98,195,164,108,108,10,66,97,115,107,101,116,98,97,108,108,115,99,104,111,104,10,66,97,115,107,101,116,98,97,108,108,115,99,104,195,182,104,10,98,97,115,115,10,98,97,115,115,101,110,47,73,68,87,77,79,80,71,84,10,98,97,115,115,101,110,47,112,103,116,10,98,97,115,116,101,108,47,115,90,10,98,97,115,116,101,108,110,47,122,10,66,97,116,116,101,114,105,101,47,110,10,98,97,116,122,10,98,97,118,101,110,10,98,97,118,101,110,97,110,10,66,97,118,101,110,104,97,110,100,10,66,97,118,101,110,104,195,164,110,110,10,98,97,118,101,110,104,101,110,10,98,97,118,101,110,111,112,10,98,97,118,101,110,116,111,10,66,101,97,109,116,101,47,110,10,66,101,97,109,116,105,110,10,66,101,97,109,116,105,110,110,101,110,10,66,101,97,109,116,115,99,104,101,47,110,10,98,101,100,195,164,99,104,116,105,103,47,101,110,10,98,101,100,100,101,110,47,73,68,87,77,79,74,80,90,85,195,156,10,98,101,100,100,101,110,47,106,112,122,117,195,188,10,66,101,100,101,108,98,114,111,100,101,114,10,66,101,100,101,108,98,114,195,182,100,101,114,10,66,101,100,101,108,109,97,110,110,10,66,101,100,101,108,108,195,188,195,188,100,10,98,101,100,101,108,110,47,73,68,87,77,79,65,10,98,101,100,101,110,47,97,112,118,10,98,101,100,101,110,47,65,80,86,10,98,101,101,100,47,87,65,80,86,10,98,195,188,100,100,115,116,47,65,80,86,10,98,195,188,100,100,116,47,65,80,86,10,98,111,111,100,47,68,65,80,86,10,98,111,100,101,110,47,65,80,86,10,98,97,100,101,110,47,65,80,86,10,98,101,100,101,110,10,98,101,101,100,47,68,87,77,79,10,66,101,100,105,110,103,47,110,10,98,101,100,105,110,103,116,47,101,110,10,66,101,100,114,97,97,112,10,66,101,100,114,97,103,10,66,101,100,114,195,164,195,164,103,10,98,101,100,114,101,105,104,101,110,47,73,68,87,77,79,10,66,101,100,114,105,101,102,10,66,101,100,114,105,101,118,101,110,10,66,101,100,114,105,101,102,115,115,121,115,116,101,101,109,47,110,10,98,101,100,114,105,112,112,115,116,47,101,110,10,98,101,100,114,105,112,112,115,116,101,114,47,101,110,10,66,101,100,195,188,100,101,110,10,98,101,100,195,188,195,188,100,47,115,10,98,101,101,100,47,115,10,98,101,101,100,10,98,101,100,101,10,98,101,100,101,110,10,98,101,101,100,115,105,101,116,115,10,66,101,101,107,47,110,10,66,101,101,110,10,66,101,110,101,110,10,66,101,101,110,115,99,104,117,108,101,114,47,83,10,66,101,101,114,10,66,101,114,101,110,10,66,101,101,114,98,111,111,109,10,66,101,101,114,98,195,182,195,182,109,10,66,101,101,114,102,97,116,116,10,66,101,101,114,102,195,182,195,182,116,10,66,101,101,114,102,97,116,101,110,10,66,101,101,114,103,108,97,115,10,66,101,101,114,103,108,195,182,195,182,115,10,66,101,101,114,103,108,195,164,115,101,114,10,66,101,101,115,116,10,66,101,101,115,116,101,114,10,66,101,101,115,116,101,114,109,97,114,107,116,10,98,101,101,115,116,105,103,47,101,110,10,66,101,101,116,10,66,101,116,101,110,10,98,101,101,116,115,99,104,47,101,110,10,66,101,102,101,104,108,47,110,10,66,101,102,101,104,108,115,102,101,110,115,116,101,114,47,110,10,66,101,102,101,104,108,115,114,101,101,103,47,110,10,98,101,103,195,164,110,103,10,66,101,103,101,101,102,110,105,115,10,66,101,103,101,101,102,110,105,115,115,101,110,10,98,101,103,101,110,10,98,101,103,195,182,195,182,115,99,104,47,115,10,66,101,103,114,101,101,112,47,110,10,66,101,104,105,110,110,101,114,116,47,110,10,98,101,104,111,103,116,10,66,101,104,195,182,195,182,114,100,10,98,101,105,100,47,101,110,10,98,101,105,110,100,114,117,99,107,47,115,10,98,101,107,97,107,101,108,47,115,10,98,101,107,97,110,110,116,47,101,110,10,66,101,107,101,114,47,83,10,98,101,108,195,164,109,109,101,114,47,115,10,66,101,108,101,101,102,110,105,115,10,66,101,108,101,101,102,110,105,115,115,101,110,10,98,101,108,101,101,118,47,115,10,98,101,108,105,99,104,116,47,115,10,98,101,108,108,47,65,84,85,88,73,68,115,10,98,101,108,108,101,110,47,87,97,116,117,120,10,98,101,108,108,47,115,10,98,101,108,117,101,114,47,115,10,98,101,109,97,110,110,116,47,101,110,10,98,101,109,101,105,101,114,47,115,10,98,101,109,195,182,116,101,110,47,73,68,87,79,10,98,101,110,97,114,105,99,104,116,47,115,10,98,101,110,97,117,116,47,101,110,10,66,101,114,105,99,104,116,47,110,10,74,111,104,114,115,98,101,114,105,99,104,116,47,110,10,75,97,115,115,101,110,98,101,114,105,99,104,116,47,110,10,66,101,114,195,188,104,109,116,104,101,105,116,47,110,10,66,101,115,99,104,101,101,100,47,110,10,98,101,115,99,104,114,105,102,116,47,115,10,66,101,115,105,116,116,101,114,47,83,10,66,101,115,108,97,103,10,66,101,115,108,195,164,195,164,103,10,98,101,115,108,195,188,110,105,103,47,115,10,66,101,115,195,182,195,182,107,47,110,10,66,101,115,115,101,110,10,66,101,115,115,101,110,115,10,66,101,115,115,101,110,98,105,110,110,101,114,47,83,10,66,101,115,115,101,110,107,97,109,101,114,47,110,10,66,101,115,115,101,110,107,114,117,117,116,10,66,101,115,115,101,110,115,99,104,97,112,112,10,66,101,115,115,101,110,115,99,104,195,164,112,112,10,66,101,115,115,101,110,115,116,101,101,108,47,110,10,98,101,115,116,47,101,110,10,98,101,115,116,195,164,110,110,105,103,47,101,110,10,66,101,115,116,101,108,108,47,110,10,98,101,115,116,101,108,108,101,110,10,98,101,115,116,101,108,108,47,115,10,97,102,98,101,115,116,101,108,108,47,115,10,97,102,116,111,98,101,115,116,101,108,108,101,110,10,98,101,115,116,105,109,109,47,115,10,66,101,115,116,115,101,108,108,101,114,47,83,10,98,101,115,195,188,110,110,101,114,47,101,110,10,98,101,115,195,188,110,110,101,114,115,10,98,101,115,119,105,101,109,101,108,116,47,101,110,10,98,101,116,10,98,101,116,97,104,108,101,110,10,98,101,116,97,104,108,47,115,10,97,102,98,101,116,97,104,108,47,115,10,97,110,98,101,116,97,104,108,47,115,10,105,110,98,101,116,97,104,108,47,115,10,110,97,98,101,116,97,104,108,47,115,10,116,111,98,101,116,97,104,108,47,115,10,117,116,98,101,116,97,104,108,47,115,10,118,195,182,114,98,101,116,97,104,108,47,115,10,97,102,116,111,98,101,116,97,104,108,101,110,10,97,110,116,111,98,101,116,97,104,108,101,110,10,105,110,116,111,98,101,116,97,104,108,101,110,10,110,97,116,111,98,101,116,97,104,108,101,110,10,116,111,116,111,98,101,116,97,104,108,101,110,10,117,116,116,111,98,101,116,97,104,108,101,110,10,118,195,182,114,116,111,98,101,116,97,104,108,101,110,10,98,101,116,100,97,116,10,98,101,116,101,107,101,110,47,115,10,66,101,116,101,107,101,114,47,83,10,98,101,116,101,110,10,98,101,116,101,114,47,101,110,10,98,101,116,101,114,110,47,73,68,87,77,79,80,85,86,10,98,101,116,101,114,110,47,112,117,10,98,101,116,104,101,114,10,98,101,116,104,101,114,116,111,10,66,101,116,111,103,10,66,101,116,195,182,195,182,103,10,66,101,116,111,110,10,66,101,116,111,110,103,10,66,101,116,111,110,98,111,100,100,101,110,47,83,10,98,101,116,114,111,99,107,101,110,10,66,101,116,116,47,110,10,66,101,116,116,100,101,101,107,47,110,10,66,101,116,116,100,111,111,107,10,66,101,116,116,100,195,182,107,101,114,10,98,101,116,116,101,110,47,73,68,87,77,79,74,80,195,156,10,98,101,116,116,101,110,47,106,112,195,188,10,66,101,116,116,116,105,101,116,10,66,101,116,116,116,105,101,100,101,110,10,66,101,116,116,116,195,188,195,188,103,10,98,101,118,101,114,47,115,10,66,101,118,101,114,47,115,10,98,101,119,101,101,103,47,115,67,89,90,84,71,70,75,88,10,98,101,119,101,103,101,110,47,99,121,122,116,103,102,107,120,10,98,101,119,101,101,103,108,105,99,104,47,101,110,10,98,101,119,101,101,114,116,47,115,10,66,101,119,101,101,114,116,101,110,10,98,101,119,101,114,107,47,115,10,66,101,119,101,114,107,101,114,47,83,10,66,101,119,105,101,115,47,110,10,66,101,119,105,101,115,108,97,115,116,47,110,10,66,101,119,105,101,115,115,116,195,188,99,107,47,110,10,98,101,119,111,104,114,47,115,10,66,101,122,105,114,107,47,110,10,98,105,10,98,105,39,110,10,98,105,39,116,10,66,105,98,101,108,10,66,105,98,101,108,110,10,98,105,98,108,105,111,103,114,97,97,102,115,99,104,47,101,110,10,66,105,98,108,105,111,116,104,101,101,107,47,110,10,66,105,99,107,98,101,101,114,110,109,111,111,115,10,66,105,100,114,97,103,10,66,105,100,114,195,164,195,164,103,10,98,105,100,114,101,103,101,110,10,98,105,100,114,101,101,103,47,87,10,98,105,100,114,105,103,103,115,116,10,98,105,100,114,105,103,103,116,10,98,105,100,114,111,111,103,47,68,10,98,105,100,114,111,103,101,110,10,98,105,100,114,97,103,101,110,10,66,105,100,114,101,103,101,114,47,83,10,66,105,101,108,47,110,10,98,105,101,110,97,110,110,101,114,10,98,105,102,195,182,103,47,115,10,98,105,106,101,107,116,105,118,47,101,110,10,66,105,108,97,97,103,47,110,10,66,105,108,100,10,66,105,108,108,101,114,10,66,105,108,100,100,97,116,101,105,47,110,10,66,105,108,100,100,97,116,101,110,10,66,105,108,100,102,111,114,109,97,116,47,110,10,66,105,108,100,103,114,195,182,116,116,10,98,105,108,100,104,97,102,116,105,103,47,101,110,10,66,105,108,100,104,97,117,101,114,47,83,10,66,105,108,100,107,105,101,107,101,114,47,83,10,66,105,108,100,107,111,109,112,111,110,101,110,116,47,110,10,66,105,108,100,111,112,108,195,182,115,101,110,10,66,105,108,100,112,117,110,107,116,10,66,105,108,100,112,195,188,110,107,116,10,66,105,108,100,115,99,104,101,114,109,47,83,10,66,105,108,100,116,121,112,47,110,10,98,105,108,101,103,103,101,110,47,73,68,87,77,79,10,98,105,108,101,101,100,47,68,10,98,105,108,101,100,101,110,10,98,105,108,108,101,110,47,73,68,81,74,72,85,195,156,10,98,105,108,100,116,47,81,74,72,85,195,156,10,98,105,108,108,101,110,47,113,106,104,117,195,188,10,98,105,108,108,105,103,47,101,110,10,98,105,108,195,188,116,116,101,110,115,10,98,105,109,109,101,108,47,115,10,98,105,109,115,101,110,47,73,68,87,77,79,10,98,105,110,97,104,10,98,105,110,195,164,114,47,101,110,10,66,105,110,195,164,114,100,97,116,101,105,47,110,10,66,105,110,195,164,114,100,97,116,101,110,10,66,105,110,100,102,97,100,101,110,47,83,10,66,105,110,100,119,97,114,107,10,98,105,110,110,101,110,47,73,68,65,81,74,84,86,88,10,98,105,110,100,116,47,65,81,74,84,86,88,10,98,117,110,110,101,110,47,73,68,65,81,74,84,86,88,10,98,105,110,110,101,110,47,97,113,106,116,118,120,10,66,105,110,110,101,110,97,102,119,101,104,114,101,114,47,83,10,66,105,110,110,101,110,97,102,119,101,104,114,101,114,115,99,104,101,47,110,10,66,105,110,110,101,110,97,116,109,111,115,112,104,195,164,195,164,114,10,66,105,110,110,101,110,98,111,111,114,100,10,66,105,110,110,101,110,104,117,117,115,10,66,105,110,110,101,110,104,195,188,195,188,115,10,66,105,110,110,101,110,107,97,114,110,10,98,105,110,110,101,110,108,97,110,110,115,99,104,47,101,110,10,66,105,110,110,101,110,109,97,110,116,101,108,47,83,10,66,105,110,110,101,110,109,105,110,105,115,116,101,114,47,83,10,98,105,110,110,101,110,115,105,101,116,115,10,66,105,110,110,101,110,115,116,97,100,116,10,66,105,110,110,101,110,115,116,195,164,100,101,114,10,98,105,110,110,101,110,119,101,110,110,105,103,47,101,110,10,66,105,111,100,105,101,115,101,108,10,66,105,111,103,97,115,10,66,105,111,108,111,103,105,101,10,98,105,111,108,111,111,103,115,99,104,47,101,110,10,66,105,111,110,105,107,10,66,105,111,195,182,107,111,108,111,103,105,101,10,66,105,111,115,112,104,195,164,195,164,114,47,110,10,66,105,111,116,111,112,47,101,110,10,66,105,111,116,117,110,110,10,66,105,111,116,195,188,110,110,10,98,105,114,115,101,110,47,73,68,87,77,79,10,66,105,115,99,104,111,112,10,66,105,115,99,104,195,182,112,10,66,105,115,99,104,111,112,112,101,110,10,98,105,115,99,104,117,114,101,110,10,98,105,115,99,104,117,114,101,110,115,10,66,105,115,100,111,109,10,66,105,115,101,116,116,101,114,98,114,101,116,116,10,66,105,115,101,116,116,101,114,98,114,101,101,100,10,66,105,115,101,116,116,101,114,98,114,101,100,101,114,10,66,105,115,108,97,97,112,10,66,105,115,112,101,101,108,47,110,10,66,105,115,112,101,101,108,119,111,111,114,116,10,66,105,115,112,101,101,108,119,195,182,195,182,114,10,66,105,115,116,97,110,100,10,66,105,115,116,195,164,110,110,10,98,105,115,116,97,110,100,115,99,104,47,101,110,10,98,105,115,116,195,188,101,114,110,47,73,68,87,77,79,70,10,118,111,114,98,105,116,111,115,116,195,188,101,114,110,10,66,105,116,47,83,10,98,105,116,111,10,98,105,116,111,100,114,101,103,101,110,10,66,105,116,114,97,116,101,47,110,10,98,105,116,116,47,90,84,81,88,122,116,113,120,10,98,105,116,116,115,116,47,90,84,81,88,122,116,113,120,10,98,101,101,116,47,90,84,81,88,122,116,113,120,10,98,101,101,116,115,116,47,90,84,81,88,122,116,113,120,10,98,101,116,101,110,47,90,84,81,88,122,116,113,120,10,98,105,116,116,101,10,98,105,116,116,101,114,47,101,110,10,98,105,116,119,105,101,115,47,101,110,10,98,108,97,97,103,47,101,110,10,66,108,97,97,103,47,110,10,66,108,97,97,115,47,110,10,98,108,97,97,115,47,115,10,98,108,97,110,103,10,98,108,97,110,103,101,110,10,98,108,97,110,103,101,110,97,110,10,98,108,97,110,103,101,110,97,110,110,101,114,10,98,108,97,110,103,101,110,98,105,10,66,108,97,110,103,101,110,98,114,101,116,116,10,66,108,97,110,103,101,110,98,114,101,101,100,10,66,108,97,110,103,101,110,98,114,101,100,101,114,10,98,108,97,110,107,47,101,110,10,98,108,97,114,114,47,115,10,66,108,97,116,116,10,66,108,195,164,195,164,100,10,66,108,195,164,100,101,114,10,98,108,97,117,47,101,110,10,66,108,101,101,10,98,108,101,101,107,47,101,110,10,66,108,101,101,115,116,105,99,107,101,110,47,83,10,98,108,101,107,101,110,47,65,82,72,85,70,10,98,108,101,107,101,110,47,97,114,104,117,102,10,98,108,101,101,107,47,68,87,77,79,65,82,72,85,86,70,10,98,108,101,110,110,47,115,10,98,108,101,110,110,101,110,47,68,65,81,74,80,85,70,10,98,108,101,110,110,101,110,47,100,97,113,106,112,117,102,10,98,108,101,110,110,47,65,81,74,80,85,70,10,98,108,101,110,100,116,47,65,81,74,80,85,70,10,98,108,101,110,110,10,105,110,98,108,101,110,110,47,115,10,66,108,101,115,115,47,110,10,66,108,105,99,107,47,110,10,66,108,105,99,107,102,97,116,116,10,66,108,105,99,107,102,97,116,101,110,10,66,108,105,99,107,115,109,105,116,116,10,66,108,105,101,10,98,108,105,101,118,101,110,47,73,87,65,81,72,80,84,85,86,88,10,98,108,105,101,118,101,110,47,97,113,104,112,116,117,120,10,98,108,105,102,102,115,116,47,65,81,72,80,84,85,86,88,10,98,108,105,102,102,116,47,65,81,72,80,84,85,86,88,10,98,108,101,101,118,47,68,87,65,81,72,80,84,85,86,88,10,98,108,101,118,101,110,47,65,81,72,80,84,85,86,88,10,98,108,105,110,100,10,98,108,105,110,110,101,10,98,108,105,110,110,101,110,10,66,108,105,110,100,107,111,112,105,101,47,110,10,98,108,105,110,107,47,65,84,80,115,10,98,108,105,110,107,101,110,47,97,116,112,10,98,108,105,110,107,47,115,65,10,98,108,105,110,107,101,110,47,97,10,66,108,105,110,107,101,114,47,83,10,66,108,105,116,122,10,98,108,105,116,122,98,108,97,110,107,47,101,110,10,66,108,105,116,122,115,116,101,101,110,47,83,10,66,108,105,120,47,110,10,66,108,111,99,107,10,66,108,195,182,99,107,10,98,108,111,99,107,101,101,114,47,115,10,66,108,111,103,47,83,10,66,108,111,103,103,101,114,47,83,10,98,108,195,182,104,47,115,85,80,86,10,98,108,195,182,104,101,110,47,117,112,10,66,108,111,109,101,110,115,97,97,116,10,98,108,111,110,100,47,101,110,10,98,108,195,182,195,182,100,47,101,110,10,98,108,195,182,195,182,100,47,115,85,86,10,98,108,195,182,100,101,110,47,117,10,66,108,195,182,195,182,100,115,105,110,110,10,66,108,111,111,109,10,66,108,111,109,101,110,10,66,108,195,182,195,182,109,10,66,108,195,182,195,182,115,10,66,108,195,182,115,101,110,10,66,108,111,111,116,10,98,108,111,111,116,47,101,110,10,98,108,111,116,115,10,98,108,117,98,98,101,114,110,47,73,68,87,77,79,10,98,108,117,99,107,101,110,47,73,68,87,77,79,80,10,66,108,117,101,115,10,66,111,98,105,111,108,111,103,105,101,10,66,111,10,66,111,116,101,110,10,66,111,10,65,97,102,116,98,111,10,66,111,99,107,10,66,195,182,99,107,10,66,111,100,100,101,110,10,66,111,100,100,101,110,108,97,115,116,47,110,10,98,111,101,110,47,74,65,90,85,195,156,80,72,66,70,75,81,73,68,87,101,106,97,122,117,195,188,112,104,102,107,113,10,98,195,182,103,101,108,110,47,80,73,68,87,112,10,98,195,182,103,101,110,47,81,82,89,67,74,72,80,90,75,71,84,86,70,88,195,156,10,98,195,182,103,101,110,47,113,114,121,99,106,104,112,122,107,103,116,118,102,120,195,188,10,98,195,182,195,182,103,47,68,87,77,79,81,82,89,67,74,72,80,90,75,71,84,86,70,88,195,156,10,98,111,111,103,47,68,81,82,89,67,74,72,80,90,75,71,84,86,70,88,195,156,10,98,111,103,101,110,47,81,82,89,67,74,72,80,90,75,71,84,86,70,88,195,156,10,98,97,103,101,110,47,81,82,89,67,74,72,80,90,75,71,84,86,70,88,195,156,10,66,111,104,110,47,110,10,98,111,104,114,101,110,47,73,68,87,77,79,10,66,111,104,114,109,97,115,99,104,105,101,110,47,110,10,98,195,182,107,101,110,10,98,195,182,108,107,101,110,47,73,68,87,77,79,10,66,195,182,108,107,104,111,111,115,116,101,110,10,66,111,109,98,47,110,10,66,111,109,98,101,114,47,83,10,66,111,110,116,106,101,47,83,10,66,111,111,103,10,66,111,103,101,110,10,66,195,182,195,182,107,47,110,10,66,111,111,107,10,66,195,182,107,101,114,10,87,195,182,195,182,114,98,111,111,107,10,87,195,182,195,182,114,98,195,182,107,101,114,10,66,111,111,107,109,97,107,101,114,47,83,10,66,111,111,107,115,116,97,97,118,47,110,10,98,111,111,108,115,99,104,47,101,110,10,66,111,111,109,97,110,115,105,99,104,116,47,110,10,66,111,111,109,10,66,195,182,195,182,109,10,66,111,111,109,115,97,97,103,47,110,10,66,111,111,109,115,116,97,109,109,10,66,111,111,109,115,116,195,164,109,109,10,66,111,111,114,47,110,10,66,111,111,114,100,10,66,195,182,195,182,114,10,66,111,111,114,100,119,97,110,100,10,66,111,111,114,100,119,195,164,110,110,10,66,111,111,114,116,10,66,111,111,114,116,101,110,10,98,195,182,195,182,115,47,101,110,10,98,195,182,195,182,116,47,115,74,65,82,66,10,98,195,182,116,101,110,47,106,97,114,10,66,111,111,116,10,66,195,182,195,182,100,10,98,195,182,114,101,110,47,89,65,90,84,71,80,86,75,88,73,68,87,79,77,121,97,122,116,103,112,107,120,10,66,111,114,103,47,110,10,66,195,182,114,103,101,114,47,83,10,66,195,182,114,103,101,114,105,110,105,116,115,99,104,97,116,105,118,101,110,10,66,195,182,114,103,101,114,107,114,105,101,103,47,110,10,66,195,182,114,103,101,114,109,101,101,115,116,101,114,47,83,10,66,195,182,114,103,101,114,115,99,104,111,112,10,66,195,182,114,103,101,114,115,99,104,111,112,112,101,110,10,66,111,114,110,47,83,10,66,111,114,110,100,97,116,101,105,47,110,10,66,111,114,110,107,111,100,101,10,66,111,114,110,116,101,120,116,47,110,10,66,111,114,110,116,121,112,47,110,10,98,195,182,115,116,47,115,89,90,82,85,71,80,81,10,98,195,182,115,116,101,110,47,121,122,114,117,103,112,113,10,66,111,115,116,10,66,195,182,115,116,10,66,111,115,116,115,119,195,182,109,109,101,110,10,66,111,116,116,101,114,10,66,111,116,116,101,114,98,114,111,111,116,10,66,111,116,116,101,114,98,114,195,182,195,182,100,10,66,111,116,116,101,114,102,97,116,116,10,66,111,116,116,101,114,102,97,116,101,110,10,66,111,116,116,101,114,107,195,164,195,164,115,10,66,111,116,116,101,114,107,111,107,101,110,10,66,111,116,116,101,114,118,97,103,101,108,47,83,10,66,111,195,188,110,110,101,114,110,101,104,109,101,110,47,83,10,98,195,182,118,101,114,47,101,110,10,98,195,182,118,101,114,115,116,47,101,110,10,66,195,182,118,101,114,103,114,101,110,122,47,110,10,66,195,182,118,101,114,107,97,110,116,47,110,10,66,195,182,118,101,114,107,111,112,112,101,108,47,83,10,66,195,182,118,101,114,108,97,97,103,47,110,10,66,195,182,118,101,114,111,114,110,101,114,47,115,10,66,195,182,118,101,114,115,105,101,116,10,66,195,182,118,101,114,115,105,101,100,101,110,10,98,111,120,47,115,10,66,111,120,101,110,10,66,111,120,101,114,47,83,10,66,111,120,101,114,115,99,104,101,47,110,10,98,114,97,97,100,47,115,65,82,81,10,98,114,97,100,101,110,47,97,114,113,10,66,114,97,110,100,119,105,101,110,10,66,114,97,115,115,10,98,114,101,100,101,110,47,85,86,10,98,114,101,101,100,47,68,87,77,79,85,86,10,66,114,101,101,10,66,114,101,101,100,10,66,114,101,101,102,10,66,114,101,118,101,110,10,78,101,116,116,98,114,101,101,102,10,78,101,116,98,114,101,118,101,110,10,66,114,101,101,102,107,97,115,116,101,110,10,66,114,101,101,102,109,97,114,107,47,110,10,98,114,101,101,116,10,98,114,101,100,101,47,110,10,98,114,101,100,101,114,47,101,110,10,98,114,101,101,100,115,116,47,101,110,10,66,114,101,103,101,110,47,83,10,98,114,101,107,101,110,47,65,81,80,84,86,195,156,10,98,114,101,107,101,110,47,97,113,112,116,118,195,188,10,98,114,101,101,107,47,87,65,81,80,84,86,195,156,10,98,114,105,99,107,115,116,47,65,81,80,84,86,195,156,10,98,114,105,99,107,116,47,65,81,80,84,86,195,156,10,98,114,195,182,195,182,107,47,68,65,81,80,84,86,195,156,10,98,114,195,182,107,101,110,47,65,81,80,84,86,195,156,10,98,114,105,99,107,10,98,114,97,107,101,110,47,65,81,80,84,86,195,156,10,98,114,101,107,101,110,10,97,102,98,114,101,107,101,110,10,98,114,101,107,101,110,10,105,107,10,98,114,101,101,107,10,100,117,10,98,114,105,99,107,115,116,10,104,101,10,98,114,105,99,107,116,10,119,105,10,98,114,101,101,107,116,10,105,107,10,98,114,111,111,107,10,100,117,10,98,114,111,111,107,115,116,10,104,101,10,98,114,111,111,107,10,119,105,10,98,114,111,107,101,110,10,98,114,105,99,107,10,98,114,105,99,107,116,10,98,114,97,107,101,110,10,98,114,101,107,101,110,10,116,119,101,105,98,114,101,107,101,110,10,66,114,101,107,101,114,47,83,10,66,114,101,109,115,47,110,10,98,114,101,109,115,101,110,47,73,68,87,77,79,81,74,80,85,10,98,114,101,109,115,101,110,47,113,106,112,117,10,98,114,101,110,110,98,111,114,47,101,110,10,98,114,101,110,110,101,110,47,73,68,87,77,79,65,81,74,85,86,10,66,114,101,110,110,101,114,47,83,10,66,114,101,110,110,112,117,110,107,116,10,66,114,101,110,110,112,195,188,110,107,116,10,66,114,101,110,110,119,101,101,114,116,47,101,110,10,66,114,101,116,116,10,66,114,101,101,100,10,66,114,101,100,101,114,10,66,114,101,116,116,115,112,105,108,108,47,83,10,111,100,101,114,10,66,114,101,116,116,115,112,101,101,108,47,110,10,66,114,105,101,115,10,66,114,105,108,108,47,110,10,66,114,105,108,108,101,110,103,108,97,115,10,66,114,105,108,108,101,110,103,108,195,182,195,182,115,10,98,114,105,110,103,101,110,47,73,68,87,65,81,82,74,80,89,67,85,86,70,88,10,98,114,105,110,103,101,110,47,97,113,114,106,112,121,99,117,102,120,10,98,114,111,99,104,101,110,47,73,68,87,77,79,65,81,82,74,80,89,67,85,86,70,88,10,98,114,105,110,103,101,110,10,98,114,195,182,99,104,116,10,98,114,105,110,103,101,110,10,109,105,116,98,114,105,110,103,101,110,47,73,68,87,10,66,114,111,100,101,114,10,66,114,195,182,100,101,114,10,66,114,111,111,107,10,66,114,195,182,195,182,107,10,66,114,111,111,116,10,66,114,111,111,116,115,99,104,97,112,112,10,66,114,111,111,116,115,99,104,195,164,112,112,10,66,114,195,188,99,104,47,110,10,98,114,117,107,101,110,47,80,86,10,98,114,117,107,101,110,47,112,10,98,114,117,117,107,47,68,87,77,79,80,86,10,66,114,117,107,101,114,47,83,10,66,114,117,107,101,114,107,111,110,116,111,47,83,10,66,114,117,107,101,114,110,97,97,109,47,83,10,98,114,117,109,109,47,115,65,90,84,10,98,114,117,109,109,101,110,47,97,122,116,10,98,114,117,109,109,101,108,110,47,73,68,87,77,79,10,98,114,117,117,107,98,111,114,47,101,110,10,66,114,117,117,107,98,111,114,107,101,105,116,10,66,114,117,117,107,112,108,97,97,110,47,83,10,98,114,117,117,110,47,101,110,10,66,114,117,117,115,10,66,114,117,115,101,110,10,66,83,69,10,66,117,99,104,116,47,110,10,66,117,99,107,10,66,195,188,99,107,10,66,117,100,100,101,108,47,83,10,98,117,100,100,101,108,110,47,73,68,87,77,79,81,82,74,90,71,84,85,86,195,156,10,98,117,100,100,101,108,110,47,113,114,106,122,103,116,117,195,188,10,98,117,101,110,47,77,79,65,81,66,74,80,84,67,85,86,70,10,98,117,101,110,47,109,111,97,113,98,106,112,116,99,117,102,10,98,117,117,47,68,87,65,81,66,74,80,84,67,85,86,70,10,66,117,101,114,10,66,117,101,114,110,10,66,117,101,114,101,101,10,66,117,101,114,110,104,111,102,102,10,66,117,101,114,110,104,195,182,195,182,118,10,66,117,103,47,83,10,66,195,188,108,103,47,110,10,66,195,188,108,103,101,110,108,195,164,110,103,100,101,47,110,10,66,195,188,108,103,101,110,119,101,100,100,101,114,115,116,97,110,100,10,66,195,188,108,103,101,110,119,101,100,100,101,114,115,116,195,164,110,110,10,66,117,108,108,47,110,10,66,117,108,108,111,111,103,10,66,117,108,108,111,103,101,110,10,66,195,188,108,116,47,110,10,66,117,110,100,10,66,117,110,100,115,103,101,115,101,116,116,47,110,10,66,117,110,100,115,108,97,110,100,10,66,117,110,100,115,108,195,164,110,110,101,114,10,66,117,110,100,115,108,105,103,97,10,66,117,110,100,115,108,105,103,101,110,10,66,117,110,100,115,112,114,195,164,115,105,100,101,110,116,47,110,10,66,117,110,100,115,114,101,112,117,98,108,105,107,47,110,10,66,117,110,100,115,115,97,109,116,10,66,117,110,100,101,115,195,164,109,116,101,114,10,66,117,110,100,115,115,109,105,110,105,115,116,101,114,47,83,10,66,117,110,100,115,115,109,105,110,105,115,116,101,114,105,117,109,10,66,117,110,100,101,115,109,105,110,105,115,116,101,114,105,101,110,10,66,117,110,100,115,115,116,97,97,116,10,66,117,110,100,115,115,116,97,116,101,110,10,66,117,110,100,115,115,116,105,102,116,101,110,10,66,117,110,100,115,115,116,114,97,97,116,10,66,117,110,100,115,115,116,114,97,116,101,110,10,66,117,110,100,115,118,101,114,98,97,110,100,10,66,117,110,100,101,115,118,101,114,98,195,164,110,110,10,98,117,110,116,47,101,110,10,66,195,188,114,111,47,83,10,66,117,114,115,47,110,10,66,117,115,10,66,117,115,115,101,110,10,66,117,115,99,104,10,66,195,188,115,99,104,10,66,195,188,115,99,104,101,114,10,66,195,188,115,115,47,110,10,98,117,116,101,110,10,66,117,116,101,110,97,102,119,101,104,114,101,114,47,83,10,66,117,116,101,110,97,102,119,101,104,114,101,114,115,99,104,101,47,110,10,66,117,116,101,110,97,110,103,114,105,101,112,101,114,47,83,10,66,117,116,101,110,97,110,103,114,105,101,112,101,114,115,99,104,101,47,110,10,98,117,116,101,110,100,101,109,10,98,117,116,101,110,108,195,164,110,110,115,99,104,47,101,110,10,66,117,116,101,110,109,97,110,116,101,108,47,83,10,66,117,116,101,110,114,105,99,104,116,101,114,47,83,10,66,117,116,101,110,114,105,99,104,116,101,114,115,99,104,101,47,110,10,66,117,116,101,110,115,105,101,116,10,66,117,116,101,110,115,105,101,100,101,110,10,98,117,116,101,110,119,97,114,116,115,10,98,117,116,116,106,101,114,110,47,73,68,87,10,66,117,117,107,10,66,195,188,195,188,107,10,66,117,117,107,112,105,101,110,10,66,117,117,107,115,116,114,101,109,101,108,10,66,117,117,108,47,110,10,66,195,188,120,47,110,10,66,195,188,120,101,110,98,101,101,110,10,66,195,188,120,101,110,98,101,110,101,110,10,66,121,116,101,47,83,10,98,121,122,97,110,116,105,101,110,115,99,104,47,101,110,10,99,97,10,67,97,115,115,105,111,112,101,105,97,10,67,68,45,66,114,101,110,110,101,114,10,67,68,10,67,68,115,10,67,101,108,115,105,117,115,10,67,101,110,116,47,83,10,99,104,101,101,109,115,99,104,47,101,110,10,99,104,101,101,109,115,99,104,47,101,110,10,67,104,101,109,105,101,10,67,104,101,109,105,101,112,111,108,105,116,105,107,10,67,104,101,109,105,107,101,114,47,83,10,67,104,105,97,115,109,117,115,10,67,104,111,114,10,67,104,114,105,115,116,47,110,10,67,104,114,105,115,116,100,101,109,111,107,114,97,116,47,110,10,67,104,114,105,115,116,101,110,100,111,109,10,99,104,114,105,115,116,108,105,99,104,47,101,110,10,67,104,114,111,109,111,115,112,104,195,164,195,164,114,10,67,108,105,101,110,116,47,83,10,67,108,105,101,110,116,112,114,111,103,114,97,109,109,47,110,10,67,108,111,119,110,47,83,10,99,109,10,67,111,99,107,112,105,116,47,83,10,67,111,100,101,47,83,10,99,111,100,101,101,114,47,115,10,67,111,109,105,99,47,83,10,67,111,110,116,97,105,110,101,114,98,114,195,188,99,104,47,110,10,67,111,110,116,97,105,110,101,114,104,97,118,101,110,47,83,10,67,111,110,116,97,105,110,101,114,115,99,104,105,112,112,10,67,111,110,116,97,105,110,101,114,115,99,104,101,101,112,10,67,111,110,116,97,105,110,101,114,195,188,109,115,108,97,103,10,67,111,112,121,114,105,103,104,116,10,67,80,85,10,100,97,10,100,195,164,10,68,97,97,103,98,108,97,116,116,10,68,97,97,103,98,108,195,164,100,101,114,10,68,97,97,103,98,111,111,107,10,68,97,97,103,98,195,182,107,101,114,10,100,97,97,103,108,105,99,104,47,101,110,10,100,97,97,103,115,10,68,97,97,107,10,68,97,97,108,47,110,10,100,97,97,108,119,97,114,116,115,10,68,97,97,109,10,68,97,109,101,110,10,100,195,164,195,164,109,108,105,99,104,10,68,97,97,116,47,110,10,100,97,97,118,47,115,10,68,97,99,107,47,110,10,68,195,164,99,107,101,114,10,100,97,99,107,101,108,47,115,10,68,97,99,107,102,101,110,115,116,101,114,47,110,10,100,97,100,100,101,108,100,117,10,68,97,103,97,110,102,97,110,103,10,68,97,103,97,110,115,105,99,104,116,47,110,10,68,97,103,10,68,97,97,103,10,68,97,103,104,195,188,114,101,114,47,83,10,68,97,103,108,195,164,110,103,100,101,47,110,10,68,97,103,108,111,104,110,10,68,97,103,108,195,182,104,110,101,114,47,83,10,68,97,103,115,116,105,101,116,10,68,97,103,115,116,105,101,100,101,110,10,100,97,108,10,68,97,108,98,101,110,10,68,97,108,101,114,47,83,10,68,97,108,102,10,68,97,108,118,101,110,10,100,97,108,108,105,10,100,97,108,108,111,104,114,105,103,47,101,110,10,100,97,108,118,101,114,110,47,73,68,87,77,79,10,68,97,109,109,10,68,195,164,109,109,10,100,97,109,109,101,108,47,115,10,68,97,109,109,101,108,101,101,10,68,97,109,109,101,108,101,101,110,10,100,97,109,109,101,108,105,103,47,101,110,10,68,97,109,109,105,110,111,99,104,109,97,97,108,116,111,10,68,195,164,109,111,111,110,47,110,10,68,195,164,109,111,111,110,10,68,195,164,109,111,110,101,110,10,100,97,109,112,47,115,10,68,97,109,112,10,68,195,164,109,112,10,68,97,109,112,101,114,47,83,10,68,195,164,109,112,101,114,47,83,10,100,97,109,112,105,103,47,101,110,10,100,195,164,109,112,115,116,105,103,47,101,110,10,68,97,109,112,119,117,108,107,47,110,10,68,97,110,107,10,100,97,110,107,98,111,114,47,101,110,10,68,97,110,107,98,111,114,107,101,105,116,10,100,97,110,107,101,10,100,97,110,107,47,115,10,100,97,110,107,101,110,115,119,101,101,114,116,47,101,110,10,68,97,110,110,47,110,10,68,97,110,110,101,110,97,112,112,101,108,10,68,97,110,110,101,110,97,112,112,101,108,110,10,68,97,110,110,101,110,98,111,111,109,10,68,97,110,110,101,110,98,195,182,195,182,109,10,68,97,110,110,101,110,110,97,100,101,108,10,68,97,110,110,101,110,110,97,100,101,108,110,10,100,97,110,110,105,103,47,101,110,10,100,97,110,110,105,103,101,114,47,101,110,10,100,97,110,110,105,103,115,116,47,101,110,10,100,97,110,122,47,115,10,68,97,110,122,98,101,101,110,10,68,97,110,122,10,68,195,164,110,122,10,100,97,110,122,101,110,47,73,68,87,77,79,81,89,67,72,90,75,71,70,88,195,156,10,100,97,110,122,101,110,47,113,121,99,104,122,107,103,102,120,195,188,10,68,195,164,110,122,101,114,47,83,10,68,97,110,122,102,101,115,116,47,110,10,68,97,110,122,115,97,97,108,47,83,110,10,68,97,110,122,115,99,104,111,111,108,10,68,97,110,122,115,99,104,111,108,101,110,10,68,97,110,122,115,116,117,110,110,10,68,97,110,122,115,116,195,188,110,110,10,68,97,115,115,101,108,47,83,10,100,97,116,10,100,97,116,39,110,10,68,97,116,101,105,47,110,10,68,97,116,101,105,102,105,108,116,101,114,47,83,10,68,97,116,101,105,102,111,114,109,97,116,47,110,10,68,97,116,101,105,102,114,101,101,103,97,97,118,47,110,10,68,97,116,101,105,103,114,195,182,116,116,10,68,97,116,101,105,110,97,97,109,47,83,10,68,97,116,101,105,112,97,100,100,47,110,10,68,97,116,101,105,115,121,115,116,101,101,109,47,110,10,68,97,116,101,105,116,111,103,114,105,101,112,47,110,10,68,97,116,101,105,116,121,112,47,110,10,68,97,116,101,105,118,195,182,114,108,97,97,103,47,110,10,68,97,116,101,110,10,68,97,116,101,110,98,97,110,107,47,110,10,68,97,116,101,110,98,111,114,110,47,83,10,68,97,116,101,110,100,97,116,101,105,47,110,10,68,97,116,101,110,102,101,108,100,10,68,97,116,101,110,102,101,108,108,101,114,10,68,97,116,101,110,102,111,114,109,97,116,47,110,10,68,97,116,101,110,109,111,100,101,108,108,47,110,10,68,97,116,101,110,115,101,116,116,47,110,10,68,97,116,101,110,115,116,114,111,111,109,10,68,97,116,101,110,115,116,114,195,182,195,182,109,10,68,97,116,101,110,116,121,112,47,110,10,68,97,116,101,110,118,101,114,108,117,115,116,10,100,97,116,101,114,101,110,47,80,70,10,100,97,116,101,114,101,110,47,112,102,10,100,97,116,101,101,114,47,68,87,77,79,80,70,10,68,97,116,105,118,10,100,97,116,115,195,188,108,118,105,103,47,101,110,10,68,97,116,117,109,10,68,97,116,117,109,115,102,111,114,109,97,116,47,110,10,68,97,116,117,109,115,114,101,98,101,101,116,10,68,97,116,117,109,115,114,101,98,101,100,101,110,10,68,97,116,117,109,115,115,116,101,109,112,101,108,47,83,10,68,97,117,10,68,97,117,100,114,195,188,112,112,101,110,47,83,10,68,97,117,112,117,110,107,116,10,68,97,117,112,195,188,110,107,116,10,100,101,97,107,116,105,118,101,101,114,47,115,10,100,101,98,117,103,103,101,110,47,73,68,87,77,79,10,68,101,98,117,103,103,101,114,10,68,101,99,107,101,108,47,83,10,100,101,10,100,97,116,10,100,101,110,10,68,101,101,102,10,68,101,101,118,10,68,101,118,101,110,10,68,101,101,103,10,100,101,101,103,116,47,101,110,10,100,101,101,103,116,101,114,47,101,110,10,100,101,101,103,115,116,47,101,110,10,68,101,101,107,47,110,10,68,101,101,108,47,110,10,100,101,101,108,47,74,82,84,85,80,86,81,115,10,100,101,108,101,110,47,74,82,84,85,80,86,81,106,114,116,117,112,113,10,68,101,101,108,98,105,108,100,10,68,101,101,108,98,105,108,108,101,114,10,68,101,101,108,107,111,112,112,101,108,47,83,10,68,101,101,108,110,101,104,109,101,114,47,83,10,68,101,101,108,111,112,103,97,97,118,47,110,10,68,101,101,108,116,106,101,47,83,10,100,101,101,108,119,105,101,115,47,101,110,10,68,101,101,110,115,116,47,110,10,68,101,101,110,115,116,100,101,101,114,110,47,83,10,100,101,101,110,115,116,108,105,99,104,47,101,110,10,100,101,101,112,47,101,110,10,100,101,112,101,114,47,101,110,10,100,101,101,112,115,116,47,101,110,10,68,101,101,112,100,101,10,68,101,101,112,100,101,110,10,100,101,101,112,100,101,110,107,101,114,110,10,100,101,101,112,100,101,110,107,101,114,115,99,104,47,101,110,10,68,101,101,112,10,68,101,112,101,110,10,68,101,101,112,115,10,68,101,101,112,100,47,101,110,10,68,101,101,112,100,114,117,99,107,114,101,98,101,101,116,10,68,101,101,112,100,114,117,99,107,114,101,98,101,100,101,110,10,68,101,101,112,115,101,101,10,68,101,101,114,110,47,83,10,68,101,101,114,116,47,110,10,68,101,101,114,116,101,110,107,114,105,110,107,47,110,10,68,101,101,114,116,101,110,115,99,104,117,117,108,10,68,101,101,114,116,101,110,118,101,114,115,195,182,195,182,107,10,68,101,101,114,116,101,110,118,101,114,115,195,182,107,101,110,10,100,101,102,102,101,110,100,101,101,114,47,115,86,10,100,101,102,105,110,101,101,114,47,115,70,10,68,101,102,105,110,105,116,115,99,104,111,111,110,47,110,10,100,101,102,116,105,103,47,101,110,10,68,101,103,101,110,47,83,10,100,101,103,101,114,10,100,101,103,101,114,110,10,100,101,104,110,101,110,47,73,68,87,77,79,85,10,100,101,104,110,101,110,47,117,10,100,101,105,110,115,116,97,108,108,101,101,114,47,115,10,68,101,107,108,97,114,97,116,115,99,104,111,111,110,47,110,10,100,101,107,108,97,114,101,101,114,47,115,10,68,101,107,108,105,110,97,116,115,99,104,111,111,110,47,110,10,68,101,107,108,105,110,97,116,115,99,104,111,111,110,47,83,10,100,101,107,108,105,110,101,101,114,47,115,10,100,101,107,111,100,101,101,114,47,115,10,68,101,107,111,114,97,116,115,99,104,111,111,110,47,110,10,100,101,108,101,110,47,81,82,74,80,84,85,86,10,100,101,108,101,110,47,113,114,106,112,116,117,10,100,101,101,108,47,68,87,77,79,81,82,74,80,84,85,86,10,68,101,108,102,105,110,10,68,101,108,102,105,110,101,110,10,100,101,108,103,101,110,47,73,68,87,77,79,85,86,10,100,101,108,103,101,110,47,111,117,10,68,101,108,108,47,110,10,68,101,109,111,47,83,10,100,101,109,195,182,100,105,103,47,101,110,10,68,101,109,111,103,114,97,102,105,101,10,100,101,109,111,107,114,97,97,116,115,99,104,47,101,110,10,68,101,109,111,107,114,97,116,105,101,10,100,101,110,101,110,47,65,66,86,97,10,100,101,101,110,47,65,66,86,10,100,101,101,110,115,116,47,65,66,86,10,100,101,101,110,116,47,65,66,86,10,68,101,110,101,114,47,83,10,100,101,110,103,101,108,110,47,73,68,87,77,79,10,100,101,110,107,101,110,47,73,68,87,66,82,85,86,70,88,195,156,72,10,100,101,110,107,101,110,47,98,114,117,118,102,120,195,188,104,10,100,97,99,104,116,101,110,47,73,68,77,79,66,82,85,86,70,88,195,156,72,10,100,101,110,110,10,100,101,110,110,105,103,10,68,101,112,111,110,105,101,10,68,101,114,101,103,117,108,101,114,101,110,47,83,10,68,101,115,101,108,47,115,10,68,101,115,115,101,108,47,83,10,68,101,115,116,105,108,108,97,116,115,99,104,111,111,110,47,110,10,100,101,115,116,105,108,108,101,101,114,47,115,10,100,101,115,195,188,108,118,105,103,101,47,110,10,68,101,116,97,105,108,47,83,10,100,101,116,97,105,108,108,101,101,114,116,47,101,110,10,68,101,116,101,107,116,105,118,47,110,10,100,101,122,105,109,97,97,108,47,101,110,10,68,101,122,105,109,97,97,108,101,101,110,104,101,105,116,47,110,10,68,101,122,105,109,97,97,108,116,97,108,108,47,110,10,68,101,122,105,109,97,97,108,116,101,107,101,110,47,83,10,100,101,122,105,109,97,108,47,101,110,10,68,105,97,47,83,10,68,105,97,103,110,111,111,115,47,110,10,68,105,97,103,114,97,109,109,47,110,10,68,105,97,103,114,97,109,109,116,121,112,47,110,10,100,105,97,107,114,105,116,115,99,104,47,101,110,10,68,105,97,108,101,107,116,47,110,10,68,105,97,108,111,103,47,110,10,68,105,97,109,97,110,116,47,110,10,100,105,97,109,97,110,116,101,110,10,100,105,98,98,101,114,110,47,73,68,87,77,79,10,100,105,99,104,116,47,101,110,10,100,105,99,104,116,101,114,47,101,110,10,100,105,99,104,116,115,116,47,101,110,10,100,105,99,104,116,98,105,10,68,105,99,104,116,101,10,68,105,99,104,116,107,117,110,115,116,10,100,105,99,107,47,101,110,10,100,105,99,107,101,114,47,101,110,10,100,105,99,107,115,116,47,101,110,10,68,105,99,107,47,110,10,68,105,99,107,100,47,101,110,10,100,105,99,107,98,114,97,109,115,105,103,47,101,110,10,68,105,99,107,98,117,117,107,115,97,118,101,110,100,10,100,105,99,107,100,114,101,101,118,115,99,104,47,101,110,10,100,105,99,107,109,117,117,108,115,99,104,47,101,110,10,100,105,99,107,110,195,164,115,105,103,47,101,110,10,100,105,99,107,112,97,110,115,105,103,47,101,110,10,100,105,99,107,115,110,117,116,105,103,47,101,110,10,68,105,101,107,47,110,10,100,105,101,107,101,110,47,73,68,87,77,79,10,100,105,101,109,101,110,47,73,68,87,77,79,10,100,105,101,115,105,103,47,101,110,10,68,105,101,115,107,111,112,112,10,68,105,101,115,107,195,182,112,112,10,68,105,102,102,101,114,101,110,122,47,110,10,100,105,102,102,101,114,101,110,122,101,101,114,47,115,10,68,105,102,102,117,115,99,104,111,111,110,10,100,105,103,105,116,97,108,47,101,110,10,68,105,109,101,110,115,99,104,111,111,110,47,110,10,68,105,110,103,10,68,105,110,103,101,114,10,68,105,110,103,101,110,10,100,105,110,103,101,108,47,115,10,68,105,110,103,115,10,68,105,110,103,115,98,117,109,115,10,68,105,110,103,115,100,97,103,10,100,105,110,103,115,100,97,103,115,10,68,105,110,116,47,110,10,68,105,110,116,101,110,102,97,116,116,10,68,105,110,116,101,110,102,105,115,99,104,10,68,105,110,116,101,110,112,108,97,99,107,47,101,110,10,100,105,114,101,107,116,47,101,110,10,100,105,114,101,107,116,101,109,97,110,103,10,68,105,114,101,107,116,101,114,47,83,10,68,105,114,101,107,116,102,108,111,111,103,10,68,105,114,101,107,116,102,108,195,182,195,182,103,10,100,105,114,105,103,101,101,114,47,115,10,68,105,115,99,104,47,110,10,66,195,182,107,101,114,100,105,115,99,104,47,110,10,68,105,115,99,104,101,114,47,83,10,100,105,115,99,104,101,114,110,47,73,68,87,77,79,10,68,105,115,99,104,107,97,110,116,47,110,10,68,105,115,99,104,112,108,97,97,116,47,110,10,68,105,115,107,101,116,116,47,110,10,68,105,115,107,101,116,116,47,110,10,68,105,115,107,101,116,116,101,110,108,111,111,112,119,97,114,107,47,110,10,68,105,115,107,117,115,97,110,108,97,97,103,10,68,105,115,107,117,115,97,110,108,97,103,101,110,10,68,105,115,107,117,115,99,104,111,111,110,47,110,10,68,105,115,107,117,115,114,105,110,103,47,110,10,68,105,115,107,117,115,115,109,105,101,116,101,110,10,68,105,115,107,117,115,119,111,114,112,10,68,105,115,107,117,115,119,195,182,114,112,10,100,105,115,107,117,116,101,101,114,47,115,10,68,105,115,116,101,108,10,68,105,115,116,101,108,110,10,68,105,115,116,114,105,98,117,116,115,99,104,111,111,110,47,110,10,68,105,115,116,114,105,107,116,47,110,10,100,105,116,10,100,105,115,115,101,10,100,105,115,115,101,110,10,100,195,188,116,10,100,195,188,115,115,101,10,100,195,188,115,115,101,110,10,100,105,116,109,97,97,108,10,100,105,116,109,97,108,10,100,105,116,115,99,104,47,115,10,68,105,116,116,106,101,110,10,68,105,118,101,114,115,105,102,105,107,97,116,115,99,104,111,111,110,47,110,10,68,105,118,105,115,99,104,111,111,110,47,110,10,100,111,99,104,10,68,111,99,104,116,101,114,10,68,195,182,99,104,116,101,114,10,68,111,99,104,116,101,114,109,97,110,110,10,68,111,99,107,47,83,10,100,111,99,107,101,110,47,73,68,87,77,79,65,81,10,100,111,99,107,101,110,47,111,97,113,10,68,111,100,101,47,110,10,68,111,100,101,110,97,99,107,101,114,47,83,10,100,111,100,101,110,115,116,105,108,108,47,101,110,10,68,111,100,101,110,118,97,103,101,108,47,83,10,68,111,100,101,115,100,97,103,10,68,111,100,101,115,100,97,97,103,10,100,195,182,103,101,110,10,105,107,10,100,195,182,195,182,103,10,100,117,10,100,195,182,99,104,115,116,10,104,101,10,100,195,182,99,104,116,10,119,105,10,100,195,182,195,182,103,116,10,105,107,10,100,195,182,99,104,10,100,117,10,100,195,182,99,104,115,116,10,104,101,10,100,195,182,99,104,10,119,105,10,100,195,182,99,104,101,110,10,68,111,107,109,101,110,116,47,110,10,68,111,107,109,101,110,116,97,116,115,99,104,111,111,110,47,110,10,100,111,107,109,101,110,116,101,101,114,47,115,10,68,111,107,109,101,110,116,116,121,112,47,110,10,68,111,107,116,101,114,47,83,10,100,111,107,116,101,114,110,47,73,68,87,77,79,10,100,111,108,108,47,101,110,10,68,111,108,108,97,114,47,83,10,68,111,109,195,164,195,164,110,47,110,10,68,111,109,195,164,195,164,110,110,97,97,109,47,83,10,68,195,182,110,116,106,101,47,83,10,68,111,111,100,10,68,111,111,100,115,97,110,103,115,116,10,68,111,111,100,115,108,97,103,10,100,111,111,102,47,101,110,10,68,111,111,107,10,68,195,182,107,101,114,10,68,111,111,109,10,68,111,109,101,110,10,100,111,111,110,47,65,80,84,86,88,10,100,111,111,110,47,97,112,116,118,120,10,100,111,47,65,80,84,86,88,10,100,101,105,115,116,47,65,80,84,86,88,10,100,101,105,116,47,65,80,84,86,88,10,100,111,111,116,47,65,80,84,86,88,10,100,101,101,47,65,80,84,86,88,10,100,101,101,115,116,47,65,80,84,86,88,10,100,101,101,110,47,65,80,84,86,88,10,100,97,97,110,47,65,80,84,86,88,10,68,195,182,195,182,110,116,106,101,47,83,10,68,195,182,195,182,112,47,110,10,68,195,182,195,182,112,110,97,97,109,47,83,10,68,111,111,112,112,10,68,111,100,101,110,107,195,182,112,112,10,68,111,111,114,47,110,10,68,195,182,195,182,114,47,110,10,68,111,111,114,97,102,119,101,104,114,101,114,47,83,10,68,111,111,114,97,102,119,101,104,114,101,114,115,99,104,101,47,110,10,68,111,111,114,98,97,103,101,110,47,83,10,68,111,111,114,102,114,111,10,68,111,111,114,102,114,111,111,110,115,10,68,111,111,114,102,114,117,10,68,111,111,114,102,114,117,117,110,115,10,68,111,111,114,104,195,182,100,101,114,47,83,10,68,111,111,114,104,195,182,100,101,114,98,195,188,120,47,110,10,68,111,111,114,104,195,182,100,101,114,104,101,108,109,47,110,10,68,111,111,114,104,195,182,100,101,114,104,101,109,100,10,68,111,111,114,104,195,182,100,101,114,104,101,109,109,101,110,10,68,111,111,114,104,195,182,100,101,114,108,105,101,110,47,110,10,68,111,111,114,104,195,182,100,101,114,115,99,104,101,47,110,10,68,111,111,114,104,195,182,100,101,114,115,99,104,105,101,110,47,110,10,68,111,111,114,104,195,182,100,101,114,115,108,195,164,103,101,114,47,83,10,68,195,182,195,182,114,107,108,105,110,107,47,110,10,68,195,182,195,182,114,107,108,111,112,112,101,114,47,83,10,68,195,182,195,182,114,107,110,111,111,112,10,68,195,182,195,182,114,107,110,195,182,195,182,112,10,68,111,111,114,107,114,105,110,107,47,110,10,68,111,111,114,108,105,101,110,47,110,10,68,195,182,195,182,114,108,111,99,107,10,68,195,182,195,182,114,108,195,182,99,107,101,114,10,68,111,111,114,110,10,68,195,182,195,182,114,110,10,68,111,111,114,110,101,116,116,47,110,10,68,195,182,195,182,114,110,107,108,111,99,107,47,110,10,68,111,111,114,112,111,115,116,101,110,47,83,10,68,111,111,114,114,105,99,104,116,101,114,47,83,10,68,111,111,114,114,105,99,104,116,101,114,115,99,104,101,47,110,10,68,111,111,114,114,117,117,109,10,68,111,111,114,114,195,188,195,188,109,10,68,111,111,114,115,99,104,101,101,100,115,114,105,99,104,116,101,114,47,83,10,68,111,111,114,115,99,104,101,101,100,115,114,105,99,104,116,101,114,115,99,104,101,47,110,10,68,111,111,115,47,110,10,100,195,182,195,182,115,47,115,10,68,195,182,195,182,115,98,97,116,116,101,108,47,83,10,68,195,182,195,182,115,98,97,100,100,101,108,47,83,10,68,195,182,195,182,115,98,97,114,116,101,108,47,83,10,100,195,182,195,182,115,98,97,116,116,101,108,105,103,47,101,110,10,68,195,182,195,182,115,107,111,112,112,10,68,195,182,195,182,115,107,195,182,112,112,10,100,111,111,116,10,100,111,100,101,10,100,111,100,101,110,10,68,195,182,195,182,116,115,10,68,195,182,112,101,108,47,83,10,100,195,182,112,101,108,105,103,47,101,110,10,100,195,182,112,101,110,10,100,195,182,195,182,112,10,100,195,182,102,102,115,116,10,100,195,182,102,102,116,10,100,195,182,195,182,112,116,10,100,195,182,102,102,10,100,195,182,102,102,115,116,10,100,195,182,102,102,10,100,195,182,102,102,101,110,10,100,195,182,102,102,116,47,101,110,10,100,111,114,10,100,195,182,114,39,110,10,100,195,182,114,39,116,10,100,111,114,97,110,10,100,111,114,98,105,10,100,111,114,100,195,182,114,10,100,195,182,114,10,100,195,182,114,99,104,10,100,111,114,102,195,182,114,10,68,195,182,114,103,97,110,103,10,68,195,182,114,103,195,164,110,103,10,100,111,114,103,101,103,101,110,10,100,111,114,104,101,110,10,100,111,114,104,105,110,10,100,111,114,105,110,10,68,195,182,114,108,111,111,112,10,68,195,182,114,108,195,182,195,182,112,10,68,195,182,114,109,101,116,101,114,47,83,10,100,111,114,109,105,116,10,100,111,114,110,97,10,100,111,114,111,112,10,100,111,114,195,182,118,101,114,10,68,195,182,114,112,10,68,195,182,114,112,101,114,10,68,195,182,114,115,97,116,122,10,68,195,182,114,115,195,164,116,122,10,100,195,182,114,115,105,99,104,116,105,103,47,101,110,10,68,195,182,114,115,105,99,104,116,105,103,107,101,105,116,47,110,10,68,195,182,114,115,110,105,116,116,10,68,195,182,114,115,110,101,101,100,10,100,195,182,114,115,110,105,116,116,108,105,99,104,47,101,110,10,68,111,114,115,116,101,108,108,101,110,116,121,112,47,110,10,68,111,114,115,116,101,108,108,101,114,47,83,10,100,195,182,114,115,116,105,103,47,101,110,10,100,111,114,116,111,10,100,111,114,195,188,109,10,100,111,114,117,116,10,100,111,114,195,188,110,110,101,114,10,100,195,182,114,118,101,110,10,100,195,182,114,118,10,100,195,182,114,118,115,116,10,100,195,182,114,118,10,100,195,182,114,118,116,10,100,111,114,118,10,100,111,114,118,115,116,10,100,111,114,118,10,100,111,114,118,101,110,10,100,195,182,114,118,102,10,100,111,114,118,195,182,114,10,100,111,114,118,117,110,10,68,195,182,115,99,104,10,100,195,182,115,99,104,47,115,10,100,195,182,115,105,103,47,101,110,10,68,195,182,115,105,103,107,101,105,116,47,110,10,68,195,182,115,116,10,100,195,182,115,116,105,103,47,101,110,10,68,80,73,10,100,112,105,10,68,114,10,100,114,97,97,103,98,111,114,47,101,110,10,68,114,97,97,103,107,105,115,116,47,110,10,100,114,97,97,107,115,105,103,47,101,110,10,100,114,97,98,98,101,108,47,115,10,68,114,97,99,104,109,101,47,110,10,68,114,97,99,104,116,47,110,10,100,114,97,99,104,116,105,103,47,101,110,10,68,114,97,102,102,10,68,114,97,102,102,114,101,110,110,101,110,47,83,10,68,114,97,103,103,101,110,10,68,114,97,104,116,10,68,114,195,182,104,100,10,68,114,97,104,116,103,97,100,100,101,114,47,83,10,100,114,97,104,116,108,111,111,115,47,101,110,10,68,114,97,107,101,110,47,83,10,100,114,97,108,108,47,101,110,10,100,114,97,109,97,97,116,115,99,104,47,101,110,10,100,114,97,109,109,101,110,47,73,68,87,77,79,10,68,114,97,110,103,10,100,114,97,110,103,47,101,110,10,100,114,195,164,110,103,101,108,110,47,73,68,87,77,79,10,100,114,195,164,110,103,101,110,47,73,68,87,77,79,10,100,114,97,110,103,118,117,108,108,47,101,110,10,68,114,97,110,107,10,100,114,97,112,101,110,47,65,66,74,84,10,100,114,97,97,112,47,87,65,66,74,84,10,100,114,195,182,112,112,115,116,47,65,66,74,84,10,100,114,195,182,112,112,116,47,65,66,74,84,10,100,114,111,111,112,47,68,65,66,74,84,10,100,114,111,112,101,110,47,65,66,74,84,10,100,114,97,117,104,101,110,47,73,68,87,77,79,65,66,10,100,114,97,117,104,101,110,47,97,10,100,114,97,118,101,110,10,100,114,97,97,118,47,68,87,77,79,10,68,114,97,118,101,114,112,101,101,114,100,10,68,114,97,118,101,114,112,101,101,114,10,68,114,101,39,101,99,107,47,110,10,68,114,101,101,99,107,47,110,10,68,114,101,39,101,99,107,47,83,10,100,114,101,39,101,99,107,105,103,47,101,110,10,100,114,101,101,101,99,107,105,103,47,101,110,10,68,114,101,99,107,10,68,114,101,101,97,110,103,101,108,47,83,10,100,114,101,101,98,97,115,116,105,103,47,101,110,10,100,114,101,101,100,117,98,98,101,108,116,47,101,110,10,68,114,101,101,101,99,107,47,110,10,68,114,101,101,102,111,111,116,10,68,114,101,101,102,195,182,195,182,116,10,100,114,101,101,103,98,111,114,47,101,110,10,100,114,101,101,103,108,105,99,104,47,101,110,10,100,114,101,101,107,97,110,116,105,103,47,101,110,10,100,114,101,101,109,97,108,10,68,114,101,101,109,97,115,116,101,114,47,83,10,68,114,101,101,114,97,100,10,68,114,101,101,114,195,182,195,182,100,10,68,114,101,101,115,112,114,117,110,103,98,97,108,107,101,110,47,83,10,68,114,101,101,115,112,114,117,110,103,10,68,114,101,101,115,112,114,195,188,110,103,10,100,114,101,101,116,105,109,112,105,103,47,101,110,10,100,114,101,101,116,111,108,108,105,103,47,101,110,10,100,114,101,103,101,110,47,67,85,86,65,81,66,74,80,84,89,70,88,10,100,114,101,103,101,110,47,99,117,97,113,98,106,112,116,121,102,120,10,100,114,101,101,103,47,87,65,81,66,74,80,84,89,67,85,86,70,88,10,100,114,105,103,103,115,116,47,65,81,66,74,80,84,89,67,85,86,70,88,10,100,114,105,103,103,116,47,65,81,66,74,80,84,89,67,85,86,70,88,10,100,114,111,111,103,47,68,65,81,66,74,80,84,89,67,85,86,70,88,10,100,114,111,103,101,110,47,65,81,66,74,80,84,89,67,85,86,70,88,10,100,114,97,103,101,110,47,65,81,66,74,80,84,89,67,85,86,70,88,10,68,114,101,103,101,114,47,83,10,68,114,101,103,101,114,115,10,100,114,101,105,104,47,115,10,68,114,101,105,104,98,97,115,115,10,68,114,101,105,104,98,111,111,107,10,68,114,101,105,98,195,182,107,101,114,10,100,114,101,105,104,101,110,47,73,68,87,77,79,65,81,82,80,84,89,67,86,88,195,156,10,100,114,101,105,104,101,110,47,97,113,114,112,116,121,99,120,195,188,10,68,114,101,105,104,101,114,47,83,10,68,114,101,105,104,102,101,108,100,10,68,114,101,105,104,102,101,108,108,101,114,10,68,114,101,105,104,107,114,195,188,195,188,122,47,110,10,68,114,101,105,104,109,111,109,97,110,103,10,100,114,101,105,104,10,114,195,188,109,100,114,101,105,104,47,115,10,114,195,188,109,116,111,100,114,101,105,104,101,110,10,100,114,101,108,108,101,110,47,73,68,87,77,79,10,100,114,101,109,109,101,108,110,47,73,68,87,77,79,10,68,114,101,109,112,101,108,47,83,10,100,114,101,112,101,110,47,74,65,106,97,10,68,114,101,112,101,114,47,83,10,100,114,101,119,101,108,105,103,47,101,110,10,68,114,105,98,98,101,108,10,100,114,105,98,98,101,108,110,47,73,68,87,79,77,10,100,114,105,101,115,116,47,101,110,10,100,114,105,101,118,101,110,47,73,87,81,65,66,82,89,67,80,90,75,71,84,85,86,88,195,156,10,100,114,105,101,118,101,110,47,113,97,114,121,99,112,122,107,103,116,117,120,195,188,10,100,114,105,102,102,115,116,47,81,65,66,82,89,67,80,90,75,71,84,85,86,88,195,156,10,100,114,105,102,102,116,47,81,65,66,82,89,67,80,90,75,71,84,85,86,88,195,156,10,100,114,101,101,118,47,68,81,65,66,82,89,67,80,90,75,71,84,85,86,88,195,156,10,100,114,101,118,101,110,47,81,65,66,82,89,67,80,90,75,71,84,85,86,88,195,156,10,100,114,105,101,118,101,110,115,10,68,114,105,101,118,101,114,47,83,10,68,114,105,101,118,104,117,117,115,10,68,114,105,101,118,104,195,188,195,188,115,10,68,114,105,101,118,104,117,117,115,101,102,102,101,107,116,47,101,110,10,68,114,105,101,118,104,117,117,115,103,97,115,47,101,110,10,68,114,105,102,116,10,68,114,105,102,116,101,110,10,100,114,105,110,107,101,110,47,73,68,87,65,66,84,85,70,88,10,100,114,105,110,107,101,110,47,97,116,117,102,120,10,100,114,117,110,107,101,110,47,73,68,65,66,84,85,70,88,10,68,114,105,110,107,119,97,116,101,114,10,68,114,195,182,104,110,10,68,114,195,182,104,110,98,195,188,100,101,108,47,83,10,100,114,195,182,104,110,101,110,47,73,68,87,77,79,10,100,114,195,182,104,110,105,103,47,101,110,10,100,114,195,182,109,101,110,47,72,90,85,86,10,100,114,195,182,109,101,110,47,104,122,117,10,100,114,195,182,195,182,109,47,68,87,77,79,72,90,85,86,10,100,114,195,182,195,182,103,47,101,110,10,100,114,195,182,103,101,114,47,101,110,10,100,114,195,182,195,182,103,115,116,47,101,110,10,100,114,195,182,195,182,103,47,115,74,65,82,85,80,81,10,100,114,195,182,103,101,110,47,106,97,114,117,112,113,10,68,114,195,182,195,182,103,100,101,10,68,114,111,111,109,10,68,114,195,182,195,182,109,10,68,114,111,111,109,115,99,104,105,112,112,10,68,114,111,111,109,115,99,104,101,101,112,10,100,114,111,112,112,101,110,47,73,68,87,77,79,81,82,90,71,88,10,100,114,111,112,112,101,110,47,113,114,122,103,120,10,100,114,195,182,118,101,110,10,100,114,195,182,102,102,10,100,114,195,182,102,102,115,116,10,100,114,195,182,102,102,10,100,114,195,182,102,102,116,10,100,114,195,182,102,102,10,100,114,195,182,102,102,115,116,10,100,114,195,182,102,102,10,100,114,195,182,102,102,101,110,10,100,114,195,182,102,102,116,10,100,114,117,99,107,47,115,10,100,114,117,99,107,98,111,114,47,101,110,10,68,114,117,99,107,10,68,114,195,188,99,107,10,100,114,117,99,107,101,110,47,73,68,87,77,79,81,66,74,80,85,10,100,114,117,99,107,101,110,47,113,106,112,117,10,100,114,195,188,99,107,101,110,47,81,66,82,74,80,84,89,67,85,86,88,115,10,100,114,195,188,99,107,101,110,47,113,114,106,112,116,121,99,117,120,10,68,114,117,99,107,101,114,47,83,10,68,114,117,99,107,101,114,100,114,105,101,118,101,114,47,83,10,68,114,117,99,107,118,195,182,114,97,110,115,105,99,104,116,47,110,10,100,114,195,188,112,112,101,108,110,47,73,68,87,77,79,81,66,82,67,80,90,75,71,84,85,86,88,10,100,114,195,188,112,112,101,108,110,47,113,98,114,99,112,122,107,103,116,117,120,10,68,114,195,188,112,112,101,110,47,83,10,100,114,195,188,116,116,10,100,114,195,188,100,100,101,10,100,114,195,188,100,100,101,110,10,68,114,117,117,115,10,68,115,99,104,117,110,103,101,108,47,83,10,100,117,98,98,101,108,10,68,117,98,98,101,108,47,83,10,68,117,98,98,101,108,107,108,105,99,107,47,110,10,100,117,98,98,101,108,107,108,105,99,107,101,110,47,73,68,87,77,79,10,68,117,98,98,101,108,112,97,100,100,101,108,47,83,10,68,117,98,98,101,108,112,117,110,107,116,10,68,117,98,98,101,108,112,195,188,110,107,116,10,68,117,98,98,101,108,115,116,101,101,114,110,47,83,10,100,117,98,98,101,108,116,47,101,110,10,68,117,98,98,101,108,116,119,101,101,114,47,83,10,100,195,188,99,104,116,10,100,195,188,99,104,116,105,103,47,101,110,10,68,117,100,101,108,100,111,112,112,10,68,117,100,101,108,107,97,115,116,101,110,47,83,10,68,117,100,101,108,109,117,115,105,107,10,100,117,100,101,108,110,47,73,68,87,77,79,10,100,195,188,100,101,110,47,65,66,67,85,10,100,195,188,100,101,110,47,97,99,117,10,100,195,188,195,188,100,47,68,87,77,79,65,66,67,85,10,100,117,10,100,105,10,100,105,101,110,10,100,105,101,110,101,10,100,117,101,108,108,101,101,114,47,115,10,68,117,101,114,10,100,117,101,114,47,115,10,68,117,101,114,10,68,195,188,101,114,10,85,116,100,117,101,114,10,100,195,188,101,114,10,100,195,188,114,101,10,100,195,188,114,101,110,10,100,117,101,114,104,97,102,116,105,103,47,101,110,10,100,117,101,114,110,47,73,68,87,77,79,10,100,117,101,114,115,97,109,47,101,110,10,68,117,101,116,116,47,110,10,100,117,102,102,47,101,110,10,68,195,188,102,102,101,114,47,83,10,68,117,107,97,116,101,110,115,99,104,105,101,116,101,114,47,83,10,100,117,107,101,108,110,47,73,68,87,77,79,10,100,117,107,101,110,47,73,68,87,77,79,81,82,67,74,80,88,10,100,117,107,101,110,47,113,114,99,106,112,120,10,68,195,188,107,101,114,47,83,10,100,195,188,107,101,114,110,47,73,68,87,77,79,10,68,117,108,100,10,100,195,188,108,100,101,110,47,73,68,87,77,79,10,100,117,108,108,47,101,110,10,68,117,108,108,98,111,111,109,10,68,117,108,108,98,195,182,195,182,109,10,68,117,108,108,98,114,101,103,101,110,10,100,117,108,108,101,114,47,101,110,10,68,117,108,108,101,114,116,10,68,111,108,108,101,114,116,10,68,117,108,108,104,117,117,115,10,68,117,108,108,104,195,188,195,188,115,10,68,117,108,108,107,114,117,117,116,10,68,117,108,108,115,195,188,195,188,107,10,68,117,108,116,47,110,10,68,117,109,101,110,47,83,10,68,117,117,109,47,83,10,100,117,109,109,47,101,110,10,68,117,109,109,98,195,188,100,101,108,10,100,117,109,109,101,114,104,97,102,116,105,103,47,101,110,10,68,117,109,109,116,195,188,195,188,99,104,10,68,117,109,109,116,195,188,195,188,103,10,100,117,109,112,47,73,68,87,77,79,10,100,195,188,109,112,101,108,110,47,73,68,87,77,79,10,68,117,110,97,115,10,100,117,110,101,110,47,73,68,87,77,79,10,100,195,188,110,101,110,47,73,68,87,77,79,10,68,195,188,110,103,101,114,10,68,195,188,110,103,101,114,103,101,115,101,116,116,10,100,195,188,110,110,47,101,110,10,100,117,110,110,10,68,117,110,110,101,114,47,83,10,100,117,110,110,101,114,110,47,73,68,87,77,79,10,68,117,110,110,101,114,115,100,97,103,10,100,117,112,108,101,120,10,68,195,188,115,101,110,102,108,101,103,101,114,47,83,10,100,117,115,115,101,108,105,103,47,101,110,10,68,117,115,116,10,68,117,115,116,101,114,107,97,109,101,114,10,68,117,116,116,10,68,195,188,116,116,10,100,195,188,116,116,101,114,105,103,47,101,110,10,100,117,116,116,105,103,47,101,110,10,68,117,116,122,10,68,117,117,109,107,114,97,102,116,10,68,117,117,110,47,110,10,68,195,188,195,188,110,47,110,10,68,195,188,195,188,115,47,101,110,10,100,195,188,195,188,115,116,101,114,47,101,110,10,100,195,188,195,188,115,116,101,114,101,114,47,101,110,10,100,195,188,195,188,115,116,101,114,115,116,47,101,110,10,100,195,188,195,188,115,116,101,114,98,108,97,117,47,101,110,10,100,195,188,195,188,115,116,101,114,98,114,117,117,110,47,101,110,10,68,195,188,195,188,115,116,101,114,110,105,115,10,68,195,188,195,188,115,116,101,114,110,105,115,115,101,110,10,100,195,188,195,188,116,108,105,99,104,47,101,110,10,68,117,117,118,10,68,117,118,101,110,10,68,195,188,118,101,108,47,83,10,68,195,188,118,101,108,107,117,109,109,114,117,117,116,10,68,195,188,118,101,108,115,98,114,97,100,101,110,10,68,86,68,47,83,10,68,119,97,97,114,115,115,116,114,101,101,107,47,110,10,100,119,97,108,108,101,110,47,73,68,87,77,79,10,100,119,97,108,108,101,114,105,103,47,101,110,10,100,119,97,108,108,101,114,110,47,73,68,87,77,79,10,68,119,97,110,103,10,68,119,195,164,110,103,10,68,119,97,114,103,47,110,10,68,119,97,114,103,112,108,97,110,101,116,47,110,10,100,119,97,114,115,10,68,119,97,114,115,98,101,116,111,103,10,68,119,97,114,115,98,101,116,195,182,195,182,103,10,68,119,97,114,115,100,114,105,101,118,101,114,47,83,10,68,119,97,114,115,102,111,114,109,97,116,47,110,10,68,119,97,114,115,108,195,182,112,101,114,47,83,10,68,119,97,114,115,115,116,114,101,101,107,47,110,10,100,119,97,116,115,99,104,47,101,110,10,68,119,101,101,108,10,100,119,101,101,114,10,100,119,105,110,103,101,110,47,73,68,87,77,79,66,80,86,10,100,119,105,110,103,101,110,47,112,10,100,119,117,110,103,101,110,47,73,68,66,80,86,10,100,121,110,97,97,109,115,99,104,47,101,110,10,100,121,110,97,97,109,115,99,104,47,101,110,10,69,98,98,47,110,10,69,99,104,111,47,83,10,101,99,104,116,47,101,110,10,69,99,104,116,104,101,105,116,10,69,99,104,116,116,105,101,116,10,69,99,107,47,110,10,69,99,107,101,110,116,97,108,108,47,110,10,69,99,107,101,114,47,83,10,69,99,107,102,97,104,110,47,110,10,101,99,107,105,103,47,101,110,10,69,99,107,112,97,104,108,10,69,99,107,112,195,182,104,108,10,101,100,100,101,108,47,101,110,10,69,100,100,101,108,103,97,115,47,110,10,69,100,100,101,108,109,97,110,110,10,69,100,100,101,108,102,114,117,10,69,100,100,101,108,108,195,188,195,188,100,10,69,100,100,101,108,115,116,101,101,110,47,110,10,69,100,105,116,111,114,47,110,10,69,101,100,10,69,100,101,110,10,69,101,103,110,101,114,47,83,10,69,101,107,97,112,112,101,108,10,69,101,107,98,111,111,109,10,69,101,107,98,195,182,195,182,109,10,69,101,107,10,69,107,101,110,10,69,101,108,116,10,69,101,109,107,10,101,101,110,10,101,101,110,10,101,101,110,10,97,99,104,116,105,103,10,101,101,110,117,110,116,97,99,104,116,105,103,10,116,119,101,101,117,110,116,97,99,104,116,105,103,10,100,114,101,101,117,110,116,97,99,104,116,105,103,10,118,101,101,114,117,110,116,97,99,104,116,105,103,10,102,105,101,102,117,110,116,97,99,104,116,105,103,10,115,195,182,115,115,117,110,116,97,99,104,116,105,103,10,115,195,182,118,101,110,117,110,116,97,99,104,116,105,103,10,97,99,104,116,117,110,116,97,99,104,116,105,103,10,110,101,103,101,110,117,110,116,97,99,104,116,105,103,10,101,101,110,97,110,110,101,114,10,101,101,110,100,111,111,110,116,10,101,101,110,10,100,195,182,114,116,105,103,10,101,101,110,117,110,100,195,182,114,116,105,103,10,116,119,101,101,117,110,100,195,182,114,116,105,103,10,100,114,101,101,117,110,100,195,182,114,116,105,103,10,118,101,101,114,117,110,100,195,182,114,116,105,103,10,102,105,101,102,117,110,100,195,182,114,116,105,103,10,115,195,182,115,115,117,110,100,195,182,114,116,105,103,10,115,195,182,118,101,110,117,110,100,195,182,114,116,105,103,10,97,99,104,116,117,110,100,195,182,114,116,105,103,10,110,101,103,101,110,117,110,100,195,182,114,116,105,103,10,101,101,110,102,97,99,104,47,101,110,10,101,101,110,102,97,99,104,101,114,47,101,110,10,101,101,110,102,97,99,104,115,116,47,101,110,10,101,101,110,103,97,97,108,10,101,101,110,10,102,195,182,102,102,116,105,103,10,101,101,110,117,110,102,195,182,102,102,116,105,103,10,117,110,102,195,182,102,102,116,105,103,116,119,101,101,10,100,114,101,101,117,110,102,195,182,102,102,116,105,103,10,118,101,101,114,117,110,102,195,182,102,102,116,105,103,10,102,105,101,102,117,110,102,195,182,102,102,116,105,103,10,115,195,182,115,115,117,110,102,195,182,102,102,116,105,103,10,115,195,182,118,101,110,117,110,102,195,182,102,102,116,105,103,10,97,99,104,116,117,110,102,195,182,102,102,116,105,103,10,110,101,103,101,110,117,110,102,195,182,102,102,116,105,103,10,69,101,110,104,101,105,116,47,110,10,69,101,110,104,111,111,114,110,47,83,10,101,101,110,10,104,117,110,110,101,114,116,10,101,101,110,104,117,110,110,101,114,116,10,116,119,101,101,104,117,110,110,101,114,116,10,100,114,101,101,104,117,110,110,101,114,116,10,118,101,101,114,104,117,110,110,101,114,116,10,102,105,101,102,104,117,110,110,101,114,116,10,115,195,182,115,115,104,117,110,110,101,114,116,10,115,195,182,118,101,110,104,117,110,110,101,114,116,10,97,99,104,116,104,117,110,110,101,114,116,10,110,101,103,101,110,104,117,110,110,101,114,116,10,100,117,115,101,110,100,10,101,101,110,109,97,108,10,101,101,110,10,110,101,103,101,110,116,105,103,10,101,101,110,117,110,110,101,103,101,110,116,105,103,10,116,119,101,101,117,110,110,101,103,101,110,116,105,103,10,100,114,101,101,117,110,110,101,103,101,110,116,105,103,10,118,101,101,114,117,110,110,101,103,101,110,116,105,103,10,102,105,101,102,117,110,110,101,103,101,110,116,105,103,10,115,195,182,115,115,117,110,110,101,103,101,110,116,105,103,10,115,195,182,118,101,110,117,110,110,101,103,101,110,116,105,103,10,97,99,104,116,117,110,110,101,103,101,110,116,105,103,10,110,101,103,101,110,117,110,110,101,103,101,110,116,105,103,10,101,101,110,115,97,109,47,101,110,10,101,101,110,115,100,97,97,103,115,10,101,101,110,115,116,105,109,109,105,103,47,101,110,10,101,101,110,115,111,111,114,116,101,116,47,101,110,10,101,101,110,10,115,195,182,115,115,116,105,103,10,101,101,110,117,110,115,195,182,115,115,116,105,103,10,116,119,101,101,117,110,115,195,182,115,115,116,105,103,10,100,114,101,101,117,110,115,195,182,115,115,116,105,103,10,118,101,101,114,117,110,115,195,182,115,115,116,105,103,10,102,105,101,102,117,110,115,195,182,115,115,116,105,103,10,115,195,182,115,115,117,110,115,195,182,115,115,116,105,103,10,115,195,182,118,101,110,117,110,115,195,182,115,115,116,105,103,10,97,99,104,116,117,110,115,195,182,115,115,116,105,103,10,110,101,103,101,110,117,110,115,195,182,115,115,116,105,103,10,101,101,110,10,115,195,182,118,101,110,116,105,103,10,101,101,110,117,110,115,195,182,118,101,110,116,105,103,10,116,119,101,101,117,110,115,195,182,118,101,110,116,105,103,10,100,114,101,101,117,110,115,195,182,118,101,110,116,105,103,10,118,101,101,114,117,110,115,195,182,118,101,110,116,105,103,10,102,105,101,102,117,110,115,195,182,118,101,110,116,105,103,10,115,195,182,115,115,117,110,115,195,182,118,101,110,116,105,103,10,115,195,182,118,101,110,117,110,115,195,182,118,101,110,116,105,103,10,97,99,104,116,117,110,115,195,182,118,101,110,116,105,103,10,110,101,103,101,110,117,110,115,195,182,118,101,110,116,105,103,10,101,101,110,10,116,97,99,104,101,110,116,105,103,10,101,101,110,117,110,116,97,99,104,101,110,116,105,103,10,116,119,101,101,117,110,116,97,99,104,101,110,116,105,103,10,100,114,101,101,117,110,116,97,99,104,101,110,116,105,103,10,118,101,101,114,117,110,116,97,99,104,101,110,116,105,103,10,102,105,101,102,117,110,116,97,99,104,101,110,116,105,103,10,115,195,182,115,115,117,110,116,97,99,104,101,110,116,105,103,10,115,195,182,118,101,110,117,110,116,97,99,104,101,110,116,105,103,10,97,99,104,116,117,110,116,97,99,104,101,110,116,105,103,10,110,101,103,101,110,117,110,116,97,99,104,101,110,116,105,103,10,69,101,110,116,97,108,108,10,101,101,110,10,116,119,101,101,10,100,114,101,101,10,118,101,101,114,10,102,105,101,102,10,115,195,182,115,115,10,115,195,182,118,101,110,10,97,99,104,116,10,110,101,103,101,110,10,116,101,105,104,110,10,195,182,108,98,101,110,10,195,182,108,118,101,110,10,116,119,195,182,108,102,10,100,195,182,114,116,101,105,104,110,10,118,101,101,114,116,101,105,104,110,10,102,111,102,102,116,101,105,104,110,10,115,195,182,115,115,116,101,105,104,110,10,115,195,182,118,101,110,116,101,105,104,110,10,97,99,104,116,101,105,104,110,10,110,101,103,101,110,116,101,105,104,110,10,101,101,110,10,116,119,105,110,116,105,103,10,101,101,110,117,110,116,119,105,110,116,105,103,10,116,119,101,101,117,110,116,119,105,110,116,105,103,10,100,114,101,101,117,110,116,119,105,110,116,105,103,10,118,101,101,114,117,110,116,119,105,110,116,105,103,10,102,105,101,102,117,110,116,119,105,110,116,105,103,10,115,195,182,115,115,117,110,116,119,105,110,116,105,103,10,115,195,182,118,101,110,117,110,116,119,105,110,116,105,103,10,115,195,182,118,101,110,117,110,116,119,105,110,116,105,103,10,97,99,104,116,117,110,116,119,105,110,116,105,103,10,110,101,103,101,110,117,110,116,119,105,110,116,105,103,10,101,101,110,10,118,101,101,114,116,105,103,10,101,101,110,117,110,118,101,101,114,116,105,103,10,116,119,101,101,117,110,118,101,101,114,116,105,103,10,100,114,101,101,117,110,118,101,101,114,116,105,103,10,118,101,101,114,117,110,118,101,101,114,116,105,103,10,102,105,101,102,117,110,118,101,101,114,116,105,103,10,115,195,182,115,115,117,110,118,101,101,114,116,105,103,10,115,195,182,118,101,110,117,110,118,101,101,114,116,105,103,10,97,99,104,116,117,110,118,101,101,114,116,105,103,10,110,101,103,101,110,117,110,118,101,101,114,116,105,103,10,69,101,110,119,101,103,119,111,111,114,47,110,10,101,101,110,122,105,103,47,101,110,10,69,101,114,100,97,108,107,97,108,105,109,101,116,97,108,108,47,110,10,69,101,114,100,97,112,112,101,108,10,69,101,114,100,97,112,112,101,108,110,10,69,101,114,100,98,97,104,110,10,69,101,114,100,98,101,101,114,47,110,10,69,101,114,100,98,101,118,101,110,47,83,10,69,101,114,100,100,101,101,108,47,110,10,69,101,114,100,107,114,195,188,112,101,114,47,83,10,69,101,114,100,107,117,110,110,10,69,101,114,100,110,195,182,195,182,116,98,111,116,116,101,114,10,69,101,114,100,110,117,116,116,10,69,101,114,100,110,195,182,195,182,116,10,69,101,114,100,119,97,114,109,115,10,69,101,114,100,119,101,116,101,110,115,99,104,111,112,10,69,101,114,10,69,101,114,100,10,101,101,114,110,115,116,47,101,110,10,101,101,114,110,115,116,101,114,47,101,110,10,101,101,114,110,115,116,104,97,102,116,105,103,47,101,110,10,101,101,114,115,116,47,101,110,10,101,101,114,115,116,101,114,10,101,101,114,115,116,109,97,108,10,69,102,102,101,107,116,47,110,10,101,102,102,101,107,116,105,118,47,101,110,10,101,102,102,101,107,116,105,118,101,114,47,101,110,10,101,102,102,101,107,116,105,118,115,116,47,101,110,10,69,102,102,101,107,116,107,108,195,182,195,182,114,47,110,10,101,103,97,108,10,101,103,97,108,119,101,103,10,101,103,101,110,47,101,110,10,69,103,101,110,98,114,117,117,107,10,69,103,101,110,100,111,109,10,69,103,101,110,110,97,97,109,47,83,10,69,103,101,110,115,99,104,111,112,10,69,103,101,110,115,99,104,111,112,112,101,110,10,101,103,101,110,115,116,195,164,110,110,105,103,47,101,110,10,101,103,101,110,116,108,105,99,104,47,101,110,10,69,104,47,110,10,69,104,112,111,111,114,47,110,10,101,104,114,39,116,10,101,104,114,100,97,116,10,101,104,114,100,101,109,10,101,104,114,101,104,114,103,195,188,115,116,101,114,110,10,101,104,114,10,101,104,114,110,10,101,104,114,101,10,101,104,114,101,110,10,69,104,114,101,110,100,97,103,10,69,104,114,101,110,100,97,97,103,10,101,104,114,101,110,104,97,102,116,10,69,104,114,103,105,101,122,10,101,104,114,103,105,101,122,105,103,47,101,110,10,101,104,114,103,195,188,115,116,101,114,110,10,101,104,114,108,105,99,104,47,101,110,10,101,104,114,109,97,97,108,115,10,69,105,10,69,105,101,114,10,69,105,101,114,100,111,112,112,10,69,105,101,114,103,114,111,103,10,69,105,101,114,112,97,110,110,107,111,107,101,110,10,69,105,108,97,110,100,10,69,105,108,97,110,110,101,110,10,101,105,115,99,104,47,101,110,10,101,107,101,108,104,97,102,116,105,103,47,101,110,10,69,107,101,110,98,111,111,109,10,69,107,101,110,98,195,182,195,182,109,10,69,107,101,110,104,111,108,116,10,69,107,101,110,115,116,97,109,109,10,69,107,101,110,115,116,195,164,109,109,10,69,108,97,115,116,105,122,105,116,195,164,116,47,110,10,69,108,101,102,97,110,116,47,110,10,101,108,101,103,97,110,116,47,101,110,10,101,108,101,103,97,110,116,101,114,47,101,110,10,101,108,101,103,97,110,116,101,115,116,47,101,110,10,101,108,101,107,116,114,105,115,99,104,47,101,110,10,101,108,101,107,116,114,111,109,97,103,110,101,101,116,115,99,104,47,101,110,10,69,108,101,107,116,114,111,109,97,103,110,101,116,105,115,109,117,115,10,69,108,101,107,116,114,111,110,47,110,10,69,108,101,107,116,114,111,110,101,103,97,116,105,118,105,116,195,164,116,47,110,10,69,108,101,107,116,114,111,110,101,110,118,111,108,116,47,83,10,101,108,101,107,116,114,111,111,110,115,99,104,47,101,110,10,101,108,101,107,116,114,111,115,116,97,97,116,115,99,104,47,101,110,10,69,108,101,109,101,110,116,47,110,10,69,108,101,110,100,10,101,108,101,110,110,105,103,47,101,110,10,101,108,101,110,110,105,103,115,116,47,101,110,10,69,108,102,101,110,98,101,101,110,10,69,108,105,120,105,101,114,47,110,10,101,108,107,10,101,108,107,101,101,110,10,69,108,108,98,97,103,101,110,47,83,10,69,108,108,98,97,103,101,110,112,108,97,116,116,47,110,10,69,108,108,98,97,103,101,110,112,111,108,115,116,101,114,47,83,10,69,108,108,105,112,115,47,110,10,69,108,108,105,112,115,111,105,100,10,101,108,108,105,112,116,115,99,104,47,101,110,10,69,108,118,10,101,109,10,69,109,105,114,97,97,116,47,110,10,69,109,105,115,99,104,111,111,110,47,110,10,101,109,115,105,103,47,101,110,10,69,109,117,108,97,116,111,114,47,110,10,69,109,117,108,97,116,115,99,104,111,111,110,47,110,10,101,109,117,108,101,101,114,47,115,10,101,110,97,110,110,101,114,47,65,82,74,72,80,84,85,70,195,156,10,69,110,100,108,97,103,101,114,110,10,101,110,100,108,105,99,104,10,101,110,100,108,111,115,47,101,110,10,69,110,101,103,105,101,119,101,110,110,10,101,110,101,110,47,86,10,101,101,110,47,68,87,77,79,86,10,101,110,10,101,110,101,10,101,110,101,110,10,69,110,101,114,10,69,110,101,114,103,105,101,47,110,10,69,110,101,114,103,105,101,98,114,117,117,107,10,69,110,101,114,103,105,101,100,114,101,103,101,114,47,83,10,69,110,101,114,103,105,101,10,69,110,101,114,103,105,101,110,10,69,110,101,114,103,105,101,115,112,111,111,114,108,97,109,112,47,110,10,69,110,101,114,103,105,101,119,101,101,114,116,115,99,104,111,112,10,69,110,101,114,107,97,106,97,107,47,83,10,69,110,101,114,114,195,182,110,110,98,111,111,116,10,69,110,101,114,114,195,182,110,110,98,195,182,195,182,100,10,101,110,101,114,119,101,103,101,110,115,10,69,110,103,101,108,10,101,110,105,103,47,101,110,10,101,110,105,103,101,114,109,97,116,101,110,10,69,110,107,101,108,47,83,10,69,110,107,101,108,100,111,99,104,116,101,114,10,69,110,107,101,108,100,195,182,99,104,116,101,114,10,101,110,107,101,108,10,101,110,107,101,108,116,101,10,101,110,107,101,108,116,101,110,10,69,110,107,101,108,104,101,105,116,47,110,10,101,110,107,101,108,116,47,101,110,10,101,110,107,101,108,116,119,105,101,115,10,69,110,110,47,110,10,69,110,110,98,114,117,107,101,114,47,83,10,101,110,110,101,110,47,73,68,66,86,10,101,110,100,116,47,66,86,10,101,110,100,116,101,47,66,86,10,101,110,100,116,101,110,47,66,86,10,69,110,110,112,117,110,107,116,10,69,110,110,112,195,188,110,107,116,10,69,110,110,115,112,105,108,108,47,83,10,111,100,101,114,10,69,110,110,115,112,101,101,108,47,110,10,69,110,110,119,101,101,114,116,47,110,10,69,110,116,101,114,10,69,110,116,105,116,195,164,116,47,110,10,69,110,116,114,111,112,105,101,10,69,110,116,114,111,112,105,101,110,10,69,114,111,115,99,104,111,111,110,47,83,10,69,114,117,112,116,115,99,104,111,111,110,47,110,10,69,115,101,108,47,83,10,101,115,116,101,109,101,114,101,110,10,101,115,116,101,109,101,101,114,47,68,87,77,79,10,69,116,97,97,115,99,104,47,110,10,101,116,101,110,47,65,80,84,85,70,88,10,101,116,101,110,47,97,112,116,117,102,120,10,105,116,116,47,68,65,80,84,85,70,88,10,101,101,116,47,68,65,80,84,85,70,88,10,101,117,107,108,105,100,115,99,104,47,101,110,10,69,117,108,101,114,116,97,108,108,47,110,10,69,85,82,10,69,117,114,111,47,83,10,101,118,97,108,117,101,114,101,110,10,101,118,97,108,117,101,101,114,47,68,87,77,79,10,101,118,101,110,47,101,110,10,69,118,101,110,101,10,69,118,101,110,101,110,10,69,118,101,110,116,195,188,195,188,114,10,69,118,101,110,116,195,188,114,101,110,10,69,118,111,108,117,116,115,99,104,111,111,110,47,110,10,101,119,105,103,47,101,110,10,69,119,105,103,107,101,105,116,47,110,10,69,120,97,109,101,110,47,83,10,101,120,97,109,105,110,101,101,114,47,115,10,69,120,101,109,112,101,108,10,69,120,101,109,112,108,111,114,47,110,10,69,120,111,116,105,115,99,104,101,110,47,101,110,10,101,120,112,97,110,100,101,101,114,47,115,10,69,120,112,101,114,105,109,101,110,116,47,110,10,69,120,112,101,114,116,47,110,10,101,120,112,108,111,100,101,101,114,47,115,10,69,120,112,108,111,115,99,104,111,111,110,47,110,10,101,120,112,108,111,115,105,118,47,101,110,10,69,120,112,111,110,101,110,116,47,110,10,69,120,112,111,114,116,47,110,10,69,120,112,111,114,116,100,97,116,101,105,47,110,10,101,120,112,111,114,116,101,101,114,47,115,10,69,120,112,111,114,116,102,111,114,109,97,116,47,110,10,69,120,112,111,114,116,108,105,115,116,47,110,10,69,120,112,114,101,115,115,10,101,120,116,101,114,110,47,101,110,10,101,120,116,114,97,10,69,120,116,114,97,47,83,10,101,120,116,114,97,103,114,111,111,116,47,101,110,10,69,120,122,101,110,116,114,105,122,105,116,195,164,116,10,102,97,97,107,10,102,97,97,107,101,114,10,102,97,97,107,115,116,10,102,97,107,101,110,10,102,97,107,101,110,101,114,10,102,97,107,101,110,115,116,10,102,97,97,116,47,115,10,70,97,98,114,105,107,47,110,10,70,97,98,114,105,107,115,99,104,105,112,112,10,70,97,98,114,105,107,115,99,104,101,101,112,10,70,97,99,104,47,110,10,70,97,99,104,102,114,117,10,70,97,99,104,109,97,110,110,10,70,97,99,104,108,195,188,195,188,100,10,70,97,99,107,101,108,10,70,97,99,107,101,108,110,10,102,97,99,107,101,108,47,115,10,70,97,100,101,110,47,83,10,70,195,164,104,114,47,110,10,70,97,104,114,101,110,104,101,105,116,10,70,195,164,104,114,115,99,104,105,112,112,10,70,195,164,104,114,115,99,104,101,101,112,10,102,97,107,101,110,10,70,97,107,116,101,114,47,83,10,102,97,107,116,101,114,105,115,101,101,114,47,115,10,70,97,107,116,111,114,47,110,10,70,97,107,117,108,116,195,164,116,47,110,10,102,97,108,108,101,110,47,73,68,87,65,81,66,82,74,80,90,71,84,67,85,86,88,76,10,102,97,108,108,101,110,47,97,113,114,106,112,122,103,116,99,117,118,120,108,10,102,117,108,108,101,110,47,73,68,65,81,66,82,74,80,90,71,84,67,85,86,88,76,10,102,97,108,108,101,110,10,97,102,102,97,108,108,101,110,10,102,97,108,108,101,110,10,103,101,102,97,108,108,101,110,47,67,90,82,84,85,195,156,80,81,88,99,122,114,116,117,195,188,112,113,120,10,70,97,108,108,10,70,195,164,108,108,10,70,97,108,108,114,101,101,112,10,70,97,108,108,114,101,112,101,110,10,102,97,108,115,99,104,47,101,110,10,70,97,109,105,108,105,101,47,110,10,70,97,109,105,108,105,101,110,110,97,97,109,10,70,97,109,105,108,105,101,110,115,116,97,110,100,10,70,97,109,105,108,105,101,110,115,116,195,164,110,110,10,102,97,109,111,115,47,101,110,10,70,97,110,103,10,70,195,164,110,103,10,70,97,110,103,97,114,109,47,83,10,102,97,110,103,101,110,47,73,68,87,65,81,74,80,86,10,102,97,110,103,101,110,47,97,113,106,112,10,102,117,110,103,101,110,47,73,68,65,81,74,80,86,10,70,97,110,103,104,97,110,100,10,70,97,110,103,104,97,110,110,101,110,10,70,65,81,10,102,97,114,100,105,103,47,101,110,10,70,97,114,118,47,110,10,102,97,114,118,101,110,47,73,68,87,77,79,81,82,74,85,86,195,156,10,102,97,114,118,101,110,47,113,114,106,117,195,188,10,70,97,115,101,114,47,110,10,102,97,115,116,47,101,110,10,70,97,115,116,112,108,97,97,116,47,110,10,70,97,115,116,112,117,110,107,116,10,70,97,115,116,112,195,188,110,107,116,47,110,10,70,97,115,116,115,116,101,108,108,116,97,115,116,47,110,10,70,97,115,116,115,116,111,102,102,47,110,10,102,97,116,101,110,47,65,66,82,74,80,90,84,86,195,156,10,102,97,116,101,110,47,97,114,106,112,122,116,195,188,10,102,97,97,116,47,68,65,66,82,74,80,90,84,86,195,156,10,70,97,116,116,10,70,195,164,195,164,116,10,70,97,120,47,110,10,102,97,120,47,115,10,70,97,120,100,111,107,109,101,110,116,47,110,10,70,97,120,110,117,109,109,101,114,47,110,10,70,97,120,115,121,115,116,101,109,47,110,10,70,97,120,119,97,114,107,116,195,188,195,188,99,104,10,70,101,98,114,117,111,114,10,70,101,99,104,116,101,110,10,70,101,99,104,116,104,97,110,100,115,99,104,111,104,10,70,101,99,104,116,104,97,110,100,115,99,104,195,182,104,10,70,101,99,104,116,115,99,104,111,104,10,70,101,99,104,116,115,99,104,195,182,104,10,70,101,100,100,101,114,47,110,10,70,101,100,100,101,114,98,97,108,108,10,70,101,100,100,101,114,98,195,164,108,108,10,70,101,100,100,101,114,107,114,97,102,116,10,102,101,101,103,47,67,89,90,82,85,71,81,88,115,10,102,101,103,101,110,47,99,121,122,114,117,103,113,120,10,70,101,101,110,100,47,110,10,102,101,101,114,110,47,101,110,10,70,101,101,114,110,98,101,100,101,110,101,110,10,70,101,101,114,110,103,108,97,115,10,70,101,101,114,110,103,108,195,182,195,182,115,10,70,101,101,114,110,115,101,104,110,10,70,101,101,114,110,115,101,104,114,101,101,103,10,70,101,101,114,110,115,101,104,114,101,103,101,110,10,102,101,104,108,47,115,66,86,10,70,101,104,108,101,114,47,83,10,70,101,104,108,101,114,97,100,114,101,115,115,47,110,10,70,101,104,108,101,114,98,101,114,105,99,104,116,47,110,10,70,101,104,108,101,114,107,108,97,115,115,47,110,10,70,101,104,108,101,114,108,105,115,116,47,110,10,70,101,104,108,101,114,109,101,108,108,101,110,10,70,101,104,108,101,114,115,195,182,195,182,107,10,70,101,104,108,101,114,115,112,111,111,114,47,110,10,70,101,104,108,101,114,116,97,108,108,47,110,10,70,101,104,108,115,108,97,103,10,70,101,104,108,115,108,195,164,195,164,103,10,102,101,105,110,47,101,110,10,70,101,108,100,10,70,101,108,108,101,114,10,70,101,108,100,103,114,195,182,116,116,47,110,10,70,101,108,100,110,97,97,109,47,83,10,70,101,108,100,115,99,104,101,101,100,115,114,105,99,104,116,101,114,47,83,10,70,101,108,100,115,99,104,101,101,100,115,114,105,99,104,116,101,114,115,99,104,101,47,110,10,70,101,108,100,115,112,101,108,101,114,47,83,10,70,101,108,100,115,112,101,108,101,114,104,101,108,109,47,110,10,70,101,108,100,115,112,101,108,101,114,115,99,104,101,47,110,10,70,101,108,100,115,112,101,108,101,114,115,108,195,164,103,101,114,47,83,10,70,101,108,100,195,188,109,108,101,103,103,101,110,10,70,101,108,108,47,110,10,102,101,109,105,110,105,110,47,101,110,10,70,101,110,115,116,101,114,47,110,10,70,101,110,115,116,101,114,98,97,110,107,10,70,101,110,115,116,101,114,98,195,164,110,107,10,70,101,110,115,116,101,114,98,105,108,100,10,70,101,110,115,116,101,114,98,105,108,108,101,114,10,70,101,110,115,116,101,114,100,101,107,111,114,97,116,115,99,104,111,111,110,47,110,10,70,101,110,115,116,101,114,103,114,195,182,116,116,47,110,10,70,101,110,115,116,101,114,105,110,104,111,108,116,10,70,101,110,115,116,101,114,116,121,112,47,110,10,70,101,114,105,101,110,10,70,101,115,116,47,110,10,70,101,115,116,105,118,97,108,47,83,10,102,101,116,116,47,101,110,10,70,101,116,116,47,110,10,102,105,99,107,101,114,105,103,47,101,110,10,102,105,99,107,101,114,105,103,101,114,47,101,110,10,102,105,99,107,101,114,105,103,115,116,47,101,110,10,70,105,101,103,47,110,10,102,105,101,110,47,101,110,10,70,105,101,110,100,47,110,10,70,105,101,110,115,116,111,102,102,10,102,105,101,114,47,90,71,115,10,102,105,101,114,110,47,122,103,10,70,105,101,114,100,97,103,10,70,105,101,114,100,97,97,103,10,70,105,103,117,114,10,70,105,103,117,114,101,110,10,70,105,108,109,47,110,10,70,105,108,109,109,117,115,105,107,47,110,10,70,105,108,116,101,114,47,83,10,102,105,108,116,101,114,110,47,73,68,87,77,79,82,85,10,102,105,108,116,101,114,110,47,115,82,85,10,70,105,108,116,101,114,114,101,103,101,108,10,70,105,108,116,101,114,114,101,103,101,108,110,10,102,105,110,97,108,47,101,110,10,102,105,110,97,110,122,101,101,114,47,115,10,70,105,110,97,110,122,101,110,10,70,105,110,103,101,114,47,83,10,70,105,110,103,101,114,97,102,100,114,117,99,107,10,70,105,110,103,101,114,97,102,100,114,195,188,99,107,10,102,105,110,110,101,110,47,73,68,81,74,80,71,88,10,102,105,110,110,101,110,47,113,106,112,103,120,10,102,105,110,100,116,47,81,74,80,71,88,10,102,117,110,110,101,110,47,73,68,81,74,80,71,88,10,70,105,114,109,97,10,70,105,114,109,101,110,10,70,105,114,109,97,115,10,70,105,115,99,104,10,70,105,115,99,104,101,114,47,83,10,70,105,115,99,104,101,114,101,101,10,70,105,115,99,104,107,117,110,110,10,70,105,115,101,109,97,116,101,110,116,101,110,10,102,105,120,47,101,110,10,102,105,120,101,114,47,101,110,10,70,105,120,97,110,115,105,99,104,116,47,101,110,10,70,105,120,104,195,188,108,112,10,70,105,120,105,110,115,116,101,108,108,101,110,10,70,105,120,107,105,101,107,101,114,10,70,105,120,115,195,182,195,182,107,10,70,105,120,115,195,182,195,182,107,102,101,108,100,10,70,105,120,115,116,97,114,116,10,70,105,120,115,116,97,114,116,101,114,10,70,105,120,115,116,101,101,114,110,47,83,10,70,105,120,116,111,103,114,105,101,112,47,110,10,70,105,120,119,105,101,115,101,114,47,83,10,70,108,97,97,103,47,110,10,70,108,97,97,103,10,70,108,195,182,195,182,103,10,70,108,195,164,195,164,103,10,102,108,97,99,104,47,101,110,10,70,108,97,99,104,10,70,108,97,99,104,101,110,10,102,108,97,99,107,101,114,110,47,73,68,87,80,10,70,108,97,103,103,47,110,10,102,108,97,103,103,101,110,47,73,68,87,77,79,66,74,85,195,156,10,102,108,97,103,103,101,110,47,106,117,195,188,10,70,108,97,109,109,47,110,10,70,108,101,99,104,116,47,110,10,102,108,101,99,104,116,101,110,47,73,68,87,77,79,65,82,74,80,90,75,71,84,85,86,70,195,156,10,102,108,101,99,104,116,101,110,47,97,114,106,112,122,107,103,116,117,102,195,188,10,70,108,101,100,100,101,114,109,117,117,115,10,70,108,101,100,100,101,114,109,195,188,195,188,115,10,70,108,101,100,101,114,10,102,108,101,101,103,107,108,111,111,114,10,102,108,101,101,103,112,114,97,97,116,47,101,110,10,70,108,101,101,114,108,105,110,103,10,70,108,101,101,115,99,104,10,70,108,101,101,115,99,104,107,105,101,107,101,114,47,83,10,70,108,101,101,116,107,111,109,109,97,47,83,10,70,108,101,101,116,107,111,109,109,97,116,97,108,108,47,110,10,70,108,101,101,116,107,111,109,109,97,119,101,101,114,116,47,110,10,70,108,101,103,101,108,47,83,10,102,108,101,103,101,110,47,65,81,82,89,67,74,80,84,85,86,70,88,195,156,10,102,108,101,103,101,110,47,97,113,114,121,99,106,112,116,117,118,102,120,195,188,10,102,108,101,101,103,47,87,65,81,82,89,67,74,80,84,85,86,70,88,195,156,10,102,108,195,188,103,103,115,116,47,65,81,82,89,67,74,80,84,85,86,70,88,195,156,10,102,108,195,188,103,103,116,47,65,81,82,89,67,74,80,84,85,86,70,88,195,156,10,102,108,195,182,195,182,103,47,68,65,81,82,89,67,74,80,84,85,86,70,88,195,156,10,102,108,195,182,103,101,110,47,65,81,82,89,67,74,80,84,85,86,70,88,195,156,10,102,108,97,103,101,110,47,65,81,82,89,67,74,80,84,85,86,70,88,195,156,10,70,108,101,103,101,114,47,83,10,70,108,101,103,101,114,97,102,119,101,104,114,47,110,10,70,108,101,103,101,114,97,102,119,101,104,114,107,97,110,111,111,110,47,110,10,70,108,101,103,101,114,97,102,119,101,104,114,114,97,107,101,101,116,47,110,10,70,108,101,103,101,114,98,111,10,70,108,101,103,101,114,100,114,101,103,101,114,47,83,10,70,108,101,103,101,114,101,101,10,70,108,101,103,101,114,102,195,182,104,114,101,114,47,83,10,70,108,101,103,101,114,102,195,182,104,114,101,114,115,99,104,101,47,110,10,70,108,101,103,101,114,104,97,108,108,47,101,110,10,70,108,101,103,101,114,104,97,118,101,110,47,83,10,70,108,101,103,101,114,104,97,118,101,110,114,101,115,116,97,117,114,97,110,116,47,83,10,70,108,101,103,101,114,108,97,114,109,10,70,108,101,103,101,114,108,111,111,116,115,47,110,10,70,108,101,103,101,114,108,111,111,116,115,99,104,101,47,110,10,70,108,101,103,101,114,112,97,115,115,97,103,101,101,114,47,101,110,10,70,108,101,103,101,114,112,108,97,116,122,10,70,108,101,103,101,114,112,108,195,164,116,122,10,70,108,101,103,101,114,114,101,105,115,47,110,10,70,108,101,103,101,114,115,99,104,105,112,112,10,70,108,101,103,101,114,115,99,104,101,101,112,10,70,108,101,103,101,114,115,101,108,108,115,99,104,111,112,47,101,110,10,70,108,101,103,101,114,116,105,99,107,101,116,47,83,10,70,108,101,103,101,114,118,101,114,107,101,104,114,47,101,10,70,108,101,105,116,47,110,10,102,108,101,116,101,110,47,81,82,74,85,88,10,102,108,101,116,101,110,47,113,114,106,117,120,10,102,108,101,101,116,47,81,82,74,85,88,10,102,108,195,188,116,116,115,116,47,81,82,74,85,88,10,102,108,195,188,116,116,47,81,82,74,85,88,10,102,108,111,111,116,47,68,81,82,74,85,88,10,102,108,111,116,101,110,47,81,82,74,85,88,10,102,108,97,116,101,110,47,81,82,74,85,88,10,102,108,105,99,107,101,110,47,73,68,87,77,79,65,74,80,90,75,84,85,10,102,108,105,99,107,101,110,47,97,106,112,122,107,116,117,10,102,108,105,101,116,105,103,47,101,10,70,108,195,182,103,101,108,115,112,101,108,101,114,47,83,10,70,108,111,111,103,97,110,115,108,117,115,115,10,70,108,108,111,103,97,110,115,108,195,188,115,115,10,70,108,111,111,103,98,97,104,110,47,101,110,10,70,108,111,111,103,98,101,100,114,105,101,102,47,101,110,10,70,108,111,111,103,98,101,110,122,105,110,47,101,10,70,108,111,111,103,100,97,116,101,110,115,99,104,114,105,101,118,101,114,47,83,10,102,108,111,111,103,100,195,188,99,104,116,105,103,47,101,110,10,70,108,111,111,103,10,70,108,195,182,195,182,103,10,70,108,111,111,103,103,97,115,116,47,110,10,70,108,111,111,103,103,101,115,101,108,108,47,110,10,70,108,111,111,103,103,101,115,101,108,108,105,110,47,101,110,10,70,108,111,111,103,104,97,118,101,110,47,83,10,70,108,111,111,103,104,97,118,101,110,114,101,115,116,97,117,114,97,110,116,47,83,10,70,108,111,111,103,104,195,182,195,182,99,104,100,47,110,10,70,108,111,111,103,107,97,112,116,101,105,110,47,101,10,70,108,111,111,103,107,97,112,116,101,105,110,115,99,104,101,47,110,10,70,108,111,111,103,107,105,108,111,109,101,116,101,114,47,83,10,70,108,111,111,103,107,111,110,116,114,111,108,108,47,110,10,70,108,111,111,103,107,111,111,114,116,47,110,10,70,108,111,111,103,108,101,104,114,101,114,47,83,10,70,108,111,111,103,108,101,104,114,101,114,115,99,104,101,47,110,10,70,108,111,111,103,108,101,105,100,47,110,10,70,108,111,111,103,112,97,115,115,97,103,101,101,114,47,101,110,10,70,108,111,111,103,112,108,97,97,110,47,83,10,70,108,111,111,103,112,108,97,116,122,10,70,108,111,111,103,112,108,195,164,116,122,10,70,108,111,111,103,112,111,115,105,116,115,99,104,111,111,110,47,110,10,70,108,111,111,103,114,101,105,115,47,110,10,70,108,111,111,103,114,105,99,104,116,47,110,10,70,108,111,111,103,115,99,104,105,101,110,47,83,10,70,108,111,111,103,115,99,104,195,182,108,101,114,47,83,10,70,108,111,111,103,115,99,104,195,182,108,101,114,115,99,104,101,47,110,10,70,108,111,111,103,115,99,104,114,105,101,118,101,114,47,83,10,70,108,111,111,103,115,101,107,101,114,104,101,105,116,47,110,10,70,108,111,111,103,115,101,107,101,114,110,10,70,108,111,111,103,115,110,101,101,115,47,110,10,70,108,111,111,103,115,116,105,101,103,47,101,10,70,108,111,111,103,115,116,114,101,101,107,47,110,10,70,108,111,111,103,115,116,195,188,110,110,47,83,10,102,108,111,111,103,116,101,99,104,101,110,115,99,104,47,101,110,10,70,108,111,111,103,116,101,99,104,110,105,107,47,110,10,70,108,111,111,103,116,105,99,107,101,116,47,83,10,70,108,111,111,103,116,105,101,116,10,70,108,111,111,103,116,105,101,100,101,110,10,102,108,111,111,103,117,110,100,195,188,99,104,116,105,103,47,101,110,10,70,108,111,111,103,117,110,100,195,188,99,104,116,105,103,107,101,105,116,47,110,10,70,108,111,111,103,118,101,114,107,101,104,114,47,101,10,70,108,111,111,103,119,101,100,100,101,114,10,70,108,111,111,103,119,101,100,100,101,114,100,101,101,110,115,116,47,101,110,10,70,108,195,182,195,182,107,10,70,108,195,182,107,101,110,10,70,108,111,112,112,121,10,70,108,111,114,101,116,116,10,70,108,111,116,116,10,70,108,195,188,110,107,47,110,10,102,108,117,115,105,103,47,101,110,10,70,111,100,100,101,114,10,102,195,182,100,100,101,114,110,47,73,68,87,77,79,65,81,74,80,10,102,195,182,100,100,101,114,110,47,97,113,106,112,10,70,111,100,101,114,10,102,111,100,101,114,47,115,65,84,81,10,102,111,100,101,114,110,47,97,116,113,10,102,195,182,103,101,110,47,65,74,84,86,10,102,195,182,103,101,110,47,97,106,116,10,102,195,182,195,182,103,47,68,87,77,79,65,74,84,86,10,102,195,182,104,108,47,115,65,66,82,67,74,70,90,84,10,102,195,182,104,108,101,110,47,97,114,99,106,102,122,116,10,102,195,182,104,114,47,115,79,65,81,66,82,74,72,80,90,75,71,89,67,85,86,70,88,76,10,102,195,182,104,114,101,110,47,97,113,114,106,104,112,122,107,103,121,99,117,102,120,108,10,102,111,104,114,47,115,79,65,81,66,82,74,72,80,90,75,71,89,67,85,86,70,88,76,10,102,111,104,114,101,110,47,97,113,114,106,104,112,122,107,103,121,99,117,102,120,108,10,102,111,104,114,101,110,10,108,111,111,115,102,111,104,114,101,110,10,108,111,111,115,102,195,182,104,114,115,116,10,108,111,111,115,102,195,182,104,114,116,10,108,111,111,115,102,111,104,114,10,102,111,104,114,101,110,10,195,182,118,101,114,102,111,104,114,47,115,10,111,118,101,114,102,111,104,114,101,110,10,114,195,188,109,102,111,104,114,47,115,10,114,195,188,109,102,111,104,114,101,110,10,70,111,104,114,101,110,115,109,97,110,110,10,70,111,104,114,101,110,115,108,195,188,195,188,100,10,70,195,182,104,114,101,114,47,83,10,75,97,115,115,101,110,102,195,182,104,114,101,114,47,83,10,70,111,104,114,101,114,47,83,10,70,111,104,114,101,114,115,99,104,47,110,10,70,195,182,104,114,101,114,115,99,104,105,101,110,47,83,10,70,111,104,114,114,97,100,10,70,111,104,114,114,195,182,195,182,100,10,70,111,104,114,116,47,101,110,10,70,111,104,114,116,195,188,195,188,99,104,10,70,111,104,114,116,195,188,103,101,110,10,70,111,107,117,115,10,102,111,107,117,115,115,101,101,114,47,115,10,70,111,108,103,47,110,10,70,111,108,103,47,110,10,102,111,108,103,47,115,81,66,86,10,102,111,108,103,101,110,47,113,10,70,111,108,105,101,47,110,10,70,111,108,107,108,111,111,114,10,70,111,108,107,109,117,115,105,107,10,70,111,108,116,101,114,107,97,109,101,114,47,83,10,102,111,110,101,101,116,115,99,104,47,101,110,10,102,195,182,195,182,103,47,115,10,102,111,111,108,100,101,110,47,73,68,87,77,79,74,84,85,10,102,111,111,108,100,101,110,47,106,116,117,10,102,111,111,114,116,115,10,70,111,111,116,98,97,108,108,10,70,111,111,116,98,195,164,108,108,10,70,111,111,116,98,97,108,108,112,108,97,116,122,10,70,111,111,116,98,97,108,108,112,108,195,164,116,122,10,70,111,111,116,98,97,108,108,115,99,104,111,104,10,70,111,111,116,98,97,108,108,115,99,104,195,182,104,10,70,111,111,116,98,97,108,108,115,112,101,108,101,114,47,83,10,70,111,111,116,98,97,108,108,115,116,101,118,101,108,47,110,10,70,111,111,116,98,111,100,100,101,110,47,83,10,70,111,111,116,10,70,195,182,195,182,116,10,70,111,111,116,112,97,100,100,47,110,10,70,111,111,116,112,108,101,101,103,10,70,111,111,116,114,101,101,103,47,110,10,70,111,111,116,115,99,104,117,108,101,114,47,83,10,70,111,111,116,116,114,117,112,112,101,110,10,102,195,182,114,10,102,195,182,114,39,110,10,102,195,182,114,39,116,10,70,111,114,109,47,110,10,70,111,114,109,97,116,47,110,10,102,111,114,109,97,116,101,101,114,47,115,10,70,111,114,109,97,116,101,101,114,112,114,111,103,114,97,109,109,47,110,10,70,111,114,109,97,116,116,101,107,101,110,47,83,10,70,111,114,109,101,108,10,70,111,114,109,101,108,110,10,102,111,114,109,101,110,47,73,68,87,77,79,85,86,70,195,156,10,102,111,114,109,101,110,47,117,102,195,188,10,70,111,114,109,10,70,111,114,109,101,110,10,70,111,114,109,117,108,111,114,47,110,10,102,111,114,115,99,104,47,115,10,70,195,182,114,115,116,101,114,47,83,10,70,111,114,115,116,119,101,101,114,116,115,99,104,111,112,10,102,195,182,114,119,105,115,115,47,101,110,10,70,195,182,114,119,111,111,114,116,10,70,195,182,114,119,195,182,195,182,114,10,70,111,116,111,47,83,10,102,111,116,111,103,114,97,102,101,101,114,47,115,10,70,111,116,111,103,114,97,102,105,101,10,70,111,117,108,47,83,10,70,114,97,97,103,47,110,10,102,114,97,97,103,10,110,97,102,114,97,97,103,47,115,10,70,114,97,97,103,115,112,101,101,108,47,110,10,102,114,97,103,101,110,47,65,81,66,72,85,70,72,10,102,114,97,103,101,110,47,97,113,104,117,102,104,10,102,114,97,97,103,47,68,87,77,79,65,81,66,72,85,70,10,70,114,97,107,116,97,108,47,110,10,70,114,97,107,116,97,108,116,97,108,108,47,110,10,102,114,101,39,101,47,110,10,70,114,101,100,101,110,10,70,114,101,101,100,97,103,10,102,114,101,101,10,102,114,101,39,101,10,102,114,101,39,101,110,10,70,114,101,101,103,97,97,118,47,110,10,102,114,101,101,104,97,110,110,105,103,47,101,110,10,70,114,101,101,114,117,117,109,10,70,114,101,101,114,195,188,195,188,109,10,70,114,101,101,115,116,111,111,116,10,70,114,101,101,116,105,101,116,10,70,114,101,101,116,105,101,100,101,110,10,102,114,101,101,116,115,99,104,47,101,110,10,70,114,101,105,100,10,70,114,101,113,117,101,110,122,47,110,10,70,114,101,113,117,101,110,122,98,97,110,100,10,70,114,101,113,117,101,110,122,98,195,164,110,110,101,114,10,102,114,101,114,101,110,47,81,65,82,74,84,85,86,10,102,114,101,114,101,110,47,113,97,114,106,116,117,10,102,114,101,101,114,47,68,87,81,65,82,74,84,85,86,10,102,114,111,111,114,47,68,81,65,82,74,84,85,86,10,102,114,111,114,101,110,47,81,65,82,74,84,85,86,10,102,114,101,115,101,110,10,102,114,195,188,115,116,10,102,114,101,116,101,110,47,81,65,82,74,80,90,71,84,85,86,88,10,102,114,101,116,101,110,47,113,97,114,106,112,122,103,116,117,120,10,102,114,101,101,116,47,68,81,65,82,74,80,90,71,84,85,86,88,10,102,114,105,116,116,47,68,81,65,82,74,80,90,71,84,85,86,88,10,70,114,101,117,100,10,70,114,101,117,100,101,110,10,102,114,101,117,101,110,47,73,68,87,10,102,114,101,105,47,73,68,87,10,102,114,105,115,99,104,47,101,110,10,102,114,105,115,99,104,101,110,47,73,68,87,77,79,65,80,10,102,114,105,115,99,104,101,110,47,97,112,10,70,114,105,115,99,104,108,117,102,116,10,70,114,105,115,195,182,114,47,110,10,70,114,105,115,116,47,110,10,70,114,111,10,70,114,111,111,110,115,10,70,114,111,111,110,115,108,195,188,195,188,100,10,102,114,111,104,47,101,110,10,102,114,195,182,104,47,101,110,10,102,114,195,182,104,101,114,47,101,110,10,102,114,195,182,104,115,116,47,101,110,10,70,114,195,182,104,106,111,104,114,10,70,114,195,182,104,106,111,104,114,115,112,117,110,107,116,47,101,10,70,114,195,182,104,115,116,195,188,99,107,47,110,10,102,114,195,182,104,115,116,195,188,99,107,47,115,10,102,114,195,182,109,100,47,101,110,10,102,114,195,182,109,109,101,10,102,114,195,182,109,109,101,110,10,70,114,195,182,109,100,115,108,195,182,116,101,108,47,83,10,70,114,111,111,110,115,109,105,110,115,99,104,47,110,10,70,114,111,115,116,10,70,114,117,99,104,116,98,111,114,107,101,105,116,47,110,10,70,114,117,99,104,116,10,70,114,195,188,99,104,116,10,70,114,195,188,99,104,116,116,101,101,10,70,114,195,188,99,104,116,116,101,101,115,10,70,114,117,10,70,114,117,117,110,115,108,195,188,195,188,100,10,70,114,195,188,110,100,10,70,114,195,188,110,110,101,110,10,70,114,195,188,110,100,105,110,10,70,114,195,188,110,100,105,110,110,101,110,10,102,114,195,188,110,100,108,105,99,104,47,101,110,10,70,114,195,188,110,100,115,99,104,111,112,10,70,114,195,188,110,100,115,99,104,111,112,112,101,110,10,70,117,99,104,116,105,103,107,101,105,116,47,101,110,10,70,195,188,101,114,10,102,195,188,101,114,47,115,10,70,195,188,101,114,98,97,108,108,10,70,195,188,101,114,98,195,164,108,108,10,70,195,188,101,114,119,97,114,107,47,110,10,70,195,188,101,114,119,101,104,114,47,110,10,102,195,188,108,108,47,74,90,85,195,156,80,72,66,81,115,10,102,195,188,108,108,101,110,47,106,122,117,195,188,112,104,113,10,102,195,188,108,108,47,115,65,66,74,80,84,195,156,82,85,10,102,195,188,108,108,101,110,47,97,106,112,116,195,188,114,117,10,70,195,188,108,108,103,114,97,97,100,47,110,10,70,117,110,107,47,110,10,70,117,110,107,101,114,47,83,10,70,117,110,107,102,114,101,113,117,101,110,122,47,110,10,70,117,110,107,110,101,116,116,119,97,114,107,47,110,10,102,117,110,107,115,99,104,101,110,101,101,114,47,115,10,102,117,110,107,115,99,104,111,110,101,101,114,47,115,10,70,117,110,107,115,99,104,111,111,110,10,70,117,110,107,115,99,104,111,110,101,110,10,102,117,117,108,47,101,110,10,102,195,188,195,188,110,115,99,104,47,101,110,10,102,117,117,114,116,115,10,70,117,117,115,116,10,103,97,97,116,108,105,99,104,47,101,110,10,71,97,97,118,47,110,10,71,97,100,100,101,114,47,83,10,103,97,104,110,47,65,81,66,82,74,72,80,90,71,84,89,89,85,86,70,88,195,156,76,10,103,97,104,110,47,97,113,98,114,106,104,112,122,103,116,121,121,117,118,102,120,195,188,108,10,103,97,104,47,65,81,66,82,74,72,80,90,71,84,89,67,85,86,70,88,195,156,76,10,103,101,105,104,115,116,47,65,81,66,82,74,72,80,90,71,84,89,67,85,86,70,88,195,156,76,10,103,101,105,104,116,47,65,81,66,82,74,72,80,90,71,84,89,67,85,86,70,88,195,156,76,10,103,97,104,116,47,65,81,66,82,74,72,80,90,71,89,84,67,85,86,70,88,195,156,76,10,103,117,110,103,47,65,81,66,82,74,72,80,90,71,84,89,67,85,86,70,88,195,156,76,10,103,117,110,103,115,116,47,65,81,66,82,74,72,80,90,71,84,89,67,85,86,70,88,195,156,76,10,103,195,188,110,103,101,110,47,65,81,66,82,74,72,80,90,71,84,89,67,85,86,70,88,195,156,76,10,103,97,104,110,10,104,111,111,99,104,103,97,104,110,47,73,68,87,10,103,97,104,110,10,119,105,101,100,101,114,103,97,104,110,10,71,97,108,97,120,105,101,47,110,10,71,97,110,103,10,71,195,164,110,103,10,71,97,110,103,119,97,121,47,83,10,103,97,110,122,47,101,110,10,71,97,114,97,110,116,105,101,47,110,10,71,97,115,47,110,10,103,97,115,100,105,99,104,116,47,101,110,10,71,97,115,104,195,188,108,108,10,71,97,115,107,111,110,115,116,97,110,116,101,47,110,10,71,97,115,110,101,118,101,108,47,83,10,71,97,115,116,10,71,195,164,115,116,10,71,97,115,116,107,111,110,116,111,47,83,10,103,97,117,47,101,110,10,103,97,117,101,114,47,101,110,10,103,97,117,101,115,116,47,101,110,10,103,97,117,115,116,47,101,110,10,71,97,117,104,101,105,116,47,110,10,71,97,117,105,103,107,101,105,116,47,110,10,71,97,118,101,108,10,71,97,118,101,108,110,10,71,101,98,111,111,114,116,10,71,101,98,111,111,114,116,115,100,97,103,10,71,101,98,111,111,114,116,115,100,97,97,103,10,71,101,98,111,111,114,116,115,106,111,104,114,47,110,10,71,101,98,111,111,114,116,115,111,111,114,116,10,71,101,98,111,111,114,116,115,195,182,195,182,114,100,10,71,101,100,195,164,99,104,116,110,105,115,10,71,101,100,97,110,107,47,110,10,71,101,100,105,99,104,116,47,110,10,103,101,100,105,101,103,101,110,47,101,110,10,103,101,101,108,47,101,110,10,103,101,101,114,110,10,103,101,101,116,47,115,74,90,85,66,88,10,103,101,116,101,110,47,106,122,117,98,120,10,103,101,102,195,164,104,114,108,105,99,104,47,101,110,10,103,101,102,195,164,104,114,108,105,99,104,101,114,47,101,110,10,103,101,102,195,164,104,114,108,105,99,104,115,116,47,101,110,10,71,101,102,195,182,104,108,47,110,10,71,101,102,111,104,114,47,110,10,71,101,102,111,104,114,114,101,98,101,101,116,10,71,101,102,111,104,114,114,101,98,101,100,101,110,10,103,101,103,101,110,10,103,101,103,101,110,97,110,10,71,101,103,101,110,100,47,110,10,103,101,103,101,110,108,195,182,112,105,103,47,101,110,10,103,101,103,101,110,195,182,118,101,114,10,71,101,103,101,110,114,105,99,104,116,47,110,10,71,101,103,101,110,115,109,97,110,110,10,71,101,103,101,110,115,108,195,188,195,188,100,10,71,101,103,101,110,115,116,114,101,101,107,10,71,101,103,101,110,115,116,114,101,107,101,110,10,71,101,103,101,110,118,195,182,114,115,108,97,103,10,71,101,103,101,110,118,195,182,114,115,108,195,164,195,164,103,10,103,101,104,101,101,109,47,101,110,10,103,101,104,101,109,101,114,47,101,110,10,103,101,104,101,101,109,115,116,47,101,110,10,71,101,104,101,101,109,110,105,115,10,71,101,104,101,101,109,110,105,115,115,101,110,10,71,101,105,115,116,10,71,101,108,100,98,101,100,114,97,103,10,71,101,108,100,10,71,101,108,108,101,114,10,83,109,101,101,114,103,101,108,100,10,83,109,101,101,114,103,101,108,108,101,114,10,71,101,108,100,115,111,111,114,116,47,110,10,71,101,108,100,119,101,101,114,116,47,110,10,71,101,108,101,103,101,110,104,101,105,116,47,110,10,103,101,108,108,101,110,47,73,68,87,81,86,10,103,101,108,108,101,110,47,113,10,103,117,108,108,101,110,47,73,68,81,86,10,103,101,109,101,101,110,47,101,110,10,71,101,109,101,101,110,10,71,101,109,101,110,101,110,10,76,97,110,100,103,101,109,101,101,110,10,76,97,110,100,103,101,109,101,110,101,110,10,83,97,109,116,103,101,109,101,101,110,10,83,97,109,116,103,101,109,101,110,101,110,10,71,101,109,101,101,110,115,99,104,111,112,10,71,101,109,101,101,110,115,99,104,111,112,112,101,110,10,103,101,110,101,101,116,115,99,104,47,101,110,10,103,101,110,101,114,97,108,47,101,110,10,71,101,110,101,114,97,108,47,110,10,103,101,110,101,114,97,108,105,115,101,101,114,110,47,115,10,71,101,110,101,114,97,116,115,99,104,111,111,110,47,110,10,103,101,110,101,116,101,110,10,105,107,10,103,101,110,101,101,116,10,100,117,10,103,101,110,195,188,116,116,115,116,10,104,101,10,103,101,110,195,188,116,116,10,119,105,10,103,101,110,101,101,116,10,105,107,10,103,101,110,111,111,116,10,103,101,110,195,182,195,182,116,10,100,117,10,103,101,110,111,111,116,115,116,10,103,101,110,195,182,195,182,116,115,116,10,104,101,10,103,101,110,111,111,116,10,103,101,110,195,182,195,182,116,10,119,105,10,103,101,110,111,116,101,110,10,103,101,110,195,182,116,101,110,10,103,101,110,101,101,116,10,103,101,110,97,116,101,110,47,101,110,10,71,101,110,105,116,105,118,47,110,10,103,101,111,103,114,97,97,102,115,99,104,47,101,110,10,71,101,111,103,114,97,102,105,101,10,71,101,111,108,111,103,105,101,10,71,101,111,108,111,111,103,10,71,101,111,108,111,103,101,110,10,71,101,111,109,101,116,114,105,101,47,110,10,103,101,111,109,101,116,114,105,115,99,104,47,101,110,10,103,101,111,122,101,110,116,101,114,115,99,104,47,101,110,10,71,101,114,105,99,104,116,47,110,10,76,97,110,100,103,101,114,105,99,104,116,47,110,10,71,101,115,97,98,98,101,108,10,71,101,115,97,109,116,115,99,104,111,111,108,47,110,10,71,101,115,97,110,103,98,111,111,107,10,71,101,115,97,110,103,98,195,182,107,101,114,10,71,101,115,97,110,103,10,71,101,115,195,164,110,103,10,71,101,115,99,104,101,110,107,47,110,10,71,101,115,99,104,105,99,104,116,47,110,10,71,101,115,99,104,105,99,104,116,115,119,101,116,101,110,115,99,104,111,112,10,71,101,115,101,116,116,47,110,10,71,101,115,105,99,104,116,10,71,101,115,105,99,104,116,101,114,10,71,101,115,105,99,104,116,115,99,104,117,108,101,114,47,83,10,71,101,115,105,99,104,116,115,109,97,115,107,47,110,10,71,101,115,108,101,99,104,116,10,71,101,115,108,101,99,104,116,101,114,10,71,101,115,119,105,115,116,101,114,47,83,10,103,101,116,101,110,10,105,107,10,103,101,101,116,10,100,117,10,103,195,188,116,116,115,116,10,104,101,10,103,195,188,116,116,10,119,105,10,103,101,101,116,10,105,107,10,103,111,111,116,10,103,195,182,195,182,116,10,100,117,10,103,111,111,116,115,116,10,103,195,182,195,182,116,115,116,10,103,101,10,103,195,182,195,182,116,10,119,105,10,103,111,116,101,110,10,103,195,182,116,101,110,10,103,97,116,101,110,47,101,110,10,103,101,118,101,110,47,65,66,81,82,74,80,71,84,89,90,85,86,70,88,10,103,101,118,101,110,47,97,113,114,106,112,103,116,121,122,117,102,120,10,103,101,101,118,47,65,66,81,82,74,80,71,84,89,90,85,86,70,88,10,103,105,102,102,115,116,47,65,66,81,82,74,80,71,84,89,90,85,86,70,88,10,103,105,102,102,116,47,65,66,82,74,80,71,84,89,90,85,86,70,88,10,103,101,101,118,116,47,65,66,81,82,74,80,71,84,89,90,85,86,70,88,10,103,101,101,118,115,116,47,65,66,82,74,80,71,84,89,90,85,86,70,88,10,103,105,102,102,10,103,101,103,101,110,10,116,114,195,188,99,104,103,101,118,101,110,10,71,101,118,101,114,47,83,10,71,101,119,105,100,100,101,114,47,83,10,71,105,102,116,47,110,10,103,105,102,116,105,103,47,101,110,10,71,105,114,97,102,102,47,110,10,71,108,97,115,102,97,115,101,114,115,107,105,10,71,108,97,115,102,97,115,101,114,115,107,105,101,114,10,71,108,97,115,10,71,108,195,182,195,182,115,10,71,108,195,164,116,116,10,103,108,97,116,116,10,103,108,97,100,100,101,10,103,108,97,100,100,101,110,10,71,108,97,116,116,105,101,115,10,71,108,101,101,109,10,71,108,101,105,115,47,110,10,71,108,101,116,115,99,104,101,114,47,83,10,103,108,105,101,100,101,110,47,73,87,81,66,82,88,10,103,108,105,101,100,101,110,47,113,114,120,10,103,108,105,100,100,115,116,47,81,66,82,88,10,103,108,105,100,100,116,47,81,66,82,88,10,103,108,101,101,100,47,68,81,66,82,88,10,103,108,101,100,101,110,47,81,66,82,88,10,103,108,105,101,107,47,115,10,103,108,105,101,107,101,110,47,73,87,65,81,66,85,86,10,103,108,105,101,107,101,110,47,97,113,117,10,103,108,105,99,107,115,116,47,65,81,66,85,86,10,103,108,105,99,107,116,47,65,81,66,85,86,10,103,108,101,101,107,47,68,65,81,66,85,86,10,103,108,101,107,101,110,47,65,81,66,85,86,10,103,108,105,101,107,115,10,71,108,105,101,107,115,116,97,110,100,10,71,108,105,101,107,115,116,195,164,110,110,10,103,108,105,109,109,101,114,47,115,10,103,108,105,110,115,116,101,114,47,115,10,103,108,105,110,115,116,101,114,110,47,73,68,87,10,103,108,105,116,115,99,104,105,103,47,101,110,10,103,108,111,98,97,108,47,101,110,10,71,108,111,98,117,115,10,71,108,111,98,117,115,115,101,110,10,103,108,195,182,104,101,110,47,73,68,87,77,79,65,82,80,71,85,86,88,10,103,108,195,182,104,101,110,47,97,114,112,103,117,118,120,10,103,108,195,182,104,110,105,103,47,101,110,10,71,108,111,111,118,47,110,10,103,108,195,182,195,182,118,47,115,66,10,71,108,195,188,99,107,10,103,108,195,188,99,107,101,110,47,73,68,87,77,79,66,10,103,108,117,117,112,115,99,104,47,101,110,10,71,110,97,97,100,10,71,110,97,100,101,110,10,103,110,97,116,116,101,114,105,103,47,101,110,10,103,110,97,116,122,105,103,47,101,110,10,103,110,105,103,103,101,114,47,115,10,71,111,108,100,10,71,111,108,100,102,105,115,99,104,10,71,111,108,100,107,108,195,188,109,112,101,110,10,71,111,108,100,115,195,182,107,101,114,47,83,10,71,111,108,102,10,71,111,108,102,98,97,108,108,10,71,111,108,102,98,195,164,108,108,10,71,111,108,102,112,108,97,116,122,10,71,111,108,102,112,108,195,164,116,122,10,71,111,108,102,115,99,104,111,104,10,71,111,108,102,115,99,104,195,182,104,10,103,111,108,108,101,110,47,101,110,10,71,195,182,195,182,100,10,71,195,182,100,101,110,10,103,111,111,114,47,101,110,10,71,111,111,114,110,47,83,10,71,111,111,115,102,195,182,195,182,116,10,71,111,111,115,10,71,195,182,195,182,115,10,103,111,111,116,10,103,111,100,101,10,103,111,100,101,110,10,103,111,114,47,101,110,10,103,111,116,105,115,99,104,47,101,110,10,103,111,111,116,115,99,104,47,101,110,10,71,111,116,116,10,71,195,182,100,100,101,114,10,71,111,116,116,115,100,101,101,110,115,116,47,110,10,71,114,97,97,100,10,71,114,97,100,101,110,10,71,114,97,97,102,10,71,114,97,102,101,110,10,103,114,97,97,102,115,99,104,47,101,110,10,71,114,97,97,118,10,71,114,97,118,101,110,115,10,103,114,97,100,101,101,114,47,115,80,10,71,114,97,102,102,10,71,114,195,164,118,101,114,10,71,114,195,164,102,102,110,105,115,10,71,114,195,164,102,102,110,105,115,115,101,110,10,71,114,97,102,105,107,47,110,10,71,114,97,102,105,107,102,111,114,109,97,116,47,110,10,71,114,97,102,105,107,107,111,111,114,116,47,110,10,71,114,97,102,105,107,115,121,115,116,101,109,47,110,10,103,114,97,108,101,101,114,47,115,66,72,70,10,71,114,97,109,109,97,116,105,107,47,110,10,103,114,97,109,109,97,116,115,99,104,47,101,110,10,103,114,97,110,116,105,103,47,101,110,10,71,114,97,112,104,47,110,10,71,114,97,112,104,101,110,116,104,101,111,114,105,101,10,71,114,97,115,10,71,114,97,115,98,97,104,110,47,110,10,71,114,97,115,98,111,100,100,101,110,47,83,10,103,114,195,164,115,105,103,47,101,110,10,103,114,97,116,105,115,10,103,114,97,117,10,103,114,97,117,101,47,110,10,103,114,97,118,101,110,47,81,82,74,80,90,71,85,86,70,195,156,10,103,114,97,118,101,110,47,113,114,106,112,122,103,117,102,195,188,10,103,114,97,97,118,47,68,87,81,82,74,80,90,71,85,86,70,195,156,10,103,114,111,111,118,47,68,81,82,74,80,90,71,85,86,70,195,156,10,103,114,111,118,101,110,47,81,82,74,80,90,71,85,86,70,195,156,10,71,114,97,118,105,116,97,116,115,99,104,111,111,110,10,71,114,97,118,105,116,97,116,115,99,104,111,111,110,115,102,101,108,100,10,71,114,97,118,105,116,97,116,115,99,104,111,110,115,102,101,108,108,101,114,10,71,114,97,118,105,116,97,116,115,99,104,111,111,110,115,107,114,97,102,116,10,71,114,101,101,112,10,71,114,101,112,101,110,10,71,114,101,101,112,115,108,195,182,195,182,112,10,71,114,101,101,112,115,108,195,182,112,101,110,10,71,114,101,110,122,47,110,10,103,114,101,110,122,101,110,47,65,81,66,74,85,10,103,114,101,110,122,101,110,47,97,113,106,117,10,103,114,101,110,122,47,87,77,79,65,81,66,74,85,10,71,114,101,110,122,102,114,101,113,117,101,110,122,47,110,10,71,114,101,110,122,119,101,101,114,116,47,101,110,10,71,114,101,110,122,119,105,110,107,101,108,10,103,114,101,115,105,103,47,101,110,10,103,114,105,101,110,47,97,65,84,10,103,114,105,101,110,101,110,47,97,116,10,103,114,105,101,112,101,110,47,73,87,65,81,66,82,74,80,84,89,85,86,70,88,10,103,114,105,101,112,101,110,47,97,113,114,106,112,116,121,117,102,120,10,103,114,105,112,112,115,116,47,65,81,66,82,74,80,84,89,85,86,70,88,10,103,114,105,112,112,116,47,65,81,66,82,74,80,84,89,85,86,70,88,10,103,114,101,101,112,47,68,65,81,66,82,74,80,84,89,85,86,70,88,10,103,114,101,112,101,110,47,65,81,66,82,74,80,84,89,85,86,70,88,10,71,114,105,101,112,101,114,47,83,10,103,114,105,101,112,115,99,104,47,101,110,10,103,114,105,101,115,47,101,110,10,103,114,111,102,102,10,103,114,111,118,101,47,110,10,103,114,111,102,102,101,114,47,101,110,10,103,114,111,102,102,115,116,47,101,110,10,103,114,195,182,195,182,110,47,101,110,10,103,114,195,182,195,182,110,47,115,10,71,114,195,182,195,182,110,116,195,188,195,188,99,104,10,103,114,111,111,116,47,101,110,10,103,114,195,182,116,116,101,114,47,101,110,10,103,114,195,182,116,116,115,116,47,101,110,10,103,114,195,182,116,101,110,47,66,10,103,114,195,182,195,182,116,47,66,10,103,114,195,182,116,116,47,66,10,103,114,195,182,116,116,115,116,47,66,10,71,114,111,111,116,98,111,111,107,115,116,97,97,118,47,110,10,71,114,111,111,116,118,97,100,101,114,47,115,10,71,114,111,111,116,118,97,100,100,101,114,47,83,10,71,114,195,182,116,116,47,110,10,103,114,117,109,109,101,108,47,83,10,71,114,117,110,100,102,111,114,109,47,110,10,71,114,117,110,100,10,71,114,195,188,110,110,10,71,114,117,110,100,108,97,97,103,47,110,10,71,114,117,110,100,108,105,101,110,47,110,10,71,114,117,110,100,115,99,104,111,111,108,47,110,10,71,114,117,110,100,119,97,116,101,114,10,103,114,195,188,110,110,101,110,47,73,68,66,10,103,114,195,188,110,100,116,47,77,79,66,10,71,114,117,112,112,47,110,10,71,114,117,117,115,10,71,117,109,109,105,47,83,10,103,195,188,110,116,10,71,195,188,110,116,115,105,101,116,10,71,195,188,110,116,115,105,101,100,101,110,10,103,195,188,110,116,115,105,101,116,115,10,103,195,188,115,116,101,114,110,10,71,121,109,110,97,115,105,117,109,10,71,121,109,110,97,115,105,101,110,10,104,97,97,108,47,115,10,104,97,97,112,47,115,10,104,195,182,195,182,112,47,115,10,72,97,97,115,47,110,10,72,97,99,107,47,110,10,72,97,99,107,101,110,115,116,195,188,116,116,47,110,10,72,97,99,107,101,114,47,83,10,72,97,103,101,108,10,72,97,104,110,47,115,10,72,97,105,10,72,97,107,101,110,47,83,10,104,97,108,98,101,101,114,47,115,10,104,97,108,101,110,47,81,86,85,89,80,74,72,90,75,71,10,104,97,108,101,110,47,113,117,121,112,106,104,122,107,103,10,104,97,97,108,47,68,87,77,79,81,86,85,89,80,74,72,90,75,71,10,104,97,108,102,97,117,116,111,109,97,97,116,115,99,104,47,101,110,10,104,97,108,102,100,195,182,114,115,105,99,104,116,105,103,47,101,110,10,104,97,108,102,10,104,97,108,118,101,10,104,97,108,118,101,110,10,104,97,108,118,105,103,47,101,110,10,72,97,108,102,107,117,103,101,108,10,72,97,108,102,107,117,103,101,108,110,10,72,97,108,102,109,97,97,110,100,10,72,97,108,102,109,97,97,116,10,72,97,108,102,109,101,116,97,108,108,47,110,10,72,195,164,108,102,116,47,110,10,72,97,108,102,116,111,111,110,10,72,97,108,102,119,101,101,114,116,116,105,101,116,10,72,97,108,102,119,101,101,114,116,116,105,101,100,101,110,10,72,97,108,108,47,110,10,72,97,108,108,101,110,115,112,101,101,108,10,72,97,108,108,101,110,115,112,101,108,101,110,10,104,97,108,108,111,10,72,97,108,111,103,101,110,47,110,10,72,97,108,115,47,110,10,72,195,164,108,115,10,72,97,108,115,10,72,195,164,108,115,101,110,47,110,10,72,97,108,116,101,114,47,83,10,72,97,108,116,101,115,116,101,101,100,47,110,10,104,97,108,118,105,103,47,101,110,10,104,97,108,118,105,103,102,101,116,116,47,101,110,10,72,97,109,101,114,47,83,10,72,97,109,101,114,115,109,105,101,116,101,110,10,72,97,109,115,116,101,114,47,83,10,72,97,110,100,98,97,108,108,10,72,97,110,100,98,195,164,108,108,10,72,97,110,100,98,97,108,108,116,111,115,112,101,101,108,10,72,97,110,100,98,97,108,108,116,111,115,112,101,108,101,110,10,72,97,110,100,98,111,111,107,10,72,97,110,100,98,195,182,107,101,114,10,72,97,110,100,100,111,111,107,10,72,97,110,100,100,195,182,107,101,114,10,72,97,110,100,10,72,97,110,110,101,110,10,72,97,110,100,10,72,97,110,110,101,110,10,72,195,164,110,110,10,72,97,110,100,107,97,110,116,47,110,10,72,97,110,100,115,99,104,47,110,10,72,97,110,110,115,99,104,47,110,10,72,97,110,100,115,99,104,111,104,10,72,97,110,100,115,99,104,195,182,104,10,104,97,110,103,101,110,47,73,68,87,77,79,65,81,66,82,74,80,67,85,10,104,97,110,103,101,110,47,97,113,98,114,106,112,99,117,10,104,117,110,103,101,110,47,73,68,65,81,66,82,74,80,67,85,10,72,97,110,110,101,108,10,72,195,164,110,110,101,108,10,104,97,110,110,101,108,110,47,73,68,87,77,79,81,66,74,85,86,10,104,97,110,110,101,108,110,47,113,98,106,117,10,72,97,110,110,101,108,115,112,97,114,116,110,101,114,47,83,10,104,97,110,116,101,101,114,47,115,10,72,97,110,116,101,114,101,114,10,72,97,114,100,119,97,114,101,10,72,97,114,100,119,97,114,101,102,101,104,108,101,114,47,83,10,104,97,114,109,111,111,110,115,99,104,47,101,110,10,72,97,114,110,115,116,111,102,102,10,72,97,114,110,115,195,188,195,188,114,10,104,97,114,116,47,101,110,10,72,97,114,116,47,110,10,72,97,114,116,103,117,109,109,105,115,99,104,105,101,118,47,110,10,104,97,114,116,108,105,99,104,47,101,110,10,72,97,114,118,115,116,10,104,97,117,101,110,47,67,90,82,84,85,195,156,71,86,75,81,88,99,122,114,116,117,195,188,103,107,113,120,10,104,97,117,47,67,90,82,84,85,195,156,71,86,75,81,88,115,10,72,97,117,98,105,116,122,47,110,10,72,97,118,101,110,47,83,10,72,97,118,101,110,116,111,108,108,10,72,97,118,101,110,116,195,182,108,108,10,104,101,10,104,101,98,98,101,110,47,65,70,10,104,101,98,98,101,110,47,97,102,10,104,101,102,102,47,65,70,10,104,101,115,116,47,65,70,10,104,101,116,116,47,65,70,10,104,101,98,98,116,47,65,70,10,104,97,114,114,47,65,70,10,104,97,114,114,115,116,47,65,70,10,104,97,114,114,110,47,65,70,10,104,97,116,116,47,65,70,10,104,101,101,108,47,101,110,10,72,101,101,108,115,99,104,105,114,109,10,72,101,101,108,116,97,108,108,47,110,10,72,101,101,110,47,110,83,10,72,101,101,114,100,47,110,10,104,101,101,116,47,115,10,72,101,101,118,115,99,104,114,117,118,101,114,47,83,10,72,101,105,109,97,116,10,72,101,105,109,97,116,111,111,114,116,10,72,101,105,109,97,116,195,182,195,182,100,10,104,101,105,114,97,100,101,110,47,65,74,86,88,10,104,101,105,114,97,100,101,110,47,97,106,120,10,104,101,105,114,97,97,100,47,68,87,77,79,65,74,86,88,10,72,101,107,116,97,114,10,72,101,108,100,47,110,10,72,101,108,105,117,109,10,104,101,108,108,47,101,110,10,104,101,108,108,101,114,47,101,110,10,104,101,108,108,115,116,47,101,110,10,104,101,108,108,101,110,47,73,68,87,77,79,80,10,104,101,108,108,101,110,47,112,10,72,101,108,108,105,103,107,101,105,116,47,110,10,104,101,108,112,101,110,47,73,68,87,81,66,80,85,113,112,117,10,104,111,108,112,47,81,66,80,85,10,104,111,108,112,115,116,47,81,66,80,85,10,104,111,108,112,47,81,66,80,85,10,104,111,108,112,101,110,47,81,66,80,85,10,104,117,108,112,101,110,47,81,66,80,85,10,72,101,108,112,101,114,47,83,10,72,101,109,100,47,110,10,104,101,110,10,72,101,110,119,105,101,115,47,110,10,72,101,110,119,105,101,115,101,114,47,83,10,104,101,114,10,72,101,114,114,47,110,10,72,101,114,114,110,10,72,101,114,114,115,99,104,97,102,116,47,110,10,104,101,10,115,105,101,110,10,101,109,10,101,104,114,10,104,101,116,101,110,10,104,101,101,116,47,68,77,79,10,72,101,118,101,108,47,83,10,72,101,118,101,110,10,104,101,118,101,110,47,65,82,80,90,75,71,85,86,88,10,104,101,118,101,110,47,97,114,112,122,107,103,117,118,120,10,104,101,101,118,47,68,87,77,79,65,82,80,90,75,71,85,86,88,10,72,101,118,101,110,195,164,113,117,97,116,111,114,10,72,101,118,101,110,110,111,111,114,100,112,111,111,108,10,72,101,118,101,110,115,195,188,195,188,100,112,111,111,108,10,72,101,120,47,110,10,104,101,120,97,100,101,122,105,109,97,97,108,47,101,110,10,72,101,120,97,100,101,122,105,109,97,97,108,116,101,107,101,110,47,83,10,104,101,120,97,100,101,122,105,109,97,108,47,101,110,10,72,101,120,97,100,101,122,105,109,97,108,116,97,108,108,47,110,10,72,101,120,101,114,101,101,10,104,105,101,114,10,104,105,101,114,97,114,99,104,39,115,99,104,47,101,110,10,72,105,101,114,97,114,99,104,105,101,47,110,10,104,105,101,114,97,114,99,104,105,115,99,104,47,101,110,10,104,105,101,114,104,101,110,10,104,105,108,100,10,72,105,109,109,101,108,10,72,105,110,110,101,114,47,110,10,104,105,110,110,101,114,110,47,73,68,87,77,79,66,86,10,72,105,110,110,101,114,110,105,115,47,110,10,72,105,110,110,101,114,110,105,115,45,80,97,114,99,111,117,114,115,10,72,105,110,110,101,114,110,105,115,114,101,110,110,101,110,47,83,10,72,105,115,116,111,103,114,97,109,109,47,110,10,104,105,115,116,111,111,114,115,99,104,47,101,110,10,72,105,115,116,111,114,105,101,10,72,105,115,116,111,114,105,107,101,114,47,83,10,104,105,116,116,47,101,110,10,104,105,116,116,101,114,47,101,110,10,104,105,116,116,115,116,47,101,110,10,72,105,116,116,10,104,195,182,100,101,110,47,66,74,86,10,104,195,182,100,101,110,47,98,106,118,10,104,195,182,195,182,100,47,87,66,74,86,10,104,195,182,100,100,101,110,47,73,68,87,66,74,86,10,72,111,102,102,10,72,195,182,195,182,118,10,104,195,182,103,101,110,10,104,195,182,195,182,103,47,68,87,10,72,195,182,104,108,47,110,10,72,195,182,107,101,114,47,83,10,104,111,108,108,10,104,111,108,108,101,110,47,65,81,66,82,74,80,84,89,67,85,86,70,10,104,111,108,108,101,110,47,97,113,114,106,112,116,121,99,117,102,10,104,111,111,108,47,68,87,65,81,66,82,74,80,84,89,67,85,86,70,10,104,195,182,108,108,115,116,47,65,81,66,82,74,80,84,89,67,85,86,70,10,104,195,182,108,108,116,47,65,81,66,82,74,80,84,89,67,85,86,70,10,104,101,101,108,47,68,65,81,66,82,74,80,84,89,67,85,86,70,10,104,101,108,101,110,47,65,81,66,82,74,80,84,89,67,85,86,70,10,104,111,108,108,116,10,104,111,108,108,101,110,10,109,105,116,104,111,111,108,47,68,87,10,72,111,108,108,101,114,47,83,10,72,195,182,108,112,10,104,195,182,108,112,115,99,104,47,101,110,10,104,195,182,108,116,101,110,47,101,110,10,72,111,108,116,10,72,195,182,108,116,101,114,10,72,111,108,116,115,107,105,10,72,111,108,116,115,107,105,101,114,10,72,111,108,116,115,108,195,164,103,101,114,47,83,10,72,111,110,110,105,103,10,72,195,182,195,182,99,104,100,47,101,110,10,72,111,111,99,104,100,114,117,99,107,114,101,98,101,101,116,10,72,111,99,104,100,114,117,99,107,114,101,98,101,100,101,110,10,72,111,111,99,104,102,111,114,109,97,116,47,110,10,104,111,111,99,104,10,104,111,103,101,47,110,10,104,195,182,103,101,114,47,101,110,10,104,195,182,195,182,99,104,115,116,47,101,110,10,104,111,111,99,104,107,97,110,116,10,72,111,111,99,104,107,111,109,109,97,47,83,10,72,111,111,99,104,110,101,118,101,108,10,72,111,111,99,104,112,97,115,115,10,72,111,111,99,104,115,99,104,111,111,108,47,110,10,72,111,111,99,104,115,99,104,111,111,108,119,101,115,101,110,10,72,111,111,99,104,115,112,114,117,110,103,10,72,111,111,99,104,115,112,114,195,188,110,103,10,72,111,111,99,104,115,112,114,117,110,103,109,97,116,116,47,110,10,72,111,111,99,104,119,97,116,101,114,10,72,111,111,102,10,72,111,118,101,110,10,72,111,111,102,107,114,111,111,110,10,72,111,111,102,107,114,111,110,101,110,10,104,195,182,195,182,102,116,10,72,195,182,195,182,102,116,10,72,195,182,195,182,102,116,97,110,103,114,105,101,112,101,114,47,83,10,72,195,182,195,182,102,116,97,110,103,114,105,101,112,101,114,115,99,104,101,47,110,10,72,195,182,195,182,102,116,100,101,101,108,47,110,10,72,195,182,195,182,102,116,102,101,110,115,116,101,114,47,110,10,72,195,182,195,182,102,116,115,97,97,107,47,110,10,72,97,117,112,116,115,97,97,107,47,110,10,72,195,182,195,182,102,116,115,116,97,100,116,10,72,195,182,195,182,102,116,115,116,195,164,100,101,114,10,104,195,182,195,182,103,47,115,10,104,111,111,112,47,115,10,104,195,182,195,182,114,47,115,10,104,195,182,195,182,114,98,111,114,47,101,110,10,72,111,111,114,10,72,111,114,101,110,10,72,111,111,114,110,10,72,195,182,195,182,114,110,10,72,195,182,195,182,114,110,10,72,195,182,114,110,101,110,10,104,111,111,115,116,47,115,10,72,111,111,116,10,72,195,182,195,182,116,10,72,111,112,101,110,47,83,10,104,195,182,114,101,110,47,65,70,74,80,84,89,67,86,88,10,104,195,182,114,101,110,47,97,102,106,112,116,121,99,118,120,10,104,195,182,195,182,114,47,68,87,77,79,65,70,74,80,84,89,67,86,88,10,72,195,182,114,101,114,47,83,10,84,111,104,195,182,114,101,114,47,83,10,72,195,188,108,112,10,72,195,188,108,112,101,114,47,83,10,72,195,188,108,112,112,114,111,103,114,97,109,109,47,110,10,72,117,109,109,101,108,10,72,117,109,109,101,108,110,10,72,117,110,100,10,72,117,110,110,101,110,10,72,117,110,103,101,114,10,104,117,110,103,114,105,103,47,101,110,10,104,117,110,103,114,105,103,101,114,47,101,110,10,72,117,112,101,110,47,83,10,104,195,188,112,112,101,110,47,73,68,87,77,79,82,88,10,104,195,188,112,112,101,110,47,114,120,10,72,195,188,116,116,47,110,10,104,117,117,108,47,115,10,72,117,117,115,100,195,182,195,182,114,47,110,10,72,117,117,115,102,114,111,10,72,117,117,115,102,114,111,111,110,115,10,72,117,117,115,104,111,108,108,116,10,72,117,117,115,104,111,108,100,101,110,10,72,117,117,115,10,72,195,188,195,188,115,10,65,114,109,101,110,104,117,117,115,10,65,114,109,101,110,104,195,188,195,188,115,10,72,117,117,115,111,112,103,97,97,118,47,110,10,72,117,117,116,10,104,195,188,195,188,116,10,72,121,103,105,101,101,110,10,72,121,112,101,114,98,101,108,47,110,10,72,121,112,110,111,111,115,10,72,121,112,110,111,115,101,110,10,104,121,112,110,111,111,116,115,99,104,47,101,110,10,104,121,112,110,111,116,105,115,101,101,114,47,115,10,73,68,10,105,100,101,97,108,47,101,110,10,73,100,101,101,10,73,100,101,101,110,10,73,100,101,110,116,105,102,105,107,97,116,115,99,104,111,111,110,47,110,10,73,100,101,110,116,105,116,195,164,116,47,110,10,73,101,115,10,73,101,115,98,97,104,110,47,110,10,73,101,115,101,110,10,73,101,115,101,110,98,97,104,110,47,110,10,73,101,115,101,110,107,97,114,110,10,73,101,115,104,111,99,107,101,121,10,73,101,115,104,111,99,107,101,121,102,101,108,100,10,73,101,115,104,111,99,107,101,121,102,101,108,108,101,114,10,73,101,115,107,114,105,115,116,97,108,108,101,110,47,110,10,73,101,115,114,101,103,101,110,10,105,103,110,111,114,101,101,114,47,115,10,105,107,10,100,117,10,104,101,10,115,101,10,100,97,116,10,119,105,10,115,105,10,115,101,10,109,105,101,110,47,101,110,10,100,105,101,110,47,101,110,10,115,105,101,110,47,101,110,10,101,104,114,10,117,110,115,10,106,111,111,110,10,115,101,101,104,114,10,115,101,101,104,114,110,10,109,105,10,100,105,10,101,109,10,115,101,10,117,110,115,10,106,111,10,106,195,188,109,10,106,101,109,10,109,97,110,10,105,108,108,101,103,97,108,47,101,110,10,73,109,109,47,110,10,73,109,109,105,115,99,104,111,111,110,47,110,10,73,109,112,108,105,107,97,116,115,99,104,111,111,110,47,110,10,105,109,112,108,105,122,101,101,114,47,110,10,105,109,112,108,105,122,105,116,47,101,110,10,73,109,112,111,114,116,47,110,10,105,109,112,111,114,116,101,101,114,47,115,10,73,109,112,111,114,116,102,105,108,116,101,114,47,83,10,105,110,10,105,110,39,110,10,105,110,39,116,10,105,110,97,107,116,105,118,47,101,110,10,105,110,98,101,116,116,47,115,10,105,110,98,101,116,116,98,111,114,47,101,110,10,73,110,100,101,120,47,110,10,73,110,100,101,120,102,101,104,108,101,114,47,83,10,73,110,100,105,97,110,101,114,47,83,10,73,110,100,105,103,111,10,105,110,100,105,114,101,107,116,47,101,110,10,105,110,100,105,122,101,101,114,47,115,10,73,110,100,114,97,103,10,73,110,100,114,195,164,195,164,103,10,73,110,100,117,115,116,114,105,101,10,73,110,100,117,115,116,114,105,101,110,10,105,110,100,117,115,116,114,105,101,108,108,47,101,110,10,73,110,102,97,110,116,101,114,105,101,10,73,110,102,108,111,111,103,10,73,110,102,108,195,182,195,182,103,10,73,110,102,111,10,73,110,102,111,47,83,10,73,110,102,111,102,101,108,100,10,73,110,102,111,102,101,108,108,101,114,10,73,110,102,111,102,101,110,115,116,101,114,47,110,10,105,110,102,195,182,195,182,103,47,115,10,73,110,102,111,114,109,97,116,97,115,99,104,111,111,110,47,110,10,73,110,102,114,97,115,116,114,117,107,116,117,114,10,73,110,103,97,97,118,47,110,10,73,110,103,97,110,103,10,73,110,103,195,164,110,103,10,105,110,103,114,101,110,122,47,115,10,73,110,104,111,108,116,10,73,110,104,111,108,100,101,110,10,105,110,105,116,105,97,108,105,115,101,101,114,47,115,10,73,110,107,97,109,101,110,10,73,110,107,111,111,112,10,73,110,107,195,182,195,182,112,10,73,110,108,101,115,101,114,47,83,10,73,110,114,117,108,108,101,110,10,73,110,115,97,97,103,10,73,110,115,97,103,101,110,10,73,110,115,99,104,114,105,102,116,47,110,10,73,110,115,101,108,10,73,110,115,101,108,110,10,105,110,115,116,10,73,110,115,116,97,108,108,97,116,115,99,104,111,111,110,47,110,10,105,110,115,116,97,108,108,101,101,114,47,115,10,73,110,115,116,97,110,100,10,73,110,115,116,195,164,110,110,10,73,110,115,116,101,101,107,47,83,10,105,110,115,116,101,108,108,98,111,114,47,101,110,10,73,110,115,116,105,116,117,116,47,110,10,73,110,115,116,114,117,107,115,99,104,111,111,110,47,110,10,73,110,116,101,103,114,97,108,47,110,10,73,110,116,101,103,114,97,116,115,99,104,111,111,110,47,110,10,105,110,116,101,103,114,101,101,114,47,115,10,73,110,116,101,103,114,105,116,195,164,116,10,105,110,116,101,108,108,101,107,116,117,101,108,108,47,101,110,10,73,110,116,101,110,115,105,116,195,164,116,47,110,10,105,110,116,101,110,115,105,118,47,101,110,10,73,110,116,101,114,97,107,115,99,104,111,111,110,47,110,10,105,110,116,101,114,97,107,116,105,118,47,101,110,10,105,110,116,101,114,101,115,115,101,101,114,47,115,10,73,110,116,101,114,102,101,114,101,110,122,47,110,10,105,110,116,101,114,110,47,101,110,10,105,110,116,101,114,110,97,116,115,99,104,111,110,97,97,108,47,101,110,10,73,110,116,101,114,110,101,116,10,105,110,116,101,114,112,108,97,110,101,116,111,111,114,115,99,104,47,101,110,10,73,110,116,101,114,112,114,101,116,101,114,47,83,10,73,110,116,101,114,114,117,112,116,47,83,10,105,110,116,101,114,115,116,101,108,108,111,111,114,47,101,110,10,73,110,116,114,101,115,115,47,110,10,105,110,116,114,101,115,115,97,110,116,47,101,110,10,105,110,116,114,101,115,115,97,110,116,101,114,47,101,110,10,105,110,116,114,101,115,115,97,110,116,101,115,116,47,101,110,10,105,110,116,114,101,115,115,101,101,114,47,115,10,73,110,116,114,101,115,115,101,110,103,114,117,112,112,47,110,10,105,110,118,101,114,115,47,101,110,10,105,110,118,101,115,116,101,101,114,47,115,10,73,110,119,97,104,110,101,114,47,83,10,73,110,119,97,104,110,101,114,116,97,108,108,47,110,10,105,110,119,97,114,116,115,10,73,111,110,105,115,97,116,115,99,104,111,111,110,47,110,10,73,111,110,105,115,97,116,115,99,104,111,111,110,115,101,110,101,114,103,105,101,47,110,10,105,111,110,105,115,101,101,114,47,115,10,73,114,111,110,105,101,10,105,114,111,111,110,115,99,104,47,101,110,10,105,115,10,105,115,39,110,10,73,115,111,98,97,114,47,110,10,105,115,111,108,101,101,114,116,47,101,110,10,73,115,111,116,111,112,47,110,10,106,97,10,106,97,97,103,47,67,89,90,84,71,86,75,88,73,68,87,115,10,106,97,103,101,110,47,10,99,121,122,116,103,107,120,10,74,97,99,107,47,110,10,74,97,103,101,114,47,83,10,74,97,103,101,114,115,108,195,188,195,188,100,10,74,97,110,117,111,114,10,70,101,98,114,117,111,114,10,77,195,164,114,122,10,65,112,114,105,108,10,77,97,105,10,74,117,110,105,10,74,117,108,105,10,65,117,103,117,115,116,10,83,101,112,116,101,109,98,101,114,10,79,107,116,111,98,101,114,10,78,111,118,101,109,98,101,114,10,68,101,122,101,109,98,101,114,10,106,101,10,106,101,101,100,101,101,110,10,106,101,100,101,10,106,101,100,101,110,10,106,101,100,101,114,10,106,101,100,101,116,10,106,105,10,106,105,98,98,101,108,110,47,73,68,87,66,86,88,10,106,105,98,98,101,108,110,47,120,10,106,105,99,104,116,101,110,115,10,106,105,99,104,116,101,110,115,101,101,110,10,106,105,99,104,116,101,110,115,119,97,110,110,10,106,105,99,104,116,101,110,115,119,97,116,10,106,105,99,104,116,101,110,115,119,111,10,74,105,101,112,101,114,10,106,111,10,74,111,104,114,47,110,10,74,111,104,114,100,97,103,10,74,111,104,114,104,117,110,110,101,114,116,10,106,111,110,103,108,101,101,114,47,115,10,74,195,182,195,182,103,100,10,106,195,182,195,182,107,47,115,10,74,111,117,114,110,97,108,105,115,116,47,110,10,74,111,121,115,116,105,99,107,47,83,10,74,117,100,111,10,74,117,100,111,109,97,116,116,47,110,10,106,195,188,109,10,106,195,188,109,101,104,114,10,106,195,188,109,109,101,114,47,83,10,195,188,109,109,101,114,10,106,117,109,112,101,110,47,115,65,81,82,89,67,74,80,90,75,71,84,86,70,88,10,106,117,109,112,101,110,47,97,113,114,121,99,106,112,122,107,103,116,118,102,120,10,74,117,110,103,47,83,10,74,117,110,103,101,110,115,10,106,195,188,115,116,10,106,195,188,115,116,115,111,10,74,117,117,100,10,74,117,100,101,110,10,106,117,117,100,115,99,104,47,101,110,10,107,97,97,107,47,74,65,82,84,85,80,72,66,70,86,81,115,10,107,97,107,101,110,47,106,97,114,116,117,112,104,102,113,10,107,97,97,107,47,115,10,75,97,97,107,108,101,112,101,108,47,83,10,75,97,99,104,101,108,47,110,10,107,97,99,104,101,108,47,115,74,85,10,75,97,102,102,101,101,10,75,97,104,108,101,110,100,105,111,120,105,100,10,75,97,104,108,101,110,109,111,110,111,120,105,100,10,75,97,104,108,101,110,119,97,116,101,114,115,116,111,102,102,10,75,97,106,97,107,10,75,97,107,97,111,10,107,97,107,101,110,100,105,103,10,75,97,108,101,110,110,101,114,47,83,10,75,108,101,110,110,101,114,47,83,10,107,97,108,105,98,114,101,101,114,47,115,10,107,97,109,101,110,47,65,66,82,72,80,90,75,71,89,67,85,86,70,88,76,10,107,97,109,101,110,47,97,114,104,112,122,107,103,121,99,117,102,120,108,10,107,97,97,109,47,87,65,66,82,72,80,90,75,71,89,67,85,86,70,88,76,10,107,101,101,109,47,68,65,66,82,72,80,90,75,71,89,67,85,86,70,88,76,10,107,101,109,101,110,47,65,66,82,72,80,90,75,71,89,67,85,86,70,88,76,10,107,117,109,109,47,68,87,65,66,82,72,80,90,75,71,89,67,85,86,70,88,76,10,107,97,109,101,110,10,104,111,111,99,104,107,97,109,101,110,47,73,68,87,10,75,97,109,101,114,47,110,10,75,97,109,101,114,97,47,83,10,107,195,164,109,109,47,82,85,71,72,115,10,107,195,164,109,109,101,110,47,114,117,103,104,10,75,97,109,109,10,75,195,164,109,109,10,75,97,109,112,102,108,97,97,103,10,75,97,109,112,102,108,195,164,195,164,103,47,110,10,75,97,109,112,102,108,101,103,101,114,47,83,10,75,97,109,112,103,101,114,105,99,104,116,47,110,10,75,97,109,112,106,101,116,47,83,10,75,97,109,112,114,105,99,104,116,101,114,47,83,10,75,97,109,112,114,105,99,104,116,101,114,115,99,104,101,47,110,10,75,97,109,112,115,112,111,114,116,10,75,97,110,97,108,47,83,10,75,97,110,105,110,107,47,110,10,75,97,110,116,47,110,10,75,97,110,116,195,188,102,102,101,108,47,110,10,75,97,110,116,195,188,102,102,101,108,47,83,10,75,97,110,117,47,83,10,75,97,112,105,116,101,108,47,83,10,107,97,112,115,101,108,47,115,10,105,110,107,97,112,115,101,108,47,115,10,75,97,112,115,101,108,10,75,97,112,115,101,108,110,10,107,97,112,115,101,108,110,47,73,68,87,77,79,81,74,86,10,107,97,112,115,101,108,110,47,113,106,10,75,97,112,116,101,105,110,47,83,10,75,97,112,116,101,105,110,115,99,104,101,47,110,10,75,97,112,117,117,122,47,110,10,75,97,114,97,116,101,10,75,97,114,97,116,101,107,97,47,83,10,75,97,114,107,47,110,10,75,97,114,107,47,110,10,75,97,114,107,104,111,102,102,10,75,97,114,107,104,195,182,195,182,118,10,107,97,114,107,108,105,99,104,47,101,110,10,75,97,114,110,47,83,10,75,97,114,110,101,110,101,114,103,105,101,10,75,97,114,110,102,117,115,99,104,111,111,110,47,83,10,75,97,114,110,107,114,97,102,116,119,97,114,107,47,101,110,10,75,97,114,110,115,109,195,182,108,116,101,110,47,83,10,75,97,115,115,98,101,101,114,47,110,10,75,97,114,115,98,101,101,114,47,110,10,75,97,115,115,101,110,10,75,97,115,116,101,110,10,75,97,115,115,101,116,116,47,110,10,75,97,115,116,101,110,47,83,10,75,97,116,97,108,111,103,47,110,10,75,97,116,97,108,121,115,97,116,101,114,47,83,10,75,97,116,97,115,116,114,111,111,102,10,75,97,116,97,115,116,114,111,102,101,110,10,75,97,116,101,103,111,114,105,101,47,110,10,75,97,116,101,114,47,83,10,107,97,116,104,111,111,108,115,99,104,47,101,110,10,75,97,116,116,47,110,10,75,97,116,116,101,107,101,114,47,83,10,75,97,117,98,111,110,116,106,101,47,83,10,107,97,117,101,110,47,73,68,87,77,79,81,65,82,71,84,85,70,10,107,97,117,101,110,47,111,113,97,114,103,116,117,102,10,75,97,117,103,117,109,109,105,47,83,10,75,97,118,101,108,47,83,10,75,195,164,118,101,114,10,107,66,10,75,101,101,100,47,110,10,107,101,101,110,47,101,110,10,107,101,101,110,101,101,110,10,75,101,101,114,108,47,83,10,75,101,101,115,10,107,101,104,114,101,110,47,73,68,87,77,79,81,66,74,85,86,10,107,101,104,114,101,110,47,81,74,85,10,75,101,108,108,47,110,10,75,101,108,108,101,114,10,107,101,108,116,115,99,104,47,101,110,10,107,101,110,110,47,115,66,85,86,10,75,101,114,97,109,105,107,47,110,10,75,101,114,110,101,108,47,83,10,107,101,116,116,101,108,47,82,115,10,107,101,116,116,101,108,110,47,114,10,107,101,116,116,101,108,105,103,47,101,110,10,107,72,122,10,107,105,101,107,101,110,47,73,68,87,65,81,66,82,74,72,84,89,67,85,86,88,10,107,105,101,107,101,110,47,97,113,114,106,104,116,121,99,117,120,10,107,101,101,107,47,68,65,81,66,82,74,72,84,89,67,85,86,88,10,107,101,107,101,110,47,65,81,66,82,74,72,84,89,67,85,86,88,10,75,105,101,107,101,114,47,83,10,75,105,101,107,103,108,97,115,10,75,105,101,107,103,108,195,164,115,101,114,10,75,105,101,107,114,105,99,104,116,47,110,10,75,105,101,107,114,111,104,114,10,75,105,101,107,119,105,110,107,101,108,10,75,105,101,108,47,110,10,107,105,101,118,105,103,47,101,110,10,75,105,108,111,47,83,10,75,105,108,111,109,101,116,101,114,47,83,10,75,105,109,109,10,75,105,110,100,10,75,105,110,110,101,114,10,75,105,110,110,101,114,115,10,75,105,110,110,10,75,105,110,110,101,114,103,111,111,114,110,47,83,10,75,105,110,110,114,101,101,109,47,83,10,75,105,110,111,47,83,10,107,105,112,112,101,110,47,73,68,87,77,79,81,65,82,72,90,75,71,84,85,86,88,195,156,10,107,105,112,112,101,110,47,113,97,114,104,122,107,103,116,117,120,195,188,10,75,105,115,116,47,110,10,75,108,97,97,103,47,110,10,107,108,97,97,103,47,115,65,66,82,74,71,86,88,10,107,108,97,103,101,110,47,97,114,106,103,120,10,107,108,97,109,109,101,114,110,47,73,68,87,77,79,65,74,84,85,10,107,108,97,109,109,101,114,110,47,97,106,116,117,10,75,108,97,109,112,47,110,10,75,108,97,110,103,10,75,108,195,164,110,103,10,75,108,97,112,112,47,110,10,107,108,97,112,112,101,110,47,73,68,87,77,79,81,74,80,84,85,88,10,107,108,97,112,112,101,110,47,113,106,112,116,117,120,10,107,108,97,112,112,101,114,47,115,81,10,107,108,97,112,112,101,114,47,113,10,75,108,97,112,112,114,101,101,107,110,101,114,47,83,10,75,108,97,115,115,47,110,10,107,108,97,115,115,39,115,99,104,47,101,110,10,75,108,97,115,115,105,107,10,107,108,97,116,116,101,114,110,47,73,68,87,77,79,66,82,72,90,75,71,84,70,88,10,107,108,97,116,116,101,114,110,47,114,104,122,107,103,116,102,120,10,107,108,97,117,47,115,10,75,108,101,100,97,97,115,99,104,10,107,108,101,101,100,47,115,65,66,74,85,86,195,156,10,107,108,101,100,101,110,47,97,106,117,118,195,188,10,75,108,101,101,100,10,107,108,101,101,110,47,101,110,10,75,108,101,109,109,47,110,10,75,108,101,118,101,114,47,83,10,75,108,101,118,101,114,98,108,97,116,116,10,75,108,101,118,101,114,98,108,195,164,100,101,114,10,75,108,101,118,101,114,118,101,101,114,10,75,108,105,99,107,47,83,10,107,108,105,99,107,47,115,10,97,110,107,108,105,99,107,47,115,10,107,108,105,99,107,47,115,65,82,74,88,10,107,108,105,99,107,101,110,47,97,114,106,120,10,75,108,105,109,97,10,75,108,105,110,103,47,110,10,107,108,105,110,103,101,108,47,65,115,10,107,108,105,110,103,101,108,110,47,97,10,75,108,105,110,107,47,110,10,75,108,111,47,83,10,75,108,111,99,107,47,110,10,75,108,195,182,110,101,114,47,83,10,107,108,111,111,107,47,101,110,10,107,108,195,182,195,182,110,47,115,85,10,75,108,111,111,110,10,75,108,111,110,101,110,10,75,108,195,182,195,182,110,115,110,97,99,107,47,83,10,107,108,111,111,114,47,101,110,10,75,108,195,182,195,182,114,47,110,10,75,108,111,111,114,97,110,108,97,97,103,47,110,10,75,108,111,111,114,116,101,120,116,10,75,108,111,111,116,10,75,108,195,182,116,101,110,10,107,108,111,112,112,47,65,85,71,80,86,75,81,88,115,10,107,108,111,112,112,101,110,47,97,117,103,112,107,113,120,10,107,108,111,114,101,110,47,81,80,86,70,10,107,108,111,114,101,110,47,113,112,102,10,107,108,111,111,114,47,68,87,77,79,81,80,86,70,10,75,108,117,109,112,101,110,10,75,108,117,109,112,10,75,108,195,188,109,112,10,75,108,117,117,116,10,75,108,195,188,116,101,110,10,75,110,97,107,101,110,10,107,110,97,108,108,47,67,90,82,84,70,75,81,88,115,10,99,122,114,116,102,107,113,120,10,107,110,97,112,112,47,101,110,10,75,110,101,99,104,116,47,110,10,75,110,101,101,47,110,10,75,110,101,101,112,111,108,115,116,101,114,47,83,10,75,110,105,101,102,10,75,110,105,101,118,101,110,10,107,110,105,101,112,101,110,47,73,87,81,66,82,84,10,107,110,105,101,112,101,110,47,113,114,116,10,107,110,105,112,112,115,116,47,81,66,82,84,10,107,110,105,112,112,116,47,81,66,82,84,10,107,110,101,101,112,47,68,81,66,82,84,10,107,110,101,112,101,110,47,81,66,82,84,10,75,110,105,112,112,47,110,10,107,110,105,112,112,101,110,47,73,68,87,77,79,10,107,110,105,112,115,101,110,47,73,68,87,77,79,10,75,110,111,111,112,10,75,110,195,182,195,182,112,10,75,110,111,111,112,10,75,110,195,182,195,182,112,10,75,110,195,182,195,182,118,10,107,110,195,188,112,112,101,110,47,73,68,87,77,79,65,81,74,84,86,195,156,10,107,110,195,188,112,112,101,110,47,111,97,113,106,116,195,188,10,75,110,195,188,116,116,47,110,10,75,111,97,108,105,116,115,99,104,111,111,110,47,110,10,107,111,100,101,101,114,47,115,10,75,111,100,101,107,47,83,10,75,111,100,101,10,75,111,100,101,110,10,75,111,100,101,114,101,114,47,83,10,75,111,101,102,102,105,122,105,101,110,116,47,110,10,75,111,102,102,101,105,110,10,75,111,102,102,101,114,47,83,10,75,111,102,102,101,114,114,117,117,109,10,75,111,102,102,101,114,114,195,188,195,188,109,10,75,111,102,102,105,101,10,75,111,104,10,75,195,182,104,10,75,111,104,108,10,107,195,182,104,108,47,101,110,10,107,195,182,104,108,101,110,47,85,81,73,68,87,79,77,117,113,10,107,195,182,104,108,105,103,47,101,110,10,75,195,182,104,108,115,99,104,97,112,112,10,75,195,182,104,108,115,99,104,195,164,112,112,10,75,111,107,101,110,10,75,111,108,108,105,110,101,111,114,47,101,110,10,75,111,108,108,105,115,99,104,111,111,110,47,110,10,75,111,109,98,105,110,97,116,115,99,104,111,111,110,47,110,10,107,111,109,98,105,110,101,101,114,47,115,10,75,111,109,101,116,47,110,10,75,111,109,109,97,47,83,10,107,111,109,109,101,110,116,101,114,101,110,47,82,74,71,85,88,10,107,111,109,109,101,110,116,101,114,101,110,47,114,106,103,117,120,10,107,111,109,109,101,110,116,101,101,114,47,68,87,77,79,82,74,71,85,88,10,75,111,109,109,101,110,116,111,114,47,110,10,75,111,109,109,105,115,99,104,111,111,110,10,107,111,109,109,111,100,105,103,47,101,110,10,107,111,109,109,111,111,100,47,101,110,10,75,111,109,109,111,111,100,47,110,10,75,111,109,109,117,110,105,107,97,116,115,99,104,111,111,110,47,110,10,107,111,109,109,117,110,105,122,101,101,114,47,115,10,75,111,109,112,97,107,116,47,101,110,10,107,111,109,112,97,107,116,47,101,110,10,107,111,109,112,97,107,116,101,114,47,101,110,10,107,111,109,112,97,107,116,115,116,47,101,110,10,75,111,109,112,97,115,115,47,110,10,107,111,109,112,97,116,105,98,101,108,10,107,111,109,112,97,116,105,98,108,101,10,107,111,109,112,97,116,105,98,101,108,110,10,75,111,109,112,97,116,105,98,105,108,105,116,195,164,116,47,110,10,107,111,109,112,105,108,101,101,114,47,115,74,10,75,111,109,112,105,108,101,114,101,114,47,83,10,107,111,109,112,108,101,116,116,47,101,110,10,107,111,109,112,108,101,116,116,101,114,101,110,10,107,111,109,112,108,101,116,116,101,101,114,47,68,87,77,79,10,75,111,109,112,111,110,101,110,116,47,110,10,75,111,109,112,114,101,115,115,101,114,47,83,10,107,111,109,112,114,105,109,101,101,114,47,115,10,107,195,182,110,101,110,47,81,10,107,97,110,110,47,81,10,107,97,110,110,115,116,47,81,10,107,195,182,195,182,110,116,47,81,10,107,117,110,110,101,110,47,73,68,87,77,79,81,10,75,111,110,102,101,114,101,110,122,47,110,10,75,111,110,102,108,105,107,116,47,110,10,75,195,182,110,105,103,10,75,195,182,110,105,103,105,110,10,75,195,182,110,105,103,105,110,110,101,110,10,75,111,110,106,117,103,97,116,115,99,104,111,111,110,47,110,10,107,111,110,106,117,103,101,101,114,47,115,10,75,111,110,106,117,110,107,115,99,104,111,111,110,47,110,10,75,111,110,115,111,111,108,47,110,10,75,111,110,115,116,97,110,116,47,110,10,75,111,110,115,116,101,108,108,97,116,115,99,104,111,111,110,47,110,10,107,111,110,115,116,114,117,101,101,114,47,115,10,75,111,110,115,116,114,117,107,115,99,104,111,111,110,47,110,10,75,111,110,115,116,114,117,107,116,101,114,47,83,10,75,111,110,116,97,107,116,47,110,10,107,111,110,116,97,107,116,101,101,114,47,115,10,75,111,110,116,97,109,105,110,97,116,115,99,104,111,111,110,47,83,10,75,111,110,116,101,120,116,47,110,10,75,111,110,116,105,110,101,110,116,47,110,10,75,111,110,116,111,47,83,10,75,111,110,116,111,114,47,110,10,75,111,110,116,111,116,121,112,47,110,10,75,111,110,116,114,97,115,116,47,110,10,75,111,110,116,114,111,108,108,116,111,111,114,110,47,83,10,75,111,110,118,101,110,116,115,99,104,111,111,110,47,83,10,75,111,110,118,101,114,115,99,104,111,111,110,47,83,10,107,111,110,118,101,114,116,101,101,114,47,115,10,107,111,110,118,101,120,47,101,110,10,107,111,110,122,101,110,116,101,114,115,99,104,47,101,110,10,75,195,182,195,182,107,47,110,10,75,111,111,107,106,101,47,83,10,75,111,111,108,116,102,114,111,110,116,10,107,111,111,108,116,10,107,111,108,101,47,110,10,107,195,182,108,108,101,114,47,101,110,10,107,195,182,195,182,108,115,116,47,101,110,10,75,111,111,112,10,75,195,182,195,182,112,10,75,111,111,112,109,97,110,110,10,75,111,111,112,108,195,188,195,188,100,10,75,111,111,114,100,105,110,97,97,116,47,110,10,75,111,111,114,110,10,75,111,111,114,110,98,108,111,111,109,10,75,111,111,114,110,98,108,111,109,101,110,10,75,111,111,114,110,98,114,97,110,100,119,105,101,110,10,75,111,111,114,116,47,101,110,10,75,111,111,114,116,101,110,115,112,105,108,108,47,83,10,111,100,101,114,10,75,111,111,114,116,101,110,115,112,101,101,108,47,110,10,107,111,112,101,101,114,47,115,10,107,195,182,112,101,110,47,65,81,74,80,84,86,70,88,10,107,195,182,112,101,110,47,97,113,106,112,116,102,120,10,107,195,182,195,182,112,47,87,65,81,74,80,84,86,70,88,10,107,195,182,102,102,47,68,87,65,81,74,80,84,86,70,88,10,107,195,182,102,102,101,110,47,65,81,74,80,84,86,70,88,10,75,111,112,105,101,47,110,10,75,111,112,112,101,108,47,83,10,107,111,112,112,101,108,47,115,65,81,74,84,85,86,195,156,10,107,111,112,112,101,108,110,47,97,113,106,116,117,195,188,10,75,111,112,112,104,195,182,114,101,114,47,83,10,75,111,112,112,10,75,195,182,112,112,10,75,111,112,112,107,195,188,115,115,101,110,47,83,10,75,111,112,112,114,101,101,103,47,110,10,75,195,182,114,98,115,10,75,195,182,114,98,115,101,110,10,107,195,182,114,101,110,10,105,114,114,63,10,75,111,114,102,98,97,108,108,10,75,111,114,102,98,195,164,108,108,10,75,111,114,102,10,75,195,182,114,118,10,107,195,182,114,110,105,103,47,101,110,10,75,111,114,110,10,75,195,182,195,182,114,110,10,75,195,182,114,112,101,114,47,83,10,107,111,114,114,101,107,116,47,101,110,10,75,111,114,114,101,107,116,117,114,47,110,10,107,111,114,114,105,103,101,101,114,47,115,10,107,111,114,116,47,101,110,10,107,195,182,114,116,101,114,47,101,110,10,107,195,182,114,116,115,116,47,101,110,10,107,195,182,114,116,47,115,81,74,86,88,10,107,195,182,114,116,101,110,47,113,106,120,10,75,111,114,116,110,97,114,105,99,104,116,47,110,10,75,111,114,116,115,116,114,101,107,101,110,102,108,101,103,101,114,47,83,10,107,111,114,116,119,105,101,108,105,103,47,101,110,10,107,195,182,115,116,101,110,47,73,68,87,10,75,114,97,97,109,10,107,114,97,97,109,47,115,10,107,114,97,98,98,101,108,47,67,89,90,82,71,75,88,115,10,107,114,97,98,98,101,108,110,47,99,121,122,114,103,107,120,10,75,114,97,102,116,102,101,108,100,10,75,114,97,102,116,102,101,108,108,101,114,10,75,114,97,102,116,10,75,114,195,164,102,116,10,75,114,97,102,116,115,116,111,102,102,47,110,10,107,114,97,102,116,118,117,108,108,47,101,110,10,75,114,97,103,101,110,47,83,10,75,114,97,108,108,47,110,10,107,114,97,110,107,47,101,110,10,75,114,97,110,107,101,110,98,101,116,116,47,110,10,75,114,97,110,107,101,110,104,117,117,115,10,75,114,97,110,107,101,110,104,195,188,195,188,115,10,75,114,97,110,107,101,110,104,195,188,115,101,114,10,75,114,97,110,107,101,110,115,116,97,116,115,99,104,111,111,110,47,110,10,75,114,97,110,107,101,110,115,119,101,115,116,101,114,47,110,10,75,114,97,110,107,101,110,115,195,188,115,116,101,114,47,110,10,75,114,97,110,107,101,110,119,97,103,101,110,47,83,10,75,114,97,110,107,104,101,105,116,47,110,10,75,114,97,116,101,114,47,83,10,75,114,101,101,102,116,10,75,114,101,101,109,10,75,114,101,101,109,115,117,112,112,47,110,10,75,114,101,105,115,47,110,10,75,114,105,101,100,10,75,114,105,101,103,47,110,10,107,114,105,101,103,101,110,47,73,87,81,74,80,90,75,71,67,88,10,107,114,105,101,103,101,110,47,113,106,112,122,107,103,99,120,10,107,114,105,103,103,115,116,47,81,74,80,90,75,71,67,88,10,107,114,105,103,103,116,47,81,74,80,90,75,71,67,88,10,107,114,101,101,103,47,68,81,74,90,75,80,71,67,88,10,107,114,101,103,101,110,47,81,74,80,90,75,71,67,88,10,75,114,105,101,103,115,115,99,104,105,112,112,10,75,114,105,101,103,115,115,99,104,101,101,112,10,75,114,105,110,107,47,110,10,75,114,105,110,107,98,97,103,101,110,47,83,10,75,114,105,110,107,108,111,111,112,47,101,10,75,114,105,110,107,108,195,182,112,101,114,47,83,10,107,114,105,110,107,111,111,114,116,101,116,47,101,110,10,75,114,105,115,116,97,108,108,47,110,10,107,114,105,116,105,115,99,104,47,101,110,10,75,114,195,182,103,101,114,47,83,10,75,114,195,182,103,101,114,115,99,104,47,110,10,75,114,111,107,111,100,105,108,47,110,10,75,114,111,111,110,47,110,10,75,114,195,182,195,182,116,10,75,114,195,182,116,101,110,10,107,114,117,109,109,47,101,110,10,75,114,195,188,109,109,47,110,10,75,114,117,115,116,47,101,10,75,114,195,188,195,188,122,47,110,10,107,114,195,188,195,188,122,47,115,10,75,114,195,188,195,188,122,102,111,104,114,101,114,47,83,10,75,114,195,188,195,188,122,102,111,104,114,116,115,99,104,105,112,112,10,75,114,195,188,195,188,122,102,111,104,114,116,115,99,104,101,101,112,10,107,114,195,188,122,101,110,47,65,81,82,74,80,10,107,114,195,188,122,101,110,47,97,113,114,106,112,10,107,114,195,188,195,188,122,47,87,77,79,65,81,82,74,80,10,107,114,121,112,116,111,103,114,97,97,102,115,99,104,47,101,110,10,75,114,121,112,116,111,103,114,97,102,105,101,10,107,117,98,115,99,104,47,101,110,10,75,117,100,100,101,108,109,117,100,100,101,108,10,75,117,102,102,101,114,47,83,10,75,111,102,102,101,114,47,83,10,75,117,103,101,108,47,110,10,75,117,103,101,108,104,111,112,101,110,47,83,10,107,117,103,101,108,105,103,47,101,110,10,75,117,103,101,108,115,116,195,182,195,182,116,114,105,110,103,47,110,10,75,117,103,101,108,115,116,195,182,116,101,110,10,75,117,107,117,117,107,47,83,10,75,195,188,108,108,10,75,117,108,108,101,114,47,83,10,75,117,108,116,10,75,117,108,116,117,114,47,110,10,75,117,108,116,117,114,102,111,114,109,10,75,117,108,116,117,114,108,97,110,100,115,99,104,111,112,10,75,117,108,116,117,114,108,97,110,100,115,99,104,111,112,112,101,110,10,75,117,109,109,101,114,10,107,117,109,112,108,101,116,116,47,101,110,10,107,117,109,112,108,101,116,116,101,101,114,47,115,10,75,117,109,112,111,115,116,10,75,195,188,110,110,10,107,195,188,110,110,105,103,47,101,110,10,75,117,110,115,116,10,75,195,188,110,115,116,10,75,195,188,110,115,116,108,101,114,47,83,10,75,195,188,110,115,116,108,101,114,110,97,97,109,47,83,10,75,117,110,115,116,115,112,114,105,110,103,101,110,10,75,117,110,115,116,115,112,114,105,110,103,101,114,47,83,10,75,117,110,115,116,115,116,111,102,102,98,111,100,100,101,110,47,83,10,75,117,110,116,114,117,108,108,47,110,10,107,117,110,116,114,117,108,108,101,101,114,47,115,10,75,117,110,116,114,117,108,108,112,117,110,107,116,10,75,117,110,116,114,117,108,108,112,195,188,110,107,116,10,75,117,110,122,101,114,110,47,110,10,75,117,110,122,101,114,116,47,110,10,75,117,114,115,47,110,10,107,117,114,115,105,118,47,101,110,10,75,195,188,115,101,108,47,83,10,107,195,188,115,101,108,105,103,47,101,110,10,75,195,188,115,101,108,115,116,111,114,109,10,75,195,188,115,101,108,115,116,195,182,114,109,10,75,117,115,101,110,98,114,101,107,101,114,47,83,10,75,195,188,115,115,101,110,47,83,10,107,117,117,109,10,75,117,117,115,47,110,10,107,121,114,105,108,108,115,99,104,47,101,110,10,76,97,97,100,98,111,111,109,10,76,97,97,100,98,195,182,195,182,109,10,108,97,97,100,98,111,114,47,101,110,10,76,97,97,100,108,117,117,107,10,76,97,97,100,108,117,107,101,110,10,76,97,97,103,47,110,10,108,97,97,116,47,101,110,10,108,97,116,101,114,47,101,110,10,108,97,97,116,115,116,47,101,110,10,76,97,97,116,115,99,104,105,99,104,116,47,110,10,76,97,98,111,114,47,83,10,76,97,98,121,114,105,110,116,104,47,110,10,108,97,99,104,101,110,47,73,68,87,77,79,65,66,72,85,86,88,10,108,97,99,104,101,110,47,97,104,117,120,10,76,97,99,104,115,10,108,97,100,101,110,47,81,66,74,80,84,85,86,70,10,108,97,100,101,110,47,113,106,112,116,117,102,10,108,97,97,100,47,68,87,77,79,81,66,74,80,84,85,86,70,10,104,111,111,99,104,108,97,97,100,47,115,10,104,111,111,99,104,116,111,108,97,100,101,110,10,114,195,188,110,110,101,114,10,114,195,188,110,110,101,114,108,97,97,100,47,115,10,114,195,188,110,110,101,114,116,111,108,97,100,101,110,10,76,97,100,101,110,47,83,10,76,97,100,101,114,47,83,10,76,97,103,101,114,47,83,10,108,97,103,101,114,47,115,65,81,66,74,85,86,195,156,10,108,97,103,101,114,110,47,97,113,106,117,195,188,10,76,97,103,101,114,115,10,108,97,104,109,47,101,110,10,76,97,109,112,47,110,10,76,97,110,100,107,111,111,114,116,47,110,10,76,97,110,100,10,76,195,164,110,110,101,114,10,76,97,110,110,101,110,10,76,97,110,100,115,99,104,111,112,10,76,97,110,100,115,99,104,111,112,112,101,110,10,76,97,110,100,119,101,101,114,116,115,99,104,111,112,10,108,97,110,103,47,101,110,10,108,195,164,110,103,101,114,47,101,110,10,108,195,164,110,103,115,116,47,101,110,10,76,195,164,110,103,47,110,10,76,195,164,110,103,100,47,101,110,10,108,97,110,103,47,115,65,66,82,89,67,84,86,10,108,97,110,103,101,110,47,97,114,121,101,116,10,108,97,110,103,47,115,67,89,65,90,82,84,75,10,108,97,110,103,101,110,47,99,121,97,122,114,116,107,10,76,195,164,110,103,100,10,76,195,164,110,103,100,101,47,110,10,76,97,110,103,102,111,114,109,10,108,97,110,103,115,10,108,97,110,103,115,97,109,47,101,110,10,108,97,110,103,115,97,109,101,114,47,101,110,10,108,97,110,103,115,97,109,115,116,47,101,110,10,76,97,110,103,115,116,114,101,107,101,110,102,108,101,103,101,114,47,83,10,108,97,110,103,116,195,182,195,182,103,115,99,104,47,101,110,10,108,97,110,103,119,105,101,108,47,115,10,108,97,110,103,116,111,119,105,101,108,101,110,10,76,97,110,110,98,97,104,110,47,110,10,108,97,110,110,101,110,47,73,68,87,77,79,10,76,97,110,110,117,110,103,115,98,114,195,188,99,104,47,110,10,76,97,110,110,118,101,114,108,195,182,195,182,102,47,101,10,76,97,112,112,101,110,47,83,10,76,97,114,109,10,76,97,115,101,114,47,83,10,76,97,115,101,114,115,116,114,97,104,108,47,110,10,76,97,115,101,114,115,116,114,97,104,108,101,114,47,83,10,76,97,115,116,47,110,10,108,97,115,116,101,110,47,73,68,87,77,79,65,81,66,80,85,10,108,97,115,116,101,110,47,97,113,112,117,10,76,97,115,116,101,114,47,83,10,76,97,115,116,119,97,103,101,110,47,83,10,108,97,116,101,110,47,65,81,66,82,74,72,84,85,86,88,10,108,97,116,101,110,47,97,113,114,106,104,116,117,120,10,108,97,97,116,47,65,81,66,82,74,72,84,85,86,88,10,108,101,116,116,115,116,47,65,81,66,82,74,72,84,85,86,88,10,108,101,116,116,47,65,81,66,82,74,72,84,85,86,88,10,108,101,101,116,47,68,65,81,66,82,74,72,84,85,86,88,10,108,101,116,101,110,47,65,81,66,82,74,72,84,85,86,88,10,76,97,116,105,101,110,115,99,104,10,108,97,116,105,101,110,115,99,104,47,101,110,10,76,97,116,105,101,110,115,99,104,195,182,108,101,114,47,83,10,76,97,116,105,101,110,115,99,104,111,111,108,47,110,10,76,97,116,116,47,110,10,76,97,116,195,188,99,104,116,47,110,10,76,97,121,111,117,116,47,83,10,76,67,68,10,76,101,99,107,47,83,10,108,101,100,100,101,110,47,73,68,87,77,79,65,81,82,89,74,84,85,86,195,156,10,108,101,100,100,101,110,47,97,113,114,121,106,116,117,195,188,10,76,101,100,100,101,114,47,110,10,108,101,100,100,105,103,47,101,110,10,108,101,101,102,10,108,101,118,101,47,110,10,108,101,101,103,47,101,110,10,108,101,103,101,114,47,101,110,10,108,101,103,101,114,115,116,47,101,110,10,108,101,101,103,10,108,195,188,103,103,115,116,10,108,195,188,103,103,116,10,108,101,101,103,116,10,108,97,103,101,110,10,76,101,101,114,116,101,107,101,110,47,83,10,76,101,101,115,98,111,111,107,10,76,101,101,115,98,195,182,107,101,114,10,108,101,101,115,98,111,114,47,101,110,10,76,101,101,115,98,111,114,107,101,105,116,10,76,101,101,115,116,101,107,101,110,47,83,10,108,101,101,118,47,115,10,108,101,101,118,47,115,66,82,80,85,86,70,10,76,101,101,118,100,97,103,10,76,101,101,118,100,101,10,108,101,103,97,108,47,101,110,10,76,101,103,101,110,110,47,110,10,108,101,103,103,101,110,47,73,68,87,77,79,65,81,66,74,80,84,89,67,85,86,70,88,76,10,108,101,103,103,101,110,47,97,113,106,112,116,121,99,117,102,120,108,10,108,101,101,100,47,68,65,81,66,74,80,84,89,67,85,86,70,88,76,10,108,101,100,101,110,47,65,81,66,74,80,84,89,67,85,86,70,88,76,10,108,101,103,103,101,110,10,97,102,108,101,103,103,101,110,10,108,101,103,103,10,102,97,115,116,108,101,103,103,47,115,10,76,101,104,110,47,115,10,76,101,104,110,101,108,115,10,108,101,104,110,10,97,102,108,101,104,110,47,115,10,108,101,104,110,101,110,47,73,68,87,77,79,65,81,89,67,70,88,10,108,101,104,110,101,110,47,97,113,121,99,102,120,10,76,101,104,114,10,108,101,104,114,47,115,65,66,86,10,108,101,104,114,101,110,47,97,10,76,101,104,114,101,114,47,83,10,76,101,104,114,112,97,100,100,47,110,10,108,101,105,100,101,114,10,76,101,105,115,116,101,110,10,108,101,105,115,116,101,110,47,73,81,10,108,101,105,115,116,101,47,81,10,76,101,110,107,47,110,10,108,101,110,107,10,97,102,108,101,110,107,47,115,10,76,101,112,101,108,47,83,10,108,101,115,101,110,47,74,81,72,80,85,86,70,10,108,101,115,101,110,47,106,113,104,112,117,102,10,108,101,101,115,47,87,77,79,74,81,72,80,85,86,70,10,76,101,115,101,114,47,83,10,108,101,116,122,116,47,101,110,10,108,101,116,122,116,101,110,115,10,76,101,118,101,110,10,76,101,118,101,110,115,111,111,114,116,10,76,101,118,101,110,115,116,105,101,116,10,76,101,118,101,110,115,116,105,101,100,101,110,10,108,101,118,101,114,110,47,73,68,87,77,79,65,81,66,74,85,10,108,101,118,101,114,110,47,97,113,106,117,10,108,101,118,101,114,110,10,97,102,108,101,118,101,114,47,115,10,76,101,120,47,110,10,108,105,99,104,116,47,101,110,10,108,105,99,104,116,101,114,47,101,110,10,108,105,99,104,116,115,116,47,101,110,10,76,105,99,104,116,97,116,104,108,101,116,105,107,10,76,105,99,104,116,98,97,103,101,110,47,83,10,108,105,99,104,116,98,108,97,117,47,101,110,10,76,105,99,104,116,98,111,114,110,47,83,10,108,105,99,104,116,98,114,117,117,110,47,101,110,10,108,105,99,104,116,101,110,47,73,68,87,77,79,81,65,66,80,90,75,71,88,10,108,105,99,104,116,101,110,47,113,97,112,122,107,103,120,10,108,105,99,104,116,101,114,110,47,73,68,87,79,77,10,76,105,99,104,116,106,111,104,114,47,110,10,76,105,99,104,116,10,76,105,99,104,116,101,114,115,10,76,105,99,104,116,115,116,114,97,104,108,101,114,47,83,10,76,105,100,100,109,97,97,116,47,110,10,108,105,101,100,101,110,10,105,107,10,108,105,101,100,10,100,117,10,108,105,100,100,115,116,10,104,101,10,108,105,100,100,116,10,119,105,10,108,105,101,100,116,10,105,107,10,108,101,101,100,10,100,117,10,108,101,101,100,115,116,10,104,101,10,108,101,101,100,10,119,105,10,108,101,100,101,110,10,108,105,101,100,115,97,109,47,101,110,10,76,105,101,102,10,76,105,101,118,101,114,10,108,105,101,107,47,101,110,10,108,105,101,107,101,114,115,10,76,105,101,107,104,101,105,116,10,108,105,101,107,115,116,101,114,119,101,108,116,10,108,105,101,107,116,105,101,100,105,103,47,101,110,10,108,105,101,107,116,111,10,108,105,101,107,117,116,10,108,105,101,107,119,101,101,114,116,105,103,47,101,110,10,76,105,101,107,119,101,101,114,116,105,103,107,101,105,116,47,110,10,76,105,101,110,47,110,10,76,105,101,110,98,114,101,101,100,47,110,10,76,105,101,110,101,110,114,105,99,104,116,101,114,47,83,10,76,105,101,110,104,111,108,116,10,76,105,101,110,104,195,182,108,116,101,114,10,76,105,101,110,119,97,110,100,10,76,105,101,110,119,195,164,110,110,10,76,105,101,110,119,195,164,110,110,101,110,10,108,105,101,114,108,195,188,116,116,47,101,110,10,108,105,101,115,47,101,110,10,108,105,101,115,101,114,47,101,110,10,108,105,101,115,116,47,101,110,10,76,105,101,115,116,47,110,10,108,105,103,103,101,110,47,73,68,87,82,80,10,108,105,103,103,101,110,47,114,112,10,108,101,101,103,47,68,82,80,10,108,101,103,101,110,47,82,80,10,108,105,108,97,10,76,105,109,111,111,110,47,110,10,76,105,110,101,97,108,47,110,10,108,105,110,101,111,114,47,101,110,10,76,105,110,103,117,105,115,116,47,110,10,76,105,110,107,47,83,10,76,105,110,107,97,100,114,101,115,115,47,110,10,108,105,110,107,101,110,47,73,68,87,77,79,89,67,74,86,10,108,105,110,107,101,110,47,121,99,106,10,108,105,110,107,101,114,104,97,110,100,10,76,105,110,107,112,111,111,116,47,110,10,76,105,110,107,115,98,117,116,101,110,10,76,105,110,107,115,107,108,105,99,107,10,108,105,110,107,115,10,108,105,110,107,101,10,108,105,110,107,101,110,10,76,105,110,107,116,101,101,108,47,110,10,76,105,110,115,47,110,10,76,105,112,112,47,110,10,76,105,115,116,47,110,10,108,105,115,116,101,110,47,73,68,87,77,79,80,10,108,105,115,116,101,110,47,112,10,76,105,116,101,114,97,116,117,114,10,76,105,122,101,110,122,47,110,10,108,111,99,107,101,110,47,73,68,87,77,79,65,82,89,67,90,75,71,86,88,10,108,111,99,107,101,110,47,97,114,121,99,122,107,103,118,120,10,76,111,99,107,10,76,195,182,99,107,101,114,10,76,111,99,107,10,76,195,182,99,107,101,114,10,108,111,103,97,114,105,116,104,109,105,115,99,104,47,101,110,10,76,111,103,97,114,105,116,104,109,117,115,10,76,111,103,97,114,105,116,104,109,101,110,10,76,111,103,98,111,111,107,100,97,116,101,105,47,110,10,76,111,103,98,111,111,107,10,76,111,103,98,195,182,107,101,114,10,76,111,103,105,107,10,108,111,103,105,115,99,104,47,101,110,10,76,111,103,111,47,83,10,76,111,104,110,10,76,195,182,104,110,10,108,111,107,97,108,47,101,110,10,76,111,107,97,116,105,118,10,76,111,111,102,10,76,111,111,112,98,97,104,110,47,110,10,76,111,111,112,10,76,195,182,195,182,112,10,76,111,111,112,112,108,97,110,107,47,110,10,76,111,111,112,119,97,114,107,47,110,10,108,111,111,115,10,108,195,182,195,182,115,47,115,81,74,80,85,10,108,195,182,115,101,110,47,113,106,112,117,10,108,195,182,195,182,115,98,111,114,47,101,110,10,108,111,111,115,103,97,104,110,10,108,111,111,115,103,101,105,104,116,10,108,111,111,115,103,101,105,104,115,116,10,108,111,111,115,103,97,104,116,10,108,111,111,115,103,97,104,10,76,195,182,195,182,115,109,105,100,100,101,108,47,83,10,76,111,111,116,115,47,110,10,76,195,182,195,182,118,47,110,10,108,111,112,101,110,47,65,81,66,82,74,80,84,89,67,85,86,70,88,10,108,111,112,101,110,47,97,113,114,106,112,116,121,99,117,102,120,10,108,111,111,112,47,87,65,81,66,82,74,80,84,89,67,85,86,70,88,10,108,195,182,112,112,115,116,47,65,81,66,82,74,80,84,89,67,85,86,70,88,10,108,195,182,112,112,116,47,65,81,66,82,74,80,84,89,67,85,86,70,88,10,108,101,101,112,47,68,65,81,66,82,74,80,84,89,67,85,86,70,88,10,108,101,112,101,110,47,65,81,66,82,74,80,84,89,67,85,86,70,88,10,108,111,112,101,110,10,114,195,188,109,108,111,112,101,110,47,68,87,79,77,10,76,195,182,112,101,114,47,83,10,76,111,114,100,47,83,10,108,195,182,115,99,104,101,110,47,73,68,87,77,79,85,86,88,10,108,195,182,115,99,104,101,110,47,117,120,10,76,195,182,115,101,114,47,83,10,108,111,115,102,108,101,101,103,47,68,87,79,77,10,108,111,115,102,108,101,103,101,110,10,76,195,182,115,109,105,100,100,101,108,10,76,195,188,99,104,116,47,110,10,76,195,188,99,107,47,110,10,108,117,101,114,110,47,66,80,10,108,117,101,114,110,47,98,112,10,108,117,117,114,47,68,87,77,79,66,80,10,76,117,102,116,10,76,117,102,116,98,97,108,108,111,110,47,83,10,76,117,102,116,100,114,117,99,107,10,76,117,102,116,102,111,104,114,116,10,76,117,102,116,102,111,104,114,116,115,101,108,108,115,99,104,111,112,47,101,110,10,76,117,102,116,109,97,115,115,47,110,10,76,117,102,116,112,117,109,112,47,110,10,76,117,102,116,118,101,114,115,109,117,100,100,101,110,10,76,117,110,103,47,110,10,108,117,110,103,101,114,47,115,10,76,195,188,110,107,47,110,10,76,117,115,116,10,76,195,188,115,116,101,110,10,108,195,188,115,116,101,114,110,47,73,68,87,77,79,67,10,108,195,188,115,116,101,114,110,47,98,99,10,108,117,115,116,105,103,47,101,110,10,108,117,115,116,105,103,101,114,47,101,110,10,108,117,115,116,105,103,115,116,47,101,110,10,108,195,188,116,116,47,101,110,10,108,195,188,116,116,101,114,47,101,110,10,108,195,188,116,116,115,116,47,101,110,10,76,195,188,116,116,98,105,108,100,10,76,195,188,116,116,98,105,108,108,101,114,10,76,195,188,116,116,98,111,111,107,115,116,97,97,118,47,110,10,76,195,188,116,116,112,114,111,103,114,97,109,109,47,110,10,76,195,188,116,116,115,116,100,101,101,108,47,101,10,76,195,188,116,116,115,116,101,101,114,110,47,83,10,76,195,188,116,116,115,116,101,101,114,110,103,195,182,114,100,101,108,47,83,10,76,195,188,195,188,100,10,76,195,188,195,188,100,10,76,117,117,112,47,110,10,108,117,117,115,116,101,114,110,47,73,68,87,66,82,72,90,10,108,117,117,115,116,101,114,110,47,114,104,122,10,108,117,117,116,104,97,108,115,10,108,117,117,116,10,108,117,100,101,10,108,117,100,101,110,10,108,117,100,101,114,47,101,110,10,108,117,117,116,115,116,47,101,110,10,76,117,117,116,115,112,114,101,107,101,114,47,83,10,108,117,117,116,115,116,97,114,107,47,101,110,10,76,117,117,116,115,116,195,164,114,107,47,110,10,77,97,97,100,47,110,10,109,97,97,107,47,115,65,81,74,72,80,84,85,86,70,88,10,109,97,107,101,110,47,97,113,106,104,112,116,117,102,120,10,109,97,97,107,47,115,10,100,105,99,104,116,109,97,97,107,47,115,10,109,97,97,107,10,101,103,101,110,109,97,97,107,116,47,101,110,10,109,97,97,107,10,102,97,114,100,105,103,109,97,97,107,47,115,10,109,97,97,107,10,102,97,115,116,109,97,97,107,47,115,10,109,97,97,107,10,102,114,101,101,109,97,97,107,47,115,10,102,114,101,101,116,111,109,97,107,101,110,10,109,97,97,107,10,108,101,100,100,105,103,109,97,97,107,47,115,10,109,97,97,107,10,108,105,101,107,109,97,97,107,47,83,10,108,105,101,107,116,111,109,97,107,101,110,10,109,97,97,107,10,108,195,188,116,116,101,114,109,97,97,107,47,115,10,108,195,188,116,116,101,114,116,111,109,97,107,101,110,10,109,97,97,107,10,109,105,116,109,97,97,107,47,115,10,109,105,116,116,111,109,97,107,101,110,10,109,97,97,107,10,114,101,101,110,109,97,97,107,47,115,10,114,101,101,110,116,111,109,97,107,101,110,10,109,97,97,108,10,109,97,97,108,47,115,10,77,97,97,110,100,47,110,10,77,97,97,110,100,10,77,97,97,110,100,97,103,10,77,97,97,110,100,98,195,182,118,101,114,115,105,101,116,10,77,97,97,110,100,100,195,188,195,188,115,116,101,114,110,105,115,10,77,97,97,110,100,108,111,111,112,10,77,97,97,110,100,111,112,103,97,110,103,10,77,97,97,110,100,115,99,104,105,101,110,10,77,97,97,110,100,195,188,110,110,101,114,103,97,110,103,10,77,97,97,110,100,118,101,114,100,195,188,195,188,115,116,101,114,110,10,77,195,164,195,164,114,107,101,110,47,83,10,77,97,97,116,47,110,10,77,97,99,10,109,195,164,99,104,116,105,103,47,101,110,10,109,195,164,99,104,116,105,103,101,114,47,101,110,10,109,195,164,99,104,116,105,103,115,116,47,101,110,10,77,97,99,107,101,114,47,83,10,77,97,100,97,109,10,77,97,103,101,110,116,97,10,109,97,103,101,114,110,10,97,102,109,97,103,101,114,47,115,10,77,97,103,105,101,10,109,97,103,105,115,99,104,47,101,110,10,109,97,103,105,115,99,104,101,114,47,101,110,10,109,97,103,105,115,99,104,115,116,47,101,110,10,109,97,103,110,101,101,116,115,99,104,47,101,110,10,77,97,103,110,101,116,47,110,10,77,97,103,110,101,116,102,101,108,100,10,77,97,103,110,101,116,102,101,108,108,101,114,10,109,97,103,110,101,116,105,115,99,104,47,101,110,10,109,97,103,110,101,116,105,115,99,104,101,114,47,101,110,10,109,97,103,110,101,116,105,115,99,104,115,116,47,101,110,10,77,97,103,110,101,116,111,115,112,104,195,164,195,164,114,10,77,97,103,110,105,116,117,117,100,47,110,10,77,97,104,97,103,111,110,105,10,77,97,104,108,116,105,101,116,10,77,97,104,108,116,105,101,100,101,110,10,109,97,104,110,101,110,47,73,68,87,77,79,81,65,86,10,109,97,104,110,101,110,47,113,97,10,109,97,107,101,110,10,107,108,111,111,114,109,97,107,101,110,47,115,10,107,108,111,111,114,116,111,109,97,107,101,110,10,109,97,107,101,110,10,107,195,188,110,110,105,103,109,97,97,107,47,115,10,107,195,188,110,110,105,103,116,111,109,97,107,101,110,10,77,97,107,101,114,47,83,10,77,97,107,114,111,47,83,10,109,97,108,10,109,97,108,101,110,47,81,65,66,72,80,90,75,85,86,70,88,195,156,10,109,97,108,101,110,47,113,97,104,112,122,107,117,102,120,195,188,10,109,97,97,108,47,68,87,77,79,81,65,66,72,80,90,75,85,86,70,88,195,156,10,77,97,108,101,114,47,83,10,77,97,108,101,115,99,104,47,110,10,109,97,108,108,47,101,110,10,77,97,108,108,98,195,188,100,101,108,47,83,10,77,97,108,195,182,195,182,114,47,83,10,109,97,108,195,182,114,101,110,10,109,97,108,195,182,195,182,114,47,87,77,79,10,77,97,109,97,47,83,10,109,97,110,10,77,97,110,97,103,101,114,47,83,10,109,97,110,103,10,109,97,110,107,10,109,195,164,110,110,105,99,104,109,97,108,10,109,195,164,110,110,105,99,104,10,109,195,164,110,110,110,105,99,104,101,101,110,10,77,97,110,110,10,77,97,110,110,115,108,195,188,195,188,100,10,77,97,110,110,115,99,104,111,112,10,77,97,110,110,115,99,104,111,112,112,101,110,10,77,97,110,110,115,99,104,111,112,112,47,110,10,77,97,110,110,115,99,104,111,112,115,98,97,110,107,10,77,97,110,110,115,99,104,111,112,115,98,195,164,110,107,10,77,97,110,112,97,103,101,47,83,10,77,97,110,115,99,104,101,116,116,47,110,10,77,97,110,116,101,108,47,83,10,77,97,114,97,116,104,111,110,10,77,97,114,97,116,104,111,110,108,111,111,112,10,77,97,114,97,116,104,111,110,108,195,182,195,182,112,10,77,97,114,105,110,101,10,77,97,114,107,47,110,10,77,97,114,107,47,110,10,109,97,114,107,47,115,10,109,97,114,107,47,115,65,66,80,86,70,10,109,97,114,107,101,110,47,97,112,102,10,109,97,114,107,101,101,114,47,115,10,109,97,114,107,101,101,114,47,115,10,77,97,114,107,109,97,97,108,47,110,10,77,97,114,107,116,47,110,10,77,97,114,109,101,108,47,83,10,77,97,114,109,101,108,97,97,100,47,110,10,77,97,114,109,111,114,10,109,97,114,115,99,104,101,101,114,47,115,10,77,97,115,99,104,105,101,110,10,77,97,115,99,104,105,110,101,110,10,77,97,115,107,47,110,10,109,97,115,107,101,101,114,47,115,72,86,104,10,77,97,115,107,101,114,97,97,100,47,110,10,77,97,115,107,111,116,116,106,101,10,77,97,115,107,111,116,116,106,101,110,115,10,109,97,115,107,117,108,105,101,110,115,99,104,47,101,110,10,77,97,115,115,47,110,10,77,97,116,101,114,105,97,108,10,109,97,116,104,101,109,97,97,116,115,99,104,47,101,110,10,77,97,116,104,101,109,97,116,105,107,10,77,97,116,114,105,120,10,77,97,116,114,105,122,101,110,10,77,97,116,116,47,110,10,77,97,116,116,101,110,114,105,99,104,116,101,114,47,83,10,77,97,116,116,101,110,114,105,99,104,116,101,114,115,99,104,101,47,110,10,109,97,120,105,109,97,108,47,101,110,10,77,97,120,105,109,97,108,119,101,101,114,116,47,110,10,109,97,120,105,109,101,101,114,47,115,10,77,97,120,105,109,117,109,10,77,97,120,105,109,97,10,77,66,10,109,101,99,104,97,97,110,115,99,104,47,101,110,10,77,101,99,104,97,110,105,115,109,117,115,10,77,101,99,104,97,110,105,115,109,101,110,10,109,101,99,107,101,114,110,47,73,68,87,77,79,65,66,85,10,109,101,99,107,101,114,110,47,97,98,117,10,77,101,100,105,97,110,10,77,101,100,105,117,109,10,77,101,100,105,101,110,10,77,101,100,105,122,105,110,10,77,101,100,105,122,105,110,101,114,47,83,10,109,101,100,105,122,105,110,115,99,104,47,101,110,10,109,101,101,110,47,115,10,109,101,101,110,10,109,101,110,101,110,47,86,10,109,101,101,110,47,77,79,86,10,109,101,101,110,115,116,47,86,10,109,101,101,110,116,47,86,10,77,101,101,114,10,77,101,114,101,110,10,77,101,101,114,118,101,114,115,109,117,100,100,100,101,110,10,77,101,101,115,116,101,114,47,83,10,77,101,104,108,10,109,101,104,114,10,109,101,104,114,102,97,99,104,47,101,110,10,109,101,104,114,109,97,108,105,103,47,101,110,10,109,101,104,114,115,116,47,101,110,10,109,101,104,114,115,116,101,110,100,101,101,108,115,10,77,101,104,114,116,97,108,108,47,110,10,109,101,105,104,47,115,10,109,101,105,115,116,10,77,101,108,107,10,77,101,108,107,115,116,114,97,97,116,47,110,10,109,101,108,108,10,97,102,109,101,108,108,47,115,10,109,101,108,108,101,110,47,73,65,81,74,86,10,109,101,108,108,101,110,47,105,97,113,106,10,109,101,108,100,115,116,47,65,81,74,86,10,109,101,108,100,116,47,65,81,74,86,10,109,101,108,100,116,101,47,65,81,74,86,10,109,101,108,100,116,101,110,47,65,81,74,86,10,77,101,110,103,100,101,47,110,10,109,101,110,103,101,108,101,101,114,47,115,10,109,101,110,110,105,103,47,101,110,10,109,101,110,110,105,103,109,97,108,10,77,101,110,195,188,47,83,10,77,101,110,195,188,105,110,100,114,97,103,10,77,101,110,195,188,105,110,100,114,195,164,195,164,103,10,77,101,110,195,188,108,105,101,115,116,47,110,10,109,101,114,114,110,10,77,101,115,111,115,112,104,195,164,195,164,114,10,77,101,116,97,10,77,101,116,97,100,97,116,101,110,10,77,101,116,97,108,108,47,110,10,77,101,116,97,108,108,107,117,110,110,10,109,101,116,101,110,47,81,66,80,84,85,86,10,109,101,116,101,110,47,113,112,116,117,10,109,101,101,116,47,68,81,66,80,84,85,86,10,109,105,116,116,115,116,47,81,66,80,84,85,86,10,109,105,116,116,47,81,66,80,84,85,86,10,109,101,116,101,110,10,65,102,109,101,116,101,110,10,77,101,116,101,111,114,47,83,10,77,101,116,101,111,114,105,116,47,110,10,77,101,116,101,111,114,111,108,111,103,105,101,10,77,101,116,101,114,47,83,10,77,101,116,104,111,111,100,47,110,10,77,101,116,114,105,107,47,110,10,77,101,116,122,47,110,10,77,72,122,10,109,105,100,100,97,97,103,115,10,77,105,100,100,97,103,10,77,105,100,100,97,103,101,116,101,110,10,77,105,100,100,97,103,10,77,105,100,100,97,97,103,10,77,105,100,100,101,108,47,83,10,77,105,100,100,101,108,97,110,103,114,105,101,112,101,114,47,83,10,77,105,100,100,101,108,97,110,103,114,105,101,112,101,114,115,99,104,101,47,110,10,77,105,100,100,101,108,100,114,195,188,100,100,101,108,47,83,10,77,105,100,100,101,108,102,101,108,100,115,112,101,108,101,114,47,83,10,109,105,100,100,101,108,103,114,111,111,116,47,101,110,10,77,105,100,100,101,108,107,114,105,110,107,47,110,10,77,105,100,100,101,108,108,105,101,110,47,110,10,109,105,100,100,101,108,110,47,73,68,87,77,79,85,86,10,109,105,100,100,101,108,110,47,117,10,77,105,100,100,101,108,112,117,110,107,116,47,110,10,77,105,100,100,101,108,112,195,188,110,107,116,10,77,105,100,100,101,108,115,116,195,182,114,109,101,114,47,83,10,109,105,100,100,101,108,115,119,111,111,114,47,101,110,10,109,105,100,100,101,110,10,77,105,100,100,101,119,101,101,107,10,77,105,100,100,101,119,101,107,101,110,10,77,105,101,103,101,101,109,107,47,110,10,77,105,101,103,101,101,109,10,77,105,101,103,101,109,101,110,10,77,105,101,108,47,110,10,77,105,107,114,111,102,111,110,47,83,10,77,105,107,114,111,109,101,116,101,114,47,83,10,77,105,107,114,111,115,101,107,117,110,110,47,110,10,77,105,108,108,105,97,114,100,47,110,10,77,105,108,108,105,109,101,116,101,114,47,83,10,77,105,108,108,105,111,110,10,77,105,108,108,105,111,110,101,110,10,77,105,108,108,105,115,101,107,117,110,110,47,110,10,77,105,110,97,114,97,108,195,182,195,182,108,10,77,105,110,101,114,97,108,111,103,105,101,10,77,105,110,105,98,105,108,100,10,77,105,110,105,98,105,108,108,101,114,10,77,105,110,105,109,97,97,108,119,101,101,114,116,47,110,10,109,105,110,105,109,97,108,47,101,110,10,109,105,110,105,109,97,108,105,115,116,105,115,99,104,47,101,110,10,109,105,110,105,109,101,101,114,47,115,10,77,105,110,105,109,117,109,10,77,97,120,105,109,97,10,77,105,110,105,115,116,101,114,47,83,10,77,105,110,105,115,116,101,114,105,117,109,10,77,105,110,105,115,116,101,114,105,101,110,10,109,105,110,110,47,101,110,10,109,105,110,110,101,114,47,101,110,10,109,105,110,110,115,116,47,101,110,10,109,105,110,110,101,114,47,115,81,72,86,10,109,105,110,110,101,114,110,47,113,104,10,77,105,110,115,99,104,47,110,10,109,105,110,117,115,10,77,105,110,117,117,116,47,110,10,109,105,115,99,104,47,115,10,77,105,115,99,104,101,114,47,83,10,77,105,115,99,104,116,97,108,108,47,110,10,77,105,115,116,10,109,105,116,10,109,105,116,39,110,10,77,105,116,97,114,98,101,105,100,101,114,47,83,10,109,105,116,101,101,110,115,10,109,105,116,101,110,97,110,110,101,114,10,77,105,116,102,108,101,103,101,114,47,83,10,77,105,116,102,108,101,103,101,114,115,99,104,101,47,110,10,109,105,116,115,97,109,116,115,10,77,105,116,115,99,104,195,182,108,101,114,47,83,10,109,109,10,109,111,98,105,108,47,101,110,10,77,111,98,105,108,116,101,108,101,102,111,110,47,110,10,109,111,100,101,101,114,110,47,101,110,10,77,111,100,101,108,108,47,110,10,77,111,100,101,109,47,83,10,109,111,100,101,114,101,101,114,47,115,10,77,111,100,101,114,10,77,195,182,100,101,114,10,109,111,100,101,114,110,47,101,110,10,77,111,100,101,114,115,112,114,97,97,107,47,110,10,77,111,100,105,102,105,107,97,116,111,114,47,110,10,77,111,100,105,102,105,107,97,116,115,99,104,111,111,110,47,110,10,109,111,100,105,102,105,122,101,101,114,47,115,10,77,111,100,117,108,47,110,10,77,111,100,117,108,117,115,10,109,195,182,103,101,110,47,86,10,109,97,103,47,68,86,10,109,117,99,104,101,110,47,73,68,87,77,79,86,10,77,111,105,110,10,109,111,105,110,10,77,111,108,101,107,195,188,108,47,110,10,109,111,108,101,107,117,108,111,114,47,101,110,10,77,111,109,97,110,103,10,77,111,110,97,114,99,104,47,110,10,77,111,110,97,114,99,104,105,101,10,77,111,110,97,114,99,104,105,101,110,10,77,111,110,105,116,111,114,47,110,10,77,195,182,110,107,10,77,111,110,115,116,101,114,47,83,10,109,195,182,195,182,100,47,101,110,10,77,111,111,100,47,110,10,109,195,182,195,182,103,108,105,99,104,47,101,110,10,77,195,182,195,182,103,108,105,99,104,107,101,105,116,47,110,10,77,195,182,195,182,103,10,77,195,182,103,101,110,10,77,111,111,116,10,109,111,114,103,101,110,10,77,111,115,97,105,107,47,110,10,77,111,115,115,10,109,195,182,116,101,110,10,109,117,116,116,47,68,10,109,195,182,195,182,116,10,109,117,115,115,47,87,77,79,10,109,195,188,115,115,101,110,10,77,111,116,111,114,47,110,10,77,111,116,111,114,114,97,100,10,77,111,116,111,114,114,195,182,195,182,100,10,77,195,188,99,107,47,110,10,109,117,99,107,115,99,104,47,101,110,10,77,117,100,100,101,114,47,83,10,77,117,101,114,10,77,117,101,114,110,10,109,117,102,102,101,108,105,103,47,101,110,10,109,117,102,102,105,103,47,101,110,10,109,117,108,116,105,109,101,100,105,97,10,77,117,108,116,105,109,101,100,105,97,10,77,117,108,116,105,109,101,116,101,114,47,83,10,109,117,108,116,105,110,97,116,115,99,104,111,110,97,97,108,47,110,10,77,117,108,116,105,112,108,105,107,97,116,115,99,104,111,111,110,47,110,10,77,117,109,105,101,47,110,10,77,117,110,100,10,77,117,110,110,101,110,10,77,117,110,115,116,101,114,47,110,10,109,117,110,116,101,114,47,101,110,10,77,117,115,101,117,109,10,77,117,115,101,101,110,10,77,117,115,105,107,47,110,10,77,117,115,105,107,100,97,109,112,101,114,47,83,10,77,195,188,116,122,47,110,10,109,117,117,108,115,99,104,47,101,110,10,77,117,117,115,107,108,105,99,107,47,83,10,77,117,117,115,107,110,111,111,112,10,77,117,117,115,107,110,195,182,195,182,112,10,77,117,117,115,10,77,195,188,195,188,115,10,77,117,117,115,114,97,100,10,77,117,117,115,114,195,182,195,182,100,10,77,117,117,115,116,97,115,116,47,110,10,77,117,117,115,119,105,101,115,101,114,47,83,10,77,121,116,104,111,108,111,103,105,101,10,109,121,116,104,111,108,111,111,103,115,99,104,47,101,110,10,110,97,10,110,97,39,110,10,110,97,39,116,10,110,97,97,107,116,47,101,110,10,78,97,97,109,47,83,10,78,97,97,109,114,117,117,109,10,78,97,97,109,114,195,188,195,188,109,10,78,97,97,109,119,111,111,114,116,10,78,97,97,109,119,195,182,195,182,114,10,78,97,99,104,116,47,110,10,78,97,99,104,116,102,108,111,111,103,10,78,97,99,104,116,102,108,195,182,195,182,103,10,78,97,99,104,116,115,99,104,105,99,104,116,47,110,10,78,97,100,101,108,47,110,115,10,78,97,102,114,97,97,103,47,110,10,110,97,103,101,108,10,102,97,115,116,110,97,103,101,108,47,115,10,110,97,103,101,108,110,47,73,68,87,77,79,65,82,74,80,84,86,70,10,110,97,104,101,114,10,78,97,107,105,101,107,115,101,108,47,83,10,78,97,109,105,100,100,97,103,10,78,97,109,105,100,100,97,97,103,10,110,97,109,105,100,100,97,103,115,10,78,97,114,105,99,104,116,47,110,10,78,97,114,105,99,104,116,101,110,98,111,114,110,47,83,10,110,97,114,109,115,10,78,97,115,112,97,110,110,10,110,97,116,115,99,104,111,110,97,97,108,47,101,110,10,78,97,116,115,99,104,111,110,97,97,108,115,116,97,97,116,47,110,10,78,97,116,115,99,104,111,110,97,108,105,116,195,164,116,47,110,10,78,97,116,115,99,104,111,110,97,108,112,97,114,107,47,83,10,110,97,116,116,47,101,110,10,78,97,116,117,114,10,78,97,116,117,114,47,110,10,78,97,116,117,114,98,101,108,101,118,101,110,10,78,97,116,117,114,107,97,116,97,115,116,114,111,111,112,104,47,110,10,110,97,116,195,188,114,108,105,99,104,47,101,110,10,78,97,116,117,114,119,101,116,101,110,115,99,104,111,112,47,110,10,110,97,117,47,101,110,10,78,97,117,105,103,107,101,105,116,47,110,10,78,97,118,101,114,47,115,10,78,97,118,101,114,47,83,10,78,97,118,101,114,108,97,110,100,10,78,97,118,101,114,108,195,164,110,110,101,114,10,78,97,118,101,114,115,99,104,111,112,10,78,97,118,101,114,115,99,104,111,112,112,101,110,10,78,97,118,101,114,115,116,97,97,116,47,110,10,78,97,118,105,103,97,116,111,114,47,110,10,78,97,118,105,103,97,116,115,99,104,111,111,110,47,110,10,78,97,118,105,103,97,116,115,99,104,111,111,110,115,112,97,110,101,101,108,47,110,10,110,97,118,105,103,101,101,114,47,115,10,110,97,119,97,115,115,101,110,10,110,101,100,100,101,114,47,101,110,10,78,101,100,100,101,114,103,97,110,103,10,110,101,100,100,101,114,115,97,115,115,39,115,99,104,47,101,110,10,110,101,101,10,110,101,101,103,47,101,110,10,110,101,103,101,114,47,101,110,10,110,101,101,103,115,116,47,101,110,10,78,101,101,103,100,101,10,110,101,101,109,10,78,101,101,109,97,97,110,100,10,110,101,101,115,99,104,105,101,114,105,103,47,101,110,10,78,101,101,115,10,78,101,115,101,110,10,110,101,103,97,116,105,118,47,101,110,10,78,101,103,97,116,105,118,116,101,107,101,110,47,83,10,110,101,104,109,101,110,47,73,87,65,81,74,80,84,89,67,85,86,70,88,10,110,101,104,109,101,110,47,97,113,106,112,116,121,99,117,102,120,10,110,195,182,104,109,101,110,47,73,68,65,81,74,80,84,89,67,85,86,70,88,10,110,105,109,109,47,68,87,65,81,74,80,84,89,67,85,86,70,88,10,110,97,104,109,101,110,47,65,81,74,80,84,89,67,85,86,70,88,10,110,101,105,104,101,110,47,73,68,87,77,79,81,65,72,75,84,85,88,195,156,10,110,101,105,104,101,110,47,113,97,104,107,116,117,120,195,188,10,78,101,108,107,47,110,10,110,101,114,114,110,10,110,101,114,118,195,182,115,47,101,110,10,78,101,115,116,47,110,10,78,101,115,116,101,114,10,110,101,116,116,47,101,110,10,78,101,116,116,47,110,10,78,101,116,116,98,97,108,108,10,78,101,116,116,98,195,164,108,108,10,110,101,116,116,98,97,115,101,101,114,116,47,101,110,10,78,101,116,116,107,97,110,116,47,110,10,78,101,116,116,107,105,101,107,101,114,47,83,10,78,101,116,116,112,111,115,116,10,78,101,116,116,115,99,104,101,101,100,115,114,105,99,104,116,101,114,47,83,10,78,101,116,116,115,99,104,101,101,100,115,114,105,99,104,116,101,114,115,99,104,101,47,110,10,78,101,116,116,115,105,101,116,10,78,101,116,116,115,105,101,100,101,110,10,78,101,116,116,119,97,114,107,47,110,10,78,101,116,116,119,101,103,47,110,10,78,101,116,116,119,101,103,101,114,47,110,10,110,101,117,114,111,111,116,115,99,104,47,101,110,10,110,101,117,116,114,97,108,47,101,110,10,110,101,117,116,114,97,108,101,114,47,101,110,10,110,101,117,116,114,97,97,108,115,116,47,101,110,10,78,101,118,101,108,10,78,101,118,101,108,98,97,110,107,10,78,101,118,101,108,98,195,164,110,107,10,78,101,118,101,108,100,101,101,107,10,110,105,99,104,10,110,105,101,10,110,105,101,103,47,101,110,10,110,105,101,103,101,114,47,101,110,10,110,105,101,103,115,116,47,101,110,10,110,105,101,110,105,99,104,10,78,105,109,98,117,115,10,110,105,112,112,10,110,105,120,10,110,111,99,104,10,110,111,99,104,109,97,108,10,110,195,182,100,105,103,47,101,110,10,78,111,104,114,101,110,107,101,101,100,47,110,10,110,111,109,105,110,97,108,47,101,110,10,78,111,109,105,110,97,116,105,118,10,110,111,111,103,10,110,195,182,195,182,109,47,115,195,156,10,110,111,111,114,100,47,110,10,78,111,111,114,100,101,110,10,78,111,111,114,100,10,78,111,111,114,100,119,101,115,116,10,78,111,111,114,100,111,111,115,116,10,110,111,111,114,100,115,99,104,47,101,110,10,110,111,111,116,10,78,111,111,116,104,101,108,112,98,111,111,116,10,78,111,111,116,104,101,108,112,98,195,182,195,182,100,10,78,111,111,116,114,105,110,103,47,101,110,10,78,111,111,116,114,117,116,115,99,104,47,110,10,78,111,111,116,117,116,103,97,110,103,10,78,111,111,116,117,116,103,195,164,110,103,10,78,111,114,109,47,110,10,110,111,114,109,97,108,47,101,110,10,110,111,114,109,97,108,101,114,119,105,101,115,10,110,111,114,109,97,108,105,115,101,101,114,47,115,10,110,111,116,101,101,114,47,115,10,78,111,116,105,122,47,110,10,78,114,10,110,117,10,110,117,107,108,101,111,114,47,101,110,10,78,117,108,108,109,101,114,105,100,105,97,110,47,110,10,78,117,108,108,10,110,117,108,108,10,78,117,108,108,112,117,110,107,116,10,78,117,108,108,115,116,101,101,100,10,110,117,109,101,101,114,115,99,104,47,101,110,10,110,117,109,101,114,101,101,114,47,115,10,78,117,109,109,101,114,47,110,10,78,117,109,109,101,114,10,78,117,109,109,101,114,110,10,110,195,188,109,115,10,110,195,188,116,116,101,110,47,73,68,87,77,79,81,85,10,110,195,188,116,116,101,110,47,113,117,10,78,117,116,116,10,78,195,182,195,182,116,10,110,195,188,195,188,100,108,105,99,104,47,101,110,10,111,98,106,101,107,116,105,118,47,101,110,10,79,98,106,101,107,116,10,79,98,106,101,107,116,101,110,10,79,98,115,101,114,118,97,116,111,114,105,117,109,10,111,100,101,114,10,111,102,10,111,102,102,105,122,105,101,108,108,47,101,110,10,79,103,101,110,98,108,105,99,107,47,110,10,79,104,114,47,110,10,111,107,39,110,10,195,150,107,101,108,110,97,97,109,47,83,10,79,75,10,111,107,10,195,182,107,111,108,111,111,103,115,99,104,47,101,110,10,195,182,107,111,110,111,111,109,115,99,104,47,101,110,10,111,107,10,111,111,107,10,195,150,107,111,115,116,195,188,101,114,10,195,150,107,111,115,116,195,188,101,114,110,10,79,107,116,97,97,108,116,97,108,108,47,110,10,79,107,116,97,97,108,119,101,101,114,116,47,110,10,111,107,116,97,108,47,101,110,10,79,107,116,97,110,116,10,79,107,116,101,116,116,47,110,10,79,107,117,108,97,114,47,83,10,195,182,108,108,101,114,47,101,110,10,195,182,108,108,115,116,47,101,110,10,195,150,108,108,101,114,109,97,110,110,10,195,150,108,108,101,114,110,10,195,150,108,118,101,110,109,101,116,101,114,47,83,10,195,150,108,118,101,110,109,101,116,101,114,112,117,110,107,116,10,79,109,97,47,83,10,79,110,107,101,108,47,83,10,111,110,108,105,110,101,10,79,111,103,98,114,111,47,110,10,79,111,103,10,79,103,101,110,10,195,150,195,182,108,10,195,150,108,101,110,10,111,111,108,10,111,108,101,10,111,108,101,110,10,111,111,108,116,10,195,150,195,182,108,112,101,115,116,47,110,10,111,111,108,116,98,97,99,107,115,99,104,47,101,110,10,79,111,108,116,105,101,115,101,110,10,111,111,108,116,10,111,108,101,10,111,108,101,110,10,195,182,108,108,101,114,47,101,110,10,195,182,108,108,115,116,47,101,110,10,79,111,114,105,110,119,97,104,110,101,114,47,83,10,79,111,114,107,110,97,108,108,10,111,111,114,110,47,115,10,79,111,114,110,116,47,110,10,79,111,114,115,97,97,107,10,79,111,114,115,97,107,101,110,10,111,111,114,116,101,110,47,87,77,79,85,10,111,111,114,116,101,110,47,117,10,79,111,114,116,101,110,115,99,104,117,117,108,10,111,111,114,116,105,103,47,101,110,10,79,111,114,116,10,79,111,114,100,101,110,10,195,150,195,182,114,100,10,79,111,115,116,47,110,10,111,111,115,116,101,110,10,79,111,115,116,101,114,110,10,195,150,195,182,118,102,108,97,99,104,10,195,150,195,182,118,102,108,195,164,195,164,103,47,110,10,195,150,195,182,118,114,101,98,101,101,116,10,195,150,195,182,118,114,101,98,101,100,101,110,10,111,112,10,111,112,39,110,10,111,112,39,116,10,79,112,97,47,83,10,79,112,98,97,99,107,101,114,47,83,10,79,112,98,111,115,112,101,108,101,114,47,83,10,79,112,100,114,97,103,10,79,112,100,114,195,164,195,164,103,10,79,112,100,117,107,101,114,47,83,10,79,112,101,114,97,110,100,47,110,10,79,112,101,114,97,116,101,114,47,83,10,79,112,101,114,97,116,115,99,104,111,111,110,47,110,10,111,112,102,114,105,115,99,104,47,115,10,111,112,116,111,102,114,105,115,99,104,101,110,10,79,112,103,97,97,118,47,110,10,79,112,103,97,97,118,114,117,117,109,10,79,112,103,97,97,118,114,195,188,195,188,109,10,79,112,103,97,110,103,10,79,112,103,195,164,110,103,10,79,112,103,97,118,101,110,108,105,115,116,47,110,10,111,112,103,108,105,101,107,10,111,112,103,114,97,100,101,101,114,47,115,10,79,112,108,97,97,103,47,110,10,111,112,108,101,116,122,116,10,79,112,108,195,182,115,101,114,47,83,10,79,112,110,97,104,109,47,110,10,79,112,110,101,104,109,101,114,47,83,10,79,112,112,97,115,115,101,114,47,83,10,111,112,112,111,114,116,117,117,110,115,99,104,47,101,110,10,79,112,112,111,115,105,116,115,99,104,111,111,110,47,110,10,111,112,114,101,99,104,116,47,101,110,10,79,112,114,111,111,112,10,79,112,114,195,182,195,182,112,10,79,112,114,111,112,101,114,47,83,10,79,112,114,195,188,109,101,114,47,83,10,79,112,115,108,195,164,103,101,114,47,83,10,79,112,115,108,97,103,102,101,108,100,108,105,101,110,47,110,10,79,112,115,108,97,103,102,101,108,100,10,79,112,115,108,97,103,102,101,108,108,101,114,10,79,112,115,108,97,103,108,105,101,110,47,110,10,79,112,115,108,97,103,122,111,111,110,47,110,10,111,112,115,108,195,182,116,101,108,110,47,73,68,87,77,79,10,79,112,115,116,101,108,108,101,114,47,83,10,79,112,115,116,105,101,103,47,110,10,111,112,115,116,117,110,110,115,10,79,112,116,97,107,116,47,110,10,79,112,116,105,107,47,110,10,111,112,116,105,109,97,108,47,101,110,10,111,112,116,105,109,101,101,114,47,115,10,111,112,116,105,115,99,104,47,101,110,10,111,112,116,115,99,104,111,110,97,108,47,101,110,10,79,112,116,115,99,104,111,111,110,47,110,10,111,112,119,97,97,107,47,115,10,111,112,119,97,114,116,115,10,79,112,119,97,114,116,115,104,97,107,101,110,47,83,10,79,114,97,110,103,101,47,110,10,111,114,97,110,103,101,47,110,10,79,114,98,105,116,97,108,47,110,10,79,114,99,104,101,115,116,101,114,47,83,10,79,114,100,101,114,47,83,10,79,114,103,97,110,105,115,97,116,115,99,104,111,111,110,47,110,10,111,114,103,97,110,105,115,101,101,114,47,115,10,111,114,103,105,110,97,108,47,101,110,10,79,114,103,105,110,97,108,115,112,114,97,97,107,47,110,10,79,114,103,105,110,97,108,116,101,120,116,47,110,10,79,114,105,103,105,110,97,108,47,110,10,111,114,110,101,110,47,73,68,87,77,79,65,81,74,84,88,10,111,114,110,101,110,47,97,113,106,116,120,10,79,114,110,101,114,10,79,114,110,101,114,110,10,111,114,116,111,103,114,97,97,102,115,99,104,10,79,114,116,111,103,114,97,102,105,101,47,110,10,111,118,97,108,47,101,110,10,79,118,97,108,10,79,118,97,108,101,110,10,195,182,118,101,110,47,74,85,86,10,195,182,118,101,110,47,106,117,10,195,182,195,182,118,47,68,87,77,79,74,85,86,10,195,182,118,101,114,10,195,182,118,101,114,97,108,108,10,195,182,118,101,114,98,114,101,101,100,47,101,110,10,195,182,118,101,114,101,101,110,10,195,150,118,101,114,102,97,108,108,10,195,150,118,101,114,102,195,164,108,108,10,195,150,118,101,114,102,111,104,114,116,47,110,10,195,150,118,101,114,102,114,101,114,101,110,10,195,150,118,101,114,103,97,97,118,47,110,10,195,150,118,101,114,103,97,110,103,10,195,150,118,101,114,103,195,164,110,103,10,195,182,118,101,114,104,97,117,112,116,10,195,182,118,101,114,107,111,112,112,10,195,182,118,101,114,108,97,112,112,101,110,47,73,68,87,77,79,10,195,182,118,101,114,109,111,114,103,101,110,10,195,150,118,101,114,110,97,104,109,47,110,10,195,182,118,101,114,110,101,104,109,101,110,10,195,150,118,101,114,114,101,97,107,115,99,104,111,111,110,47,110,10,195,182,118,101,114,115,99,104,101,114,105,103,47,101,110,10,195,150,118,101,114,115,101,116,116,101,110,10,195,150,118,101,114,115,101,116,116,101,114,47,83,10,195,150,118,101,114,115,105,99,104,116,47,110,10,195,182,118,101,114,115,108,97,97,110,10,195,182,118,114,105,103,47,101,110,10,79,122,101,97,110,47,110,10,79,122,101,97,110,107,117,110,110,10,112,97,99,107,101,110,47,73,68,87,77,79,65,81,66,89,67,74,80,90,75,71,84,85,86,70,88,195,156,10,112,97,99,107,101,110,47,97,113,98,121,99,106,112,122,107,103,116,117,118,102,120,195,188,10,80,97,100,100,47,110,10,80,97,100,100,101,108,47,83,10,80,97,103,101,108,117,117,110,47,83,10,80,97,107,101,116,47,110,10,80,97,108,101,116,116,47,110,10,80,97,110,100,115,121,115,116,101,109,47,110,10,80,97,110,101,101,108,47,83,10,80,97,110,110,47,110,10,80,97,112,97,47,83,10,80,97,112,101,101,114,47,110,10,80,97,114,97,98,101,108,47,110,10,80,97,114,97,103,114,97,112,104,47,110,10,112,97,114,97,108,108,101,108,47,101,110,10,80,97,114,97,109,101,116,101,114,47,83,10,80,97,114,105,116,195,164,116,47,110,10,80,97,114,107,47,83,10,112,97,114,107,101,110,47,73,68,87,77,79,81,67,74,90,75,71,84,85,88,195,156,10,112,97,114,107,101,110,47,113,99,106,122,107,103,116,117,120,195,188,10,80,97,114,107,101,116,116,10,80,97,114,107,104,117,117,115,10,80,97,114,107,104,195,188,195,188,115,10,80,97,114,108,97,109,101,110,116,47,110,10,112,97,114,108,97,109,101,110,116,97,97,114,115,99,104,47,101,110,10,80,97,114,116,47,110,10,80,97,114,116,101,105,47,110,10,112,97,114,116,105,97,108,47,101,110,10,80,97,114,116,105,107,101,108,47,83,10,80,97,114,116,105,116,115,99,104,111,111,110,47,110,10,80,97,114,116,105,122,105,112,10,80,97,114,116,110,101,114,47,83,10,80,97,114,116,121,47,83,10,80,97,115,115,97,103,101,101,114,47,110,10,112,97,115,115,101,101,114,47,115,10,112,97,115,115,101,110,47,73,68,87,77,79,65,81,82,74,80,84,86,10,112,97,115,115,101,110,47,97,113,114,106,112,116,10,80,97,115,115,105,118,10,112,97,115,115,105,118,47,101,110,10,80,97,115,115,119,111,111,114,116,10,80,97,115,115,119,195,182,195,182,114,10,80,97,115,116,101,114,47,83,10,80,97,115,116,101,114,115,99,104,101,47,110,10,80,97,115,116,111,111,114,47,110,10,80,97,115,116,111,111,114,115,99,104,101,47,101,10,80,97,115,116,117,117,114,47,110,10,80,97,115,116,117,117,114,115,99,104,101,47,101,10,80,97,116,114,111,111,110,47,110,10,80,97,117,115,47,110,10,80,67,10,112,101,100,100,47,90,195,156,75,115,10,112,101,100,100,101,110,47,122,195,188,107,10,112,101,116,116,47,90,195,156,75,115,10,112,101,116,116,101,110,47,122,195,188,107,10,80,101,101,114,100,10,80,101,101,114,10,80,101,101,114,114,101,110,110,101,110,47,83,10,80,101,101,114,115,112,111,114,116,10,80,101,103,101,108,115,116,97,110,100,10,80,101,103,101,108,115,116,195,164,110,110,10,80,101,103,101,108,115,116,97,110,100,115,109,101,108,108,101,110,47,83,10,112,101,108,108,101,110,47,73,68,87,77,79,81,85,10,112,101,108,108,101,110,47,111,113,117,10,80,101,110,110,101,108,107,108,111,99,107,47,110,10,80,101,112,101,114,10,80,101,112,101,114,109,105,110,116,10,112,101,114,10,80,101,114,102,101,107,116,10,112,101,114,102,101,107,116,47,101,110,10,80,101,114,102,101,115,115,101,114,47,83,10,80,101,114,103,97,109,101,110,116,47,110,10,80,101,114,103,97,109,101,110,116,114,117,108,108,47,110,10,80,101,114,105,111,100,101,110,115,121,115,116,101,109,47,110,10,80,101,114,105,111,111,100,47,110,10,112,101,114,105,111,111,100,115,99,104,47,101,110,10,80,101,114,115,111,110,47,110,10,112,101,114,115,195,182,110,108,105,99,104,10,112,101,114,115,195,182,110,108,105,99,104,47,101,110,10,80,101,114,122,101,110,116,47,110,10,80,101,114,122,101,115,115,47,110,10,80,101,114,122,101,115,115,47,110,10,80,101,114,122,101,115,115,101,114,47,83,10,80,104,97,110,116,111,109,47,110,10,80,104,105,108,111,115,111,112,104,105,101,10,112,104,111,110,101,101,116,115,99,104,47,101,110,10,80,104,195,182,110,105,120,10,80,104,111,115,112,104,111,114,10,80,104,111,116,111,115,121,110,116,104,101,101,115,47,110,10,80,104,121,115,105,107,10,112,104,121,115,105,107,97,97,108,115,99,104,47,101,110,10,80,73,68,10,80,105,101,108,47,110,10,112,105,101,108,108,105,101,107,47,101,110,10,112,105,101,108,108,105,101,107,115,10,112,105,101,108,114,101,99,104,116,47,101,110,10,112,105,101,112,47,115,10,80,105,108,111,116,47,110,10,80,105,108,111,116,101,110,107,97,98,105,101,110,47,83,10,80,73,78,10,80,105,110,103,101,108,47,83,10,112,105,110,103,101,108,110,47,73,68,87,77,79,65,82,89,71,70,10,80,105,110,103,115,116,114,111,111,115,47,110,10,80,105,110,115,101,108,47,83,10,80,105,115,116,111,111,108,47,110,10,80,105,120,101,108,47,83,10,112,108,97,97,110,47,115,10,80,108,97,97,115,116,101,114,47,83,10,80,108,97,97,116,47,110,10,80,108,97,99,107,101,110,47,83,10,80,108,97,107,97,97,116,10,80,108,97,107,97,116,101,110,10,80,108,97,110,47,83,10,112,108,97,110,101,110,47,66,67,74,84,86,70,195,156,10,112,108,97,110,101,110,47,99,106,116,102,195,188,10,112,108,97,97,110,47,66,67,74,84,86,70,195,156,10,112,108,97,97,110,115,116,47,66,67,67,74,84,86,70,195,156,10,112,108,97,97,110,116,47,66,67,74,84,86,70,195,156,10,112,108,97,97,110,116,101,47,66,67,74,84,86,70,195,156,10,112,108,97,97,110,116,101,110,47,66,67,74,84,86,70,195,156,10,80,108,97,110,101,114,47,83,10,80,108,97,110,101,116,47,110,10,80,108,97,110,101,116,97,114,105,117,109,10,80,108,97,110,101,116,97,114,105,101,110,10,80,108,97,110,107,47,110,10,80,108,97,110,116,47,110,10,112,108,97,110,116,47,115,74,65,85,195,156,66,86,10,112,108,97,110,116,101,110,47,106,97,117,195,188,10,80,108,97,110,116,101,110,103,105,102,116,47,101,10,80,108,195,164,115,101,101,114,47,110,10,80,108,97,115,109,97,10,80,108,97,115,116,101,114,47,83,10,112,108,97,115,116,101,114,47,115,10,80,108,97,115,116,105,107,10,80,108,97,116,105,110,10,80,108,97,116,116,10,112,108,97,116,116,47,101,110,10,112,108,97,116,116,101,114,47,101,110,10,112,108,97,116,116,115,116,47,101,110,10,112,108,97,116,122,101,101,114,47,115,10,80,108,97,116,122,104,111,108,108,101,114,47,83,10,80,108,97,116,122,10,80,108,195,164,116,122,10,80,108,101,101,103,10,112,108,101,101,103,47,115,10,112,108,101,101,103,47,115,74,86,10,112,108,101,103,101,110,47,106,10,80,108,101,103,101,114,47,83,10,112,108,105,101,116,115,99,104,47,101,110,10,112,108,105,101,116,115,99,104,101,114,119,105,101,115,10,80,108,111,99,107,10,80,108,195,182,99,107,10,112,108,195,182,195,182,103,47,195,156,115,10,112,108,195,182,103,101,110,47,195,188,10,80,108,111,111,103,10,80,108,195,182,195,182,103,10,80,108,111,116,116,101,114,47,83,10,112,108,195,188,99,107,47,81,115,10,112,108,195,188,99,107,101,110,47,113,10,80,108,117,103,105,110,47,83,10,112,108,117,115,10,112,108,117,117,115,116,101,114,110,47,73,68,87,77,79,80,10,112,108,117,117,115,116,101,114,110,47,112,10,80,111,103,103,47,110,10,80,111,103,103,101,110,115,116,111,104,108,10,80,111,103,103,101,110,115,116,195,182,104,108,10,112,111,108,97,97,114,115,99,104,47,101,110,10,80,111,108,97,114,107,97,112,112,10,80,111,108,97,114,107,114,105,110,107,47,110,10,80,111,108,97,114,108,105,99,104,116,10,80,111,108,97,114,108,105,99,104,116,101,114,10,80,111,108,97,114,115,116,101,101,114,110,47,83,10,80,111,108,105,116,105,107,10,80,111,108,105,116,105,107,101,114,47,83,10,80,111,108,105,122,101,105,10,80,111,108,105,122,105,115,116,47,110,10,80,111,108,105,122,105,115,116,105,110,10,80,111,108,105,122,105,115,116,105,110,110,101,110,10,80,111,110,121,47,83,10,80,111,111,108,47,101,110,10,80,111,111,108,10,80,111,108,101,110,10,80,111,111,108,10,80,195,182,195,182,108,10,80,111,108,101,110,10,112,111,111,114,10,80,111,111,114,10,80,111,114,101,110,10,80,111,112,111,47,83,10,80,111,112,112,47,110,10,80,111,112,112,101,110,119,97,103,101,110,47,83,10,80,111,112,117,108,97,114,105,116,195,164,116,10,80,111,114,116,47,110,10,112,111,114,116,101,101,114,47,115,10,112,111,114,116,101,101,114,98,111,114,47,101,110,10,80,111,114,116,110,117,109,109,101,114,10,80,111,114,116,114,195,164,116,47,83,10,112,111,115,105,116,105,118,47,101,110,10,80,111,115,105,116,115,99,104,111,111,110,47,101,110,10,80,111,115,116,10,80,111,115,116,97,100,114,101,115,115,47,110,10,80,111,115,116,101,110,47,83,10,80,111,115,116,101,114,47,83,10,80,111,116,116,10,80,195,182,116,116,10,112,114,97,97,116,47,101,110,10,112,114,97,97,116,47,115,10,80,114,97,97,116,115,99,104,111,112,10,80,114,97,97,116,115,99,104,111,112,112,101,110,10,80,114,97,97,116,45,83,116,97,110,100,10,112,114,97,97,116,115,116,101,108,108,47,115,10,112,114,97,97,116,116,111,115,116,101,108,108,101,110,10,80,114,195,164,102,105,120,47,110,10,80,114,195,164,102,105,120,47,110,10,80,114,97,107,116,105,107,97,110,116,47,110,10,112,114,97,107,116,105,115,99,104,47,101,110,10,112,114,97,107,116,105,115,99,104,101,114,47,101,110,10,112,114,97,107,116,105,115,99,104,115,116,47,101,110,10,112,114,97,108,108,10,97,102,112,114,97,108,108,47,115,10,112,114,97,108,108,101,110,47,73,68,87,77,79,81,65,80,88,10,112,114,97,108,108,101,110,47,113,97,112,120,10,80,114,195,164,112,111,115,105,116,115,99,104,111,111,110,47,110,10,80,114,195,164,115,101,110,116,97,116,115,99,104,111,111,110,47,110,10,80,114,101,100,105,103,116,47,110,10,80,114,101,115,115,10,80,114,105,99,107,47,101,110,10,80,114,105,101,115,47,110,10,80,114,105,109,102,97,107,116,111,114,47,110,10,80,114,105,109,116,97,108,108,47,110,10,80,114,105,110,122,47,110,10,80,114,105,110,122,101,115,115,105,110,47,110,10,112,114,105,111,114,105,115,101,101,114,47,115,10,80,114,105,111,114,105,116,195,164,116,47,110,10,112,114,105,118,97,116,47,101,110,10,80,114,105,118,97,116,115,112,104,195,164,195,164,114,47,110,10,80,114,105,118,105,108,101,103,47,110,10,112,114,111,10,112,114,111,98,101,101,114,47,65,82,85,115,10,112,114,111,98,101,114,101,110,47,97,114,117,10,112,114,111,98,101,101,114,47,115,65,85,10,80,114,111,98,108,101,109,47,110,10,112,114,111,98,108,101,109,97,97,116,115,99,104,47,101,110,10,80,114,111,100,117,107,115,99,104,111,111,110,47,110,10,80,114,111,100,117,107,116,47,110,10,112,114,111,102,101,115,99,104,111,110,101,108,108,47,101,110,10,80,114,111,102,101,115,99,104,111,111,110,47,110,10,80,114,111,102,105,108,47,110,10,80,114,111,103,114,97,109,109,47,110,10,112,114,111,103,114,97,109,109,101,101,114,47,115,10,112,114,111,103,114,97,109,109,101,101,114,98,111,114,47,101,110,10,80,114,111,103,114,97,109,109,101,110,110,47,110,10,80,114,111,103,114,97,109,109,115,99,104,114,105,101,118,101,114,47,83,10,80,114,111,103,114,97,109,109,115,116,97,114,116,101,114,47,83,10,112,114,111,103,114,101,115,115,105,118,47,101,110,10,80,114,111,106,101,107,115,99,104,111,111,110,47,110,10,80,114,111,106,101,107,116,47,110,10,112,114,111,106,105,122,101,101,114,47,115,10,80,114,111,109,112,116,47,110,10,80,114,111,111,118,47,110,10,112,114,195,182,195,182,118,47,115,66,10,80,114,195,182,195,182,118,115,117,109,109,47,110,10,80,114,111,112,101,108,108,101,114,47,83,10,80,114,111,112,104,101,116,47,110,10,112,114,111,112,111,114,116,115,99,104,111,110,97,97,108,47,101,110,10,80,114,111,112,111,114,116,115,99,104,111,111,110,10,80,114,111,112,111,114,116,115,99,104,111,110,101,110,10,112,114,111,112,112,101,110,47,73,68,87,77,79,65,66,82,72,90,71,84,86,70,10,112,114,111,112,112,101,110,47,65,82,72,90,71,84,70,10,80,114,111,112,112,101,110,116,114,101,99,107,101,114,47,83,10,112,114,111,112,112,101,114,47,101,110,10,112,114,111,112,114,105,101,116,195,164,114,47,101,110,10,80,114,111,116,111,107,111,108,108,47,110,10,80,114,111,116,111,107,111,108,108,98,108,97,116,116,10,80,114,111,116,111,107,111,108,108,98,108,195,164,100,101,114,10,80,114,111,116,111,107,111,108,108,102,195,182,104,114,101,114,47,83,10,80,114,111,118,105,110,122,47,110,10,80,114,111,120,121,10,80,114,111,120,105,101,115,10,80,114,111,122,101,100,117,114,47,110,10,112,115,121,99,104,101,100,101,101,108,115,99,104,47,101,110,10,80,115,121,99,104,111,108,111,103,105,101,10,112,117,98,108,105,107,47,101,110,10,80,117,100,100,105,110,103,47,83,10,80,117,102,102,101,114,47,83,10,112,117,102,102,101,114,47,115,10,80,117,108,108,105,47,83,10,80,117,108,108,111,118,101,114,47,83,10,112,117,108,115,101,114,101,110,10,112,117,108,115,101,101,114,47,68,87,10,80,117,110,100,10,80,117,110,107,116,97,116,115,99,104,111,111,110,47,110,10,112,117,110,107,116,101,114,101,110,47,72,85,10,112,117,110,107,116,101,114,101,110,47,104,117,10,112,117,110,107,116,101,101,114,47,68,87,77,79,72,85,10,80,117,110,107,116,10,80,117,110,107,116,101,110,10,80,195,188,110,107,116,10,80,117,110,107,116,114,105,99,104,116,101,114,47,83,10,80,117,110,107,116,114,105,99,104,116,101,114,115,99,104,101,47,110,10,80,117,116,122,98,195,188,100,101,108,47,83,10,112,195,188,195,188,107,10,112,117,117,115,116,47,90,85,195,156,88,10,112,117,117,115,116,101,110,47,122,117,195,188,120,10,80,195,188,195,188,115,116,101,114,47,83,10,80,86,67,10,80,121,114,97,109,105,101,100,10,80,121,114,97,109,105,100,101,110,10,113,117,97,100,114,97,97,116,115,99,104,47,101,110,10,81,117,97,100,114,97,116,47,110,10,113,117,195,164,108,101,110,47,81,82,89,67,90,75,71,10,113,117,195,164,108,101,110,47,113,114,121,99,122,107,103,10,113,117,195,164,195,164,108,47,68,87,77,79,81,82,89,67,90,75,71,10,81,117,97,114,107,10,113,117,101,110,103,101,108,47,115,10,81,117,105,116,116,47,110,10,82,97,97,115,99,104,10,82,97,97,116,10,82,97,100,101,110,10,82,97,97,118,47,110,10,82,97,100,101,108,47,83,10,114,97,100,101,110,47,65,66,81,86,10,114,97,100,101,110,47,97,113,10,114,97,97,100,47,68,87,77,79,65,66,81,86,10,114,97,100,101,114,101,110,47,71,85,88,10,114,97,100,101,114,101,110,47,103,117,120,10,114,97,100,101,101,114,47,68,87,77,79,71,85,88,10,114,97,100,105,107,97,108,47,101,110,10,82,97,100,105,111,47,83,10,114,97,100,105,111,97,107,116,105,118,47,101,110,10,82,97,100,105,111,119,101,108,108,101,110,10,82,97,100,10,82,195,182,195,182,100,10,82,97,104,109,101,110,47,83,10,82,97,104,109,101,110,119,97,114,107,47,110,10,82,65,77,10,114,97,109,112,111,110,101,101,114,47,115,10,114,97,110,10,82,97,110,100,10,82,195,164,110,110,101,114,10,82,97,110,103,10,82,195,164,110,103,10,114,97,110,107,47,101,110,10,82,97,112,115,195,182,195,182,108,10,114,97,115,101,101,114,47,115,81,88,10,114,97,115,101,114,101,110,47,10,113,120,10,82,97,115,101,110,47,83,10,82,97,115,101,110,98,97,108,108,115,112,101,101,108,10,82,97,115,101,110,98,97,108,108,115,112,101,108,101,110,10,82,97,115,116,101,114,47,83,10,114,97,115,116,101,114,47,115,10,82,97,116,101,47,110,10,82,97,116,115,99,104,47,68,10,114,97,116,115,99,104,111,110,97,97,108,47,101,110,10,114,101,97,103,101,101,114,47,115,10,82,101,97,103,101,110,122,103,108,97,115,10,82,101,97,103,101,110,122,103,108,195,182,195,182,115,10,82,101,97,103,101,110,122,103,108,195,164,195,164,115,10,82,101,97,103,101,110,122,103,108,195,164,115,101,114,10,82,101,97,107,115,99,104,111,111,110,47,110,10,114,101,97,108,47,101,110,10,114,101,97,108,105,115,101,101,114,47,115,10,82,101,97,108,105,116,195,164,116,47,110,10,82,101,98,101,101,116,10,82,101,98,101,100,101,110,10,114,101,99,104,116,47,101,110,10,82,101,99,104,116,47,110,10,82,101,99,104,116,101,99,107,47,83,10,82,101,99,104,116,101,99,107,47,110,10,114,101,99,104,116,101,99,107,105,103,47,101,110,10,114,101,99,104,116,101,114,104,97,110,100,10,82,101,99,104,116,112,111,111,116,10,82,101,99,104,116,112,111,116,101,110,10,114,101,99,104,116,115,10,82,101,99,104,116,115,98,117,116,101,110,10,114,101,100,105,103,47,101,110,10,82,101,101,100,101,114,47,83,10,82,101,101,100,101,114,115,99,104,101,47,110,10,82,101,101,100,115,99,104,111,112,10,82,101,101,100,115,99,104,111,112,112,101,110,10,82,101,101,103,47,110,10,82,101,101,103,101,110,110,10,82,101,101,103,101,110,110,101,110,10,82,101,101,103,10,82,101,103,101,110,10,82,101,101,103,195,188,109,98,114,111,111,107,10,82,101,101,103,195,188,109,98,114,195,182,195,182,107,10,82,101,101,107,110,101,114,47,83,10,82,101,101,109,47,115,10,82,101,109,101,110,47,83,10,114,101,101,110,47,101,110,10,82,101,101,116,10,82,101,116,101,110,10,82,101,102,101,114,101,110,122,47,110,10,114,101,103,101,101,114,47,115,10,114,101,103,101,101,114,47,115,10,114,101,103,101,108,109,97,116,105,103,47,101,110,10,82,101,103,101,108,109,97,116,105,103,107,101,105,116,10,82,101,103,101,108,10,82,101,103,101,108,110,10,82,101,103,101,110,10,114,101,103,101,110,47,65,74,80,10,114,101,103,101,110,47,97,106,112,10,114,101,101,103,47,68,87,77,79,65,74,80,10,82,101,103,101,110,98,97,103,101,110,47,83,10,82,101,103,101,110,102,114,111,110,116,10,82,101,103,101,110,116,105,101,116,10,82,101,103,101,110,119,101,101,114,10,82,101,103,101,110,119,111,111,108,100,47,110,10,82,101,103,101,110,119,117,108,107,47,110,10,82,101,103,101,114,101,110,10,82,101,103,105,111,110,47,110,10,82,101,103,105,111,110,47,110,10,114,101,103,105,111,110,97,108,47,101,110,10,82,101,103,105,115,116,101,114,47,83,10,114,101,103,105,115,116,114,101,101,114,47,115,10,114,101,103,117,108,195,164,114,47,101,110,10,114,101,103,117,108,101,101,114,47,115,10,82,101,104,10,82,101,104,110,10,114,101,105,110,47,101,110,10,114,101,105,110,109,97,97,107,47,115,10,114,101,105,110,116,111,109,97,107,101,110,10,82,101,105,115,47,110,10,114,101,105,115,101,110,47,73,68,87,77,79,65,81,66,82,89,67,74,84,85,86,70,88,10,114,101,105,115,101,110,47,97,113,98,114,121,99,106,116,117,118,102,120,10,114,101,107,101,110,47,65,81,66,67,74,80,84,85,86,70,88,195,156,10,114,101,107,101,110,47,97,113,99,106,112,116,117,102,120,195,188,10,114,101,101,107,47,68,87,77,79,65,81,66,67,74,80,84,85,86,70,88,195,156,10,82,101,107,111,114,100,47,110,10,82,101,107,117,114,115,99,104,111,111,110,47,110,10,114,101,107,117,114,115,105,118,47,101,110,10,114,101,108,97,116,105,118,47,101,110,10,82,101,108,97,116,105,118,105,116,195,164,116,10,82,101,108,97,116,105,118,105,116,195,164,116,47,110,10,114,101,108,101,118,97,110,116,47,101,110,10,114,101,110,110,47,67,89,90,195,156,71,88,115,10,114,101,110,110,101,110,47,99,121,122,195,188,103,120,10,114,195,182,110,110,47,67,89,90,195,156,71,88,115,10,114,195,182,110,110,101,110,47,99,121,122,195,188,103,120,10,114,101,110,111,118,101,101,114,47,115,10,82,101,112,97,114,97,116,117,114,47,110,10,82,101,112,111,114,116,101,114,47,83,10,82,101,112,114,111,100,117,107,115,99,104,111,111,110,47,110,10,114,101,112,114,111,100,117,122,101,101,114,47,115,10,82,101,112,117,98,108,105,107,47,110,10,114,101,112,117,98,108,105,107,97,97,110,115,99,104,47,101,110,10,82,101,112,117,98,108,105,107,97,110,101,114,47,83,10,114,101,115,101,114,118,101,101,114,47,115,10,114,101,115,105,103,47,101,110,10,82,101,115,115,111,117,114,99,101,47,110,10,82,101,115,116,47,110,10,82,101,115,117,108,116,97,116,47,110,10,114,101,116,116,47,115,10,114,101,116,117,117,114,10,82,101,118,105,115,99,104,111,111,110,47,110,10,114,101,118,111,108,117,116,115,99,104,111,110,101,101,114,47,115,10,82,101,118,111,108,117,116,115,99,104,111,111,110,47,110,10,82,101,122,101,112,116,47,110,10,82,71,66,10,114,105,99,104,116,47,101,110,10,82,105,99,104,116,47,110,10,114,105,99,104,116,101,110,47,73,68,87,77,79,65,70,66,74,80,84,89,67,85,86,10,114,105,99,104,116,101,110,47,97,102,98,106,112,116,121,99,117,118,10,82,105,99,104,116,101,114,47,83,10,114,105,99,104,116,105,103,47,101,110,10,82,105,99,104,116,105,103,107,101,105,116,10,82,105,99,104,116,115,110,111,111,114,10,82,105,99,104,116,115,110,195,182,114,101,110,10,82,105,100,100,101,114,10,82,105,100,100,101,114,115,108,195,188,195,188,100,10,82,105,101,100,98,195,188,120,47,110,10,114,105,101,100,101,110,47,73,87,65,82,89,67,74,72,90,75,71,84,85,70,88,195,156,10,114,105,101,100,101,110,47,97,114,121,99,106,104,122,107,103,116,117,102,120,195,188,10,114,105,100,100,115,116,47,65,82,89,67,74,72,90,75,71,84,85,70,88,195,156,10,114,105,100,100,116,47,65,82,89,67,74,72,90,75,71,84,85,70,88,195,156,10,114,101,101,100,47,68,65,82,89,67,74,72,90,75,71,84,85,70,88,195,156,10,114,101,100,101,110,47,65,82,89,67,74,72,90,75,71,84,85,70,88,195,156,10,82,105,101,100,101,114,47,83,10,82,105,101,100,106,97,99,107,47,110,10,82,105,101,100,115,112,111,114,116,10,82,105,101,100,115,116,101,118,101,108,47,110,10,114,105,101,107,47,101,110,10,82,105,101,107,47,110,10,82,105,101,112,100,101,10,114,105,101,112,101,110,47,73,68,87,77,79,82,72,85,10,114,105,101,112,101,110,47,114,104,117,10,82,105,101,115,47,110,10,114,105,101,116,101,110,47,73,65,81,66,82,74,80,85,86,88,10,114,105,101,116,101,110,47,97,113,114,106,112,117,120,10,114,105,116,116,115,116,47,65,81,66,82,74,80,85,86,88,10,114,105,116,116,47,65,81,66,82,74,80,85,86,88,10,114,101,101,116,47,68,65,81,66,82,74,80,85,86,88,10,114,101,116,101,110,47,65,81,66,82,74,80,85,86,88,10,82,105,101,116,118,101,114,115,108,117,115,115,10,82,105,101,116,118,101,114,115,108,195,188,115,115,10,114,105,101,118,101,110,47,87,81,82,74,80,86,88,10,114,105,101,118,101,110,47,119,113,114,106,112,120,10,114,105,102,102,115,116,47,81,82,74,80,86,88,10,114,105,102,102,116,47,81,82,74,80,86,88,10,114,101,101,118,47,68,81,82,74,80,86,88,10,114,101,118,101,110,47,81,82,74,80,86,88,10,82,105,102,102,101,108,47,83,10,114,105,102,102,101,108,105,103,47,101,110,10,114,105,110,10,114,105,110,103,47,101,110,10,82,105,110,103,98,111,111,107,10,82,105,110,103,98,195,182,107,101,114,10,82,105,110,103,114,105,99,104,116,101,114,47,83,10,114,105,115,107,97,110,116,47,101,110,10,82,105,115,107,97,110,122,10,82,105,115,107,97,110,122,101,110,10,82,111,98,111,116,101,114,47,83,10,82,111,99,107,109,117,115,105,107,10,82,111,99,107,10,82,195,182,99,107,10,82,111,100,101,114,47,110,10,82,111,100,101,114,115,112,111,114,116,10,82,111,100,101,114,119,101,116,116,115,116,114,105,101,116,10,82,111,100,101,114,119,101,116,116,115,116,114,105,101,100,101,110,10,114,195,182,103,101,110,47,65,66,84,86,88,10,114,195,182,103,101,110,47,97,116,120,10,114,195,182,195,182,103,47,68,87,77,79,65,66,84,86,88,10,82,111,104,10,114,111,104,47,101,110,10,114,111,104,47,101,110,10,114,111,104,47,115,85,10,82,111,104,114,47,110,10,114,195,182,104,114,101,110,47,73,68,87,77,79,65,66,84,86,88,10,114,195,182,104,114,101,110,47,97,116,120,10,82,79,77,10,114,111,109,97,110,116,115,99,104,47,101,110,10,82,111,111,107,10,82,195,182,195,182,107,10,82,111,111,107,110,101,118,101,108,10,114,111,111,107,115,116,10,114,111,107,101,110,10,114,195,182,195,182,109,115,99,104,47,101,110,10,82,111,111,112,10,82,195,182,195,182,112,10,114,111,111,114,47,101,110,10,82,111,111,115,47,101,110,10,114,111,111,116,10,114,111,100,101,47,110,10,114,111,112,10,114,111,112,101,110,47,65,81,66,82,80,84,85,10,114,111,112,101,110,47,97,113,114,112,116,117,10,114,111,111,112,47,87,65,81,66,82,80,84,85,10,114,195,182,112,112,115,116,47,65,81,66,82,80,84,85,10,114,195,182,112,112,116,47,65,81,66,82,80,84,85,10,114,101,101,112,47,68,65,81,66,82,80,84,85,10,114,101,112,101,110,47,65,81,66,82,80,84,85,10,114,111,114,47,101,110,10,114,111,115,97,10,82,111,115,101,116,116,47,110,10,82,111,116,97,116,115,99,104,111,111,110,47,110,10,82,111,116,97,116,115,99,104,111,111,110,115,97,115,115,47,110,10,82,111,116,111,114,47,110,10,82,111,117,116,105,110,101,47,110,10,114,195,182,118,101,114,10,82,117,98,114,105,107,47,110,10,82,195,188,99,104,47,110,10,82,117,99,104,10,114,195,188,99,107,101,110,47,73,68,87,81,89,67,74,80,85,86,70,88,195,156,10,114,195,188,99,107,101,110,47,113,121,99,106,112,117,118,102,120,195,188,10,82,117,99,107,115,97,99,107,10,82,117,99,107,115,195,164,99,107,10,114,195,188,107,101,110,10,114,195,188,195,188,107,10,114,195,188,195,188,107,115,116,10,114,195,188,195,188,107,116,10,82,117,108,108,47,110,10,82,117,108,108,98,97,104,110,47,110,10,114,117,108,108,101,110,47,67,89,74,65,90,85,80,70,81,88,115,10,114,117,108,108,101,110,47,99,121,106,97,122,117,112,102,113,120,10,82,117,108,108,101,114,47,83,10,82,117,108,108,115,99,104,111,104,10,82,117,108,108,115,99,104,195,182,104,10,114,195,188,109,10,114,195,188,109,97,115,101,110,10,114,195,188,109,97,97,115,47,68,87,77,79,10,114,195,188,109,98,117,116,116,106,101,114,110,10,114,195,188,109,101,110,47,81,74,80,85,88,10,114,195,188,109,101,110,47,113,106,112,117,120,10,114,195,188,195,188,109,47,68,87,77,79,81,74,80,85,88,10,82,117,110,100,47,110,10,114,117,110,100,10,114,117,110,110,101,47,110,10,82,117,110,100,115,116,195,188,99,107,47,110,10,82,117,110,110,47,110,10,114,117,110,110,10,97,102,114,117,110,110,47,115,10,114,117,110,110,101,110,47,73,68,81,80,195,156,10,114,117,110,110,101,110,47,113,112,195,188,10,114,117,110,100,116,47,81,80,195,156,10,114,117,115,101,110,47,65,81,66,85,86,10,114,117,115,101,110,47,97,113,117,10,114,117,117,115,47,68,87,77,79,65,81,66,85,86,10,114,117,116,10,82,117,116,103,101,118,101,114,47,83,10,114,117,116,115,99,104,47,67,89,90,82,85,71,86,81,88,76,115,10,114,117,116,115,99,104,101,110,47,99,121,122,114,117,103,113,120,108,10,82,117,116,115,99,104,98,97,104,110,47,110,10,114,117,117,99,104,47,101,110,10,82,117,117,109,97,110,116,111,103,10,82,117,117,109,97,110,116,195,188,99,104,10,82,117,117,109,102,195,164,104,114,10,82,117,117,109,102,111,104,114,116,47,110,10,82,117,117,109,102,111,104,114,116,195,188,99,104,10,82,117,117,109,102,111,104,114,116,195,188,103,101,10,82,117,117,109,10,82,195,188,195,188,109,10,82,117,117,109,115,111,110,100,10,82,117,117,112,47,110,10,82,117,117,116,47,110,10,83,97,97,103,47,110,10,83,97,97,107,47,110,10,115,97,99,104,101,110,10,115,97,99,104,101,110,115,10,115,97,99,104,116,115,10,115,97,99,104,116,101,110,115,10,83,97,99,107,10,83,195,164,99,107,10,83,97,102,116,10,83,195,164,102,116,10,83,97,108,97,116,47,110,10,115,97,109,109,101,108,47,115,81,65,74,72,80,90,75,71,85,86,70,88,10,115,97,109,109,101,108,110,47,113,97,106,104,112,122,107,103,117,118,102,120,10,83,97,110,100,10,83,97,110,100,98,97,104,110,47,110,10,83,97,110,100,98,111,100,100,101,110,47,83,10,83,97,110,100,107,105,115,116,47,110,10,83,97,110,100,107,117,104,108,47,110,10,83,97,110,100,108,111,99,107,10,83,97,110,100,108,195,182,99,107,101,114,10,83,97,116,101,108,108,105,116,47,110,10,83,97,116,101,108,108,105,116,101,110,98,105,108,100,10,83,97,116,101,108,108,105,116,101,110,98,105,108,108,101,114,10,115,97,116,116,47,101,110,10,83,97,116,116,104,101,105,116,10,83,97,116,122,10,83,195,164,116,122,10,115,99,104,97,97,100,47,115,10,115,99,104,97,97,100,104,97,102,116,105,103,47,101,110,10,83,99,104,97,97,100,115,116,111,102,102,47,110,10,83,99,104,97,97,108,47,83,10,83,99,104,97,108,101,110,10,83,99,104,97,97,112,10,83,99,104,97,99,104,10,83,99,104,97,99,104,98,114,101,116,116,10,83,99,104,97,99,104,98,114,101,101,100,10,83,99,104,97,99,104,98,114,101,100,101,114,10,83,99,104,97,99,104,115,112,105,108,108,47,83,10,111,100,101,114,10,83,99,104,97,99,104,115,112,101,101,108,47,110,10,83,99,104,97,100,100,101,110,47,83,10,83,99,104,97,100,101,110,47,115,10,115,99,104,97,102,102,47,67,89,65,90,71,80,66,81,88,115,10,115,99,104,97,102,102,101,110,47,99,121,97,122,103,112,113,120,10,83,99,104,97,108,108,112,108,97,116,116,47,110,10,115,99,104,97,108,116,101,110,47,73,68,87,77,79,65,81,74,80,84,85,86,70,88,195,156,10,115,99,104,97,108,116,101,110,47,97,113,106,112,116,117,102,120,195,188,10,83,99,104,97,108,116,101,114,47,83,10,83,99,104,97,108,116,106,111,104,114,47,110,10,83,99,104,97,108,116,107,114,105,110,107,47,110,10,83,99,104,97,110,100,97,97,108,10,83,99,104,97,110,100,97,108,10,83,99,104,97,110,103,115,47,110,10,83,99,104,97,110,122,47,110,10,83,99,104,97,110,122,101,110,100,105,115,99,104,47,110,10,115,99,104,97,112,101,110,47,65,66,89,67,90,75,71,88,10,115,99,104,97,112,101,110,47,97,121,99,122,107,103,120,10,115,99,104,97,97,112,47,68,87,77,79,65,66,89,67,90,75,71,88,10,83,99,104,195,164,112,101,114,104,117,110,100,10,83,99,104,195,164,112,101,114,104,117,110,110,101,110,10,83,99,104,97,112,112,10,83,99,104,195,164,112,112,10,115,99,104,97,114,112,47,101,110,10,115,99,104,97,114,112,101,114,47,101,110,10,115,99,104,97,114,112,115,116,47,101,110,10,83,99,104,97,114,112,100,101,10,115,99,104,97,114,112,101,110,47,73,68,87,77,79,10,83,99,104,97,116,116,47,110,10,83,99,104,97,117,47,110,10,115,99,104,101,100,101,110,47,81,67,85,86,10,115,99,104,101,100,101,110,47,113,99,117,10,115,99,104,101,101,100,47,68,87,77,79,81,67,85,86,10,83,99,104,101,101,100,115,103,101,114,105,99,104,116,47,110,10,83,99,104,101,101,100,115,114,105,99,104,116,101,114,47,83,10,83,99,104,101,101,100,115,114,105,99,104,116,101,114,115,99,104,101,47,110,10,115,99,104,101,101,102,10,115,99,104,101,118,101,47,110,10,83,99,104,101,101,110,47,110,10,115,99,104,101,101,112,47,101,110,10,83,99,104,101,101,114,47,110,10,83,99,104,101,101,114,10,83,99,104,101,114,101,110,10,115,99,104,101,101,114,10,115,99,104,101,114,101,110,47,65,82,74,85,10,115,99,104,101,114,101,110,47,97,114,106,117,10,115,99,104,101,101,114,47,68,87,77,79,65,82,74,85,10,115,99,104,101,101,116,10,115,99,104,101,116,101,110,47,81,66,82,74,80,10,115,99,104,101,116,101,110,47,113,114,106,112,10,115,99,104,101,101,116,47,81,66,82,74,80,10,115,99,104,195,188,116,116,115,116,47,81,66,82,74,80,10,115,99,104,195,188,116,116,47,81,66,82,74,80,10,115,99,104,111,111,116,47,68,81,66,82,74,80,10,115,99,104,111,116,101,110,47,81,66,82,74,80,10,115,99,104,97,116,101,110,47,81,66,82,74,80,10,115,99,104,101,108,101,110,10,115,99,104,101,101,108,47,68,87,77,79,10,83,99,104,101,108,108,47,110,10,83,99,104,101,109,97,47,83,10,115,99,104,101,110,107,47,74,85,66,86,88,115,10,115,99,104,101,110,107,101,110,47,106,117,120,10,115,99,104,117,110,107,101,110,47,74,85,66,86,88,10,115,99,104,105,99,107,47,101,110,10,115,99,104,105,99,107,47,115,65,66,81,82,74,84,89,67,86,70,88,10,115,99,104,105,99,107,101,110,47,97,113,114,106,116,121,99,102,120,10,115,99,104,105,99,107,101,110,10,97,102,115,99,104,105,99,107,47,115,10,83,99,104,105,99,107,115,97,108,10,115,99,104,105,101,110,101,110,47,73,68,87,65,66,82,80,71,86,10,115,99,104,105,101,110,101,110,47,97,114,112,103,10,115,99,104,105,101,114,47,101,110,10,83,99,104,105,101,116,10,115,99,104,105,101,116,101,110,47,73,81,65,66,90,75,71,84,85,86,88,10,115,99,104,105,101,116,101,110,47,113,97,122,107,103,116,117,120,10,115,99,104,105,116,116,47,68,81,65,66,90,75,71,84,85,86,88,10,115,99,104,101,101,116,47,68,81,65,66,90,75,71,84,85,86,88,10,115,99,104,101,116,101,110,47,81,65,66,90,75,71,84,85,86,88,10,83,99,104,105,101,116,104,117,117,115,10,115,99,104,105,101,116,105,103,47,101,110,10,83,99,104,105,101,118,47,110,10,83,99,104,105,101,118,47,110,10,83,99,104,105,108,100,10,83,99,104,105,108,100,107,114,195,182,195,182,116,47,110,10,83,99,104,105,108,100,112,97,100,100,101,10,83,99,104,105,109,109,101,108,115,119,97,109,109,10,83,99,104,105,109,109,101,108,115,119,195,164,109,109,10,115,99,104,105,109,112,47,85,66,115,10,115,99,104,105,109,112,101,110,47,117,10,83,99,104,105,112,112,98,114,195,188,99,104,47,110,10,83,99,104,105,112,112,101,114,47,83,10,83,99,104,105,112,112,101,114,101,101,10,83,99,104,105,112,112,101,114,115,99,104,101,47,110,10,83,99,104,105,112,112,102,111,104,114,116,47,110,10,83,99,104,105,112,112,10,83,99,104,101,101,112,10,83,99,104,105,112,112,115,102,101,110,115,116,101,114,47,110,10,83,99,104,105,112,112,115,108,97,115,116,47,110,10,83,99,104,105,112,112,115,108,195,188,195,188,100,10,83,99,104,105,114,109,47,110,10,83,99,104,111,104,10,83,99,104,195,182,104,10,83,99,104,111,107,111,108,97,97,100,47,110,10,115,99,104,195,182,108,101,110,10,115,99,104,97,108,108,47,68,10,115,99,104,195,182,195,182,108,116,10,115,99,104,117,108,108,101,110,47,73,68,87,77,79,10,83,99,104,195,182,108,101,114,47,83,10,83,99,104,111,111,108,47,110,10,83,99,104,111,111,108,97,114,98,101,105,116,10,83,99,104,111,111,108,97,114,98,101,105,100,101,110,10,83,99,104,111,111,108,104,111,102,102,10,83,99,104,111,111,108,104,195,182,195,182,118,10,83,99,104,111,111,108,106,111,104,114,47,110,10,83,99,104,111,111,108,109,101,101,115,116,101,114,47,83,10,83,99,104,111,111,108,116,97,115,99,104,47,110,10,83,99,104,111,111,108,119,101,103,10,83,99,104,111,111,108,119,101,101,103,10,115,99,104,195,182,195,182,110,47,101,110,10,83,99,104,195,182,195,182,110,104,101,105,116,47,110,10,83,99,104,195,182,195,182,114,10,83,99,104,195,182,114,101,110,10,83,99,104,195,182,195,182,116,10,83,99,104,195,182,116,101,110,10,83,99,104,111,115,116,101,101,110,10,83,99,104,111,116,116,101,114,10,83,99,104,111,116,116,101,114,115,116,114,97,97,116,47,110,10,83,99,104,114,101,99,107,10,115,99,104,114,101,101,103,47,101,110,10,115,99,104,114,101,101,110,47,65,71,97,103,10,115,99,104,114,101,101,47,65,71,97,103,10,115,99,104,114,101,101,115,116,47,65,71,97,103,10,115,99,104,114,101,101,116,47,65,71,97,103,10,83,99,104,114,105,99,107,47,110,10,83,99,104,114,105,101,102,97,114,98,101,105,116,10,83,99,104,114,105,101,102,97,114,98,101,105,100,101,110,10,115,99,104,114,105,101,102,98,111,114,47,101,110,10,83,99,104,114,105,101,102,100,105,115,99,104,47,110,10,83,99,104,114,105,101,102,102,101,104,108,101,114,47,83,10,83,99,104,114,105,101,102,109,97,115,99,104,105,101,110,10,83,99,104,114,105,101,102,109,97,115,99,104,105,110,101,110,10,83,99,104,114,105,101,102,112,114,111,103,114,97,109,109,47,110,10,115,99,104,114,105,101,102,115,99,104,117,117,108,116,47,101,110,10,83,99,104,114,105,101,102,115,121,115,116,101,101,109,10,83,99,104,114,105,101,102,115,121,115,116,101,109,101,110,10,83,99,104,114,105,101,102,118,101,114,108,195,182,195,182,102,10,83,99,104,114,105,101,102,118,101,114,108,195,182,118,101,110,10,83,99,104,114,105,101,102,119,105,101,115,47,110,10,115,99,104,114,105,101,118,101,110,47,73,87,65,81,66,82,74,80,90,84,67,85,86,70,195,156,10,115,99,104,114,105,101,118,101,110,47,97,113,114,106,112,122,116,99,117,102,195,188,10,115,99,104,114,105,102,102,115,116,47,65,81,66,82,74,80,90,84,67,85,86,70,195,156,10,115,99,104,114,105,102,102,116,47,65,81,66,82,74,80,90,84,67,85,86,70,195,156,10,115,99,104,114,101,101,118,47,68,65,81,66,82,74,80,90,84,67,85,86,70,195,156,10,115,99,104,114,101,118,101,110,47,65,81,66,82,74,80,90,84,67,85,86,70,195,156,10,115,99,104,114,105,101,118,101,110,10,195,182,118,101,114,115,99,104,114,101,118,101,110,10,195,182,118,101,114,115,99,104,114,105,101,118,101,110,10,195,182,118,101,114,115,99,104,114,105,101,118,116,10,195,182,118,101,114,115,99,104,114,105,102,102,116,10,83,99,104,114,105,101,118,101,114,47,83,10,83,99,104,114,105,102,116,47,110,10,83,99,104,114,105,102,116,103,114,195,182,116,116,10,83,99,104,114,105,102,116,107,108,195,182,195,182,114,47,110,10,115,99,104,114,105,102,116,108,105,99,104,47,101,110,10,83,99,104,114,105,102,116,111,111,114,116,10,83,99,104,114,105,102,116,111,111,114,100,101,110,10,83,99,104,114,105,102,116,115,97,116,122,10,83,99,104,114,105,102,116,115,116,105,108,47,110,10,115,99,104,114,105,109,112,101,110,47,73,68,87,77,79,74,10,115,99,104,114,105,109,112,101,110,47,106,10,83,99,104,114,105,116,116,10,83,99,104,114,101,101,100,10,83,99,104,114,117,117,118,47,110,10,83,99,104,114,117,117,118,115,116,111,108,108,47,110,10,115,99,104,117,98,115,47,65,90,195,156,71,75,88,115,10,115,99,104,117,98,115,101,110,47,97,122,195,188,103,107,120,10,115,99,104,195,188,99,104,116,101,114,110,47,101,110,10,83,99,104,117,99,107,101,108,47,110,10,115,99,104,117,99,107,101,108,47,115,10,115,99,104,195,188,100,100,101,108,110,47,73,68,87,77,79,81,82,71,85,10,115,99,104,195,188,100,100,101,108,110,47,113,114,103,117,10,83,99,104,195,188,102,102,101,108,47,110,10,83,99,104,117,108,108,101,114,47,110,10,115,99,104,117,109,109,101,108,47,115,10,115,99,104,117,109,109,101,114,110,47,73,68,87,10,115,99,104,117,116,101,114,110,47,73,68,87,77,79,89,67,74,72,84,85,88,195,156,10,115,99,104,117,116,101,114,110,47,121,99,106,104,116,117,120,195,188,10,83,99,104,117,116,122,10,115,99,104,117,117,108,47,115,10,83,99,104,117,117,108,10,115,99,104,117,117,108,115,97,109,47,101,110,10,83,99,104,117,117,109,10,115,99,104,117,118,101,110,47,65,81,82,74,80,90,75,71,84,89,67,86,70,88,10,115,99,104,117,118,101,110,47,97,113,114,106,112,122,107,103,116,121,99,102,120,10,115,99,104,117,117,118,47,87,65,81,82,74,80,90,75,71,84,89,67,86,70,88,10,115,99,104,117,102,102,115,116,47,65,81,82,74,80,90,75,71,84,89,67,86,70,88,10,115,99,104,117,102,102,116,47,65,81,82,74,80,90,75,71,84,89,67,86,70,88,10,115,99,104,111,111,118,47,68,65,81,82,74,80,90,75,71,84,89,67,86,70,88,10,115,99,104,111,118,101,110,47,65,81,82,74,80,90,75,71,84,89,67,86,70,88,10,115,99,104,97,118,101,110,47,65,81,82,74,80,90,75,71,84,89,67,86,70,88,10,83,99,104,117,118,101,114,47,83,10,83,67,83,73,10,115,101,10,83,101,101,109,97,110,110,10,83,101,101,108,195,188,195,188,100,10,83,101,101,109,105,101,108,47,110,10,83,101,101,112,10,83,101,101,10,83,101,101,110,10,83,101,101,115,116,101,101,114,110,10,83,101,101,116,101,107,101,110,47,83,10,115,101,103,103,101,110,47,73,68,87,77,79,65,81,82,80,84,85,86,70,10,115,101,103,103,101,110,47,97,113,114,112,116,117,102,10,115,101,101,47,68,65,81,82,80,84,85,86,70,10,115,101,101,110,47,65,81,82,80,84,85,86,70,10,115,101,103,103,101,110,10,97,102,115,101,103,103,47,115,10,83,101,103,109,101,110,116,47,110,10,115,101,104,101,110,47,68,10,115,101,104,110,47,65,81,66,82,74,80,84,89,67,85,86,70,88,10,115,101,104,110,47,97,113,114,106,112,116,121,99,117,102,120,10,115,101,104,47,65,81,66,82,74,80,84,89,67,85,86,70,88,10,115,195,188,104,115,116,47,65,81,66,82,74,80,84,89,67,85,86,70,88,10,115,195,188,104,116,47,65,81,66,82,74,80,84,89,67,85,86,70,88,10,115,101,104,116,47,65,81,66,82,74,80,84,89,67,85,86,70,88,10,115,101,101,103,47,65,81,66,82,74,80,84,89,67,85,86,70,88,10,115,101,101,103,115,116,47,65,81,66,82,74,80,84,89,67,85,86,70,88,10,115,101,103,101,110,47,65,81,66,82,74,80,84,89,67,85,86,70,88,10,115,101,105,101,110,47,74,65,85,115,106,97,117,10,115,101,105,104,101,110,47,68,10,83,101,105,108,98,111,111,116,10,83,101,105,108,98,195,182,195,182,100,10,83,101,105,108,115,99,104,105,112,112,10,83,101,105,108,115,99,104,101,101,112,10,83,101,107,10,115,101,107,101,114,47,101,110,10,115,101,107,114,101,114,47,101,110,10,115,101,107,101,114,115,116,47,101,110,10,115,101,107,101,114,47,115,10,83,101,107,101,114,104,101,105,116,47,110,10,83,101,107,101,114,104,101,105,116,115,107,111,112,105,101,10,83,101,107,101,114,104,101,105,116,115,107,111,112,105,101,110,10,83,101,107,101,114,104,101,105,116,115,119,111,104,114,115,99,104,111,101,110,10,115,101,107,101,114,110,47,73,68,87,77,79,81,66,84,86,10,115,101,107,101,114,110,47,113,116,10,83,101,107,116,111,114,47,110,10,83,101,107,117,110,110,47,110,10,83,101,107,117,110,110,101,110,119,105,101,115,101,114,47,83,10,83,101,108,101,107,115,99,104,111,111,110,47,110,10,83,101,108,108,115,99,104,111,112,10,83,101,108,108,115,99,104,111,112,112,101,110,10,83,101,109,105,107,111,108,111,110,47,83,10,83,101,110,97,116,10,115,101,110,110,101,110,47,73,68,81,74,84,89,67,85,86,88,10,115,101,110,110,101,110,47,113,106,116,121,99,117,118,120,10,115,101,110,100,116,47,81,74,84,89,67,85,86,88,10,115,101,110,100,116,101,47,81,74,84,89,67,85,86,88,10,115,101,110,100,116,101,110,47,81,74,84,89,67,85,86,88,10,83,101,110,110,101,114,47,83,10,83,101,110,115,111,114,47,110,10,83,101,110,115,111,114,116,121,112,47,110,10,83,101,113,117,101,110,122,47,110,10,115,101,114,105,101,108,108,47,101,110,10,83,101,114,105,101,110,110,117,109,109,101,114,47,110,10,83,101,114,105,101,10,83,101,114,105,101,110,10,83,101,114,118,101,114,47,83,10,83,101,115,115,101,108,47,83,10,115,101,116,116,101,110,47,73,68,87,77,79,65,81,66,82,74,80,90,75,71,84,67,89,85,86,70,88,195,156,76,10,115,101,116,116,101,110,47,97,113,114,106,112,122,107,103,116,99,121,117,102,120,195,188,108,10,115,101,116,116,10,102,114,101,101,115,101,116,116,47,115,10,102,114,101,101,116,111,115,101,116,116,101,110,10,83,101,118,101,114,47,83,10,83,101,98,98,101,114,47,83,10,83,105,99,104,116,47,110,10,115,105,99,104,116,98,111,114,47,101,110,10,83,105,99,104,116,98,111,114,107,101,105,116,47,110,10,83,105,99,104,116,102,101,108,100,10,83,105,99,104,116,102,101,108,108,101,114,10,83,105,99,104,116,119,105,101,116,10,83,105,101,100,101,110,108,105,101,110,47,110,10,83,105,101,100,119,97,116,101,114,10,115,105,101,110,10,115,105,101,116,47,101,110,10,115,105,101,116,101,114,47,101,110,10,115,105,101,116,115,116,47,101,110,10,83,105,101,116,10,83,105,101,100,101,110,10,83,105,103,110,97,108,47,110,10,83,105,103,110,97,116,117,114,47,110,10,115,105,107,10,83,105,109,117,108,97,116,115,99,104,111,111,110,47,110,10,115,105,109,117,108,101,101,114,47,115,10,115,105,110,103,101,110,47,80,70,112,102,10,105,107,10,115,105,110,103,47,80,70,10,100,117,10,115,105,110,103,115,116,47,80,70,10,104,101,10,115,105,110,103,116,47,80,70,10,105,107,10,115,117,110,103,47,80,70,10,115,195,188,110,103,47,80,70,10,100,117,10,115,117,110,103,115,116,47,80,70,10,115,195,188,110,103,115,116,47,80,70,10,104,101,10,115,117,110,103,47,80,70,10,115,195,188,110,103,47,80,70,10,119,105,10,115,117,110,103,101,110,47,80,70,10,115,117,110,103,101,110,47,101,110,10,83,105,110,110,10,115,105,110,110,101,110,47,73,68,87,66,10,115,117,110,110,47,66,10,115,117,110,110,115,116,47,66,10,115,117,110,110,101,110,47,66,10,115,105,110,110,105,103,47,101,110,10,115,105,110,110,118,117,108,108,47,101,110,10,83,105,116,116,47,83,10,115,105,116,116,101,110,47,73,68,81,74,85,70,10,115,105,116,116,101,110,47,113,106,117,102,10,115,101,101,116,47,68,81,74,85,70,10,115,101,116,101,110,47,81,74,85,70,10,83,105,116,116,105,99,104,47,110,10,83,105,116,117,97,116,115,99,104,111,111,110,47,110,10,83,107,97,108,97,47,83,10,115,107,97,108,101,101,114,47,115,10,115,107,97,108,101,101,114,98,111,114,47,101,110,10,115,107,97,110,100,105,110,97,97,118,115,99,104,47,101,110,10,83,107,105,98,114,105,108,108,47,110,10,83,107,105,102,108,101,103,101,110,10,83,107,105,104,97,110,100,115,99,104,111,104,10,83,107,105,104,97,110,100,115,99,104,195,182,104,10,83,107,105,10,83,107,105,101,114,10,83,107,105,115,112,114,105,110,103,101,110,10,83,107,105,115,112,114,117,110,103,10,83,107,105,115,112,114,195,188,110,103,10,83,107,105,115,116,101,118,101,108,47,110,10,83,107,105,115,116,111,99,107,10,83,107,105,115,116,195,182,99,107,10,83,107,114,105,112,116,47,110,10,115,108,97,97,110,47,65,81,66,82,67,74,72,80,84,85,70,88,10,115,108,97,97,110,47,97,113,98,114,99,106,104,112,116,117,102,120,10,115,108,97,47,65,81,66,82,67,74,72,80,84,85,70,88,10,115,108,101,105,115,116,47,65,81,66,82,67,74,72,80,84,85,70,88,10,115,108,101,105,116,47,65,81,66,82,67,74,72,80,84,85,70,88,10,115,108,97,97,116,47,65,81,66,82,67,74,72,80,84,85,70,88,10,115,108,111,111,103,47,68,65,81,66,82,67,74,72,80,84,85,70,88,10,115,108,111,103,101,110,47,65,81,66,82,67,74,72,80,84,85,70,88,10,83,108,97,97,112,10,83,108,97,99,104,116,47,110,10,115,108,97,99,104,116,47,85,81,115,10,115,108,97,99,104,116,101,110,47,117,113,10,83,108,97,99,104,116,101,114,47,83,10,83,108,97,99,104,116,101,114,115,99,104,47,110,10,83,108,195,164,103,101,114,47,83,10,83,108,97,103,10,83,108,195,164,195,164,103,10,83,108,97,103,119,105,101,115,47,110,10,83,108,97,108,111,109,10,83,108,97,110,103,47,110,10,115,108,97,110,107,47,101,110,10,115,108,97,110,107,101,114,47,101,110,10,115,108,97,110,107,115,116,47,101,110,10,115,108,97,112,101,110,47,66,82,74,84,85,86,70,88,10,115,108,97,112,101,110,47,114,106,116,117,102,120,10,115,108,97,97,112,47,87,66,82,74,84,85,86,70,88,10,115,108,195,182,112,112,115,116,47,66,82,74,84,85,86,70,88,10,115,108,195,182,112,112,116,47,66,82,74,84,85,86,70,88,10,115,108,101,101,112,47,68,66,82,74,84,85,86,70,88,10,115,108,101,112,101,110,47,66,82,74,84,85,86,70,88,10,115,108,97,117,47,101,110,10,115,108,97,117,101,114,47,101,110,10,115,108,97,117,115,116,47,101,110,10,83,108,97,117,99,104,10,83,108,195,164,117,99,104,10,115,108,101,99,104,116,47,101,110,10,115,108,101,99,104,116,101,114,47,101,110,10,115,108,101,99,104,116,115,116,47,101,110,10,83,108,101,100,101,110,47,83,10,115,108,101,117,100,101,114,47,67,89,90,82,85,86,88,115,10,115,108,101,117,100,101,114,110,47,99,121,122,114,117,120,10,115,108,105,101,107,101,110,10,105,107,10,115,108,105,101,107,47,67,89,74,65,90,82,71,88,10,100,117,10,115,108,105,101,107,115,116,47,67,89,74,65,90,82,71,88,10,115,108,105,99,107,115,116,47,67,89,74,65,90,82,71,88,10,104,101,10,115,108,105,101,107,116,47,67,89,74,65,90,82,71,88,10,115,108,105,99,107,116,47,67,89,74,65,90,82,71,88,10,105,107,10,115,108,101,101,107,47,67,89,74,65,90,82,71,88,10,100,117,10,115,108,101,101,107,115,116,47,67,89,74,65,90,82,71,88,10,104,101,10,115,108,101,101,107,47,67,89,74,65,90,82,71,88,10,119,105,10,115,108,101,107,101,110,47,67,89,74,65,90,82,71,88,10,115,108,101,107,101,110,47,101,110,67,89,74,65,90,82,71,88,10,83,108,105,101,112,112,97,112,101,101,114,10,115,108,105,109,109,47,101,110,10,115,108,105,109,109,101,114,47,101,110,10,115,108,105,109,109,115,116,47,101,110,10,83,108,195,182,195,182,112,10,83,108,195,182,112,101,110,10,83,108,195,182,116,101,108,47,83,10,83,108,195,182,116,101,108,116,121,112,47,110,10,83,108,195,182,116,101,108,119,111,111,114,116,10,83,108,195,182,116,101,108,119,195,182,195,182,114,10,83,108,111,116,116,10,83,108,195,182,195,182,116,10,83,108,195,182,116,116,101,114,10,115,108,117,107,101,110,47,86,88,120,10,115,108,117,117,107,47,86,88,120,10,115,108,117,99,107,115,116,47,86,88,120,10,115,108,117,99,107,116,47,86,88,120,10,115,108,111,107,101,110,47,86,88,120,10,83,108,195,188,115,101,110,100,111,111,114,10,83,108,195,188,115,101,110,100,111,114,101,110,10,83,108,117,115,115,10,115,108,117,116,101,110,47,65,81,66,74,80,84,85,86,10,115,108,117,116,101,110,47,97,113,106,112,116,117,10,115,108,117,117,116,47,65,81,66,74,80,84,85,86,10,115,108,117,116,116,115,116,47,65,81,66,74,80,84,85,86,10,115,108,117,116,116,47,65,81,66,74,80,84,85,86,10,115,108,111,111,116,47,68,65,81,66,74,80,84,85,86,10,115,108,111,116,101,110,47,65,81,66,74,80,84,85,86,10,115,108,97,116,101,110,47,65,81,66,74,80,84,85,86,10,83,108,195,188,195,188,115,47,110,10,83,109,97,99,107,10,115,109,97,108,108,47,101,110,10,83,109,97,114,97,103,100,47,110,10,83,109,97,114,116,107,111,111,114,116,47,110,10,115,109,101,99,107,47,81,115,10,115,109,101,99,107,101,110,47,113,10,83,109,101,101,100,10,83,109,101,100,101,110,10,115,109,101,114,101,110,47,65,66,74,72,80,90,75,84,85,86,70,88,10,115,109,101,114,101,110,47,97,98,106,104,112,122,107,116,117,118,102,120,10,115,109,101,101,114,47,68,87,77,79,81,65,66,74,72,80,90,75,84,85,86,70,88,10,115,109,105,101,116,101,110,47,73,65,81,66,74,71,84,89,67,88,10,115,109,105,101,116,101,110,47,97,113,98,106,103,116,121,99,120,10,115,109,105,116,116,115,116,47,65,81,66,74,71,84,89,67,88,10,115,109,105,116,116,47,65,81,66,74,71,84,89,67,88,10,115,109,101,101,116,47,68,65,81,66,74,71,84,89,67,88,10,115,109,101,116,101,110,47,65,81,66,74,71,84,89,67,88,10,115,109,195,182,108,116,101,110,47,73,68,87,77,79,81,82,74,80,90,71,85,86,88,195,156,10,115,109,195,182,108,116,101,110,47,113,114,106,112,122,103,117,118,120,195,188,10,115,109,111,108,116,101,110,47,81,82,74,80,90,71,85,86,88,195,156,10,83,109,195,182,108,116,112,117,110,107,116,10,83,109,195,182,108,116,112,195,188,110,107,116,10,83,109,195,182,108,116,112,117,110,107,116,101,110,10,115,109,195,182,195,182,107,47,115,10,115,109,195,182,195,182,107,47,115,65,85,80,86,10,115,109,195,182,107,101,110,47,97,117,112,10,83,109,117,99,107,10,115,109,117,99,107,47,101,110,10,115,109,117,99,107,101,114,47,101,110,10,115,109,117,99,107,115,116,47,101,110,10,83,109,117,99,107,104,101,105,116,10,115,110,97,97,107,115,99,104,47,101,110,10,83,110,97,97,107,10,83,110,97,107,101,110,10,115,110,97,99,107,47,65,82,80,66,70,81,115,10,115,110,97,99,107,101,110,47,97,114,112,102,113,10,83,110,97,99,107,47,83,10,83,110,97,99,107,101,114,47,83,10,83,110,97,99,107,101,114,101,101,10,83,110,97,99,107,101,114,101,101,110,10,115,110,97,99,107,104,97,102,116,105,103,47,101,110,10,115,110,97,112,112,101,110,47,73,68,87,77,79,74,72,80,84,88,10,115,110,97,112,112,101,110,47,106,104,112,116,120,10,83,110,97,118,101,108,47,83,10,83,110,101,101,10,83,110,101,101,100,97,117,101,110,10,83,110,101,101,100,114,105,101,118,101,110,10,83,110,101,101,102,97,108,108,10,83,110,101,101,102,195,164,108,108,10,83,110,101,101,102,108,97,97,103,47,110,10,83,110,101,101,107,114,105,115,116,97,108,108,47,110,10,83,110,101,101,109,97,110,110,47,83,10,83,110,101,101,109,97,116,115,99,104,10,83,110,101,101,114,101,103,101,110,10,83,110,101,101,115,116,111,114,109,10,83,110,101,101,118,101,114,119,101,105,104,101,110,47,83,10,115,110,101,108,108,47,101,110,10,83,110,101,108,108,98,111,111,116,10,83,110,101,108,108,98,195,182,195,182,100,10,83,110,105,99,107,47,110,10,115,110,105,101,100,101,110,47,73,87,65,81,66,82,74,80,84,85,86,88,10,115,110,105,101,100,101,110,47,97,113,114,106,112,116,117,120,10,115,110,105,116,116,115,116,47,65,81,66,82,74,80,84,85,86,88,10,115,110,105,116,116,47,65,81,66,82,74,80,84,85,86,88,10,115,110,101,101,100,47,68,65,81,66,82,74,80,84,85,86,88,10,115,110,101,100,101,110,47,65,81,66,82,74,80,84,85,86,88,10,83,110,105,112,112,101,108,47,83,10,83,110,105,116,116,112,117,110,107,116,10,83,110,105,116,116,112,117,110,107,116,101,110,10,83,110,105,116,116,112,195,188,110,107,116,10,83,110,111,111,114,10,83,110,195,182,114,101,110,10,83,110,195,182,114,107,101,108,47,83,10,115,110,195,182,114,107,101,108,105,103,47,101,110,10,83,110,117,117,116,47,110,10,115,111,10,115,111,39,110,10,83,111,99,107,47,110,10,83,111,99,107,101,108,47,83,10,83,111,99,107,101,116,47,83,10,115,111,100,114,97,97,100,10,83,111,102,97,47,83,10,83,111,102,116,119,97,114,101,10,115,111,103,111,114,10,83,195,182,104,110,47,83,10,115,195,182,107,101,110,47,81,66,82,80,85,86,10,115,195,182,107,101,110,47,113,114,112,117,10,115,195,182,195,182,107,47,87,81,66,82,80,85,86,10,115,195,182,99,104,101,110,47,68,77,79,81,66,82,80,85,86,10,115,195,182,107,101,110,10,195,188,110,110,101,114,115,195,182,107,101,110,10,195,188,110,110,101,114,115,195,182,195,182,107,10,195,188,110,110,101,114,115,195,182,99,104,47,68,77,79,10,83,195,182,107,101,114,47,83,10,83,111,108,100,97,116,47,110,10,83,111,108,116,10,83,111,109,109,101,114,47,83,10,83,111,109,109,101,114,100,97,103,10,83,111,109,109,101,114,100,97,97,103,10,83,111,109,109,101,114,102,101,114,105,101,110,10,83,111,109,109,101,114,115,195,188,110,110,101,110,119,101,110,110,10,83,111,109,109,101,114,116,105,101,116,10,83,111,110,97,97,116,47,110,10,115,195,182,195,182,100,10,83,195,182,195,182,107,10,83,195,182,107,101,110,10,83,195,182,195,182,107,116,101,120,116,47,110,10,83,195,182,195,182,107,116,121,112,47,110,10,83,195,182,195,182,107,117,116,100,114,117,99,107,10,83,195,182,195,182,107,117,116,100,114,195,188,99,107,10,83,195,182,195,182,107,119,111,111,114,116,10,83,195,182,195,182,107,119,195,182,195,182,114,10,83,111,111,195,159,10,83,111,195,159,101,110,10,115,195,182,195,182,116,47,101,110,10,83,111,114,103,47,110,10,115,111,114,116,101,101,114,47,115,82,74,85,70,88,10,115,111,114,116,101,114,101,110,47,114,106,117,102,120,10,83,195,182,116,101,110,10,115,111,117,110,115,111,10,115,111,122,105,97,108,47,101,110,10,83,112,97,97,107,10,83,112,97,97,195,159,10,83,112,97,100,101,110,47,83,10,115,112,97,114,114,47,115,10,83,112,97,114,114,116,105,101,116,10,83,112,97,114,114,116,105,101,100,101,110,10,115,112,97,122,101,101,114,47,115,10,115,112,101,101,47,65,90,85,71,66,75,115,10,115,112,101,101,110,47,97,122,117,103,107,10,115,112,101,101,108,47,115,10,83,112,101,101,108,98,97,97,115,47,110,10,83,112,101,101,108,98,97,104,110,47,110,10,83,112,101,101,108,98,97,110,107,47,110,10,83,112,101,101,108,98,114,101,116,116,10,83,112,101,101,108,98,114,101,101,100,10,83,112,101,101,108,98,114,101,100,101,114,10,83,112,101,101,108,102,101,108,100,10,83,112,101,101,108,102,101,108,108,101,114,10,115,112,101,101,108,10,109,105,116,115,112,101,108,101,110,10,109,105,116,115,112,101,101,108,47,68,87,77,79,10,83,112,101,101,108,115,97,107,101,110,10,83,112,101,101,108,10,83,112,101,108,101,110,10,83,112,101,101,108,115,116,195,164,114,107,47,110,10,83,112,101,101,108,115,116,111,111,112,47,110,10,83,112,101,101,108,116,111,103,10,83,112,101,101,108,116,195,182,195,182,103,10,83,112,101,101,108,116,195,188,103,101,110,10,83,112,101,101,108,116,195,188,195,188,99,104,10,83,112,101,101,108,116,195,188,103,101,110,10,83,112,101,101,114,115,109,105,101,116,101,110,10,115,112,101,103,101,108,47,115,10,83,112,101,103,101,108,47,83,10,83,112,101,107,116,114,97,108,116,121,112,47,110,10,83,112,101,107,116,114,117,109,47,83,10,115,112,101,108,101,110,47,65,81,74,80,84,85,86,70,10,115,112,101,108,101,110,47,97,113,106,112,116,117,102,10,115,112,101,101,108,47,68,87,77,79,65,81,74,80,84,85,86,70,10,83,112,101,108,101,114,47,83,10,83,112,101,108,101,114,119,101,115,115,101,108,47,83,10,83,112,101,110,110,47,110,10,115,112,101,110,110,101,110,47,73,68,87,77,79,10,115,112,101,122,105,97,108,10,115,112,105,101,103,101,110,47,73,87,65,66,82,67,72,90,75,71,85,88,10,115,112,105,101,103,101,110,47,105,119,97,114,99,104,122,107,103,117,120,10,115,112,105,103,103,115,116,47,65,66,82,67,72,90,75,71,85,88,10,115,112,105,103,103,116,47,65,66,82,67,72,90,75,71,85,88,10,115,112,101,101,103,47,68,65,66,82,67,72,90,75,71,85,88,10,115,112,101,103,101,110,47,77,79,65,66,82,67,72,90,75,71,85,88,10,83,112,105,101,107,101,114,47,83,10,83,112,105,101,107,101,114,107,111,111,114,116,47,110,10,83,112,105,101,107,101,114,109,101,100,105,117,109,10,83,112,105,101,107,101,114,109,101,100,105,101,110,10,115,112,105,101,107,101,114,110,47,73,68,87,77,79,81,74,10,115,112,105,101,107,101,114,110,47,113,106,10,83,112,105,108,108,47,83,10,111,100,101,114,10,83,112,101,101,108,47,110,10,115,112,105,108,108,101,110,47,73,68,87,77,79,71,88,10,115,112,105,108,108,101,110,47,103,120,10,83,112,105,110,110,47,110,10,115,112,105,110,110,101,110,47,106,117,10,105,107,10,115,112,105,110,110,47,74,85,86,10,100,117,10,115,112,105,110,110,115,116,47,74,85,86,10,104,101,10,115,112,105,110,110,116,47,74,85,86,10,105,107,10,115,112,117,110,110,47,74,85,86,10,115,112,195,188,110,110,47,74,85,86,10,100,117,10,115,112,117,110,110,115,116,47,74,85,86,10,115,112,195,188,110,110,115,116,47,74,85,86,10,104,101,10,115,112,117,110,110,47,74,85,86,10,115,112,195,188,110,110,47,74,85,86,10,119,105,10,115,112,117,110,110,101,110,47,74,85,86,10,115,112,195,188,110,110,101,110,47,74,85,86,10,115,112,117,110,110,101,110,47,74,85,86,101,110,10,115,112,105,111,110,101,101,114,47,115,85,10,115,112,105,111,110,101,114,101,110,47,117,10,83,112,105,111,111,110,47,110,10,83,112,105,114,97,97,108,47,110,10,115,112,105,114,97,97,108,115,99,104,47,101,110,10,115,112,105,116,122,47,101,110,10,115,112,105,116,122,47,115,10,83,112,105,116,122,101,114,47,83,10,83,112,195,182,107,101,114,47,83,10,115,112,195,182,108,101,110,47,81,65,82,89,67,72,71,85,70,88,10,115,112,195,182,108,101,110,47,113,97,114,121,99,104,103,117,102,120,10,115,112,195,182,195,182,108,47,68,87,77,79,81,65,82,89,67,72,71,85,70,88,10,83,112,111,111,100,10,115,112,195,182,195,182,107,47,115,10,83,112,111,111,108,47,110,10,115,112,111,111,114,47,115,10,115,112,111,111,114,47,115,65,81,74,80,10,83,112,111,111,114,10,83,112,195,182,195,182,114,10,83,112,111,114,101,110,10,115,112,195,182,114,101,110,47,82,72,80,90,85,70,10,115,112,195,182,114,101,110,47,114,104,112,122,117,102,10,115,112,195,182,195,182,114,47,68,87,77,79,82,72,80,90,85,70,10,83,112,111,114,116,10,83,112,111,114,116,112,108,97,116,122,10,83,112,111,114,116,112,108,195,164,116,122,10,83,112,114,97,97,107,47,110,10,115,112,114,101,107,101,110,47,81,65,66,82,90,82,71,85,86,70,10,115,112,114,101,107,101,110,47,113,97,114,122,114,103,117,102,10,115,112,114,101,101,107,47,87,81,65,66,82,90,82,71,85,86,70,10,115,112,114,105,99,107,115,116,47,81,65,66,82,90,82,71,85,86,70,10,115,112,114,105,99,107,116,47,81,65,66,82,90,82,71,85,86,70,10,115,112,114,111,111,107,47,68,81,65,66,82,90,82,71,85,86,70,10,115,112,114,111,107,101,110,47,81,65,66,82,90,82,71,85,86,70,10,115,112,114,97,107,101,110,47,77,79,81,65,66,82,90,82,71,85,86,70,10,115,112,114,105,110,103,101,110,47,73,68,87,65,81,82,74,80,88,10,115,112,114,105,110,103,101,110,47,97,113,114,106,112,120,10,115,112,114,117,110,103,101,110,47,73,68,65,81,82,74,80,88,10,83,112,114,105,110,103,112,101,101,114,100,10,83,112,114,105,110,103,112,101,101,114,10,83,112,114,105,110,103,114,105,101,100,101,110,10,83,112,114,105,110,103,115,97,100,100,101,108,47,83,10,115,112,114,195,182,104,101,110,47,73,68,87,77,79,65,66,82,67,74,72,80,90,75,71,84,85,86,10,115,112,114,195,182,104,101,110,47,97,98,114,99,106,104,112,122,107,103,116,117,118,10,83,112,114,195,182,195,182,107,10,83,112,114,195,182,107,101,110,10,83,112,114,111,111,116,10,83,112,114,111,116,101,110,10,115,112,114,195,188,116,116,101,110,47,73,68,87,77,79,81,65,66,67,74,72,80,90,75,71,84,86,70,88,195,156,10,115,112,114,195,188,116,116,101,110,47,113,97,98,99,106,104,112,122,107,103,116,118,102,120,195,188,10,83,113,117,97,115,104,98,97,108,108,10,83,113,117,97,115,104,98,195,164,108,108,10,83,113,117,97,115,104,104,111,102,102,10,83,113,117,97,115,104,104,195,182,195,182,118,10,83,116,97,97,116,47,110,10,115,116,97,97,116,115,10,115,116,97,97,116,115,99,104,47,101,110,10,83,116,97,100,116,10,83,116,195,164,100,101,114,10,83,116,97,102,102,104,111,111,99,104,115,112,114,117,110,103,10,83,116,97,102,102,104,111,111,99,104,115,112,114,195,188,110,103,10,83,116,97,102,102,10,83,116,195,164,195,164,118,10,115,116,97,104,110,47,65,81,66,82,74,80,84,85,86,70,10,115,116,97,104,110,47,97,113,114,106,112,116,117,102,10,115,116,97,104,47,87,65,81,66,82,74,80,84,85,86,70,10,115,116,101,105,104,115,116,47,65,81,66,82,74,80,84,85,86,70,10,115,116,101,105,104,116,47,65,81,66,82,74,80,84,85,86,70,10,115,116,97,104,116,47,65,81,66,82,74,80,84,85,86,70,10,115,116,117,110,110,101,110,47,73,68,65,81,66,82,74,80,84,85,86,70,10,83,116,97,108,108,47,110,10,83,116,195,164,108,108,10,83,116,97,109,109,10,83,116,195,164,109,109,10,83,116,97,110,100,10,83,116,97,110,100,97,114,100,47,83,10,83,116,97,110,100,97,114,100,119,101,101,114,116,47,110,10,115,116,97,110,100,97,114,100,119,105,101,115,10,83,116,97,110,100,10,83,116,195,164,110,110,10,83,116,97,110,103,47,110,10,83,116,97,112,101,108,47,83,10,115,116,97,112,101,108,110,47,73,68,87,77,79,80,67,88,10,115,116,97,112,101,108,110,47,112,99,120,10,115,116,97,114,107,47,101,110,10,115,116,195,164,114,107,101,114,47,101,110,10,115,116,195,164,114,107,115,116,47,101,110,10,83,116,195,164,114,107,47,110,10,83,116,97,114,116,10,115,116,97,114,116,47,115,81,82,80,10,115,116,97,114,116,101,110,47,113,114,112,10,83,116,97,114,116,98,108,111,99,107,10,83,116,97,114,116,98,108,195,182,99,107,10,115,116,97,114,118,47,115,88,10,115,116,97,114,118,101,110,47,120,10,83,116,97,116,105,115,116,105,107,47,110,10,83,116,97,116,115,99,104,111,111,110,47,110,10,83,116,97,116,117,115,10,115,116,97,117,101,110,47,73,68,87,79,77,10,83,116,101,101,100,47,110,10,83,116,101,101,110,107,97,114,110,10,83,116,101,101,110,109,97,110,116,101,108,10,83,116,101,101,110,10,83,116,101,110,101,110,10,83,116,101,101,114,110,47,83,10,83,116,101,101,114,110,98,97,110,100,10,83,116,101,101,114,110,98,195,164,110,110,101,114,10,83,116,101,101,114,110,98,105,108,100,10,83,116,101,101,114,110,98,105,108,108,101,114,10,83,116,101,101,114,110,101,110,47,101,10,83,116,101,101,114,110,101,110,104,117,117,115,10,83,116,101,101,114,110,101,110,104,195,188,195,188,115,101,114,10,83,116,101,101,114,110,102,111,104,114,101,114,47,83,10,83,116,101,101,114,110,104,111,112,101,110,47,83,10,83,116,101,101,114,110,107,105,101,107,101,114,47,83,10,83,116,101,101,114,110,107,105,101,107,101,114,115,99,104,101,47,110,10,83,116,101,101,114,110,107,117,110,110,10,83,116,101,101,114,110,107,195,188,110,110,10,83,116,101,101,114,110,115,110,117,112,112,47,110,10,83,116,101,101,114,110,115,110,117,112,112,47,110,10,83,116,101,101,114,110,119,97,99,104,116,47,110,10,83,116,101,101,114,116,47,110,10,115,116,101,107,101,110,47,65,81,66,82,74,80,84,67,85,86,88,10,115,116,101,107,101,110,47,97,113,114,106,112,116,99,117,120,10,115,116,101,101,107,47,68,87,65,81,66,82,74,80,84,67,85,86,88,10,115,116,105,99,107,115,116,47,65,81,66,82,74,80,84,67,85,86,88,10,115,116,105,99,107,116,47,65,81,66,82,74,80,84,67,85,86,88,10,115,116,105,99,107,47,65,81,66,82,74,80,84,67,85,86,88,10,83,116,101,107,101,114,47,83,10,115,116,101,108,108,47,115,65,81,66,82,89,74,80,84,67,85,86,70,88,195,156,76,10,115,116,101,108,108,101,110,47,97,113,98,114,121,106,112,116,99,117,118,102,120,195,188,108,10,116,111,104,111,111,112,115,116,101,108,108,47,115,10,116,111,104,111,111,112,116,111,115,116,101,108,108,101,110,10,115,116,101,108,108,101,110,10,100,111,114,115,116,101,108,108,101,110,47,73,68,87,77,79,10,115,116,101,108,108,10,104,111,111,99,104,115,116,101,108,108,47,115,10,104,111,111,99,104,116,111,115,116,101,108,108,101,110,10,83,116,101,109,112,101,108,47,83,10,83,116,101,118,101,108,10,83,116,101,118,101,108,110,10,83,116,101,118,101,110,47,83,10,115,116,101,118,105,103,47,101,110,10,115,116,101,118,105,103,101,114,47,101,110,10,115,116,101,118,105,103,115,116,47,101,110,10,83,116,101,118,105,103,107,101,105,116,47,110,10,83,116,105,101,103,98,195,182,103,101,108,47,83,10,115,116,105,101,103,101,110,47,73,87,65,81,66,82,74,80,84,85,86,10,115,116,105,101,103,101,110,47,97,113,114,106,112,116,117,10,115,116,105,103,103,115,116,47,65,81,66,82,74,80,84,85,86,10,115,116,105,103,103,116,47,65,81,66,82,74,80,84,85,86,10,115,116,101,101,103,47,68,65,81,66,82,74,80,84,85,86,10,115,116,101,103,101,110,47,65,81,66,82,74,80,84,85,86,10,83,116,105,102,116,47,110,10,83,116,105,108,47,110,10,115,116,105,108,108,47,101,110,10,83,116,105,109,109,47,110,10,115,116,105,109,109,101,110,47,73,68,87,77,79,65,81,66,74,84,86,10,115,116,105,109,109,101,110,47,97,113,106,116,10,83,116,111,99,107,10,83,116,195,182,99,107,10,83,116,195,182,99,107,101,114,10,83,116,111,102,102,10,83,116,111,102,102,47,110,10,83,116,111,102,102,10,83,116,111,102,102,115,116,111,114,109,10,83,116,111,102,102,119,101,115,115,101,108,47,83,10,83,116,111,104,108,10,83,116,195,182,104,108,10,115,116,111,108,116,47,101,110,10,115,116,111,108,116,101,114,47,101,110,10,83,116,111,111,112,47,110,10,115,116,195,182,195,182,114,47,115,10,115,116,195,182,195,182,114,47,115,10,115,116,195,182,195,182,114,47,115,80,10,83,116,195,182,195,182,114,102,97,108,108,10,83,116,195,182,195,182,114,102,195,164,108,108,10,115,116,195,182,195,182,114,109,115,99,104,47,101,110,10,83,116,111,111,116,10,83,116,195,182,195,182,116,10,83,116,195,182,195,182,116,119,105,101,115,47,110,10,115,116,111,112,101,110,47,81,65,75,195,156,10,115,116,111,112,101,110,47,113,97,107,195,188,10,115,116,111,111,112,47,68,87,77,79,81,65,75,195,156,10,83,116,111,112,112,10,115,116,111,112,112,47,115,81,80,10,115,116,111,112,112,101,110,47,90,84,85,86,81,88,73,68,87,79,77,113,10,83,116,111,112,112,107,108,111,99,107,47,110,10,83,116,111,114,109,98,195,182,47,110,10,115,116,195,182,114,109,101,110,47,73,68,87,79,77,10,83,116,195,182,114,109,101,114,114,117,112,115,47,110,10,83,116,111,114,109,102,108,111,111,116,10,83,116,111,114,109,102,108,111,116,101,110,10,115,116,195,182,114,109,115,99,104,47,101,110,10,83,116,111,114,109,10,83,116,195,182,114,109,10,115,116,195,182,114,116,101,110,47,73,68,87,77,79,81,74,10,115,116,195,182,114,116,101,110,47,111,113,106,10,115,116,195,182,116,101,110,47,65,81,82,89,67,80,84,85,86,88,10,115,116,195,182,116,101,110,47,97,113,114,121,99,112,116,117,120,10,115,116,195,182,195,182,116,47,65,81,82,89,67,80,84,85,86,88,10,115,116,195,182,116,116,47,68,65,81,82,89,67,80,84,85,86,88,10,115,116,195,182,116,116,101,110,47,65,81,82,89,67,80,84,85,86,88,10,115,116,195,182,118,101,114,47,115,82,10,83,116,114,97,97,102,47,110,10,83,116,114,97,97,102,98,97,110,107,10,83,116,114,97,97,102,98,195,164,110,107,10,83,116,114,97,97,102,108,105,101,110,47,110,10,83,116,114,97,97,102,114,117,117,109,10,83,116,114,97,97,102,114,195,188,195,188,109,10,83,116,114,97,97,116,47,110,10,83,116,114,97,104,108,47,110,10,115,116,114,97,104,108,101,110,47,73,68,87,77,79,81,65,66,82,89,67,74,90,71,84,85,86,10,115,116,114,97,104,108,101,110,47,113,97,114,121,99,106,122,103,116,117,10,115,116,114,97,107,101,108,47,115,10,83,116,114,97,110,100,10,83,116,114,195,164,110,110,10,83,116,114,97,116,101,103,105,101,10,83,116,114,97,116,101,103,105,101,110,10,83,116,114,97,116,101,110,98,97,104,110,47,110,10,83,116,114,97,116,101,110,116,111,108,108,10,83,116,114,97,116,101,110,116,195,182,108,108,10,83,116,114,97,116,111,115,112,104,195,164,195,164,114,47,110,10,115,116,114,97,116,111,115,112,104,195,164,195,164,114,115,99,104,47,101,110,10,83,116,114,101,101,107,47,110,10,115,116,114,101,101,107,10,100,195,182,114,115,116,114,101,101,107,47,115,10,83,116,114,101,109,101,108,47,83,10,115,116,114,101,110,103,47,101,110,10,115,116,114,101,110,103,101,114,47,101,110,10,115,116,114,101,110,103,115,116,47,101,110,10,83,116,114,101,117,10,83,84,82,71,10,83,116,114,103,10,83,116,114,105,101,100,101,114,47,83,10,83,116,114,105,101,100,115,99,104,111,104,10,83,116,114,105,101,100,115,99,104,195,182,104,10,83,116,114,105,101,107,10,115,116,114,105,101,107,101,110,47,73,87,65,82,74,85,86,70,88,10,115,116,114,105,101,107,101,110,47,97,114,106,117,102,120,10,115,116,114,105,99,107,115,116,47,65,82,74,85,86,70,88,10,115,116,114,105,99,107,116,47,65,82,74,85,86,70,88,10,115,116,114,101,101,107,47,68,65,82,74,85,86,70,88,10,115,116,114,101,107,101,110,47,65,82,74,85,86,70,88,10,83,116,114,105,101,112,47,110,10,83,116,114,105,101,112,101,110,47,83,10,83,116,114,105,101,116,10,83,116,114,105,101,100,101,110,10,83,116,114,111,104,10,83,116,114,111,111,109,115,112,105,101,107,101,114,47,83,10,83,116,114,111,111,109,115,112,111,111,114,108,97,109,112,47,110,10,83,116,114,111,111,109,10,83,116,114,195,182,195,182,109,10,83,116,114,117,107,116,117,114,47,110,10,83,116,114,195,188,109,112,98,195,188,120,47,110,10,83,116,114,117,109,112,10,83,116,114,195,188,109,112,10,83,116,195,188,99,107,47,110,10,115,116,117,100,101,101,114,47,115,10,83,116,117,100,101,110,116,47,110,10,115,116,195,188,101,114,47,115,65,82,89,67,85,86,88,10,115,116,195,188,101,114,110,47,97,114,121,99,117,120,10,83,116,195,188,101,114,98,111,111,114,100,10,115,116,195,188,101,114,10,108,111,111,115,115,116,195,188,101,114,47,115,10,83,116,195,188,101,114,109,97,110,110,10,83,116,195,188,101,114,108,195,188,195,188,100,10,115,116,117,107,101,110,47,73,68,87,79,77,10,115,116,117,109,109,47,101,110,10,83,116,117,109,112,47,110,10,83,116,117,110,110,47,110,10,83,116,195,188,110,110,10,83,116,195,188,110,110,101,110,119,105,101,115,101,114,47,83,10,83,116,195,188,110,110,10,83,116,195,188,110,110,101,110,10,115,116,195,188,116,116,101,110,47,73,68,87,77,79,65,80,10,83,116,117,117,118,10,83,116,117,118,101,110,10,83,117,98,114,111,117,116,105,110,101,10,83,117,98,114,111,117,116,105,110,101,110,10,83,195,188,100,101,110,10,83,195,188,195,188,100,10,83,195,188,195,188,100,119,101,115,116,10,83,195,188,195,188,100,111,111,115,116,10,83,117,101,114,115,116,111,102,102,109,97,115,107,47,101,110,10,83,117,102,102,105,120,10,83,117,102,102,105,120,101,110,10,115,117,103,101,110,47,81,65,82,74,80,90,75,71,85,88,10,115,117,103,101,110,47,113,97,114,106,112,122,107,103,117,120,10,115,117,117,103,47,87,81,65,82,74,80,90,75,71,85,88,10,115,195,188,103,103,115,116,47,81,65,82,74,80,90,75,71,85,88,10,115,195,188,103,103,116,47,81,65,82,74,80,90,75,71,85,88,10,115,111,111,103,47,68,81,65,82,74,80,90,75,71,85,88,10,115,111,103,101,110,47,81,65,82,74,80,90,75,71,85,88,10,115,97,103,101,110,47,81,65,82,74,80,90,75,71,85,88,10,115,195,188,108,118,101,47,110,10,83,195,188,108,118,101,110,115,99,104,114,105,102,116,47,110,10,115,195,188,108,118,101,10,115,195,188,108,118,101,110,10,115,195,188,108,118,105,103,47,101,110,10,115,195,188,108,118,115,116,10,115,195,188,108,118,105,103,101,47,110,10,83,195,188,108,118,115,116,104,195,188,108,112,107,111,112,112,101,108,47,115,10,83,195,188,108,118,115,116,109,111,111,114,100,47,110,10,115,195,188,108,118,115,116,115,116,195,164,110,110,105,103,47,101,110,10,115,195,188,108,118,115,116,115,116,195,164,110,110,105,103,101,114,47,101,110,10,115,195,188,108,118,115,116,10,115,195,188,108,118,115,116,109,97,97,107,116,47,101,110,10,83,195,188,108,118,10,83,195,188,108,118,101,110,10,83,117,109,109,47,110,10,115,117,109,109,47,115,10,83,117,109,112,10,83,195,188,109,112,10,83,117,110,100,104,101,105,116,10,83,195,188,110,110,47,110,10,83,195,188,110,110,97,118,101,110,100,10,83,195,188,110,110,100,97,103,10,83,195,188,110,110,101,110,100,195,188,195,188,115,116,101,114,110,105,115,10,83,195,188,110,110,101,110,101,110,101,114,103,105,101,10,83,195,188,110,110,101,110,108,105,99,104,116,97,110,108,97,97,103,47,110,10,83,195,188,110,110,101,110,108,105,99,104,116,122,101,108,108,47,110,10,83,195,188,110,110,101,110,108,111,111,112,10,83,195,188,110,110,101,110,111,112,103,97,110,103,10,83,195,188,110,110,101,110,111,112,103,195,164,110,103,10,83,195,188,110,110,101,110,112,108,97,99,107,101,110,10,83,195,188,110,110,101,110,115,99,104,105,101,110,10,83,195,188,110,110,101,110,115,116,114,97,104,108,47,110,10,83,195,188,110,110,101,110,115,121,115,116,101,109,47,101,10,83,195,188,110,110,101,110,195,188,110,110,101,114,103,97,110,103,10,83,195,188,110,110,101,110,195,188,110,110,101,114,103,195,164,110,103,10,83,195,188,110,110,101,110,118,101,114,100,195,188,195,188,115,116,101,114,110,10,83,195,188,110,110,101,110,119,105,110,100,47,101,10,115,195,188,110,110,101,114,47,101,110,10,115,195,188,110,110,101,114,108,105,99,104,47,101,110,10,115,195,188,110,110,101,114,110,47,73,68,87,77,79,81,85,10,115,195,188,110,110,101,114,110,47,113,117,10,83,195,188,110,110,101,114,116,97,115,116,47,110,10,83,195,188,110,110,101,114,116,101,107,101,110,47,83,10,83,195,188,110,110,115,121,115,116,101,101,109,47,110,10,83,195,188,110,110,119,101,110,110,47,110,10,83,195,188,110,110,119,105,110,100,10,83,195,188,110,110,119,105,110,110,10,83,195,188,110,110,119,105,110,110,101,110,10,115,195,188,110,115,116,10,115,117,112,101,110,47,85,71,80,86,81,88,117,103,112,113,120,10,115,117,117,112,47,85,71,80,86,81,88,10,115,195,188,112,112,115,116,47,85,71,80,86,81,88,10,115,195,188,112,112,116,47,85,71,80,86,81,88,10,115,117,117,112,116,47,85,71,80,86,81,88,10,115,117,112,101,114,10,83,117,112,112,47,110,10,115,195,188,195,188,107,47,101,110,10,83,195,188,195,188,107,10,83,195,188,107,101,110,10,115,195,188,195,188,114,47,101,110,10,83,195,188,195,188,114,10,83,195,188,114,101,110,10,115,117,117,115,47,115,10,115,117,117,116,106,101,47,110,10,115,119,97,99,104,47,101,110,10,115,119,97,99,104,101,114,47,101,110,10,115,119,97,99,104,115,116,47,101,110,10,115,119,97,114,116,47,101,110,10,115,119,97,114,116,101,114,47,101,110,10,115,119,97,114,116,115,116,47,101,110,10,115,119,97,116,116,47,101,110,10,115,119,97,116,116,101,114,47,101,110,10,115,119,97,116,116,115,116,47,101,110,10,83,119,101,101,114,116,102,105,115,99,104,47,101,10,83,119,101,101,116,10,83,119,101,101,116,98,97,110,100,10,83,119,101,101,116,98,195,164,110,110,101,114,10,115,119,101,101,118,47,115,65,81,82,89,67,74,70,88,195,156,10,115,119,101,101,118,101,110,47,97,113,114,121,99,106,102,120,195,188,10,83,119,101,109,109,97,110,116,111,103,10,83,119,101,109,109,97,110,116,195,182,195,182,103,10,83,119,101,109,109,98,101,99,107,101,110,47,83,10,115,119,101,109,109,101,110,10,105,107,10,115,119,101,109,109,10,100,117,10,115,119,101,109,109,115,116,10,104,101,10,115,119,101,109,109,116,10,119,105,10,115,119,101,109,109,116,10,119,105,10,115,119,101,109,109,101,110,10,115,119,101,109,109,116,47,101,110,10,115,119,111,109,109,101,110,47,101,110,10,115,119,117,109,109,101,110,47,101,110,10,83,119,101,109,109,101,114,47,83,10,83,119,101,109,109,101,114,115,99,104,101,47,110,10,83,119,101,109,109,119,101,115,116,47,101,110,10,83,119,101,109,109,119,101,115,116,47,110,10,83,119,101,109,109,119,101,116,116,115,116,114,105,101,116,10,83,119,101,109,109,119,101,116,116,115,116,114,105,101,100,101,110,10,83,119,101,115,116,101,114,47,110,10,83,195,188,115,116,101,114,47,110,10,115,119,101,116,101,110,47,73,68,87,10,115,119,105,101,103,101,110,47,97,10,105,107,10,115,119,105,101,103,47,65,86,10,100,117,10,115,119,105,103,103,115,116,47,65,86,10,104,101,10,115,119,105,103,103,116,47,65,86,10,105,107,10,115,119,101,101,103,47,65,86,10,100,117,10,115,119,101,101,103,115,116,47,65,86,10,104,101,10,115,119,101,101,103,47,65,86,10,119,105,10,115,119,101,103,101,110,47,65,86,10,115,119,101,103,101,110,47,101,110,65,86,10,115,119,105,101,109,101,108,105,103,47,101,110,10,83,119,105,101,110,10,83,119,105,101,110,101,103,101,108,47,83,10,115,119,105,101,115,116,101,114,110,47,73,68,87,77,79,66,74,84,10,115,119,105,101,115,116,101,114,110,47,106,116,10,115,119,105,110,110,101,110,47,73,68,87,67,86,10,115,119,105,110,110,101,110,47,99,10,115,119,117,110,110,101,110,47,73,68,87,67,86,10,115,119,111,111,114,47,101,110,10,115,119,111,114,101,114,47,101,110,10,115,119,111,111,114,115,116,47,101,110,10,83,119,111,111,114,107,114,97,102,116,10,83,119,111,111,114,109,101,116,97,108,108,47,101,110,10,83,119,195,188,109,109,107,114,97,97,110,47,83,10,83,121,109,98,111,108,47,110,10,115,121,109,98,111,111,108,115,99,104,47,101,110,10,83,121,109,102,111,110,105,101,10,83,121,109,112,104,111,110,105,101,110,10,115,121,109,102,111,111,110,115,99,104,47,101,110,10,83,121,109,108,105,110,107,47,83,10,83,121,109,109,101,116,114,105,101,47,110,10,115,121,109,109,101,116,114,105,115,99,104,47,101,110,10,115,121,110,99,104,114,111,110,47,101,110,10,115,121,110,99,104,114,111,110,105,115,101,101,114,47,115,10,115,121,110,101,114,103,101,101,116,115,99,104,47,101,110,10,83,121,110,101,114,103,105,101,10,83,121,110,101,114,103,105,101,110,10,83,121,110,111,110,195,188,109,47,110,10,115,121,110,116,97,107,116,115,99,104,47,101,110,10,83,121,110,116,97,120,10,83,121,110,116,97,120,102,101,104,108,101,114,47,83,10,83,121,115,116,101,109,47,110,10,115,121,115,116,101,109,97,97,116,115,99,104,47,101,110,10,84,97,98,101,108,108,47,110,10,84,65,66,10,84,97,98,47,83,10,84,97,98,116,97,115,116,10,84,97,98,117,108,97,116,111,114,47,110,10,116,97,99,104,101,110,116,105,103,10,101,101,110,117,110,116,97,99,104,101,110,116,105,103,10,117,110,116,97,99,104,101,110,116,105,103,10,116,97,99,104,117,110,116,97,99,104,101,110,116,105,103,10,84,97,102,101,108,10,84,97,102,101,108,110,10,84,97,104,108,109,105,100,100,101,108,47,83,10,84,195,164,104,110,98,195,182,115,116,47,110,10,84,195,164,104,110,100,111,107,116,101,114,47,83,10,84,195,164,104,110,112,97,115,116,10,84,97,104,110,114,97,100,10,84,97,104,110,114,195,182,195,182,100,10,84,97,104,110,10,84,195,164,104,110,10,84,97,107,116,47,110,10,84,97,107,116,105,107,47,110,10,84,97,108,101,114,47,83,10,84,97,108,108,47,110,10,84,97,110,103,47,110,10,116,97,110,103,101,101,114,47,115,10,84,97,110,103,101,110,115,10,84,97,110,103,101,110,116,47,110,10,116,97,110,107,47,115,10,84,97,110,107,101,114,47,83,10,84,97,110,107,115,99,104,105,112,112,10,84,97,110,107,115,99,104,101,101,112,10,84,97,112,101,101,116,10,84,97,112,101,116,101,110,10,84,97,114,105,102,47,110,10,84,97,114,105,102,115,116,114,105,101,116,10,116,97,114,114,101,110,47,73,68,87,77,79,82,89,67,86,70,88,10,116,97,114,114,101,110,47,114,121,99,102,120,10,84,97,115,99,104,47,110,10,84,97,115,99,104,101,110,100,111,111,107,10,84,97,115,99,104,101,110,100,195,182,107,101,114,10,84,97,115,99,104,101,110,114,101,101,107,110,101,114,10,84,97,115,115,47,110,10,84,97,115,116,47,110,10,84,97,115,116,97,116,117,114,47,110,10,116,97,115,116,101,110,47,73,68,87,77,79,81,66,90,75,71,70,10,116,97,115,116,101,110,47,113,122,107,103,102,10,84,97,115,116,107,111,109,98,105,110,97,116,115,99,104,111,111,110,47,110,10,84,97,117,10,84,97,117,101,110,10,84,66,10,84,101,99,104,110,105,107,47,110,10,116,101,99,104,110,105,115,99,104,47,101,110,10,84,101,99,107,101,108,47,83,10,84,101,101,47,83,10,84,101,101,107,97,107,101,114,47,83,10,84,101,101,108,47,110,10,84,101,101,108,111,114,110,101,114,47,83,10,116,101,101,109,108,105,99,104,47,101,110,10,84,101,103,101,108,47,83,10,116,101,103,101,110,10,84,101,104,110,10,116,101,107,101,110,47,65,81,66,67,74,80,85,86,10,116,101,107,101,110,47,97,113,99,106,112,117,10,116,101,101,107,47,68,87,77,79,65,81,66,67,74,80,85,86,10,84,101,107,101,110,47,83,10,84,101,107,101,110,107,101,101,100,47,110,10,84,101,107,101,110,108,111,115,105,103,107,101,105,116,47,110,10,84,101,107,101,110,115,101,116,116,47,110,10,84,101,108,101,102,111,110,47,110,10,116,101,108,101,102,111,110,101,101,114,47,115,10,84,101,108,101,102,111,110,110,117,109,109,101,114,47,110,10,84,101,108,101,103,114,97,102,105,101,10,116,101,108,101,112,111,114,116,101,101,114,47,115,10,84,101,108,101,115,107,111,112,47,110,10,84,101,108,103,47,110,10,116,101,108,108,101,110,47,81,82,80,86,70,10,116,101,108,108,101,110,47,113,114,112,102,10,84,101,108,108,101,114,47,83,10,84,101,108,108,119,105,101,115,47,110,10,84,101,108,116,47,110,10,84,101,109,112,101,114,97,116,117,114,47,110,10,116,101,109,112,111,114,195,164,114,47,101,110,10,84,101,110,100,101,110,122,47,110,10,84,101,110,110,105,115,10,84,101,110,110,105,115,98,97,108,108,10,84,101,110,110,105,115,98,195,164,108,108,10,84,101,110,110,105,115,104,101,109,100,10,84,101,110,110,105,115,104,101,109,109,101,110,10,84,101,110,110,105,115,112,108,97,116,122,10,84,101,110,110,105,115,112,108,195,164,116,122,10,84,101,110,110,105,115,114,111,99,107,10,84,101,110,110,105,115,114,195,182,99,107,10,84,101,110,110,105,115,115,99,104,111,104,10,84,101,110,110,105,115,115,99,104,195,182,104,10,84,101,110,110,105,115,115,108,195,164,103,101,114,47,83,10,84,101,110,110,105,115,115,111,99,107,47,110,10,84,101,112,112,105,99,104,47,110,10,84,101,114,109,105,110,47,110,10,84,101,114,109,105,110,97,108,47,83,10,84,101,114,114,111,114,10,84,101,114,114,111,114,115,116,97,97,116,47,110,10,84,101,115,116,47,83,10,116,101,115,116,47,115,65,81,82,85,10,116,101,115,116,101,110,47,97,113,114,117,10,84,101,115,116,115,105,101,116,10,84,101,115,116,115,105,101,100,101,110,10,84,101,120,116,47,110,10,84,101,120,116,100,97,116,101,105,10,84,101,120,116,100,97,116,101,105,101,110,10,84,101,120,116,102,101,108,100,10,84,101,120,116,102,101,108,108,101,114,10,84,101,120,116,107,108,195,182,195,182,114,47,110,10,84,101,120,116,117,114,47,110,10,84,104,101,97,116,101,114,10,84,104,101,109,97,10,84,104,101,109,101,110,10,84,104,101,111,114,105,101,47,110,10,84,104,101,114,109,111,100,121,110,97,109,105,107,10,84,104,101,114,109,111,109,101,116,101,114,47,83,10,84,104,101,114,109,111,115,112,104,195,164,195,164,114,10,116,104,101,114,109,115,99,104,47,101,110,10,84,105,101,100,10,84,105,100,101,10,84,105,100,101,110,47,110,10,84,105,101,116,103,114,101,110,122,47,110,10,84,105,101,116,114,101,98,101,101,116,10,84,105,101,116,114,101,98,101,100,101,110,10,84,105,101,116,10,84,105,101,100,101,110,10,116,105,101,116,119,105,101,115,47,101,110,10,84,105,101,116,119,111,111,114,116,10,84,105,101,116,119,195,182,195,182,114,10,84,105,103,101,114,47,115,10,84,105,108,100,101,47,110,10,84,105,112,112,47,83,10,116,105,112,112,47,115,65,74,86,10,116,105,112,112,101,110,47,97,106,10,84,105,112,112,102,101,104,108,101,114,47,83,10,84,105,116,101,108,98,105,108,100,10,84,105,116,101,108,98,105,108,108,101,114,10,84,105,116,101,108,10,84,105,116,101,108,110,10,116,111,10,116,111,39,110,10,116,111,39,116,10,116,111,101,101,114,115,116,10,116,111,102,195,164,108,108,105,103,47,101,110,10,84,111,102,97,108,108,10,84,111,102,195,164,108,108,10,116,111,102,114,101,100,101,110,47,101,110,10,84,111,103,97,97,118,47,110,10,84,111,103,97,110,103,10,84,111,103,195,164,110,103,10,84,195,182,103,101,108,47,83,10,84,111,103,114,105,101,112,47,110,10,84,111,103,10,84,195,182,195,182,103,10,116,111,104,195,182,195,182,99,104,115,116,10,116,111,104,111,111,112,10,116,111,104,117,117,115,10,84,111,104,117,117,115,10,116,111,107,97,109,101,110,10,84,111,107,105,101,107,101,114,47,83,10,84,111,107,117,110,102,116,10,116,111,108,101,116,122,116,10,84,195,182,108,108,101,114,47,83,10,84,111,108,108,10,84,195,182,108,108,10,84,111,108,108,10,84,195,182,108,108,10,84,111,109,97,97,116,47,110,10,116,111,109,101,104,114,115,116,10,116,111,109,105,110,110,115,116,10,116,111,109,111,111,116,10,84,111,111,109,10,84,195,182,195,182,109,10,84,111,111,109,116,195,188,195,188,99,104,10,84,111,111,110,10,84,195,182,195,182,110,10,84,111,111,114,110,47,83,10,116,195,182,195,182,118,47,115,10,84,195,182,195,182,118,114,101,101,103,47,101,110,10,116,111,112,97,115,115,10,84,111,112,112,47,110,10,84,195,182,112,112,10,116,111,114,101,99,104,116,10,84,195,182,114,110,47,83,10,116,111,114,195,188,99,104,10,116,111,114,195,188,99,104,10,84,111,114,195,188,99,104,102,108,111,111,103,10,84,111,114,195,188,99,104,102,108,195,182,195,182,103,10,116,111,114,195,188,99,104,119,97,114,116,115,10,116,111,114,195,188,99,104,119,101,115,115,101,108,110,10,116,111,115,97,109,101,110,10,116,111,115,97,109,101,110,10,84,111,115,97,109,101,110,115,116,101,108,108,101,114,47,83,10,116,111,115,99,104,97,110,110,10,84,111,115,116,97,110,100,10,84,111,115,116,195,164,110,110,10,116,111,115,116,195,164,110,110,105,103,47,101,110,10,116,111,195,188,110,110,101,114,115,116,10,84,111,117,114,105,115,116,47,110,10,116,111,118,101,101,108,47,101,110,10,116,195,182,118,101,110,47,81,10,116,195,182,118,101,110,47,113,10,116,195,182,195,182,118,47,68,87,81,10,84,195,182,118,101,114,101,101,10,84,195,182,118,101,114,101,101,110,10,84,195,182,118,101,114,101,114,47,83,10,116,111,118,101,114,108,195,164,115,115,105,103,47,101,110,10,116,195,182,118,101,114,110,47,73,68,87,77,79,66,89,86,88,10,116,195,182,118,101,114,110,47,121,120,10,84,111,118,101,114,115,105,99,104,116,10,116,111,118,101,114,115,105,99,104,116,108,105,99,104,47,101,110,10,116,111,118,101,114,115,105,99,104,116,108,105,99,104,101,114,47,101,110,10,116,111,118,101,114,115,105,99,104,116,108,105,99,104,115,116,47,101,110,10,84,111,119,97,115,115,10,84,111,119,195,164,115,115,10,116,114,97,97,99,104,10,116,114,97,103,101,10,116,114,97,103,101,110,10,116,114,97,100,105,116,115,99,104,111,110,101,108,108,47,101,110,10,84,114,97,108,108,47,110,10,84,114,97,110,115,102,101,114,47,83,10,116,114,97,110,115,112,97,114,101,110,116,47,101,110,10,84,114,97,110,115,112,97,114,101,110,122,10,84,114,97,110,115,112,111,114,116,47,110,10,116,114,97,110,115,122,101,110,100,101,110,116,47,101,110,10,116,114,101,99,104,116,10,84,114,101,99,104,116,101,114,47,83,10,84,114,101,99,107,98,97,108,108,10,84,114,101,99,107,98,195,164,108,108,10,116,114,101,99,107,98,111,114,47,101,110,10,116,114,101,99,107,101,110,47,73,68,87,81,65,66,82,89,67,74,72,80,90,75,71,84,85,86,70,88,195,156,10,116,114,101,99,107,101,110,47,113,97,98,114,121,99,106,104,112,122,107,103,116,117,118,102,120,195,188,10,116,114,111,99,107,101,110,47,73,68,81,65,66,82,89,67,74,72,80,90,75,71,84,85,86,70,88,195,156,10,116,114,101,99,107,10,114,97,110,116,114,101,99,107,101,110,47,73,68,87,10,114,97,110,116,114,111,99,107,101,110,47,73,68,10,116,114,101,110,110,47,115,81,82,80,10,84,114,101,110,110,98,97,108,107,101,110,47,83,10,84,114,101,110,110,101,114,47,83,10,84,114,101,110,110,108,105,101,110,47,110,10,84,114,101,110,110,115,116,114,101,101,107,47,110,10,84,114,101,110,110,116,101,107,101,110,47,83,10,84,114,101,112,112,47,110,10,116,114,101,112,112,119,105,101,115,10,84,114,105,99,107,47,83,10,84,114,105,116,116,10,84,114,101,101,100,10,116,114,111,101,110,47,77,79,65,66,84,86,10,116,114,111,101,110,47,97,116,10,116,114,111,111,47,68,87,65,66,84,86,10,116,114,111,111,112,115,99,104,47,101,110,10,84,114,111,112,101,110,104,111,108,116,10,84,114,111,112,101,110,104,195,182,108,116,101,114,10,84,114,111,112,111,115,112,104,195,164,195,164,114,10,116,114,111,114,105,103,47,101,110,10,116,114,111,114,105,103,101,114,47,101,110,10,116,114,111,114,105,103,115,116,47,101,110,10,116,114,195,188,99,104,10,84,114,195,188,99,104,115,108,195,164,103,101,114,47,83,10,84,114,195,188,99,104,115,108,195,164,103,101,114,115,99,104,101,47,110,10,84,114,195,188,99,104,115,108,97,103,115,112,101,101,108,10,84,114,195,188,99,104,115,108,97,103,115,112,101,108,101,110,10,84,114,117,101,114,10,84,114,117,109,109,101,108,47,110,10,116,114,117,114,105,103,47,101,110,10,116,114,117,114,105,103,101,114,47,101,110,10,116,114,117,114,105,103,115,116,47,101,110,10,116,115,99,104,195,188,195,188,115,10,116,195,188,102,102,101,108,105,103,47,101,110,10,116,195,188,102,102,101,108,105,103,101,114,47,101,110,10,116,195,188,102,102,101,108,105,103,115,116,47,101,110,10,84,117,108,112,47,110,10,84,117,110,103,47,110,10,84,195,188,110,110,47,110,10,84,117,110,110,101,108,47,83,10,84,195,188,110,110,101,110,108,101,103,103,101,114,47,83,10,84,117,114,98,105,101,110,10,84,117,114,98,105,110,101,110,10,116,117,114,110,47,70,115,10,116,117,114,110,101,110,47,102,10,84,117,114,110,115,99,104,111,104,10,84,117,114,110,115,99,104,195,182,104,10,116,117,115,99,104,47,115,74,85,86,10,116,117,115,99,104,101,110,47,106,117,10,84,195,188,195,188,99,104,10,84,195,188,195,188,103,110,105,115,10,84,195,188,195,188,103,110,105,115,115,101,110,10,84,117,117,110,47,83,10,84,195,188,195,188,110,10,116,117,117,115,99,104,98,111,114,47,101,110,10,84,195,188,195,188,116,47,110,10,84,119,101,101,108,10,84,119,101,108,101,110,10,84,119,101,101,115,99,104,101,110,47,83,10,116,119,101,101,116,10,116,119,101,116,101,10,116,119,101,116,101,110,10,116,119,101,105,10,116,119,105,101,102,101,108,104,97,102,116,105,103,47,101,110,10,116,119,105,115,99,104,101,110,10,84,119,105,115,99,104,101,110,97,102,108,97,97,103,47,110,10,84,119,105,115,99,104,101,110,114,117,117,109,10,84,119,105,115,99,104,101,110,114,195,188,195,188,109,10,84,119,105,115,99,104,101,110,115,112,105,101,107,101,114,47,83,10,116,119,105,115,99,104,101,110,115,112,105,101,107,101,114,47,115,10,116,119,105,115,99,104,101,110,116,111,115,112,105,101,107,101,114,110,10,84,119,105,115,99,104,101,110,116,105,101,116,10,84,119,105,115,99,104,101,110,116,105,101,100,101,110,10,116,119,111,111,114,115,10,84,119,195,188,115,99,104,101,110,108,97,103,101,114,110,10,84,121,112,47,110,10,116,121,112,111,103,114,97,97,102,115,99,104,47,101,110,10,195,188,109,10,195,188,109,39,110,10,195,156,109,98,114,101,107,101,114,47,83,10,195,156,109,98,114,111,111,107,10,195,156,109,98,114,195,182,195,182,107,10,195,156,109,102,97,110,103,10,195,156,109,102,195,164,110,103,10,195,156,109,103,97,110,103,10,195,156,109,103,195,164,110,103,10,195,156,109,103,101,118,101,110,10,195,156,109,107,114,105,110,107,10,195,156,109,108,111,111,112,98,97,104,110,47,110,10,195,156,109,114,101,101,116,10,195,156,109,114,101,116,101,110,10,195,156,109,115,99,104,97,108,116,101,114,47,83,10,195,156,109,115,108,97,103,10,195,156,109,115,108,195,164,195,164,103,10,195,188,109,115,117,110,115,116,10,195,188,109,116,111,10,195,188,109,10,117,110,10,98,105,10,195,156,109,119,101,108,116,10,195,156,109,119,101,108,116,10,195,156,109,119,101,108,116,97,102,103,97,97,118,47,110,10,195,156,109,119,101,108,116,98,117,110,100,115,97,109,116,10,195,156,109,119,101,108,116,98,117,110,100,101,115,195,164,109,116,101,114,10,195,156,109,119,101,108,116,100,97,103,47,101,10,195,156,109,119,101,108,116,108,111,116,116,101,114,105,101,10,195,156,109,119,101,108,116,109,101,100,105,122,105,110,10,195,156,109,119,101,108,116,109,105,110,105,115,116,101,114,47,83,10,195,156,109,119,101,108,116,111,114,103,97,110,105,115,97,116,115,99,104,111,111,110,47,110,10,195,156,109,119,101,108,116,112,111,108,105,116,105,107,10,195,156,109,119,101,108,116,114,101,99,104,116,10,195,156,109,119,101,108,116,115,116,105,102,116,101,110,10,195,188,109,119,101,108,116,118,101,114,100,114,195,164,195,164,103,108,105,99,104,47,101,110,10,195,156,109,119,101,108,116,118,101,114,115,109,117,100,100,101,110,47,83,10,195,156,109,119,101,108,116,119,101,116,101,110,115,99,104,111,112,47,110,10,117,110,10,117,110,98,101,115,116,105,109,109,116,47,101,110,10,85,110,100,101,101,114,116,47,110,10,85,110,100,101,101,114,116,101,114,10,117,110,101,118,101,110,47,101,110,10,85,110,102,97,108,108,10,85,110,102,195,164,108,108,10,85,110,103,108,195,188,99,107,47,110,10,85,110,105,99,111,100,101,10,85,110,105,111,110,10,85,110,105,111,110,101,110,10,85,110,105,118,101,114,115,105,116,195,164,116,47,110,10,85,110,105,118,101,114,115,117,109,10,195,188,110,110,101,110,10,195,188,110,110,101,114,10,195,188,110,110,101,114,10,195,188,110,110,101,114,104,111,108,108,101,110,10,195,188,110,110,101,114,104,111,108,10,195,188,110,110,101,114,104,195,182,108,108,115,116,10,195,188,110,110,101,114,104,111,108,116,10,195,156,110,110,101,114,105,110,100,114,97,103,10,195,156,110,110,101,114,105,110,100,114,195,164,195,164,103,10,195,156,110,110,101,114,107,97,110,116,47,110,10,195,156,110,110,101,114,109,101,110,195,188,47,83,10,195,156,110,110,101,114,110,101,104,109,101,110,115,118,101,114,98,97,110,100,10,195,156,110,110,101,114,110,101,104,109,101,110,115,118,101,114,98,195,164,110,110,10,195,156,110,110,101,114,111,112,103,97,97,118,47,110,10,195,156,110,110,101,114,115,99,104,101,101,100,47,110,10,195,156,110,110,101,114,115,99,104,114,105,102,116,10,195,156,110,110,101,114,115,99,104,114,105,102,116,101,110,10,195,156,110,110,101,114,115,101,101,98,111,111,116,10,195,156,110,110,101,114,115,101,101,98,195,182,195,182,100,10,195,156,110,110,101,114,116,105,116,101,108,10,195,188,110,110,101,114,119,101,103,101,110,115,10,117,110,115,10,117,110,115,101,107,101,114,47,101,110,10,117,110,115,105,99,104,116,98,111,114,47,101,110,10,117,110,118,101,114,109,111,100,101,110,10,117,110,118,101,114,109,111,100,101,110,115,10,117,110,118,101,114,119,97,99,104,116,47,101,110,10,85,82,73,47,83,10,85,82,76,47,83,10,85,114,108,97,117,98,10,85,83,66,10,85,115,101,110,101,116,10,117,115,119,10,117,116,10,117,116,39,110,10,117,116,98,101,110,97,104,109,101,110,10,117,116,98,114,101,100,101,110,10,85,116,100,114,117,99,107,10,85,116,100,114,195,188,99,107,10,117,116,101,110,101,101,110,10,85,116,102,108,111,103,115,99,104,105,112,112,10,85,116,102,108,111,103,115,99,104,101,101,112,10,117,116,102,195,182,104,114,98,111,114,47,101,110,10,117,116,102,195,182,104,114,108,105,99,104,47,101,110,10,85,116,103,97,97,118,47,110,10,85,116,103,97,110,103,10,85,116,103,195,164,110,103,10,85,116,103,108,105,101,107,47,110,10,85,116,103,108,105,101,107,115,114,101,98,101,101,116,10,85,116,103,108,105,101,107,115,114,101,98,101,100,101,110,47,110,10,85,116,108,101,103,103,101,114,47,83,10,85,116,108,195,182,115,101,114,47,83,10,85,116,109,97,107,101,114,47,83,10,85,116,110,97,104,109,47,110,10,85,116,115,97,97,103,47,110,10,85,116,115,101,104,110,10,85,116,115,112,114,97,97,107,47,110,10,85,116,115,116,101,108,108,101,114,47,83,10,85,116,119,97,104,108,47,110,10,85,116,119,101,103,10,85,116,119,101,101,103,10,85,116,119,101,115,115,101,108,98,97,110,107,10,85,116,119,101,115,115,101,108,98,195,164,110,107,10,85,116,119,101,115,115,101,108,115,112,101,108,101,114,47,83,10,85,116,119,101,115,115,101,108,115,112,101,108,101,114,115,99,104,101,47,110,10,85,116,119,105,99,107,108,101,114,47,83,10,85,117,108,10,85,108,101,110,10,86,97,100,101,114,47,83,10,86,97,100,100,101,114,47,83,10,86,97,103,101,108,47,83,10,86,97,103,101,108,107,117,110,110,10,86,97,114,105,97,98,101,108,10,86,97,114,105,97,98,101,108,110,10,118,97,114,105,97,98,101,108,10,118,97,114,105,97,98,108,101,10,118,97,114,105,97,98,101,108,110,10,86,97,114,105,97,110,122,47,110,10,86,101,100,100,101,114,10,86,101,100,100,101,114,110,10,118,101,101,108,47,101,110,10,86,101,101,108,101,99,107,47,110,10,118,101,101,108,101,99,107,105,103,47,101,110,10,118,101,101,108,102,97,99,104,47,101,110,10,118,101,101,114,10,86,101,101,114,101,99,107,10,86,101,101,114,107,97,110,116,47,110,10,118,101,101,114,107,97,110,116,105,103,47,101,110,10,118,101,101,114,10,118,101,101,114,116,47,101,110,10,86,101,107,116,111,114,47,110,10,118,101,110,105,101,110,115,99,104,47,101,110,10,118,101,114,97,110,115,116,97,108,116,47,115,10,86,101,114,97,110,115,116,97,108,116,101,114,47,83,10,118,101,114,97,110,116,119,111,111,114,100,101,110,47,73,68,87,77,79,10,86,101,114,98,47,110,10,118,101,114,98,97,97,115,116,47,101,110,10,86,101,114,98,97,110,100,115,107,108,97,97,103,10,86,101,114,98,97,110,100,115,107,108,97,97,103,101,110,10,118,101,114,98,105,101,115,116,101,114,110,47,87,10,86,101,114,98,111,116,116,47,110,10,86,101,114,98,114,117,107,101,114,105,110,102,111,114,109,97,116,115,99,104,111,111,110,47,110,10,86,101,114,98,114,117,107,101,114,115,99,104,117,117,108,10,86,101,114,98,114,117,107,101,114,122,101,110,116,114,97,97,108,10,86,101,114,98,114,117,107,101,114,122,101,110,116,114,97,108,101,110,10,86,101,114,98,114,117,117,107,10,118,101,114,100,97,109,109,105,99,104,10,86,101,114,100,101,101,108,108,105,115,116,47,110,10,86,101,114,100,101,101,110,115,116,47,110,10,118,101,114,100,101,102,102,101,110,100,101,114,101,110,10,118,101,114,100,101,102,102,101,110,100,101,101,114,47,68,87,77,79,10,86,101,114,100,114,97,103,10,86,101,114,100,114,195,164,195,164,103,10,118,101,114,100,117,98,98,101,108,110,47,73,68,87,77,79,10,86,101,114,101,101,110,47,110,10,118,101,114,101,101,110,102,97,99,104,101,110,47,73,68,87,77,79,10,118,101,114,101,101,110,105,103,116,47,101,110,10,118,101,114,101,101,110,116,47,101,110,10,118,101,114,102,195,182,195,182,103,98,111,114,47,101,110,10,86,101,114,102,195,182,195,182,103,98,111,114,107,101,105,116,10,118,101,114,102,111,114,109,98,111,114,47,101,110,10,118,101,114,103,101,116,101,110,10,118,101,114,103,101,101,116,10,118,101,114,103,105,116,116,115,116,10,118,101,114,103,105,116,116,10,118,101,114,103,101,101,116,115,116,10,118,101,114,103,110,195,182,195,182,103,108,105,99,104,47,101,110,10,118,101,114,103,110,195,182,195,182,103,116,47,101,10,118,101,114,104,101,105,114,97,97,100,116,10,86,101,114,107,101,104,114,10,118,101,114,107,101,104,114,116,47,101,110,10,118,101,114,107,108,111,111,114,47,115,10,86,101,114,107,195,182,112,101,114,47,83,10,86,101,114,108,97,100,101,110,10,118,101,114,108,101,114,101,110,10,118,101,114,108,101,101,114,47,68,87,10,118,101,114,108,111,111,114,47,68,10,118,101,114,108,111,114,101,110,10,86,101,114,108,195,182,195,182,102,10,86,101,114,108,195,182,118,101,110,10,86,101,114,108,111,111,112,10,86,101,114,108,195,182,195,182,112,10,118,101,114,108,195,182,118,101,110,10,118,101,114,108,195,182,195,182,118,47,68,87,77,79,10,86,101,114,108,117,115,116,47,110,10,118,101,114,109,111,100,101,110,10,118,101,114,109,111,111,100,47,68,87,77,79,10,118,101,114,109,111,100,101,110,10,118,101,114,109,111,111,100,116,10,118,101,114,110,105,101,103,101,114,110,47,73,68,87,77,79,10,118,101,114,112,108,105,99,104,116,101,110,47,73,68,87,77,79,10,118,101,114,114,195,188,99,107,116,47,101,110,10,118,101,114,114,195,188,99,107,116,101,114,47,101,110,10,118,101,114,115,99,104,101,100,101,110,47,101,110,10,86,101,114,115,99,104,101,101,108,10,86,101,114,115,99,104,101,108,101,110,10,86,101,114,115,99,104,111,111,110,47,110,10,118,101,114,115,108,195,182,116,101,108,110,47,73,68,87,77,79,10,86,101,114,115,109,117,100,100,101,110,47,83,10,118,101,114,115,116,97,104,110,10,118,101,114,115,116,97,104,10,118,101,114,115,116,101,105,104,115,116,10,118,101,114,115,116,97,104,116,10,118,101,114,115,195,188,107,101,110,10,118,101,114,115,195,188,195,188,107,47,68,87,77,79,10,118,101,114,116,105,107,97,108,47,101,110,10,118,101,114,116,114,111,108,105,99,104,47,101,110,10,118,101,114,116,114,111,111,110,115,119,195,182,195,182,114,100,105,103,47,101,110,10,118,101,114,119,97,99,104,116,101,110,115,10,118,101,114,119,97,108,116,101,110,47,73,68,87,77,79,10,86,101,114,119,97,110,100,116,47,110,10,86,101,114,119,101,101,114,116,101,110,10,118,101,114,119,105,101,100,101,114,98,111,114,47,101,110,10,86,71,65,10,118,105,100,100,101,108,10,86,105,100,101,111,47,83,10,118,105,103,101,108,101,116,116,47,101,110,10,118,105,103,101,108,105,101,110,115,99,104,47,101,110,10,86,105,103,101,108,105,101,110,10,86,105,103,101,108,105,101,110,101,110,10,118,105,108,108,105,99,104,116,10,118,105,114,101,110,118,101,114,115,195,188,195,188,107,116,47,101,110,10,118,105,114,116,117,101,108,108,47,101,110,10,86,105,114,117,115,10,86,105,114,101,110,10,86,105,114,117,115,115,101,110,10,86,105,115,105,116,101,110,107,111,111,114,116,10,86,105,115,105,116,101,110,107,111,114,116,101,110,10,118,105,115,117,101,108,108,47,101,110,10,86,111,107,97,98,117,108,97,114,10,86,111,108,107,115,115,99,104,111,111,108,47,110,10,86,111,108,108,101,121,98,97,108,108,102,101,108,100,10,86,111,108,108,101,121,98,97,108,108,102,101,108,108,101,114,10,86,111,108,108,101,121,98,97,108,108,110,101,116,116,47,110,10,86,111,108,108,101,121,98,97,108,108,10,86,111,108,108,101,121,98,195,164,108,108,10,86,111,108,117,109,101,110,10,118,195,182,114,10,118,195,182,114,39,110,10,118,195,182,114,97,102,10,118,195,182,114,97,110,10,118,195,182,114,97,110,103,97,104,10,86,195,182,114,97,110,115,105,99,104,116,47,101,110,10,86,195,182,114,97,110,115,116,111,111,116,10,86,195,182,114,97,110,115,116,195,182,195,182,116,10,118,195,182,114,98,105,10,86,195,182,114,98,105,108,100,10,86,195,182,114,98,105,108,108,101,114,10,86,195,182,114,100,101,101,108,10,86,195,182,114,100,101,108,101,110,10,118,195,182,114,100,101,109,10,86,195,182,114,100,114,105,102,116,10,86,195,182,114,102,105,108,116,101,114,47,83,10,86,195,182,114,103,97,97,118,47,110,10,86,195,182,114,103,97,110,103,10,86,195,182,114,103,195,164,110,103,10,86,195,182,114,103,101,115,99,104,105,99,104,116,10,86,195,182,114,103,114,117,110,100,10,86,195,182,114,103,114,117,110,100,107,108,195,182,195,182,114,47,110,10,118,195,182,114,104,97,110,110,101,110,47,101,110,10,118,195,182,114,104,101,114,10,118,195,182,114,105,103,47,101,110,10,118,195,182,114,105,110,115,116,101,108,108,101,110,47,73,68,87,77,79,10,86,195,182,114,106,111,104,114,10,86,195,182,114,106,111,104,114,101,110,10,86,195,182,114,108,97,97,103,10,86,195,182,114,108,97,103,101,110,10,86,195,182,114,108,101,115,101,114,47,83,10,118,195,182,114,109,105,100,100,97,97,103,115,10,86,195,182,114,109,105,100,100,97,103,10,86,195,182,114,109,105,100,100,97,97,103,10,118,195,182,114,110,10,86,195,182,114,110,97,97,109,47,83,10,86,195,182,114,195,182,108,108,101,114,110,10,86,195,182,114,115,101,116,116,101,110,10,86,195,182,114,115,105,99,104,116,10,118,195,182,114,115,105,99,104,116,105,103,47,101,110,10,86,195,182,114,115,105,101,116,10,86,195,182,114,115,105,101,100,101,110,10,86,195,182,114,115,105,116,116,101,114,47,83,10,86,195,182,114,115,108,97,103,10,86,195,182,114,115,108,195,164,195,164,103,10,86,195,182,114,115,111,114,103,10,118,195,182,114,115,116,47,101,110,10,86,195,182,114,116,101,107,101,110,47,83,10,118,195,182,114,116,105,101,116,115,10,118,195,182,114,117,116,10,118,195,182,114,118,101,114,97,114,98,101,105,100,101,110,47,73,68,87,77,79,10,118,195,182,114,119,97,114,116,115,10,118,195,182,114,119,101,103,10,86,111,115,115,10,86,195,182,115,115,10,118,117,108,107,97,97,110,97,115,99,104,47,101,110,10,86,117,108,107,97,110,47,110,10,118,117,108,108,10,118,117,108,108,47,101,110,10,86,117,108,108,109,97,97,110,100,10,86,117,108,108,109,97,99,104,116,47,110,10,118,117,108,108,115,116,195,164,110,110,105,103,47,101,110,10,86,117,108,108,116,101,120,116,10,118,117,110,10,118,117,110,39,110,10,118,117,110,39,116,10,118,117,110,100,97,97,103,10,118,117,110,109,111,114,103,101,110,10,118,117,110,110,97,99,104,116,10,118,117,110,119,101,103,101,110,10,87,97,97,103,47,110,10,119,97,97,103,47,115,10,119,97,97,103,114,101,99,104,116,47,101,110,10,119,97,99,104,116,101,110,47,73,68,87,77,79,81,80,84,86,10,119,97,99,104,116,101,110,47,113,112,116,10,87,97,99,104,116,101,114,47,83,10,119,97,99,107,101,108,47,115,10,87,97,100,100,101,110,109,101,101,114,10,87,97,103,101,110,47,83,10,87,97,103,101,110,100,114,105,101,118,101,114,47,83,10,87,97,103,101,110,112,101,101,114,100,10,87,97,103,101,110,112,101,101,114,10,87,97,103,101,110,114,97,100,10,87,97,103,101,110,114,195,182,195,182,100,10,87,97,103,101,110,114,101,110,110,101,110,47,83,10,87,97,103,101,110,115,109,101,101,114,10,87,97,104,108,47,110,10,119,195,164,104,108,101,110,47,73,68,87,77,79,65,81,74,85,86,10,119,195,164,104,108,101,110,47,97,113,106,117,10,87,195,164,104,108,101,114,47,83,10,119,97,104,108,119,105,101,115,10,119,97,104,110,101,110,47,73,68,87,10,119,97,104,110,115,99,104,97,112,101,110,10,87,97,104,110,115,116,117,117,118,10,87,97,104,110,115,116,117,118,101,110,10,87,97,104,110,117,110,103,47,110,10,119,97,107,101,110,47,82,80,10,119,97,107,101,110,47,114,112,10,119,97,97,107,47,68,87,77,79,82,80,10,87,97,108,108,10,87,195,164,108,108,10,87,97,110,100,10,87,195,164,110,110,10,87,97,110,100,10,87,195,164,110,110,10,87,97,110,110,47,110,10,119,97,110,110,101,104,114,10,119,97,110,110,101,108,110,47,73,68,87,77,79,195,156,10,119,97,110,110,101,108,110,47,195,188,10,119,97,110,110,101,114,47,115,10,87,97,110,110,101,114,115,116,101,101,114,110,47,83,10,119,97,114,102,108,105,99,104,47,101,110,10,87,97,114,107,47,110,10,119,97,114,107,101,110,47,73,68,87,77,79,66,74,85,86,70,10,119,97,114,107,101,110,47,106,117,102,10,87,97,114,107,116,195,188,195,188,99,104,10,87,97,114,107,116,195,188,103,101,110,10,119,97,114,109,47,101,110,10,119,97,114,109,101,114,47,101,110,10,119,97,114,109,115,116,47,101,110,10,87,97,114,109,102,114,111,110,116,10,87,97,114,109,115,10,87,97,114,109,115,100,195,164,109,109,101,110,10,87,97,114,109,115,112,117,109,112,47,110,10,87,97,114,109,115,116,117,117,115,99,104,101,114,10,119,97,114,114,110,47,73,68,87,65,10,119,97,114,114,110,47,97,10,119,195,182,195,182,114,110,47,73,68,65,10,119,111,114,114,110,47,65,10,119,97,114,114,110,10,119,97,114,114,10,119,97,114,114,115,116,10,119,97,114,114,116,10,119,97,114,118,101,110,47,73,68,87,77,79,65,81,66,74,195,156,10,119,97,114,118,101,110,47,97,113,106,195,188,10,87,195,164,115,99,104,10,119,97,115,99,104,101,110,47,82,85,80,81,73,68,87,114,117,112,113,10,87,97,115,99,104,107,195,182,195,182,107,10,87,97,115,99,104,107,195,182,107,101,110,10,87,97,115,99,104,109,97,115,99,104,105,101,110,47,110,10,87,97,115,99,104,109,105,100,100,101,108,10,87,97,115,99,104,115,99,104,195,182,116,116,101,108,10,87,97,115,99,104,115,99,104,195,182,116,116,101,108,110,10,87,97,115,115,100,111,109,10,119,97,115,115,101,110,47,73,68,87,65,66,82,89,67,74,80,84,85,86,10,119,97,115,115,101,110,47,97,114,121,99,106,112,116,117,10,119,117,115,115,101,110,47,73,68,65,66,82,89,67,74,80,84,85,86,10,119,97,116,10,87,97,116,101,114,10,87,97,116,101,114,97,109,109,101,114,47,83,10,87,97,116,101,114,102,108,101,103,101,114,47,83,10,87,97,116,101,114,103,108,97,115,10,87,97,116,101,114,103,108,195,182,195,182,115,10,87,97,116,101,114,103,108,105,116,115,99,104,101,110,10,87,97,116,101,114,103,195,182,195,182,116,10,87,97,116,101,114,103,114,97,118,101,110,47,83,10,87,97,116,101,114,104,117,117,115,104,111,108,116,10,87,97,116,101,114,104,117,117,115,104,111,108,100,101,110,10,87,97,116,101,114,107,97,110,116,10,87,97,116,101,114,107,101,116,101,108,47,83,10,87,97,116,101,114,107,114,97,102,116,10,87,97,116,101,114,107,114,97,102,116,119,97,114,107,47,101,10,87,97,116,101,114,107,117,108,116,117,114,47,110,10,87,97,116,101,114,109,195,182,104,108,47,110,10,87,97,116,101,114,112,111,116,116,10,87,97,116,101,114,115,112,101,103,101,108,47,83,10,87,97,116,101,114,115,116,111,102,102,10,87,97,116,101,114,115,116,114,97,97,116,10,87,97,116,101,114,115,116,114,97,116,101,110,10,87,97,116,101,114,116,195,188,110,110,47,110,10,87,97,116,101,114,118,101,114,115,109,117,100,100,101,110,47,83,10,87,97,116,101,114,119,97,97,103,10,87,97,116,101,114,119,97,103,101,110,10,87,97,116,101,114,119,101,101,114,116,115,99,104,111,112,10,87,97,116,116,10,87,101,99,107,103,108,97,115,10,87,101,99,107,103,108,195,182,195,182,115,10,119,101,100,100,101,114,10,87,101,100,100,101,114,97,109,116,10,87,101,100,100,101,114,98,101,114,105,99,104,116,47,114,110,10,119,101,100,100,101,114,98,195,182,114,115,116,105,103,47,101,110,10,87,101,100,100,101,114,100,101,101,110,115,116,47,101,10,119,101,100,100,101,114,104,97,108,101,110,10,119,101,100,100,101,114,104,97,97,108,47,68,87,77,79,10,87,101,100,100,101,114,107,111,111,114,116,10,87,101,100,100,101,114,107,111,114,100,101,110,10,87,101,100,100,101,114,112,97,114,116,10,87,101,100,100,101,114,112,114,111,103,110,111,111,115,47,110,10,87,101,100,100,101,114,115,101,104,110,10,87,101,100,100,101,114,115,105,101,116,10,87,101,100,100,101,114,115,105,101,100,101,110,10,87,101,100,100,101,114,115,112,105,108,108,10,87,101,100,100,101,114,115,116,97,116,115,99,104,111,111,110,10,87,101,100,100,101,114,115,116,97,116,115,99,104,111,110,101,110,10,87,101,100,100,101,114,195,188,109,115,108,97,103,10,87,101,100,100,101,114,117,116,115,105,99,104,116,47,110,10,87,101,100,100,101,114,118,101,114,119,101,114,116,101,110,10,119,101,100,100,101,114,119,101,110,100,115,99,104,47,101,110,10,87,101,100,100,101,114,119,101,115,115,101,108,47,83,10,87,101,100,100,101,118,195,182,114,117,116,115,101,103,103,101,110,10,87,101,100,101,114,10,119,101,101,107,47,101,110,10,119,101,107,101,114,47,101,110,10,119,101,101,107,115,116,47,101,110,10,87,101,101,107,101,110,110,47,110,10,87,101,101,107,10,87,101,107,101,110,10,119,101,101,110,47,115,10,87,101,101,114,116,47,110,10,119,101,101,114,116,101,110,47,73,68,87,77,79,81,66,80,85,86,10,119,101,101,114,116,101,110,47,113,112,117,10,119,101,103,10,119,101,103,101,110,10,87,101,103,103,97,110,103,10,87,101,103,103,195,164,110,103,10,87,101,103,10,87,101,101,103,10,87,101,103,119,101,115,101,110,10,119,101,104,10,119,101,104,100,111,111,110,10,119,101,105,104,47,115,10,87,101,107,101,110,100,97,103,10,87,101,107,101,110,100,97,103,10,87,101,107,101,110,100,97,97,103,10,119,101,108,107,47,101,110,10,119,101,108,107,101,114,47,101,110,10,119,101,108,107,115,116,47,101,110,10,119,101,108,107,47,115,10,87,101,108,116,10,87,101,108,116,107,114,105,101,103,47,110,10,87,101,108,116,114,117,117,109,10,87,101,108,116,114,117,117,109,102,101,101,114,110,114,111,104,114,112,10,87,101,108,116,114,117,117,109,102,111,104,114,101,114,47,83,10,87,101,108,116,114,117,117,109,102,111,104,114,116,195,188,195,188,99,104,10,87,101,108,116,114,117,117,109,102,111,104,114,116,195,188,103,101,110,10,87,101,108,116,114,117,117,109,114,97,107,101,101,116,47,101,110,10,87,101,108,116,114,117,117,109,115,116,97,115,99,104,111,111,110,47,110,10,87,101,108,116,10,87,101,108,116,101,110,10,119,101,108,116,119,105,101,100,47,101,110,10,119,101,108,116,119,105,101,116,10,119,101,108,116,119,105,101,100,101,10,119,101,108,116,119,105,101,100,101,110,10,119,101,110,105,103,47,101,110,10,119,101,110,105,103,101,114,10,119,101,110,105,103,115,116,47,101,110,10,119,101,110,110,10,119,101,110,110,39,110,10,119,101,110,110,39,116,10,119,101,110,110,101,110,47,73,68,65,81,66,74,80,67,86,88,10,119,101,110,110,101,110,47,97,113,106,112,99,120,10,119,101,110,100,116,47,65,81,66,74,80,67,86,88,10,119,101,110,100,116,101,47,65,81,66,74,80,67,86,88,10,119,101,110,100,116,101,110,47,65,81,66,74,80,67,86,88,10,87,101,110,110,115,116,110,10,119,101,114,107,101,110,47,73,68,87,77,79,66,86,10,119,101,115,101,110,10,98,195,188,110,10,98,195,188,115,116,10,105,115,10,115,195,188,110,100,10,119,101,101,114,110,47,73,68,10,119,101,101,115,47,87,10,119,101,101,110,10,87,101,115,115,101,108,47,83,10,119,101,115,115,101,108,110,47,73,68,87,77,79,81,74,85,86,10,119,101,115,115,101,108,110,47,113,106,117,10,119,101,115,116,108,105,99,104,47,101,110,10,119,101,115,116,108,105,99,104,101,114,47,101,110,10,119,101,115,116,108,105,99,104,115,116,47,101,110,10,87,101,115,116,10,87,101,115,116,101,110,10,119,101,116,101,110,115,99,104,111,112,108,105,99,104,47,101,110,10,119,101,116,101,110,115,99,104,111,112,108,105,99,104,101,114,47,101,110,10,87,101,116,101,110,115,99,104,111,112,10,87,101,116,101,110,115,99,104,111,112,112,101,110,10,119,101,116,101,110,10,119,101,101,116,47,68,10,119,117,115,115,101,110,47,73,68,87,77,79,10,87,101,116,116,47,110,10,119,101,116,116,47,115,10,87,101,116,116,108,111,111,112,10,87,101,116,116,108,195,182,195,182,112,10,87,101,116,116,115,116,114,105,101,116,10,87,101,116,116,115,116,114,105,101,100,101,110,10,119,101,118,101,110,47,79,74,90,86,10,119,101,118,101,110,47,111,106,122,10,119,101,101,118,47,68,87,77,79,74,90,86,10,119,105,10,87,105,99,104,116,47,110,10,119,105,99,104,116,105,103,47,101,110,10,119,105,99,104,116,105,103,101,114,47,101,110,10,119,105,99,104,116,105,103,115,116,47,101,110,10,119,105,99,107,101,108,110,47,73,68,87,77,79,81,66,74,80,85,86,195,156,10,119,105,99,107,101,108,110,47,113,106,112,117,195,188,10,87,105,101,100,47,110,10,119,105,101,100,101,114,10,87,105,101,104,110,97,99,104,116,115,97,118,101,110,100,10,87,105,101,104,110,97,99,104,116,115,98,111,111,109,10,87,105,101,104,110,97,99,104,116,115,98,195,182,195,182,109,10,87,105,101,104,110,97,99,104,116,115,109,97,110,110,10,87,105,101,104,110,97,99,104,116,115,116,105,101,116,10,87,105,101,104,110,97,99,104,116,10,87,105,101,104,110,97,99,104,116,101,110,10,119,105,101,108,10,119,105,101,108,100,97,116,10,119,105,101,108,100,101,115,10,119,105,101,108,100,101,115,115,10,119,105,101,108,116,10,87,105,101,110,10,87,105,101,110,47,110,10,87,105,101,110,100,114,117,117,118,10,87,105,101,110,100,114,117,118,101,110,10,87,105,101,110,102,97,116,116,10,87,105,101,110,102,97,116,116,101,110,10,87,105,101,110,103,108,97,115,10,87,105,101,110,103,108,195,182,195,182,115,10,119,105,101,110,114,111,111,116,10,87,105,101,110,115,195,188,195,188,114,10,119,105,101,115,101,110,47,73,68,77,79,65,81,66,74,80,84,67,85,86,70,88,10,119,105,101,115,101,110,47,97,113,106,112,116,99,117,102,120,10,87,105,101,115,101,114,47,83,10,119,105,101,116,10,87,105,101,116,115,112,114,105,110,103,101,110,10,87,105,108,100,10,119,105,108,100,10,119,105,108,108,101,47,110,10,87,105,108,108,107,97,109,101,110,10,87,105,110,100,47,110,10,87,105,110,100,101,110,101,114,103,105,101,10,119,105,110,100,105,103,47,101,110,10,87,105,110,100,107,114,97,102,116,10,87,105,110,100,107,114,97,102,116,97,110,108,97,97,103,47,110,10,87,105,110,100,114,97,100,10,87,105,110,100,114,195,182,195,182,100,10,87,105,110,100,114,105,99,104,116,10,119,105,110,100,115,116,105,108,108,47,101,110,10,87,105,110,107,101,108,47,83,10,87,105,110,107,101,108,97,102,115,116,97,110,100,10,87,105,110,107,101,108,103,114,97,97,100,47,101,10,87,105,110,107,101,108,109,97,97,116,47,110,10,119,105,110,110,101,110,47,73,68,86,195,156,10,119,105,110,110,101,110,47,195,188,10,119,117,110,110,101,110,47,73,68,87,86,195,156,10,119,105,110,110,116,10,119,105,110,100,116,47,86,195,156,10,87,105,110,110,101,114,10,119,105,110,110,105,103,47,101,110,10,87,105,110,110,115,116,47,110,10,87,105,110,115,99,104,47,110,10,87,105,110,116,101,114,10,87,105,110,116,101,114,47,83,10,87,105,110,116,101,114,115,195,188,110,110,101,110,119,101,110,110,10,87,105,115,99,104,47,110,10,119,105,115,99,104,101,110,47,73,68,87,77,79,81,82,72,80,71,85,86,70,88,10,119,105,115,99,104,101,110,47,113,114,104,112,103,117,102,120,10,119,105,115,115,47,101,110,10,119,105,116,116,47,101,110,10,119,111,10,119,111,97,110,115,10,119,111,100,101,110,110,105,103,10,119,111,102,195,182,114,10,119,111,104,101,110,10,119,195,182,104,108,47,115,10,119,111,104,114,47,101,110,10,119,111,104,114,101,110,47,73,68,87,77,79,66,86,10,87,111,104,114,115,99,104,97,117,10,119,111,104,114,115,99,104,105,101,110,108,105,99,104,47,101,110,10,87,111,104,114,115,99,104,105,101,110,108,105,99,104,107,101,105,116,47,110,10,119,111,104,114,115,99,104,111,101,110,47,73,10,119,111,104,114,115,99,104,111,111,115,116,10,119,111,104,114,115,99,104,111,111,116,10,119,111,107,101,101,110,10,119,111,108,108,10,119,111,110,101,101,109,10,87,111,111,108,100,47,110,10,87,111,111,108,100,112,111,108,105,116,105,107,10,87,111,111,108,100,115,116,97,114,118,101,110,10,87,111,111,114,116,10,87,195,182,195,182,114,10,119,195,182,195,182,115,116,47,101,110,10,87,195,182,195,182,115,116,47,110,10,87,111,114,109,10,87,195,182,114,109,10,87,195,182,114,112,101,108,47,83,10,87,195,182,114,112,101,108,115,105,101,116,10,87,195,182,114,112,101,108,115,105,101,100,101,110,100,101,110,10,87,195,182,114,116,101,108,10,87,195,182,114,116,101,108,110,10,119,111,114,195,188,109,10,119,111,115,111,10,119,111,118,101,101,108,47,101,10,119,114,97,99,107,47,101,110,10,87,117,100,100,101,108,10,87,117,100,100,101,108,110,10,87,117,108,102,10,87,195,188,108,118,10,87,117,108,107,47,110,10,87,117,108,107,101,110,98,97,110,107,10,87,117,108,107,101,110,98,195,164,110,107,10,87,117,108,107,101,110,115,116,195,182,114,116,47,110,10,119,117,108,107,105,103,47,101,110,10,87,117,108,108,10,119,195,188,108,108,101,110,47,87,10,119,105,108,108,10,119,117,108,108,101,110,47,73,68,87,77,79,10,119,117,110,110,101,114,47,115,10,119,117,110,110,101,114,98,111,114,47,101,110,10,119,195,188,110,115,99,104,47,86,115,10,87,117,110,115,99,104,10,87,195,188,110,115,99,104,10,119,195,188,114,107,108,105,99,104,47,101,110,10,119,117,115,99,104,101,110,10,87,117,115,116,10,87,195,188,115,116,10,88,83,101,114,118,101,114,10,88,121,108,111,102,111,110,47,110,10,90,101,100,100,101,108,47,83,10,90,101,101,103,10,90,101,103,101,110,10,90,101,108,108,47,110,10,90,101,110,116,105,109,101,116,101,114,47,83,10,122,101,110,116,114,97,108,47,101,110,10,90,101,110,116,114,117,109,47,83,10,90,101,114,116,105,102,105,107,97,116,47,110,10,90,105,98,98,101,108,10,90,105,98,98,101,108,110,10,90,105,99,107,108,97,109,109,10,90,105,99,107,108,97,109,109,101,114,10,90,105,99,107,108,195,164,109,109,101,114,10,90,105,99,107,10,90,105,99,107,101,110,10,90,105,116,97,116,47,110,10,122,105,116,101,101,114,47,115,10,90,105,116,114,111,111,110,47,110,10,90,105,116,116,108,195,182,195,182,115,99,104,47,110,10,90,111,112,112,10,90,195,182,112,112,10,90,117,99,107,101,114,10,122,121,97,110,10,90,121,108,105,110,110,101,114,47,83,10,65,97,107,101,110,10,65,97,114,100,195,182,114,112,10,195,132,195,164,115,116,195,182,114,112,10,65,98,98,101,110,102,108,101,101,116,10,65,98,98,101,110,115,101,101,116,10,65,99,104,116,101,114,98,114,97,97,107,10,65,99,104,116,101,114,100,105,101,107,10,65,99,104,116,101,114,112,111,109,109,101,114,110,10,65,99,104,116,104,195,182,98,101,110,101,114,100,105,101,107,10,65,104,114,101,110,115,98,111,114,103,10,65,104,114,115,101,110,10,65,104,117,115,101,110,10,65,105,109,98,101,99,107,10,65,108,100,101,110,98,111,114,103,10,65,108,108,119,195,182,195,182,114,100,101,110,10,65,108,116,101,110,111,97,10,65,108,116,111,110,97,10,65,109,109,101,114,108,97,110,100,10,65,110,104,97,108,116,10,65,110,107,108,97,109,10,65,110,107,108,111,104,10,65,110,116,119,97,114,112,10,65,114,101,110,115,112,101,114,103,10,65,114,109,115,100,195,182,114,112,10,65,114,110,101,109,10,65,114,115,100,195,182,114,112,10,65,114,116,108,97,110,100,10,65,115,99,104,101,114,115,108,101,98,98,101,10,65,115,101,110,100,195,182,114,112,10,65,115,107,101,110,100,111,114,112,10,65,115,115,101,108,10,65,195,159,108,101,114,109,111,111,114,10,195,132,195,159,116,114,117,112,112,10,65,116,101,110,115,10,65,117,101,114,107,10,65,117,103,115,98,111,114,103,10,65,117,103,117,115,116,101,110,100,111,114,112,10,65,117,109,117,110,100,10,66,97,97,114,110,98,111,114,103,10,66,97,97,114,110,115,116,114,117,112,10,66,97,99,99,117,109,10,66,97,99,104,101,110,98,114,111,111,107,10,66,97,104,114,100,195,182,114,112,10,66,97,108,106,101,10,66,97,108,116,114,117,109,10,66,97,109,98,97,114,103,10,66,97,110,122,107,111,119,10,66,97,114,99,104,101,108,10,66,97,114,100,195,182,114,112,10,66,97,114,103,107,97,109,112,10,66,97,114,107,104,117,115,101,110,10,66,97,114,110,107,114,111,111,103,10,66,97,114,110,115,100,111,114,112,10,66,97,114,115,108,101,119,119,101,10,66,97,114,118,101,114,10,66,97,115,98,101,101,107,10,66,97,115,98,101,101,107,47,87,97,114,115,116,111,111,100,10,66,97,115,100,97,97,108,10,66,97,115,100,111,104,108,10,66,97,115,115,101,110,102,108,101,101,116,10,66,97,117,107,101,109,10,66,97,117,107,104,111,108,116,10,66,101,195,164,108,107,101,10,66,101,100,100,105,110,103,114,111,111,100,101,10,66,101,101,107,100,195,182,114,112,10,66,101,101,114,115,10,66,101,105,108,101,110,10,66,101,108,101,110,10,66,101,110,116,114,101,105,107,101,10,66,101,110,116,119,105,115,99,104,10,66,101,114,108,105,110,10,66,101,114,110,101,10,66,101,114,117,109,10,66,101,117,101,110,100,195,182,114,112,10,66,101,118,101,114,110,10,66,101,118,101,114,115,116,10,66,101,119,105,99,107,10,66,101,120,104,195,182,118,10,66,101,121,110,116,104,101,109,10,66,105,195,164,107,101,109,10,66,105,101,110,98,195,188,100,100,101,108,10,66,105,101,114,110,98,117,115,99,104,101,10,66,105,115,100,195,182,114,112,10,66,105,115,115,101,110,100,195,164,114,112,10,66,108,97,110,107,110,101,101,115,10,66,108,101,114,115,117,109,10,66,108,105,101,114,115,100,195,182,114,112,10,66,108,111,109,101,110,100,97,108,10,66,111,105,109,115,100,195,182,114,112,10,66,111,109,109,101,108,115,101,10,66,111,111,107,104,111,108,116,10,66,111,111,109,111,111,114,10,66,111,111,116,101,108,10,66,195,182,195,182,116,122,10,66,111,114,103,10,66,111,114,103,100,97,109,109,10,66,111,114,103,108,101,115,117,109,10,66,111,114,110,98,97,114,103,10,66,111,114,114,101,108,10,66,111,115,115,101,108,10,66,195,182,115,115,101,108,10,66,195,182,116,101,114,115,101,110,10,66,195,182,116,122,101,110,10,66,195,182,118,101,114,102,114,97,110,107,101,110,10,66,195,182,118,101,114,112,97,108,122,10,66,195,182,118,101,114,115,108,101,115,105,101,110,10,66,114,97,97,107,10,66,114,97,97,109,115,116,10,66,114,97,99,107,10,66,114,97,105,108,101,110,10,66,114,97,109,101,108,10,66,114,97,110,110,101,110,98,111,114,103,10,66,114,101,100,100,195,182,114,112,10,66,114,101,100,101,110,98,101,101,107,10,66,114,101,100,101,110,119,105,115,99,104,10,66,114,101,100,115,116,101,100,116,10,66,114,101,108,111,104,10,66,114,101,109,101,110,10,98,114,101,109,101,114,10,66,114,101,109,101,114,104,111,98,101,110,10,66,114,101,109,101,114,118,195,182,195,182,114,10,66,114,101,115,116,10,66,114,101,116,116,114,117,112,10,66,114,105,101,110,101,121,10,66,114,105,108,108,105,116,10,66,114,111,98,97,114,103,101,110,10,66,114,195,182,107,101,108,98,101,101,107,10,66,114,111,109,98,97,114,103,10,66,114,111,110,115,119,105,101,107,10,66,114,111,111,107,101,108,10,66,114,111,111,107,108,97,110,100,10,66,114,111,111,107,109,10,66,114,111,111,107,109,101,114,108,97,110,100,10,66,114,111,117,107,104,97,103,101,110,10,66,114,195,188,99,107,10,66,114,195,188,110,101,10,66,114,117,110,115,98,97,114,103,10,66,114,117,110,115,104,117,115,101,110,10,66,114,117,110,115,119,105,101,107,10,66,195,188,99,107,101,98,111,114,103,10,66,195,188,99,107,101,110,10,66,195,188,103,103,101,108,110,10,66,117,105,108,101,102,101,108,100,10,66,117,108,108,101,110,98,97,114,103,10,66,117,108,108,101,110,98,114,111,111,107,10,66,117,108,108,101,110,104,117,115,101,110,10,66,195,188,108,115,10,66,117,111,114,103,104,117,111,114,115,116,10,66,117,111,114,107,101,110,10,66,117,114,104,97,97,102,10,66,195,188,115,101,110,10,66,117,116,116,102,111,111,114,10,66,117,120,116,104,117,10,66,121,104,117,115,101,110,10,67,97,112,112,101,108,10,67,104,195,182,116,116,105,110,103,101,110,10,67,104,111,116,116,115,98,195,188,114,101,110,10,67,108,105,101,110,101,110,115,105,101,108,10,67,108,111,112,112,101,110,98,111,114,103,10,67,111,97,109,101,114,110,10,67,117,120,104,111,98,101,110,10,68,97,104,108,100,195,182,114,112,10,68,97,109,109,104,117,115,101,110,10,68,97,110,110,101,110,98,97,114,103,10,68,97,114,195,159,10,68,97,117,101,110,115,10,68,101,98,115,116,10,68,101,101,115,100,195,182,114,112,10,68,101,105,110,115,116,10,68,101,108,109,10,68,101,108,109,115,101,110,10,68,101,109,101,114,110,10,68,101,109,111,115,116,10,68,101,112,101,110,98,101,101,107,10,68,101,112,112,101,108,116,10,68,101,116,116,101,110,10,68,105,101,107,115,101,110,110,10,68,105,110,103,119,195,182,195,182,114,100,101,110,10,68,105,112,115,104,111,111,114,110,10,68,111,97,110,115,10,68,111,98,114,111,111,107,10,68,195,182,104,108,10,68,111,111,114,110,98,117,115,99,104,10,68,111,111,114,110,98,117,115,99,104,101,114,109,111,111,114,10,68,111,111,114,110,115,111,111,100,10,68,195,182,114,98,101,114,110,10,68,195,182,114,105,110,103,101,110,10,68,111,114,110,117,109,10,68,195,182,114,112,101,110,10,68,195,182,115,115,101,110,10,68,114,97,110,103,115,116,10,68,114,101,98,98,101,114,10,68,114,101,101,98,97,114,103,10,68,114,101,110,116,119,101,100,101,10,68,114,105,102,116,115,101,116,104,10,68,114,105,110,103,101,108,98,111,114,103,10,68,114,111,99,104,116,101,114,115,10,68,195,188,100,100,101,110,104,117,115,101,110,10,68,117,104,110,101,110,10,68,117,105,115,98,111,114,103,10,68,117,108,108,101,114,110,10,68,195,188,195,182,114,112,109,10,68,195,188,114,105,110,103,10,68,195,188,115,115,101,108,100,195,182,114,112,10,68,117,115,116,97,100,116,10,68,195,188,195,188,110,98,101,117,100,101,108,10,68,195,188,118,101,108,115,109,111,111,114,10,69,98,101,110,100,195,182,114,112,10,69,99,107,101,114,110,102,195,182,195,182,114,10,69,101,107,100,111,114,112,10,69,101,107,104,111,102,102,115,98,97,114,103,10,69,101,109,115,108,97,110,100,10,69,101,115,116,98,114,195,188,103,103,10,69,103,103,101,108,110,10,69,104,114,101,110,98,111,114,103,10,69,105,100,101,108,115,116,101,101,10,69,105,100,101,114,115,116,101,100,116,10,69,105,100,117,109,10,69,105,110,100,195,182,114,112,10,69,105,116,101,110,10,69,107,101,108,10,69,108,108,101,114,98,114,111,111,107,10,69,108,109,10,69,108,109,115,104,111,111,114,110,10,69,108,115,100,195,182,114,112,10,69,108,115,102,108,101,116,104,10,69,108,118,109,97,115,99,104,10,69,108,119,105,110,103,10,69,109,109,101,108,107,97,109,112,10,69,109,109,101,114,101,107,10,69,110,103,101,108,115,99,104,111,112,112,10,69,110,103,101,114,104,97,97,102,10,69,114,101,115,98,111,114,103,10,69,114,119,101,99,104,10,69,115,100,195,182,114,112,10,69,115,101,110,115,10,69,118,101,114,110,104,117,115,101,110,10,69,118,101,114,115,100,195,182,114,112,10,69,118,101,114,115,101,110,10,70,97,104,108,98,97,114,103,10,70,97,108,108,119,97,114,100,10,70,97,109,98,111,115,115,101,108,10,70,97,114,103,101,10,70,97,114,119,101,110,10,70,101,104,114,101,110,98,114,111,111,107,10,70,105,99,107,109,195,182,104,108,101,110,10,70,105,110,100,195,182,114,112,10,70,105,110,107,119,97,114,100,101,114,10,70,105,110,116,101,108,10,70,108,101,110,115,98,111,114,103,10,70,108,195,182,103,101,108,110,10,70,111,104,114,101,110,100,97,97,108,10,70,111,104,114,101,110,100,195,182,114,112,10,70,195,182,114,115,110,97,117,10,70,114,97,110,99,111,112,10,70,114,97,110,107,102,117,114,116,10,70,114,97,110,122,101,110,98,111,114,103,10,70,114,101,101,108,115,100,195,182,114,112,10,70,114,101,101,108,115,100,195,182,114,112,101,114,109,195,182,104,108,101,110,10,70,114,101,101,110,98,101,101,107,10,70,114,101,101,116,122,10,70,114,101,105,98,111,114,103,10,70,114,101,110,116,114,111,112,10,70,114,105,101,100,114,105,99,104,115,100,195,182,114,112,10,70,114,105,101,115,116,97,100,116,10,70,114,111,104,110,104,117,117,115,101,110,10,70,117,108,107,117,109,10,71,97,99,107,97,117,10,71,97,110,100,101,114,115,115,101,110,10,71,97,114,100,105,110,103,10,71,97,114,108,195,164,10,71,97,114,108,105,116,122,10,71,101,101,115,116,98,111,114,110,10,71,101,101,115,116,100,195,182,114,112,10,71,101,101,115,116,101,110,100,195,182,114,112,10,71,101,101,115,116,101,110,115,101,116,104,10,71,101,101,115,116,104,97,99,104,116,10,71,101,101,115,116,109,195,188,110,110,10,71,101,108,115,101,110,107,105,195,164,114,107,101,110,10,71,101,118,101,114,115,100,195,182,114,112,10,71,105,101,118,101,108,115,98,105,195,164,114,103,10,71,108,101,110,100,195,182,114,112,10,71,108,105,110,110,10,71,108,105,110,115,116,10,71,110,97,114,114,101,110,98,111,114,103,10,71,111,100,101,110,100,195,182,114,112,10,71,111,100,101,110,115,116,10,71,195,182,100,101,110,115,116,195,182,114,112,10,71,111,100,101,114,104,97,110,100,118,101,101,114,100,101,108,10,71,111,100,111,119,10,71,111,100,115,104,101,109,10,71,111,108,122,119,97,114,100,101,110,10,71,111,114,105,101,115,119,97,114,100,101,114,10,71,111,115,108,195,164,114,10,71,111,116,104,101,110,98,111,114,103,10,71,195,182,116,122,100,195,182,114,112,10,71,114,97,110,115,116,10,71,114,97,115,98,97,114,103,10,71,114,97,117,116,101,110,98,111,114,103,10,71,114,101,101,116,115,105,101,108,10,71,114,101,117,110,100,105,101,107,10,71,114,105,195,164,119,101,110,115,116,101,105,110,10,71,114,105,101,109,115,104,111,114,115,116,10,71,114,105,101,112,115,119,111,104,108,100,10,71,114,105,101,112,115,119,111,111,108,100,10,71,114,105,101,116,104,10,71,114,105,109,101,114,115,117,109,10,71,114,105,112,101,110,104,97,103,101,110,10,71,114,195,182,195,182,110,100,195,182,114,112,10,71,114,111,111,116,119,101,117,114,110,10,71,114,195,182,112,101,108,10,71,114,111,116,101,110,104,97,105,110,10,71,114,111,116,101,110,119,101,10,71,114,117,110,100,111,108,101,110,100,195,182,114,112,10,71,117,108,100,98,101,101,107,10,72,97,98,101,110,104,117,115,101,110,10,72,97,100,100,101,98,121,10,72,97,100,100,195,182,114,112,10,72,97,100,101,108,110,10,72,97,104,110,101,110,107,110,111,111,112,10,72,97,105,110,109,195,182,104,108,101,110,47,118,10,72,97,108,118,101,114,115,116,97,100,10,72,97,108,118,101,114,115,116,97,100,116,10,72,97,108,118,101,114,115,116,105,100,100,101,10,72,97,109,98,97,114,103,101,110,10,72,97,109,98,111,114,103,47,118,10,72,97,109,101,108,119,195,182,195,182,114,100,101,110,10,72,97,109,101,108,119,195,182,195,182,114,100,101,110,101,114,109,111,111,114,10,72,97,109,109,111,104,10,72,97,109,109,111,104,101,114,109,111,111,114,10,72,97,110,100,195,182,114,112,47,118,10,72,97,110,110,111,98,101,114,47,118,10,72,97,110,115,116,195,164,195,164,10,72,97,114,101,110,10,72,97,114,108,101,115,105,101,108,10,72,97,114,109,115,98,111,114,103,10,72,97,114,112,101,110,100,195,182,114,112,10,72,97,114,115,102,101,108,100,10,72,97,114,122,98,111,114,99,104,10,72,97,115,101,108,100,195,182,114,112,10,72,97,115,101,108,195,188,110,110,101,10,72,97,115,115,101,108,119,97,114,100,101,114,10,72,97,115,115,101,110,100,195,182,114,112,10,72,97,115,116,101,100,116,10,72,101,99,107,116,104,117,115,101,110,10,72,101,101,109,115,98,195,188,110,110,101,110,10,72,101,101,110,100,195,182,114,112,10,72,101,101,115,100,195,182,114,112,10,72,101,101,195,159,101,108,10,72,101,105,100,101,108,98,97,114,103,10,72,101,105,109,98,114,111,111,107,10,72,101,105,110,98,111,107,101,108,10,72,101,105,110,114,105,99,104,115,100,195,182,114,112,10,72,101,105,116,109,97,110,110,115,104,117,115,101,110,10,72,101,108,108,119,101,101,103,10,72,101,108,109,115,116,105,100,100,101,10,72,101,108,109,119,111,114,116,104,10,72,101,109,101,108,110,10,72,101,109,101,110,100,195,182,114,112,10,72,101,109,109,111,111,114,10,72,101,112,112,101,110,115,10,72,101,112,115,116,10,72,101,121,101,114,104,195,182,98,101,110,10,72,105,97,114,119,101,100,101,10,72,105,195,164,115,98,105,195,164,114,103,10,72,105,195,164,116,116,101,110,10,72,105,108,108,105,103,101,110,100,97,109,109,10,72,105,108,109,101,115,115,101,110,10,72,105,108,109,115,115,101,110,10,72,105,110,110,101,114,112,111,109,109,101,114,110,10,72,105,112,115,116,10,72,111,98,101,110,104,117,115,101,110,10,72,111,99,107,109,195,182,104,108,101,110,10,72,111,103,101,110,109,111,111,114,10,72,111,103,101,110,111,104,10,72,111,105,115,100,195,182,114,112,10,72,111,108,108,101,110,98,101,101,107,10,72,111,108,108,110,115,101,116,104,10,72,111,108,115,115,101,108,110,10,72,111,108,115,116,101,10,72,111,108,115,116,101,114,104,117,117,115,101,110,10,72,111,108,116,104,117,115,101,110,10,72,111,109,101,114,115,101,110,10,72,195,182,110,97,117,10,72,111,111,99,104,115,117,101,114,108,97,110,100,107,114,101,105,115,10,72,111,111,103,109,111,111,114,10,72,111,111,118,10,72,195,182,112,101,114,104,195,182,102,101,110,10,72,111,112,115,116,101,110,10,72,111,114,98,111,114,103,10,72,195,182,114,100,101,10,72,111,114,110,98,111,114,103,10,72,195,182,114,110,117,109,10,72,111,114,195,159,10,72,111,115,116,10,72,111,115,116,101,114,98,101,101,107,10,72,111,118,101,108,10,72,117,99,104,116,101,110,10,72,195,188,108,108,10,72,117,108,108,101,114,110,10,72,117,108,108,110,115,116,10,72,117,109,109,101,110,115,10,72,117,115,98,114,111,111,107,10,72,195,188,115,116,101,110,10,72,195,188,116,122,101,108,10,72,117,117,100,10,73,104,108,98,101,101,107,10,73,108,102,101,108,100,10,73,108,115,116,195,182,114,112,10,73,108,118,10,73,109,98,101,101,107,10,73,109,115,117,109,10,73,112,112,101,110,115,10,73,115,101,110,115,101,101,10,73,115,101,114,98,114,111,111,107,10,73,115,101,114,108,97,117,110,10,73,115,104,101,105,109,10,73,115,115,101,108,10,73,115,115,101,110,100,195,182,114,112,10,73,116,122,104,111,101,10,73,116,122,119,195,182,195,182,114,100,101,110,10,74,97,97,100,10,74,101,118,101,114,10,74,195,182,114,107,10,74,195,188,116,101,114,98,111,103,10,75,97,109,112,101,110,10,75,97,114,107,100,195,182,114,112,10,75,97,114,107,108,105,110,116,101,108,110,10,75,97,114,107,116,105,109,107,10,75,97,114,107,119,97,108,115,10,75,97,114,107,119,97,114,100,101,114,10,75,97,114,107,119,105,115,116,10,75,97,116,101,108,110,98,111,114,103,10,75,101,100,101,110,98,114,111,111,107,10,75,101,105,116,117,109,10,75,101,116,122,101,110,100,195,182,114,112,10,75,105,101,107,98,97,114,103,10,75,108,101,110,107,101,110,100,195,182,114,112,10,75,108,101,116,104,101,110,10,75,108,105,110,116,10,75,108,111,111,115,116,101,114,104,111,108,116,10,75,111,104,108,101,110,104,117,115,101,110,10,75,111,104,109,195,182,104,108,101,110,10,75,111,107,101,114,98,101,101,107,10,75,111,108,98,97,114,103,10,75,111,108,104,101,105,109,10,75,111,108,108,101,110,104,97,111,114,100,116,10,75,111,109,109,101,114,98,117,115,99,104,10,75,195,182,110,105,103,115,98,97,114,103,10,75,111,111,115,102,101,108,100,10,75,111,112,101,110,107,97,109,112,10,75,195,182,114,98,97,99,104,10,75,111,114,108,115,104,111,97,119,101,110,10,75,111,114,108,115,104,195,182,98,101,110,10,75,195,182,115,108,105,110,10,75,195,182,115,116,101,114,115,119,101,103,10,75,114,97,97,110,115,98,111,114,103,10,75,114,97,110,122,10,75,114,101,105,110,115,115,101,110,10,75,114,111,110,101,110,98,111,114,103,10,75,114,117,109,109,101,110,100,105,101,107,10,75,114,117,109,109,104,195,182,114,110,10,75,114,195,188,109,112,101,108,10,75,114,117,117,116,115,97,110,100,10,75,117,104,108,97,10,75,195,188,104,114,115,116,10,75,117,104,115,10,75,117,104,115,116,101,114,109,111,111,114,10,75,117,109,98,97,114,103,10,75,117,116,101,110,104,117,108,116,10,76,97,97,107,10,76,97,110,103,101,108,110,10,76,97,110,103,101,110,100,111,97,104,108,10,76,97,110,103,101,110,104,117,115,101,110,10,76,97,117,101,110,98,114,195,188,99,104,10,76,101,98,101,110,111,103,103,101,10,76,101,108,101,110,100,97,97,108,10,76,101,110,103,101,110,98,111,115,115,101,108,10,76,105,109,98,111,114,103,10,76,105,119,119,97,100,100,101,110,10,76,111,104,109,195,182,104,108,101,110,10,76,111,111,100,107,117,112,10,76,111,111,107,10,76,111,111,109,115,116,10,76,111,111,110,98,111,114,103,10,76,195,188,109,98,111,114,103,10,76,195,188,110,107,104,117,115,101,110,10,76,195,188,110,115,99,104,101,10,76,195,188,116,116,109,195,182,104,108,101,110,10,76,195,188,116,116,119,195,182,104,114,110,10,76,195,188,195,188,109,98,111,114,103,10,76,195,188,195,188,110,98,111,114,103,10,77,97,104,110,100,195,182,114,112,10,77,97,105,104,117,115,101,110,10,77,97,114,98,111,114,103,10,77,101,99,107,101,108,98,111,114,103,10,77,101,104,100,195,182,114,112,10,77,101,105,100,101,98,111,114,103,10,77,101,108,100,195,182,114,112,10,77,101,115,98,111,114,103,10,77,105,195,164,114,115,101,98,105,195,164,114,103,10,77,105,100,100,101,108,115,100,195,182,114,112,10,77,105,100,100,106,195,188,195,188,116,108,97,110,100,10,77,105,110,116,101,110,98,111,114,103,10,77,105,116,116,101,108,115,107,97,114,107,10,77,105,116,116,101,108,115,110,111,104,110,10,77,195,182,104,108,101,110,98,101,101,107,10,77,195,182,104,108,101,110,100,105,101,107,10,77,111,111,114,100,105,101,107,10,77,195,188,103,103,101,110,100,195,182,114,112,10,77,117,109,109,101,110,100,195,182,114,112,10,77,195,188,110,99,104,101,110,10,78,97,117,109,98,111,114,103,10,78,101,101,98,97,99,104,101,110,98,114,111,111,107,10,78,101,101,104,97,114,108,105,110,103,101,114,115,105,101,108,10,78,101,101,104,117,117,115,10,78,101,101,105,107,97,109,112,101,114,102,101,104,110,10,78,101,101,107,108,111,111,115,116,101,114,10,78,101,101,108,97,110,110,101,114,109,111,111,114,10,78,101,101,110,98,111,114,103,10,78,101,101,110,100,97,109,109,10,78,101,101,110,107,97,114,107,101,110,10,78,101,101,110,108,97,110,100,10,78,101,101,115,99,104,111,116,116,108,97,110,100,10,78,101,101,115,116,97,100,116,10,78,101,101,119,97,114,107,10,78,101,101,119,105,101,100,101,110,100,97,108,10,78,105,101,110,98,111,114,103,10,78,105,101,110,98,111,114,103,47,87,101,114,115,101,114,10,78,105,101,110,100,195,182,114,112,10,78,105,101,110,107,105,195,164,114,107,101,110,10,78,105,110,99,111,112,10,78,105,110,99,111,112,101,114,100,105,101,107,10,78,105,110,100,195,182,114,112,10,78,195,182,195,182,114,100,101,110,10,78,111,111,114,100,104,111,108,116,10,78,195,182,114,100,101,114,110,101,101,105,10,78,111,114,116,104,97,117,101,110,10,78,111,116,116,101,110,115,100,195,182,114,112,10,78,195,188,114,110,98,97,114,103,10,195,150,98,101,114,110,100,195,182,114,112,10,79,99,104,101,110,104,117,115,101,110,10,79,104,108,101,110,98,195,188,116,116,101,108,10,79,104,108,101,110,100,111,114,102,10,79,104,108,101,114,115,10,79,104,108,115,100,195,182,114,112,10,79,104,114,101,110,115,102,108,117,99,104,116,10,79,104,114,101,110,115,109,111,111,114,10,79,104,114,101,110,115,119,111,104,108,10,79,105,108,115,116,195,182,114,112,10,195,150,105,110,117,115,101,110,10,79,108,100,101,110,98,111,114,103,10,79,108,101,110,98,114,111,111,107,10,79,108,101,110,100,195,182,114,112,10,79,108,101,110,101,115,99,104,10,79,108,101,110,119,97,114,100,101,114,10,79,108,101,110,119,111,111,108,100,10,79,108,108,101,110,100,195,182,114,112,10,79,108,108,110,98,111,114,103,10,79,111,108,100,107,108,111,111,115,116,101,114,10,79,111,115,116,101,110,100,101,10,79,111,115,116,101,110,100,195,182,114,112,10,79,111,115,116,101,114,110,100,195,182,114,112,10,79,112,104,117,115,101,110,10,195,150,114,115,100,195,182,114,112,10,79,115,100,195,182,114,112,10,79,115,115,101,110,100,195,182,114,112,10,79,116,101,114,110,100,195,182,114,112,10,79,116,116,101,110,98,101,101,107,10,79,116,116,101,110,100,195,182,114,112,10,79,116,116,101,114,98,97,114,103,10,195,150,118,101,108,103,195,182,110,110,10,79,118,101,114,104,117,115,10,79,119,101,114,104,117,117,115,101,110,10,80,97,100,105,110,103,98,195,188,100,100,101,108,10,80,97,112,101,110,98,195,182,114,103,10,80,97,114,108,98,97,114,103,10,80,97,114,110,119,105,110,107,101,108,10,80,97,116,116,101,114,98,117,111,114,110,10,80,101,116,101,114,115,98,111,114,103,10,80,101,116,101,114,115,100,195,182,114,112,10,80,105,110,110,98,97,114,103,10,80,108,195,182,110,106,101,115,104,117,115,101,110,10,80,108,195,182,195,182,110,10,80,111,112,101,110,100,105,101,107,10,80,111,115,116,104,117,115,101,110,10,81,117,101,100,100,101,108,110,98,111,114,103,10,81,117,111,107,101,110,98,114,195,188,103,103,101,10,82,97,110,115,116,114,111,112,10,82,97,116,122,101,98,111,114,103,10,82,97,118,101,110,115,98,105,195,164,114,103,10,82,101,101,112,115,104,111,108,116,10,82,101,103,101,110,115,98,111,114,103,10,82,101,110,100,115,98,111,114,103,10,82,104,105,101,110,115,98,97,114,103,10,82,105,195,164,107,101,108,104,117,115,101,110,10,82,105,110,103,115,100,195,182,114,112,10,82,111,100,100,195,182,114,112,10,82,111,100,101,110,98,111,114,103,10,82,195,182,110,110,100,105,101,107,10,82,117,116,101,110,98,101,101,107,10,83,97,104,108,101,110,98,111,114,103,10,83,97,110,100,98,111,115,115,101,108,10,83,97,111,108,116,98,105,195,164,114,103,101,110,10,83,97,115,115,101,110,104,111,108,116,10,83,99,104,105,112,112,100,195,182,114,112,10,83,99,104,195,182,110,98,97,114,103,10,83,99,104,195,182,110,107,97,114,107,101,110,10,83,99,104,114,101,103,101,110,109,111,111,114,10,83,101,98,97,114,103,10,83,101,101,100,195,182,114,112,10,83,101,101,118,101,100,97,97,108,10,83,105,101,226,128,153,101,110,98,111,114,103,10,83,111,108,116,98,111,114,103,10,83,111,108,116,119,101,100,101,108,10,83,111,108,122,104,117,115,101,110,10,83,111,117,110,115,105,101,107,10,83,112,105,116,122,98,97,114,103,101,110,10,83,116,101,100,100,195,182,114,112,10,83,116,101,109,109,101,114,109,195,182,104,108,101,110,10,83,116,105,99,107,101,110,98,195,188,116,116,101,108,10,83,116,111,99,107,104,117,115,101,110,10,83,116,111,100,101,114,109,111,111,114,10,83,116,111,100,101,114,115,97,110,100,10,83,116,114,97,195,159,98,111,114,103,10,83,195,188,108,108,100,195,182,114,112,10,83,195,188,110,110,101,110,98,97,114,103,10,83,195,188,114,115,101,110,10,83,119,97,99,104,104,117,115,101,110,10,83,119,97,114,116,101,110,104,195,188,116,116,101,110,10,83,119,101,114,105,110,10,84,97,110,103,101,110,100,195,182,114,112,10,84,97,110,103,101,114,109,195,188,110,110,10,84,97,110,107,115,116,101,101,100,10,84,105,109,109,101,114,108,111,111,100,10,84,111,100,116,115,104,111,111,114,110,10,84,114,97,118,101,109,195,188,110,110,10,84,119,195,188,115,99,104,101,110,97,104,110,10,86,105,115,115,101,108,104,195,182,195,182,118,100,10,86,195,182,114,97,114,108,98,97,114,103,10,86,111,114,100,195,182,114,112,10,86,195,182,114,104,111,111,114,110,10,86,111,115,115,104,117,117,115,101,110,10,87,97,108,115,114,111,111,100,10,87,97,114,101,110,100,195,182,114,112,10,87,97,114,110,100,117,111,114,112,10,87,97,114,110,101,109,195,188,110,110,10,87,97,114,115,116,111,111,100,10,87,101,104,108,100,195,182,114,112,10,87,101,110,116,101,110,100,195,182,114,112,10,87,101,114,115,101,114,109,195,188,110,110,10,87,101,115,116,101,114,98,97,114,103,10,87,101,115,116,101,114,115,111,111,100,10,87,101,115,116,101,114,115,116,195,164,101,10,87,101,115,116,101,114,119,105,115,99,104,10,87,105,101,102,101,108,115,116,195,164,101,10,87,105,101,109,115,100,195,182,114,112,10,87,105,108,108,101,109,115,98,111,114,103,10,87,105,108,108,101,109,115,104,97,118,101,110,10,87,105,108,115,104,117,115,101,110,10,87,105,110,107,101,108,100,195,182,114,112,10,87,105,115,99,104,104,111,98,101,110,10,87,105,116,116,101,110,98,97,114,103,10,87,105,116,116,101,110,100,195,182,114,112,10,87,105,116,116,101,110,109,111,111,114,10,87,105,116,116,195,182,114,112,10,87,111,104,108,101,110,98,101,101,107,10,87,111,108,115,98,117,100,100,101,108,10,87,111,108,116,109,101,114,115,104,117,115,101,110,10,87,111,114,112,104,117,115,101,110,10,87,111,114,112,115,119,101,101,100,10,87,117,104,108,101,110,98,111,114,103,10,87,117,108,102,101,110,98,195,188,116,116,101,108,10,87,117,108,102,115,98,111,114,103,10,87,117,108,102,115,98,114,111,107,101,114,109,111,111,114,10,87,117,108,109,115,100,195,182,114,112,10,87,117,108,115,100,195,182,114,112,10,87,117,112,112,101,114,100,97,97,108,10,87,195,188,114,122,98,111,114,103,10,90,97,104,114,101,110,104,117,115,101,110,10,65,98,99,104,97,115,105,101,110,10,97,98,99,104,97,97,115,115,99,104,47,101,110,10,65,100,114,105,97,10,97,102,97,97,114,115,99,104,47,101,110,10,65,102,103,104,97,110,105,115,116,97,110,10,65,102,114,105,107,97,10,97,102,114,105,107,97,97,110,115,99,104,47,101,110,10,195,132,103,121,112,116,101,110,10,65,108,98,97,110,105,101,110,10,97,108,98,97,97,110,115,99,104,47,101,110,10,65,108,103,101,114,105,101,110,10,65,108,112,101,110,10,65,109,101,114,105,107,97,10,97,109,101,114,105,107,97,97,110,115,99,104,47,101,110,10,97,109,104,97,97,114,115,99,104,47,101,110,10,65,110,100,111,114,114,97,10,65,110,103,111,108,97,10,65,110,116,97,114,107,116,105,115,10,97,110,116,97,114,107,116,115,99,104,47,101,110,10,65,110,116,105,103,117,97,10,117,110,10,66,97,114,98,117,100,97,10,65,110,116,105,108,108,101,110,10,195,132,113,117,97,116,111,114,105,97,97,108,45,71,117,105,110,101,97,10,65,114,97,98,105,101,110,10,97,114,97,97,98,115,99,104,47,101,110,10,65,114,103,101,110,116,105,110,105,101,110,10,97,114,103,101,110,116,105,101,110,115,99,104,47,101,110,10,65,114,109,101,110,105,101,110,10,97,114,109,101,101,110,115,99,104,47,101,110,10,65,115,101,114,98,97,105,100,115,99,104,97,110,10,97,115,101,114,98,97,105,100,115,99,104,97,97,110,115,99,104,47,101,110,10,65,115,105,101,110,10,97,115,115,97,109,101,101,115,99,104,47,101,110,10,195,132,116,104,105,111,112,105,101,110,10,195,164,116,104,105,111,111,112,115,99,104,10,65,118,101,115,116,97,10,65,121,109,97,114,97,10,65,117,115,116,114,97,108,105,101,110,10,97,117,115,116,114,97,97,108,115,99,104,47,101,110,10,66,97,104,97,109,97,115,10,66,97,104,114,97,105,110,10,66,97,108,107,97,110,10,98,97,108,116,115,99,104,47,101,110,10,66,97,110,100,97,114,10,66,97,110,103,108,97,100,101,115,99,104,10,66,97,114,98,97,100,111,115,10,98,97,115,99,104,107,105,105,114,115,99,104,47,101,110,10,66,97,115,107,101,110,10,98,97,115,107,115,99,104,47,101,110,10,66,101,108,103,105,101,110,10,98,101,108,103,115,99,104,47,101,110,10,66,101,108,103,114,97,100,10,66,101,108,105,122,101,10,98,101,110,103,97,97,108,115,99,104,47,101,110,10,66,101,110,105,110,10,66,101,114,109,117,100,97,115,10,66,105,104,97,114,105,10,66,105,115,108,97,109,97,10,66,104,117,116,97,110,10,66,111,107,109,195,165,108,10,66,111,108,105,118,105,101,110,10,66,111,115,110,105,101,110,45,72,101,114,122,101,103,111,119,105,110,97,10,98,111,115,110,105,115,99,104,47,101,110,10,66,111,116,115,119,97,110,97,10,66,114,97,115,105,108,105,101,110,10,98,114,97,115,105,108,105,97,97,110,115,99,104,47,101,110,10,98,114,101,116,111,111,110,115,99,104,47,101,110,10,98,114,105,116,115,99,104,47,101,110,10,66,114,117,110,101,105,10,66,117,108,103,97,114,105,101,110,10,98,117,108,103,97,97,114,115,99,104,10,66,117,114,107,105,110,97,10,70,97,115,111,10,66,117,114,109,97,10,98,117,114,109,101,101,115,99,104,47,101,110,10,66,117,114,117,110,100,105,10,67,97,105,99,111,115,105,110,115,101,108,110,10,67,104,97,109,111,114,114,111,10,67,104,105,99,104,101,119,97,10,67,104,105,110,97,10,99,104,105,110,101,101,115,99,104,10,67,104,105,108,101,10,67,111,115,116,97,10,82,105,99,97,10,68,195,164,195,164,110,109,97,114,107,10,100,195,164,195,164,110,115,99,104,47,101,110,10,68,195,188,195,188,116,115,99,104,108,97,110,100,10,100,195,188,195,188,116,115,99,104,47,101,110,10,104,111,111,99,104,100,195,188,195,188,116,115,99,104,47,101,110,10,112,108,97,116,116,100,195,188,195,188,116,115,99,104,47,101,110,10,80,108,97,116,116,100,195,188,195,188,116,115,99,104,10,68,111,109,105,110,105,99,97,10,68,111,109,105,110,105,107,97,97,110,115,99,104,101,10,82,101,112,117,98,108,105,107,10,68,115,99,104,105,98,117,116,105,10,68,122,111,110,103,107,104,97,10,69,99,117,97,100,111,114,10,69,108,102,101,110,98,101,101,110,107,195,188,115,116,10,69,108,10,83,97,108,118,97,100,111,114,10,69,110,103,108,97,110,100,10,101,110,103,101,108,115,99,104,47,101,110,10,69,114,105,116,114,101,97,10,69,115,112,101,114,97,110,116,111,10,69,115,116,108,97,110,100,10,101,115,116,110,115,99,104,47,101,110,10,69,117,114,111,112,97,10,101,117,114,111,112,195,164,195,164,115,99,104,47,101,110,10,70,97,114,115,105,10,70,195,164,114,195,182,101,114,10,102,195,164,114,195,182,195,182,115,99,104,47,101,110,10,70,105,100,115,99,104,105,10,70,105,110,110,108,97,110,100,10,102,105,110,110,115,99,104,47,101,110,10,102,108,195,164,195,164,109,115,99,104,47,101,110,10,70,114,97,110,107,114,105,101,107,10,102,114,97,110,122,195,182,195,182,115,99,104,47,101,110,10,70,114,101,101,115,108,97,110,100,10,102,114,101,101,115,99,104,47,101,110,10,71,97,98,117,110,10,71,97,108,108,101,103,97,110,10,71,97,108,105,122,105,101,110,10,103,97,108,105,122,115,99,104,47,101,110,10,71,97,109,98,105,97,10,71,101,111,114,103,105,101,110,10,103,101,111,114,103,115,99,104,47,101,110,10,71,104,97,110,97,10,71,114,101,110,97,100,97,10,71,114,101,107,101,110,108,97,110,100,10,103,114,101,101,107,115,99,104,47,101,110,10,71,114,111,111,116,98,114,105,116,97,110,110,105,101,110,10,71,66,10,71,117,97,109,10,71,117,97,114,97,110,105,10,71,117,97,116,101,109,97,108,97,10,71,117,100,115,99,104,97,114,97,116,105,10,71,117,105,110,101,97,10,71,117,105,110,101,97,45,66,105,115,115,97,117,10,71,117,114,109,117,107,104,105,10,71,117,121,97,110,97,10,71,195,164,195,164,108,115,99,104,10,72,97,105,116,105,10,72,97,117,115,115,97,10,104,101,98,114,195,164,195,164,115,99,104,47,101,110,10,72,101,114,101,114,111,10,72,105,110,100,105,10,72,105,114,105,10,72,111,108,115,116,101,101,110,10,72,111,110,100,117,114,97,115,10,73,100,111,10,73,110,100,105,101,110,10,105,110,100,105,115,99,104,47,101,110,10,73,110,100,111,110,101,115,105,101,110,10,105,110,100,111,110,101,101,115,99,104,47,101,110,10,73,110,116,101,114,108,105,110,103,117,97,10,73,110,116,101,114,108,105,110,103,117,101,10,73,110,117,107,116,105,116,117,116,10,73,110,117,112,105,97,107,10,73,114,97,107,10,73,114,97,110,10,105,114,97,97,110,115,99,104,47,101,110,10,73,114,108,97,110,100,10,105,114,115,99,104,47,101,110,10,73,115,108,97,110,100,10,105,115,108,97,110,110,115,99,104,47,101,110,10,73,115,114,97,101,108,10,104,101,98,114,195,164,195,164,115,99,104,10,104,101,98,114,195,164,115,99,104,101,10,104,101,98,114,195,164,115,99,104,101,110,10,73,116,97,108,105,101,110,10,105,116,97,108,105,101,101,110,115,99,104,47,101,110,10,74,97,109,97,105,107,97,10,74,97,112,97,110,10,106,97,112,97,97,110,115,99,104,47,101,110,10,74,97,118,97,10,106,97,118,97,110,101,101,115,99,104,47,101,110,10,74,101,109,101,110,10,106,101,109,101,110,105,101,116,115,99,104,47,101,110,10,106,105,100,100,115,99,104,47,101,110,10,74,111,114,100,97,110,105,101,110,10,74,117,103,111,115,108,97,119,105,101,110,10,106,117,103,111,115,108,97,97,119,115,99,104,47,101,110,10,75,97,108,97,97,108,108,105,115,117,116,10,75,97,109,98,111,100,115,99,104,97,10,75,97,109,101,114,117,110,10,75,97,110,97,100,97,10,107,97,110,97,97,100,115,99,104,47,101,110,10,75,97,110,110,97,100,97,10,75,97,112,10,86,101,114,100,101,10,107,97,116,97,108,97,97,110,115,99,104,47,101,110,10,75,97,115,97,99,104,115,116,97,110,10,107,97,115,97,99,104,115,99,104,47,101,110,10,75,97,115,99,104,109,105,114,10,107,97,115,99,104,109,105,105,114,115,99,104,47,101,110,10,75,97,116,97,114,10,75,101,110,105,97,10,75,104,109,101,114,10,75,105,107,117,121,117,10,75,105,110,121,97,114,119,97,110,100,97,10,75,105,114,103,105,115,105,101,110,10,107,105,114,103,105,105,115,99,104,47,101,110,10,75,105,114,105,98,97,116,105,10,75,111,108,117,109,98,105,101,110,10,75,111,109,105,10,75,111,109,111,114,101,110,10,75,111,110,103,111,10,75,111,114,101,97,10,107,111,114,101,97,97,110,115,99,104,47,101,110,10,107,111,114,110,105,115,99,104,47,101,110,10,75,111,114,115,105,107,97,10,107,111,114,115,115,99,104,47,101,110,10,75,114,111,97,116,105,101,110,10,107,114,111,97,97,116,115,99,104,47,101,110,10,75,117,98,97,10,75,117,114,100,105,115,116,97,110,10,107,117,114,100,115,99,104,47,101,110,10,75,117,119,97,105,116,10,75,119,97,110,106,97,109,97,10,76,97,111,115,10,108,97,111,111,116,115,99,104,47,101,110,10,76,97,116,105,101,110,97,109,101,114,105,107,97,10,108,97,116,105,101,110,97,109,101,114,105,107,97,97,110,115,99,104,47,101,110,10,108,97,116,105,101,110,115,99,104,47,101,110,10,76,101,115,111,116,104,111,10,76,101,116,116,108,97,110,100,10,108,101,116,116,115,99,104,47,101,110,10,76,105,98,97,110,111,110,10,76,105,98,101,114,105,97,10,76,105,98,121,101,110,10,76,105,101,99,104,116,101,110,115,116,101,101,110,10,108,105,109,98,111,114,103,115,99,104,47,101,110,10,76,105,110,103,97,108,97,10,76,105,116,97,117,101,110,10,108,105,116,97,117,115,99,104,47,101,110,10,76,117,120,101,109,98,111,114,103,10,108,117,120,101,109,98,111,114,103,115,99,104,47,101,110,10,77,97,100,97,103,97,115,107,97,114,10,109,97,100,97,103,97,115,115,39,115,99,104,10,77,97,107,97,111,10,77,97,107,101,100,111,110,105,101,110,10,109,97,107,101,100,111,111,110,115,99,104,47,101,110,10,77,97,108,97,119,105,10,77,97,108,97,121,97,108,97,109,10,77,97,108,97,121,115,105,97,10,109,97,108,97,105,105,115,99,104,47,101,110,10,77,97,108,101,100,105,118,101,110,10,77,97,108,105,10,77,97,108,116,97,10,109,97,108,116,101,101,115,99,104,47,101,110,10,77,97,110,120,10,77,97,111,114,105,10,77,97,114,97,116,104,105,10,77,97,114,111,107,107,111,10,77,97,114,115,104,97,108,108,105,110,115,101,108,110,10,109,97,114,115,99,104,97,108,108,101,101,115,99,104,47,101,110,10,77,97,117,114,101,116,97,110,105,101,110,10,77,97,117,114,105,116,105,117,115,10,77,101,120,105,107,111,10,77,105,100,100,101,108,109,101,101,114,10,77,105,107,114,111,110,101,115,105,101,110,10,77,111,108,100,97,119,105,101,110,10,109,111,108,100,97,97,119,115,99,104,47,101,110,10,77,111,110,97,99,111,10,77,111,110,103,111,108,101,105,10,109,111,110,103,111,111,108,115,99,104,47,101,110,10,77,111,116,117,10,77,111,115,97,109,98,105,107,10,77,121,97,110,109,97,114,10,98,105,114,109,97,97,110,115,115,99,104,47,101,110,10,78,97,109,105,98,105,97,10,78,97,117,114,117,10,78,97,118,97,106,111,10,78,100,101,98,101,108,101,10,78,100,111,110,103,97,10,78,101,100,100,101,114,108,97,110,110,101,110,10,110,101,100,100,101,114,108,97,110,110,115,99,104,47,101,110,10,78,101,112,97,108,10,110,101,112,97,108,101,101,115,99,104,47,101,110,10,78,105,99,97,114,97,103,117,97,10,78,105,101,103,115,101,101,108,97,110,100,10,78,105,101,109,195,188,110,115,116,101,114,10,78,105,103,101,114,10,78,105,103,101,114,105,97,10,78,106,97,110,100,115,99,104,97,10,78,111,111,114,100,107,111,114,101,97,10,78,111,111,114,100,115,101,101,10,78,111,114,119,101,103,101,110,10,110,111,114,119,101,101,103,115,99,104,47,101,110,10,78,121,110,111,114,115,107,10,79,103,104,97,109,10,111,107,122,105,116,97,97,110,115,99,104,47,101,110,10,79,109,97,110,10,79,111,115,116,115,101,101,10,79,111,115,116,116,105,109,111,114,10,79,114,105,121,97,10,79,114,111,109,111,10,79,115,115,101,116,105,101,110,10,111,115,115,101,101,116,115,99,104,47,101,110,10,195,150,195,182,115,116,101,114,114,105,101,107,10,79,122,101,97,110,105,101,110,10,80,97,107,105,115,116,97,110,10,80,97,108,97,117,10,80,97,108,105,10,80,97,108,195,164,115,116,105,110,97,10,112,97,108,195,164,115,116,105,110,101,110,115,99,104,47,101,110,10,80,97,110,97,109,97,10,80,97,110,100,115,99,104,97,98,10,112,97,110,100,115,99,104,97,97,98,115,99,104,47,101,110,10,80,97,112,117,97,45,78,105,101,103,103,117,105,110,101,97,10,80,97,114,97,103,117,97,121,10,80,97,114,105,115,10,112,97,115,99,104,116,117,117,110,115,99,104,47,101,110,10,112,101,114,115,105,115,99,104,47,101,110,10,80,101,114,117,10,80,104,105,108,105,112,112,105,110,101,110,10,80,111,108,101,110,10,112,111,111,108,115,99,104,47,101,110,10,80,111,108,121,110,101,115,105,101,110,10,112,111,108,121,110,101,101,115,99,104,47,101,110,10,80,111,114,116,117,103,97,108,10,112,111,114,116,117,103,101,101,115,99,104,47,101,110,10,112,114,111,118,101,110,122,97,97,108,115,99,104,47,101,110,10,75,101,116,115,99,104,117,97,10,114,111,109,97,97,110,115,99,104,47,101,110,10,82,117,109,195,164,110,105,101,110,10,114,117,109,195,164,195,164,110,115,99,104,47,101,110,10,82,117,97,110,100,97,10,82,117,110,100,105,10,82,117,115,115,108,97,110,100,10,114,117,115,115,39,115,99,104,47,101,110,10,114,195,164,116,111,114,111,109,97,97,110,115,99,104,47,101,110,10,115,97,97,109,115,99,104,47,101,110,10,83,97,108,111,109,111,110,101,110,10,83,97,109,98,105,97,10,83,97,109,111,97,10,115,97,109,111,97,97,110,115,99,104,47,101,110,10,83,97,110,103,111,10,83,97,110,115,107,114,105,116,10,83,97,114,100,105,110,105,101,110,10,115,97,114,100,105,101,110,115,99,104,47,101,110,10,83,97,110,10,77,97,114,105,110,111,10,83,195,163,111,10,84,111,109,195,169,10,117,110,10,80,114,195,173,110,99,105,112,101,10,83,97,117,100,105,45,65,114,97,98,105,101,110,10,83,99,104,111,116,116,108,97,110,100,10,115,99,104,111,116,116,115,99,104,47,101,110,10,83,101,110,101,103,97,108,10,83,101,114,98,105,101,110,10,77,111,110,116,101,110,101,103,114,111,10,115,101,114,98,115,99,104,47,101,110,10,115,101,114,98,111,107,114,111,97,97,116,115,99,104,47,101,110,10,83,101,121,99,104,101,108,108,101,110,10,83,104,111,110,97,10,83,105,101,114,114,97,10,76,101,111,110,101,10,83,105,109,98,97,98,119,101,10,83,105,110,100,104,105,10,115,105,110,103,97,108,101,101,115,99,104,47,101,110,10,83,105,110,103,97,112,117,114,10,115,108,97,97,119,115,99,104,47,101,110,10,83,108,101,115,119,105,103,10,83,108,111,119,97,107,101,105,10,115,108,111,119,97,97,107,115,99,104,47,101,110,10,83,108,111,119,101,110,105,101,110,10,115,108,111,119,101,101,110,115,99,104,47,101,110,10,83,111,109,97,108,105,10,83,111,109,97,108,105,97,10,115,111,114,98,115,99,104,47,101,110,10,83,112,97,110,105,101,110,10,115,112,97,97,110,115,99,104,47,101,110,10,83,111,116,104,111,10,83,114,105,10,76,97,110,107,97,10,83,116,10,75,105,116,116,115,10,78,101,118,105,115,10,76,117,99,105,97,10,86,105,110,99,101,110,116,10,71,114,101,110,97,100,105,110,101,110,10,83,117,100,97,110,10,115,117,110,100,97,110,101,101,115,99,104,47,101,110,10,83,117,114,105,110,97,109,10,83,119,97,104,105,108,105,10,83,119,97,116,105,10,83,119,97,115,105,108,97,110,100,10,83,119,101,100,101,110,10,115,119,101,101,100,115,99,104,47,101,110,10,83,119,105,101,122,10,115,119,105,101,122,101,114,100,195,188,195,188,116,115,99,104,47,101,110,10,83,119,105,101,122,101,114,10,83,121,114,105,101,110,10,115,121,114,115,99,104,47,101,110,10,83,195,182,195,182,100,97,102,114,105,107,97,10,83,195,182,195,182,100,107,111,114,101,97,10,84,97,100,115,99,104,105,107,105,115,116,97,110,10,116,97,100,115,99,104,105,105,107,115,99,104,47,101,110,10,84,97,104,105,116,105,10,116,97,104,105,105,116,115,99,104,47,101,110,10,84,97,105,119,97,110,10,116,97,109,105,101,108,115,99,104,47,101,110,10,84,97,110,115,97,110,105,97,10,116,97,114,116,97,97,114,115,99,104,47,101,110,10,84,101,108,117,103,117,10,84,105,98,101,116,10,116,105,98,101,101,116,115,99,104,47,101,110,10,84,105,103,114,105,110,121,97,10,84,195,182,114,107,101,105,10,116,195,182,114,107,115,99,104,47,101,110,10,84,104,97,105,10,84,104,97,105,108,97,110,100,10,116,104,97,105,108,97,110,110,115,99,104,47,101,110,10,84,111,103,111,10,84,111,110,103,97,10,84,114,105,110,105,100,97,100,10,117,110,10,84,111,98,97,103,111,10,84,115,99,104,97,100,10,84,115,99,104,101,99,104,105,101,110,10,116,115,99,104,101,99,104,115,99,104,47,101,110,10,116,115,99,104,101,116,115,99,104,101,101,110,115,99,104,47,101,110,10,116,115,99,104,117,119,97,115,99,104,47,101,110,10,84,115,111,110,103,97,10,84,115,119,97,110,97,10,84,117,110,101,115,105,101,110,10,84,117,114,107,109,101,110,105,115,116,97,110,10,116,117,114,107,109,101,101,110,115,99,104,47,101,110,10,84,117,118,97,108,117,10,85,103,97,110,100,97,10,117,105,103,104,117,117,114,115,99,104,47,101,110,10,85,107,114,97,105,110,101,10,117,107,114,97,105,110,115,99,104,47,101,110,10,85,110,103,97,114,110,10,117,110,103,97,97,114,115,99,104,47,101,110,10,85,114,100,117,10,85,114,117,103,117,97,121,10,85,83,10,85,83,65,10,85,115,98,101,107,105,115,116,97,110,10,117,115,98,101,101,107,115,99,104,47,101,110,10,86,97,110,117,97,116,117,10,86,101,110,100,97,10,86,101,110,101,122,117,101,108,97,10,86,101,114,101,101,110,105,103,116,101,10,65,114,97,97,98,115,99,104,101,10,69,109,105,114,97,116,101,110,10,86,105,101,116,110,97,109,10,118,105,101,116,110,97,109,101,101,115,99,104,47,101,110,10,86,111,108,97,112,195,188,107,10,87,97,108,101,115,10,119,97,108,105,101,115,115,99,104,47,101,110,10,119,97,108,108,111,111,110,115,99,104,47,101,110,10,87,105,116,116,114,117,115,115,108,97,110,100,10,87,111,108,111,102,10,88,104,111,115,97,10,89,111,114,117,98,97,10,90,97,105,114,101,10,90,101,110,116,114,97,97,108,97,102,114,105,107,97,97,110,115,99,104,101,10,82,101,112,117,98,108,105,107,10,90,104,117,97,110,103,10,90,117,108,117,10,90,121,112,101,114,110,10,65,100,111,98,101,10,65,83,67,73,73,10,65,83,112,101,108,108,10,66,97,115,104,10,98,97,115,104,114,99,10,66,101,79,83,10,66,105,116,109,97,112,10,66,77,80,10,66,83,68,10,66,84,83,10,66,90,105,112,10,67,83,83,10,67,85,80,83,10,68,67,79,80,10,68,101,98,105,97,110,10,68,78,83,10,68,86,73,10,69,109,97,99,115,10,70,111,111,109,97,116,105,99,10,70,114,101,101,66,83,68,10,70,84,80,10,71,104,111,115,116,115,99,114,105,112,116,10,71,104,111,115,116,86,105,101,119,10,71,73,70,10,71,78,79,77,69,10,71,78,85,10,71,84,75,10,71,90,105,112,10,72,84,77,76,10,72,84,84,80,10,73,67,81,10,73,66,77,10,73,77,65,80,10,73,79,10,73,80,10,73,82,67,10,73,83,112,101,108,108,10,74,97,118,97,83,99,114,105,112,116,10,74,80,69,71,10,75,97,116,101,10,75,68,69,10,75,68,69,68,10,75,68,101,115,107,116,111,112,10,75,68,105,115,107,101,116,116,10,75,72,84,77,76,10,75,105,99,107,101,114,10,75,77,97,104,106,111,110,103,103,10,75,77,97,105,108,10,75,78,111,100,101,10,75,78,111,116,101,115,10,75,111,110,113,117,101,114,111,114,10,75,79,114,103,97,110,105,122,101,114,10,75,80,97,114,116,115,10,75,80,105,108,111,116,10,75,83,112,108,97,115,104,10,75,84,117,120,10,75,87,101,97,116,104,101,114,10,75,87,105,110,10,75,87,114,105,116,101,100,10,75,78,111,116,105,102,121,10,75,111,110,115,111,108,101,10,75,111,110,116,97,99,116,10,75,83,112,101,108,108,10,75,87,114,105,116,101,10,76,97,84,101,88,10,76,105,110,117,120,10,76,80,68,10,76,80,82,10,77,66,111,120,10,77,67,10,77,73,68,73,10,77,73,77,69,10,77,111,122,105,108,108,97,10,77,80,69,71,10,78,101,116,115,99,97,112,101,10,79,112,101,110,71,76,10,79,112,101,110,79,102,102,105,99,101,10,79,112,101,110,80,71,80,10,79,83,10,80,68,70,10,80,101,114,108,10,80,71,80,10,80,72,80,10,112,110,103,10,80,79,80,10,80,111,115,116,83,99,114,105,112,116,10,80,80,67,10,80,121,116,104,111,110,10,81,116,10,82,80,77,10,82,83,72,10,114,115,104,10,82,84,70,10,83,97,109,98,97,10,83,71,77,76,10,83,111,108,97,114,105,115,10,83,81,76,10,83,83,72,10,115,115,104,10,83,83,76,10,83,116,97,114,79,102,102,105,99,101,10,83,86,71,10,84,101,88,10,84,73,70,70,10,84,114,117,101,84,121,112,101,10,85,78,73,88,10,85,110,105,120,10,85,84,70,10,86,73,77,10,87,65,86,10,87,105,110,100,111,119,115,10,87,77,76,10,87,87,87,10,119,119,119,10,88,70,114,101,101,10,88,72,84,77,76,10,88,77,76,10,88,84,101,114,109,10,90,105,112,10,90,77,111,100,101,109,10,76,117,102,116,104,97,110,115,97,10,77,105,99,114,111,115,111,102,116,10,65,112,112,108,101,10,73,66,77,10,67,68,85,10,67,83,85,10,83,80,68,10,70,68,80,10,76,105,110,107,115,112,97,114,116,101,105,10])
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4).Buffer))

/***/ })
/******/ ]);
});