/**
 * Jumbotron
 * ==========================================================================
 * @package  Locomotive/JS
 */

var Locomotive = window.Locomotive || {};

/* ========================================================================== */

Locomotive.Jumbotron = {

	namespace: '.loco.jumbotron',

	settings: {},

	constants: {
		  loaded   : false
		, waypoint : false
		, carousel : false
	},

	element: null,

	classes: {},

	init: function ( element, options ) {
		// console.log( 'Init Locomotive/Jumbotron', this );

		this.element = ( element instanceof jQuery ? element : $('[role="marquee"]') );

		if ( this.element.length < 1 ) {
			return false;
		}

		this.settings = $.extend({}, this.defaults, options);

		if ( 'Carousel' in this ) { this.constants.carousel = this.Carousel.init( this.element ); }
		if ( 'Waypoint' in this ) { this.constants.waypoint = this.Waypoint.init( this.element ); }

	}

};
