/*!
 * ${copyright}
 */

/**
 * Initialization Code and shared classes of library it.designfuture.masonry.
 */
sap.ui.define([
	'jquery.sap.global', 
	'sap/ui/core/library' // library dependency
	],  function(jQuery, library) {

		"use strict";

		/**
		 * Suite controls library.
		 *
		 * @namespace
		 * @name it.designfuture.masonry
		 * @author Emanuele Ricci <stermi@gmail.com>
		 * @version ${version}
		 * @public
		 */


		// delegate further initialization of this library to the Core
		sap.ui.getCore().initLibrary({
			name : "it.designfuture.masonry",
			version: "${version}",
			noLibraryCSS: true,
			dependencies : ["sap.ui.core", "sap.m"],
			types: [],
			interfaces: [],
			controls: [ 
				"it.designfuture.masonry.MasonryLayout"
			],
			elements: []
		});

		return it.designfuture.masonry;

}, /* bExport= */ false);