(function() {

    var singleFile = (typeof GeoSmarter == "object" && GeoSmarter.singleFile);

	var scriptLocation;

	window.GeoSmarter = {

        _scriptName: (!singleFile) ? "GeoSmarter/GeoSmarter..js" : "GeoSmarter.js",

        _getScriptLocation: function () {
            if (scriptLocation != undefined) {
                return scriptLocation;
            }
            scriptLocation = "";            
            var isOL = new RegExp("(^|(.*?\\/))(" + GeoSmarter._scriptName + ")(\\?|$)");
         
            var scripts = document.getElementsByTagName('script');
            for (var i=0, len=scripts.length; i<len; i++) {
                var src = scripts[i].getAttribute('src');
                if (src) {
                    var match = src.match(isOL);
                    if(match) {
                        scriptLocation = match[1];
                        break;
                    }
                }
            }
            return scriptLocation;
        }

	}

	if(!singleFile) {
    /*    var jsfiles = new Array(
            "Util.js",
            "Class.js",
            "Events.js",
            "GeoShow/DataSource.js",
            "GeoShow/Widget.js",
            "GeoShow/DataSource/OLAP.js",
            "GeoShow/Components/OLAP/Pie.js",
            "GeoShow/Main.js"
        );*/
        var jsfiles = new Array();
        var agent = navigator.userAgent;
        var docWrite = (agent.match("MSIE") || agent.match("Safari"));
        if(docWrite) {
            var allScriptTags = new Array(jsfiles.length);
        }
        var host = GeoSmarter._getScriptLocation() + "GeoSmarter/";  
        for (var i=0, len=jsfiles.length; i<len; i++) {
            if (docWrite) {
                allScriptTags[i] = "<script src='" + host + jsfiles[i] +
                                   "'></script>"; 
            } else {
                var s = document.createElement("script");
                s.type = "text/javascript";
                s.src = host + jsfiles[i];
                var h = document.getElementsByTagName("head").length ? 
                           document.getElementsByTagName("head")[0] : 
                           document.body;
                h.appendChild(s);
            }
        }
        if (docWrite) {
            document.write(allScriptTags.join(""));
        }
    }

	window.GeoGlobe = window.GeoSmarter = GeoSmarter;

})();

/**
 * 版本号
 */
GeoSmarter.VERSION_NUMBER="GeoSmarter v3.0";