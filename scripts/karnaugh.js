define("karnaugh", ["binaryUtil"], function(binaryUtil){
function sliceSymList(symList){
	if(flip){
		return [symList.slice(Math.floor(symList.length/2)),
		        symList.slice(0, Math.floor(symList.length/2))];
	} else {
		return [symList.slice(0, Math.ceil(symList.length/2)),
		        symList.slice(Math.ceil(symList.length/2))];
	}
}

exports = {};

exports.generateMap = function(symList, truthFunction) {
	var truthTable;
	if(symList.length > 4 || symList.length <= 1) {
		return false;
	}

	_tmp = sliceSymList(symList);
	symListA = _tmp[0];
	symListB = _tmp[1];

	symAGray = binaryUtil.grayCode(symListA.length);
	symBGray = binaryUtil.grayCode(symListB.length);

	truthTable = [];
	truthTable.push(symAGray.map(
		function(x){
			return binaryUtil.toPaddedBinary(x, symListA.length);
		}));

	for (var i = 0; i < symBGray.length; i++) {
		rowList = [];
		rowList.push(binaryUtil.toPaddedBinary(symBGray[i], symListB.length));
		for (var j = 0; j < symAGray.length; j++) {
			pbA = binaryUtil.toPaddedBinaryList(
				symAGray[j],
				symListA.length);

			pbB = binaryUtil.toPaddedBinaryList(
				symBGray[i],
				symListB.length);
	
			if(flip){
				_tmp = pbA;
				pbA = pbB;
				pbB = _tmp;
			}

			binary = pbA.concat(pbB);

			f = truthFunction.apply(this, binary);
			rowList.push(f);
		}

		truthTable.push(rowList);
	}

	return truthTable;
};

exports.generateTable = function(truthTable, symList, outputTable) {
	var output = "";

	_tmp = sliceSymList(symList);
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
	tableRowHTML = "";
	for (var i = 0; i < arguments.length; i++) {
		tableRowHTML += '<td class="res">';
		tableRowHTML += arguments[i];
		tableRowHTML += "</td>";
	}
	return tableRowHTML;
}

return exports;
});
