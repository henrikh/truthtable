require(["grammar", "util", "truthfunction", "LaTeX", "karnaugh", "view/truthtable", "view/karnaugh"],
 function(grammar,   util,   truthfunction,   LaTeX,   karnaugh,   truthtableview,    karnaughview){
	window.parser = grammar;
	window.util = util;
	window.truthfunction = truthfunction;
	window.LaTeX = LaTeX;
	window.karnaugh = karnaugh;
	window.view = {};
	window.view.truthtable = truthtableview;
	window.view.karnaugh = karnaughview;
});
