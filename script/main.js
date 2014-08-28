/**
 * Locomotive
 * ==========================================================================
 * Why Locomotive?
 *
 * @package       Locomotive/JavaScripts
 * @namespace     Locomotive
 * @dependencies  jQuery
 *
 * Project Components :
 *    - Relative : locomotive/*
 *    - Absolute : /modules/locomotive/assets/scripts/src/locomotive/*
 *
 * Vendor Components (Customized) :
 *    - Relative : vendor/*
 *    - Absolute : /modules/locomotive/assets/scripts/src/vendor/*
 *
 * Bower Components :
 *    - Relative : ../../components/*
 *    - Absolute : /modules/locomotive/assets/components/*
 *
 * Built with :
 *   - jQuery 1.11
 *   - Jonathan Neal‘s Polyfill.io
 *   - Pixelmatrix Design‘s Uniform
 */

var Locomotive = window.Locomotive || {};

/* ========================================================================== */

Locomotive.ready = function () {

	'use strict';

	if ( 'Masthead'  in Locomotive ) { Locomotive.Masthead.init();  }
	if ( 'Jumbotron' in Locomotive ) { Locomotive.Jumbotron.init(); }
	if ( 'BoxInfo'   in Locomotive ) { Locomotive.BoxInfo.init();   }
	if ( 'Modal'     in Locomotive ) { Locomotive.Modal.init();     }
	if ( 'Map'       in Locomotive ) { Locomotive.Map.bootstrap();  }

/* ========================================================================== */

/*
	$(window).on({
		  Locomotive.Events.mousewheel: rt
		  keydown: ut
		, resize: ht
	});
*/
/*
	// Cut the mustard
	if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach )
	{
	}
*/

if ( 'Forms' in Locomotive ) {

	Locomotive.Forms.Textarea.methods.init();
	Locomotive.Forms.Select.methods.init();
	Locomotive.Forms.File.methods.init();

}

}(jQuery, document);

$document.on('ready', Locomotive.ready);
