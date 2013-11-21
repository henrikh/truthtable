define("LaTeX", ["util"], function(util){
	'use strict';

	var exports = {
		generate: function (truthTable) {
			var tt = truthTable.map(function(list){
				return list.join(" & ");
			});
			var output = "\\begin{tabular}"
			           + "{"
			           + util.times(truthTable[0].length, "c").join(" ")
			           + "}\n"
			           + tt.join(" \\\\\n")
			           + "\n\\end{tabular}";
			return output;
		}
	};

	return exports;
});
