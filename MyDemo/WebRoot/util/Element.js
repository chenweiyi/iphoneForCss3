GeoSmarter.Element = {

    visible: function(element) {
        return GeoSmarter.Util.getElement(element).style.display != 'none';
    },

    toggle: function() {
        for (var i=0, len=arguments.length; i<len; i++) {
            var element = GeoSmarter.Util.getElement(arguments[i]);
            var display = GeoSmarter.Element.visible(element) ? 'hide' 
                                                              : 'show';
            GeoSmarter.Element[display](element);
        }
    },

    hide: function() {
        for (var i=0, len=arguments.length; i<len; i++) {
            var element = GeoSmarter.Util.getElement(arguments[i]);
            if (element) {
                element.style.display = 'none';
            }
        }
    },

    show: function() {
        for (var i=0, len=arguments.length; i<len; i++) {
            var element = GeoSmarter.Util.getElement(arguments[i]);
            if (element) {
                element.style.display = '';
            }
        }
    },

    remove: function(element) {
        element = GeoSmarter.Util.getElement(element);
        element.parentNode.removeChild(element);
    },

    getHeight: function(element) {
        element = GeoSmarter.Util.getElement(element);
        return element.offsetHeight;
    },

    getDimensions: function(element) {
        element = GeoSmarter.Util.getElement(element);
        if (GeoSmarter.Element.getStyle(element, 'display') != 'none') {
            return {width: element.offsetWidth, height: element.offsetHeight};
        }
        
        var els = element.style;
        var originalVisibility = els.visibility;
        var originalPosition = els.position;
        var originalDisplay = els.display;
        els.visibility = 'hidden';
        els.position = 'absolute';
        els.display = '';
        var originalWidth = element.clientWidth;
        var originalHeight = element.clientHeight;
        els.display = originalDisplay;
        els.position = originalPosition;
        els.visibility = originalVisibility;
        return {width: originalWidth, height: originalHeight};
    },

    hasClass: function(element, name) {
        var names = element.className;
        return (!!names && new RegExp("(^|\\s)" + name + "(\\s|$)").test(names));
    },

    addClass: function(element, name) {
        if(!GeoSmarter.Element.hasClass(element, name)) {
            element.className += (element.className ? " " : "") + name;
        }
        return element;
    },

    removeClass: function(element, name) {
        var names = element.className;
        if(names) {
            element.className = GeoSmarter.String.trim(
                names.replace(
                    new RegExp("(^|\\s+)" + name + "(\\s+|$)"), " "
                )
            );
        }
        return element;
    },

    toggleClass: function(element, name) {
        if(GeoSmarter.Element.hasClass(element, name)) {
            GeoSmarter.Element.removeClass(element, name);
        } else {
            GeoSmarter.Element.addClass(element, name);
        }
        return element;
    },

    getStyle: function(element, style) {
        element = GeoSmarter.Util.getElement(element);

        var value = null;
        if (element && element.style) {
            value = element.style[GeoSmarter.String.camelize(style)];
            if (!value) {
                if (document.defaultView && 
                    document.defaultView.getComputedStyle) {
                    
                    var css = document.defaultView.getComputedStyle(element, null);
                    value = css ? css.getPropertyValue(style) : null;
                } else if (element.currentStyle) {
                    value = element.currentStyle[GeoSmarter.String.camelize(style)];
                }
            }
        
            var positions = ['left', 'top', 'right', 'bottom'];
            if (window.opera &&
                (GeoSmarter.Util.indexOf(positions,style) != -1) &&
                (GeoSmarter.Element.getStyle(element, 'position') == 'static')) { 
                value = 'auto';
            }
        }
    
        return value == 'auto' ? null : value;
    }

};