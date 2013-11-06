require(["grammar", "util", "truthfunction", "LaTeX", "karnaugh", "view/truthtable"],
 function(grammar,   util,   truthfunction,   LaTeX,   karnaugh,   truthtableview){
	window.parser = grammar;
	window.util = util;
	window.truthfunction = truthfunction;
	window.LaTeX = LaTeX;
	window.karnaugh = karnaugh;
	window.view = {};
	window.view.truthtable = truthtableview;
});
