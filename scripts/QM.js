define("QM", ["util"], function(util){
	'use strict';

	function countOnes(list) {
		var count = 0;
		for(var i=0; i<list.length; i++){
			list[i]===1 ? count++ : null;
		}
		return count;
	}

	var exports = {
		minimize: function (parent) {
			return parent.minterms().map(function(i){
				return countOnes(util.toPaddedBinaryList(i,2))
			})
		}
	};

	return exports;
});
