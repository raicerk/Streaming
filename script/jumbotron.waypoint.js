/**
 * Jumbotron / Waypoints
 * ==========================================================================
 * @package  Locomotive/JS/Jumbotron/Waypoints
 */

var Locomotive       = window.Locomotive    || {};
Locomotive.Jumbotron = Locomotive.Jumbotron || {};

/* ========================================================================== */

Locomotive.Jumbotron.Waypoint = {

	settings: {},

	constants: {
		  loaded    : false
		, color     : 'light'
		, direction : 'next'
		, visisble  : false
		, inrange   : false
	},

	element: null,

	classes: {},

	init: function ( element, options ) {
		// console.log( 'Init Locomotive/Jumbotron/Waypoint' );

		this.element = ( element instanceof jQuery ? element : $('[role="marquee"]') );

		if ( this.element.length < 1 ) {
			return false;
		}

		this.settings = $.extend({}, this.defaults, options);

		this.setup();

		return this.constants.loaded;
	},

	setup: function () {
		this.namespace = Locomotive.Jumbotron.namespace;

		if ( 'Carousel' in Locomotive.Jumbotron ) {
			this.sibling = Locomotive.Jumbotron.Carousel;
		}

		// jQuery Waypoints
		if ( $.fn.waypoint ) {
			this.constants.loaded = true;

			if ( 'Keys' in Locomotive ) {

				this.element
					.on('viewarrival'   + this.namespace, $.proxy(this.handlers.arrival, this))
					.on('viewdeparture' + this.namespace, $.proxy(this.handlers.departure, this));

			}

			this.element
				// Initiate
				.waypoint({
					// handler: function(direction) {
					handler: $.proxy(function() {
						this.element.trigger( $.Event('viewarrival' + this.namespace, { color: this.constants.color }) );
					}, this),
					triggerOnce: true
				})
				// Observe
				//
				// When jumbotron is mostly in view
				// or almost out of view.
				.waypoint({
					handler: $.proxy(function ( direction ) {
						if ( 'up' === direction ) {
							this.element.trigger( $.Event('viewarrival'   + this.namespace, { color: this.constants.color }) );
						}
						else {
							this.element.trigger( $.Event('viewdeparture' + this.namespace, { color: this.constants.color }) );
						}

					}, this),
					offset: function() {
						return -($(this).height() / 2);
					}
				})
				// When jumbotron breaks the horizon.
				.waypoint({
					handler: $.proxy(function(direction) {
						if ( 'up' === direction ) {
							this.element.trigger( $.Event('viewenter' + this.namespace, { color: this.constants.color }) );
						}
						else {
							this.element.trigger( $.Event('viewleave' + this.namespace, { color: this.constants.color }) );
						}

					}, this),
					offset: function() {
						return -$(this).height();
					}
				});

		}
	},

	handlers: {

		// 1. Enable keyboard shortcuts to control carousel.
		// 2. Play the carousel when completely in view.
		arrival: function () {

			if ( this.sibling.constants.loaded ) {
				this.constants.visible = true;
				$document.on('keydown' + this.namespace, $.proxy(this.handlers.keys, this));
				this.sibling.carousel.play();
			}
		},

		// 1. Disable keyboard shortcuts;
		// 2. Pause the carousel when we can't see much of it;
		// No need to have the carousel running if we can't see it.
		departure: function () {

			if ( this.sibling.constants.loaded ) {
				this.constants.visible = false;
				$document.off('keydown' + this.namespace);
				this.sibling.carousel.stop();
			}
		},

		/*
		 * Inspired by Deck.js
		 * https://github.com/imakewebthings/deck.js/
		 *
		 * Copyright (c) 2011–2014 Caleb Troughton
		 * Licensed under the MIT license.
		 */

		keys: function ( event ) {
			var Keys = Locomotive.Keys;

			if ( this.sibling.carousel )
			{
				if ( Keys.test(event.which, 'next') ) {
					this.sibling.constants.direction = 'next';
					this.sibling.carousel.next();
					event.preventDefault();
				}
				else if ( Keys.test(event.which, 'prev') ) {
					this.sibling.constants.direction = 'prev';
					this.sibling.carousel.prev();
					event.preventDefault();
				}
			}

		}

	}

};
