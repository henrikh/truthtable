define("view/truthtable", ["binaryUtil"], function(binaryUtil){

var exports = {};

function genTableRow () {
	tableRowHTML = "<tr>";
	for (var i = 0; i < arguments.length; i++) {
		tableRowHTML += "<td>" + binaryUtil.toOneZero(arguments[i]) + "</td>";
	}
	return tableRowHTML + "</tr>";
}

exports.generate = function(truthTable, outputTable) {
	output = "";
	for (var row = 0; row < truthTable.length; row++) {
		output += genTableRow.apply(this,truthTable[row]);
	}
	outputTable.innerHTML = output;
};

return exports;

});
