/**
 * Magento
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License (AFL 3.0)
 * that is bundled with this package in the file LICENSE_AFL.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/afl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@magento.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade Magento to newer
 * versions in the future. If you wish to customize Magento for your
 * needs please refer to http://www.magento.com for more information.
 *
 * @category    design
 * @package     rwd_default
 * @copyright   Copyright (c) 2006-2014 X.commerce, Inc. (http://www.magento.com)
 * @license     http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 */

// =============================================
// Primary Break Points
// =============================================

// These should be used with the bp (max-width, xx) mixin
// where a min-width is used, remember to +1 to break correctly
// If these are changed, they must also be updated in _var.scss

var bp = {
    xsmall: 479,
    small: 599,
    medium: 770,
    large: 979,
    xlarge: 1199
}

// ==============================================
// Search
// ==============================================

/**
 * Implements a custom validation style for the search form. When the form is invalidly submitted, the validation-failed
 * class gets added to the input, but the "This is a required field." text does not display
 */
Varien.searchForm.prototype.initialize = function (form, field, emptyText) {
    this.form = $(form);
    this.field = $(field);
    this.emptyText = emptyText;

    Event.observe(this.form, 'submit', this.submit.bind(this));
    Event.observe(this.field, 'change', this.change.bind(this));
    Event.observe(this.field, 'focus', this.focus.bind(this));
    Event.observe(this.field, 'blur', this.blur.bind(this));
    this.blur();
}

Varien.searchForm.prototype.submit = function (event) {
    if (this.field.value == this.emptyText || this.field.value == '') {
        Event.stop(event);
        this.field.addClassName('validation-failed');
        this.field.focus();
        return false;
    }
    return true;
}

Varien.searchForm.prototype.change = function (event) {
    if (
        this.field.value != this.emptyText
            && this.field.value != ''
            && this.field.hasClassName('validation-failed')
        ) {
        this.field.removeClassName('validation-failed');
    }
}

Varien.searchForm.prototype.blur = function (event) {
    if (this.field.hasClassName('validation-failed')) {
        this.field.removeClassName('validation-failed');
    }
}

// ==============================================
// Pointer abstraction
// ==============================================

/**
 * This class provides an easy and abstracted mechanism to determine the
 * best pointer behavior to use -- that is, is the user currently interacting
 * with their device in a touch manner, or using a mouse.
 *
 * Since devices may use either touch or mouse or both, there is no way to
 * know the user's preferred pointer type until they interact with the site.
 *
 * To accommodate this, this class provides a method and two events
 * to determine the user's preferred pointer type.
 *
 * - getPointer() returns the last used pointer type, or, if the user has
 *   not yet interacted with the site, falls back to a Modernizr test.
 *
 * - The mouse-detected event is triggered on the window object when the user
 *   is using a mouse pointer input, or has switched from touch to mouse input.
 *   It can be observed in this manner: $j(window).on('mouse-detected', function(event) { // custom code });
 *
 * - The touch-detected event is triggered on the window object when the user
 *   is using touch pointer input, or has switched from mouse to touch input.
 *   It can be observed in this manner: $j(window).on('touch-detected', function(event) { // custom code });
 */
var PointerManager = {
    MOUSE_POINTER_TYPE: 'mouse',
    TOUCH_POINTER_TYPE: 'touch',
    POINTER_EVENT_TIMEOUT_MS: 500,
    standardTouch: false,
    touchDetectionEvent: null,
    lastTouchType: null,
    pointerTimeout: null,
    pointerEventLock: false,

    getPointerEventsSupported: function () {
        return this.standardTouch;
    },

    getPointerEventsInputTypes: function () {
        if (window.navigator.pointerEnabled) { //IE 11+
            //return string values from http://msdn.microsoft.com/en-us/library/windows/apps/hh466130.aspx
            return {
                MOUSE: 'mouse',
                TOUCH: 'touch',
                PEN: 'pen'
            };
        } else if (window.navigator.msPointerEnabled) { //IE 10
            //return numeric values from http://msdn.microsoft.com/en-us/library/windows/apps/hh466130.aspx
            return {
                MOUSE: 0x00000004,
                TOUCH: 0x00000002,
                PEN: 0x00000003
            };
        } else { //other browsers don't support pointer events
            return {}; //return empty object
        }
    },

    /**
     * If called before init(), get best guess of input pointer type
     * using Modernizr test.
     * If called after init(), get current pointer in use.
     */
    getPointer: function () {
        // On iOS devices, always default to touch, as this.lastTouchType will intermittently return 'mouse' if
        // multiple touches are triggered in rapid succession in Safari on iOS
        if (Modernizr.ios) {
            return this.TOUCH_POINTER_TYPE;
        }

        if (this.lastTouchType) {
            return this.lastTouchType;
        }

        return Modernizr.touch ? this.TOUCH_POINTER_TYPE : this.MOUSE_POINTER_TYPE;
    },

    setPointerEventLock: function () {
        this.pointerEventLock = true;
    },
    clearPointerEventLock: function () {
        this.pointerEventLock = false;
    },
    setPointerEventLockTimeout: function () {
        var that = this;

        if (this.pointerTimeout) {
            clearTimeout(this.pointerTimeout);
        }

        this.setPointerEventLock();
        this.pointerTimeout = setTimeout(function () {
            that.clearPointerEventLock();
        }, this.POINTER_EVENT_TIMEOUT_MS);
    },

    triggerMouseEvent: function (originalEvent) {
        if (this.lastTouchType == this.MOUSE_POINTER_TYPE) {
            return; //prevent duplicate events
        }

        this.lastTouchType = this.MOUSE_POINTER_TYPE;
        $j(window).trigger('mouse-detected', originalEvent);
    },
    triggerTouchEvent: function (originalEvent) {
        if (this.lastTouchType == this.TOUCH_POINTER_TYPE) {
            return; //prevent duplicate events
        }

        this.lastTouchType = this.TOUCH_POINTER_TYPE;
        $j(window).trigger('touch-detected', originalEvent);
    },

    initEnv: function () {
        if (window.navigator.pointerEnabled) {
            this.standardTouch = true;
            this.touchDetectionEvent = 'pointermove';
        } else if (window.navigator.msPointerEnabled) {
            this.standardTouch = true;
            this.touchDetectionEvent = 'MSPointerMove';
        } else {
            this.touchDetectionEvent = 'touchstart';
        }
    },

    wirePointerDetection: function () {
        var that = this;

        if (this.standardTouch) { //standard-based touch events. Wire only one event.
            //detect pointer event
            $j(window).on(this.touchDetectionEvent, function (e) {
                switch (e.originalEvent.pointerType) {
                    case that.getPointerEventsInputTypes().MOUSE:
                        that.triggerMouseEvent(e);
                        break;
                    case that.getPointerEventsInputTypes().TOUCH:
                    case that.getPointerEventsInputTypes().PEN:
                        // intentionally group pen and touch together
                        that.triggerTouchEvent(e);
                        break;
                }
            });
        } else { //non-standard touch events. Wire touch and mouse competing events.
            //detect first touch
            $j(window).on(this.touchDetectionEvent, function (e) {
                if (that.pointerEventLock) {
                    return;
                }

                that.setPointerEventLockTimeout();
                that.triggerTouchEvent(e);
            });

            //detect mouse usage
            $j(document).on('mouseover', function (e) {
                if (that.pointerEventLock) {
                    return;
                }

                that.setPointerEventLockTimeout();
                that.triggerMouseEvent(e);
            });
        }
    },

    init: function () {
        this.initEnv();
        this.wirePointerDetection();
    }
};

// ==============================================
// jQuery Init
// ==============================================

// Use $j(document).ready() because Magento executes Prototype inline
$j(document).ready(function () {

    // ==============================================
    // Shared Vars
    // ==============================================

    // Document
    var w = $j(window);
    var d = $j(document);
    var body = $j('body');

    Modernizr.addTest('ios', function () {
        return navigator.userAgent.match(/(iPad|iPhone|iPod)/g);
    });

    //initialize pointer abstraction manager
    PointerManager.init();

    /* Wishlist Toggle Class */

    $j(".change").click(function (e) {
        $j(this).toggleClass('active');
        e.stopPropagation()
    });

    $j(document).click(function (e) {
        if (!$j(e.target).hasClass('.change')) $j(".change").removeClass('active');
    });


    // =============================================
    // Skip Links
    // =============================================

    var skipContents = $j('.skip-content');
    var skipLinks = $j('.skip-link');

    skipLinks.on('click', function (e) {
        e.preventDefault();

        var self = $j(this);
        // Use the data-target-element attribute, if it exists. Fall back to href.
        var target = self.attr('data-target-element') ? self.attr('data-target-element') : self.attr('href');

        // Get target element
        var elem = $j(target);

        // Check if stub is open
        var isSkipContentOpen = elem.hasClass('skip-active') ? 1 : 0;

        // Hide all stubs
        skipLinks.removeClass('skip-active');
        skipContents.removeClass('skip-active');

        skipContents.on('click', function (event) {
            event.stopPropagation();
        });

        // Toggle stubs
        if (isSkipContentOpen) {
            self.removeClass('skip-active');
            elem.off('clickoutside');
        } else {
            self.addClass('skip-active');
            elem.addClass('skip-active');

            self.on('clickoutside', function (event) {
                elem.removeClass('skip-active');
                $j(this).removeClass('skip-active');
                $j(this).off('clickoutside');
            });
        }
    });

    $j('#header-cart').on('click', '.skip-link-close', function (e) {
        var parent = $j(this).parents('.skip-content');
        var link = parent.siblings('.skip-link');

        parent.removeClass('skip-active');
        link.removeClass('skip-active');

        e.preventDefault();
    });

    // select language custom selectbox
    $j("#select-language, .toolbar select").selectmenu({
            change: function (event, ui) {
                window.location.href = this.value;
            }
        }
    );
    $j("#qty, #time_from, #time_to").selectmenu();


    $j("#map_city").selectmenu({
            change: function (event, ui) {
                cityId = this.value;
            }
        }
    );
    if ($j('#map_city').has('option').length > 0) {
        $j('#map_city').val(16);
        $j('#map_city').selectmenu("refresh");
    }

    // ==============================================
    // Account Switcher
    // ==============================================

    // In order to display the language switcher next to the logo, we are moving the content at different viewports,
    // rather than having duplicate markup or changing the design
    enquire.register('(max-width: ' + bp.medium + 'px)', {
        match: function () {
            $j('.js-user-account-mobile').append($j('#header-account'));
        },
        unmatch: function () {
            $j('.js-user-account').append($j('#header-account'));
        }
    });

    // ==============================================
    // Sticky Header
    // ==============================================

    var header = $j('#header');
    var stickyOffset = $j(header).offset().top;


    $j(window).scroll(function () {
        var sticky = $j('.js-header-sticky'),
            stickyWrap = $(sticky).parent(),
            stickyWrapHeight = $j(stickyWrap).height(),
            scroll = $j(window).scrollTop(),
            headerHeight = $j(header).height();

        if (scroll >= stickyOffset + headerHeight) {
            stickyWrap.css('height', stickyWrapHeight);
            sticky.addClass('header-sticky--fixed');
        } else {
            stickyWrap.css('height', 'auto');
            sticky.removeClass('header-sticky--fixed');
        }
    });


    // ==============================================
    // Header Menus
    // ==============================================
    $j(".js-toggle-dropdown").hoverIntent({
        sensitivity: 1, // number = sensitivity threshold (must be 1 or higher)
        interval: 100,  // number = milliseconds for onMouseOver polling interval
        timeout: 500,   // number = milliseconds delay before onMouseOut
        over: function () {
            var self = $j(this);
            self.addClass('active').find('.js-dropdown').addClass('show');
        },
        out: function () {
            $j(this).removeClass('active').find('.js-dropdown').removeClass('show');
        }
    });

    // ==============================================
    // Language Switcher
    // ==============================================

    // In order to display the language switcher next to the logo, we are moving the content at different viewports,
    // rather than having duplicate markup or changing the design
    //enquire.register('(max-width: ' + bp.medium + 'px)', {
    //    match: function () {
    //        $j('.page-header-container .store-language-container').prepend($j('.form-language'));
    //    },
    //    unmatch: function () {
    //        $j('.header-language-container .store-language-container').prepend($j('.form-language'));
    //    }
    //});

    // ==============================================
    // Footer
    // ==============================================

    var footerBlocksToggle = $j('.footer-block h6');

    enquire.register('screen and (max-width: ' + (bp.medium) + 'px)', {
        match: function () {
            footerBlocksToggle.on('click', function () {
                $j(this).next('ul').toggle();
                $j(this).next('p').toggle();
                return false;
            });
        },
        unmatch: function () {
            footerBlocksToggle.next('ul').show();
            footerBlocksToggle.next('p').show();
            $j('.footer-block h6').off('click');
        }
    });

    // ==============================================
    // Enquire JS
    // ==============================================

    enquire.register('screen and (min-width: ' + (bp.medium + 1) + 'px)', {
        match: function () {
            $j('.menu-active').removeClass('menu-active');
            $j('.sub-menu-active').removeClass('sub-menu-active');
            $j('.skip-active').removeClass('skip-active');
        },
        unmatch: function () {
            $j('.menu-active').removeClass('menu-active');
            $j('.sub-menu-active').removeClass('sub-menu-active');
            $j('.skip-active').removeClass('skip-active');
        }
    });

    // ==============================================
    // UI Pattern - Media Switcher
    // ==============================================

    // Used to swap primary product photo from thumbnails.

    var mediaListLinks = $j('.media-list').find('a');
    var mediaPrimaryImage = $j('.primary-image').find('img');

    if (mediaListLinks.length) {
        mediaListLinks.on('click', function (e) {
            e.preventDefault();

            var self = $j(this);

            mediaPrimaryImage.attr('src', self.attr('href'));
        });
    }

    // ==============================================
    // UI Pattern - ToggleSingle
    // ==============================================

    // Use this plugin to toggle the visibility of content based on a toggle link/element.
    // This pattern differs from the accordion functionality in the Toggle pattern in that each toggle group acts
    // independently of the others. It is named so as not to be confused with the Toggle pattern below
    //
    // This plugin requires a specific markup structure. The plugin expects a set of elements that it
    // will use as the toggle link. It then hides all immediately following siblings and toggles the sibling's
    // visibility when the toggle link is clicked.
    //
    // Example markup:
    // <div class="block">
    //     <div class="block-title">Trigger</div>
    //     <div class="block-content">Content that should show when </div>
    // </div>
    //
    // JS: jQuery('.block-title').toggleSingle();
    //
    // Options:
    //     destruct: defaults to false, but if true, the plugin will remove itself, display content, and remove event handlers


    jQuery.fn.toggleSingle = function (options) {

        // passing destruct: true allows
        var settings = $j.extend({
            destruct: false
        }, options);

        return this.each(function () {
            if (!settings.destruct) {
                $j(this).on('click', function () {
                    $j(this)
                        .toggleClass('active')
                        .next()
                        .toggleClass('no-display');
                });
                // Hide the content
                $j(this).next().addClass('no-display');
            } else {
                // Remove event handler so that the toggle link can no longer be used
                $j(this).off('click');
                // Remove all classes that were added by this plugin
                $j(this)
                    .removeClass('active')
                    .next()
                    .removeClass('no-display');
            }

        });
    }

    // ==============================================
    // UI Pattern - Toggle Content (tabs and accordions in one setup)
    // ==============================================

    $j('.toggle-content').each(function () {
        var wrapper = jQuery(this);

        var hasTabs = wrapper.hasClass('tabs');
        var hasAccordion = wrapper.hasClass('accordion');
        var startOpen = wrapper.hasClass('open');

        var dl = wrapper.children('dl:first');
        var dts = dl.children('dt');
        var panes = dl.children('dd');
        var groups = new Array(dts, panes);

        //Create a ul for tabs if necessary.
        if (hasTabs) {
            var ul = jQuery('<ul class="toggle-tabs"></ul>');
            dts.each(function () {
                var dt = jQuery(this);
                var li = jQuery('<li></li>');
                li.html(dt.html());
                ul.append(li);
            });
            ul.insertBefore(dl);
            var lis = ul.children();
            groups.push(lis);
        }

        //Add "last" classes.
        var i;
        for (i = 0; i < groups.length; i++) {
            groups[i].filter(':last').addClass('last');
        }

        function toggleClasses(clickedItem, group) {
            var index = group.index(clickedItem);
            var i;
            for (i = 0; i < groups.length; i++) {
                groups[i].removeClass('current');
                groups[i].eq(index).addClass('current');
            }
        }

        //Toggle on tab (dt) click.
        dts.on('click', function (e) {
            //They clicked the current dt to close it. Restore the wrapper to unclicked state.
            if (jQuery(this).hasClass('current') && wrapper.hasClass('accordion-open')) {
                wrapper.removeClass('accordion-open');
            } else {
                //They're clicking something new. Reflect the explicit user interaction.
                wrapper.addClass('accordion-open');
            }
            toggleClasses(jQuery(this), dts);
        });

        //Toggle on tab (li) click.
        if (hasTabs) {
            lis.on('click', function (e) {
                toggleClasses(jQuery(this), lis);
            });
            //Open the first tab.
            lis.eq(0).trigger('click');
        }

        //Open the first accordion if desired.
        if (startOpen) {
            dts.eq(0).trigger('click');
        }

    });


    // ==============================================
    // Layered Navigation Block
    // ==============================================

    // On product list pages, we want to show the layered nav/category menu immediately above the product list.
    // While it would make more sense to just move the .block-layered-nav block rather than .col-left-first
    // (since other blocks can be inserted into left_first), it creates simpler code to move the entire
    // .col-left-first block, so that is the approach we're taking
    if ($j('.col-left-first > .block').length && $j('.category-products').length) {
        enquire.register('screen and (max-width: ' + bp.medium + 'px)', {
            match: function () {
                $j('.col-left-first').insertBefore($j('.category-products'))
            },
            unmatch: function () {
                // Move layered nav back to left column
                $j('.col-left-first').insertBefore($j('.col-main'))
            }
        });
    }

    // ==============================================
    // 3 column layout
    // ==============================================

    // On viewports smaller than 1000px, move the right column into the left column
    if ($j('.main-container.col3-layout').length > 0) {
        enquire.register('screen and (max-width: 1000px)', {
            match: function () {
                var rightColumn = $j('.col-right');
                var colWrapper = $j('.col-wrapper');

                rightColumn.appendTo(colWrapper);
            },
            unmatch: function () {
                var rightColumn = $j('.col-right');
                var main = $j('.main');

                rightColumn.appendTo(main);
            }
        });
    }


    // ==============================================
    // Block collapsing (on smaller viewports)
    // ==============================================

    enquire.register('(max-width: ' + bp.medium + 'px)', {
        setup: function () {
            this.toggleElements = $j(
                // This selects the menu on the My Account and CMS pages
                '.col-left-first .block:not(.block-layered-nav) .block-title, ' +
                    '.col-left-first .block-layered-nav .block-subtitle--filter, ' +
                    '.sidebar:not(.col-left-first) .block .block-title'
            );
        },
        match: function () {
            this.toggleElements.toggleSingle();
        },
        unmatch: function () {
            this.toggleElements.toggleSingle({destruct: true});
        }
    });


    // ==============================================
    // OPC - Progress Block
    // ==============================================

    if ($j('body.checkout-onepage-index').length) {
        enquire.register('(max-width: ' + bp.large + 'px)', {
            match: function () {
                $j('#checkout-step-review').prepend($j('#checkout-progress-wrapper'));
            },
            unmatch: function () {
                $j('.col-right').prepend($j('#checkout-progress-wrapper'));
            }
        });
    }


    // ==============================================
    // Checkout Cart - events
    // ==============================================

    if ($j('body.checkout-cart-index').length) {
        $j('input[name^="cart"]').focus(function () {
            $j(this).siblings('button').fadeIn();
        });
    }


    // ==============================================
    // Gift Registry Styles
    // ==============================================

    if ($j('.a-left').length) {
        enquire.register('(max-width: ' + bp.large + 'px)', {
            match: function () {
                $j('.gift-info').each(function () {
                    $j(this).next('td').children('textarea').appendTo(this).children();
                })
            },
            unmatch: function () {
                $j('.left-note').each(function () {
                    $j(this).prev('td').children('textarea').appendTo(this).children();
                })
            }
        });
    }


    // ==============================================
    // Product Listing - Align action buttons/links
    // ==============================================

    // Since the number of columns per grid will vary based on the viewport size, the only way to align the action
    // buttons/links is via JS

    if ($j('.products-grid').length) {

        var alignProductGridActions = function () {
            // Loop through each product grid on the page
            $j('.products-grid').each(function () {
                var gridRows = []; // This will store an array per row
                var tempRow = [];
                productGridElements = $j(this).children('li');
                productGridElements.each(function (index) {
                    // The JS ought to be agnostic of the specific CSS breakpoints, so we are dynamically checking to find
                    // each row by grouping all cells (eg, li elements) up until we find an element that is cleared.
                    // We are ignoring the first cell since it will always be cleared.
                    if ($j(this).css('clear') != 'none' && index != 0) {
                        gridRows.push(tempRow); // Add the previous set of rows to the main array
                        tempRow = []; // Reset the array since we're on a new row
                    }
                    tempRow.push(this);

                    // The last row will not contain any cells that clear that row, so we check to see if this is the last cell
                    // in the grid, and if so, we add its row to the array
                    if (productGridElements.length == index + 1) {
                        gridRows.push(tempRow);
                    }
                });
            });
        };

        alignProductGridActions();

        // Since the height of each cell and the number of columns per page may change when the page is resized, we are
        // going to run the alignment function each time the page is resized.
        $j(window).on('delayed-resize', function (e, resizeEvent) {
            alignProductGridActions();
        });
    }

    // ==============================================
    // Carousels, tabs init
    // ==============================================

    // Wordprerss post widget
    $j('.js-post-carousel').owlCarousel({
        singleItem: true,
        navigation: true,
        pagination: false,
        navigationText: false
    });

    $j('.js-stores-photo').owlCarousel({
        singleItem: true,
        navigation: true,
        pagination: true,
        navigationText: false
    });

    // Product tabs carousels
    function carouselItemHeight(container) {
        var carouselHeight = $j(container).find('.owl-wrapper').height();

        $j(container).find('.owl-item').each(function () {
            $j(this).height(carouselHeight);
        });
    }

    $j('.js-tab-carousel').owlCarousel({
        navigation: true,
        pagination: false,
        navigationText: false,
        items: 4,
        addClassActive: true,
        slideSpeed: 0,
        rewindNav: false,
        itemsMobile: 2,
        afterInit: function (el) {
            $j(window).load(function () {
                carouselItemHeight($j(el).parents('.js-tabs'));
            });
        }
    });

    $j('.customer-account-index .js-tab-carousel-3').owlCarousel({
        navigation: true,
        pagination: false,
        navigationText: false,
        items: 3,
        addClassActive: true,
        slideSpeed: 0,
        rewindNav: false,
        afterInit: function (el) {
            $j(window).load(function () {
                carouselItemHeight($j(el).parents('.js-fake-tabs'));
            });
        }
    });

    // Product alternative views
    var productViewthumbs = $j('.js-product-image-thumbs');
    if ($j(productViewthumbs).length) {
        $j(productViewthumbs).owlCarousel({
            items: 4,
            navigation: true,
            pagination: false,
            navigationText: false
        });

        $j(productViewthumbs).on('click', 'a', function () {
            $j(productViewthumbs).find('a').removeClass('active');
            $j(this).addClass('active');
        })
    }

    // Product tabs
    $j('.js-tabs').tabs();

    // ==============================================
    // Generic, efficient window resize handler
    // ==============================================

    // Using setTimeout since Web-Kit and some other browsers call the resize function constantly upon window resizing.
    var resizeTimer;
    $j(window).resize(function (e) {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            $j(window).trigger('delayed-resize', e);
        }, 250);
    });

    // ==============================================
    // Generic, efficient window resize handler
    // ==============================================
    enquire.register('(max-width: 900px)', {
        match: function () {
            $j('.js-services-bottom').append($j('.product-service'));
        },
        unmatch: function () {
            $j('.js-services-top').append($j('.product-service'));
        }
    });
});

// ==============================================
// PDP - image zoom - needs to be available outside document.ready scope
// ==============================================

var ProductMediaManager = {
    IMAGE_ZOOM_THRESHOLD: 20,
    imageWrapper: null,

    destroyZoom: function () {
        $j('.zoomContainer').remove();
        $j('.product-image-gallery .gallery-image').removeData('elevateZoom');
    },

    createZoom: function (image) {

        // Destroy since zoom shouldn't be enabled under certain conditions
        ProductMediaManager.destroyZoom();

        if (
        // Don't use zoom on devices where touch has been used
            PointerManager.getPointer() == PointerManager.TOUCH_POINTER_TYPE
                // Don't use zoom when screen is small, or else zoom window shows outside body
                || Modernizr.mq("screen and (max-width:" + bp.medium + "px)")
            ) {
            return; // zoom not enabled
        }

        if (image.length <= 0) { //no image found
            return;
        }

        if (image[0].naturalWidth && image[0].naturalHeight) {
            var widthDiff = image[0].naturalWidth - image.width() - ProductMediaManager.IMAGE_ZOOM_THRESHOLD;
            var heightDiff = image[0].naturalHeight - image.height() - ProductMediaManager.IMAGE_ZOOM_THRESHOLD;

            if (widthDiff < 0 && heightDiff < 0) {
                //image not big enough

                image.parents('.product-image').removeClass('zoom-available');

                return;
            } else {
                image.parents('.product-image').addClass('zoom-available');
            }
        }

        image.elevateZoom();
    },

    swapImage: function (targetImage) {
        targetImage = $j(targetImage);
        targetImage.addClass('gallery-image');

        ProductMediaManager.destroyZoom();

        var imageGallery = $j('.product-image-gallery');

        if (targetImage[0].complete) { //image already loaded -- swap immediately

            imageGallery.find('.gallery-image').removeClass('visible');

            //move target image to correct place, in case it's necessary
            imageGallery.append(targetImage);

            //reveal new image
            targetImage.addClass('visible');

            //wire zoom on new image
            ProductMediaManager.createZoom(targetImage);

        } else { //need to wait for image to load

            //add spinner
            imageGallery.addClass('loading');

            //move target image to correct place, in case it's necessary
            imageGallery.append(targetImage);

            //wait until image is loaded
            imagesLoaded(targetImage, function () {
                //remove spinner
                imageGallery.removeClass('loading');

                //hide old image
                imageGallery.find('.gallery-image').removeClass('visible');

                //reveal new image
                targetImage.addClass('visible');

                //wire zoom on new image
                ProductMediaManager.createZoom(targetImage);
            });

        }
    },

    wireThumbnails: function () {
        //trigger image change event on thumbnail click
        $j('.product-image-thumbs .thumb-link').click(function (e) {
            e.preventDefault();
            var jlink = $j(this);
            var target = $j('#image-' + jlink.data('image-index'));

            ProductMediaManager.swapImage(target);
        });
    },

    initZoom: function () {
        ProductMediaManager.createZoom($j(".gallery-image.visible")); //set zoom on first image
    },

    init: function () {
        ProductMediaManager.imageWrapper = $j('.product-img-box');

        // Re-initialize zoom on viewport size change since resizing causes problems with zoom and since smaller
        // viewport sizes shouldn't have zoom
        $j(window).on('delayed-resize', function (e, resizeEvent) {
            ProductMediaManager.initZoom();
        });

        ProductMediaManager.initZoom();

        ProductMediaManager.wireThumbnails();

        $j(document).trigger('product-media-loaded', ProductMediaManager);
    }
};

// ==============================================
// Main menu
// ==============================================

var MainMenu = {

    _cash: function () {
        var _self = this;

        _self.menuWrapper = $j('#nav');
        _self.menuLinkedItems = _self.menuWrapper.find('.js-linked-nav');
        _self.menuLinkedContent = $j('.js-linked-nav-content');
    },

    bindEvents: function () {
        var _self = this;

        _self.menuLinkedItems.on('mouseenter', function () {
            var li = $j(this),
                wrapper = li.parents('.js-linked-nav-wrapper'),
                parent = li.parents('.js-linked-nav-parent'),
                siblings = parent.find('.js-linked-nav');

            siblings.each(function (index, element) {
                $j(element).removeClass('active');
            });

            li.addClass('active');

            var li_id = li.data('item-id'),
                li_content = wrapper.find('.js-linked-nav-content-parent .js-linked-nav-content');

            li_content.each(function (index, element) {
                $j(element).hide();
            });

            li_content.filter('#linked_subnav_' + li_id).show();
            li_content.filter('#linked_subnav_content_' + li_id).show();
        });
    },

    init: function () {
        var _self = this;

        _self._cash();
        _self.bindEvents();
    }
};

function gridSwitcher() {
    var grid = $j('.products-grid'),
        gridMode = $j('.grid-views');
    var userAgent = navigator.userAgent.toLowerCase();
    var isiPhone = (userAgent.indexOf('iphone') != -1 || userAgent.indexOf('ipod') != -1) ? true : false;
    clickEvent = isiPhone ? 'tap' : 'click';

    if (localStorage.getItem('grid-view-value') !== null) {
        var preselected = localStorage.getItem('grid-view-value');
        gridMode.find('li').removeClass('active').find("[data-column-count='" + preselected + "']").parent().addClass('active');
        grid.removeClass().addClass('products-grid products-grid--max-' + preselected + '-col');
    }

    $j(gridMode).on('click', '.grid-view', function (e) {
        var target = $j(this),
            currentMode = target.data('column-count');

        gridMode.find('li').removeClass('active');
        target.parent().addClass('active');
        grid.removeClass().toggleClass('products-grid products-grid--max-' + currentMode + '-col');

        if (target.data('save-value')) {
            localStorage.setItem('grid-view-value', currentMode);
        }
    });
}

function filterToggle() {
    if ($j('.filters-toggle').length) {
        $j('.filters-toggle').each(function () {
            $j(this).parents('dd').find('ol').addClass('collapsed');
        });
        $j('body').on('click', '.filters-toggle', function () {
            $j(this).parents('dd').find('ol').toggleClass('collapsed');
            $j(this).toggleClass('processed');
        })
    }
}

function footerToggleText() {
    if ($j('.learn-more').length) {
        $j('.learn-more-btn').on('click', function () {
            $j(this).toggleClass('expand');
            $j(this).parents('.learn-more').find('.learn-more-text').toggleClass('collapsed');
        });
    }
}

function clearSelect() {
    if ($j('.js-clear-select').length) {
        $j('.js-clear-select').on('click', function () {
            $j(this).parent().find('select').val("nothing");
        });
    }
}

function productItemHover() {
    if ($j('.product-item').length) {
        $j('.item').on('mouseenter mouseleave', function () {
            var item_height = $j(this).height();
            $j(this).toggleClass('processed');

            if ($j(this).parents('ul').hasClass('products-grid')) {
                if ($j(this).parent().attr('style')) {
                    $j(this).parent().removeAttr('style');
                }
                else {
                    $j(this).parent().height(item_height);
                }
            }
        });
    }
}

$j(document).ready(function () {
    ProductMediaManager.init();
    MainMenu.init();
    footerToggleText();
    //productItemHover();
    filterToggle();
    clearSelect();

    enquire.register('screen and (min-width: ' + (bp.medium + 1) + 'px)', {
        match: function () {
            productItemHover();
        },
        unmatch: function () {

            if ($j('.product-item').length) {
                $j('.item').off('mouseenter mouseleave');
            }
        }
    });

    if ($j('.grid-views').length) {
        gridSwitcher();
    }

    if ($j('.my-account .dashboard').length || $j('.customer-account-create .dashboard').length) {
        var container_acc = document.querySelector('.dashboard');
        var msnry_acc;
        var viewportWidth = $j(window).width();

        if (viewportWidth >= 643) {
            imagesLoaded(container_acc, function () {
                msnry_acc = new Masonry(container_acc, {
                    itemSelector: '.box-account',
                    "gutter": 23
                });
            });
        }
    }

    if ($j('#post-list').length) {
        var container_posts = document.querySelector('#post-list');
        var msnry_post;

        imagesLoaded(container_posts, function () {
            msnry_post = new Masonry(container_posts, {
                itemSelector: '.item',
                "gutter": 12
            });
        });
    }

    if ($j('.js-tooltip-question').length) {
        $j('body').on('click', '.js-tooltip-question', function (e) {
            var btnPosition = $j(this).position();
            var boxHeight = $j(this).parent().find('.tooltip-box').outerHeight();
            $j(this).parent().find('.tooltip-box').css({
                top: btnPosition.top - boxHeight - 10 /*arrow*/
            });
            $j(this).parent().find('.tooltip-box').toggleClass('show');
        });
        $j('body, html').on('click', function () {
            $j('.tooltip-box').removeClass('show');
        });
        $j('body').on('click', '.js-tooltip-question', function (e) {
            e.stopPropagation();
        });
        $j('body').on('click', '.tooltip-box', function (e) {
            e.stopPropagation();
        });
    }

    //Dialogs init
    window.remodalGlobals = {
        namespace: "modal",
        defaults: {
            hashTracking: false
        }
    };

    $j(".js-phone-field").mask("+38(999)999-99-99");
});
