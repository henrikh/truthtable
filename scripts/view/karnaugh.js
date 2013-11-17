define("view/karnaugh", ["util"], function(util){
'use strict';

var exports = {};

exports.generate = function(truthTable, symList, outputTable) {
	var output = "", _tmp, symListA, symListB;

	_tmp = util.sliceSymList(symList);
	symListA = _tmp[0];
	symListB = _tmp[1];

	output += '<tr><td colspan="2" rowspan="2">';
	output += '</td><td colspan="' + Math.pow(2,symListA.length) + '">';
	output += symListA.join("");
	output += '</td></tr>';

	for (var row = 0; row < truthTable.length; row++) {
		output += "<tr>";
		if(1 === row){
			output += '<td rowspan="' + Math.pow(2,symListB.length) + '">';
			output += symListB.join("");
			output += '</td>';
		}
		output += genKarnaughTableRow.apply(this, truthTable[row]);
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
