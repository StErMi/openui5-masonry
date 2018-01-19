/*!
 * ${copyright}
 */
sap.ui.define(['jquery.sap.global'],
	function(jQuery) {
	"use strict";


	/**
	 * @author Emanuele Ricci
	 * @version
	 * 0.0.1
	 * @namespace
	 */
	var MasonryLayoutRenderer = {};

	/**
	 * Renders the HTML for the given control, using the provided
	 * {@link sap.ui.core.RenderManager}.
	 *
	 * @param {sap.ui.core.RenderManager}
	 *            oRm the RenderManager that can be used for writing to the render
	 *            output buffer
	 * @param {sap.ui.core.Control}
	 *            oControl an object representation of the control that should be
	 *            rendered
	 */
	MasonryLayoutRenderer.render = function(oRm, oControl) {
		// write the HTML into the render manager
		oRm.write("<div");
		oRm.writeControlData(oControl);
		oRm.addClass("openui5-masonry");
		oRm.writeClasses();
		oRm.write(">");

		// Print div for grid-sizer utility
		oRm.write("<div");
		oRm.addClass("openui5-masonry-grid-sizer");
		oRm.writeClasses();
		oRm.write("></div>");

		var aItems = oControl.getContent();
		for ( var i = 0; i < aItems.length; i++) { // loop over all child controls
            oRm.write("<div");
		    oRm.addClass("openui5-masonry-grid-item");
			oRm.writeClasses();
			oRm.write(">");
			oRm.renderControl(aItems[i]);
			oRm.write("</div>"); // end of the box around the respective child
		}
		oRm.write("</div>"); // end of the complete grid  control
	};

	return MasonryLayoutRenderer;

}, /* bExport= */ true);
