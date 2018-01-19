sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
	"use strict";

	return Controller.extend("Demo.controller.Home", {
		
		onInit  : function() {
			
		},
		
		/////////////////////////////////////
		// EVENTS
		/////////////////////////////////////

		onLayoutComplete: function(oEvent) {
			console.log("EVENT -> onLayoutComplete");
		},

		onRemoveComplete: function(oEvent) {
			console.log("EVENT -> onRemoveComplete");
		},

		onImageLoadedAlways: function(oEvent) {
			console.log("EVENT -> onImageLoadedAlways");
		},

		onImageLoadedDone: function(oEvent) {
			console.log("EVENT -> onImageLoadedDone");
		},

		onImageLoadedFail: function(oEvent) {
			console.log("EVENT -> onImageLoadedFail");
		},

		onImageLoadedProgress: function(oEvent) {
			console.log("EVENT -> onImageLoadedProgress");
			console.log("EVENT -> image " + oEvent.getParameter("image") );
			console.log("EVENT -> isLoaded " + oEvent.getParameter("loaded") );
		}

	});
});