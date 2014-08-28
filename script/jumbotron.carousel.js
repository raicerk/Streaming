/**
 * Jumbotron / Carousel
 * ==========================================================================
 * @package  Locomotive/JS/Jumbotron
 */

var Locomotive       = window.Locomotive    || {};
Locomotive.Jumbotron = Locomotive.Jumbotron || {};

/* ========================================================================== */

Locomotive.Jumbotron.Carousel = {

	settings: {},

	defaults: {
		  singleItem      : true
		//itemsScaleUp    : true

		// Autoplay
		, autoPlay        : 5000

		// Navigation
		, navigation      : false
		, pagination      : true

		// Lazy Load
		, lazyLoad        : true
		, lazyFollow      : true
		, lazyEffect      : 'fade'

		// Mouse Events
		, mouseDrag       : false
		, touchDrag       : true

		// Transitions
		, transitionStyle : 'goUp'
	},

	constants: {
		  loaded    : false
		, color     : 'light'
		, direction : 'next'
		, visisble  : false
		, inrange   : false
	},

	element: null,

	carousel: null,

	classes: {},

	init: function ( element, options ) {
		// console.log( 'Init Locomotive/Jumbotron/Carousel' );

		this.element = ( element instanceof jQuery ? element : $('[role="marquee"]') );

		if ( this.element.length < 1 ) {
			return false;
		}

		this.settings = $.extend({}, this.defaults, options);

		this.setup();
		this.startup();

		return this.constants.loaded;
	},

	setup: function () {
		this.namespace = Locomotive.Jumbotron.namespace;

		if ( 'Waypoint' in Locomotive.Jumbotron ) {
			this.sibling = Locomotive.Jumbotron.Waypoint;
		}

		// jQuery OwlCarousel
		if ( $.fn.owlCarousel ) {

			// Callbacks
			this.settings.afterInit   = $.proxy(this.handlers.init, null, this);
			this.settings.afterAction = $.proxy(this.handlers.action, null, this);

			this.element
				.removeClass('is-latent')
				.owlCarousel( this.settings );

			this.element.parents('jumbotron-wrapper').removeClass("loading");

		}
	},

	startup: function () {
		if ( this.carousel && this.carousel.owl ) {
			return true;
		}
		else {
			var owl = $.data(this.element.get(0), 'owlCarousel');

			if ( owl ) {
				this.carousel = owl;
				this.constants.loaded = true;
				return true;
			} else {
				this.constants.loaded = false;
			}
		}

		return false;
	},

	handlers: {

		init: function ( that, $base ) {

			if ( 'Masthead' in Locomotive ) {
				Locomotive.Masthead.set('detachOffset', $base.outerHeight());
			}

			// Allow Waypoints (and others) to control
			// when the carousel is active.
			if ( 'Waypoint' in Locomotive.Jumbotron ) {
				this.stop();
			}

			// Stop the carousel when hovering
			// over links in a slide.
			$base.on('mouseenter' + that.namespace + ' ' + 'mouseleave' + that.namespace, '.jumbo__body', $.proxy(that.handlers.pauseOnHover, that));
		},

		action: function ( that, $base ) {
			var $item  = $( this.$userItems[ this.owl.currentItem ] )
			  , $pager = $( this.paginationWrapper[0] )
			  , color  = $item.css('color')
			  ;

			if ( color ) {
				$pager.css('color', color);
			}

			that.constants.direction = this.playDirection;

			// This event is fired when the carousel
			// has completed startup, move, or update.
			var eventData = {
				relatedTarget : $item
			};

			$base.trigger( $.Event('slide' + that.namespace, eventData) );
		},

		// Stop the carousel when hovering over links in a slide.
		pauseOnHover: function ( event ) {
			if ( this.carousel && this.constants.loaded )
			{
				if ( 'mouseenter' === event.type ) {
					this.carousel.stop();
				}
				if ( 'mouseleave' === event.type ) {
					this.carousel.play();
				}
			}
		}

	}

};
