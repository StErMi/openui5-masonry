/*!
 * ${copyright}
 */

// Provides control it.designfuture.masonry.MasonryLayout
sap.ui.define([
    'jquery.sap.global',
    'sap/ui/core/Control',
    './3rdparty/masonry.pkgd.min',
    './3rdparty/imagesloaded.pkgd.min',
    './library'
], function(jQuery, Control, masonry, library) {
"use strict";

/**
 * Constructor for a new MasonryLayout.
 *
 * @param {string} [sId] id for the new control, generated automatically if no id is given 
 * @param {object} [mSettings] initial settings for the new control
 *
 * @class
 * MasonryLayout TODO ADD HERE A DESCRIPTION
 * @extends sap.m.InputBase
 * @version ${version}
 *
 * @constructor
 * @public
 * @since 1.40
 * @name it.designfuture.masonry.MasonryLayout
 */

var MasonryLayout = Control.extend("it.designfuture.masonry.MasonryLayout", /** @lends it.designfuture.masonry.MasonryLayout prototype */ { 
    
    __msnry: undefined,
    __imgLoad: undefined,
    
    metadata : {
        library: 'it.designfuture.masonry',
        properties : {
            
            /**
             * Lays out items to (mostly) maintain horizontal left-to-right order.
             */
            waitImageLoaded : {type : "boolean", group : "Appearance", defaultValue : true},
            
            /**
             * Specifies which child elements will be used as item elements in the layout.
             */
            itemSelector : {type : "string", group : "Appearance", defaultValue : ".grid-item"},
            
            /**
             * Aligns items to a horizontal grid. Use element sizing for responsive layouts with percentage widths. Set columnWidth to an Element or 
             * Selector String to use the outer width of the element for the size of the column.
             */
            columnWidth : {type : "string", group : "Appearance", defaultValue : null},
            
            /**
             * Adds horizontal space between item elements. To set vertical space between elements, use margin CSS.
             */
            gutter : {type : "string", group : "Appearance", defaultValue : null},
            
            /**
             * Lays out items to (mostly) maintain horizontal left-to-right order.
             */
            horizontalOrder : {type : "boolean", group : "Appearance", defaultValue : true},
            
            /**
             * Sets item positions in percent values, rather than pixel values. 
             * percentPosition: true works well with percent-width items, as items will not transition their position on resize.
             */
            percentPosition : {type : "boolean", group : "Appearance", defaultValue : true},
            
            /**
             * Specifies which elements are stamped within the layout. Masonry will layout items below stamped elements.
             * The stamp option stamps elements only when the Masonry instance is first initialized. You can stamp additional elements afterwards with the stamp method.
             */
            stamp : {type : "string", group : "Appearance", defaultValue : null},
            
            /**
             * Sets the width of the container to fit the available number of columns, based the size of container's parent element. 
             * When enabled, you can center the container with CSS.
             */
            fitWidth : {type : "boolean", group : "Appearance", defaultValue : true},
            
            /**
             * Controls the horizontal flow of the layout. By default, item elements start positioning at the left, with originLeft: true. 
             * Set originLeft: false for right-to-left layouts.
             */
            originLeft : {type : "boolean", group : "Appearance", defaultValue : true},
            
            /**
             * Controls the vertical flow of the layout. By default, item elements start positioning at the top, with originTop: true. 
             * Set originTop: false for bottom-up layouts. It’s like Tetris!
             */
            originTop : {type : "boolean", group : "Appearance", defaultValue : true},
            
            /**
             * CSS styles that are applied to the container element.
             * Default: containerStyle: { position: 'relative' }
             * Set to null to disable any styles being set on container, useful if using absolute position on container
             */
            containerStyle : {type : "string", group : "Appearance", defaultValue : "{ position: 'relative' }"},
            
            /**
             * Duration of the transition when items change position or appearance. 
             * Default: transitionDuration: 400 (milliseconds)
             */
            transitionDuration : {type : "int", group : "Appearance", defaultValue : 400},
            
            /**
             * Staggers item transitions, so items transition incrementally after one another.
             * Default: stagger: 30 (milliseconds) 
             */
            stagger : {type : "int", group : "Appearance", defaultValue : 30},
            
            /**
             * Adjusts sizes and positions when window is resized. Enabled by default resize: true.
             */
            resize : {type : "boolean", group : "Appearance", defaultValue : true},
            
            /**
             * Enables layout on initialization. Enabled by default initLayout: true.
             * Set initLayout: false to disable layout on initialization, so you can use methods or add events before the initial layout.
             */
            initLayout : {type : "boolean", group : "Appearance", defaultValue : true}
            
        },
		defaultAggregation : "content",
		aggregations : {

			/**
			 * Controls that are placed into Grid layout.
			 */
			content : {type : "sap.ui.core.Control", multiple : true, singularName : "content"}
		},
        events: {
            /**
             * Triggered after a layout and all positioning transitions have completed.
             */
            layoutComplete: {
                parameters: {
                    /**
                     * Array of Masonry. Items Items that were laid out
                     */
                    laidOutItems: { type: "object[]" },
                    
                    /**
                     * The Masonnry object, containing various methods and properties
                     */
                    instance: { type: "object" }
                }
            },
            
            /**
             * Triggered after an item element has been removed.
             */
            removeComplete: {
                parameters: {
                    /**
                     * Array of Masonry. Items Items that were removed
                     */
                    removedItems: { type: "object[]" },
                    
                    /**
                     * The Masonnry object, containing various methods and properties
                     */
                    instance: { type: "object" }
                }
            },
            
            /**
             * Triggered after all images have been either loaded or confirmed broken.
             */
            imageLoadedAlways: {
                parameters: {
                    /**
                     * The imagesLoaded instance
                     */
                    instance: { type: "object" }
                }
            },
            
            /**
             * Triggered after all images have successfully loaded without any broken images.
             */
            imageLoadedDone: {
                parameters: {
                    /**
                     * The imagesLoaded instance
                     */
                    instance: { type: "object" }
                }
            },
            
            /**
             * Triggered after all images have been loaded with at least one broken image.
             */
            imageLoadedFail: {
                parameters: {
                    /**
                     * The imagesLoaded instance
                     */
                    instance: { type: "object" }
                }
            },
            
            /**
             * Triggered after each image has been loaded.
             */
            imageLoadedProgress: {
                parameters: {
                    /**
                     * The imagesLoaded instance
                     */
                    image: { type: "object" },
                    
                    /**
                     * The imagesLoaded instance
                     */
                    loaded: { type: "boolean" },
                    
                    /**
                     * The imagesLoaded instance
                     */
                    insloadedtance: { type: "object" }
                }
            },

        }
    }, 
    
    init: function() {
        //	Init all the things!
    },
    
    onAfterRendering: function() {
        this.initImageLoader( this.getWaitImageLoaded() );
    },
    
    ////////////////////////////////////////////////////
    //	INTERNAL METHODS
    ////////////////////////////////////////////////////
    
    /**
     * Init library
     * @private
     */
    initImageLoader: function(waitAllImages) {
        var that = this;
        if ( !waitAllImages ) {
            this.initMasonry();
        }

        this.__imgLoad = imagesLoaded( '.openui5-masonry' );
        this.__imgLoad.on( 'always', function( instance ) {
            that.fireImageLoadedAlways({instance: instance});
            if ( waitAllImages ) {
                that.initMasonry();
            } else {
                that.__msnry.layout();
            }
        });

        this.__imgLoad.on( 'done', function( instance ) {
            that.fireImageLoadedDone({instance: instance});
        });

        this.__imgLoad.on( 'fail', function( instance ) {
            that.fireImageLoadedFail({instance: instance});
        });

        this.__imgLoad.on( 'progress', function( instance, image ) {
            that.fireImageLoadedProgress({image: image, loaded: image.isLoaded, instance: instance});
        });

    },

    /**
     * Init Masonry library
     * @private
     */
    initMasonry: function() {
        var that = this;
        this.__msnry = new Masonry( ".openui5-masonry", {
            itemSelector : this.getItemSelector(),
            columnWidth : this.getColumnWidth(),
            gutter : this.getGutter(),
            horizontalOrder : this.getHorizontalOrder(),
            percentPosition : this.getPercentPosition(),
            stamp : this.getStamp(),
            fitWidth : this.getFitWidth(),
            originLeft : this.getOriginLeft(),
            originTop : this.getOriginTop(),
            containerStyle : this.getContainerStyle(),
            transitionDuration : this.getTransitionDuration(),
            stagger : this.getStagger(),
            resize : this.getResize(),
            initLayout : this.getInitLayout()
        });

        this.__msnry.on('layoutComplete', function(laidOutItems) {
            that.fireLayoutComplete({laidOutItems: laidOutItems, instance: that.__msnry});
        });
        this.__msnry.on('removeComplete', function(removedItems) {
            that.fireRemoveComplete({removedItems: removedItems, instance: that.__msnry});
        });
    },
    
    ////////////////////////////////////////////////////
    //	MASONRY METHODS
    ////////////////////////////////////////////////////
    
    /**
     * Lays out all item elements. layout is useful when an item has changed size, and all items need to be laid out again.
     * @public
     */
    masonryLayout: function() {
        if ( this.__msnry ) {
            this.__msnry.layout();
        }
    },
    
    /**
     * Lays out specified items.
     * @public
     * @param {array} items Array of Masonry.Items
     * @param {boolean} isStill Disables transitions
     */
    masonryLayoutItems: function(items, isStill) {
        if ( this.__msnry ) {
            this.__msnry.layoutItems(items, isStill);
        }
    },
    
    /**
     * Stamps elements in the layout. Masonry will lay out item elements around stamped elements.
     * @public
     * @param {object} elements Element, jQuery Object, NodeList, or Array of Elements
     */
    masonryStamp: function(elements) {
        if ( this.__msnry ) {
            this.__msnry.stamp( elements );
        }
    },
    
    /**
     * Un-stamps elements in the layout, so that Masonry will no longer layout item elements around them. See demo above.
     * @public
     * @param {object} elements Element, jQuery Object, NodeList, or Array of Elements
     */
    masonryUnstamp: function(elements) {
        if ( this.__msnry ) {
            this.__msnry.unstamp( elements );
        }
    },
    
    /**
     * Adds and lays out newly appended item elements to the end of the layout.
     * @public
     * @param {object} elements Element, jQuery Object, NodeList, or Array of Elements
     */
    masonryAppended: function(elements) {
        if ( this.__msnry ) {
            this.__msnry.appended( elements );
        }
    },
    
    /**
     * Adds and lays out newly prepended item elements at the beginning of layout.
     * @public
     * @param {object} elements Element, jQuery Object, NodeList, or Array of Elements
     */
    masonryPrepended: function(elements) {
        if ( this.__msnry ) {
            this.__msnry.prepended( elements );
        }
    },
    
    /**
     * Adds item elements to the Masonry instance. addItems does not lay out items like appended or prepended.
     * @public
     * @param {object} elements Element, jQuery Object, NodeList, or Array of Elements
     */
    masonryAddItems: function(elements) {
        if ( this.__msnry ) {
            this.__msnry.addItems( elements );
        }
    },
    
    /**
     * Removes elements from the Masonry instance and DOM.
     * @public
     * @param {object} elements Element, jQuery Object, NodeList, or Array of Elements
     */
    masonryRemoveItems: function(elements) {
        if ( this.__msnry ) {
            this.__msnry.remove( elements );
        }
    },
    
    /**
     * Recollects all item elements. For frameworks like Angular and React, reloadItems may be useful to apply changes to the DOM to Masonry.
     * @public
     */
    masonryReloadItems: function() {
        if ( this.__msnry ) {
            this.__msnry.reloadItems();
        }
    },
    
    /**
     * Removes the Masonry functionality completely. destroy will return the element back to its pre-initialized state.
     * @public
     */
    masonryDestroy: function() {
        if ( this.__msnry ) {
            this.__msnry.destroy();
        }
    },
    
    /**
     * Returns an array of item elements.
     * @public
     * @returns {array} Array of Elements
     */
    masonryGetItemElements: function() {
        if ( this.__msnry ) {
            return this.__msnry.getItemElements();
        } else {
            return null;
        }
    },
    
    ////////////////////////////////////////////////////
    //	EVENTS HANDLING
    ////////////////////////////////////////////////////
    
    onLayoutComplete: function(laidOutItems) {
        this.fireLayoutComplete({laidOutItems: laidOutItems, instance: this.__msnry});
    },
    
    onRemoveComplete: function(removedItems) {
        this.fireRemoveComplete({removedItems: removedItems, instance: this.__msnry});
    },
    
    ////////////////////////////////////////////////////
    //	GETTER & SETTER FOR PROPERTIES
    ////////////////////////////////////////////////////

    
    
});

/*
* Override the exit method to free local resources and destroy 
* Optionally, pass true as the second argument to force any onChange events to fire
* @public
*/	
MasonryLayout.prototype.exit = function() {
    Control.prototype.exit.apply(this, arguments);
    if (this.__msnry) {
        // this.__msnry.off( 'layoutComplete', this.onLayoutComplete);
        // this.__msnry.off( 'removeComplete', this.onRemoveComplete);
    }
    this.__msnry.destroy();
    this.__msnry = undefined;
    this.__imgLoad = undefined;
};

return MasonryLayout;

}, /* bExport= */ true);