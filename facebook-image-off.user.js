// ==UserScript==
// @author          Tareq Hasan
// @author_uri      http://tareq.weDevs.com
// @name            FB Homepage Cleaner
// @namespace       fb
// @description     Removes all gallery image from homepage
// @include         https://*.facebook.com/*
// @include         http://*.facebook.com/*
// ==/UserScript==

var FB_Image_Remover = {
    init: function() {
        
        var self = this,
            home = document.getElementById('home_stream'),
            uiPhotoThumb = home.getElementsByClassName('uiPhotoThumb'),
            uiScaledThumb = home.getElementsByClassName('uiScaledImageContainer'),
            peopleYouMayKnow = document.getElementById('pagelet_ego_pane_w');
        
        //remove people you may know section
        if( peopleYouMayKnow.innerHTML !== '' ) {
            peopleYouMayKnow.innerHTML = '';
            this.log('removing people you may know');
        }
        
        for(var i = 0; i < uiPhotoThumb.length; i++ ) {
            this.removeImage(uiPhotoThumb[i].children[0]);
        }
        
        for(var i = 0; i < uiScaledThumb.length; i++ ) {
            this.removeImage(uiScaledThumb[i].children[0]);
        }
        
        //call the init with right context
        setTimeout(function() {
            self.init()
        }, 1000);
    },
    addStyle: function() {
        var head = document.getElementsByTagName('head')[0],
            style = document.createElement('style'),
            rules = document.createTextNode('.photoWrap, .photoRedesignCover, .photoRedesign {display: none !important; }');

        style.type = 'text/css';
        if(style.styleSheet) {
            style.styleSheet.cssText = rules.nodeValue;
        } else {
            style.appendChild(rules);
        }
        
        head.appendChild(style);
        
        this.log('added custom style');
    },
    removeImage: function (el) {
        
        //setting src to blank makes src equal to document base URI
        if( el.src !== document.baseURI ) {        
            el.src = '';
            el.width = 1;
            el.height = 1;
            
            this.log('Removed: ' + el.alt + ' - ' + el.src);
        }
    },
    log: function( val ) {
        if(typeof console === 'object' ) {
            console.log(val);
        }
    }
};

FB_Image_Remover.addStyle();
FB_Image_Remover.init();
