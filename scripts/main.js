require(["grammar", "truthfunction", "LaTeX", "karnaugh", "view/truthtable", "view/karnaugh", "storage", "history"],
 function(parser,    truthfunction,   LaTeX,   karnaugh,   truthtableview,    karnaughview,    storage,   history){
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

var flipEl = document.getElementById("flip");
window.flip = flipEl.checked = storage.get("flip") ? true : false;

flipEl.addEventListener("change", function(){
	flip = flipEl.checked;
	storage.set("flip", flip);
	parseAndGenerateTable(inputElement.value);
});

history.saveStateOf(inputElement);
});
