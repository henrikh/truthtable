define("truthfunction", ["karnaugh", "util"], function(karnaugh, util){
	'use strict';

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

	var exports = {};

	exports.symlist = function(parsedExpression) {
		var regex = /[a-zA-Z]/,
		    parsedExpression = (parsedExpression+" ").split(""),
		    stack = [],
		    symList = [];

		for (var i = 0; i < parsedExpression.length; i++) {
			var ch = parsedExpression[i];
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
		var t;
		eval("t = function("
		   + symList.join(",")
		   + "){var "
		   + symList.join(",")
		   + ";return "
		   + parsedExpression
		   + "}");
		return t;
	};

	var minterms = function(symList, f){
		var inputCount = symList.length;		

		var minterms = [];

		for (var i = 0; i < Math.pow(2, inputCount); i++) {
			var binary = util.toPaddedBinaryList(i, inputCount);
			if(f.apply(this, binary)){
				minterms.push(i);
			}
		}
		return minterms;
	};

	exports.minterms = minterms;

	function resultList(symListLength, minterms){
		var list = [];
		for (var i = 0; i < Math.pow(2, symListLength); i++){
			list.push(0);
		}
		for (var i = 0; i < minterms.length; i++){
			list[minterms[i]] = 1;
		}

		return list;
	}

	exports.truthTable = function(symList, f){
		var inputCount = symList.length;

		var list = resultList(inputCount, minterms(symList, f));

		var truthTableList = [symList.concat("f")];

		for (var i = 0; i < list.length; i++) {
			var binary = util.toPaddedBinaryList(i, inputCount);
			binary.push(list[i]);
			truthTableList.push(binary);
		}

		return truthTableList;
	};

	exports.karnaugh = function(symList, f){
		return karnaugh.generateMap(symList, f);
	};

	return exports;
});
