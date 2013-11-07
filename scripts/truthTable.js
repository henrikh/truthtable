define("truthTable", ["util"], function(util){
	exports = {};
	exports.generate = function(symList, truthFunction) {
		inputCount = symList.length;

		truthTableList = [symList.concat("f")];

		for (var i = 0; i < Math.pow(2, inputCount); i++) {
			binary = util.toPaddedBinaryList(i, inputCount);
			binary.push(truthFunction.apply(this, binary));
			truthTableList.push(binary);
		}

		return truthTableList;
	};

	return exports;
});
