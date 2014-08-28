/**
 * Utilities
 * ==========================================================================
 * @package  Locomotive/JavaScripts
 */

/* exported is, throttle */

var Locomotive = window.Locomotive || {};

// Extract fragment identifier (hash) from URL
String.prototype.getFragment = function () {
	return this.split('#')[1];
};

// Escape a string for use in a CSS selector
String.prototype.escapeSelector = function ( find ) {
	find = new RegExp( '([' + (find || ':') + '])' );
	return this.replace(find, '\\$1');
};

function is(o, type) {
	type = String.prototype.toLowerCase.call(type);
	if (type === "finite") {
		return isFinite(o);
	}
	if (type === "array" &&
		(o instanceof Array || Array.isArray && Array.isArray(o))) {
		return true;
	}
	return  (type === "null" && o === null) ||
			(type === typeof o && o !== null) ||
			(type === "object" && o === Object(o)) ||
			Object.prototype.toString.call(o).slice(8, -1).toLowerCase() === type;
}

// A (possibly faster) way to get the current timestamp as an integer.
// From underscorejs.org
if ( ! Date.now ) {
	Date.now = function() {
		return new Date().getTime();
	};
}


// Returns a function, that, when invoked, will only be triggered at most once
// during a given window of time. Normally, the throttled function will run
// as much as it can, without ever going more than once per `wait` duration;
// but if you'd like to disable the execution on the leading edge, pass
// `{leading: false}`. To disable execution on the trailing edge, ditto.
function throttle(func, wait, options) {
	var context, args, result;
	var timeout = null;
	var previous = 0;
	if (!options) options = {};
	var later = function() {
		previous = options.leading === false ? 0 : Date.now();
		timeout = null;
		result = func.apply(context, args);
		if (!timeout) context = args = null;
	};
	return function() {
		var now = Date.now();
		if (!previous && options.leading === false) previous = now;
		var remaining = wait - (now - previous);
		context = this;
		args = arguments;
		if (remaining <= 0 || remaining > wait) {
			clearTimeout(timeout);
			timeout = null;
			previous = now;
			result = func.apply(context, args);
			if (!timeout) context = args = null;
		} else if (!timeout && options.trailing !== false) {
			timeout = setTimeout(later, remaining);
		}
		return result;
	};
}


if ( 'jQuery' in window ) {

	jQuery.Event.prototype.isKeyboardTriggered = function () {
		return ( 0 === this.clientX && 0 === this.clientY
		      || 0 === this.pageX && 0 === this.pageY
		      || 0 === this.screenX && 0 === this.screenY );
	}

	jQuery.fn.converge = function () {
		var elements  = this
		  , $elements = $(elements)

		return $elements
				.first()
				.attr('tabindex', -1)
				.one('blur focusout', function () {
					$(this).removeAttr('tabindex');
				})
				.trigger('focus')
				.end()
				;

	}

}


/* ========================================================================== */

Locomotive.Constants = Locomotive.Constants || {};
Locomotive.Methods   = Locomotive.Methods   || {};
Locomotive.Events    = Locomotive.Events    || {};
Locomotive.Templates = Locomotive.Templates || {};

Locomotive.Keys = {
	// Enter, Space, Page down, Right arrow, Down arrow,
	next: [13, 32, 34, 39, 40],

	// Backspace, Page up, Left arrow, Up arrow
	previous: [8, 33, 37, 38]
};

Locomotive.Events = {
	mousewheel: ( /Firefox/i.test(navigator.userAgent) ? 'DOMMouseScroll' : 'mousewheel' )
};
