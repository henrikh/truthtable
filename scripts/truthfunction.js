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

	var exports = {},
	    Constructor = function(){
		this.cache = {};
	};

	Constructor.prototype.setExp = function(expression) {
		this.expression = expression;
		this.cache = {};
	};

	Constructor.prototype.symlist = function() {
		if(typeof this.cache.symlist !== "undefined" && this.cache.symlist !== null) return this.cache.symlist;

		var regex = /[a-zA-Z](?:_?\d+)?[,)]/g;

		var symlist = this.expression.match(regex).map(
			function(i){
				return i.slice(0,i.length-1);
			});

		this.cache.symlist = unique(symlist).sort();
		return this.cache.symlist;
	};

	Constructor.prototype.generate = function() {
		if(typeof this.cache.func !== "undefined" && this.cache.func !== null) return this.cache.func;

		var t,
		    symList = this.symlist();
		eval("t = function("
		   + symList.join(",")
		   + "){var "
		   + symList.join(",")
		   + ";return "
		   + this.expression
		   + "}");

		this.cache.func = t;

		return t;
	};

	Constructor.prototype.func = Constructor.prototype.generate;

	Constructor.prototype.minterms = function(){
		if(typeof this.cache.minterms !== "undefined" && this.cache.minters !== null) return this.cache.minterms;
		var inputCount = this.symlist().length,
		    minterms = [];

		for (var i = 0; i < Math.pow(2, inputCount); i++) {
			var binary = util.toPaddedBinaryList(i, inputCount);
			if(this.func().apply(this, binary)){
				minterms.push(i);
			}
		}

		this.cache.minterms = minterms;
		return minterms;
	};

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

	Constructor.prototype.truthTable = function(){
		var inputCount = this.symlist().length;

		var list = resultList(inputCount, this.minterms());

		var truthTableList = [this.symlist().concat("f")];

		for (var i = 0; i < list.length; i++) {
			var binary = util.toPaddedBinaryList(i, inputCount);
			binary.push(list[i]);
			truthTableList.push(binary);
		}

		return truthTableList;
	};

	Constructor.prototype.karnaugh = function(){
		return karnaugh.generateMap(this.symlist(), this.func());
	};

	exports.Constructor = Constructor;

	return exports;
});
