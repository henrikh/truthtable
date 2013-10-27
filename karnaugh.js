function grayCode(n) {
	list = [];
	for (var i = 0; i < Math.pow(2,n); i++) {
		list.push(i);
	};
	return grayShuffle(list)
}

function grayShuffle (list) {
	var lista, listb;
	if(list.length <= 2){
		return list
	}

	lista = grayShuffle(list.slice(0, list.length / 2));
	listb = grayShuffle(list.slice(list.length / 2)).reverse();

	return lista.concat(listb)
}

function generateKarnaughMap (symList, truthFunction) {
	var truthTable;
	if(symList.length > 4 || symList.length <= 1) {
		return false
	}

	if(flip){
        symListB = symList.slice(0, Math.floor(symList.length/2));
        symListA = symList.slice(Math.floor(symList.length/2));
	} else {
        symListA = symList.slice(0, Math.ceil(symList.length/2));
        symListB = symList.slice(Math.ceil(symList.length/2));
    }

	symAGray = grayCode(symListA.length);
	symBGray = grayCode(symListB.length);

	truthTable = [];
	truthTable.push(symAGray.map(function(x){return toPaddedBinary(x, symListA.length)}));

	for (var i = 0; i < symBGray.length; i++) {
		rowList = [];
		rowList.push(toPaddedBinary(symBGray[i], symListB.length));
		for (var j = 0; j < symAGray.length; j++) {
			pbA = toPaddedBinaryList(
				symAGray[j],
				symListA.length);

			pbB = toPaddedBinaryList(
				symBGray[i],
				symListB.length);
	
			if(flip){
				_tmp = pbA;
				pbA = pbB
				pbB = _tmp;
			}

			binary = pbA.concat(pbB)

			f = tf(truthFunction.apply(this, binary));
			rowList.push(f);
		};

		truthTable.push(rowList);
	};

	return truthTable
}

function genKarnaughTable (truthTable, symList, outputTable) {
	var output = ""

	if(flip){
        symListB = symList.slice(0, Math.floor(symList.length/2));
        symListA = symList.slice(Math.floor(symList.length/2));
	} else {
        symListA = symList.slice(0, Math.ceil(symList.length/2));
        symListB = symList.slice(Math.ceil(symList.length/2));
    }

	output += '<tr><td colspan="2" rowspan="2"></td><td colspan="' + Math.pow(2,symListA.length) + '">' + symListA.join("") + '</td></tr>'

	for (var row = 0; row < truthTable.length; row++) {
		output += "<tr>";
		if(1 === row){
			output += '<td rowspan="' + Math.pow(2,symListB.length) + '">' + symListB.join("") + '</td>'
		}
		output += genKarnaughTableRow.apply(this,truthTable[row]);
		output += "</tr>"
	};
	outputTable.innerHTML = output;
}

function genKarnaughTableRow () {
	tableRowHTML = "";
	for (var i = 0; i < arguments.length; i++) {
		tableRowHTML += '<td class="res">' + arguments[i] + "</td>";
	};
	return tableRowHTML
}

var flip = false;

document.getElementById("flip").addEventListener("change", function(){
	flip = flip ? false : true;
	parseAndGenerateTable(inputElement.value);
})
