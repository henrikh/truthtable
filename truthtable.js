function tfConvert (x) {
	return x ? 1 : 0;
}

// HTML-output

// x || y || z || a || b || c || d || e

function genTable (truthTable, outputTable) {
	output = "";
	for (var row = 0; row < truthTable.length; row++) {
		output += genTableRow.apply(this,truthTable[row]);
	}
	outputTable.innerHTML = output;
}

function genTableRow () {
	tableRowHTML = "<tr>";
	for (var i = 0; i < arguments.length; i++) {
		item = arguments[i];
		if(typeof(item) === "boolean"){
			item = item ? 1 : 0;
		}
		tableRowHTML += "<td>" + item + "</td>";
	}
	return tableRowHTML + "</tr>";
}

// Internals

function parseAndGenerateTable(logicExpression) {
	parsedExpression = parser.parse(logicExpression);
	symList = truthfunction.symlist(parsedExpression);
	tf = truthfunction.generate(symList, parsedExpression);

	truthTable = truthfunction.truthTable(symList, tf);
	genTable(truthTable, outputTruthTable);
	
	karnaughTable = generateKarnaughMap(symList, tf);
	genKarnaughTable(karnaughTable, symList, outputKarnaughTable);
	
	console.log(LaTeX.generate(truthTable));
}

var outputTruthTable = document.getElementById("truthtable");
var outputKarnaughTable = document.getElementById("karnaughtable");

inputElement = document.getElementById("expressionInput");
inputElement.addEventListener("keyup", function(){
	outputTruthTable.innerHTML = "";
	outputKarnaughTable.innerHTML = "";
	parseAndGenerateTable(inputElement.value);
});
