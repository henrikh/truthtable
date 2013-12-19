define("view/minterms", ["util", "view/util"], function(util, viewUtil){
'use strict';

var exports = {};

exports.clear = viewUtil.clear;

exports.generate = function(truthfunction, outputEl) {
	var minterms = truthfunction.minterms().join(', ');

	var output = 'Minterms('
	       + minterms
               + ')';

	outputEl.innerText = output;
};

return exports;

});
