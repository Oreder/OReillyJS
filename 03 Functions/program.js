/*
 * Create a constructor function call Quo.
 * It makes an object with a status property.
 */

var Quo = function(status){
	this.status = status;
}

/*
 * Give all instance of Quo a public method
 * called get_status.
 */

Quo.prototype.get_status = function(){
	return this.status;
}

/*
 * Make an instance of Quo.
 */

var myQuo = new Quo("confused");
document.writeln(myQuo.get_status());