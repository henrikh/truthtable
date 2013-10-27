function tf (x) {
	return x ? 1 : 0
}

// HTML-output

// x || y || z || a || b || c || d || e

function genTable (truthTable, outputTable) {
	output = ""
	for (var row = 0; row < truthTable.length; row++) {
		output += genTableRow.apply(this,truthTable[row]);
	};
	outputTable.innerHTML = output;
}

function genTableRow () {
	tableRowHTML = "<tr>";
	for (var i = 0; i < arguments.length; i++) {
		tableRowHTML += "<td>" + arguments[i] + "</td>";
	};
	return tableRowHTML + "</tr>"
}

// LaTeX-output

function genLaTeXTable (truthTable) {
	output = "\\begin{tabular}\n"
	for (var row = 0; row < truthTable.length; row++) {
		output += genLaTeXTableRow.apply(this,truthTable[row]);
	};
	output += "\\end{tabular}";
	return output
}

function genLaTeXTableRow () {
	tableRowHTML = "";
	tableRowHTML += Array.prototype.slice.call(arguments).join(" & ")
	return tableRowHTML + " \\\\\n"
}

// Internals

generateTruthTable = function(inputList, truthFunction) {
	inputCount = inputList.length;

	truthTableList = [inputList.concat("f")];

	for (var i = 0; i < Math.pow(2, inputCount); i++) {
		binary = binaryUtil.toPaddedBinaryList(i, inputCount);
		f = tf(truthFunction.apply(this, binary));
		binary.push(f);
		truthTableList.push(binary);
	};

	return truthTableList
}

function parseAndGenerateTable(logicExpression) {
	parsedExpression = parser.parse(logicExpression);
	symList = generateSymlist(parsedExpression);
	truthFunction = generateTruthFunction(symList, parsedExpression);

	truthTable = generateTruthTable(symList, truthFunction);
	genTable(truthTable, outputTruthTable);
	
	karnaughTable = generateKarnaughMap(symList, truthFunction);
	genKarnaughTable(karnaughTable, symList, outputKarnaughTable);
	
	console.log(genLaTeXTable(truthTable));
}

var outputTruthTable = document.getElementById("truthtable");
var outputKarnaughTable = document.getElementById("karnaughtable");

inputElement = document.getElementById("expressionInput");
inputElement.addEventListener("keyup", function(){
	outputTruthTable.innerHTML = "";
	outputKarnaughTable.innerHTML = "";
	parseAndGenerateTable(inputElement.value);
});
