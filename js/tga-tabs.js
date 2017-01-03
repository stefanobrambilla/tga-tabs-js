/**
 * Created by stefano.brambilla on 22/12/2016.
 * https://github.com/tigia/tga-tabs-js
 *
 * TGATabs plugin
 * version: 1.1
 *
 */

    var TGATabs = {

        init: function () {

            this.setConfig();
            this.settings = new TGATabs.setConfig();

            this.setEvents();
            this.setTrigger();

        },

        setConfig: function() {

            this.wrap   =    jQuery('.tabbed-wrap');
            this.toggle =    this.wrap.find('.tab');
            this.initClass  =    'tga-tab-init';
            this.w      =    jQuery(window);

        },

        getVariables: function (t) {

            this.nextToggle       = jQuery(t);
            this.currentWrap      = this.nextToggle.closest('.tabbed-wrap');
            this.effects          = this.currentWrap.attr('data-effect');
            this.allToggle        = this.currentWrap.find('[data-tab]');
            this.allTabsContent   = this.currentWrap.find('[data-tab-content]');
            this.tabData          = this.nextToggle.data('tab');
            this.nextContent      = this.currentWrap.find('[data-tab-content="'+this.tabData+'"]');
            this.currentContent   = this.currentWrap.find('[data-tab-content].active');

        },

        setEvents: function () {

            TGATabs.settings.toggle.on('click', function( event ){

                event.preventDefault();
                TGATabs.animation(this);

            });

            jQuery(window).on('resize', function(){

                if (TGATabs.haveTabs()){

                    TGATabs.adjust();

                }

            });

        },

        haveTabs: function () {

            TGATabs.settings.wrap.length > 0 && TGATabs.settings.wrap.hasClass(TGATabs.settings.initClass) ? haveTabs = true :  haveTabs = false ;

            return haveTabs;

        },

        getHeightWrap: function () {

            var tabRow      = 0,
                tabHeight   = 0;

            TGATabs.variables.allToggle.each( function () {

                tabHeight = jQuery(this).outerHeight(true);

                if(tabHeight > tabRow){

                    tabRow = tabHeight;

                }

            });

            return TGATabs.variables.nextContent.outerHeight(true) + tabRow;

        },

        setHeightWrap: function (delay) {

            setTimeout( function () {

                TGATabs.settings.wrap.height(TGATabs.getHeightWrap());

            }, delay);

        },

        animation: function(t){

            this.variables = new TGATabs.getVariables(t);

            jQuery.when(TGATabs.setHeightWrap(0)).done(function () {

                if (!TGATabs.variables.nextToggle.hasClass('active')) {


                    TGATabs.effect();

                    TGATabs.variables.allToggle.removeClass("active");
                    TGATabs.variables.allTabsContent.removeClass("active");
                    TGATabs.variables.nextContent.addClass("active");
                    TGATabs.variables.nextToggle.addClass("active");

                }

                TGATabs.setInitializeTab();

            });

        },

        effect: function () {

            if(!TGATabs.variables.effects || typeof TGATabs.variables.effects == "undefined"){

                TGATabs.variables.effects = 'slide';

            }

            if(TGATabs.variables.effects == 'fade'){

                TweenLite.to(TGATabs.variables.allTabsContent, 0.5, {css: {opacity: 0}});
                TweenLite.to(TGATabs.variables.nextContent, 0.5, {css: {opacity: 1}});

            }else if(TGATabs.variables.effects == 'slide'){

                TweenLite.to(TGATabs.variables.currentContent, 0.5, {css: {left: -TGATabs.settings.w.width()}});
                TweenLite.set(TGATabs.variables.nextContent, {css: {left: TGATabs.settings.w.width()}});
                TweenLite.to(TGATabs.variables.nextContent, 0.5, {css: {left: '0'}});

            }

        },

        setInitializeTab: function () {

            TGATabs.settings.wrap.addClass(TGATabs.settings.initClass);

        },

        adjust: function(){

            TGATabs.variables.allTabsContent.not('.active').css('left', TGATabs.settings.w.width());
            TGATabs.setHeightWrap(500);

        },

        setTrigger: function(){

            TGATabs.settings.w.bind('load', function () {

                TGATabs.settings.wrap.find('.tab:first-child').click();
            });

        }

    };

    jQuery(document).on('ready', function () {
        
        TGATabs.init();
        
    });