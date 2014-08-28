/**
 * Base
 * ==========================================================================
 * @package  Locomotive/JavaScripts
 */

/* exported $document, $window, $viewport, Locomotive */

var body       = document.body
  , html       = document.documentElement
  , $body      = $(body)
  , $html      = $(html)
  , $document  = $(document)
  , $window    = $(window)
  , $viewport  = $html.add($body)
  , Locomotive = window.Locomotive || {}
  ;



/* ==========================================================================
   Keyboard
   ========================================================================== */

if ( 'Locomotive' in window )
{

/**
 * @usage   if ( Locomotive.Keys.test( event.which, 'close' ) )
 * @return  Boolean
 */

	Locomotive.Keys = {
		map: {
			// Enter, Space, Page down, Right arrow, Down arrow,
			next : [ 32, 34, 39, 40 ],

			// Backspace, Page up, Left arrow, Up arrow
			prev : [ 33, 37, 38 ],

			// Escape
			activate : [ 13 ],

			// Escape
			cancel : [ 27 ],

			// Escape
			close : [ 27 ],

			// Escape
			dismiss : [ 27 ]
		},

		test: function ( code, key ) {

			if ( key in this.map ) {
				return ( code === this.map[ key ] ) || $.inArray(code, this.map[ key ]) > -1
			}

			return false;
		}
	};

}



/* ==========================================================================
   Accessibility
   ========================================================================== */

/**
 *
 */

	$document.on('click.loco.accessibility', '.accessibility-aid', function(){
		var $trigger = $(this)
		  , $target  = $( '#' + $trigger.attr('href').getFragment().escapeSelector() )
		  ;

		return $target.converge();
	});



/* ==========================================================================
   Bad
   ========================================================================== */

// @shame, flexbox firefox in expertise
if ( ! /Firefox/i.test(navigator.userAgent) ) {
	$html.addClass('is-not-firefox');
}
