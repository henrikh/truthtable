function and (a, b) {
	return a && b
}

function or (a, b) {
	return a || b
}

function nor (a, b) {
	return !(a || b)
}

function nand (a, b) {
	return !(a && b)
}

function xor (a, b) {
	return (!a && b) + (a && !b)
}

function xnor (a, b) {
	return (!a && !b) + (a && b)
}

function generateSymlist (parsedExpression) {
	regex = /[a-zA-Z]/;
	parsedExpression = (parsedExpression+" ").split("");
	stack = [];
	symList = [];

	for (var i = 0; i < parsedExpression.length; i++) {
		ch = parsedExpression[i];
		if(regex.test(ch)) {
			stack.push(ch)
		} else {
			if(stack.length === 1) {
				symList.push(stack[0])
			}
			stack = [];
			continue
		}
	};

	return symList.unique().sort()
}

function generateTruthFunction (symList, parsedExpression) {
	eval("t = function(" + symList.join(",") + "){return " + parsedExpression + "}");
	return t
}

Array.prototype.unique = function(){
    var r = [];
    for(var i = 0; i < this.length; i++){
        if( r.indexOf(this[i]) == -1 )
        r.push( this[i] );
    }
    return r.sort(function(a,b){ return a - b });
}
