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

/* WEBPACK VAR INJECTION */(function(Buffer) {module.exports = new Buffer([83,69,84,32,85,84,70,45,56,10,84,82,89,32,110,97,111,104,105,117,103,116,99,101,100,109,121,108,114,98,118,115,107,112,120,113,102,106,119,122,78,65,79,72,73,85,71,84,67,69,68,77,89,76,82,66,86,83,75,80,88,81,70,74,87,90,45,10,10,77,65,80,32,52,48,10,77,65,80,32,225,186,163,195,163,10,77,65,80,32,225,186,169,225,186,171,10,77,65,80,32,225,186,179,225,186,181,10,77,65,80,32,225,186,187,225,186,189,10,77,65,80,32,225,187,131,225,187,133,10,77,65,80,32,225,187,137,196,169,10,77,65,80,32,225,187,143,195,181,10,77,65,80,32,225,187,149,225,187,151,10,77,65,80,32,225,187,159,225,187,161,10,77,65,80,32,225,187,167,197,169,10,77,65,80,32,225,187,173,225,187,175,10,77,65,80,32,225,187,183,225,187,185,10,77,65,80,32,40,105,195,170,117,41,40,105,117,41,40,198,176,117,41,10,77,65,80,32,40,105,225,186,191,117,41,40,195,173,117,41,40,225,187,169,117,41,10,77,65,80,32,40,105,225,187,129,117,41,40,195,172,117,41,40,225,187,171,117,41,10,77,65,80,32,40,105,225,187,131,117,41,40,225,187,137,117,41,40,225,187,173,117,41,10,77,65,80,32,40,105,225,187,133,117,41,40,196,169,117,41,40,225,187,175,117,41,10,77,65,80,32,40,105,225,187,135,117,41,40,225,187,139,117,41,40,225,187,177,117,41,10,77,65,80,32,40,225,187,139,99,41,40,225,187,139,99,104,41,10,77,65,80,32,40,195,173,99,41,40,195,173,99,104,41,10,77,65,80,32,97,195,160,225,186,163,195,163,195,161,225,186,161,10,77,65,80,32,196,131,225,186,177,225,186,179,225,186,181,225,186,175,225,186,183,10,77,65,80,32,195,162,225,186,167,225,186,169,225,186,171,225,186,165,225,186,173,10,77,65,80,32,101,195,168,225,186,187,225,186,189,195,169,225,186,185,10,77,65,80,32,195,170,225,187,129,225,187,131,225,187,133,225,186,191,225,187,135,10,77,65,80,32,105,195,172,225,187,137,196,169,195,173,225,187,139,10,77,65,80,32,111,195,178,225,187,143,195,181,195,179,225,187,141,10,77,65,80,32,195,180,225,187,147,225,187,149,225,187,151,225,187,145,225,187,153,10,77,65,80,32,198,161,225,187,157,225,187,159,225,187,161,225,187,155,225,187,163,10,77,65,80,32,117,195,185,225,187,167,197,169,195,186,225,187,165,10,77,65,80,32,198,176,225,187,171,225,187,173,225,187,175,225,187,169,225,187,177,10,77,65,80,32,121,225,187,179,225,187,183,225,187,185,195,189,225,187,181,10,77,65,80,32,97,195,160,225,186,163,195,163,195,161,225,186,161,196,131,225,186,177,225,186,179,225,186,181,225,186,175,225,186,183,195,162,225,186,167,225,186,169,225,186,171,225,186,165,225,186,173,10,77,65,80,32,101,195,168,225,186,187,225,186,189,195,169,225,186,185,195,170,225,187,129,225,187,131,225,187,133,225,186,191,225,187,135,10,77,65,80,32,111,195,178,225,187,143,195,181,195,179,225,187,141,195,180,225,187,147,225,187,149,225,187,151,225,187,145,225,187,153,198,161,225,187,157,225,187,159,225,187,161,225,187,155,225,187,163,10,77,65,80,32,117,195,185,225,187,167,197,169,195,186,225,187,165,198,176,225,187,171,225,187,173,225,187,175,225,187,169,225,187,177,10,77,65,80,32,195,179,195,178,225,187,143,97,195,160,195,161,225,186,163,10,77,65,80,32,195,179,195,179,225,187,143,101,195,168,195,169,225,186,187,10,77,65,80,32,195,186,195,185,225,187,167,225,187,165,121,195,189,225,187,179,225,187,183,225,187,181,10,77,65,80,32,117,198,176,111,225,187,157,225,187,155,225,187,161,225,187,159,225,187,163,10,10,82,69,80,32,50,48,10,82,69,80,32,100,122,32,100,10,82,69,80,32,99,104,32,116,114,10,82,69,80,32,100,32,196,145,10,82,69,80,32,196,145,32,100,10,82,69,80,32,100,32,103,105,10,82,69,80,32,102,32,112,104,10,82,69,80,32,103,32,103,104,10,82,69,80,32,103,104,32,103,10,82,69,80,32,103,105,32,100,10,82,69,80,32,106,32,103,10,82,69,80,32,110,103,32,110,103,104,10,82,69,80,32,110,103,104,32,110,103,10,82,69,80,32,111,117,32,117,111,10,82,69,80,32,111,117,32,198,176,198,161,10,82,69,80,32,117,111,32,198,176,198,161,10,82,69,80,32,115,32,120,10,82,69,80,32,116,114,32,99,104,10,82,69,80,32,120,32,115,10,82,69,80,32,119,32,113,117,10,82,69,80,32,122,32,100,10])
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

/* WEBPACK VAR INJECTION */(function(Buffer) {module.exports = new Buffer([54,54,51,49,10,65,66,67,10,65,83,67,73,73,10,71,73,70,10,72,67,77,10,72,75,10,72,84,77,76,10,72,196,144,78,68,10,74,80,69,71,10,76,72,81,10,78,103,117,121,225,187,133,110,10,78,225,186,181,110,103,10,80,68,70,10,80,78,71,10,80,104,97,110,10,82,65,77,10,84,67,86,78,10,84,86,10,84,101,108,101,120,10,84,112,10,85,66,78,68,10,85,82,76,10,85,110,105,99,111,100,101,10,86,73,81,82,10,86,73,83,67,73,73,10,86,78,10,86,78,73,10,97,10,97,105,10,97,109,10,97,110,10,97,110,103,10,97,110,104,10,97,111,10,97,117,10,98,97,10,98,97,105,10,98,97,110,10,98,97,110,103,10,98,97,110,104,10,98,97,111,10,98,97,115,111,105,10,98,97,121,10,98,101,10,98,101,109,10,98,101,110,10,98,101,110,103,10,98,101,111,10,98,105,10,98,105,97,10,98,105,110,10,98,105,110,104,10,98,105,195,170,110,10,98,105,195,170,110,103,10,98,105,225,186,191,99,10,98,105,225,186,191,109,10,98,105,225,186,191,110,10,98,105,225,186,191,110,103,10,98,105,225,186,191,116,10,98,105,225,186,191,117,10,98,105,225,187,129,110,10,98,105,225,187,131,110,10,98,105,225,187,131,117,10,98,105,225,187,135,110,10,98,105,225,187,135,116,10,98,111,10,98,111,109,10,98,111,110,10,98,111,110,103,10,98,111,111,110,103,10,98,111,195,179,110,103,10,98,117,10,98,117,97,10,98,117,110,103,10,98,117,195,180,110,10,98,117,195,180,110,103,10,98,117,195,189,116,10,98,117,225,187,145,116,10,98,117,225,187,147,105,10,98,117,225,187,147,109,10,98,117,225,187,147,110,10,98,117,225,187,147,110,103,10,98,117,225,187,149,105,10,98,117,225,187,153,99,10,98,117,225,187,153,116,10,98,195,160,10,98,195,160,105,10,98,195,160,109,10,98,195,160,110,10,98,195,160,110,103,10,98,195,160,110,104,10,98,195,160,111,10,98,195,160,117,10,98,195,160,121,10,98,195,161,10,98,195,161,99,10,98,195,161,99,104,10,98,195,161,105,10,98,195,161,109,10,98,195,161,110,10,98,195,161,110,103,10,98,195,161,110,104,10,98,195,161,111,10,98,195,161,116,10,98,195,161,117,10,98,195,162,110,10,98,195,162,110,103,10,98,195,162,117,10,98,195,162,121,10,98,195,163,10,98,195,163,105,10,98,195,163,111,10,98,195,168,10,98,195,168,109,10,98,195,168,110,10,98,195,168,111,10,98,195,169,10,98,195,169,99,10,98,195,169,110,10,98,195,169,110,103,10,98,195,169,111,10,98,195,169,112,10,98,195,169,116,10,98,195,170,10,98,195,170,110,10,98,195,170,110,104,10,98,195,170,117,10,98,195,172,10,98,195,172,97,10,98,195,172,109,10,98,195,172,110,104,10,98,195,172,117,10,98,195,173,10,98,195,173,99,104,10,98,195,173,109,10,98,195,173,110,104,10,98,195,173,116,10,98,195,173,117,10,98,195,178,10,98,195,178,105,10,98,195,178,109,10,98,195,178,110,10,98,195,178,110,103,10,98,195,179,10,98,195,179,99,10,98,195,179,105,10,98,195,179,110,10,98,195,179,110,103,10,98,195,179,112,10,98,195,179,116,10,98,195,180,10,98,195,180,105,10,98,195,180,109,10,98,195,180,110,10,98,195,180,110,103,10,98,195,181,10,98,195,181,109,10,98,195,181,110,103,10,98,195,185,10,98,195,185,97,10,98,195,185,105,10,98,195,185,109,10,98,195,185,110,10,98,195,185,110,103,10,98,195,186,10,98,195,186,97,10,98,195,186,105,10,98,195,186,110,10,98,195,186,110,103,10,98,195,186,112,10,98,195,186,116,10,98,196,131,109,10,98,196,131,110,10,98,196,131,110,103,10,98,196,169,10,98,196,169,110,104,10,98,196,169,117,10,98,197,169,109,10,98,198,161,10,98,198,161,105,10,98,198,161,109,10,98,198,161,110,10,98,198,176,10,98,198,176,97,10,98,198,176,110,103,10,98,198,176,117,10,98,198,176,198,161,105,10,98,198,176,198,161,109,10,98,198,176,198,161,110,10,98,198,176,198,161,110,103,10,98,198,176,198,161,117,10,98,198,176,225,187,155,99,10,98,198,176,225,187,155,109,10,98,198,176,225,187,155,110,103,10,98,198,176,225,187,155,112,10,98,198,176,225,187,155,117,10,98,198,176,225,187,159,105,10,98,198,176,225,187,163,116,10,98,225,186,161,10,98,225,186,161,99,10,98,225,186,161,99,104,10,98,225,186,161,105,10,98,225,186,161,110,10,98,225,186,161,110,104,10,98,225,186,161,111,10,98,225,186,161,112,10,98,225,186,161,116,10,98,225,186,161,117,10,98,225,186,163,10,98,225,186,163,105,10,98,225,186,163,110,10,98,225,186,163,110,103,10,98,225,186,163,110,104,10,98,225,186,163,111,10,98,225,186,163,117,10,98,225,186,163,121,10,98,225,186,165,99,10,98,225,186,165,109,10,98,225,186,165,110,10,98,225,186,165,112,10,98,225,186,165,116,10,98,225,186,165,117,10,98,225,186,165,121,10,98,225,186,167,109,10,98,225,186,167,110,10,98,225,186,167,110,103,10,98,225,186,167,117,10,98,225,186,167,121,10,98,225,186,169,109,10,98,225,186,169,110,10,98,225,186,169,121,10,98,225,186,171,109,10,98,225,186,171,121,10,98,225,186,173,99,10,98,225,186,173,109,10,98,225,186,173,110,10,98,225,186,173,112,10,98,225,186,173,116,10,98,225,186,173,117,10,98,225,186,173,121,10,98,225,186,175,99,10,98,225,186,175,110,10,98,225,186,175,110,103,10,98,225,186,175,112,10,98,225,186,175,116,10,98,225,186,177,109,10,98,225,186,177,110,10,98,225,186,177,110,103,10,98,225,186,179,110,10,98,225,186,181,110,103,10,98,225,186,183,109,10,98,225,186,183,110,10,98,225,186,183,110,103,10,98,225,186,183,112,10,98,225,186,183,116,10,98,225,186,185,10,98,225,186,185,110,10,98,225,186,185,111,10,98,225,186,185,112,10,98,225,186,185,116,10,98,225,186,187,10,98,225,186,187,109,10,98,225,186,187,111,10,98,225,186,189,10,98,225,186,189,110,10,98,225,186,189,111,10,98,225,186,191,10,98,225,186,191,110,10,98,225,186,191,112,10,98,225,186,191,116,10,98,225,187,129,10,98,225,187,129,110,10,98,225,187,129,110,104,10,98,225,187,129,117,10,98,225,187,131,10,98,225,187,133,10,98,225,187,135,10,98,225,187,135,99,104,10,98,225,187,135,110,10,98,225,187,135,110,104,10,98,225,187,135,116,10,98,225,187,135,117,10,98,225,187,137,10,98,225,187,137,109,10,98,225,187,137,110,104,10,98,225,187,137,117,10,98,225,187,139,10,98,225,187,139,97,10,98,225,187,139,99,104,10,98,225,187,139,110,10,98,225,187,139,110,104,10,98,225,187,139,112,10,98,225,187,139,116,10,98,225,187,139,117,10,98,225,187,141,10,98,225,187,141,99,10,98,225,187,141,110,10,98,225,187,141,110,103,10,98,225,187,141,112,10,98,225,187,141,116,10,98,225,187,143,10,98,225,187,143,105,10,98,225,187,143,109,10,98,225,187,143,110,103,10,98,225,187,145,10,98,225,187,145,99,10,98,225,187,145,105,10,98,225,187,145,110,10,98,225,187,145,110,103,10,98,225,187,145,112,10,98,225,187,145,116,10,98,225,187,147,10,98,225,187,147,105,10,98,225,187,147,109,10,98,225,187,147,110,10,98,225,187,147,110,103,10,98,225,187,149,10,98,225,187,149,105,10,98,225,187,149,110,10,98,225,187,149,110,103,10,98,225,187,151,10,98,225,187,151,110,103,10,98,225,187,153,10,98,225,187,153,99,10,98,225,187,153,105,10,98,225,187,153,110,10,98,225,187,153,110,103,10,98,225,187,153,112,10,98,225,187,153,116,10,98,225,187,155,10,98,225,187,155,105,10,98,225,187,155,112,10,98,225,187,155,116,10,98,225,187,157,10,98,225,187,157,105,10,98,225,187,157,109,10,98,225,187,157,110,10,98,225,187,159,10,98,225,187,159,105,10,98,225,187,161,10,98,225,187,161,110,10,98,225,187,163,10,98,225,187,163,109,10,98,225,187,163,110,10,98,225,187,163,112,10,98,225,187,163,116,10,98,225,187,165,10,98,225,187,165,97,10,98,225,187,165,99,10,98,225,187,165,105,10,98,225,187,165,109,10,98,225,187,165,110,103,10,98,225,187,165,112,10,98,225,187,165,116,10,98,225,187,167,10,98,225,187,167,97,10,98,225,187,167,109,10,98,225,187,167,110,10,98,225,187,167,110,103,10,98,225,187,169,10,98,225,187,169,99,10,98,225,187,169,110,103,10,98,225,187,169,116,10,98,225,187,171,97,10,98,225,187,171,110,103,10,98,225,187,173,97,10,98,225,187,173,110,103,10,98,225,187,173,117,10,98,225,187,175,97,10,98,225,187,177,10,98,225,187,177,97,10,98,225,187,177,99,10,98,225,187,177,116,10,99,97,10,99,97,105,10,99,97,109,10,99,97,110,10,99,97,110,104,10,99,97,111,10,99,97,117,10,99,97,121,10,99,104,97,10,99,104,97,105,10,99,104,97,110,10,99,104,97,110,103,10,99,104,97,110,104,10,99,104,97,111,10,99,104,97,117,10,99,104,97,121,10,99,104,101,10,99,104,101,109,10,99,104,101,110,10,99,104,101,110,103,10,99,104,101,111,10,99,104,105,10,99,104,105,97,10,99,104,105,109,10,99,104,105,110,104,10,99,104,105,117,10,99,104,105,195,170,109,10,99,104,105,195,170,110,10,99,104,105,195,170,110,103,10,99,104,105,195,170,117,10,99,104,105,225,186,191,99,10,99,104,105,225,186,191,109,10,99,104,105,225,186,191,110,10,99,104,105,225,186,191,110,103,10,99,104,105,225,186,191,112,10,99,104,105,225,186,191,116,10,99,104,105,225,186,191,117,10,99,104,105,225,187,129,110,10,99,104,105,225,187,129,110,103,10,99,104,105,225,187,129,117,10,99,104,105,225,187,131,117,10,99,104,105,225,187,135,110,10,99,104,111,10,99,104,111,97,110,103,10,99,104,111,105,10,99,104,111,110,103,10,99,104,111,195,160,105,10,99,104,111,195,160,110,103,10,99,104,111,195,161,10,99,104,111,195,161,105,10,99,104,111,195,161,110,10,99,104,111,195,161,110,103,10,99,104,111,195,163,105,10,99,104,111,195,168,110,10,99,104,111,195,169,10,99,104,111,195,178,110,103,10,99,104,111,196,131,110,10,99,104,111,225,186,161,99,10,99,104,111,225,186,161,110,103,10,99,104,111,225,186,161,112,10,99,104,111,225,186,163,110,103,10,99,104,111,225,186,175,116,10,99,104,111,225,186,185,10,99,104,111,225,186,185,116,10,99,104,117,10,99,104,117,97,10,99,104,117,105,10,99,104,117,109,10,99,104,117,110,10,99,104,117,110,103,10,99,104,117,121,195,170,110,10,99,104,117,121,225,186,191,110,10,99,104,117,121,225,187,129,110,10,99,104,117,121,225,187,131,110,10,99,104,117,121,225,187,135,110,10,99,104,117,195,180,105,10,99,104,117,195,180,109,10,99,104,117,195,180,110,103,10,99,104,117,225,186,169,110,10,99,104,117,225,186,191,99,104,10,99,104,117,225,187,135,99,104,10,99,104,117,225,187,145,99,10,99,104,117,225,187,145,105,10,99,104,117,225,187,145,116,10,99,104,117,225,187,147,105,10,99,104,117,225,187,147,110,10,99,104,117,225,187,147,110,103,10,99,104,117,225,187,151,105,10,99,104,117,225,187,153,99,10,99,104,117,225,187,153,105,10,99,104,117,225,187,153,110,103,10,99,104,117,225,187,153,116,10,99,104,117,225,187,179,10,99,104,195,160,10,99,104,195,160,105,10,99,104,195,160,109,10,99,104,195,160,110,103,10,99,104,195,160,110,104,10,99,104,195,160,111,10,99,104,195,160,121,10,99,104,195,161,10,99,104,195,161,99,10,99,104,195,161,105,10,99,104,195,161,110,10,99,104,195,161,110,103,10,99,104,195,161,110,104,10,99,104,195,161,111,10,99,104,195,161,116,10,99,104,195,161,117,10,99,104,195,161,121,10,99,104,195,162,109,10,99,104,195,162,110,10,99,104,195,162,117,10,99,104,195,162,121,10,99,104,195,163,10,99,104,195,163,105,10,99,104,195,163,111,10,99,104,195,168,10,99,104,195,168,110,10,99,104,195,168,111,10,99,104,195,169,10,99,104,195,169,109,10,99,104,195,169,110,10,99,104,195,169,111,10,99,104,195,169,112,10,99,104,195,169,116,10,99,104,195,170,10,99,104,195,170,109,10,99,104,195,170,110,104,10,99,104,195,172,10,99,104,195,172,97,10,99,104,195,172,109,10,99,104,195,172,110,104,10,99,104,195,172,117,10,99,104,195,173,10,99,104,195,173,99,104,10,99,104,195,173,109,10,99,104,195,173,110,10,99,104,195,173,110,104,10,99,104,195,173,112,10,99,104,195,173,116,10,99,104,195,173,117,10,99,104,195,178,10,99,104,195,178,105,10,99,104,195,178,109,10,99,104,195,178,110,103,10,99,104,195,179,10,99,104,195,179,99,10,99,104,195,179,105,10,99,104,195,179,110,103,10,99,104,195,179,112,10,99,104,195,179,116,10,99,104,195,180,109,10,99,104,195,180,110,10,99,104,195,180,110,103,10,99,104,195,181,10,99,104,195,181,109,10,99,104,195,181,110,103,10,99,104,195,185,10,99,104,195,185,97,10,99,104,195,185,105,10,99,104,195,185,109,10,99,104,195,185,110,10,99,104,195,185,110,103,10,99,104,195,186,10,99,104,195,186,97,10,99,104,195,186,99,10,99,104,195,186,105,10,99,104,195,186,109,10,99,104,195,186,110,103,10,99,104,195,186,116,10,99,104,196,131,109,10,99,104,196,131,110,10,99,104,196,131,110,103,10,99,104,196,169,97,10,99,104,196,169,110,10,99,104,196,169,110,104,10,99,104,197,169,105,10,99,104,197,169,109,10,99,104,197,169,110,10,99,104,198,161,10,99,104,198,161,105,10,99,104,198,161,109,10,99,104,198,161,110,10,99,104,198,176,10,99,104,198,176,97,10,99,104,198,176,110,10,99,104,198,176,110,103,10,99,104,198,176,198,161,110,103,10,99,104,198,176,225,187,155,99,10,99,104,198,176,225,187,155,110,103,10,99,104,198,176,225,187,157,109,10,99,104,198,176,225,187,157,110,103,10,99,104,198,176,225,187,159,105,10,99,104,198,176,225,187,159,110,103,10,99,104,198,176,225,187,161,110,103,10,99,104,198,176,225,187,163,99,10,99,104,198,176,225,187,163,112,10,99,104,225,186,161,10,99,104,225,186,161,99,10,99,104,225,186,161,99,104,10,99,104,225,186,161,109,10,99,104,225,186,161,110,10,99,104,225,186,161,110,103,10,99,104,225,186,161,110,104,10,99,104,225,186,161,111,10,99,104,225,186,161,112,10,99,104,225,186,161,116,10,99,104,225,186,161,121,10,99,104,225,186,163,10,99,104,225,186,163,105,10,99,104,225,186,163,110,104,10,99,104,225,186,163,111,10,99,104,225,186,163,117,10,99,104,225,186,163,121,10,99,104,225,186,165,109,10,99,104,225,186,165,110,10,99,104,225,186,165,112,10,99,104,225,186,165,116,10,99,104,225,186,165,117,10,99,104,225,186,165,121,10,99,104,225,186,167,109,10,99,104,225,186,167,110,10,99,104,225,186,167,117,10,99,104,225,186,167,121,10,99,104,225,186,169,109,10,99,104,225,186,169,110,10,99,104,225,186,171,117,10,99,104,225,186,173,99,10,99,104,225,186,173,109,10,99,104,225,186,173,110,10,99,104,225,186,173,112,10,99,104,225,186,173,116,10,99,104,225,186,173,117,10,99,104,225,186,175,99,10,99,104,225,186,175,109,10,99,104,225,186,175,110,10,99,104,225,186,175,112,10,99,104,225,186,175,116,10,99,104,225,186,177,109,10,99,104,225,186,177,110,10,99,104,225,186,177,110,103,10,99,104,225,186,179,110,103,10,99,104,225,186,181,110,10,99,104,225,186,183,99,10,99,104,225,186,183,109,10,99,104,225,186,183,110,10,99,104,225,186,183,110,103,10,99,104,225,186,183,112,10,99,104,225,186,183,116,10,99,104,225,186,185,110,10,99,104,225,186,185,111,10,99,104,225,186,185,112,10,99,104,225,186,185,116,10,99,104,225,186,187,10,99,104,225,186,187,109,10,99,104,225,186,187,110,10,99,104,225,186,187,111,10,99,104,225,186,189,10,99,104,225,186,189,110,10,99,104,225,186,191,10,99,104,225,186,191,99,104,10,99,104,225,186,191,110,104,10,99,104,225,186,191,116,10,99,104,225,187,129,10,99,104,225,187,129,109,10,99,104,225,187,129,110,104,10,99,104,225,187,131,110,104,10,99,104,225,187,133,109,10,99,104,225,187,133,110,104,10,99,104,225,187,135,10,99,104,225,187,135,99,104,10,99,104,225,187,135,110,10,99,104,225,187,135,110,104,10,99,104,225,187,137,10,99,104,225,187,137,110,10,99,104,225,187,137,110,104,10,99,104,225,187,139,10,99,104,225,187,139,97,10,99,104,225,187,139,116,10,99,104,225,187,139,117,10,99,104,225,187,141,10,99,104,225,187,141,99,10,99,104,225,187,141,105,10,99,104,225,187,141,110,10,99,104,225,187,141,116,10,99,104,225,187,143,10,99,104,225,187,143,109,10,99,104,225,187,143,110,10,99,104,225,187,143,110,103,10,99,104,225,187,145,99,10,99,104,225,187,145,105,10,99,104,225,187,145,110,10,99,104,225,187,145,110,103,10,99,104,225,187,145,112,10,99,104,225,187,145,116,10,99,104,225,187,147,10,99,104,225,187,147,105,10,99,104,225,187,147,109,10,99,104,225,187,147,110,10,99,104,225,187,147,110,103,10,99,104,225,187,149,105,10,99,104,225,187,149,110,103,10,99,104,225,187,151,10,99,104,225,187,151,109,10,99,104,225,187,153,10,99,104,225,187,153,105,10,99,104,225,187,153,110,10,99,104,225,187,153,112,10,99,104,225,187,153,116,10,99,104,225,187,155,10,99,104,225,187,155,105,10,99,104,225,187,155,109,10,99,104,225,187,155,112,10,99,104,225,187,155,116,10,99,104,225,187,157,10,99,104,225,187,157,109,10,99,104,225,187,157,110,10,99,104,225,187,159,10,99,104,225,187,159,109,10,99,104,225,187,163,10,99,104,225,187,163,110,10,99,104,225,187,163,112,10,99,104,225,187,163,116,10,99,104,225,187,165,99,10,99,104,225,187,165,109,10,99,104,225,187,165,112,10,99,104,225,187,165,116,10,99,104,225,187,167,10,99,104,225,187,167,110,10,99,104,225,187,167,110,103,10,99,104,225,187,169,10,99,104,225,187,169,97,10,99,104,225,187,169,99,10,99,104,225,187,169,110,103,10,99,104,225,187,171,10,99,104,225,187,171,97,10,99,104,225,187,171,110,103,10,99,104,225,187,173,97,10,99,104,225,187,173,105,10,99,104,225,187,173,110,103,10,99,104,225,187,175,10,99,104,225,187,175,97,10,99,104,225,187,175,110,103,10,99,104,225,187,177,99,10,99,111,10,99,111,105,10,99,111,109,10,99,111,110,10,99,111,110,103,10,99,111,111,110,103,10,99,111,195,179,99,10,99,117,10,99,117,97,10,99,117,105,10,99,117,109,10,99,117,110,10,99,117,110,103,10,99,117,225,187,145,99,10,99,117,225,187,145,105,10,99,117,225,187,145,110,10,99,117,225,187,145,110,103,10,99,117,225,187,147,110,10,99,117,225,187,147,110,103,10,99,117,225,187,151,109,10,99,117,225,187,153,99,10,99,117,225,187,153,105,10,99,117,225,187,153,110,10,99,117,225,187,153,110,103,10,99,195,160,10,99,195,160,105,10,99,195,160,110,10,99,195,160,110,103,10,99,195,160,110,104,10,99,195,160,111,10,99,195,160,117,10,99,195,160,121,10,99,195,161,10,99,195,161,99,10,99,195,161,99,104,10,99,195,161,105,10,99,195,161,109,10,99,195,161,110,10,99,195,161,110,103,10,99,195,161,110,104,10,99,195,161,111,10,99,195,161,112,10,99,195,161,116,10,99,195,161,117,10,99,195,161,121,10,99,195,162,109,10,99,195,162,110,10,99,195,162,110,103,10,99,195,162,117,10,99,195,162,121,10,99,195,163,105,10,99,195,178,10,99,195,178,105,10,99,195,178,109,10,99,195,178,110,10,99,195,178,110,103,10,99,195,179,10,99,195,179,99,10,99,195,179,105,10,99,195,179,110,103,10,99,195,179,112,10,99,195,179,116,10,99,195,180,10,99,195,180,105,10,99,195,180,109,10,99,195,180,110,10,99,195,180,110,103,10,99,195,181,105,10,99,195,181,110,103,10,99,195,185,10,99,195,185,105,10,99,195,185,109,10,99,195,185,110,10,99,195,185,110,103,10,99,195,186,10,99,195,186,97,10,99,195,186,99,10,99,195,186,105,10,99,195,186,109,10,99,195,186,110,103,10,99,195,186,112,10,99,195,186,116,10,99,196,131,109,10,99,196,131,110,10,99,196,131,110,103,10,99,197,169,10,99,197,169,105,10,99,197,169,110,10,99,197,169,110,103,10,99,198,161,10,99,198,161,105,10,99,198,161,109,10,99,198,161,110,10,99,198,176,10,99,198,176,97,10,99,198,176,110,103,10,99,198,176,117,10,99,198,176,198,161,110,103,10,99,198,176,225,187,155,99,10,99,198,176,225,187,155,105,10,99,198,176,225,187,155,112,10,99,198,176,225,187,157,105,10,99,198,176,225,187,157,109,10,99,198,176,225,187,157,110,103,10,99,198,176,225,187,161,105,10,99,198,176,225,187,161,110,103,10,99,225,186,161,10,99,225,186,161,99,10,99,225,186,161,99,104,10,99,225,186,161,109,10,99,225,186,161,110,10,99,225,186,161,110,104,10,99,225,186,161,111,10,99,225,186,161,112,10,99,225,186,161,117,10,99,225,186,161,121,10,99,225,186,163,10,99,225,186,163,105,10,99,225,186,163,109,10,99,225,186,163,110,10,99,225,186,163,110,103,10,99,225,186,163,110,104,10,99,225,186,163,111,10,99,225,186,163,117,10,99,225,186,163,121,10,99,225,186,165,99,10,99,225,186,165,109,10,99,225,186,165,110,10,99,225,186,165,112,10,99,225,186,165,116,10,99,225,186,165,117,10,99,225,186,165,121,10,99,225,186,167,109,10,99,225,186,167,110,10,99,225,186,167,117,10,99,225,186,167,121,10,99,225,186,169,109,10,99,225,186,169,110,10,99,225,186,169,117,10,99,225,186,169,121,10,99,225,186,171,109,10,99,225,186,171,110,10,99,225,186,171,110,103,10,99,225,186,173,110,10,99,225,186,173,112,10,99,225,186,173,116,10,99,225,186,173,117,10,99,225,186,173,121,10,99,225,186,175,99,10,99,225,186,175,109,10,99,225,186,175,110,10,99,225,186,175,112,10,99,225,186,175,116,10,99,225,186,177,109,10,99,225,186,177,110,10,99,225,186,179,110,10,99,225,186,179,110,103,10,99,225,186,181,110,103,10,99,225,186,183,99,10,99,225,186,183,109,10,99,225,186,183,110,10,99,225,186,183,112,10,99,225,186,183,116,10,99,225,187,141,10,99,225,187,141,99,10,99,225,187,141,109,10,99,225,187,141,110,10,99,225,187,141,110,103,10,99,225,187,141,112,10,99,225,187,141,116,10,99,225,187,143,10,99,225,187,143,105,10,99,225,187,143,109,10,99,225,187,143,110,10,99,225,187,143,110,103,10,99,225,187,145,10,99,225,187,145,99,10,99,225,187,145,105,10,99,225,187,145,109,10,99,225,187,145,110,10,99,225,187,145,110,103,10,99,225,187,145,112,10,99,225,187,145,116,10,99,225,187,147,10,99,225,187,147,109,10,99,225,187,147,110,10,99,225,187,147,110,103,10,99,225,187,149,10,99,225,187,149,105,10,99,225,187,149,110,10,99,225,187,149,110,103,10,99,225,187,151,10,99,225,187,151,105,10,99,225,187,153,10,99,225,187,153,99,10,99,225,187,153,105,10,99,225,187,153,109,10,99,225,187,153,110,10,99,225,187,153,110,103,10,99,225,187,153,112,10,99,225,187,153,116,10,99,225,187,155,10,99,225,187,155,109,10,99,225,187,155,110,10,99,225,187,155,116,10,99,225,187,157,10,99,225,187,157,105,10,99,225,187,157,110,10,99,225,187,159,105,10,99,225,187,161,10,99,225,187,161,105,10,99,225,187,161,109,10,99,225,187,161,110,10,99,225,187,163,110,10,99,225,187,163,116,10,99,225,187,165,10,99,225,187,165,99,10,99,225,187,165,105,10,99,225,187,165,109,10,99,225,187,165,110,103,10,99,225,187,165,112,10,99,225,187,165,116,10,99,225,187,167,10,99,225,187,167,97,10,99,225,187,167,105,10,99,225,187,167,110,10,99,225,187,167,110,103,10,99,225,187,169,10,99,225,187,169,97,10,99,225,187,169,99,10,99,225,187,169,110,103,10,99,225,187,169,116,10,99,225,187,169,117,10,99,225,187,171,10,99,225,187,171,117,10,99,225,187,173,10,99,225,187,173,97,10,99,225,187,173,105,10,99,225,187,173,110,103,10,99,225,187,173,117,10,99,225,187,175,10,99,225,187,175,117,10,99,225,187,177,10,99,225,187,177,97,10,99,225,187,177,99,10,99,225,187,177,117,10,100,97,10,100,97,105,10,100,97,109,10,100,97,110,10,100,97,110,103,10,100,97,110,104,10,100,97,111,10,100,97,121,10,100,101,10,100,101,111,10,100,105,10,100,105,109,10,100,105,110,104,10,100,105,195,170,109,10,100,105,195,170,110,10,100,105,195,170,117,10,100,105,225,186,191,99,10,100,105,225,186,191,112,10,100,105,225,186,191,116,10,100,105,225,186,191,117,10,100,105,225,187,129,109,10,100,105,225,187,129,117,10,100,105,225,187,133,109,10,100,105,225,187,133,110,10,100,105,225,187,133,117,10,100,105,225,187,135,99,10,100,105,225,187,135,110,10,100,105,225,187,135,112,10,100,105,225,187,135,116,10,100,105,225,187,135,117,10,100,111,10,100,111,97,10,100,111,97,110,10,100,111,97,110,104,10,100,111,105,10,100,111,109,10,100,111,110,10,100,111,110,103,10,100,111,195,160,110,104,10,100,111,195,161,10,100,111,195,163,105,10,100,111,195,163,110,10,100,111,195,163,110,103,10,100,111,225,186,161,10,100,117,10,100,117,97,10,100,117,110,10,100,117,110,103,10,100,117,121,10,100,117,121,195,170,110,10,100,117,121,225,187,135,116,10,100,117,225,187,129,110,104,10,100,117,225,187,145,99,10,100,117,225,187,151,105,10,100,195,160,10,100,195,160,105,10,100,195,160,110,10,100,195,160,110,103,10,100,195,160,110,104,10,100,195,160,111,10,100,195,160,117,10,100,195,160,121,10,100,195,161,10,100,195,161,99,10,100,195,161,105,10,100,195,161,109,10,100,195,161,110,10,100,195,161,110,103,10,100,195,161,116,10,100,195,161,121,10,100,195,162,109,10,100,195,162,110,10,100,195,162,110,103,10,100,195,162,117,10,100,195,162,121,10,100,195,163,10,100,195,163,105,10,100,195,163,121,10,100,195,168,10,100,195,168,110,10,100,195,169,10,100,195,169,112,10,100,195,170,10,100,195,170,110,104,10,100,195,172,10,100,195,172,97,10,100,195,172,109,10,100,195,172,117,10,100,195,173,10,100,195,173,99,104,10,100,195,173,109,10,100,195,173,110,104,10,100,195,173,112,10,100,195,173,117,10,100,195,178,10,100,195,178,105,10,100,195,178,109,10,100,195,178,110,103,10,100,195,179,10,100,195,179,99,10,100,195,179,109,10,100,195,179,110,10,100,195,179,116,10,100,195,180,10,100,195,180,105,10,100,195,180,110,103,10,100,195,181,105,10,100,195,181,110,103,10,100,195,185,10,100,195,185,97,10,100,195,185,105,10,100,195,185,110,10,100,195,185,110,103,10,100,195,186,97,10,100,195,186,105,10,100,195,186,109,10,100,195,186,110,10,100,195,186,110,103,10,100,195,186,116,10,100,196,131,109,10,100,196,131,110,10,100,196,131,110,103,10,100,196,169,10,100,196,169,97,10,100,196,169,110,104,10,100,197,169,10,100,197,169,105,10,100,197,169,110,103,10,100,198,161,10,100,198,161,105,10,100,198,176,10,100,198,176,97,10,100,198,176,110,103,10,100,198,176,198,161,110,103,10,100,198,176,225,187,155,105,10,100,198,176,225,187,155,110,103,10,100,198,176,225,187,157,110,103,10,100,198,176,225,187,161,110,103,10,100,198,176,225,187,163,99,10,100,198,176,225,187,163,110,103,10,100,198,176,225,187,163,116,10,100,225,186,161,10,100,225,186,161,99,10,100,225,186,161,105,10,100,225,186,161,109,10,100,225,186,161,110,10,100,225,186,161,110,103,10,100,225,186,161,111,10,100,225,186,161,116,10,100,225,186,161,121,10,100,225,186,163,10,100,225,186,163,105,10,100,225,186,163,121,10,100,225,186,165,109,10,100,225,186,165,110,10,100,225,186,165,112,10,100,225,186,165,117,10,100,225,186,165,121,10,100,225,186,167,109,10,100,225,186,167,110,10,100,225,186,167,117,10,100,225,186,169,110,10,100,225,186,171,109,10,100,225,186,171,110,10,100,225,186,171,117,10,100,225,186,171,121,10,100,225,186,173,109,10,100,225,186,173,110,10,100,225,186,173,112,10,100,225,186,173,116,10,100,225,186,173,117,10,100,225,186,173,121,10,100,225,186,175,110,103,10,100,225,186,175,116,10,100,225,186,177,109,10,100,225,186,177,110,10,100,225,186,177,110,103,10,100,225,186,179,110,103,10,100,225,186,183,99,10,100,225,186,183,109,10,100,225,186,183,110,10,100,225,186,183,110,103,10,100,225,186,183,116,10,100,225,186,185,112,10,100,225,186,185,116,10,100,225,186,187,10,100,225,186,187,111,10,100,225,186,189,10,100,225,186,191,10,100,225,187,129,10,100,225,187,129,110,104,10,100,225,187,131,10,100,225,187,133,10,100,225,187,135,110,10,100,225,187,135,116,10,100,225,187,139,10,100,225,187,139,99,104,10,100,225,187,139,112,10,100,225,187,139,116,10,100,225,187,139,117,10,100,225,187,141,99,10,100,225,187,141,105,10,100,225,187,141,110,10,100,225,187,141,110,103,10,100,225,187,141,112,10,100,225,187,143,10,100,225,187,143,109,10,100,225,187,143,110,103,10,100,225,187,145,99,10,100,225,187,145,105,10,100,225,187,145,116,10,100,225,187,147,105,10,100,225,187,147,110,10,100,225,187,151,10,100,225,187,151,105,10,100,225,187,153,105,10,100,225,187,153,110,103,10,100,225,187,153,116,10,100,225,187,155,10,100,225,187,155,112,10,100,225,187,157,10,100,225,187,157,105,10,100,225,187,159,10,100,225,187,159,109,10,100,225,187,161,10,100,225,187,163,10,100,225,187,165,10,100,225,187,165,99,10,100,225,187,165,109,10,100,225,187,165,110,103,10,100,225,187,169,10,100,225,187,169,97,10,100,225,187,169,99,10,100,225,187,169,116,10,100,225,187,171,10,100,225,187,171,97,10,100,225,187,171,110,103,10,100,225,187,173,10,100,225,187,173,110,103,10,100,225,187,175,10,100,225,187,177,10,100,225,187,177,97,10,100,225,187,177,99,10,100,225,187,177,110,103,10,101,10,101,109,10,101,109,97,105,108,10,101,110,10,101,110,103,10,101,111,10,103,97,10,103,97,105,10,103,97,109,10,103,97,110,10,103,97,110,103,10,103,97,110,104,10,103,97,111,10,103,97,117,10,103,97,121,10,103,101,110,10,103,104,101,10,103,104,101,110,10,103,104,105,10,103,104,105,109,10,103,104,105,225,186,191,99,10,103,104,105,225,187,129,110,10,103,104,195,168,10,103,104,195,168,110,10,103,104,195,169,10,103,104,195,169,109,10,103,104,195,169,112,10,103,104,195,169,116,10,103,104,195,170,10,103,104,195,172,10,103,104,195,172,109,10,103,104,225,186,185,10,103,104,225,186,185,110,10,103,104,225,186,185,111,10,103,104,225,186,187,10,103,104,225,186,189,10,103,104,225,186,191,10,103,104,225,186,191,99,104,10,103,104,225,187,129,10,103,104,225,187,129,110,104,10,103,104,225,187,131,110,104,10,103,104,225,187,135,116,10,103,105,10,103,105,97,10,103,105,97,105,10,103,105,97,109,10,103,105,97,110,10,103,105,97,110,103,10,103,105,97,110,104,10,103,105,97,111,10,103,105,101,111,10,103,105,111,10,103,105,111,105,10,103,105,111,110,10,103,105,111,110,103,10,103,105,112,10,103,105,117,10,103,105,117,97,10,103,105,117,110,10,103,105,117,225,187,153,99,10,103,105,195,160,10,103,105,195,160,110,10,103,105,195,160,110,103,10,103,105,195,160,110,104,10,103,105,195,160,111,10,103,105,195,160,117,10,103,105,195,160,121,10,103,105,195,161,10,103,105,195,161,99,10,103,105,195,161,109,10,103,105,195,161,110,10,103,105,195,161,110,103,10,103,105,195,161,111,10,103,105,195,161,112,10,103,105,195,161,116,10,103,105,195,162,109,10,103,105,195,162,117,10,103,105,195,162,121,10,103,105,195,163,10,103,105,195,163,105,10,103,105,195,163,110,10,103,105,195,163,121,10,103,105,195,168,109,10,103,105,195,169,10,103,105,195,169,111,10,103,105,195,170,10,103,105,195,170,110,103,10,103,105,195,178,10,103,105,195,178,105,10,103,105,195,178,110,10,103,105,195,179,10,103,105,195,179,99,10,103,105,195,179,105,10,103,105,195,179,110,10,103,105,195,179,110,103,10,103,105,195,180,10,103,105,195,180,110,10,103,105,195,180,110,103,10,103,105,195,185,105,10,103,105,195,185,109,10,103,105,195,186,10,103,105,195,186,105,10,103,105,195,186,112,10,103,105,196,131,109,10,103,105,196,131,110,103,10,103,105,197,169,10,103,105,197,169,97,10,103,105,198,161,10,103,105,198,176,198,161,110,103,10,103,105,198,176,225,187,155,110,103,10,103,105,198,176,225,187,157,110,103,10,103,105,198,176,225,187,163,110,103,10,103,105,225,186,161,10,103,105,225,186,161,105,10,103,105,225,186,161,110,103,10,103,105,225,186,161,116,10,103,105,225,186,163,10,103,105,225,186,163,105,10,103,105,225,186,163,109,10,103,105,225,186,163,110,10,103,105,225,186,163,110,103,10,103,105,225,186,163,110,104,10,103,105,225,186,163,111,10,103,105,225,186,163,117,10,103,105,225,186,165,99,10,103,105,225,186,165,109,10,103,105,225,186,165,112,10,103,105,225,186,165,117,10,103,105,225,186,165,121,10,103,105,225,186,167,109,10,103,105,225,186,167,110,10,103,105,225,186,167,117,10,103,105,225,186,167,121,10,103,105,225,186,171,109,10,103,105,225,186,171,121,10,103,105,225,186,173,109,10,103,105,225,186,173,110,10,103,105,225,186,173,112,10,103,105,225,186,173,116,10,103,105,225,186,173,117,10,103,105,225,186,175,110,10,103,105,225,186,175,116,10,103,105,225,186,177,109,10,103,105,225,186,177,110,10,103,105,225,186,177,110,103,10,103,105,225,186,183,99,10,103,105,225,186,183,109,10,103,105,225,186,183,110,10,103,105,225,186,183,116,10,103,105,225,186,185,111,10,103,105,225,186,185,112,10,103,105,225,186,187,10,103,105,225,186,191,99,10,103,105,225,186,191,109,10,103,105,225,186,191,110,103,10,103,105,225,186,191,116,10,103,105,225,187,129,10,103,105,225,187,129,110,10,103,105,225,187,129,110,103,10,103,105,225,187,133,117,10,103,105,225,187,141,10,103,105,225,187,141,99,10,103,105,225,187,141,105,10,103,105,225,187,141,110,103,10,103,105,225,187,141,116,10,103,105,225,187,143,10,103,105,225,187,143,105,10,103,105,225,187,143,110,10,103,105,225,187,143,110,103,10,103,105,225,187,145,105,10,103,105,225,187,145,110,103,10,103,105,225,187,145,116,10,103,105,225,187,147,10,103,105,225,187,147,105,10,103,105,225,187,147,110,103,10,103,105,225,187,149,105,10,103,105,225,187,151,10,103,105,225,187,153,10,103,105,225,187,153,105,10,103,105,225,187,153,112,10,103,105,225,187,155,105,10,103,105,225,187,157,10,103,105,225,187,157,105,10,103,105,225,187,157,110,10,103,105,225,187,159,10,103,105,225,187,161,110,10,103,105,225,187,165,97,10,103,105,225,187,165,99,10,103,105,225,187,165,105,10,103,105,225,187,167,105,10,103,105,225,187,171,10,103,105,225,187,175,10,103,105,225,187,175,97,10,103,105,225,187,177,116,10,103,111,10,103,111,109,10,103,111,110,10,103,111,195,161,10,103,111,195,178,110,103,10,103,114,97,109,10,103,117,10,103,117,225,187,145,99,10,103,117,225,187,147,105,10,103,117,225,187,147,110,103,10,103,117,225,187,153,99,10,103,195,160,10,103,195,160,105,10,103,195,160,110,10,103,195,160,110,103,10,103,195,160,110,104,10,103,195,160,111,10,103,195,160,117,10,103,195,161,10,103,195,161,99,10,103,195,161,105,10,103,195,161,110,10,103,195,161,110,104,10,103,195,161,111,10,103,195,161,112,10,103,195,161,117,10,103,195,161,121,10,103,195,162,109,10,103,195,162,110,10,103,195,162,117,10,103,195,162,121,10,103,195,163,10,103,195,163,105,10,103,195,163,121,10,103,195,172,10,103,195,172,109,10,103,195,172,110,10,103,195,173,10,103,195,173,99,104,10,103,195,173,112,10,103,195,178,10,103,195,178,110,10,103,195,179,99,10,103,195,179,105,10,103,195,179,112,10,103,195,179,116,10,103,195,180,10,103,195,180,109,10,103,195,180,110,10,103,195,180,110,103,10,103,195,181,10,103,195,185,10,103,195,185,105,10,103,195,185,110,10,103,195,185,110,103,10,103,195,186,116,10,103,196,131,109,10,103,196,131,110,10,103,196,131,110,103,10,103,197,169,105,10,103,198,161,10,103,198,176,198,161,109,10,103,198,176,198,161,110,103,10,103,198,176,225,187,157,109,10,103,198,176,225,187,157,110,103,10,103,198,176,225,187,161,110,103,10,103,198,176,225,187,163,109,10,103,198,176,225,187,163,110,103,10,103,225,186,161,10,103,225,186,161,99,10,103,225,186,161,99,104,10,103,225,186,161,110,10,103,225,186,161,110,104,10,103,225,186,161,111,10,103,225,186,161,116,10,103,225,186,163,10,103,225,186,163,121,10,103,225,186,165,99,10,103,225,186,165,109,10,103,225,186,165,112,10,103,225,186,165,117,10,103,225,186,165,121,10,103,225,186,167,109,10,103,225,186,167,110,10,103,225,186,167,117,10,103,225,186,167,121,10,103,225,186,169,109,10,103,225,186,171,109,10,103,225,186,171,117,10,103,225,186,173,109,10,103,225,186,173,112,10,103,225,186,173,116,10,103,225,186,173,121,10,103,225,186,175,109,10,103,225,186,175,110,10,103,225,186,175,110,103,10,103,225,186,175,112,10,103,225,186,175,116,10,103,225,186,177,109,10,103,225,186,177,110,10,103,225,186,183,99,10,103,225,186,183,109,10,103,225,186,183,110,10,103,225,186,183,110,103,10,103,225,186,183,112,10,103,225,186,183,116,10,103,225,187,137,10,103,225,187,141,105,10,103,225,187,141,110,10,103,225,187,141,110,103,10,103,225,187,141,116,10,103,225,187,143,105,10,103,225,187,143,110,103,10,103,225,187,145,99,10,103,225,187,145,105,10,103,225,187,145,109,10,103,225,187,147,10,103,225,187,147,105,10,103,225,187,147,109,10,103,225,187,147,110,103,10,103,225,187,149,10,103,225,187,151,10,103,225,187,153,10,103,225,187,153,99,10,103,225,187,153,105,10,103,225,187,153,112,10,103,225,187,153,116,10,103,225,187,155,109,10,103,225,187,157,10,103,225,187,157,109,10,103,225,187,157,110,10,103,225,187,159,10,103,225,187,159,105,10,103,225,187,161,10,103,225,187,163,105,10,103,225,187,163,110,10,103,225,187,163,116,10,103,225,187,165,10,103,225,187,165,99,10,103,225,187,165,105,10,103,225,187,165,116,10,103,225,187,171,10,103,225,187,171,110,103,10,103,225,187,173,105,10,104,97,10,104,97,105,10,104,97,109,10,104,97,110,10,104,97,110,103,10,104,97,110,104,10,104,97,111,10,104,97,117,10,104,97,121,10,104,101,10,104,101,109,10,104,101,110,10,104,101,111,10,104,105,10,104,105,97,10,104,105,109,10,104,105,117,10,104,105,195,170,110,10,104,105,195,170,110,103,10,104,105,225,186,191,109,10,104,105,225,186,191,110,10,104,105,225,186,191,110,103,10,104,105,225,186,191,112,10,104,105,225,186,191,117,10,104,105,225,187,129,109,10,104,105,225,187,129,110,10,104,105,225,187,131,109,10,104,105,225,187,131,110,10,104,105,225,187,131,117,10,104,105,225,187,135,110,10,104,105,225,187,135,112,10,104,105,225,187,135,117,10,104,111,10,104,111,97,10,104,111,97,110,10,104,111,97,110,103,10,104,111,97,121,10,104,111,101,10,104,111,101,110,10,104,111,105,10,104,111,109,10,104,111,110,10,104,111,110,103,10,104,111,195,160,10,104,111,195,160,105,10,104,111,195,160,110,10,104,111,195,160,110,103,10,104,111,195,160,110,104,10,104,111,195,161,10,104,111,195,161,99,10,104,111,195,161,110,10,104,111,195,161,121,10,104,111,195,163,110,10,104,111,195,168,10,104,111,195,169,116,10,104,111,196,131,109,10,104,111,196,131,110,103,10,104,111,225,186,161,10,104,111,225,186,161,99,104,10,104,111,225,186,161,105,10,104,111,225,186,161,110,10,104,111,225,186,161,110,104,10,104,111,225,186,161,116,10,104,111,225,186,163,10,104,111,225,186,163,105,10,104,111,225,186,163,110,103,10,104,111,225,186,163,110,104,10,104,111,225,186,175,99,10,104,111,225,186,175,109,10,104,111,225,186,175,116,10,104,111,225,186,179,110,10,104,111,225,186,181,110,103,10,104,111,225,186,183,99,10,104,111,225,186,185,10,104,111,225,186,185,116,10,104,111,225,186,187,110,10,104,117,10,104,117,97,10,104,117,109,10,104,117,110,10,104,117,110,103,10,104,117,121,10,104,117,121,110,104,10,104,117,121,195,170,110,10,104,117,121,225,186,191,116,10,104,117,121,225,187,129,110,10,104,117,121,225,187,133,110,10,104,117,121,225,187,135,110,10,104,117,121,225,187,135,116,10,104,117,195,162,110,10,104,117,195,170,10,104,117,195,170,110,104,10,104,117,195,189,10,104,117,195,189,99,104,10,104,117,195,189,116,10,104,117,198,161,10,104,117,225,186,165,110,10,104,117,225,186,191,99,104,10,104,117,225,187,129,10,104,117,225,187,135,10,104,117,225,187,145,110,103,10,104,117,225,187,179,110,104,10,104,117,225,187,181,99,104,10,104,117,225,187,183,10,104,121,10,104,195,160,10,104,195,160,105,10,104,195,160,109,10,104,195,160,110,10,104,195,160,110,103,10,104,195,160,110,104,10,104,195,160,111,10,104,195,160,117,10,104,195,161,10,104,195,161,99,10,104,195,161,99,104,10,104,195,161,105,10,104,195,161,109,10,104,195,161,110,10,104,195,161,110,103,10,104,195,161,110,104,10,104,195,161,111,10,104,195,161,116,10,104,195,161,117,10,104,195,161,121,10,104,195,162,109,10,104,195,162,110,10,104,195,162,117,10,104,195,162,121,10,104,195,163,105,10,104,195,163,109,10,104,195,163,110,10,104,195,163,110,103,10,104,195,163,110,104,10,104,195,163,111,10,104,195,163,121,10,104,195,168,10,104,195,168,109,10,104,195,168,110,10,104,195,168,111,10,104,195,169,10,104,195,169,99,10,104,195,169,111,10,104,195,169,116,10,104,195,170,10,104,195,170,110,10,104,195,170,110,104,10,104,195,172,10,104,195,172,110,104,10,104,195,173,10,104,195,173,99,104,10,104,195,173,112,10,104,195,173,116,10,104,195,178,10,104,195,178,105,10,104,195,178,109,10,104,195,178,110,10,104,195,178,110,103,10,104,195,179,99,10,104,195,179,105,10,104,195,179,109,10,104,195,179,110,103,10,104,195,179,112,10,104,195,179,116,10,104,195,180,10,104,195,180,105,10,104,195,180,109,10,104,195,180,110,10,104,195,180,110,103,10,104,195,181,109,10,104,195,185,10,104,195,185,97,10,104,195,185,109,10,104,195,185,110,10,104,195,185,110,103,10,104,195,186,10,104,195,186,99,10,104,195,186,105,10,104,195,186,110,103,10,104,195,186,112,10,104,195,186,116,10,104,196,131,109,10,104,196,131,110,103,10,104,196,169,109,10,104,196,169,110,104,10,104,197,169,10,104,197,169,109,10,104,198,161,10,104,198,161,105,10,104,198,161,110,10,104,198,176,10,104,198,176,110,103,10,104,198,176,117,10,104,198,176,198,161,110,103,10,104,198,176,198,161,117,10,104,198,176,225,187,155,99,10,104,198,176,225,187,155,109,10,104,198,176,225,187,155,110,103,10,104,198,176,225,187,157,110,103,10,104,198,176,225,187,159,110,103,10,104,198,176,225,187,163,109,10,104,225,186,161,10,104,225,186,161,99,10,104,225,186,161,99,104,10,104,225,186,161,105,10,104,225,186,161,109,10,104,225,186,161,110,10,104,225,186,161,110,103,10,104,225,186,161,110,104,10,104,225,186,161,111,10,104,225,186,161,112,10,104,225,186,161,116,10,104,225,186,163,10,104,225,186,163,105,10,104,225,186,163,109,10,104,225,186,163,110,103,10,104,225,186,163,111,10,104,225,186,165,110,10,104,225,186,165,110,103,10,104,225,186,165,112,10,104,225,186,165,116,10,104,225,186,165,117,10,104,225,186,165,121,10,104,225,186,167,109,10,104,225,186,167,117,10,104,225,186,167,121,10,104,225,186,169,109,10,104,225,186,169,110,103,10,104,225,186,169,117,10,104,225,186,169,121,10,104,225,186,171,110,103,10,104,225,186,171,117,10,104,225,186,173,109,10,104,225,186,173,110,10,104,225,186,173,112,10,104,225,186,173,117,10,104,225,186,175,99,10,104,225,186,175,110,10,104,225,186,175,110,103,10,104,225,186,175,116,10,104,225,186,177,109,10,104,225,186,177,110,10,104,225,186,177,110,103,10,104,225,186,179,110,10,104,225,186,181,110,103,10,104,225,186,183,99,10,104,225,186,185,10,104,225,186,185,109,10,104,225,186,185,110,10,104,225,186,185,112,10,104,225,186,187,109,10,104,225,186,187,111,10,104,225,186,191,99,104,10,104,225,186,191,110,10,104,225,186,191,116,10,104,225,186,191,117,10,104,225,187,129,10,104,225,187,129,110,104,10,104,225,187,131,10,104,225,187,131,110,10,104,225,187,131,110,104,10,104,225,187,135,10,104,225,187,135,99,104,10,104,225,187,135,116,10,104,225,187,137,10,104,225,187,137,110,104,10,104,225,187,139,99,104,10,104,225,187,141,10,104,225,187,141,99,10,104,225,187,141,110,103,10,104,225,187,141,112,10,104,225,187,143,105,10,104,225,187,143,109,10,104,225,187,143,110,10,104,225,187,143,110,103,10,104,225,187,145,10,104,225,187,145,99,10,104,225,187,145,105,10,104,225,187,145,110,103,10,104,225,187,145,116,10,104,225,187,147,10,104,225,187,147,105,10,104,225,187,147,110,10,104,225,187,147,110,103,10,104,225,187,149,10,104,225,187,149,105,10,104,225,187,149,109,10,104,225,187,149,110,10,104,225,187,149,110,103,10,104,225,187,151,10,104,225,187,151,110,10,104,225,187,151,110,103,10,104,225,187,153,10,104,225,187,153,99,10,104,225,187,153,105,10,104,225,187,153,110,10,104,225,187,153,112,10,104,225,187,153,116,10,104,225,187,155,10,104,225,187,155,109,10,104,225,187,155,110,10,104,225,187,155,112,10,104,225,187,155,116,10,104,225,187,157,10,104,225,187,157,105,10,104,225,187,157,110,10,104,225,187,159,10,104,225,187,159,105,10,104,225,187,161,105,10,104,225,187,163,105,10,104,225,187,163,109,10,104,225,187,163,112,10,104,225,187,163,116,10,104,225,187,165,99,10,104,225,187,165,105,10,104,225,187,165,109,10,104,225,187,165,112,10,104,225,187,165,116,10,104,225,187,167,10,104,225,187,167,105,10,104,225,187,167,110,10,104,225,187,169,97,10,104,225,187,169,99,10,104,225,187,169,110,103,10,104,225,187,171,10,104,225,187,171,109,10,104,225,187,171,110,103,10,104,225,187,173,10,104,225,187,173,110,103,10,104,225,187,175,10,104,225,187,175,110,103,10,104,225,187,175,117,10,104,225,187,177,10,104,225,187,177,99,10,104,225,187,177,117,10,105,10,105,109,10,105,110,10,105,110,104,10,105,110,116,101,114,110,101,116,10,105,110,116,114,97,110,101,116,10,105,117,10,107,97,10,107,101,10,107,101,109,10,107,101,110,10,107,101,110,103,10,107,101,111,10,107,104,97,10,107,104,97,105,10,107,104,97,109,10,107,104,97,110,10,107,104,97,110,103,10,107,104,97,110,104,10,107,104,97,111,10,107,104,97,117,10,107,104,97,121,10,107,104,101,10,107,104,101,109,10,107,104,101,110,10,107,104,101,111,10,107,104,105,10,107,104,105,110,10,107,104,105,110,104,10,107,104,105,117,10,107,104,105,195,170,109,10,107,104,105,195,170,110,10,107,104,105,195,170,110,103,10,107,104,105,195,170,117,10,107,104,105,225,186,191,109,10,107,104,105,225,186,191,110,10,107,104,105,225,186,191,112,10,107,104,105,225,186,191,116,10,107,104,105,225,186,191,117,10,107,104,105,225,187,129,110,10,107,104,105,225,187,131,110,10,107,104,105,225,187,133,110,103,10,107,104,111,10,107,104,111,97,10,107,104,111,97,105,10,107,104,111,97,110,10,107,104,111,97,110,103,10,107,104,111,97,110,104,10,107,104,111,101,10,107,104,111,101,111,10,107,104,111,109,10,107,104,111,195,160,111,10,107,104,111,195,161,10,107,104,111,195,161,99,10,107,104,111,195,161,105,10,107,104,111,195,161,110,10,107,104,111,195,161,110,103,10,107,104,111,195,161,116,10,107,104,111,195,161,121,10,107,104,111,195,168,111,10,107,104,111,195,169,10,107,104,111,195,169,116,10,107,104,111,196,131,109,10,107,104,111,196,131,110,10,107,104,111,225,186,163,10,107,104,111,225,186,163,105,10,107,104,111,225,186,163,110,10,107,104,111,225,186,163,110,103,10,107,104,111,225,186,163,110,104,10,107,104,111,225,186,175,109,10,107,104,111,225,186,175,110,10,107,104,111,225,186,175,110,103,10,107,104,111,225,186,175,116,10,107,104,111,225,186,177,109,10,107,104,111,225,186,187,10,107,104,117,10,107,104,117,97,10,107,104,117,105,10,107,104,117,109,10,107,104,117,110,103,10,107,104,117,121,10,107,104,117,121,97,10,107,104,117,121,110,104,10,107,104,117,121,195,170,110,10,107,104,117,121,225,186,191,110,10,107,104,117,121,225,186,191,116,10,107,104,117,121,225,187,131,110,10,107,104,117,195,162,110,10,107,104,117,195,162,110,103,10,107,104,117,195,162,121,10,107,104,117,195,170,10,107,104,117,195,180,110,10,107,104,117,195,180,110,103,10,107,104,117,198,161,10,107,104,117,225,186,165,116,10,107,104,117,225,186,165,121,10,107,104,117,225,186,169,110,10,107,104,117,225,186,191,99,104,10,107,104,117,225,187,179,110,104,10,107,104,117,225,187,181,117,10,107,104,117,225,187,183,117,10,107,104,195,160,10,107,104,195,160,110,10,107,104,195,160,110,103,10,107,104,195,161,10,107,104,195,161,99,10,107,104,195,161,99,104,10,107,104,195,161,105,10,107,104,195,161,109,10,107,104,195,161,110,10,107,104,195,161,110,103,10,107,104,195,161,110,104,10,107,104,195,161,111,10,107,104,195,161,112,10,107,104,195,161,116,10,107,104,195,161,117,10,107,104,195,161,121,10,107,104,195,162,109,10,107,104,195,162,110,10,107,104,195,162,117,10,107,104,195,168,10,107,104,195,168,110,10,107,104,195,168,111,10,107,104,195,169,10,107,104,195,169,110,10,107,104,195,169,111,10,107,104,195,169,112,10,107,104,195,169,116,10,107,104,195,170,10,107,104,195,170,110,104,10,107,104,195,170,117,10,107,104,195,172,10,107,104,195,172,110,10,107,104,195,173,10,107,104,195,173,97,10,107,104,195,173,99,104,10,107,104,195,173,116,10,107,104,195,173,117,10,107,104,195,178,10,107,104,195,178,109,10,107,104,195,178,110,103,10,107,104,195,179,10,107,104,195,179,99,10,107,104,195,179,105,10,107,104,195,179,109,10,107,104,195,180,10,107,104,195,180,105,10,107,104,195,180,110,10,107,104,195,180,110,103,10,107,104,195,185,10,107,104,195,185,110,103,10,107,104,195,186,10,107,104,195,186,99,10,107,104,195,186,109,10,107,104,196,131,109,10,107,104,196,131,110,10,107,104,196,131,110,103,10,107,104,196,169,110,104,10,107,104,198,161,10,107,104,198,161,105,10,107,104,198,176,10,107,104,198,176,198,161,105,10,107,104,198,176,198,161,109,10,107,104,198,176,198,161,110,10,107,104,198,176,198,161,110,103,10,107,104,198,176,225,187,155,99,10,107,104,198,176,225,187,155,116,10,107,104,198,176,225,187,155,117,10,107,104,225,186,161,99,10,107,104,225,186,161,110,103,10,107,104,225,186,161,111,10,107,104,225,186,163,10,107,104,225,186,163,105,10,107,104,225,186,163,109,10,107,104,225,186,163,110,10,107,104,225,186,163,110,103,10,107,104,225,186,163,110,104,10,107,104,225,186,163,111,10,107,104,225,186,163,121,10,107,104,225,186,165,99,10,107,104,225,186,165,109,10,107,104,225,186,165,110,10,107,104,225,186,165,112,10,107,104,225,186,165,116,10,107,104,225,186,165,117,10,107,104,225,186,169,110,10,107,104,225,186,169,117,10,107,104,225,186,169,121,10,107,104,225,186,173,112,10,107,104,225,186,173,116,10,107,104,225,186,175,99,10,107,104,225,186,175,109,10,107,104,225,186,175,110,103,10,107,104,225,186,175,112,10,107,104,225,186,175,116,10,107,104,225,186,177,110,103,10,107,104,225,186,179,109,10,107,104,225,186,179,110,10,107,104,225,186,179,110,103,10,107,104,225,186,183,99,10,107,104,225,186,185,99,10,107,104,225,186,187,10,107,104,225,186,187,111,10,107,104,225,186,189,10,107,104,225,186,191,10,107,104,225,187,129,10,107,104,225,187,129,117,10,107,104,225,187,131,110,104,10,107,104,225,187,135,10,107,104,225,187,135,110,104,10,107,104,225,187,137,10,107,104,225,187,137,110,104,10,107,104,225,187,139,97,10,107,104,225,187,139,116,10,107,104,225,187,141,109,10,107,104,225,187,143,105,10,107,104,225,187,143,110,103,10,107,104,225,187,145,10,107,104,225,187,145,99,10,107,104,225,187,145,105,10,107,104,225,187,145,110,10,107,104,225,187,145,110,103,10,107,104,225,187,149,10,107,104,225,187,149,110,10,107,104,225,187,149,110,103,10,107,104,225,187,155,10,107,104,225,187,155,112,10,107,104,225,187,157,10,107,104,225,187,159,105,10,107,104,225,187,165,10,107,104,225,187,165,99,10,107,104,225,187,165,116,10,107,104,225,187,167,10,107,104,225,187,167,110,103,10,107,104,225,187,169,10,107,104,225,187,169,97,10,107,104,225,187,169,110,103,10,107,104,225,187,169,117,10,107,104,225,187,171,10,107,104,225,187,171,110,103,10,107,104,225,187,173,10,107,104,225,187,177,110,103,10,107,105,10,107,105,97,10,107,105,109,10,107,105,110,104,10,107,105,195,170,109,10,107,105,195,170,110,10,107,105,195,170,110,103,10,107,105,195,170,117,10,107,105,225,186,191,109,10,107,105,225,186,191,110,10,107,105,225,186,191,112,10,107,105,225,186,191,116,10,107,105,225,186,191,117,10,107,105,225,187,129,109,10,107,105,225,187,129,110,10,107,105,225,187,129,110,103,10,107,105,225,187,129,117,10,107,105,225,187,131,109,10,107,105,225,187,131,110,103,10,107,105,225,187,131,117,10,107,105,225,187,133,110,103,10,107,105,225,187,135,109,10,107,105,225,187,135,110,10,107,105,225,187,135,116,10,107,105,225,187,135,117,10,107,195,168,10,107,195,168,109,10,107,195,168,110,10,107,195,168,111,10,107,195,169,10,107,195,169,99,10,107,195,169,109,10,107,195,169,110,10,107,195,169,111,10,107,195,169,112,10,107,195,169,116,10,107,195,170,10,107,195,170,110,104,10,107,195,170,117,10,107,195,172,10,107,195,172,97,10,107,195,172,109,10,107,195,172,110,104,10,107,195,173,10,107,195,173,99,104,10,107,195,173,110,10,107,195,173,110,104,10,107,195,173,112,10,107,195,173,116,10,107,195,189,10,107,196,169,10,107,225,186,185,10,107,225,186,185,110,10,107,225,186,185,111,10,107,225,186,185,112,10,107,225,186,185,116,10,107,225,186,187,10,107,225,186,187,110,103,10,107,225,186,187,111,10,107,225,186,189,10,107,225,186,189,109,10,107,225,186,189,111,10,107,225,186,191,10,107,225,186,191,99,104,10,107,225,186,191,112,10,107,225,186,191,116,10,107,225,187,129,10,107,225,187,129,109,10,107,225,187,129,110,10,107,225,187,129,110,104,10,107,225,187,129,117,10,107,225,187,131,10,107,225,187,135,10,107,225,187,135,99,104,10,107,225,187,135,110,104,10,107,225,187,137,10,107,225,187,137,110,104,10,107,225,187,139,10,107,225,187,139,99,104,10,107,225,187,139,112,10,107,225,187,139,116,10,107,225,187,179,10,107,225,187,181,10,107,225,187,183,10,107,225,187,185,10,108,97,10,108,97,105,10,108,97,109,10,108,97,110,10,108,97,110,103,10,108,97,110,104,10,108,97,111,10,108,97,117,10,108,97,121,10,108,101,10,108,101,109,10,108,101,110,10,108,101,110,103,10,108,101,111,10,108,105,10,108,105,97,10,108,105,109,10,108,105,110,10,108,105,110,104,10,108,105,117,10,108,105,195,170,109,10,108,105,195,170,110,10,108,105,195,170,110,103,10,108,105,195,170,117,10,108,105,225,186,191,99,10,108,105,225,186,191,109,10,108,105,225,186,191,110,10,108,105,225,186,191,110,103,10,108,105,225,186,191,112,10,108,105,225,187,129,109,10,108,105,225,187,129,110,10,108,105,225,187,129,117,10,108,105,225,187,131,110,103,10,108,105,225,187,133,109,10,108,105,225,187,133,110,10,108,105,225,187,133,117,10,108,105,225,187,135,109,10,108,105,225,187,135,110,103,10,108,105,225,187,135,112,10,108,105,225,187,135,116,10,108,105,225,187,135,117,10,108,111,10,108,111,97,10,108,111,97,110,10,108,111,97,110,103,10,108,111,97,110,104,10,108,111,97,121,10,108,111,101,10,108,111,101,110,10,108,111,105,10,108,111,109,10,108,111,110,10,108,111,110,103,10,108,111,111,110,103,10,108,111,195,160,10,108,111,195,160,105,10,108,111,195,160,110,10,108,111,195,160,110,103,10,108,111,195,161,110,103,10,108,111,195,161,116,10,108,111,195,163,110,103,10,108,111,195,168,10,108,111,195,169,10,108,111,195,169,116,10,108,111,196,131,110,103,10,108,111,225,186,161,99,10,108,111,225,186,161,105,10,108,111,225,186,161,110,10,108,111,225,186,161,110,103,10,108,111,225,186,161,116,10,108,111,225,186,163,110,103,10,108,111,225,186,175,116,10,108,111,225,186,177,110,103,10,108,111,225,186,185,116,10,108,117,10,108,117,97,10,108,117,105,10,108,117,109,10,108,117,110,103,10,108,117,121,97,10,108,117,121,225,186,191,110,10,108,117,121,225,187,135,110,10,108,117,195,162,110,10,108,117,195,180,109,10,108,117,195,180,110,10,108,117,195,180,110,103,10,108,117,195,189,110,104,10,108,117,225,186,165,110,10,108,117,225,186,169,110,10,108,117,225,186,173,110,10,108,117,225,186,173,116,10,108,117,225,187,145,99,10,108,117,225,187,145,110,103,10,108,117,225,187,145,116,10,108,117,225,187,147,110,10,108,117,225,187,147,110,103,10,108,117,225,187,151,110,103,10,108,117,225,187,153,99,10,108,117,225,187,153,109,10,108,117,225,187,181,10,108,117,225,187,185,10,108,121,10,108,195,160,10,108,195,160,105,10,108,195,160,109,10,108,195,160,110,10,108,195,160,110,103,10,108,195,160,110,104,10,108,195,160,111,10,108,195,160,117,10,108,195,161,10,108,195,161,99,10,108,195,161,99,104,10,108,195,161,105,10,108,195,161,110,10,108,195,161,110,103,10,108,195,161,110,104,10,108,195,161,111,10,108,195,161,112,10,108,195,161,116,10,108,195,161,117,10,108,195,161,121,10,108,195,162,109,10,108,195,162,110,10,108,195,162,110,103,10,108,195,162,117,10,108,195,162,121,10,108,195,163,10,108,195,163,105,10,108,195,163,109,10,108,195,163,110,10,108,195,163,110,103,10,108,195,163,110,104,10,108,195,163,111,10,108,195,168,10,108,195,168,109,10,108,195,168,110,10,108,195,168,111,10,108,195,169,10,108,195,169,99,10,108,195,169,109,10,108,195,169,110,10,108,195,169,110,103,10,108,195,169,111,10,108,195,169,112,10,108,195,169,116,10,108,195,170,10,108,195,170,110,10,108,195,170,110,104,10,108,195,170,117,10,108,195,172,10,108,195,172,97,10,108,195,172,109,10,108,195,172,110,104,10,108,195,172,117,10,108,195,173,10,108,195,173,110,104,10,108,195,173,112,10,108,195,173,116,10,108,195,173,117,10,108,195,178,10,108,195,178,105,10,108,195,178,109,10,108,195,178,110,10,108,195,178,110,103,10,108,195,179,10,108,195,179,99,10,108,195,179,105,10,108,195,179,109,10,108,195,179,110,103,10,108,195,179,112,10,108,195,179,116,10,108,195,180,10,108,195,180,105,10,108,195,180,109,10,108,195,180,110,103,10,108,195,181,10,108,195,181,105,10,108,195,181,109,10,108,195,181,110,103,10,108,195,185,10,108,195,185,97,10,108,195,185,105,10,108,195,185,109,10,108,195,185,110,10,108,195,185,110,103,10,108,195,186,10,108,195,186,97,10,108,195,186,99,10,108,195,186,105,10,108,195,186,109,10,108,195,186,110,10,108,195,186,110,103,10,108,195,186,112,10,108,195,186,116,10,108,195,189,10,108,196,131,109,10,108,196,131,110,10,108,196,131,110,103,10,108,196,169,110,104,10,108,197,169,10,108,197,169,105,10,108,197,169,109,10,108,197,169,110,10,108,197,169,110,103,10,108,198,161,10,108,198,161,105,10,108,198,161,110,10,108,198,176,10,108,198,176,110,103,10,108,198,176,117,10,108,198,176,198,161,109,10,108,198,176,198,161,110,10,108,198,176,198,161,110,103,10,108,198,176,225,187,155,105,10,108,198,176,225,187,155,110,103,10,108,198,176,225,187,155,116,10,108,198,176,225,187,157,105,10,108,198,176,225,187,157,109,10,108,198,176,225,187,157,110,10,108,198,176,225,187,157,110,103,10,108,198,176,225,187,161,105,10,108,198,176,225,187,161,110,103,10,108,198,176,225,187,163,99,10,108,198,176,225,187,163,109,10,108,198,176,225,187,163,110,10,108,198,176,225,187,163,110,103,10,108,198,176,225,187,163,116,10,108,225,186,161,10,108,225,186,161,99,10,108,225,186,161,99,104,10,108,225,186,161,105,10,108,225,186,161,109,10,108,225,186,161,110,10,108,225,186,161,110,103,10,108,225,186,161,110,104,10,108,225,186,161,111,10,108,225,186,161,112,10,108,225,186,161,116,10,108,225,186,161,117,10,108,225,186,161,121,10,108,225,186,163,10,108,225,186,163,105,10,108,225,186,163,109,10,108,225,186,163,110,103,10,108,225,186,163,110,104,10,108,225,186,163,111,10,108,225,186,163,117,10,108,225,186,163,121,10,108,225,186,165,99,10,108,225,186,165,109,10,108,225,186,165,110,10,108,225,186,165,112,10,108,225,186,165,116,10,108,225,186,165,121,10,108,225,186,167,109,10,108,225,186,167,110,10,108,225,186,167,117,10,108,225,186,167,121,10,108,225,186,169,109,10,108,225,186,169,110,10,108,225,186,169,117,10,108,225,186,169,121,10,108,225,186,171,109,10,108,225,186,171,110,10,108,225,186,171,121,10,108,225,186,173,110,10,108,225,186,173,112,10,108,225,186,173,116,10,108,225,186,173,117,10,108,225,186,175,99,10,108,225,186,175,109,10,108,225,186,175,110,103,10,108,225,186,175,112,10,108,225,186,175,116,10,108,225,186,177,109,10,108,225,186,177,110,10,108,225,186,177,110,103,10,108,225,186,179,109,10,108,225,186,179,110,10,108,225,186,179,110,103,10,108,225,186,181,110,103,10,108,225,186,183,99,10,108,225,186,183,109,10,108,225,186,183,110,10,108,225,186,183,110,103,10,108,225,186,183,112,10,108,225,186,183,116,10,108,225,186,185,10,108,225,186,185,109,10,108,225,186,185,110,10,108,225,186,185,111,10,108,225,186,185,112,10,108,225,186,185,116,10,108,225,186,187,10,108,225,186,187,109,10,108,225,186,187,110,10,108,225,186,187,110,103,10,108,225,186,187,111,10,108,225,186,189,10,108,225,186,189,110,10,108,225,186,189,111,10,108,225,186,191,99,104,10,108,225,186,191,116,10,108,225,186,191,117,10,108,225,187,129,10,108,225,187,129,110,104,10,108,225,187,129,117,10,108,225,187,131,10,108,225,187,131,117,10,108,225,187,133,10,108,225,187,133,117,10,108,225,187,135,10,108,225,187,135,99,104,10,108,225,187,135,110,104,10,108,225,187,137,109,10,108,225,187,137,110,104,10,108,225,187,139,10,108,225,187,139,97,10,108,225,187,139,99,104,10,108,225,187,139,109,10,108,225,187,139,110,104,10,108,225,187,139,117,10,108,225,187,141,10,108,225,187,141,99,10,108,225,187,141,105,10,108,225,187,141,109,10,108,225,187,141,110,10,108,225,187,141,110,103,10,108,225,187,141,116,10,108,225,187,143,105,10,108,225,187,143,109,10,108,225,187,143,110,10,108,225,187,143,110,103,10,108,225,187,145,10,108,225,187,145,99,10,108,225,187,145,105,10,108,225,187,145,109,10,108,225,187,145,110,10,108,225,187,145,112,10,108,225,187,145,116,10,108,225,187,147,10,108,225,187,147,105,10,108,225,187,147,109,10,108,225,187,147,110,10,108,225,187,147,110,103,10,108,225,187,149,10,108,225,187,149,109,10,108,225,187,149,110,10,108,225,187,149,110,103,10,108,225,187,151,10,108,225,187,151,105,10,108,225,187,153,10,108,225,187,153,99,10,108,225,187,153,105,10,108,225,187,153,109,10,108,225,187,153,110,10,108,225,187,153,110,103,10,108,225,187,153,112,10,108,225,187,153,116,10,108,225,187,155,10,108,225,187,155,105,10,108,225,187,155,110,10,108,225,187,155,112,10,108,225,187,155,116,10,108,225,187,157,10,108,225,187,157,105,10,108,225,187,157,109,10,108,225,187,157,110,10,108,225,187,159,10,108,225,187,159,105,10,108,225,187,159,109,10,108,225,187,159,110,10,108,225,187,161,10,108,225,187,161,109,10,108,225,187,163,10,108,225,187,163,105,10,108,225,187,163,109,10,108,225,187,163,110,10,108,225,187,163,112,10,108,225,187,163,116,10,108,225,187,165,10,108,225,187,165,97,10,108,225,187,165,99,10,108,225,187,165,105,10,108,225,187,165,110,10,108,225,187,165,110,103,10,108,225,187,165,112,10,108,225,187,165,116,10,108,225,187,167,10,108,225,187,167,105,10,108,225,187,167,109,10,108,225,187,167,110,10,108,225,187,167,110,103,10,108,225,187,169,97,10,108,225,187,169,99,10,108,225,187,169,116,10,108,225,187,171,10,108,225,187,171,97,10,108,225,187,171,110,103,10,108,225,187,173,10,108,225,187,173,97,10,108,225,187,173,110,103,10,108,225,187,175,10,108,225,187,175,97,10,108,225,187,175,110,103,10,108,225,187,177,10,108,225,187,177,97,10,108,225,187,177,99,10,108,225,187,177,110,103,10,108,225,187,177,117,10,108,225,187,181,10,109,97,10,109,97,105,10,109,97,110,10,109,97,110,103,10,109,97,110,104,10,109,97,111,10,109,97,117,10,109,97,121,10,109,101,10,109,101,109,10,109,101,110,10,109,101,111,10,109,105,10,109,105,97,10,109,105,109,10,109,105,110,10,109,105,110,104,10,109,105,195,170,110,10,109,105,195,170,117,10,109,105,225,186,191,110,10,109,105,225,186,191,110,103,10,109,105,225,186,191,116,10,109,105,225,186,191,117,10,109,105,225,187,129,110,10,109,105,225,187,129,117,10,109,105,225,187,133,110,10,109,105,225,187,133,117,10,109,105,225,187,135,110,10,109,105,225,187,135,110,103,10,109,105,225,187,135,116,10,109,111,10,109,111,97,121,10,109,111,105,10,109,111,109,10,109,111,110,10,109,111,110,103,10,109,111,195,179,99,10,109,117,10,109,117,97,10,109,117,105,10,109,117,109,10,109,117,110,10,109,117,110,103,10,109,117,195,180,105,10,109,117,195,180,110,10,109,117,195,180,110,103,10,109,117,225,187,145,105,10,109,117,225,187,145,110,10,109,117,225,187,145,110,103,10,109,117,225,187,145,116,10,109,117,225,187,147,105,10,109,117,225,187,151,105,10,109,117,225,187,151,109,10,109,117,225,187,151,110,103,10,109,117,225,187,153,105,10,109,117,225,187,153,110,10,109,195,160,10,109,195,160,105,10,109,195,160,110,10,109,195,160,110,103,10,109,195,160,110,104,10,109,195,160,111,10,109,195,160,117,10,109,195,160,121,10,109,195,161,10,109,195,161,99,10,109,195,161,99,104,10,109,195,161,105,10,109,195,161,110,10,109,195,161,110,103,10,109,195,161,110,104,10,109,195,161,111,10,109,195,161,116,10,109,195,161,117,10,109,195,161,121,10,109,195,162,109,10,109,195,162,110,10,109,195,162,110,103,10,109,195,162,117,10,109,195,162,121,10,109,195,163,10,109,195,163,105,10,109,195,163,110,10,109,195,163,110,103,10,109,195,163,110,104,10,109,195,163,111,10,109,195,168,10,109,195,168,109,10,109,195,168,110,10,109,195,168,110,103,10,109,195,168,111,10,109,195,169,10,109,195,169,109,10,109,195,169,110,10,109,195,169,111,10,109,195,169,112,10,109,195,169,116,10,109,195,170,10,109,195,170,110,10,109,195,170,110,104,10,109,195,172,10,109,195,172,110,10,109,195,172,110,104,10,109,195,173,10,109,195,173,97,10,109,195,173,99,104,10,109,195,173,109,10,109,195,173,112,10,109,195,173,116,10,109,195,173,117,10,109,195,178,10,109,195,178,105,10,109,195,178,109,10,109,195,178,110,10,109,195,178,110,103,10,109,195,179,10,109,195,179,99,10,109,195,179,105,10,109,195,179,109,10,109,195,179,110,10,109,195,179,110,103,10,109,195,179,112,10,109,195,179,116,10,109,195,180,10,109,195,180,105,10,109,195,180,109,10,109,195,180,110,10,109,195,180,110,103,10,109,195,181,10,109,195,181,109,10,109,195,185,10,109,195,185,97,10,109,195,185,105,10,109,195,185,110,10,109,195,185,110,103,10,109,195,186,10,109,195,186,97,10,109,195,186,99,10,109,195,186,105,10,109,195,186,109,10,109,195,186,110,10,109,195,186,112,10,109,195,186,116,10,109,196,131,109,10,109,196,131,110,10,109,196,131,110,103,10,109,196,169,10,109,196,169,109,10,109,197,169,10,109,197,169,105,10,109,197,169,109,10,109,198,161,10,109,198,161,105,10,109,198,161,110,10,109,198,176,97,10,109,198,176,117,10,109,198,176,198,161,105,10,109,198,176,198,161,110,103,10,109,198,176,225,187,155,110,10,109,198,176,225,187,155,112,10,109,198,176,225,187,155,116,10,109,198,176,225,187,157,105,10,109,198,176,225,187,157,110,103,10,109,198,176,225,187,163,110,10,109,198,176,225,187,163,116,10,109,225,186,161,10,109,225,186,161,99,10,109,225,186,161,99,104,10,109,225,186,161,105,10,109,225,186,161,110,10,109,225,186,161,110,103,10,109,225,186,161,110,104,10,109,225,186,161,111,10,109,225,186,161,112,10,109,225,186,161,116,10,109,225,186,161,121,10,109,225,186,163,10,109,225,186,163,105,10,109,225,186,163,110,103,10,109,225,186,163,110,104,10,109,225,186,163,121,10,109,225,186,165,110,10,109,225,186,165,112,10,109,225,186,165,116,10,109,225,186,165,117,10,109,225,186,165,121,10,109,225,186,167,109,10,109,225,186,167,110,10,109,225,186,167,110,103,10,109,225,186,167,117,10,109,225,186,169,109,10,109,225,186,169,110,10,109,225,186,169,121,10,109,225,186,171,109,10,109,225,186,171,110,10,109,225,186,171,117,10,109,225,186,173,110,10,109,225,186,173,112,10,109,225,186,173,116,10,109,225,186,173,117,10,109,225,186,175,99,10,109,225,186,175,109,10,109,225,186,175,110,10,109,225,186,175,110,103,10,109,225,186,175,116,10,109,225,186,177,110,10,109,225,186,179,110,10,109,225,186,183,99,10,109,225,186,183,110,10,109,225,186,183,116,10,109,225,186,185,10,109,225,186,185,111,10,109,225,186,185,112,10,109,225,186,185,116,10,109,225,186,187,10,109,225,186,187,111,10,109,225,186,189,10,109,225,186,191,10,109,225,186,191,99,104,10,109,225,186,191,110,10,109,225,186,191,117,10,109,225,187,129,10,109,225,187,129,109,10,109,225,187,129,110,10,109,225,187,133,10,109,225,187,135,10,109,225,187,135,110,104,10,109,225,187,135,116,10,109,225,187,137,10,109,225,187,137,97,10,109,225,187,137,109,10,109,225,187,139,10,109,225,187,139,99,104,10,109,225,187,139,110,10,109,225,187,139,110,104,10,109,225,187,139,116,10,109,225,187,141,99,10,109,225,187,141,105,10,109,225,187,141,110,10,109,225,187,141,110,103,10,109,225,187,141,116,10,109,225,187,143,10,109,225,187,143,105,10,109,225,187,143,109,10,109,225,187,143,110,103,10,109,225,187,145,10,109,225,187,145,99,10,109,225,187,145,105,10,109,225,187,145,110,103,10,109,225,187,145,116,10,109,225,187,147,10,109,225,187,147,105,10,109,225,187,147,109,10,109,225,187,147,110,10,109,225,187,147,110,103,10,109,225,187,149,10,109,225,187,149,110,103,10,109,225,187,151,10,109,225,187,151,105,10,109,225,187,153,10,109,225,187,153,99,10,109,225,187,153,110,103,10,109,225,187,153,116,10,109,225,187,155,10,109,225,187,155,105,10,109,225,187,155,109,10,109,225,187,155,112,10,109,225,187,157,10,109,225,187,157,105,10,109,225,187,157,109,10,109,225,187,159,10,109,225,187,159,110,10,109,225,187,161,10,109,225,187,165,10,109,225,187,165,99,10,109,225,187,165,105,10,109,225,187,165,110,10,109,225,187,165,112,10,109,225,187,167,10,109,225,187,167,105,10,109,225,187,167,109,10,109,225,187,167,110,10,109,225,187,167,110,103,10,109,225,187,169,97,10,109,225,187,169,99,10,109,225,187,169,116,10,109,225,187,169,117,10,109,225,187,171,110,103,10,109,225,187,173,97,10,109,225,187,177,97,10,109,225,187,177,99,10,109,225,187,185,10,110,97,10,110,97,105,10,110,97,109,10,110,97,110,10,110,97,110,103,10,110,97,110,104,10,110,97,111,10,110,97,117,10,110,97,121,10,110,101,10,110,101,109,10,110,101,110,10,110,101,111,10,110,103,97,10,110,103,97,105,10,110,103,97,109,10,110,103,97,110,10,110,103,97,110,103,10,110,103,97,111,10,110,103,97,117,10,110,103,97,121,10,110,103,104,101,10,110,103,104,105,10,110,103,104,105,110,104,10,110,103,104,105,117,10,110,103,104,105,195,170,109,10,110,103,104,105,195,170,110,10,110,103,104,105,195,170,110,103,10,110,103,104,105,195,170,117,10,110,103,104,105,225,186,191,110,10,110,103,104,105,225,187,129,110,10,110,103,104,105,225,187,133,109,10,110,103,104,105,225,187,135,109,10,110,103,104,105,225,187,135,110,10,110,103,104,105,225,187,135,112,10,110,103,104,105,225,187,135,116,10,110,103,104,195,168,10,110,103,104,195,168,110,10,110,103,104,195,168,111,10,110,103,104,195,169,10,110,103,104,195,169,110,10,110,103,104,195,169,116,10,110,103,104,195,170,10,110,103,104,195,170,110,104,10,110,103,104,195,170,117,10,110,103,104,195,172,10,110,103,104,195,172,110,10,110,103,104,195,173,10,110,103,104,195,173,116,10,110,103,104,196,169,10,110,103,104,196,169,97,10,110,103,104,225,186,185,110,10,110,103,104,225,186,185,111,10,110,103,104,225,186,185,116,10,110,103,104,225,186,187,111,10,110,103,104,225,186,189,110,10,110,103,104,225,186,189,111,10,110,103,104,225,186,191,99,104,10,110,103,104,225,187,129,10,110,103,104,225,187,129,117,10,110,103,104,225,187,131,110,10,110,103,104,225,187,131,110,104,10,110,103,104,225,187,133,10,110,103,104,225,187,133,110,104,10,110,103,104,225,187,133,117,10,110,103,104,225,187,135,10,110,103,104,225,187,135,99,104,10,110,103,104,225,187,135,110,10,110,103,104,225,187,137,10,110,103,104,225,187,137,109,10,110,103,104,225,187,137,110,10,110,103,104,225,187,137,110,104,10,110,103,104,225,187,137,117,10,110,103,104,225,187,139,10,110,103,104,225,187,139,99,104,10,110,103,104,225,187,139,116,10,110,103,104,225,187,139,117,10,110,103,111,97,10,110,103,111,97,110,10,110,103,111,97,110,103,10,110,103,111,97,111,10,110,103,111,97,121,10,110,103,111,101,10,110,103,111,105,10,110,103,111,110,10,110,103,111,110,103,10,110,103,111,195,160,105,10,110,103,111,195,160,109,10,110,103,111,195,161,99,10,110,103,111,195,161,99,104,10,110,103,111,195,161,105,10,110,103,111,195,161,111,10,110,103,111,195,161,121,10,110,103,111,195,163,10,110,103,111,195,163,110,10,110,103,111,195,168,111,10,110,103,111,195,169,10,110,103,111,195,169,111,10,110,103,111,195,169,116,10,110,103,111,225,186,161,105,10,110,103,111,225,186,161,109,10,110,103,111,225,186,161,110,10,110,103,111,225,186,163,105,10,110,103,111,225,186,163,110,103,10,110,103,111,225,186,163,110,104,10,110,103,111,225,186,163,121,10,110,103,111,225,186,175,99,10,110,103,111,225,186,175,116,10,110,103,111,225,186,177,110,10,110,103,111,225,186,177,110,103,10,110,103,111,225,186,181,110,103,10,110,103,111,225,186,183,99,10,110,103,111,225,186,183,116,10,110,103,111,225,186,187,110,10,110,103,117,10,110,103,117,121,10,110,103,117,121,195,170,110,10,110,103,117,121,225,187,129,110,10,110,103,117,121,225,187,135,110,10,110,103,117,121,225,187,135,116,10,110,103,117,195,189,116,10,110,103,117,225,186,169,121,10,110,103,117,225,187,147,105,10,110,103,117,225,187,147,110,10,110,103,117,225,187,153,105,10,110,103,117,225,187,181,10,110,103,117,225,187,183,117,10,110,103,195,160,10,110,103,195,160,105,10,110,103,195,160,109,10,110,103,195,160,110,10,110,103,195,160,110,103,10,110,103,195,160,110,104,10,110,103,195,160,111,10,110,103,195,160,117,10,110,103,195,160,121,10,110,103,195,161,99,10,110,103,195,161,99,104,10,110,103,195,161,105,10,110,103,195,161,109,10,110,103,195,161,110,10,110,103,195,161,110,103,10,110,103,195,161,111,10,110,103,195,161,112,10,110,103,195,161,116,10,110,103,195,161,117,10,110,103,195,161,121,10,110,103,195,162,109,10,110,103,195,162,110,10,110,103,195,162,117,10,110,103,195,162,121,10,110,103,195,163,10,110,103,195,163,105,10,110,103,195,163,110,103,10,110,103,195,163,111,10,110,103,195,178,10,110,103,195,178,105,10,110,103,195,178,109,10,110,103,195,178,110,10,110,103,195,178,110,103,10,110,103,195,179,10,110,103,195,179,99,10,110,103,195,179,105,10,110,103,195,179,109,10,110,103,195,179,110,10,110,103,195,179,110,103,10,110,103,195,179,112,10,110,103,195,179,116,10,110,103,195,180,10,110,103,195,180,105,10,110,103,195,180,110,10,110,103,195,180,110,103,10,110,103,195,181,10,110,103,195,181,105,10,110,103,195,181,110,103,10,110,103,195,185,105,10,110,103,195,185,110,103,10,110,103,195,186,10,110,103,195,186,99,10,110,103,195,186,110,103,10,110,103,195,186,116,10,110,103,196,131,109,10,110,103,196,131,110,10,110,103,197,169,10,110,103,198,161,10,110,103,198,161,105,10,110,103,198,161,109,10,110,103,198,161,110,10,110,103,198,176,10,110,103,198,176,97,10,110,103,198,176,110,103,10,110,103,198,176,117,10,110,103,198,176,198,161,105,10,110,103,198,176,225,187,155,99,10,110,103,198,176,225,187,157,105,10,110,103,198,176,225,187,157,110,103,10,110,103,198,176,225,187,159,110,103,10,110,103,198,176,225,187,161,110,103,10,110,103,198,176,225,187,163,99,10,110,103,198,176,225,187,163,110,103,10,110,103,225,186,161,99,10,110,103,225,186,161,99,104,10,110,103,225,186,161,105,10,110,103,225,186,161,110,10,110,103,225,186,161,110,104,10,110,103,225,186,161,111,10,110,103,225,186,161,116,10,110,103,225,186,163,10,110,103,225,186,163,105,10,110,103,225,186,163,110,104,10,110,103,225,186,165,99,10,110,103,225,186,165,109,10,110,103,225,186,165,110,10,110,103,225,186,165,112,10,110,103,225,186,165,116,10,110,103,225,186,165,117,10,110,103,225,186,165,121,10,110,103,225,186,167,109,10,110,103,225,186,167,110,10,110,103,225,186,167,117,10,110,103,225,186,167,121,10,110,103,225,186,169,109,10,110,103,225,186,169,110,10,110,103,225,186,169,110,103,10,110,103,225,186,171,109,10,110,103,225,186,171,110,10,110,103,225,186,171,117,10,110,103,225,186,173,109,10,110,103,225,186,173,110,10,110,103,225,186,173,112,10,110,103,225,186,173,116,10,110,103,225,186,173,117,10,110,103,225,186,173,121,10,110,103,225,186,175,99,10,110,103,225,186,175,109,10,110,103,225,186,175,110,10,110,103,225,186,175,116,10,110,103,225,186,177,110,10,110,103,225,186,179,110,103,10,110,103,225,186,181,110,103,10,110,103,225,186,183,116,10,110,103,225,187,141,10,110,103,225,187,141,99,10,110,103,225,187,141,110,10,110,103,225,187,141,110,103,10,110,103,225,187,141,116,10,110,103,225,187,143,10,110,103,225,187,143,109,10,110,103,225,187,143,110,10,110,103,225,187,143,110,103,10,110,103,225,187,145,10,110,103,225,187,145,99,10,110,103,225,187,145,110,10,110,103,225,187,145,116,10,110,103,225,187,147,105,10,110,103,225,187,147,109,10,110,103,225,187,147,110,10,110,103,225,187,147,110,103,10,110,103,225,187,149,10,110,103,225,187,149,109,10,110,103,225,187,149,110,10,110,103,225,187,151,10,110,103,225,187,151,110,103,10,110,103,225,187,153,10,110,103,225,187,153,99,10,110,103,225,187,153,110,10,110,103,225,187,153,116,10,110,103,225,187,155,10,110,103,225,187,155,110,10,110,103,225,187,155,112,10,110,103,225,187,155,116,10,110,103,225,187,157,10,110,103,225,187,157,105,10,110,103,225,187,157,109,10,110,103,225,187,161,10,110,103,225,187,163,10,110,103,225,187,163,105,10,110,103,225,187,163,109,10,110,103,225,187,163,112,10,110,103,225,187,165,10,110,103,225,187,165,97,10,110,103,225,187,165,99,10,110,103,225,187,165,109,10,110,103,225,187,165,112,10,110,103,225,187,167,10,110,103,225,187,167,105,10,110,103,225,187,167,110,10,110,103,225,187,169,10,110,103,225,187,169,97,10,110,103,225,187,169,116,10,110,103,225,187,171,10,110,103,225,187,171,97,10,110,103,225,187,171,110,103,10,110,103,225,187,173,97,10,110,103,225,187,173,105,10,110,103,225,187,173,110,103,10,110,103,225,187,175,10,110,103,225,187,177,10,110,103,225,187,177,97,10,110,103,225,187,177,99,10,110,104,97,10,110,104,97,105,10,110,104,97,109,10,110,104,97,110,10,110,104,97,110,103,10,110,104,97,110,104,10,110,104,97,111,10,110,104,97,117,10,110,104,97,121,10,110,104,101,10,110,104,101,109,10,110,104,101,110,10,110,104,101,111,10,110,104,105,10,110,104,105,110,104,10,110,104,105,117,10,110,104,105,195,170,110,10,110,104,105,195,170,117,10,110,104,105,225,186,191,99,10,110,104,105,225,186,191,112,10,110,104,105,225,187,129,117,10,110,104,105,225,187,133,109,10,110,104,105,225,187,133,110,10,110,104,105,225,187,133,117,10,110,104,105,225,187,135,109,10,110,104,105,225,187,135,116,10,110,104,111,10,110,104,111,97,105,10,110,104,111,97,110,103,10,110,104,111,97,121,10,110,104,111,101,10,110,104,111,101,110,10,110,104,111,105,10,110,104,111,109,10,110,104,111,110,103,10,110,104,111,195,160,10,110,104,111,195,160,105,10,110,104,111,195,160,109,10,110,104,111,195,161,10,110,104,111,195,161,110,103,10,110,104,111,195,161,121,10,110,104,111,195,168,10,110,104,111,195,168,110,10,110,104,111,195,169,10,110,104,111,195,169,116,10,110,104,111,225,186,161,110,103,10,110,104,111,225,186,185,116,10,110,104,111,225,186,187,110,10,110,104,117,10,110,104,117,105,10,110,104,117,110,103,10,110,104,117,121,225,187,133,110,10,110,104,117,195,180,109,10,110,104,117,225,186,167,110,10,110,104,117,225,186,173,110,10,110,104,117,225,186,191,10,110,104,117,225,187,135,10,110,104,117,225,187,145,99,10,110,104,117,225,187,145,109,10,110,104,117,225,187,153,109,10,110,104,117,225,187,181,10,110,104,195,160,10,110,104,195,160,105,10,110,104,195,160,109,10,110,104,195,160,110,10,110,104,195,160,110,103,10,110,104,195,160,110,104,10,110,104,195,160,111,10,110,104,195,160,117,10,110,104,195,160,121,10,110,104,195,161,10,110,104,195,161,99,10,110,104,195,161,99,104,10,110,104,195,161,105,10,110,104,195,161,109,10,110,104,195,161,110,103,10,110,104,195,161,110,104,10,110,104,195,161,111,10,110,104,195,161,112,10,110,104,195,161,116,10,110,104,195,161,121,10,110,104,195,162,109,10,110,104,195,162,110,10,110,104,195,162,110,103,10,110,104,195,162,117,10,110,104,195,162,121,10,110,104,195,163,10,110,104,195,163,105,10,110,104,195,163,110,10,110,104,195,163,110,103,10,110,104,195,163,111,10,110,104,195,168,10,110,104,195,168,109,10,110,104,195,168,111,10,110,104,195,169,10,110,104,195,169,110,10,110,104,195,169,111,10,110,104,195,169,112,10,110,104,195,169,116,10,110,104,195,170,110,104,10,110,104,195,172,10,110,104,195,172,110,10,110,104,195,173,10,110,104,195,173,97,10,110,104,195,173,99,104,10,110,104,195,173,109,10,110,104,195,173,110,10,110,104,195,173,112,10,110,104,195,173,116,10,110,104,195,173,117,10,110,104,195,178,10,110,104,195,178,109,10,110,104,195,179,10,110,104,195,179,99,10,110,104,195,179,105,10,110,104,195,179,109,10,110,104,195,179,110,10,110,104,195,179,110,103,10,110,104,195,179,112,10,110,104,195,179,116,10,110,104,195,180,10,110,104,195,180,105,10,110,104,195,180,109,10,110,104,195,180,110,10,110,104,195,180,110,103,10,110,104,195,181,10,110,104,195,181,109,10,110,104,195,181,110,10,110,104,195,185,10,110,104,195,185,105,10,110,104,195,185,110,10,110,104,195,185,110,103,10,110,104,195,186,10,110,104,195,186,97,10,110,104,195,186,99,10,110,104,195,186,109,10,110,104,195,186,110,10,110,104,195,186,110,103,10,110,104,195,186,116,10,110,104,196,131,109,10,110,104,196,131,110,10,110,104,196,131,110,103,10,110,104,196,169,10,110,104,197,169,10,110,104,197,169,110,10,110,104,197,169,110,103,10,110,104,198,161,10,110,104,198,161,105,10,110,104,198,161,109,10,110,104,198,161,110,10,110,104,198,176,10,110,104,198,176,110,103,10,110,104,198,176,198,161,110,103,10,110,104,198,176,225,187,155,110,103,10,110,104,198,176,225,187,157,110,103,10,110,104,198,176,225,187,161,110,103,10,110,104,198,176,225,187,163,99,10,110,104,198,176,225,187,163,110,103,10,110,104,225,186,161,99,10,110,104,225,186,161,110,10,110,104,225,186,161,110,104,10,110,104,225,186,161,111,10,110,104,225,186,161,112,10,110,104,225,186,161,116,10,110,104,225,186,161,121,10,110,104,225,186,163,10,110,104,225,186,163,105,10,110,104,225,186,163,109,10,110,104,225,186,163,110,10,110,104,225,186,163,110,104,10,110,104,225,186,163,117,10,110,104,225,186,163,121,10,110,104,225,186,165,99,10,110,104,225,186,165,109,10,110,104,225,186,165,110,10,110,104,225,186,165,112,10,110,104,225,186,165,116,10,110,104,225,186,167,109,10,110,104,225,186,167,110,10,110,104,225,186,167,121,10,110,104,225,186,169,109,10,110,104,225,186,171,110,10,110,104,225,186,171,121,10,110,104,225,186,173,109,10,110,104,225,186,173,110,10,110,104,225,186,173,112,10,110,104,225,186,173,116,10,110,104,225,186,173,117,10,110,104,225,186,173,121,10,110,104,225,186,175,99,10,110,104,225,186,175,109,10,110,104,225,186,175,110,10,110,104,225,186,175,110,103,10,110,104,225,186,175,112,10,110,104,225,186,175,116,10,110,104,225,186,177,109,10,110,104,225,186,177,110,10,110,104,225,186,177,110,103,10,110,104,225,186,179,110,10,110,104,225,186,179,110,103,10,110,104,225,186,181,110,10,110,104,225,186,181,110,103,10,110,104,225,186,183,109,10,110,104,225,186,183,110,10,110,104,225,186,183,110,103,10,110,104,225,186,183,116,10,110,104,225,186,185,10,110,104,225,186,185,109,10,110,104,225,186,185,110,10,110,104,225,186,185,111,10,110,104,225,186,185,112,10,110,104,225,186,185,116,10,110,104,225,186,187,10,110,104,225,186,187,109,10,110,104,225,186,189,10,110,104,225,186,189,111,10,110,104,225,187,135,110,10,110,104,225,187,135,117,10,110,104,225,187,137,10,110,104,225,187,137,110,104,10,110,104,225,187,139,10,110,104,225,187,139,110,10,110,104,225,187,139,112,10,110,104,225,187,139,116,10,110,104,225,187,139,117,10,110,104,225,187,141,10,110,104,225,187,141,99,10,110,104,225,187,141,110,10,110,104,225,187,141,116,10,110,104,225,187,143,10,110,104,225,187,143,109,10,110,104,225,187,143,110,103,10,110,104,225,187,145,10,110,104,225,187,145,99,10,110,104,225,187,145,105,10,110,104,225,187,145,110,10,110,104,225,187,145,116,10,110,104,225,187,147,105,10,110,104,225,187,147,109,10,110,104,225,187,147,110,10,110,104,225,187,147,110,103,10,110,104,225,187,149,10,110,104,225,187,149,109,10,110,104,225,187,149,110,10,110,104,225,187,153,110,10,110,104,225,187,153,110,103,10,110,104,225,187,153,116,10,110,104,225,187,155,10,110,104,225,187,155,109,10,110,104,225,187,155,110,10,110,104,225,187,155,112,10,110,104,225,187,155,116,10,110,104,225,187,157,10,110,104,225,187,157,105,10,110,104,225,187,157,110,10,110,104,225,187,159,10,110,104,225,187,159,110,10,110,104,225,187,161,10,110,104,225,187,163,10,110,104,225,187,163,116,10,110,104,225,187,165,10,110,104,225,187,165,97,10,110,104,225,187,165,99,10,110,104,225,187,165,105,10,110,104,225,187,165,110,103,10,110,104,225,187,165,116,10,110,104,225,187,167,10,110,104,225,187,167,105,10,110,104,225,187,167,110,10,110,104,225,187,169,10,110,104,225,187,169,99,10,110,104,225,187,169,116,10,110,104,225,187,171,10,110,104,225,187,173,10,110,104,225,187,173,110,103,10,110,104,225,187,175,110,103,10,110,104,225,187,177,10,110,104,225,187,177,97,10,110,104,225,187,177,116,10,110,105,10,110,105,97,10,110,105,110,10,110,105,110,104,10,110,105,117,10,110,105,195,170,109,10,110,105,195,170,110,10,110,105,195,170,117,10,110,105,225,186,191,116,10,110,105,225,187,129,109,10,110,105,225,187,129,110,10,110,105,225,187,129,110,103,10,110,105,225,187,133,110,103,10,110,105,225,187,135,109,10,110,105,225,187,135,116,10,110,105,225,187,135,117,10,110,111,10,110,111,97,10,110,111,105,10,110,111,109,10,110,111,110,10,110,111,110,103,10,110,111,195,163,110,10,110,117,97,10,110,117,110,103,10,110,117,195,180,105,10,110,117,195,180,110,103,10,110,117,225,187,145,99,10,110,117,225,187,145,105,10,110,117,225,187,145,109,10,110,117,225,187,145,116,10,110,117,225,187,153,99,10,110,117,225,187,153,116,10,110,195,160,10,110,195,160,105,10,110,195,160,110,10,110,195,160,110,103,10,110,195,160,110,104,10,110,195,160,111,10,110,195,160,121,10,110,195,161,10,110,195,161,99,10,110,195,161,99,104,10,110,195,161,105,10,110,195,161,109,10,110,195,161,110,10,110,195,161,110,103,10,110,195,161,110,104,10,110,195,161,111,10,110,195,161,116,10,110,195,161,117,10,110,195,161,121,10,110,195,162,110,10,110,195,162,110,103,10,110,195,162,117,10,110,195,162,121,10,110,195,163,10,110,195,163,111,10,110,195,163,121,10,110,195,168,10,110,195,168,111,10,110,195,169,10,110,195,169,109,10,110,195,169,110,10,110,195,169,111,10,110,195,169,112,10,110,195,169,116,10,110,195,170,10,110,195,170,109,10,110,195,170,110,10,110,195,170,117,10,110,195,172,10,110,195,172,110,104,10,110,195,173,99,104,10,110,195,173,110,10,110,195,173,110,104,10,110,195,173,112,10,110,195,173,116,10,110,195,173,117,10,110,195,178,10,110,195,178,105,10,110,195,179,10,110,195,179,99,10,110,195,179,105,10,110,195,179,110,10,110,195,179,110,103,10,110,195,179,116,10,110,195,180,10,110,195,180,105,10,110,195,180,109,10,110,195,180,110,10,110,195,180,110,103,10,110,195,181,10,110,195,181,110,10,110,195,185,105,10,110,195,185,110,10,110,195,185,110,103,10,110,195,186,99,10,110,195,186,105,10,110,195,186,109,10,110,195,186,110,103,10,110,195,186,112,10,110,195,186,116,10,110,196,131,109,10,110,196,131,110,10,110,196,131,110,103,10,110,196,169,97,10,110,197,169,110,103,10,110,198,161,10,110,198,161,105,10,110,198,161,109,10,110,198,176,10,110,198,176,97,10,110,198,176,110,103,10,110,198,176,198,161,110,103,10,110,198,176,225,187,155,99,10,110,198,176,225,187,155,110,103,10,110,198,176,225,187,157,109,10,110,198,176,225,187,157,110,103,10,110,198,176,225,187,163,99,10,110,198,176,225,187,163,112,10,110,225,186,161,10,110,225,186,161,99,10,110,225,186,161,105,10,110,225,186,161,109,10,110,225,186,161,110,10,110,225,186,161,110,103,10,110,225,186,161,110,104,10,110,225,186,161,111,10,110,225,186,161,112,10,110,225,186,161,116,10,110,225,186,161,121,10,110,225,186,163,10,110,225,186,163,105,10,110,225,186,163,110,10,110,225,186,163,121,10,110,225,186,165,99,10,110,225,186,165,109,10,110,225,186,165,110,103,10,110,225,186,165,112,10,110,225,186,165,117,10,110,225,186,165,121,10,110,225,186,167,109,10,110,225,186,167,110,10,110,225,186,167,121,10,110,225,186,169,121,10,110,225,186,171,110,103,10,110,225,186,171,117,10,110,225,186,173,109,10,110,225,186,173,110,103,10,110,225,186,173,112,10,110,225,186,173,117,10,110,225,186,173,121,10,110,225,186,175,99,10,110,225,186,175,109,10,110,225,186,175,110,10,110,225,186,175,110,103,10,110,225,186,175,112,10,110,225,186,177,109,10,110,225,186,177,110,10,110,225,186,177,110,103,10,110,225,186,183,99,10,110,225,186,183,110,10,110,225,186,183,110,103,10,110,225,186,185,112,10,110,225,186,185,116,10,110,225,186,187,10,110,225,186,187,111,10,110,225,186,191,109,10,110,225,186,191,110,10,110,225,186,191,112,10,110,225,186,191,116,10,110,225,186,191,117,10,110,225,187,129,10,110,225,187,129,110,10,110,225,187,131,10,110,225,187,135,10,110,225,187,135,109,10,110,225,187,135,110,10,110,225,187,137,10,110,225,187,139,99,104,10,110,225,187,139,110,104,10,110,225,187,139,116,10,110,225,187,139,117,10,110,225,187,141,10,110,225,187,141,99,10,110,225,187,141,110,10,110,225,187,141,110,103,10,110,225,187,141,116,10,110,225,187,143,10,110,225,187,143,105,10,110,225,187,145,10,110,225,187,145,99,10,110,225,187,145,105,10,110,225,187,145,110,103,10,110,225,187,145,116,10,110,225,187,147,10,110,225,187,147,105,10,110,225,187,147,109,10,110,225,187,147,110,103,10,110,225,187,149,10,110,225,187,149,105,10,110,225,187,151,10,110,225,187,151,105,10,110,225,187,151,110,103,10,110,225,187,153,10,110,225,187,153,105,10,110,225,187,153,109,10,110,225,187,153,110,10,110,225,187,153,112,10,110,225,187,153,116,10,110,225,187,155,10,110,225,187,155,105,10,110,225,187,155,112,10,110,225,187,155,116,10,110,225,187,157,10,110,225,187,157,109,10,110,225,187,159,10,110,225,187,161,10,110,225,187,161,109,10,110,225,187,163,10,110,225,187,163,112,10,110,225,187,165,10,110,225,187,165,99,10,110,225,187,167,97,10,110,225,187,169,97,10,110,225,187,169,99,10,110,225,187,169,116,10,110,225,187,171,110,103,10,110,225,187,173,97,10,110,225,187,175,10,110,225,187,175,97,10,110,225,187,177,10,110,225,187,177,99,10,110,225,187,177,110,103,10,111,10,111,97,10,111,97,105,10,111,97,110,10,111,97,110,103,10,111,97,110,104,10,111,101,10,111,105,10,111,109,10,111,110,103,10,111,195,160,10,111,195,160,109,10,111,195,160,110,103,10,111,195,160,110,104,10,111,195,161,99,10,111,195,161,99,104,10,111,195,161,105,10,111,195,161,110,10,111,195,161,116,10,111,195,169,10,111,196,131,109,10,111,196,131,110,103,10,111,225,186,161,99,104,10,111,225,186,161,105,10,111,225,186,161,112,10,111,225,186,163,105,10,111,225,186,163,110,10,111,225,186,175,116,10,111,225,186,177,110,10,111,225,186,179,110,10,111,225,186,179,110,103,10,111,225,186,183,116,10,111,225,186,185,10,111,225,186,187,10,112,97,10,112,97,108,196,131,110,103,10,112,97,110,10,112,97,111,10,112,101,10,112,104,97,10,112,104,97,105,10,112,104,97,110,103,10,112,104,97,110,104,10,112,104,97,111,10,112,104,97,117,10,112,104,97,121,10,112,104,101,10,112,104,101,110,10,112,104,101,111,10,112,104,105,10,112,104,105,109,10,112,104,105,110,10,112,104,105,110,104,10,112,104,105,117,10,112,104,105,195,170,110,10,112,104,105,195,170,117,10,112,104,105,225,186,191,109,10,112,104,105,225,186,191,110,10,112,104,105,225,186,191,116,10,112,104,105,225,186,191,117,10,112,104,105,225,187,129,110,10,112,104,105,225,187,135,110,10,112,104,105,225,187,135,116,10,112,104,111,10,112,104,111,105,10,112,104,111,109,10,112,104,111,110,103,10,112,104,117,10,112,104,117,105,10,112,104,117,110,10,112,104,117,110,103,10,112,104,117,121,10,112,104,195,160,10,112,104,195,160,109,10,112,104,195,160,110,10,112,104,195,160,110,103,10,112,104,195,160,110,104,10,112,104,195,160,111,10,112,104,195,161,10,112,104,195,161,99,10,112,104,195,161,99,104,10,112,104,195,161,105,10,112,104,195,161,110,10,112,104,195,161,111,10,112,104,195,161,112,10,112,104,195,161,116,10,112,104,195,162,110,10,112,104,195,162,121,10,112,104,195,168,10,112,104,195,168,110,10,112,104,195,168,110,103,10,112,104,195,168,111,10,112,104,195,169,110,103,10,112,104,195,169,112,10,112,104,195,169,116,10,112,104,195,170,10,112,104,195,170,110,10,112,104,195,172,10,112,104,195,172,97,10,112,104,195,172,110,104,10,112,104,195,173,10,112,104,195,173,97,10,112,104,195,173,99,104,10,112,104,195,173,109,10,112,104,195,173,110,104,10,112,104,195,178,10,112,104,195,178,105,10,112,104,195,178,110,103,10,112,104,195,179,10,112,104,195,179,99,10,112,104,195,179,110,103,10,112,104,195,179,116,10,112,104,195,180,10,112,104,195,180,105,10,112,104,195,180,109,10,112,104,195,180,110,103,10,112,104,195,185,10,112,104,195,185,110,10,112,104,195,185,110,103,10,112,104,195,186,10,112,104,195,186,99,10,112,104,195,186,110,10,112,104,195,186,110,103,10,112,104,195,186,116,10,112,104,196,131,109,10,112,104,196,131,110,10,112,104,196,131,110,103,10,112,104,196,169,110,104,10,112,104,197,169,10,112,104,198,161,10,112,104,198,161,105,10,112,104,198,161,110,10,112,104,198,176,110,103,10,112,104,198,176,198,161,110,103,10,112,104,198,176,225,187,155,99,10,112,104,198,176,225,187,155,110,10,112,104,198,176,225,187,155,110,103,10,112,104,198,176,225,187,157,110,103,10,112,104,198,176,225,187,161,110,10,112,104,198,176,225,187,163,110,103,10,112,104,198,176,225,187,163,117,10,112,104,225,186,161,99,104,10,112,104,225,186,161,109,10,112,104,225,186,161,110,10,112,104,225,186,161,110,103,10,112,104,225,186,161,116,10,112,104,225,186,163,10,112,104,225,186,163,105,10,112,104,225,186,163,110,10,112,104,225,186,163,110,103,10,112,104,225,186,163,121,10,112,104,225,186,165,110,10,112,104,225,186,165,112,10,112,104,225,186,165,116,10,112,104,225,186,167,109,10,112,104,225,186,167,110,10,112,104,225,186,169,109,10,112,104,225,186,169,110,10,112,104,225,186,169,121,10,112,104,225,186,171,110,10,112,104,225,186,171,117,10,112,104,225,186,173,110,10,112,104,225,186,173,112,10,112,104,225,186,173,116,10,112,104,225,186,175,99,10,112,104,225,186,175,110,10,112,104,225,186,175,112,10,112,104,225,186,175,116,10,112,104,225,186,179,110,103,10,112,104,225,186,185,116,10,112,104,225,186,191,10,112,104,225,186,191,99,104,10,112,104,225,186,191,116,10,112,104,225,187,129,10,112,104,225,187,129,110,104,10,112,104,225,187,129,117,10,112,104,225,187,133,110,10,112,104,225,187,133,117,10,112,104,225,187,135,10,112,104,225,187,135,110,104,10,112,104,225,187,135,116,10,112,104,225,187,137,10,112,104,225,187,137,110,104,10,112,104,225,187,139,10,112,104,225,187,139,97,10,112,104,225,187,139,99,104,10,112,104,225,187,139,116,10,112,104,225,187,139,117,10,112,104,225,187,141,110,103,10,112,104,225,187,141,116,10,112,104,225,187,143,110,103,10,112,104,225,187,145,10,112,104,225,187,145,99,10,112,104,225,187,145,105,10,112,104,225,187,145,112,10,112,104,225,187,147,10,112,104,225,187,147,109,10,112,104,225,187,147,110,10,112,104,225,187,147,110,103,10,112,104,225,187,149,10,112,104,225,187,149,105,10,112,104,225,187,149,110,103,10,112,104,225,187,151,110,103,10,112,104,225,187,153,110,103,10,112,104,225,187,155,105,10,112,104,225,187,155,116,10,112,104,225,187,157,10,112,104,225,187,159,10,112,104,225,187,161,110,10,112,104,225,187,165,10,112,104,225,187,165,99,10,112,104,225,187,165,110,103,10,112,104,225,187,165,116,10,112,104,225,187,167,10,112,104,225,187,167,105,10,112,104,225,187,169,97,10,112,104,225,187,169,99,10,112,104,225,187,169,116,10,112,104,225,187,171,110,103,10,112,104,225,187,177,97,10,112,104,225,187,177,116,10,112,105,10,112,105,110,10,112,105,110,103,10,112,111,109,10,112,117,10,112,195,161,99,10,112,195,161,112,10,112,195,170,10,112,195,180,10,112,195,180,110,103,10,112,198,161,10,113,117,97,10,113,117,97,105,10,113,117,97,110,10,113,117,97,110,103,10,113,117,97,110,104,10,113,117,97,111,10,113,117,97,117,10,113,117,97,121,10,113,117,101,10,113,117,101,110,10,113,117,101,111,10,113,117,111,195,160,110,103,10,113,117,111,225,186,161,110,103,10,113,117,111,225,186,175,116,10,113,117,121,10,113,117,121,195,170,110,10,113,117,121,225,186,191,110,10,113,117,121,225,186,191,116,10,113,117,121,225,187,129,110,10,113,117,121,225,187,131,110,10,113,117,121,225,187,135,110,10,113,117,121,225,187,135,116,10,113,117,195,160,10,113,117,195,160,105,10,113,117,195,160,110,10,113,117,195,160,110,103,10,113,117,195,160,110,104,10,113,117,195,160,111,10,113,117,195,160,117,10,113,117,195,160,121,10,113,117,195,161,10,113,117,195,161,99,10,113,117,195,161,99,104,10,113,117,195,161,105,10,113,117,195,161,110,10,113,117,195,161,110,103,10,113,117,195,161,110,104,10,113,117,195,161,111,10,113,117,195,161,116,10,113,117,195,161,117,10,113,117,195,162,110,10,113,117,195,162,121,10,113,117,195,163,110,103,10,113,117,195,168,10,113,117,195,168,110,10,113,117,195,168,111,10,113,117,195,169,10,113,117,195,169,110,10,113,117,195,169,111,10,113,117,195,169,116,10,113,117,195,170,10,113,117,195,170,110,10,113,117,195,173,116,10,113,117,195,189,10,113,117,195,189,110,104,10,113,117,195,189,116,10,113,117,196,131,109,10,113,117,196,131,110,10,113,117,196,131,110,103,10,113,117,198,161,10,113,117,225,186,161,10,113,117,225,186,161,99,10,113,117,225,186,161,99,104,10,113,117,225,186,161,105,10,113,117,225,186,161,110,103,10,113,117,225,186,161,110,104,10,113,117,225,186,161,116,10,113,117,225,186,161,117,10,113,117,225,186,161,121,10,113,117,225,186,163,10,113,117,225,186,163,105,10,113,117,225,186,163,110,10,113,117,225,186,163,110,103,10,113,117,225,186,163,121,10,113,117,225,186,165,99,10,113,117,225,186,165,110,10,113,117,225,186,165,116,10,113,117,225,186,165,121,10,113,117,225,186,167,110,10,113,117,225,186,167,110,103,10,113,117,225,186,167,121,10,113,117,225,186,169,110,10,113,117,225,186,169,110,103,10,113,117,225,186,169,121,10,113,117,225,186,171,110,10,113,117,225,186,171,121,10,113,117,225,186,173,110,10,113,117,225,186,173,116,10,113,117,225,186,173,121,10,113,117,225,186,175,99,10,113,117,225,186,175,109,10,113,117,225,186,175,110,10,113,117,225,186,175,112,10,113,117,225,186,175,116,10,113,117,225,186,177,110,10,113,117,225,186,179,109,10,113,117,225,186,179,110,103,10,113,117,225,186,183,99,10,113,117,225,186,183,109,10,113,117,225,186,183,110,10,113,117,225,186,183,110,103,10,113,117,225,186,183,112,10,113,117,225,186,183,116,10,113,117,225,186,185,111,10,113,117,225,186,185,116,10,113,117,225,186,187,10,113,117,225,186,189,10,113,117,225,186,191,10,113,117,225,186,191,116,10,113,117,225,186,191,117,10,113,117,225,187,129,110,104,10,113,117,225,187,129,117,10,113,117,225,187,135,10,113,117,225,187,135,99,104,10,113,117,225,187,135,110,10,113,117,225,187,135,110,104,10,113,117,225,187,135,116,10,113,117,225,187,139,116,10,113,117,225,187,145,99,10,113,117,225,187,155,10,113,117,225,187,157,10,113,117,225,187,159,10,113,117,225,187,179,10,113,117,225,187,179,110,104,10,113,117,225,187,181,10,113,117,225,187,181,116,10,113,117,225,187,183,10,113,117,225,187,183,110,104,10,113,117,225,187,185,10,114,97,10,114,97,105,10,114,97,109,10,114,97,110,10,114,97,110,103,10,114,97,110,104,10,114,97,111,10,114,97,117,10,114,97,121,10,114,101,10,114,101,110,10,114,101,110,103,10,114,101,111,10,114,105,10,114,105,97,10,114,105,109,10,114,105,110,10,114,105,110,104,10,114,105,117,10,114,105,195,170,110,103,10,114,105,195,170,117,10,114,105,225,186,191,116,10,114,105,225,186,191,117,10,114,105,225,187,129,109,10,114,105,225,187,129,110,103,10,114,105,225,187,135,116,10,114,111,10,114,111,97,10,114,111,105,10,114,111,109,10,114,111,110,103,10,114,117,10,114,117,97,10,114,117,109,10,114,117,110,10,114,117,110,103,10,114,117,225,187,145,99,10,114,117,225,187,145,105,10,114,117,225,187,147,105,10,114,117,225,187,147,110,103,10,114,117,225,187,149,105,10,114,117,225,187,151,110,103,10,114,117,225,187,153,109,10,114,117,225,187,153,110,103,10,114,117,225,187,153,116,10,114,195,160,10,114,195,160,105,10,114,195,160,110,10,114,195,160,110,103,10,114,195,160,110,104,10,114,195,160,111,10,114,195,160,121,10,114,195,161,10,114,195,161,99,10,114,195,161,99,104,10,114,195,161,105,10,114,195,161,109,10,114,195,161,110,10,114,195,161,110,103,10,114,195,161,111,10,114,195,161,112,10,114,195,161,116,10,114,195,161,121,10,114,195,162,109,10,114,195,162,110,10,114,195,162,117,10,114,195,162,121,10,114,195,163,10,114,195,163,105,10,114,195,163,110,104,10,114,195,163,111,10,114,195,163,121,10,114,195,168,10,114,195,168,109,10,114,195,168,110,10,114,195,168,111,10,114,195,169,10,114,195,169,110,10,114,195,169,111,10,114,195,169,116,10,114,195,170,10,114,195,170,110,10,114,195,170,117,10,114,195,172,10,114,195,172,97,10,114,195,172,110,104,10,114,195,172,117,10,114,195,173,10,114,195,173,99,104,10,114,195,173,116,10,114,195,173,117,10,114,195,178,10,114,195,178,105,10,114,195,178,109,10,114,195,178,110,103,10,114,195,179,10,114,195,179,99,10,114,195,179,105,10,114,195,179,109,10,114,195,179,110,10,114,195,179,110,103,10,114,195,179,116,10,114,195,180,10,114,195,180,109,10,114,195,180,110,103,10,114,195,181,10,114,195,181,105,10,114,195,185,10,114,195,185,97,10,114,195,185,109,10,114,195,185,110,10,114,195,185,110,103,10,114,195,186,10,114,195,186,99,10,114,195,186,105,10,114,195,186,109,10,114,195,186,110,10,114,195,186,110,103,10,114,195,186,112,10,114,195,186,116,10,114,196,131,109,10,114,196,131,110,10,114,196,131,110,103,10,114,196,169,10,114,197,169,10,114,197,169,97,10,114,198,161,10,114,198,161,105,10,114,198,161,109,10,114,198,161,110,10,114,198,176,10,114,198,176,97,10,114,198,176,110,103,10,114,198,176,198,161,105,10,114,198,176,198,161,109,10,114,198,176,198,161,110,103,10,114,198,176,225,187,155,99,10,114,198,176,225,187,155,105,10,114,198,176,225,187,155,109,10,114,198,176,225,187,155,110,10,114,198,176,225,187,157,105,10,114,198,176,225,187,157,109,10,114,198,176,225,187,157,110,10,114,198,176,225,187,157,110,103,10,114,198,176,225,187,159,105,10,114,198,176,225,187,161,105,10,114,198,176,225,187,163,105,10,114,198,176,225,187,163,110,10,114,198,176,225,187,163,116,10,114,198,176,225,187,163,117,10,114,225,186,161,10,114,225,186,161,99,10,114,225,186,161,99,104,10,114,225,186,161,110,10,114,225,186,161,110,103,10,114,225,186,161,111,10,114,225,186,161,112,10,114,225,186,161,116,10,114,225,186,161,121,10,114,225,186,163,10,114,225,186,163,105,10,114,225,186,163,110,104,10,114,225,186,163,111,10,114,225,186,163,121,10,114,225,186,165,109,10,114,225,186,165,110,10,114,225,186,165,112,10,114,225,186,165,116,10,114,225,186,167,109,10,114,225,186,167,110,10,114,225,186,167,117,10,114,225,186,167,121,10,114,225,186,169,109,10,114,225,186,169,121,10,114,225,186,171,109,10,114,225,186,171,121,10,114,225,186,173,109,10,114,225,186,173,110,10,114,225,186,173,112,10,114,225,186,173,116,10,114,225,186,175,99,10,114,225,186,175,109,10,114,225,186,175,110,10,114,225,186,175,112,10,114,225,186,175,116,10,114,225,186,177,109,10,114,225,186,177,110,10,114,225,186,177,110,103,10,114,225,186,183,110,103,10,114,225,186,183,116,10,114,225,186,185,111,10,114,225,186,185,116,10,114,225,186,187,10,114,225,186,187,110,103,10,114,225,186,187,111,10,114,225,186,189,10,114,225,186,191,10,114,225,186,191,99,104,10,114,225,186,191,110,10,114,225,186,191,112,10,114,225,186,191,116,10,114,225,187,129,10,114,225,187,129,110,10,114,225,187,129,117,10,114,225,187,131,10,114,225,187,131,110,104,10,114,225,187,133,10,114,225,187,135,10,114,225,187,135,99,104,10,114,225,187,135,110,10,114,225,187,135,112,10,114,225,187,135,116,10,114,225,187,135,117,10,114,225,187,137,10,114,225,187,137,97,10,114,225,187,137,110,104,10,114,225,187,139,97,10,114,225,187,139,99,104,10,114,225,187,139,110,10,114,225,187,139,116,10,114,225,187,141,10,114,225,187,141,99,10,114,225,187,141,105,10,114,225,187,141,109,10,114,225,187,141,116,10,114,225,187,143,10,114,225,187,143,109,10,114,225,187,143,110,10,114,225,187,145,99,10,114,225,187,145,105,10,114,225,187,145,110,10,114,225,187,145,110,103,10,114,225,187,145,112,10,114,225,187,145,116,10,114,225,187,147,10,114,225,187,147,105,10,114,225,187,147,109,10,114,225,187,147,110,103,10,114,225,187,149,10,114,225,187,149,105,10,114,225,187,149,110,103,10,114,225,187,151,10,114,225,187,151,105,10,114,225,187,151,110,103,10,114,225,187,153,10,114,225,187,153,99,10,114,225,187,153,109,10,114,225,187,153,110,10,114,225,187,153,110,103,10,114,225,187,153,112,10,114,225,187,155,10,114,225,187,155,109,10,114,225,187,155,116,10,114,225,187,157,10,114,225,187,157,105,10,114,225,187,157,109,10,114,225,187,157,110,10,114,225,187,159,10,114,225,187,159,109,10,114,225,187,159,110,10,114,225,187,161,10,114,225,187,161,110,10,114,225,187,163,10,114,225,187,163,105,10,114,225,187,163,109,10,114,225,187,163,110,10,114,225,187,163,112,10,114,225,187,163,116,10,114,225,187,165,99,10,114,225,187,165,105,10,114,225,187,165,110,103,10,114,225,187,165,116,10,114,225,187,167,10,114,225,187,167,97,10,114,225,187,167,105,10,114,225,187,167,110,10,114,225,187,167,110,103,10,114,225,187,169,97,10,114,225,187,169,99,10,114,225,187,169,116,10,114,225,187,171,110,103,10,114,225,187,173,97,10,114,225,187,173,110,103,10,114,225,187,175,97,10,114,225,187,177,97,10,114,225,187,177,99,10,115,97,10,115,97,105,10,115,97,109,10,115,97,110,10,115,97,110,103,10,115,97,110,104,10,115,97,111,10,115,97,117,10,115,97,121,10,115,101,10,115,101,110,10,115,101,111,10,115,105,10,115,105,109,10,115,105,110,10,115,105,110,104,10,115,105,117,10,115,105,195,170,110,103,10,115,105,195,170,117,10,115,105,225,186,191,116,10,115,105,225,187,131,109,10,115,105,225,187,131,110,103,10,115,105,225,187,133,110,10,115,111,10,115,111,97,10,115,111,105,10,115,111,110,10,115,111,110,103,10,115,111,111,110,103,10,115,111,195,160,10,115,111,195,160,105,10,115,111,195,161,105,10,115,111,195,161,110,10,115,111,195,161,116,10,115,111,195,179,99,10,115,111,225,186,161,110,10,115,111,225,186,161,110,103,10,115,111,225,186,161,116,10,115,117,10,115,117,105,10,115,117,109,10,115,117,110,10,115,117,110,103,10,115,117,121,10,115,117,121,225,187,131,110,10,115,117,121,225,187,133,110,10,115,117,195,170,10,115,117,195,180,110,10,115,117,195,180,110,103,10,115,117,195,189,10,115,117,195,189,116,10,115,117,225,186,165,116,10,115,117,225,187,145,105,10,115,117,225,187,145,116,10,115,117,225,187,147,110,103,10,115,117,225,187,181,116,10,115,195,160,10,115,195,160,105,10,115,195,160,109,10,115,195,160,110,10,115,195,160,110,103,10,115,195,160,110,104,10,115,195,160,111,10,115,195,161,10,115,195,161,99,10,115,195,161,99,104,10,115,195,161,105,10,115,195,161,109,10,115,195,161,110,10,115,195,161,110,103,10,115,195,161,110,104,10,115,195,161,111,10,115,195,161,112,10,115,195,161,116,10,115,195,161,117,10,115,195,162,109,10,115,195,162,110,10,115,195,162,117,10,115,195,162,121,10,115,195,163,10,115,195,163,105,10,115,195,168,10,115,195,168,111,10,115,195,169,99,10,115,195,169,109,10,115,195,169,116,10,115,195,170,10,115,195,170,110,10,115,195,170,110,104,10,115,195,170,117,10,115,195,172,10,115,195,172,110,104,10,115,195,173,110,104,10,115,195,173,116,10,115,195,178,10,115,195,178,105,10,115,195,178,109,10,115,195,178,110,103,10,115,195,179,99,10,115,195,179,105,10,115,195,179,109,10,115,195,179,110,10,115,195,179,110,103,10,115,195,179,116,10,115,195,180,10,115,195,180,105,10,115,195,180,110,103,10,115,195,181,105,10,115,195,181,110,103,10,115,195,185,10,115,195,185,105,10,115,195,185,109,10,115,195,185,110,103,10,115,195,186,10,115,195,186,99,10,115,195,186,110,10,115,195,186,110,103,10,115,195,186,112,10,115,195,186,116,10,115,196,131,109,10,115,196,131,110,10,115,196,131,110,103,10,115,196,169,10,115,197,169,110,103,10,115,198,161,10,115,198,161,109,10,115,198,161,110,10,115,198,176,10,115,198,176,97,10,115,198,176,110,103,10,115,198,176,117,10,115,198,176,198,161,110,103,10,115,198,176,225,187,155,110,103,10,115,198,176,225,187,155,116,10,115,198,176,225,187,157,110,10,115,198,176,225,187,157,110,103,10,115,198,176,225,187,159,105,10,115,198,176,225,187,163,110,103,10,115,198,176,225,187,163,116,10,115,225,186,161,10,115,225,186,161,99,104,10,115,225,186,161,109,10,115,225,186,161,110,10,115,225,186,161,111,10,115,225,186,161,112,10,115,225,186,161,116,10,115,225,186,163,10,115,225,186,163,105,10,115,225,186,163,110,10,115,225,186,163,110,103,10,115,225,186,163,110,104,10,115,225,186,163,111,10,115,225,186,163,121,10,115,225,186,165,109,10,115,225,186,165,110,10,115,225,186,165,112,10,115,225,186,165,116,10,115,225,186,165,117,10,115,225,186,165,121,10,115,225,186,167,109,10,115,225,186,167,110,10,115,225,186,167,117,10,115,225,186,167,121,10,115,225,186,169,109,10,115,225,186,169,110,10,115,225,186,169,121,10,115,225,186,171,109,10,115,225,186,173,109,10,115,225,186,173,112,10,115,225,186,173,116,10,115,225,186,173,117,10,115,225,186,173,121,10,115,225,186,175,99,10,115,225,186,175,109,10,115,225,186,175,110,10,115,225,186,175,110,103,10,115,225,186,175,112,10,115,225,186,175,116,10,115,225,186,177,110,103,10,115,225,186,181,110,10,115,225,186,183,99,10,115,225,186,183,109,10,115,225,186,183,116,10,115,225,186,185,10,115,225,186,185,109,10,115,225,186,185,111,10,115,225,186,187,10,115,225,186,187,110,10,115,225,186,189,10,115,225,186,191,110,10,115,225,186,191,112,10,115,225,186,191,117,10,115,225,187,129,10,115,225,187,129,110,10,115,225,187,131,10,115,225,187,131,110,104,10,115,225,187,133,10,115,225,187,135,10,115,225,187,135,116,10,115,225,187,137,10,115,225,187,137,97,10,115,225,187,137,110,104,10,115,225,187,139,10,115,225,187,139,97,10,115,225,187,139,99,104,10,115,225,187,139,116,10,115,225,187,141,10,115,225,187,141,99,10,115,225,187,141,109,10,115,225,187,141,116,10,115,225,187,143,10,115,225,187,143,105,10,115,225,187,145,10,115,225,187,145,99,10,115,225,187,145,110,103,10,115,225,187,145,112,10,115,225,187,145,116,10,115,225,187,147,10,115,225,187,147,105,10,115,225,187,147,110,10,115,225,187,147,110,103,10,115,225,187,149,10,115,225,187,149,105,10,115,225,187,149,110,103,10,115,225,187,151,10,115,225,187,153,10,115,225,187,153,112,10,115,225,187,153,116,10,115,225,187,155,10,115,225,187,155,105,10,115,225,187,155,109,10,115,225,187,155,110,10,115,225,187,155,116,10,115,225,187,157,10,115,225,187,157,109,10,115,225,187,157,110,10,115,225,187,159,10,115,225,187,159,105,10,115,225,187,159,110,10,115,225,187,161,10,115,225,187,163,10,115,225,187,163,105,10,115,225,187,165,10,115,225,187,165,97,10,115,225,187,165,99,10,115,225,187,165,109,10,115,225,187,165,110,10,115,225,187,165,112,10,115,225,187,165,116,10,115,225,187,167,97,10,115,225,187,167,105,10,115,225,187,167,110,103,10,115,225,187,169,10,115,225,187,169,97,10,115,225,187,169,99,10,115,225,187,169,116,10,115,225,187,171,110,10,115,225,187,171,110,103,10,115,225,187,173,10,115,225,187,173,97,10,115,225,187,173,110,103,10,115,225,187,173,117,10,115,225,187,175,97,10,115,225,187,175,110,103,10,115,225,187,177,10,115,225,187,177,99,10,115,225,187,177,110,103,10,115,225,187,177,116,10,116,97,10,116,97,105,10,116,97,109,10,116,97,110,10,116,97,110,103,10,116,97,110,104,10,116,97,111,10,116,97,121,10,116,101,10,116,101,109,10,116,101,110,10,116,101,110,103,10,116,101,111,10,116,104,97,10,116,104,97,105,10,116,104,97,109,10,116,104,97,110,10,116,104,97,110,103,10,116,104,97,110,104,10,116,104,97,111,10,116,104,97,117,10,116,104,97,121,10,116,104,101,10,116,104,101,110,10,116,104,101,111,10,116,104,105,10,116,104,105,97,10,116,104,105,110,10,116,104,105,110,104,10,116,104,105,117,10,116,104,105,195,170,109,10,116,104,105,195,170,110,10,116,104,105,195,170,110,103,10,116,104,105,195,170,117,10,116,104,105,225,186,191,99,10,116,104,105,225,186,191,110,10,116,104,105,225,186,191,112,10,116,104,105,225,186,191,116,10,116,104,105,225,186,191,117,10,116,104,105,225,187,129,109,10,116,104,105,225,187,129,110,10,116,104,105,225,187,129,110,103,10,116,104,105,225,187,129,117,10,116,104,105,225,187,131,109,10,116,104,105,225,187,131,110,10,116,104,105,225,187,131,117,10,116,104,105,225,187,135,110,10,116,104,105,225,187,135,112,10,116,104,105,225,187,135,116,10,116,104,105,225,187,135,117,10,116,104,111,10,116,104,111,97,10,116,104,111,97,105,10,116,104,111,97,110,103,10,116,104,111,105,10,116,104,111,109,10,116,104,111,110,10,116,104,111,110,103,10,116,104,111,195,160,10,116,104,111,195,160,110,10,116,104,111,195,161,10,116,104,111,195,161,105,10,116,104,111,195,161,110,10,116,104,111,195,161,110,103,10,116,104,111,195,161,116,10,116,104,111,196,131,110,10,116,104,111,225,186,161,105,10,116,104,111,225,186,161,116,10,116,104,111,225,186,163,10,116,104,111,225,186,163,105,10,116,104,111,225,186,163,110,103,10,116,104,111,225,186,175,110,103,10,116,104,111,225,186,175,116,10,116,104,117,10,116,104,117,97,10,116,104,117,105,10,116,104,117,109,10,116,104,117,110,10,116,104,117,110,103,10,116,104,117,121,195,170,110,10,116,104,117,121,225,186,191,116,10,116,104,117,121,225,187,129,110,10,116,104,117,195,170,10,116,104,117,195,180,110,10,116,104,117,195,189,10,116,104,117,225,186,167,110,10,116,104,117,225,186,171,110,10,116,104,117,225,186,173,110,10,116,104,117,225,186,173,116,10,116,104,117,225,186,191,10,116,104,117,225,187,131,10,116,104,117,225,187,145,99,10,116,104,117,225,187,145,110,10,116,104,117,225,187,147,110,10,116,104,117,225,187,147,110,103,10,116,104,117,225,187,149,110,103,10,116,104,117,225,187,151,110,10,116,104,117,225,187,153,99,10,116,104,117,225,187,153,109,10,116,104,117,225,187,159,10,116,104,117,225,187,179,10,116,104,117,225,187,181,10,116,104,117,225,187,183,10,116,104,195,160,10,116,104,195,160,105,10,116,104,195,160,109,10,116,104,195,160,110,104,10,116,104,195,160,111,10,116,104,195,160,121,10,116,104,195,161,10,116,104,195,161,99,10,116,104,195,161,99,104,10,116,104,195,161,105,10,116,104,195,161,109,10,116,104,195,161,110,10,116,104,195,161,110,103,10,116,104,195,161,110,104,10,116,104,195,161,111,10,116,104,195,161,112,10,116,104,195,161,117,10,116,104,195,161,121,10,116,104,195,162,109,10,116,104,195,162,110,10,116,104,195,162,117,10,116,104,195,162,121,10,116,104,195,163,105,10,116,104,195,168,10,116,104,195,168,109,10,116,104,195,168,110,10,116,104,195,168,111,10,116,104,195,169,10,116,104,195,169,112,10,116,104,195,169,116,10,116,104,195,170,10,116,104,195,170,109,10,116,104,195,170,110,104,10,116,104,195,170,117,10,116,104,195,172,10,116,104,195,172,97,10,116,104,195,172,110,10,116,104,195,172,110,104,10,116,104,195,172,117,10,116,104,195,173,10,116,104,195,173,97,10,116,104,195,173,99,104,10,116,104,195,173,109,10,116,104,195,173,110,10,116,104,195,173,110,104,10,116,104,195,173,112,10,116,104,195,173,116,10,116,104,195,178,10,116,104,195,178,105,10,116,104,195,178,109,10,116,104,195,178,110,103,10,116,104,195,179,10,116,104,195,179,99,10,116,104,195,179,105,10,116,104,195,179,112,10,116,104,195,179,116,10,116,104,195,180,10,116,104,195,180,105,10,116,104,195,180,110,10,116,104,195,180,110,103,10,116,104,195,181,110,103,10,116,104,195,185,10,116,104,195,185,97,10,116,104,195,185,105,10,116,104,195,185,109,10,116,104,195,185,110,103,10,116,104,195,186,10,116,104,195,186,99,10,116,104,195,186,105,10,116,104,195,186,110,103,10,116,104,195,186,116,10,116,104,196,131,109,10,116,104,196,131,110,10,116,104,196,131,110,103,10,116,104,197,169,110,103,10,116,104,198,161,10,116,104,198,161,105,10,116,104,198,161,109,10,116,104,198,161,110,10,116,104,198,176,10,116,104,198,176,97,10,116,104,198,176,110,103,10,116,104,198,176,198,161,110,103,10,116,104,198,176,225,187,155,99,10,116,104,198,176,225,187,155,116,10,116,104,198,176,225,187,157,110,10,116,104,198,176,225,187,157,110,103,10,116,104,198,176,225,187,159,110,103,10,116,104,198,176,225,187,161,105,10,116,104,198,176,225,187,161,110,10,116,104,198,176,225,187,163,99,10,116,104,198,176,225,187,163,110,103,10,116,104,198,176,225,187,163,116,10,116,104,225,186,161,99,10,116,104,225,186,161,99,104,10,116,104,225,186,161,110,104,10,116,104,225,186,161,111,10,116,104,225,186,161,112,10,116,104,225,186,163,10,116,104,225,186,163,105,10,116,104,225,186,163,109,10,116,104,225,186,163,110,10,116,104,225,186,163,110,103,10,116,104,225,186,163,110,104,10,116,104,225,186,163,111,10,116,104,225,186,163,121,10,116,104,225,186,165,109,10,116,104,225,186,165,112,10,116,104,225,186,165,116,10,116,104,225,186,165,117,10,116,104,225,186,165,121,10,116,104,225,186,167,109,10,116,104,225,186,167,110,10,116,104,225,186,167,117,10,116,104,225,186,167,121,10,116,104,225,186,169,109,10,116,104,225,186,169,110,10,116,104,225,186,169,117,10,116,104,225,186,171,109,10,116,104,225,186,171,110,10,116,104,225,186,173,109,10,116,104,225,186,173,110,10,116,104,225,186,173,112,10,116,104,225,186,173,116,10,116,104,225,186,175,99,10,116,104,225,186,175,109,10,116,104,225,186,175,110,10,116,104,225,186,175,110,103,10,116,104,225,186,175,112,10,116,104,225,186,175,116,10,116,104,225,186,177,110,10,116,104,225,186,177,110,103,10,116,104,225,186,179,109,10,116,104,225,186,179,110,103,10,116,104,225,186,183,110,103,10,116,104,225,186,185,110,10,116,104,225,186,185,111,10,116,104,225,186,185,112,10,116,104,225,186,187,10,116,104,225,186,187,111,10,116,104,225,186,189,10,116,104,225,186,191,10,116,104,225,186,191,99,104,10,116,104,225,186,191,112,10,116,104,225,186,191,116,10,116,104,225,187,129,10,116,104,225,187,129,109,10,116,104,225,187,129,117,10,116,104,225,187,131,10,116,104,225,187,131,117,10,116,104,225,187,135,10,116,104,225,187,135,110,10,116,104,225,187,137,10,116,104,225,187,137,110,104,10,116,104,225,187,137,117,10,116,104,225,187,139,10,116,104,225,187,139,99,104,10,116,104,225,187,139,110,104,10,116,104,225,187,139,116,10,116,104,225,187,139,117,10,116,104,225,187,141,10,116,104,225,187,141,99,10,116,104,225,187,141,116,10,116,104,225,187,143,10,116,104,225,187,143,105,10,116,104,225,187,143,109,10,116,104,225,187,145,10,116,104,225,187,145,99,10,116,104,225,187,145,105,10,116,104,225,187,145,110,10,116,104,225,187,145,110,103,10,116,104,225,187,145,116,10,116,104,225,187,147,10,116,104,225,187,147,105,10,116,104,225,187,147,109,10,116,104,225,187,147,110,10,116,104,225,187,149,10,116,104,225,187,149,105,10,116,104,225,187,149,110,10,116,104,225,187,153,99,10,116,104,225,187,153,110,10,116,104,225,187,153,112,10,116,104,225,187,155,10,116,104,225,187,155,116,10,116,104,225,187,157,10,116,104,225,187,157,105,10,116,104,225,187,157,110,10,116,104,225,187,159,10,116,104,225,187,163,10,116,104,225,187,163,116,10,116,104,225,187,165,10,116,104,225,187,165,99,10,116,104,225,187,165,105,10,116,104,225,187,165,110,103,10,116,104,225,187,165,112,10,116,104,225,187,165,116,10,116,104,225,187,167,10,116,104,225,187,167,97,10,116,104,225,187,167,105,10,116,104,225,187,167,109,10,116,104,225,187,167,110,103,10,116,104,225,187,169,10,116,104,225,187,169,99,10,116,104,225,187,171,10,116,104,225,187,171,97,10,116,104,225,187,171,110,103,10,116,104,225,187,173,10,116,104,225,187,173,97,10,116,104,225,187,175,110,103,10,116,104,225,187,177,10,116,104,225,187,177,99,10,116,105,10,116,105,97,10,116,105,109,10,116,105,110,10,116,105,110,104,10,116,105,117,10,116,105,118,105,10,116,105,195,170,109,10,116,105,195,170,110,10,116,105,195,170,110,103,10,116,105,195,170,117,10,116,105,225,186,191,99,10,116,105,225,186,191,109,10,116,105,225,186,191,110,10,116,105,225,186,191,110,103,10,116,105,225,186,191,112,10,116,105,225,186,191,116,10,116,105,225,186,191,117,10,116,105,225,187,129,109,10,116,105,225,187,129,110,10,116,105,225,187,129,117,10,116,105,225,187,131,117,10,116,105,225,187,133,110,10,116,105,225,187,133,117,10,116,105,225,187,135,99,10,116,105,225,187,135,109,10,116,105,225,187,135,110,10,116,105,225,187,135,112,10,116,105,225,187,135,116,10,116,111,10,116,111,97,10,116,111,97,110,10,116,111,97,110,103,10,116,111,97,110,104,10,116,111,101,10,116,111,101,110,10,116,111,105,10,116,111,109,10,116,111,110,10,116,111,110,103,10,116,111,111,110,103,10,116,111,117,116,10,116,111,195,160,10,116,111,195,160,105,10,116,111,195,160,110,10,116,111,195,160,110,103,10,116,111,195,161,99,10,116,111,195,161,105,10,116,111,195,161,110,10,116,111,195,161,110,103,10,116,111,195,161,116,10,116,111,195,161,121,10,116,111,195,168,10,116,111,195,168,110,10,116,111,195,169,10,116,111,195,169,116,10,116,111,195,178,110,103,10,116,111,225,186,161,10,116,111,225,186,161,99,10,116,111,225,186,161,105,10,116,111,225,186,163,10,116,111,225,186,163,110,10,116,111,225,186,185,116,10,116,111,225,186,187,10,116,111,225,186,189,10,116,114,97,10,116,114,97,105,10,116,114,97,109,10,116,114,97,110,10,116,114,97,110,103,10,116,114,97,110,104,10,116,114,97,111,10,116,114,97,117,10,116,114,101,10,116,114,101,111,10,116,114,105,10,116,114,105,110,104,10,116,114,105,195,170,110,103,10,116,114,105,195,170,117,10,116,114,105,225,186,191,110,10,116,114,105,225,186,191,116,10,116,114,105,225,187,129,110,10,116,114,105,225,187,129,110,103,10,116,114,105,225,187,129,117,10,116,114,105,225,187,131,110,10,116,114,105,225,187,135,110,10,116,114,105,225,187,135,110,103,10,116,114,105,225,187,135,116,10,116,114,105,225,187,135,117,10,116,114,111,10,116,114,111,105,10,116,114,111,110,10,116,114,111,110,103,10,116,114,117,10,116,114,117,105,10,116,114,117,110,10,116,114,117,110,103,10,116,114,117,121,10,116,114,117,121,225,187,129,110,10,116,114,117,121,225,187,135,110,10,116,114,117,195,162,110,10,116,114,117,195,180,110,103,10,116,114,117,225,186,165,116,10,116,114,117,225,186,173,116,10,116,114,117,225,187,147,110,103,10,116,114,117,225,187,153,116,10,116,114,117,225,187,181,10,116,114,195,160,10,116,114,195,160,105,10,116,114,195,160,109,10,116,114,195,160,110,10,116,114,195,160,110,103,10,116,114,195,160,110,104,10,116,114,195,160,111,10,116,114,195,160,117,10,116,114,195,160,121,10,116,114,195,161,10,116,114,195,161,99,10,116,114,195,161,99,104,10,116,114,195,161,105,10,116,114,195,161,109,10,116,114,195,161,110,10,116,114,195,161,110,103,10,116,114,195,161,110,104,10,116,114,195,161,111,10,116,114,195,161,112,10,116,114,195,161,116,10,116,114,195,162,109,10,116,114,195,162,110,10,116,114,195,162,110,103,10,116,114,195,162,117,10,116,114,195,162,121,10,116,114,195,163,10,116,114,195,163,105,10,116,114,195,168,10,116,114,195,168,109,10,116,114,195,168,110,10,116,114,195,168,111,10,116,114,195,169,109,10,116,114,195,169,111,10,116,114,195,169,116,10,116,114,195,170,10,116,114,195,170,110,10,116,114,195,170,117,10,116,114,195,172,10,116,114,195,172,110,104,10,116,114,195,172,117,10,116,114,195,173,10,116,114,195,173,99,104,10,116,114,195,173,116,10,116,114,195,178,10,116,114,195,178,105,10,116,114,195,178,109,10,116,114,195,178,110,10,116,114,195,178,110,103,10,116,114,195,179,99,10,116,114,195,179,105,10,116,114,195,179,109,10,116,114,195,179,110,103,10,116,114,195,179,116,10,116,114,195,180,10,116,114,195,180,105,10,116,114,195,180,109,10,116,114,195,180,110,10,116,114,195,180,110,103,10,116,114,195,181,109,10,116,114,195,181,110,10,116,114,195,185,10,116,114,195,185,105,10,116,114,195,185,109,10,116,114,195,185,110,10,116,114,195,185,110,103,10,116,114,195,186,10,116,114,195,186,99,10,116,114,195,186,109,10,116,114,195,186,110,103,10,116,114,195,186,116,10,116,114,196,131,109,10,116,114,196,131,110,10,116,114,196,131,110,103,10,116,114,196,169,10,116,114,196,169,110,104,10,116,114,196,169,117,10,116,114,197,169,105,10,116,114,197,169,110,103,10,116,114,198,161,10,116,114,198,161,105,10,116,114,198,161,110,10,116,114,198,176,97,10,116,114,198,176,110,103,10,116,114,198,176,198,161,110,103,10,116,114,198,176,225,187,155,99,10,116,114,198,176,225,187,155,110,103,10,116,114,198,176,225,187,157,110,10,116,114,198,176,225,187,157,110,103,10,116,114,198,176,225,187,159,110,103,10,116,114,198,176,225,187,161,110,103,10,116,114,198,176,225,187,163,110,103,10,116,114,198,176,225,187,163,116,10,116,114,225,186,161,99,10,116,114,225,186,161,99,104,10,116,114,225,186,161,105,10,116,114,225,186,161,109,10,116,114,225,186,161,110,103,10,116,114,225,186,161,111,10,116,114,225,186,161,121,10,116,114,225,186,163,10,116,114,225,186,163,105,10,116,114,225,186,163,109,10,116,114,225,186,163,110,103,10,116,114,225,186,163,111,10,116,114,225,186,163,117,10,116,114,225,186,163,121,10,116,114,225,186,165,110,10,116,114,225,186,165,112,10,116,114,225,186,165,117,10,116,114,225,186,167,109,10,116,114,225,186,167,110,10,116,114,225,186,167,117,10,116,114,225,186,167,121,10,116,114,225,186,169,110,10,116,114,225,186,169,117,10,116,114,225,186,169,121,10,116,114,225,186,171,109,10,116,114,225,186,173,109,10,116,114,225,186,173,110,10,116,114,225,186,173,112,10,116,114,225,186,173,116,10,116,114,225,186,175,99,10,116,114,225,186,175,109,10,116,114,225,186,175,110,103,10,116,114,225,186,175,116,10,116,114,225,186,177,109,10,116,114,225,186,177,110,10,116,114,225,186,183,99,10,116,114,225,186,183,110,10,116,114,225,186,185,10,116,114,225,186,185,111,10,116,114,225,186,185,116,10,116,114,225,186,187,10,116,114,225,186,187,111,10,116,114,225,186,189,10,116,114,225,186,189,110,10,116,114,225,186,191,99,104,10,116,114,225,186,191,116,10,116,114,225,187,129,10,116,114,225,187,133,10,116,114,225,187,135,10,116,114,225,187,135,99,104,10,116,114,225,187,135,116,10,116,114,225,187,135,117,10,116,114,225,187,137,97,10,116,114,225,187,139,10,116,114,225,187,139,97,10,116,114,225,187,139,99,104,10,116,114,225,187,139,110,104,10,116,114,225,187,139,116,10,116,114,225,187,141,10,116,114,225,187,141,99,10,116,114,225,187,141,105,10,116,114,225,187,141,110,10,116,114,225,187,141,110,103,10,116,114,225,187,141,116,10,116,114,225,187,143,10,116,114,225,187,143,105,10,116,114,225,187,143,110,103,10,116,114,225,187,145,10,116,114,225,187,145,99,10,116,114,225,187,145,105,10,116,114,225,187,145,110,10,116,114,225,187,145,110,103,10,116,114,225,187,147,10,116,114,225,187,147,105,10,116,114,225,187,147,110,103,10,116,114,225,187,149,10,116,114,225,187,149,105,10,116,114,225,187,149,110,103,10,116,114,225,187,151,10,116,114,225,187,153,10,116,114,225,187,153,99,10,116,114,225,187,153,105,10,116,114,225,187,153,109,10,116,114,225,187,153,110,10,116,114,225,187,155,10,116,114,225,187,155,110,10,116,114,225,187,155,112,10,116,114,225,187,155,116,10,116,114,225,187,157,10,116,114,225,187,157,105,10,116,114,225,187,157,110,10,116,114,225,187,159,10,116,114,225,187,163,10,116,114,225,187,163,110,10,116,114,225,187,163,116,10,116,114,225,187,165,10,116,114,225,187,165,97,10,116,114,225,187,165,99,10,116,114,225,187,165,105,10,116,114,225,187,165,109,10,116,114,225,187,165,110,10,116,114,225,187,165,110,103,10,116,114,225,187,165,112,10,116,114,225,187,165,116,10,116,114,225,187,167,10,116,114,225,187,169,10,116,114,225,187,169,110,103,10,116,114,225,187,171,10,116,114,225,187,171,97,10,116,114,225,187,171,110,103,10,116,114,225,187,173,110,103,10,116,114,225,187,175,10,116,114,225,187,177,10,116,114,225,187,177,99,10,116,117,10,116,117,97,10,116,117,105,10,116,117,109,10,116,117,110,10,116,117,110,103,10,116,117,121,10,116,117,121,110,10,116,117,121,195,170,110,10,116,117,121,225,186,191,110,10,116,117,121,225,186,191,116,10,116,117,121,225,187,129,110,10,116,117,121,225,187,131,110,10,116,117,121,225,187,135,116,10,116,117,195,162,110,10,116,117,195,180,110,10,116,117,195,180,110,103,10,116,117,195,189,10,116,117,225,186,165,110,10,116,117,225,186,165,116,10,116,117,225,186,167,110,10,116,117,225,186,191,10,116,117,225,186,191,99,104,10,116,117,225,187,135,10,116,117,225,187,135,99,104,10,116,117,225,187,145,116,10,116,117,225,187,147,110,10,116,117,225,187,147,110,103,10,116,117,225,187,149,105,10,116,117,225,187,153,99,10,116,117,225,187,153,116,10,116,117,225,187,179,10,116,117,225,187,181,10,116,117,225,187,183,10,116,121,10,116,195,160,10,116,195,160,105,10,116,195,160,110,10,116,195,160,110,103,10,116,195,160,110,104,10,116,195,160,111,10,116,195,160,117,10,116,195,160,121,10,116,195,161,10,116,195,161,99,10,116,195,161,99,104,10,116,195,161,105,10,116,195,161,109,10,116,195,161,110,10,116,195,161,110,103,10,116,195,161,110,104,10,116,195,161,111,10,116,195,161,112,10,116,195,161,116,10,116,195,161,117,10,116,195,161,121,10,116,195,162,109,10,116,195,162,110,10,116,195,162,110,103,10,116,195,162,117,10,116,195,162,121,10,116,195,163,10,116,195,163,105,10,116,195,168,10,116,195,168,109,10,116,195,168,110,10,116,195,168,111,10,116,195,169,10,116,195,169,99,10,116,195,169,109,10,116,195,169,112,10,116,195,169,116,10,116,195,170,10,116,195,170,109,10,116,195,170,110,10,116,195,170,110,104,10,116,195,170,116,10,116,195,170,117,10,116,195,172,10,116,195,172,109,10,116,195,172,110,104,10,116,195,173,10,116,195,173,97,10,116,195,173,99,104,10,116,195,173,109,10,116,195,173,110,10,116,195,173,110,104,10,116,195,173,112,10,116,195,173,116,10,116,195,173,117,10,116,195,178,10,116,195,178,105,10,116,195,178,109,10,116,195,178,110,10,116,195,178,110,103,10,116,195,179,10,116,195,179,99,10,116,195,179,105,10,116,195,179,109,10,116,195,179,112,10,116,195,179,116,10,116,195,180,10,116,195,180,105,10,116,195,180,109,10,116,195,180,110,10,116,195,180,110,103,10,116,195,181,109,10,116,195,185,10,116,195,185,109,10,116,195,185,110,103,10,116,195,186,10,116,195,186,99,10,116,195,186,105,10,116,195,186,109,10,116,195,186,110,103,10,116,195,186,112,10,116,195,186,116,10,116,196,131,109,10,116,196,131,110,10,116,196,131,110,103,10,116,196,169,10,116,196,169,110,104,10,116,196,169,117,10,116,197,169,109,10,116,198,161,10,116,198,161,105,10,116,198,176,10,116,198,176,97,10,116,198,176,110,103,10,116,198,176,198,161,105,10,116,198,176,198,161,109,10,116,198,176,198,161,110,103,10,116,198,176,225,187,155,99,10,116,198,176,225,187,155,105,10,116,198,176,225,187,155,110,10,116,198,176,225,187,155,110,103,10,116,198,176,225,187,155,112,10,116,198,176,225,187,155,116,10,116,198,176,225,187,157,109,10,116,198,176,225,187,157,110,103,10,116,198,176,225,187,157,117,10,116,198,176,225,187,159,105,10,116,198,176,225,187,159,110,103,10,116,198,176,225,187,163,99,10,116,198,176,225,187,163,110,103,10,116,198,176,225,187,163,112,10,116,198,176,225,187,163,116,10,116,225,186,161,10,116,225,186,161,99,10,116,225,186,161,99,104,10,116,225,186,161,105,10,116,225,186,161,109,10,116,225,186,161,110,103,10,116,225,186,161,110,104,10,116,225,186,161,111,10,116,225,186,161,112,10,116,225,186,161,116,10,116,225,186,163,10,116,225,186,163,105,10,116,225,186,163,110,10,116,225,186,163,110,103,10,116,225,186,163,111,10,116,225,186,165,99,10,116,225,186,165,109,10,116,225,186,165,110,10,116,225,186,165,112,10,116,225,186,165,116,10,116,225,186,165,117,10,116,225,186,165,121,10,116,225,186,167,109,10,116,225,186,167,110,10,116,225,186,167,110,103,10,116,225,186,167,121,10,116,225,186,169,109,10,116,225,186,169,110,10,116,225,186,169,117,10,116,225,186,169,121,10,116,225,186,173,110,10,116,225,186,173,112,10,116,225,186,173,116,10,116,225,186,173,117,10,116,225,186,175,99,10,116,225,186,175,109,10,116,225,186,175,110,10,116,225,186,175,112,10,116,225,186,175,116,10,116,225,186,177,109,10,116,225,186,177,110,10,116,225,186,177,110,103,10,116,225,186,179,110,10,116,225,186,183,99,10,116,225,186,183,110,10,116,225,186,183,110,103,10,116,225,186,185,111,10,116,225,186,185,112,10,116,225,186,185,116,10,116,225,186,187,10,116,225,186,187,109,10,116,225,186,187,111,10,116,225,186,189,10,116,225,186,189,110,10,116,225,186,191,10,116,225,186,191,99,104,10,116,225,186,191,116,10,116,225,186,191,117,10,116,225,187,129,10,116,225,187,129,110,104,10,116,225,187,131,10,116,225,187,131,110,104,10,116,225,187,133,10,116,225,187,133,110,104,10,116,225,187,135,10,116,225,187,135,112,10,116,225,187,137,10,116,225,187,137,97,10,116,225,187,137,109,10,116,225,187,137,110,104,10,116,225,187,139,10,116,225,187,139,99,104,10,116,225,187,139,110,104,10,116,225,187,139,116,10,116,225,187,139,117,10,116,225,187,141,99,10,116,225,187,141,110,103,10,116,225,187,141,112,10,116,225,187,141,116,10,116,225,187,143,10,116,225,187,143,105,10,116,225,187,143,109,10,116,225,187,143,110,103,10,116,225,187,145,10,116,225,187,145,99,10,116,225,187,145,105,10,116,225,187,145,110,10,116,225,187,145,110,103,10,116,225,187,145,112,10,116,225,187,145,116,10,116,225,187,147,10,116,225,187,147,105,10,116,225,187,147,110,10,116,225,187,147,110,103,10,116,225,187,149,10,116,225,187,149,110,10,116,225,187,149,110,103,10,116,225,187,153,10,116,225,187,153,99,10,116,225,187,153,105,10,116,225,187,153,116,10,116,225,187,155,10,116,225,187,155,105,10,116,225,187,155,110,10,116,225,187,155,112,10,116,225,187,155,116,10,116,225,187,157,10,116,225,187,157,105,10,116,225,187,159,109,10,116,225,187,163,10,116,225,187,163,110,10,116,225,187,163,112,10,116,225,187,165,10,116,225,187,165,99,10,116,225,187,165,105,10,116,225,187,165,109,10,116,225,187,165,110,103,10,116,225,187,165,116,10,116,225,187,167,10,116,225,187,167,97,10,116,225,187,167,105,10,116,225,187,167,109,10,116,225,187,167,110,10,116,225,187,169,10,116,225,187,169,97,10,116,225,187,169,99,10,116,225,187,171,10,116,225,187,171,110,103,10,116,225,187,173,10,116,225,187,173,97,10,116,225,187,173,110,103,10,116,225,187,173,117,10,116,225,187,177,10,116,225,187,177,97,10,116,225,187,177,117,10,116,225,187,181,10,116,225,187,183,10,117,10,117,109,10,117,110,10,117,110,103,10,117,121,10,117,121,195,170,110,10,117,121,225,187,131,110,10,117,195,180,109,10,117,195,189,10,117,225,186,165,116,10,117,225,186,169,110,10,117,225,186,169,121,10,117,225,186,191,10,117,225,187,131,10,117,225,187,145,110,10,117,225,187,145,110,103,10,117,225,187,149,110,103,10,117,225,187,153,116,10,117,225,187,159,10,117,225,187,179,110,104,10,117,225,187,181,99,104,10,117,225,187,183,10,118,10,118,97,10,118,97,105,10,118,97,110,10,118,97,110,103,10,118,97,110,104,10,118,97,111,10,118,97,121,10,118,101,10,118,101,110,10,118,101,111,10,118,105,10,118,105,110,104,10,118,105,195,170,109,10,118,105,195,170,110,10,118,105,225,186,191,110,103,10,118,105,225,186,191,116,10,118,105,225,187,129,110,10,118,105,225,187,131,110,10,118,105,225,187,133,110,10,118,105,225,187,135,99,10,118,105,225,187,135,110,10,118,105,225,187,135,116,10,118,111,10,118,111,97,110,10,118,111,105,10,118,111,110,10,118,111,110,103,10,118,117,10,118,117,97,10,118,117,105,10,118,117,110,10,118,117,110,103,10,118,117,195,180,110,103,10,118,117,225,187,145,116,10,118,117,225,187,153,116,10,118,195,160,10,118,195,160,105,10,118,195,160,109,10,118,195,160,110,10,118,195,160,110,103,10,118,195,160,110,104,10,118,195,160,111,10,118,195,160,121,10,118,195,161,10,118,195,161,99,10,118,195,161,99,104,10,118,195,161,105,10,118,195,161,110,10,118,195,161,110,103,10,118,195,161,110,104,10,118,195,161,111,10,118,195,161,112,10,118,195,161,116,10,118,195,161,121,10,118,195,162,109,10,118,195,162,110,10,118,195,162,110,103,10,118,195,162,121,10,118,195,163,10,118,195,163,105,10,118,195,163,110,10,118,195,163,110,103,10,118,195,163,110,104,10,118,195,168,10,118,195,168,111,10,118,195,169,10,118,195,169,99,10,118,195,169,110,10,118,195,169,111,10,118,195,169,116,10,118,195,170,10,118,195,170,110,10,118,195,170,110,104,10,118,195,170,117,10,118,195,172,10,118,195,173,10,118,195,173,97,10,118,195,173,99,104,10,118,195,173,116,10,118,195,173,117,10,118,195,178,10,118,195,178,105,10,118,195,178,109,10,118,195,178,110,10,118,195,178,110,103,10,118,195,179,10,118,195,179,99,10,118,195,179,105,10,118,195,179,110,10,118,195,179,110,103,10,118,195,179,116,10,118,195,180,10,118,195,180,105,10,118,195,180,110,10,118,195,180,110,103,10,118,195,181,10,118,195,181,110,103,10,118,195,185,10,118,195,185,97,10,118,195,185,105,10,118,195,185,110,10,118,195,185,110,103,10,118,195,186,10,118,195,186,99,10,118,195,186,116,10,118,196,131,110,10,118,196,131,110,103,10,118,196,169,10,118,196,169,110,104,10,118,197,169,10,118,197,169,109,10,118,197,169,110,103,10,118,198,161,10,118,198,161,105,10,118,198,176,110,103,10,118,198,176,117,10,118,198,176,198,161,110,10,118,198,176,198,161,110,103,10,118,198,176,225,187,155,110,103,10,118,198,176,225,187,157,110,10,118,198,176,225,187,159,110,103,10,118,198,176,225,187,163,99,10,118,198,176,225,187,163,110,10,118,198,176,225,187,163,110,103,10,118,198,176,225,187,163,116,10,118,225,186,161,10,118,225,186,161,99,10,118,225,186,161,99,104,10,118,225,186,161,105,10,118,225,186,161,109,10,118,225,186,161,110,10,118,225,186,161,110,103,10,118,225,186,161,110,104,10,118,225,186,161,112,10,118,225,186,161,116,10,118,225,186,161,121,10,118,225,186,163,10,118,225,186,163,105,10,118,225,186,163,110,103,10,118,225,186,163,121,10,118,225,186,165,110,10,118,225,186,165,112,10,118,225,186,165,116,10,118,225,186,165,117,10,118,225,186,165,121,10,118,225,186,167,110,10,118,225,186,167,110,103,10,118,225,186,167,117,10,118,225,186,167,121,10,118,225,186,169,110,10,118,225,186,169,117,10,118,225,186,169,121,10,118,225,186,171,110,10,118,225,186,171,121,10,118,225,186,173,109,10,118,225,186,173,110,10,118,225,186,173,112,10,118,225,186,173,116,10,118,225,186,173,121,10,118,225,186,175,99,10,118,225,186,175,110,10,118,225,186,175,110,103,10,118,225,186,175,116,10,118,225,186,177,109,10,118,225,186,177,110,10,118,225,186,177,110,103,10,118,225,186,179,110,103,10,118,225,186,183,99,10,118,225,186,183,110,10,118,225,186,183,116,10,118,225,186,185,109,10,118,225,186,185,110,10,118,225,186,185,111,10,118,225,186,185,116,10,118,225,186,187,10,118,225,186,187,110,10,118,225,186,187,111,10,118,225,186,189,10,118,225,186,191,10,118,225,186,191,99,104,10,118,225,186,191,116,10,118,225,186,191,117,10,118,225,187,129,10,118,225,187,129,110,10,118,225,187,129,117,10,118,225,187,131,110,104,10,118,225,187,135,10,118,225,187,135,110,10,118,225,187,135,116,10,118,225,187,137,10,118,225,187,137,97,10,118,225,187,139,10,118,225,187,139,109,10,118,225,187,139,110,10,118,225,187,139,110,104,10,118,225,187,139,116,10,118,225,187,141,10,118,225,187,141,99,10,118,225,187,141,105,10,118,225,187,141,110,103,10,118,225,187,141,112,10,118,225,187,141,116,10,118,225,187,143,10,118,225,187,143,110,10,118,225,187,143,110,103,10,118,225,187,145,10,118,225,187,145,99,10,118,225,187,145,105,10,118,225,187,145,110,10,118,225,187,145,110,103,10,118,225,187,147,10,118,225,187,147,105,10,118,225,187,147,110,10,118,225,187,147,110,103,10,118,225,187,149,10,118,225,187,149,110,103,10,118,225,187,151,10,118,225,187,153,105,10,118,225,187,155,10,118,225,187,155,105,10,118,225,187,155,116,10,118,225,187,157,10,118,225,187,157,105,10,118,225,187,157,110,10,118,225,187,159,10,118,225,187,159,110,10,118,225,187,161,10,118,225,187,163,10,118,225,187,163,105,10,118,225,187,163,116,10,118,225,187,165,10,118,225,187,165,99,10,118,225,187,165,110,10,118,225,187,165,110,103,10,118,225,187,165,116,10,118,225,187,169,99,10,118,225,187,169,116,10,118,225,187,171,97,10,118,225,187,171,110,103,10,118,225,187,173,110,103,10,118,225,187,175,97,10,118,225,187,175,110,103,10,118,225,187,177,97,10,118,225,187,177,99,10,118,225,187,177,110,103,10,119,101,98,10,120,97,10,120,97,109,10,120,97,110,10,120,97,110,103,10,120,97,110,104,10,120,97,111,10,120,97,121,10,120,101,10,120,101,109,10,120,101,110,10,120,101,111,10,120,105,10,120,105,97,10,120,105,109,10,120,105,110,10,120,105,110,104,10,120,105,116,10,120,105,195,170,109,10,120,105,195,170,110,10,120,105,195,170,117,10,120,105,225,186,191,99,10,120,105,225,186,191,116,10,120,105,225,187,129,110,103,10,120,105,225,187,131,109,10,120,105,225,187,131,110,10,120,105,225,187,131,110,103,10,120,111,10,120,111,97,10,120,111,97,110,10,120,111,97,110,103,10,120,111,97,121,10,120,111,101,10,120,111,101,110,10,120,111,105,10,120,111,109,10,120,111,110,10,120,111,110,103,10,120,111,111,110,103,10,120,111,195,160,10,120,111,195,160,105,10,120,111,195,160,109,10,120,111,195,160,110,10,120,111,195,160,110,103,10,120,111,195,160,110,104,10,120,111,195,161,10,120,111,195,161,99,10,120,111,195,161,116,10,120,111,195,161,121,10,120,111,195,163,10,120,111,195,168,10,120,111,195,168,110,10,120,111,195,169,116,10,120,111,196,131,110,10,120,111,225,186,161,99,10,120,111,225,186,161,99,104,10,120,111,225,186,161,110,103,10,120,111,225,186,163,10,120,111,225,186,163,105,10,120,111,225,186,163,110,103,10,120,111,225,186,175,110,10,120,111,225,186,185,10,120,111,225,186,185,116,10,120,117,10,120,117,97,10,120,117,105,10,120,117,109,10,120,117,110,103,10,120,117,121,10,120,117,121,97,10,120,117,121,110,104,10,120,117,121,195,170,110,10,120,117,121,225,186,191,110,10,120,117,121,225,186,191,116,10,120,117,195,162,110,10,120,117,195,162,121,10,120,117,195,170,10,120,117,195,180,105,10,120,117,195,189,10,120,117,195,189,116,10,120,117,225,186,165,116,10,120,117,225,186,169,110,10,120,117,225,187,129,10,120,117,225,187,129,110,104,10,120,117,225,187,131,10,120,117,225,187,135,99,104,10,120,117,225,187,145,110,103,10,120,117,225,187,147,110,103,10,120,117,225,187,149,110,103,10,120,117,225,187,179,10,120,117,225,187,181,116,10,120,195,160,10,120,195,160,105,10,120,195,160,109,10,120,195,160,110,103,10,120,195,160,110,104,10,120,195,160,111,10,120,195,160,117,10,120,195,161,10,120,195,161,99,10,120,195,161,99,104,10,120,195,161,105,10,120,195,161,109,10,120,195,161,110,10,120,195,161,111,10,120,195,161,112,10,120,195,161,116,10,120,195,161,121,10,120,195,162,109,10,120,195,162,117,10,120,195,162,121,10,120,195,163,10,120,195,168,10,120,195,168,110,10,120,195,168,110,103,10,120,195,168,111,10,120,195,169,10,120,195,169,99,10,120,195,169,110,10,120,195,169,111,10,120,195,169,112,10,120,195,169,116,10,120,195,170,10,120,195,170,110,10,120,195,170,110,104,10,120,195,170,117,10,120,195,172,10,120,195,172,110,104,10,120,195,172,117,10,120,195,173,10,120,195,173,97,10,120,195,173,99,104,10,120,195,173,110,104,10,120,195,173,116,10,120,195,173,117,10,120,195,178,109,10,120,195,178,110,103,10,120,195,179,10,120,195,179,99,10,120,195,179,105,10,120,195,179,109,10,120,195,179,110,10,120,195,179,112,10,120,195,179,116,10,120,195,180,10,120,195,180,105,10,120,195,180,109,10,120,195,180,110,10,120,195,180,110,103,10,120,195,181,109,10,120,195,181,110,103,10,120,195,185,10,120,195,185,105,10,120,195,185,109,10,120,195,185,110,103,10,120,195,186,10,120,195,186,99,10,120,195,186,105,10,120,195,186,109,10,120,195,186,110,103,10,120,195,186,112,10,120,195,186,116,10,120,196,131,109,10,120,196,131,110,10,120,196,131,110,103,10,120,196,169,110,104,10,120,197,169,10,120,198,161,10,120,198,161,105,10,120,198,161,109,10,120,198,161,110,10,120,198,176,97,10,120,198,176,110,103,10,120,198,176,198,161,110,103,10,120,198,176,225,187,155,99,10,120,198,176,225,187,155,110,103,10,120,198,176,225,187,157,105,10,120,198,176,225,187,159,110,103,10,120,198,176,225,187,163,99,10,120,225,186,161,10,120,225,186,161,99,10,120,225,186,161,99,104,10,120,225,186,161,111,10,120,225,186,161,112,10,120,225,186,161,117,10,120,225,186,163,10,120,225,186,163,109,10,120,225,186,163,110,104,10,120,225,186,163,111,10,120,225,186,163,117,10,120,225,186,163,121,10,120,225,186,165,99,10,120,225,186,165,112,10,120,225,186,165,117,10,120,225,186,167,109,10,120,225,186,169,109,10,120,225,186,169,110,10,120,225,186,169,117,10,120,225,186,169,121,10,120,225,186,173,112,10,120,225,186,175,99,10,120,225,186,175,109,10,120,225,186,175,110,10,120,225,186,175,112,10,120,225,186,177,110,103,10,120,225,186,181,110,103,10,120,225,186,185,99,10,120,225,186,185,111,10,120,225,186,185,112,10,120,225,186,185,116,10,120,225,186,187,10,120,225,186,187,110,10,120,225,186,187,110,103,10,120,225,186,187,111,10,120,225,186,189,111,10,120,225,186,191,10,120,225,186,191,99,104,10,120,225,186,191,112,10,120,225,187,129,109,10,120,225,187,129,110,104,10,120,225,187,129,117,10,120,225,187,131,10,120,225,187,135,10,120,225,187,135,99,104,10,120,225,187,135,112,10,120,225,187,135,117,10,120,225,187,137,10,120,225,187,137,97,10,120,225,187,137,110,10,120,225,187,137,110,104,10,120,225,187,137,117,10,120,225,187,139,10,120,225,187,139,99,104,10,120,225,187,139,116,10,120,225,187,139,117,10,120,225,187,141,10,120,225,187,141,99,10,120,225,187,141,112,10,120,225,187,143,10,120,225,187,143,110,103,10,120,225,187,145,10,120,225,187,145,99,10,120,225,187,145,105,10,120,225,187,145,110,10,120,225,187,145,110,103,10,120,225,187,145,112,10,120,225,187,145,116,10,120,225,187,147,10,120,225,187,147,109,10,120,225,187,147,110,10,120,225,187,147,110,103,10,120,225,187,149,10,120,225,187,149,105,10,120,225,187,149,109,10,120,225,187,149,110,103,10,120,225,187,153,99,10,120,225,187,153,110,10,120,225,187,153,112,10,120,225,187,155,10,120,225,187,155,105,10,120,225,187,155,112,10,120,225,187,155,116,10,120,225,187,157,10,120,225,187,157,109,10,120,225,187,159,10,120,225,187,159,105,10,120,225,187,159,110,10,120,225,187,161,10,120,225,187,163,112,10,120,225,187,163,116,10,120,225,187,165,10,120,225,187,165,99,10,120,225,187,165,105,10,120,225,187,165,112,10,120,225,187,167,110,103,10,120,225,187,169,10,120,225,187,169,99,10,120,225,187,169,110,103,10,120,225,187,171,10,120,225,187,173,10,120,225,187,173,97,10,120,225,187,173,110,103,10,120,225,187,177,99,10,121,10,121,195,170,110,10,121,195,170,110,103,10,121,195,170,117,10,121,225,186,191,109,10,121,225,186,191,110,10,121,225,186,191,116,10,121,225,186,191,117,10,121,225,187,131,109,10,121,225,187,131,110,103,10,121,225,187,131,117,10,195,160,10,195,160,111,10,195,161,10,195,161,99,10,195,161,99,104,10,195,161,105,10,195,161,109,10,195,161,110,10,195,161,110,103,10,195,161,110,104,10,195,161,111,10,195,161,112,10,195,161,116,10,195,161,121,10,195,162,109,10,195,162,110,10,195,162,117,10,195,163,10,195,168,10,195,168,111,10,195,169,10,195,169,99,10,195,169,109,10,195,169,110,10,195,169,111,10,195,169,112,10,195,169,116,10,195,170,10,195,170,109,10,195,170,117,10,195,172,10,195,172,110,10,195,172,110,104,10,195,173,10,195,173,99,104,10,195,173,110,10,195,173,116,10,195,178,10,195,178,105,10,195,178,109,10,195,178,110,103,10,195,179,10,195,179,99,10,195,179,105,10,195,179,110,103,10,195,179,112,10,195,179,116,10,195,180,10,195,180,105,10,195,180,109,10,195,180,110,10,195,180,110,103,10,195,185,10,195,185,97,10,195,185,109,10,195,185,110,10,195,185,110,103,10,195,186,10,195,186,97,10,195,186,105,10,195,186,109,10,195,186,110,103,10,195,186,112,10,195,186,116,10,195,189,10,196,131,109,10,196,131,110,10,196,131,110,103,10,196,145,97,10,196,145,97,105,10,196,145,97,109,10,196,145,97,110,10,196,145,97,110,103,10,196,145,97,110,104,10,196,145,97,111,10,196,145,97,117,10,196,145,97,121,10,196,145,101,10,196,145,101,109,10,196,145,101,110,10,196,145,101,111,10,196,145,105,10,196,145,105,110,10,196,145,105,110,104,10,196,145,105,195,170,110,10,196,145,105,195,170,117,10,196,145,105,225,186,191,99,10,196,145,105,225,186,191,109,10,196,145,105,225,186,191,110,103,10,196,145,105,225,186,191,117,10,196,145,105,225,187,129,110,10,196,145,105,225,187,129,117,10,196,145,105,225,187,131,109,10,196,145,105,225,187,131,110,10,196,145,105,225,187,131,117,10,196,145,105,225,187,135,109,10,196,145,105,225,187,135,110,10,196,145,105,225,187,135,112,10,196,145,105,225,187,135,117,10,196,145,111,10,196,145,111,97,110,10,196,145,111,105,10,196,145,111,109,10,196,145,111,110,10,196,145,111,110,103,10,196,145,111,195,160,105,10,196,145,111,195,160,110,10,196,145,111,195,160,110,103,10,196,145,111,195,160,110,104,10,196,145,111,195,161,10,196,145,111,195,161,105,10,196,145,111,195,161,110,10,196,145,111,195,163,110,103,10,196,145,111,225,186,161,10,196,145,111,225,186,161,110,10,196,145,111,225,186,161,116,10,196,145,111,225,186,163,110,10,196,145,111,225,186,163,110,103,10,196,145,117,10,196,145,117,97,10,196,145,117,105,10,196,145,117,109,10,196,145,117,110,10,196,145,117,110,103,10,196,145,117,195,180,105,10,196,145,117,225,187,145,99,10,196,145,117,225,187,145,105,10,196,145,117,225,187,149,105,10,196,145,117,225,187,151,110,10,196,145,117,225,187,153,116,10,196,145,195,160,10,196,145,195,160,105,10,196,145,195,160,109,10,196,145,195,160,110,10,196,145,195,160,110,103,10,196,145,195,160,110,104,10,196,145,195,160,111,10,196,145,195,160,121,10,196,145,195,161,10,196,145,195,161,99,10,196,145,195,161,99,104,10,196,145,195,161,105,10,196,145,195,161,109,10,196,145,195,161,110,10,196,145,195,161,110,103,10,196,145,195,161,110,104,10,196,145,195,161,111,10,196,145,195,161,112,10,196,145,195,161,116,10,196,145,195,161,121,10,196,145,195,162,109,10,196,145,195,162,117,10,196,145,195,162,121,10,196,145,195,163,10,196,145,195,163,105,10,196,145,195,163,110,103,10,196,145,195,163,121,10,196,145,195,168,10,196,145,195,168,109,10,196,145,195,168,110,10,196,145,195,168,111,10,196,145,195,169,99,10,196,145,195,169,111,10,196,145,195,169,116,10,196,145,195,170,10,196,145,195,170,109,10,196,145,195,170,110,10,196,145,195,170,110,104,10,196,145,195,170,117,10,196,145,195,172,10,196,145,195,172,97,10,196,145,195,172,110,104,10,196,145,195,172,117,10,196,145,195,173,97,10,196,145,195,173,99,104,10,196,145,195,173,110,104,10,196,145,195,173,116,10,196,145,195,178,10,196,145,195,178,105,10,196,145,195,178,109,10,196,145,195,178,110,10,196,145,195,178,110,103,10,196,145,195,179,10,196,145,195,179,99,10,196,145,195,179,105,10,196,145,195,179,109,10,196,145,195,179,110,10,196,145,195,179,110,103,10,196,145,195,179,116,10,196,145,195,180,10,196,145,195,180,105,10,196,145,195,180,109,10,196,145,195,180,110,10,196,145,195,180,110,103,10,196,145,195,181,10,196,145,195,185,10,196,145,195,185,97,10,196,145,195,185,105,10,196,145,195,185,109,10,196,145,195,185,110,10,196,145,195,185,110,103,10,196,145,195,186,10,196,145,195,186,99,10,196,145,195,186,109,10,196,145,195,186,110,10,196,145,195,186,110,103,10,196,145,195,186,112,10,196,145,195,186,116,10,196,145,196,131,109,10,196,145,196,131,110,103,10,196,145,196,169,10,196,145,196,169,97,10,196,145,196,169,110,104,10,196,145,197,169,97,10,196,145,197,169,110,103,10,196,145,198,161,10,196,145,198,161,109,10,196,145,198,161,110,10,196,145,198,176,97,10,196,145,198,176,110,103,10,196,145,198,176,198,161,110,103,10,196,145,198,176,225,187,155,99,10,196,145,198,176,225,187,157,105,10,196,145,198,176,225,187,157,110,10,196,145,198,176,225,187,157,110,103,10,196,145,198,176,225,187,161,110,10,196,145,198,176,225,187,163,99,10,196,145,198,176,225,187,163,109,10,196,145,225,186,161,99,10,196,145,225,186,161,99,104,10,196,145,225,186,161,105,10,196,145,225,186,161,109,10,196,145,225,186,161,110,10,196,145,225,186,161,111,10,196,145,225,186,161,112,10,196,145,225,186,161,116,10,196,145,225,186,163,10,196,145,225,186,163,109,10,196,145,225,186,163,110,10,196,145,225,186,163,110,103,10,196,145,225,186,163,111,10,196,145,225,186,163,121,10,196,145,225,186,165,109,10,196,145,225,186,165,110,103,10,196,145,225,186,165,116,10,196,145,225,186,165,117,10,196,145,225,186,165,121,10,196,145,225,186,167,109,10,196,145,225,186,167,110,10,196,145,225,186,167,117,10,196,145,225,186,167,121,10,196,145,225,186,169,117,10,196,145,225,186,169,121,10,196,145,225,186,171,109,10,196,145,225,186,171,110,10,196,145,225,186,171,121,10,196,145,225,186,173,109,10,196,145,225,186,173,110,10,196,145,225,186,173,112,10,196,145,225,186,173,116,10,196,145,225,186,173,117,10,196,145,225,186,173,121,10,196,145,225,186,175,99,10,196,145,225,186,175,109,10,196,145,225,186,175,110,10,196,145,225,186,175,110,103,10,196,145,225,186,175,112,10,196,145,225,186,175,116,10,196,145,225,186,177,109,10,196,145,225,186,177,110,10,196,145,225,186,177,110,103,10,196,145,225,186,179,110,103,10,196,145,225,186,181,109,10,196,145,225,186,181,110,10,196,145,225,186,181,110,103,10,196,145,225,186,183,99,10,196,145,225,186,183,110,10,196,145,225,186,183,110,103,10,196,145,225,186,183,116,10,196,145,225,186,185,110,10,196,145,225,186,185,112,10,196,145,225,186,185,116,10,196,145,225,186,187,10,196,145,225,186,189,10,196,145,225,186,189,111,10,196,145,225,186,191,10,196,145,225,186,191,99,104,10,196,145,225,186,191,109,10,196,145,225,186,191,110,10,196,145,225,187,129,10,196,145,225,187,129,109,10,196,145,225,187,129,110,10,196,145,225,187,129,110,104,10,196,145,225,187,129,117,10,196,145,225,187,131,10,196,145,225,187,131,110,104,10,196,145,225,187,131,117,10,196,145,225,187,133,10,196,145,225,187,133,110,104,10,196,145,225,187,135,10,196,145,225,187,135,109,10,196,145,225,187,135,112,10,196,145,225,187,137,97,10,196,145,225,187,137,110,104,10,196,145,225,187,139,97,10,196,145,225,187,139,99,104,10,196,145,225,187,139,110,104,10,196,145,225,187,139,116,10,196,145,225,187,139,117,10,196,145,225,187,141,10,196,145,225,187,141,99,10,196,145,225,187,141,105,10,196,145,225,187,141,110,10,196,145,225,187,141,110,103,10,196,145,225,187,141,112,10,196,145,225,187,141,116,10,196,145,225,187,143,10,196,145,225,187,143,105,10,196,145,225,187,143,109,10,196,145,225,187,145,10,196,145,225,187,145,99,10,196,145,225,187,145,105,10,196,145,225,187,145,109,10,196,145,225,187,145,110,10,196,145,225,187,145,110,103,10,196,145,225,187,145,112,10,196,145,225,187,145,116,10,196,145,225,187,147,10,196,145,225,187,147,105,10,196,145,225,187,147,109,10,196,145,225,187,147,110,10,196,145,225,187,147,110,103,10,196,145,225,187,149,10,196,145,225,187,149,105,10,196,145,225,187,149,110,103,10,196,145,225,187,151,10,196,145,225,187,151,105,10,196,145,225,187,153,10,196,145,225,187,153,99,10,196,145,225,187,153,105,10,196,145,225,187,153,110,10,196,145,225,187,153,110,103,10,196,145,225,187,153,112,10,196,145,225,187,153,116,10,196,145,225,187,155,10,196,145,225,187,155,105,10,196,145,225,187,155,110,10,196,145,225,187,155,112,10,196,145,225,187,155,116,10,196,145,225,187,157,10,196,145,225,187,157,105,10,196,145,225,187,157,109,10,196,145,225,187,157,110,10,196,145,225,187,159,109,10,196,145,225,187,159,110,10,196,145,225,187,161,10,196,145,225,187,163,10,196,145,225,187,163,105,10,196,145,225,187,163,112,10,196,145,225,187,163,116,10,196,145,225,187,165,10,196,145,225,187,165,99,10,196,145,225,187,165,110,10,196,145,225,187,165,110,103,10,196,145,225,187,165,112,10,196,145,225,187,165,116,10,196,145,225,187,167,10,196,145,225,187,167,105,10,196,145,225,187,167,110,103,10,196,145,225,187,169,10,196,145,225,187,169,97,10,196,145,225,187,169,99,10,196,145,225,187,169,110,103,10,196,145,225,187,169,116,10,196,145,225,187,171,10,196,145,225,187,171,97,10,196,145,225,187,171,110,103,10,196,145,225,187,173,10,196,145,225,187,177,99,10,196,145,225,187,177,110,103,10,196,169,10,196,169,110,104,10,198,161,10,198,161,105,10,198,161,110,10,198,176,10,198,176,97,10,198,176,110,103,10,198,176,117,10,198,176,198,161,105,10,198,176,198,161,109,10,198,176,198,161,110,10,198,176,198,161,110,103,10,198,176,225,187,155,99,10,198,176,225,187,155,109,10,198,176,225,187,155,112,10,198,176,225,187,155,116,10,198,176,225,187,157,110,10,198,176,225,187,161,110,10,225,186,161,10,225,186,161,99,104,10,225,186,161,110,104,10,225,186,161,111,10,225,186,161,116,10,225,186,163,10,225,186,163,105,10,225,186,163,109,10,225,186,163,110,103,10,225,186,163,110,104,10,225,186,163,111,10,225,186,165,109,10,225,186,165,110,10,225,186,165,112,10,225,186,165,116,10,225,186,165,117,10,225,186,165,121,10,225,186,167,109,10,225,186,167,121,10,225,186,169,109,10,225,186,169,110,10,225,186,169,117,10,225,186,169,121,10,225,186,173,99,10,225,186,173,109,10,225,186,173,112,10,225,186,175,99,10,225,186,175,110,103,10,225,186,175,112,10,225,186,175,116,10,225,186,177,110,103,10,225,186,179,110,103,10,225,186,181,109,10,225,186,183,99,10,225,186,183,112,10,225,186,185,10,225,186,185,111,10,225,186,185,112,10,225,186,185,116,10,225,186,187,110,10,225,186,187,111,10,225,186,189,111,10,225,186,191,10,225,186,191,99,104,10,225,186,191,109,10,225,187,129,10,225,187,129,110,104,10,225,187,133,110,104,10,225,187,135,10,225,187,135,99,104,10,225,187,135,110,10,225,187,135,110,104,10,225,187,137,10,225,187,137,97,10,225,187,137,109,10,225,187,137,110,10,225,187,137,117,10,225,187,139,10,225,187,139,99,104,10,225,187,139,116,10,225,187,141,10,225,187,141,99,10,225,187,141,105,10,225,187,141,112,10,225,187,141,116,10,225,187,143,105,10,225,187,143,109,10,225,187,143,110,10,225,187,143,110,103,10,225,187,145,10,225,187,145,99,10,225,187,145,105,10,225,187,145,109,10,225,187,145,110,103,10,225,187,145,112,10,225,187,145,116,10,225,187,147,10,225,187,147,109,10,225,187,147,110,10,225,187,147,110,103,10,225,187,149,10,225,187,149,105,10,225,187,149,110,10,225,187,149,110,103,10,225,187,153,10,225,187,153,99,10,225,187,153,110,10,225,187,153,112,10,225,187,155,10,225,187,155,105,10,225,187,155,109,10,225,187,155,110,10,225,187,155,116,10,225,187,157,10,225,187,157,110,10,225,187,159,10,225,187,161,109,10,225,187,163,10,225,187,163,116,10,225,187,165,10,225,187,165,97,10,225,187,165,99,10,225,187,165,112,10,225,187,165,116,10,225,187,167,10,225,187,167,97,10,225,187,167,105,10,225,187,167,110,10,225,187,167,110,103,10,225,187,169,10,225,187,169,97,10,225,187,169,99,10,225,187,169,110,103,10,225,187,171,10,225,187,171,110,103,10,225,187,173,110,103,10,225,187,177,97,10,225,187,177,99,10,225,187,183,10])
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4).Buffer))

/***/ })
/******/ ]);
});