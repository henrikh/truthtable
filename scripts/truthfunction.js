define("truthfunction", ["truthTable", "karnaugh", "util"], function(truthTable, karnaugh, util){
	function and (a, b) {
		return a && b;
	}

	function or (a, b) {
		return a || b;
	}

	function nor (a, b) {
		return !(a || b);
	}

	function nand (a, b) {
		return !(a && b);
	}

	function xor (a, b) {
		return (!a && b) + (a && !b);
	}

	function xnor(a, b) {
		return (!a && !b) + (a && b);
	}

	function unique(list){
		var r = [];
		for(var i = 0; i < list.length; i++){
		if( r.indexOf(list[i]) == -1 )
			r.push( list[i] );
		}
		return r.sort(
			function(a,b){
				return a - b;
			});
	}

	exports = {};

	exports.symlist = function(parsedExpression) {
		regex = /[a-zA-Z]/;
		parsedExpression = (parsedExpression+" ").split("");
		stack = [];
		symList = [];

		for (var i = 0; i < parsedExpression.length; i++) {
			ch = parsedExpression[i];
			if(regex.test(ch)) {
				stack.push(ch);
			} else {
				if(stack.length === 1) {
					symList.push(stack[0]);
				}
				stack = [];
				continue;
			}
		}

		return unique(symList).sort();
	};

	exports.generate = function(symList, parsedExpression) {
		eval("t = function(" + symList.join(",") + "){return " + parsedExpression + "}");
		return t;
	};

	exports.minterms = function(symList, f){
		var inputCount = symList.length;		

		var minterms = [];

		for (var i = 0; i < Math.pow(2, inputCount); i++) {
			binary = util.toPaddedBinaryList(i, inputCount);
			if(f.apply(this, binary)){
				minterms.push(i);
			}
		}
		return minterms;
	};

	exports.truthTable = function(symList, f){
		return truthTable.generate(symList, f);
	};

	exports.karnaugh = function(symList, f){
		return karnaugh.generateMap(symList, f);
	}

	return exports;
});
