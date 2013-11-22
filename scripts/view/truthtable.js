define("view/truthtable", ["util", "view/util"], function(util, viewUtil){
'use strict';

var exports = {};

function genTableRow () {
	var tableRowHTML = "<tr>";
	for (var i = 0; i < arguments.length; i++) {
		tableRowHTML += "<td>";
		var argtype = typeof arguments[i];
		if(argtype === "string") {
			tableRowHTML += viewUtil.formatSymbol(arguments[i]);
		} else {
			tableRowHTML += util.toOneZero(arguments[i]);
		}
		tableRowHTML += "</td>";
	}
	return tableRowHTML + "</tr>";
}

exports.generate = function(truthfunction, outputTable) {
	var output = "",
	    truthtable = truthfunction.truthTable();
	for (var row = 0; row < truthtable.length; row++) {
		output += genTableRow.apply(this,truthtable[row]);
	}
	outputTable.innerHTML = output;
};

return exports;

});
