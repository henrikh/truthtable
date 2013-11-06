require(["grammar", "binaryUtil", "truthfunction", "LaTeX", "karnaugh", "view/truthtable"],
 function(grammar,   binaryUtil,   truthfunction,   LaTeX,   karnaugh,   truthtableview){
	window.parser = grammar;
	window.binaryUtil = binaryUtil;
	window.truthfunction = truthfunction;
	window.LaTeX = LaTeX;
	window.karnaugh = karnaugh;
	window.view = {};
	window.view.truthtable = truthtableview;
});
