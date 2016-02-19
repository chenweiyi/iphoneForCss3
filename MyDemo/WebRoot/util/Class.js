/**  */
GeoSmarter.Class = function(){

	var Class = function(){
		if (arguments && arguments[0] != GeoSmarter.Class.isPrototype) {
            this.initialize.apply(this, arguments);
        }
	};
	
	var extended = {};
	
	var parent, initialize, Type;
	
	for(var i=0, len=arguments.length; i<len; ++i) {
        Type = arguments[i];
        if(typeof Type == "function") {
            if(i == 0 && len > 1) {
                initialize = Type.prototype.initialize;
                Type.prototype.initialize = function() {};
                extended = new Type();
                if(initialize === undefined) {
                    delete Type.prototype.initialize;
                } else {
                    Type.prototype.initialize = initialize;
                }
            }
            parent = Type.prototype;
        } else {
            parent = Type;
        }
        GeoSmarter.Util.extend(extended, parent);
    }
    Class.prototype = extended;
    return Class;

};