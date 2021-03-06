define("util", function(){
	'use strict';

	var exports = {};

	exports.sliceSymList = function(symList){
		if(flip){
			return [symList.slice(Math.floor(symList.length/2)),
				symList.slice(0, Math.floor(symList.length/2))];
		} else {
			return [symList.slice(0, Math.ceil(symList.length/2)),
				symList.slice(Math.ceil(symList.length/2))];
		}
	};

	exports.times = function(i, item) {
		var val = [];
		for(i; i>0; --i) {
			val.push(item);
		}
		return val;
	};

	exports.toOneZero = function(item) {
		if(typeof(item) === "boolean"){
			return item ? 1 : 0;
		}
		return item;
	};

	exports.toPaddedBinary = function (decimal, width) {
		var binary = decimal.toString(2);
		while(binary.length < width){
			binary = "0" + binary;
		}

		return binary;
	};

	exports.toPaddedBinaryList = function(decimal, width) {
		return exports.toPaddedBinary(decimal, width).split("").map(
			function(x){
				return parseInt(x);
			});
	};

	var grayShuffle = function(list) {
		var lista, listb;
		if(list.length <= 2){
			return list;
		}

		lista = grayShuffle(list.slice(0, list.length / 2));
		listb = grayShuffle(list.slice(list.length / 2)).reverse();

		return lista.concat(listb);
	};

	exports.grayCode = function(n) {
		var list = [];
		for (var i = 0; i < Math.pow(2,n); i++) {
			list.push(i);
		}
		return grayShuffle(list);
	};
	return exports;
});
