define("LaTeX", function(){
	var genLaTeXTableRow = function() {
		tableRowHTML = "";
		tableRowHTML += Array.prototype.slice.call(arguments).join(" & ")
		return tableRowHTML + " \\\\\n"
	}

	exports = {
		generate: function (truthTable) {
			output = "\\begin{tabular}\n"
			for (var row = 0; row < truthTable.length; row++) {
				output += genLaTeXTableRow.apply(this,truthTable[row]);
			};
			output += "\\end{tabular}";
			return output
		}
	};

	return exports
});
