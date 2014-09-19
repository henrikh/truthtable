require(["parser", "truthfunction", "LaTeX", "view/truthtable", "view/karnaugh","view/minterms", "storage", "history", "qm"],
 function(parser,    truthfunction,   LaTeX,   truthtableview,    karnaughview,   mintermsview,   storage,   history, qm){
'use strict';
window.view = {};
view.truthtable = truthtableview;
view.karnaugh = karnaughview;
view.minterms = mintermsview;

var TruthFunction = new truthfunction.Constructor();

function parseAndGenerateTable(logicExpression) {
	var parsedExpression = parser.parse(logicExpression);

	TruthFunction.setExp(parsedExpression);

	view.truthtable.clear(outputTruthTable);
	view.karnaugh.clear(outputKarnaughTable);
	view.minterms.clear(outputMinterms);

	console.log(qm.minimize(TruthFunction.minterms(), TruthFunction.symlist()));

	if(TruthFunction.symlist().length < 6){
		view.truthtable.generate(TruthFunction, outputTruthTable);
		console.log(LaTeX.generate(TruthFunction.truthTable()));
	} else {
		view.minterms.generate(TruthFunction, outputMinterms);
	}

	view.karnaugh.generate(TruthFunction, outputKarnaughTable);

}

var flipEl = document.getElementById("flip");
window.flip = flipEl.checked = storage.get("flip") ? true : false;

flipEl.addEventListener("change", function(){
	flip = flipEl.checked;
	storage.set("flip", flip);
	parseAndGenerateTable(inputElement.value);
});

var outputTruthTable = document.getElementById("truthtable");
var outputKarnaughTable = document.getElementById("karnaughtable");
var outputMinterms = document.getElementById("minterms");

var inputElement = document.getElementById("expressionInput"),
    permaLink = document.getElementById("permaLink");

if(location.hash !== "") {
	var expression = decodeURIComponent(location.hash.slice(1));
	inputElement.value = expression;
	parseAndGenerateTable(expression);
}

inputElement.addEventListener("keyup", function(){
	outputTruthTable.innerHTML = "";
	outputKarnaughTable.innerHTML = "";
	parseAndGenerateTable(inputElement.value);
	permaLink.href = "#" + encodeURIComponent(inputElement.value);
});

history.saveStateOf(inputElement, document.querySelector("#history ul"));
});
