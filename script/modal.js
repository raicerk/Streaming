/**
 * Modal
 * ==========================================================================
 * @package  Locomotive/JS
 * @alias    Overlay
 */

// var Locomotive = window.Locomotive || {};

/* ========================================================================== */

Locomotive.Modal = {

	namespace: '.loco.modal',

	elements: {
		  morph : null
		, modal : null
	},

	init: function () {
		// console.log('init');

		if ( ! $html.hasClass('has-csstransitions') || ! $html.hasClass('has-no-touch') || $window.width() < 800) {
			return;
		}

		this.elements.morph = $('.morph');

		// this.elements.morph.each(this.size);

		this.events();
	},

	events: function () {
		// console.log('events');

		this.elements.morph.on('click' + this.namespace, '[data-toggle="morph"]', $.proxy(this.handlers.open, this));
		this.elements.morph.on('click' + this.namespace, '[data-dismiss="morph"]', $.proxy(this.handlers.close, this));

	},

	size: function () {
		// console.log('size');

		var $morph = $(this)
		  , $modal = $morph.children('.morph-content')
		  ;

		$modal.width( $morph.width() ).height( $morph.height() );

	},

	position: function () {

		var $morph = $(this)
		  , $modal = $morph.children('.morph-content')
		  , morphOffset    = $morph.offset()
		  , scrollPosition = $window.scrollTop()
		  ;

		$modal.css({
			  'top'    : morphOffset.top - scrollPosition
			, 'right'  : $window.outerWidth() - $morph.outerWidth() - morphOffset.left
			, 'bottom' : $window.outerHeight() - $morph.outerHeight() - ( morphOffset.top - scrollPosition )
			, 'left'   : morphOffset.left
		});

	},

	handlers: {

		open: function ( event ) {
			// console.log('open', event);

			event.preventDefault();

			var $morph = $(event.delegateTarget);

			var eventData = {
				relatedTarget : $morph
			};

			// This event fires immediately when the `open` instance
			// method is called.
			$morph.trigger( $.Event('show' + this.namespace, eventData) );

			setPosition = $.proxy( this.position, event.delegateTarget );
			setPosition();
			/*
			var $morph_recaptcha = $morph.find('.recaptcha-home');
			var $morph_recaptcha_wrap = $morph.find('.recpatcha-wrap');

			//console.log($morph_recaptcha);
			$morph_recaptcha.append($(".recpatcha-wrap"));
			$(".recpatcha-wrap").addClass('visible');
			*/

			//is used so there is just one mili second before the add class is fired
			//if this is not added, the top will not be animated
			setTimeout( $.proxy(function() {
				$html.addClass('modal--is-revealed');
				$morph.addClass('morph--is-open');

				//console.log( 'modalOpen', 'shown' + this.namespace );

				// This event is fired when the modal has been
				// made visible to the user.
				$morph.trigger( $.Event('shown' + this.namespace, eventData) );

				// Locomotive.Forms.Textarea.methods.resize();


			}, this), 1);

			$document.on('keydown' + this.namespace, $.proxy(this.handlers.keys, this));

		},

		close: function ( event ) {
			// console.log('close', event);

			event.preventDefault();

			var $morph = $(event.delegateTarget);

			var eventData = {
				relatedTarget : $morph
			};

			// This event is fired immediately when the `close` instance
			// method has been called.
			$morph.trigger( $.Event('hide' + this.namespace, eventData) );

			$html.removeClass('modal--is-revealed');
			$morph.removeClass('morph--is-open');

			// This event is fired when the modal has finished
			// being hidden from the user.
			$morph.trigger( $.Event('hidden' + this.namespace, eventData) );

			$document.off('keydown' + this.namespace);
		},

		resize: function () {

		},

		keys: function ( event ) {
			var Keys = Locomotive.Keys;

			if ( Keys.test(event.which, 'dismiss') ) {
				event.preventDefault();
				this.handlers.close();
			}

		}

	}

}
