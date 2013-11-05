function generateKarnaughMap (symList, truthFunction) {
	var truthTable;
	if(symList.length > 4 || symList.length <= 1) {
		return false;
	}

	if(flip){
        symListB = symList.slice(0, Math.floor(symList.length/2));
        symListA = symList.slice(Math.floor(symList.length/2));
	} else {
        symListA = symList.slice(0, Math.ceil(symList.length/2));
        symListB = symList.slice(Math.ceil(symList.length/2));
    }

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

			f = tfConvert(truthFunction.apply(this, binary));
			rowList.push(f);
		}

		truthTable.push(rowList);
	}

	return truthTable;
}

function genKarnaughTable (truthTable, symList, outputTable) {
	var output = "";

	if(flip){
        symListB = symList.slice(0, Math.floor(symList.length/2));
        symListA = symList.slice(Math.floor(symList.length/2));
	} else {
        symListA = symList.slice(0, Math.ceil(symList.length/2));
        symListB = symList.slice(Math.ceil(symList.length/2));
    }

	output += '<tr><td colspan="2" rowspan="2"></td><td colspan="' + Math.pow(2,symListA.length) + '">' + symListA.join("") + '</td></tr>';

	for (var row = 0; row < truthTable.length; row++) {
		output += "<tr>";
		if(1 === row){
			output += '<td rowspan="' + Math.pow(2,symListB.length) + '">' + symListB.join("") + '</td>';
		}
		output += genKarnaughTableRow.apply(this,truthTable[row]);
		output += "</tr>";
	}
	outputTable.innerHTML = output;
}

function genKarnaughTableRow () {
	tableRowHTML = "";
	for (var i = 0; i < arguments.length; i++) {
		tableRowHTML += '<td class="res">' + arguments[i] + "</td>";
	}
	return tableRowHTML;
}

var flip = false;

document.getElementById("flip").addEventListener("change", function(){
	flip = flip ? false : true;
	parseAndGenerateTable(inputElement.value);
});
