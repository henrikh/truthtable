define("view/truthtable", ["util"], function(util){
'use strict';

var exports = {};

function genTableRow () {
	var tableRowHTML = "<tr>";
	for (var i = 0; i < arguments.length; i++) {
		tableRowHTML += "<td>" + util.toOneZero(arguments[i]) + "</td>";
	}
	return tableRowHTML + "</tr>";
}

exports.generate = function(truthTable, outputTable) {
	var output = "";
	for (var row = 0; row < truthTable.length; row++) {
		output += genTableRow.apply(this,truthTable[row]);
	}
	outputTable.innerHTML = output;
};

return exports;

});
