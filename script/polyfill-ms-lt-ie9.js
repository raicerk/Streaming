
/**
 * Array.forEach() polyfill for <= IE8
 * source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
 */
if ( ! Array.prototype.forEach ) {
	Array.prototype.forEach = function (fn, scope) {
		if (this === void 0 || this === null || typeof fn !== 'function') {
			throw new TypeError();
		}

		/* jshint bitwise: false */
		var i, len = this.length >>> 0;
		/* jshint bitwise: true */

		for (i = 0; i < len; ++i) {
			if (i in this) {
				fn.call(scope, this[i], i, this);
			}
		}
	};
}

/**
 * Array.filter() polyfill for <= IE8
 * source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
 */
if ( ! Array.prototype.filter )
{
	Array.prototype.filter = function(fun /*, thisArg */)
	{
		"use strict";

		if (this === void 0 || this === null)
			throw new TypeError();

		var t = Object(this);
		var len = t.length >>> 0;
		if (typeof fun !== "function")
			throw new TypeError();

		var res = [];
		var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
		for (var i = 0; i < len; i++)
		{
			if (i in t)
			{
				var val = t[i];

				// NOTE: Technically this should Object.defineProperty at
				//       the next index, as push can be affected by
				//       properties on Object.prototype and Array.prototype.
				//       But that method's new, and collisions should be
				//       rare, so use the more-compatible alternative.
				if (fun.call(thisArg, val, i, t))
					res.push(val);
			}
		}

		return res;
	};
}
