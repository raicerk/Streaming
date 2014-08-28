/**
 * Forms
 * ==========================================================================
 * @package  Locomotive/JavaScripts
 */

var Locomotive = window.Locomotive || {};
Locomotive.Forms = Locomotive.Forms || {};

Locomotive.Forms.Uniform = {
	options: {
		  eventNamespace : '.loco.uniform'
		, activeClass    : '-active'
		, checkedClass   : '-checked'
		, disabledClass  : '-disabled'
		, focusClass     : '-focus'
		, hoverClass     : '-hover'
	}
}

Locomotive.Forms.Textarea = {

	$: {
		  all      : $('textarea')
		, autoSize : $('textarea.autosize')
	},

	constants: {},

	handlers: {},

	methods: {

		init: function () {
			var LF = Locomotive.Forms.Textarea;

			if ( LF.$.all.length )
			{

				if ( $.fn.autosize && LF.$.autoSize.length )
				{
					LF.$.autoSize.autosize({ append: '' }).attr('rows', 'auto');
				}

			}
		},

		resize: function () {
			var LF = Locomotive.Forms.Textarea;

			if ( $.fn.autosize && LF.$.autoSize.length )
			{
				LF.$.autoSize.trigger('autosize.resize');
			}
		}

	}

};

Locomotive.Forms.Select = {

	$: {
		  all    : $('select')
		, ranges : $('select', '.select-range')
	},

	options: {
		  selectClass      : 'uniform-control uniform-select'
		, selectMultiClass : 'uniform-select__multi'
		, selectAutoWidth  : false
		, eventNamespace   : '.loco.uniform'
	},

	constants: {},

	handlers: {

		placeholder: function () {
			if ( $.fn.uniform )
			{
				var $select = $(this).closest('.uniform-select');

				if ( ! this.value )
					$select.addClass('default');
				else
					$select.removeClass('default');

			} else {
				if ( ! this.value )
					this.setAttribute('default', '');
				else
					this.removeAttribute('default');
			}
		},

		range: function () {
			if ( $.fn.uniform )
			{
				var $select = $(this).closest('.uniform-select');

				if ( ! $select.attr('max') )
					$select.attr('max', this.childElementCount - 1);

				$select.attr('step', this.selectedIndex);

			} else {
				if ( ! this.hasAttribute('max') )
					this.setAttribute('max', this.childElementCount - 1);

				this.setAttribute('step', this.selectedIndex);
			}

		}

	},

	methods: {

		init: function () {
			var LF = Locomotive.Forms.Select;

			if ( LF.$.all.length && $.fn.uniform )
			{
				var settings = $.extend({}, Locomotive.Forms.Uniform.options, LF.options);

				LF.$.all.uniform(settings);

				LF.methods.events();
			}
		},

		events: function () {
			var LF = Locomotive.Forms.Select;

			LF.$.ranges.on('change.loco.select', LF.handlers.range );

			LF.$.all.on('change.loco.select', LF.handlers.placeholder ).trigger('change.loco.select');
		}

	}

};

Locomotive.Forms.File = {

	$: {
		  all:       $(':file')
		, placeheld: $(':file[placeholder]')
	},

	options: {
		  fileClass       : 'uniform-control uniform-file'
		, filenameClass   : 'uniform-file__name'
		, fileButtonClass : 'uniform-file__button'
		, fileButtonHtml  : 'Choose File&hellip;'
		, fileDefaultHtml : 'No file selected'
	},

	constants: {},

	handlers: {

		setFilename: function ( /* event */ ) {
			var LF       = Locomotive.Forms.File
			,   $input   = $(this)
			,   $wrapper = $(this).parent()
			,   filename = $input.val();

			console.log( 'setFilename', event.type, filename );

			if ( filename === "" ) {
				filename = $input.attr('placeholder') || LF.options.fileDefaultHtml;
			}

			$wrapper[ filename === "" ? 'removeClass' : 'addClass' ]('-attached');
		}

	},

	methods: {

		init: function () {
			var LF = Locomotive.Forms.File;

			if ( LF.$.all.length )
			{
				if ( $.fn.uniform )
				{
					var settings = $.extend({}, Locomotive.Forms.Uniform.options, LF.options);

					if ( LF.$.placeheld.length )
						LF.$.placeheld.each(function(){
							var $this = $(this)
							,   opts  = $.extend({}, settings, { fileButtonHtml: $this.attr('placeholder') });

							$this.uniform(opts);
						});
					else
						LF.$.all.uniform(settings);
				}

				LF.methods.events();
			}
		},

		events: function () {
			var LF = Locomotive.Forms.File;

			if ( $.fn.uniform )
			{
				// MSIE
				if ( navigator.cpuClass && ! navigator.product ) {
					// IE considers browser chrome blocking I/O, so it
					// suspends tiemouts until after the file has
					// been selected.
					LF.$.all.on('click.loco.file', function () {
						$(this).trigger('change');
						setTimeout(LF.handlers.setFilename.bind(this), 0);
					});
				} else {
					// All other browsers behave properly
					LF.$.all.on('change.loco.file', LF.handlers.setFilename);
				}

				LF.$.all
					.closest('form')
					.find(':reset')
					.on('click.loco.reset', function () {
						window.setTimeout(function () {
							$.uniform.update(el);
						}, 10);
					});
			}

		}

	}

};

Locomotive.Forms.Validate = {
	init: function () {
		var recaptcha_open = false;
		$(".form-contact input").on('focus', function(event) {
			event.preventDefault();
			var $this = $(this);
			var $recaptcha_id = 'recaptcha-home';

			if ($this.parents(".form-contact").hasClass('form--project')) {
				$recaptcha_id = 'recaptcha-project';
			}

			if ($this.parents(".form-contact").hasClass('form--career')) {
				$recaptcha_id = 'recaptcha-career';
			}
			if ($this.parents(".form-contact").hasClass('form--enquiry')) {
				$recaptcha_id = 'recaptcha-enquiry';
			}



			if (recaptcha_open === false) {
				Recaptcha.create("6LfI_PgSAAAAAIvz_yuD-XetJqkb7ICCWGnNBYyw",
				    ""+ $recaptcha_id +"",
				    {
				      theme: "white"
				    }
				);
				recaptcha_open = true;
			}
		});



		$(".form-contact").lvalidate({
			onError: function (elem) {
				var message = elem.attr("data-validation-message");

				elem.parents(".form-group").addClass('field--error');
				elem.parents(".form-group").find('.form-message').html(message);

				if(elem.attr('type') === 'file') {

				}
			},

			onSuccess: function (elem) {
				elem.parents(".form-group").removeClass('field--error');
				elem
					.parents(".form-group")
					.find('.form-message')
					.html("")

			},
			valid: function (form) {
				// All ok? Then submit the form!
				// Or send by ajax, whatever

			    var challenge = Recaptcha.get_challenge();
			    var response = Recaptcha.get_response();
			    form.submit();



			},
			invalid: function () {

			}
		});
	}
}
/*
Locomotive.Forms.Recaptcha = {
	init: function () {
		alert("Aaa");
	}
}
*/
Locomotive.Forms.Ajax = {
	init: function (form) {
		var data = form.serialize();
		$.ajax({
			type: "POST",
			data: data,
			enctype: 'multipart/form-data',
			success:function (/* datas */){
				form.parents('.form-wrapper').addClass('form--success');

				setTimeout($.proxy(function() {
					// console.log(form);
					form.parents('.form-wrapper').removeClass('form--success');
					form.find("input[type=text],input[type=email],input[type=phone],input[type=file], textarea").val("");
					form.find(".uniform-control").removeClass('-attached');
				}, form), 6000);


			},
			dataType: "json"
		});
	}
}

Locomotive.Forms.Validate.init();
