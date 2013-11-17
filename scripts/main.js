require(["grammar", "truthfunction", "LaTeX", "karnaugh", "view/truthtable", "view/karnaugh", "storage", "history"],
 function(parser,    truthfunction,   LaTeX,   karnaugh,   truthtableview,    karnaughview,    storage,   history){
'use strict';
window.view = {};
view.truthtable = truthtableview;
view.karnaugh = karnaughview;

function parseAndGenerateTable(logicExpression) {
	var parsedExpression = parser.parse(logicExpression),
	    symList = truthfunction.symlist(parsedExpression),
	    tf = truthfunction.generate(symList, parsedExpression);

	var truthTable = truthfunction.truthTable(symList, tf);
	view.truthtable.generate(truthTable, outputTruthTable);

	var karnaughMap = truthfunction.karnaugh(symList, tf);
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

var flipEl = document.getElementById("flip");
window.flip = flipEl.checked = storage.get("flip") ? true : false;

flipEl.addEventListener("change", function(){
	flip = flipEl.checked;
	storage.set("flip", flip);
	parseAndGenerateTable(inputElement.value);
});

history.saveStateOf(inputElement, document.querySelector("#history ul"));
});
