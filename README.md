

# openui5-masonry

[openui5-masonry](https://github.com/StErMi/openui5-masonry) is a OpenUI5 wrapper of [MasonryJS](https://masonry.desandro.com/). Masonry is a JavaScript grid layout library. It works by placing elements in optimal position based on available vertical space, sort of like a mason fitting stones in a wall. You’ve probably seen it in use all over the Internet.

![openui5-masonry demo](http://g.recordit.co/myxhqySSyo.gif)

# Dependencies

To correctly re-layout on image load event we're using [imagesLoaded](https://imagesloaded.desandro.com/) as a dependecy. openui5-masonry offers a full-documented integration with it.

# Properties
| Name | Description | Type | Default |
|--|--|--|--|
| itemSelector | Specifies which child elements will be used as item elements in the layout. | string | `.openui5-masonry-grid-item` |
| columnWidth | Aligns items to a horizontal grid. Use element sizing for responsive layouts with percentage widths. Set columnWidth to an Element or Selector String to use the outer width of the element for the size of the column. | string | null |
| gutter | Adds horizontal space between item elements. To set vertical space between elements, use margin CSS. | string | null |
| horizontalOrder | Lays out items to (mostly) maintain horizontal left-to-right order. | boolean | true |
| percentPosition | Sets item positions in percent values, rather than pixel values. percentPosition: true works well with percent-width items, as items will not transition their position on resize. | boolean | true |
| stamp | Specifies which elements are stamped within the layout. Masonry will layout items below stamped elements. The stamp option stamps elements only when the Masonry instance is first initialized. You can stamp additional elements afterwards with the stamp method. | string | null |
| fitWidth | Sets the width of the container to fit the available number of columns, based the size of container's parent element. When enabled, you can center the container with CSS. | boolean | true |
| originLeft | Controls the horizontal flow of the layout. By default, item elements start positioning at the left, with originLeft: true. Set originLeft: false for right-to-left layouts. | boolean | true |
| originTop | Controls the vertical flow of the layout. By default, item elements start positioning at the top, with originTop: true. Set originTop: false for bottom-up layouts. It’s like Tetris! | boolean | true |
| containerStyle | CSS styles that are applied to the container element. Default: containerStyle: { position: 'relative' } Set to null to disable any styles being set on container, useful if using absolute position on container | string | `{ position: 'relative' }` |
| transitionDuration | Duration of the transition when items change position or appearance. Default: transitionDuration: 400 (milliseconds) | int | 400 |
| stagger | Staggers item transitions, so items transition incrementally after one another. Default: stagger: 30 (milliseconds) | int | 30 |
| resize | Adjusts sizes and positions when window is resized. Enabled by default resize: true. | boolean | true |
| initLayout | Enables layout on initialization. Enabled by default initLayout: true. Set initLayout: false to disable layout on initialization, so you can use methods or add events before the initial layout. | boolean | true |

# Aggregations
| Name | Description | Multiple | Type |
|--|--|--|--|
| content | Controls that are placed into layout. | true | `sap.ui.core.Control` |

# Events
| Name | Description |
|--|--|
| layoutComplete | Triggered after a layout and all positioning transitions have completed. |
| removeComplete | Triggered after an item element has been removed. |
| imageLoadedAlways | Triggered after all images have been either loaded or confirmed broken. |
| imageLoadedDone | Triggered after all images have successfully loaded without any broken images. |
| imageLoadedFail | Triggered after all images have been loaded with at least one broken image. |
| imageLoadedProgress | Triggered after each image has been loaded. |

# Public methods
| Name | Description |
|--|--|
| masonryLayout | Lays out all item elements. layout is useful when an item has changed size, and all items need to be laid out again. |
| masonryLayoutItems | Lays out specified items. |
| masonryStamp | Stamps elements in the layout. Masonry will lay out item elements around stamped elements. |
| masonryUnstamp | Un-stamps elements in the layout, so that Masonry will no longer layout item elements around them. See demo above. |
| masonryAppended | Adds and lays out newly appended item elements to the end of the layout. |
| masonryPrepended | Adds and lays out newly prepended item elements at the beginning of layout. |
| masonryAddItems | Adds item elements to the Masonry instance. addItems does not lay out items like appended or prepended. |
| masonryRemoveItems | Removes elements from the Masonry instance and DOM. |
| masonryReloadItems | Recollects all item elements. For frameworks like Angular and React, reloadItems may be useful to apply changes to the DOM to Masonry. |
| masonryDestroy | Removes the Masonry functionality completely. destroy will return the element back to its pre-initialized state. |
| masonryGetItemElements | Returns an array of item elements. |

# TODO

- Add more demo




