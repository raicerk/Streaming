/**
 * Modernizr - Custom Tests
 * ==========================================================================
 * @package       Locomotive/JavaScripts/Base
 * @dependencies  Modernizr
 */

// Test for `currentColor` keyword support
Modernizr.addTest('currentcolor', function(){
	var ua = navigator.userAgent
	  , nv = navigator.vendor
	  ;

	// Unsupported by MSIE 8-
	if ( ! document.addEventListener ) {
		return false;
	} else {

		// Unsupported by Safari 6+
		return ! (
			/Safari/.test(ua) &&
			/Apple Computer/.test(nv) &&
			( ua.match( /version\/([0-9]+)/gi ) && parseFloat( RegExp.$1 ) > 5 )
		);

	}

});
