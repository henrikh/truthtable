define("truthTable", function(){
	exports = {};
	exports.generate = function(symList, truthFunction) {
		inputCount = symList.length;

		truthTableList = [symList.concat("f")];

		for (var i = 0; i < Math.pow(2, inputCount); i++) {
			binary = binaryUtil.toPaddedBinaryList(i, inputCount);
			binary.push(truthFunction.apply(this, binary));
			truthTableList.push(binary);
		}

		return truthTableList;
	};

	return exports;
});
