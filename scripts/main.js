require(["parser", "truthfunction", "LaTeX", "view/truthtable", "view/karnaugh", "storage", "history"],
 function(parser,    truthfunction,   LaTeX,   truthtableview,    karnaughview,    storage,   history){
'use strict';
window.view = {};
view.truthtable = truthtableview;
view.karnaugh = karnaughview;

var TruthFunction = new truthfunction.Constructor();

function parseAndGenerateTable(logicExpression) {
	var parsedExpression = parser.parse(logicExpression);

	TruthFunction.setExp(parsedExpression);

	view.truthtable.generate(TruthFunction, outputTruthTable);

	view.karnaugh.generate(TruthFunction, outputKarnaughTable);

	console.log(LaTeX.generate(TruthFunction.truthTable()));
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
