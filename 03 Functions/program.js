/* ================================================================
 * 			PART 01. Function literal & Method invocation 
 * ================================================================
 *
 * Create a variable called add and store a function
 * in it that adds two numbers.
 */

add = function (a, b) {
	return a + b;
};

myObject = {
	value: 0,
	increment: function(inc){
		this.value += (typeof inc === 'number')? inc : 1;
	}
};

myObject.increment();
document.writeln(myObject.value);		// 1

myObject.increment(-3);
document.writeln(myObject.value);		// -2

// Double method
myObject.double = function() {
	var that = this;		// Workaround
	
	var helper = function(){
		that.value = add(that.value, that.value)
	}
	
	// Invoke helper as a function
	helper();
};

// Now let invoke double as a method
myObject.double();
document.writeln(myObject.value);		// -4

/* ================================================================
 * 				PART 02. Constructor invocation 
 * ================================================================
 *
 * Create a constructor function call Quo.
 * It makes an object with a status property.
 */

var Quo = function(status){
	this.status = status;
};

/*
 * Give all instance of Quo a public method
 * called get_status.
 */

Quo.prototype.get_status = function(){
	return this.status;
};

/*
 * Make an instance of Quo.
 */

var myQuo = new Quo("confused");
document.writeln(myQuo.get_status());

/* ================================================================
 * 				PART 03. Apply invocation 
 * ================================================================
 *
 * Make an array of 2 numbers and add them.
 */
 
var array = [3, 4];
var sum  = add.apply(null, array);		// 7
document.writeln(sum);

// Make an object with a status memnber.
var statusObject = {
	status: 'A-OK'
};

/*
 * statusObject does not inherit from Quo.prototype,
 * but we can invoke the get_status method on
 * statusObject even though statusObject does not have
 * a get_status method.
 */

var status = Quo.prototype.get_status.apply(statusObject);
document.writeln("New status is " + status);

/* ================================================================
 * 				PART 04. Arguments 
 * ================================================================
 *
 * Make a function that adds a lot of stuff.
 * Note that defining the variable sum inside of
 * the function does not interfere with the sum
 * defined outside of the function. The function
 * only sees the inner one.
 */
 
var sum = function(){
	var i, sum = 0;
	for (i = 0; i < arguments.length; i += 1){
		sum += arguments[i];
	}
	return sum;
};

document.writeln(sum(1, 2, 3, 4, 5, 6, 7, 8, 9));	// 45

/* ================================================================
 * 				PART 05. Exceptions 
 * ================================================================
 *
 * JavaScript provides an exception handling mechanism. Exceptions are
 * unusual (but not completely unexpected) mishaps that interfere with
 * the normal flow of a program. When such a mishap is detected, your
 * program should throw an exception.
 */
 
var add = function(a, b){
	if (typeof a !== 'number' || typeof b !== 'number'){
		throw {
			name: 'TypeError',
			message: 'apply for only numbers'
		}
	}
	return a + b;
};

// Make a try_it function that calls the new add
// function incorrectly.
var try_it = function(){
	try {
		add("seven");
	} catch (e) {
		document.writeln(e.name + ': ' + e.message);
	}
};

try_it();

/* ================================================================
 * 				PART 06. Augumenting types 
 * ================================================================
 */

Function.prototype.method = function(name, func){
	if (!this.prototype[name]){
		this.prototype[name] = func;
	}
	return this;
};

Number.method('integer', function(){
	return Math[(this < 0)? 'ceil' : 'floor'](this);
});

document.writeln((-10 / 3).integer());	// -3

// Using a regular expression
String.method('trim', function(){
	return this.replace(/^\s+|\s+$/g, '');
});

document.writeln('"' + "    neat    ".trim() + '"');