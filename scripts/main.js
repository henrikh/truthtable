require(["grammar", "truthfunction", "LaTeX", "karnaugh", "view/truthtable", "view/karnaugh"],
 function(parser,    truthfunction,   LaTeX,   karnaugh,   truthtableview,    karnaughview){
window.view = {};
view.truthtable = truthtableview;
view.karnaugh = karnaughview;

function parseAndGenerateTable(logicExpression) {
	parsedExpression = parser.parse(logicExpression);
	symList = truthfunction.symlist(parsedExpression);
	tf = truthfunction.generate(symList, parsedExpression);

	truthTable = truthfunction.truthTable(symList, tf);
	view.truthtable.generate(truthTable, outputTruthTable);

	karnaughMap = truthfunction.karnaugh(symList, tf);
	view.karnaugh.generate(karnaughMap, symList, outputKarnaughTable);

	console.log(LaTeX.generate(truthTable));
}

var outputTruthTable = document.getElementById("truthtable");
var outputKarnaughTable = document.getElementById("karnaughtable");

var inputElement = document.getElementById("expressionInput");
inputElement.addEventListener("keyup", function(){
	outputTruthTable.innerHTML = "";
	outputKarnaughTable.innerHTML = "";
	parseAndGenerateTable(inputElement.value);
});

window.flip = false;

document.getElementById("flip").addEventListener("change", function(e){
	flip = e.target.checked;
	parseAndGenerateTable(inputElement.value);
});
});
