define("karnaugh", ["util"], function(util){
'use strict';

var exports = {};

exports.generateMap = function(symList, truthFunction) {
	var truthTable, _tmp, symListA, symListB, symAGray, symBGray;
	if(symList.length > 4 || symList.length <= 1) {
		return false;
	}

	_tmp = util.sliceSymList(symList);
	symListA = _tmp[0];
	symListB = _tmp[1];

	symAGray = util.grayCode(symListA.length);
	symBGray = util.grayCode(symListB.length);

	truthTable = [];
	truthTable.push(symAGray.map(
		function(x){
			return util.toPaddedBinary(x, symListA.length);
		}));

	for (var i = 0; i < symBGray.length; i++) {
		var rowList = [];
		rowList.push(util.toPaddedBinary(symBGray[i], symListB.length));
		for (var j = 0; j < symAGray.length; j++) {
			var pbA, pbB, binary, f;
			pbA = util.toPaddedBinaryList(
				symAGray[j],
				symListA.length);

			pbB = util.toPaddedBinaryList(
				symBGray[i],
				symListB.length);
	
			if(flip){
				_tmp = pbA;
				pbA = pbB;
				pbB = _tmp;
			}

			binary = pbA.concat(pbB);

			f = truthFunction.apply(this, binary);
			rowList.push(f);
		}

		truthTable.push(rowList);
	}

	return truthTable;
};

return exports;
});
