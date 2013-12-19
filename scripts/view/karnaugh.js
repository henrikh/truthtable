define("view/karnaugh", ["util", "view/util"], function(util, viewUtil){
'use strict';

var exports = {};

exports.clear = viewUtil.clear;

exports.generate = function(truthfunction, outputTable) {
	var karnaughmap = truthfunction.karnaugh();
	if(karnaughmap === false) {
		return false;
	}

	var output = "", _tmp, symListA, symListB,
	    symList = truthfunction.symlist();

	_tmp = util.sliceSymList(symList);
	symListA = _tmp[0].map(viewUtil.formatSymbol);
	symListB = _tmp[1].map(viewUtil.formatSymbol);

	output += '<tr><td colspan="2" rowspan="2">';
	output += '</td><td colspan="' + Math.pow(2,symListA.length) + '">';
	output += symListA.join("");
	output += '</td></tr>';

	for (var row = 0; row < karnaughmap.length; row++) {
		output += "<tr>";
		if(1 === row){
			output += '<td rowspan="' + Math.pow(2,symListB.length) + '">';
			output += symListB.join("");
			output += '</td>';
		}
		output += genKarnaughTableRow.apply(this, karnaughmap[row]);
		output += "</tr>";
	}
	outputTable.innerHTML = output;
};

function genKarnaughTableRow () {
	var tableRowHTML = "";
	for (var i = 0; i < arguments.length; i++) {
		tableRowHTML += '<td class="res">';
		tableRowHTML += util.toOneZero(arguments[i]);
		tableRowHTML += "</td>";
	}
	return tableRowHTML;
}

return exports;
});
