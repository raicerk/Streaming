/*!
 * SVG Ejector 1.0.0-beta
 * https://github.com/mcaskill/svg-ejector
 *
 * Released under the MIT license
 * https://github.com/mcaskill/svg-ejector/LICENSE
 */

(function (window, document) {

	'use strict';

	// If SVG is supported, well, that's awesome. Let's get outta here...
	if ( document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1') ) {
		return;
	}

	// Environment
	var isLocal = window.location.protocol === 'file:';

	var SVG = {};

	// Default namespaces
	SVG.ns    = 'http://www.w3.org/2000/svg';
	SVG.xmlns = 'http://www.w3.org/2000/xmlns/';
	SVG.xlink = 'http://www.w3.org/1999/xlink';

	// Find all <svg> elements and find all <use> elements,
	// that don't have <svg> parents, with data-src attributes.
	SVG.getAllElements = function() {
		// console.group('getAllElements');

		var svgs  = document.getElementsByTagName('svg')
		  ,	uses  = document.getElementsByTagName('use')
		  , elems = []
		  ;

		// console.log('SVGs', svgs);
		// console.log('USESs', uses);

		// console.group('Loop');
		for ( var h = 0, len = svgs.length + uses.length; h < len; h++ ) {
			// console.log('Iteration', h)
			if ( h < svgs.length ) {
				var currSVG = svgs[ h ];

				// console.log('SVG', currSVG, currSVG.getAttribute('data-src'), currSVG.getAttribute('data-alt'));
				if ( currSVG.getAttribute('data-src') !== null
				  || currSVG.getAttribute('data-alt') !== null ) {
					elems.push(currSVG);
				}
			} else {
				var currUse = uses[ h - svgs.length ];

				// console.log('USE', currUse, currUse.parentNode.nodeName.toUpperCase(), currUse.getAttribute('data-src'), currUse.getAttribute('data-alt'));
				if ( currUse.parentNode.nodeName.toUpperCase() === 'SVG'
				  && ( currUse.getAttribute('data-src') !== null
				  ||   currUse.getAttribute('data-alt') !== null ) ) {
						elems.push( currUse );
				}
			}
		}
		// console.groupEnd();

		// console.groupEnd();
		return elems;
	};

	SVG.processAttr = function ( elemOrig, elemDest, attrData ) {

		var elemType
		  , elemParent
		  , parentType
		  ;

//		attrData.svgXLink = elemOrig.getAttributeNS(SVG.xlink, 'href');
//		if (attrData.svgXLink) {
//			elemDest.setAttribute('data-xlink-href', attrData.svgXLink);
//		}

		attrData.id = elemOrig.getAttribute('id');
		if (attrData.id) {
			elemDest.setAttribute('id', attrData.id);
		}

		attrData.title = elemOrig.getAttribute('title');
		if (attrData.title) {
			elemDest.setAttribute('title', attrData.title);
		}

		attrData.classes = elemOrig.getAttribute('class');
		if (attrData.classes) {
			var classMerge
			  , svgClass
			  ;

			// @todo Don't add dups
			if ( elemType === 'USE' && parentType === 'SVG' ) {
				svgClass = elemParent.getAttribute('class');
			}

			classMerge = [ svgClass, 'icon--replaced', attrData.classes ].join(' ');
			elemDest.setAttribute('class', classMerge);
		}

		attrData.styles = elemOrig.getAttribute('style');
		if (attrData.styles) {
			elemDest.setAttribute('style', attrData.styles);
		}

		// Copy all the `data` elements to the <img>
		attrData.data = [].filter.call(elemOrig.attributes, function (at) {
			return (/^data-\w[\w\-]*$/).test(at.name);
		});
		Array.prototype.forEach.call(attrData.data, function (dataAttr) {
			if ( (attrData.url    && dataAttr.name === 'data-src')
			  || (attrData.alt    && dataAttr.name === 'data-alt')
			  || (attrData.height && dataAttr.name === 'data-height')
			  || (attrData.width  && dataAttr.name === 'data-width') ) {
				return;
			}
			if ( dataAttr.name && dataAttr.value ) {
				elemDest.setAttribute(dataAttr.name, dataAttr.value);
			}
		});

		if (attrData.url) {
			elemDest.src = attrData.url;
		}

		return elemDest;
	}

	// Inject a single element
	SVG.injectElement = function ( element, options ) {
		// console.group('injectElement');

		var elemParent
		  , elemType
		  , parentType
		  , attrData = {}
		  , newElem
		  ;

		elemParent = element.parentNode
		elemType   = element.nodeName.toUpperCase();
		parentType = elemParent.nodeName.toUpperCase();

		// console.log('Element', element);
		// console.log('Parent', elemParent);

		// Grab the src or data-src attribute
		attrData.url = element.getAttribute('data-src') || element.getAttribute('src');

		// Grab the alt or data-alt attribute
		attrData.alt = element.getAttribute('data-alt') || element.getAttribute('alt');

		if ( attrData.url ) {

			// Grab the dimensions
			attrData.height = element.getAttribute('height');
			attrData.width  = element.getAttribute('width');

			newElem = new Image(attrData.width, attrData.height);

			if (attrData.alt) {
				newElem.setAttribute('alt', attrData.alt);
			}

		}
		else if ( attrData.alt ) {

			newElem = document.createElement('span');

			newElem.appendChild( document.createTextNode(attrData.alt) );

		}
		else {
			return;
		}

		newElem = SVG.processAttr(element, newElem, attrData);

		// Replace the <svg> with the <img> or textNode
		elemParent.replaceChild(newElem, element);

		// console.log('Replaced', newElem);
		// console.groupEnd();

		return newElem;
	}

	/**
	 * SVGEjector
	 *
	 * Replace full inline SVG DOM elements with their given IMG elements.
	 *
	 * :NOTE: We are using get/setAttribute with SVG because the SVG DOM spec differs from HTML DOM and
	 * can return other unexpected object types when trying to directly access svg properties.
	 * ex: "className" returns a SVGAnimatedString with the class value found in the "baseVal" property,
	 * instead of simple string like with HTML Elements.
	 */
	var SVGEjector = function ( options ) {
		// console.group('SVGEjector');

		var elements
		  , element
		  , elemType
		  , replaced
		  , children
		  , parents = []
		  , parent
		  , l
		  , i
		  ;

		// Options & defaults
		options  = options || {};
		elements = options.elements || SVG.getAllElements();

		// console.log('elements', elements);

		// Loop through all elements
		for ( i = 0, l = elements.length; i < l; i++ ) {

			element  = elements[ i ];
			replaced = SVG.injectElement( element, options );

//			if ( replaced.parentNode.nodeName.toUpperCase() === 'SVG' ) {
//				parents.push( replaced.parentNode );
//			}

		}

//		for ( i = 0, l = parents.length; i < l; i++ ) {
//
//			parent = parents[ i ];
//
//			if ( parent.hasChildNodes() ) {
//				children = parent.childNodes;
//
//				if ( parent.parentNode ) {
//					parent.parentNode.replaceChild(children, parent);
//				}
//			}
//
//		}

		// console.groupEnd();
	}

	/**
	 * Sets up SVGEjector by polling the document and running
	 * the function every 250ms until the document is ready.
	 */
	function runSVGEjector() {
		// console.log('runSVGEjector');

		// SVGEjector();

		var intervalId = setInterval( function() {
			// When the document has finished loading, stop checking for new images
			// https://github.com/ded/domready/blob/master/ready.js#L15
			SVGEjector();
			if ( /^loaded|^i|^c/.test( document.readyState ) ) {
				clearInterval( intervalId );
				return;
			}
		}, 250 );
	}

	runSVGEjector();

	/* expose methods for testing */
	SVGEjector._ = SVG;

	/* global module, exports: true, define */
	// Node.js or CommonJS
	if ( typeof module === 'object' && typeof module.exports === 'object' ) {
		module.exports = exports = SVGEjector;
	}
	// AMD support
	else if ( typeof define === 'function' && define.amd ) {
		define(function () {
			return SVGEjector;
		});
	}
	// Otherwise, attach to window as global
	else if ( typeof window === 'object' ) {
		window.SVGEjector = SVGEjector;
	}
	/* global -module, -exports, -define */

}(window, document));
