/**
 * Masthead
 * ==========================================================================
 * @package  Locomotive/JS
 * @alias    Site Header
 */

var Locomotive = window.Locomotive || {};

/* ========================================================================== */

Locomotive.Masthead = {

	namespace: '.loco.masthead',

	settings: {},

	defaults: {
		  height       : 94
		, lastScroll   : 0
		, detachOffset : 0
		, revealOffset : 20
		, colored      : false
		, attached     : true
		, visible      : true
		, openMenu     : true
		, openShelf    : true
		, color        : false
		, timer        : null
		, collapsed    : 630
	},

	elements: {
		header : null
	},

	classes: {
		  'mast-visible'  : 'mast--is-revealed'
		, 'mast-hidden'   : 'mast--is-concealed'
		, 'mast-attached' : 'mast--is-attached'
		, 'mast-detached' : 'mast--is-detached'
		, 'mast-latent'   : 'mast--is-latent'      // JS Enhanced
		, 'mast-opaque'   : 'mast--is-opaque'
		, 'menu-hidden'   : 'menu--is-collapsible'
		, 'menu-visible'  : 'menu--is-revealed'
		, 'menu-toggle'   : 'menu-toggle'
		, 'shelf-hidden'  : 'shelf--is-collapsible'
		, 'shelf-visible' : 'shelf--is-revealed'
		, 'shelf-toggle'  : 'shelf-toggle'
	},

	init: function ( options ) {
		// console.log( 'Init Locomotive/Masthead' );

		this.elements.header = $('[role="banner"]');

		if ( this.elements.header.length < 1 ) {
			return false;
		}

		this.settings = $.extend({}, this.defaults, options);

		this.settings.height       = this.elements.header.outerHeight() || this.elements.header.children().outerHeight();
		this.settings._height      = this.settings.height;

		if ( $body.hasClass( this.className('mast-opaque') ) ) {
			this.settings.detachOffset = this.settings.height * 2;
		}
		else {
			this.settings.detachOffset = $window.height();
		}

		if ( $body.hasClass( this.className('menu-hidden') ) || $window.width() < this.settings.collapsed ) {
			this.settings.openMenu = false;
		}

		if ( $window.width() < this.settings.collapsed ) {
			this.settings.openShelf = false;
		}

		this.throttled = throttle($.proxy(this.handlers.scroll, this), 250);

		$document
			.on('scroll'    + this.namespace, this.throttled)
			.on('mousemove' + this.namespace, $.proxy(this.handlers.mouse, this))
			// .on('keyup'     + this.namespace, $.proxy(this.handlers.key, this))
			.on('slide.loco.jumbotron', $.proxy(this.color, this))
			;

		this.elements.header
			.on('mouseleave' + this.namespace, $.proxy(this.handlers.mouse, this))
			.on('click'      + this.namespace, 'a,button,.btn,.menu-toggle,.shelf-toggle', $.proxy(this.toggle, this))
			;

		$body.removeClass( this.className('mast-latent') );

	},

	set: function ( name, value ) {
		if ( name in this.settings ) {
			this.settings[ name ] = value;
			return true;
		}
		else {
			return false;
		}
	},

	get: function ( name ) {
		return this.settings[ name ] || null;
	},

	className: function ( name, prefix ) {

		prefix = prefix || '';

		return ( this.classes[name] ? prefix + this.classes[name] : name );

	},

	detach: function () {
		// console.log('detach');

		if ( this.settings.attached ) {
			$body.removeClass( 'carousel--is-light carousel--is-dark' ).addClass( this.className('mast-detached') );
			this.settings.attached = false;

//			if ( this.settings.colored ) {
//				$body.removeAttr('style');
//				this.settings.colored = false;
//			}
		}

	},

	attach: function () {
		// console.log('attach');

		if ( ! this.settings.attached ) {
			$body.removeClass( this.className('mast-detached') ).addClass( this.settings.color ? ' carousel--is-' + this.settings.color : '' );
			this.settings.attached = true;
		}

	},

	hide: function () {
		// console.log('hide');

		if ( this.settings.visible ) {
			if ( $window.width() < this.settings.collapsed ) {
				this.closeMenu();
			}

			$body.removeClass( this.className('mast-visible') ).addClass( this.className('mast-hidden') );
			this.settings.visible = false;
		}

	},

	show: function () {
		// console.log('show');

		if ( ! this.settings.visible ) {
			$body.removeClass( this.className('mast-hidden') ).addClass( this.className('mast-visible') );
			this.settings.visible = true;
		}

	},

	openMenu: function () {
		// console.log('openMenu');

		$body/* .removeClass('carousel--is-light carousel--is-dark') */.addClass( this.className('menu-visible') );
		this.settings.openMenu = true;

		// console.groupEnd();
	},

	closeMenu: function () {
		// console.log('closeMenu');

		$body.removeClass( this.className('menu-visible') );
		this.settings.openMenu = false;

		// console.groupEnd();
	},

	openShelf: function () {
		// console.log('openShelf');

		$body.addClass( this.className('shelf-visible') );
		this.settings.openShelf = true;

		// console.groupEnd();
	},

	closeShelf: function () {
		// console.log('closeShelf');

		$body.removeClass( this.className('shelf-visible') );
		this.settings.openShelf = false;

		// console.groupEnd();
	},

	toggle: function ( event ) {
		// console.group('toggle', event);

		if ( event ) {

			var $target = $(event.currentTarget).trigger('blur');

			if ( event.isKeyboardTriggered() ) {
				this.elements.header
					.find('.site-header__navigation')
					.converge()
					;
			}

			if ( $target.hasClass( this.className('menu-toggle') ) ) {
				// console.log('menu-toggle');

				if ( this.settings.openMenu ) {
					this.closeMenu();
				} else {
					this.openMenu();
				}
			}

			if ( $target.hasClass( this.className('shelf-toggle') ) ) {
				// console.log('shelf-toggle');

				if ( this.settings.openShelf ) {
					this.closeShelf();
				} else {
					this.openShelf();
				}
			}

		}

		// console.groupEnd();
	},

	color: function ( event ) {

		var $target = $(event.relatedTarget)
		  , color   = ( $target.hasClass('fg--white') ? 'dark' : 'light' )
		  ;

		if ( color !== this.settings.color ) {
			this.settings.color = color;
			if ( /* ! this.settings.openMenu || */ this.settings.attached ) {
				$body.removeClass( 'carousel--is-dark carousel--is-light' ).addClass('carousel--is-' + color);
			}
		}

	},

	handlers: {

//		key: function ( event ) {
//			if ( Locomotive.Keys.test( event.which, 'closeMenu' ) ) {
//				this.closeMenu();
//			}
//		},

		scroll: function () {

			if ( this.settings.openMenu && $window.width() < this.settings.collapsed ) {
				return;
			}

			// Manage Pointer Event Disabling
			clearTimeout(this.settings.timer);

			if ( ! $body.hasClass('disable-hover') ) {
				$body.addClass('disable-hover');
			}

			this.settings.timer = setTimeout(function(){
				$body.removeClass('disable-hover');
			}, 250);

			// Manage Masthead Attachment & Visibility
			var scrollPosition  = $window.scrollTop()
			  , scrollDirection = ( scrollPosition > this.settings.lastScroll ? 'FORWARD' : 'REVERSE' )
			  , scrollOffset    = Math.abs(scrollPosition - this.settings.lastScroll)
			  ;

			if ( scrollPosition >= this.settings.detachOffset ) {
				this.detach();
			}

			if ( 0 >= scrollPosition ) {
				this.attach();
			}

			if ( scrollPosition + $window.height() === $document.height() ) {
				this.show();
			}

			if ( scrollPosition > -1 ) {

				if ( 'FORWARD' === scrollDirection && scrollOffset >= this.settings.revealOffset && scrollPosition >= this.settings.detachOffset ) {
					this.hide();
				} else {

					if ( 'REVERSE' === scrollDirection && scrollOffset >= this.settings.revealOffset ) {
						this.show();
					}

				}

			} else {
				this.show();
			}

			this.settings.lastScroll = scrollPosition;
		},

		mouse: function ( event ) {

			if ( this.settings.openMenu && $window.width() < this.settings.collapsed ) {
				return;
			}

			if ( 'mouseleave' === event.type ) {
				if ( $document.scrollTop() > 0 ) {
					this.hide();
				}
			}
			else {
				if ( event.clientY <= this.settings.height ) {
					this.show();
				}
			}

		}

	}

};
