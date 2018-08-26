var app = {};

// Create a variable called add and store a function
// in it that adds two numbers.
app.add = function (a, b) {
	return a + b;
};

app.myObject = {
	value: 0,
	increment: function(inc){
		this.value += (typeof inc === 'number')? inc : 1;
	}
}

app.myObject.increment();
document.writeln(app.myObject.value);		// 1

app.myObject.increment(-3);
document.writeln(app.myObject.value);		// -2