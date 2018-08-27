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

/* ================================================================
 * 				PART 07. Recursion 
 * ================================================================
 */

/* 
 *** Solution of a famous puzzle problem - The Towers of Hanoi
 *
 * The hanoi function moves a stack of discs from one post to another, 
 * using the auxiliary post if necessary. It breaks the problem into 
 * three subproblems. First, it uncovers the bottom disc by moving the
 * substack above it to the auxiliary post. It can then move the bottom
 * disc to the destination post. Finally, it can move the substack from 
 * the auxiliary post to the destination post. The movement of the 
 * substack is handled by calling itself recursively to work out those 
 * subproblems.
 */ 

var hanoi = function(disc, src, aux, dst){
	if (disc > 0){
		hanoi(disc - 1, src, dst, aux);
		document.writeln('Move disc ' + disc + 
						 ' from ' + src + 
						 ' to ' + dst);
		hanoi(disc - 1, aux, src, dst);
	}
};

hanoi(5, 'A', 'B', 'C');

/*
 * Recursive functions can be very effective in manipulating tree 
 * structures such as the browser's Document Object Model (DOM).
 */
 
// Code View:
// Define a walk_the_DOM function that visits every
// node of the tree in HTML source order, starting
// from some given node. It invokes a function,
// passing it each node in turn. walk_the_DOM calls
// itself to process each of the child nodes.

var walk_the_DOM = function walk(node, func){
	// do stuffs
	func(node);
	
	// set new node = first child-node
	node = node.firstChild;
	
	while (node){
		// recursion
		walk(node, func);
		
		node = node.nextSibling;
	}
};

// Define a getElementsByAttribute function. It
// takes an attribute name string and an optional
// matching value. It calls walk_the_DOM, passing it a
// function that looks for an attribute name in the
// node. The matching nodes are accumulated in a
// results array. (need test)

var getElementsByAttribute = function(attrib, value){
	var result = {};
	
	walk_the_DOM(document.body, function(node){
		var actual = (node.nodeType === 1) && node.getAttribute(attrib);
		if ((typeof actual === 'string') && 
			(actual === value || typeof value !== 'string')){
			result.push(node);
		}
	});
	
	return result;
};

// Make a factorial function with tail
// recursion. It is tail recursive because
// it returns the result of calling itself.
// JavaScript does not currently optimize this form.

/* version 01 -- more understanding */ 
var fact = function(n){
	function factorial_helper(n, res){
		return (n < 2)? res : factorial_helper(n - 1, n * res);
	}
	
	return factorial_helper(n, 1);
};

/* version 02 -- JS's style */
var factorial = function factorial(n, res){
	res = res || 1;
	return (n < 2)? res : factorial(n - 1, n * res);
};

document.writeln(factorial(5));	// 120

/* ================================================================
 * 				PART 08. Closure
 * ================================================================
 * Suppose we wanted to protect the value from unauthorized changes
 */

/* 
 * Instead of initializing myObject with an object literal, we will
 * initialize myObject by calling a function that returns an object 
 * literal. That function defines a value variable. That variable is 
 * always available to the increment and getValue methods, but the 
 * function's scope keeps it hidden from the rest of the program. 
 *
 * Here, we are not assigning a function to myNewObject. We are 
 * assigning the result of invoking that function. Notice the ( )
 * on the last line. The function returns an object containing three 
 * methods, and those methods continue to enjoy the privilege of 
 * access to the value variable.
 */
 
var myNewObject = function(){
	var value = 0;
	return {
		increment: function(inc){
			value += (typeof inc === 'number')? inc : 1;
		},
		setValue: function(n){
			value = (typeof n === 'number')? n : value;
		},
		getValue: function(){
			return value;
		}
	}
}();

myNewObject.setValue(10);
myNewObject.increment(-5);
myNewObject.setValue('example');
document.writeln(myNewObject.getValue());	// 5

// Create a maker function called quo. It makes an
// object with a get_status method and a private
// status property.

var newQuo = function(status){
	return {
		get_status: function(){
			return status;
		}
	};
};

var testQuo = newQuo("amazing");
document.writeln(testQuo.get_status());

// Define a function that sets a DOM node's color
// to yellow and then fades it to white.

var fade = function(node){
	var level = 1;
	var step = function(){
		var hex = level.toString(16);
		node.style.backgroundColor = '#FFFF' + hex + hex;
		if (level < 15){
			level += 1;
			setTimeout(step, 100);
		}
	};
	setTimeout(step, 100);
};

fade(document.body);

// Make a function that assigns event handler functions to an array of 
// nodes the right way. When we click on a node, an alert box will 
// display the ordinal of the node.

var add_the_handlers = function(nodes){
	var i;
	for (i = 0; i < nodes.length; i += 1){
		nodes[i].onclick = function(i){
			return function(e){
				alert(i);
			};
		}(i);
	}
};

// Now, instead of assigning a function to onclick, we define a function 
// and immediately invoke it, passing in i. That function will return an 
// event handler function that is bound to the value of i that was  passed
// in, not to the i defined in add_the_handlers. That returned function 
// is assigned to onclick.


/* ================================================================
 * 				PART 09. Callbacks
 * ================================================================
 */

// Make an asynchronous request, providing a callback function that will 
// be invoked when the server's response is received.

request = prepare_the_request();
send_request_asynchronously(request, func(response){
	display(response);
});

// We pass a function parameter to the send_request_asynchronously 
// function that will be called when the response is available.

/* ================================================================
 * 				PART 10. Module
 * ================================================================
 */
 
 String.method('deentityify', function(){
	// Hence, the entity table, which maps entity names to characters.
	var entity = {
		quote: '"',
		lt: '<',
		gt: '>'
	};
	
	// Return the deentityify method.
	// It calls the string replace method, looking for substrings that 
	// start with '&' and end with ';'. If the characters in between 
	// are in the entity table, then replace the entity with the 
	// character from the table.
	return function(){
		return this.replace(/&([^&;]+);/g,
			function(a, b){
				var r = entity[b];
				return (typeof r === 'string')? r : a;
			}
		);
	};
 }());
 
// We immediately invoke the function we just made with the ( ) operator.
// That invocation creates and returns the function that becomes the 
// deentityify method.

document.writeln(
	'&lt;&quote;&gt;'.deentityify()
);	// <">

/*
 * The general pattern of a module is a function that defines private 
 * variables and functions; creates privileged functions which, through 
 * closure, will have access to the private variables and functions; and 
 * that returns the privileged functions or stores them in an accessible 
 * place.
 *
 * Use of the module pattern can eliminate the use of global variables. 
 * It promotes information hiding and other good design practices. It is 
 * very effective in encapsulating applications and other singletons.
 */

var serial_maker = function(){
	// Produce an object that produces unique strings. A
	// unique string is made up of two parts: a prefix
	// and a sequence number. The object comes with
	// methods for setting the prefix and sequence
	// number, and a genSym method that produces unique
	// strings.
	var prefix = '';
	var sequence = 0;
	
	return {
		setPrefix: function(p){
			prefix = String(p);
		},
		setSequence: function(s){
			sequence = s;
		},
		genSym: function(){
			var result = prefix + sequence;
			sequence += 1;	//?
			return result;
		}
	};
};

var seqer = serial_maker();
seqer.setPrefix('A');
seqer.setSequence(200);
var unique = seqer.genSym();
document.writeln(unique + ' : ' + seqer.genSym());


/* ================================================================
 * 				PART 11. Cascade
 * ================================================================
 * Some methods do not have a return value. For example, it is typical 
 * for methods that set or change the state of an object to return 
 * nothing. If we have those methods return this instead of undefined, 
 * we can enable cascades. 
 *
 * In a cascade, we can call many methods on the same object in sequence 
 * in a single statement. 
 */

getElement('myBoxDiv').
	move(350, 150).
	width(100).
	height(100).
	color('red').
	border('10px outset').
	padding('4px').
	appendText("Please stand by").
	on('mousedown', function(m){
		this.startDrag(m, this.getNinth(m));
	}).
	on('mousemove', 'drag').
	on('mouseup', 'stopDrag').
	later(2000, function(){
		this.
			color('yellow').
			setHTML("What hath God wraught?").
			slide(400, 40, 200, 200);
	}).
	tip('This box is resizeable');
	
// In this example, the getElement function produces an object that 
// gives functionality to the DOM element with id="myBoxDiv". The 
// methods allow us to move the element, change its dimensions and 
// styling, and add behavior. Each of those methods returns the object, 
// so the result of the invocation can be used for the next invocation.
//
// Cascading can produce interfaces that are very expressive. It can 
// help control the tendency to make interfaces that try to do too much 
// at once.

/* ================================================================
 * 				PART 12. Curry
 * ================================================================
 * Functions are values, and we can manipulate function values in 
 * interesting ways. Currying allows us to produce a new function
 * by combining a function and an argument.
 */
 
Function.method('curry', function(){
	var slice = Array.prototype.slice,
		args = slice.apply(arguments),
		that = this;
		
	return function(){
		return that.apply(null, args.concat(slice.apply(arguments)));
	};
});

var add2 = add.curry(2);
document.writeln(add2(7));	// 9

/* ================================================================
 * 				PART 13. Memoization
 * ================================================================
 *  The memoizer function will take an initial memo array and the 
 * fundamental function. It returns a shell function that manages
 * the memo store and that calls the fundamental function as needed.
 * We pass the shell function and the function's parameters to the 
 * fundamental function.
 */
 
var memoizer = function(memo, fundamental){
	var shell = function(n){
		var result = memo[n];
		if (typeof result !== 'number'){
			result = fundamental(shell, n);
			memo[n] = result;
		}
		return result;
	};

	return shell;
};
 
// Define Fibonacci by memoizer
var Fibonacci = memoizer([1, 1], function(shell, n){
	return shell(n-1) + shell(n-2);
});

for (i = 0; i < 11; i += 1)
	document.writeln('#Fibo[' + i + ']: ' + Fibonacci(i));

// Define Factorial by memoizer
var Factorial = memoizer([1, 1], function(shell, n){
	return n * shell(n - 1);
});

for (i = 0; i < 25; i += 1)
	document.writeln('#Fact(' + i + '): ' + Factorial(i));