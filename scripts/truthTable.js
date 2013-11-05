define("truthTable", function(){
	exports = {};
	exports.generate = function(symList, truthFunction) {
		inputCount = symList.length;

		truthTableList = [symList.concat("f")];

		for (var i = 0; i < Math.pow(2, inputCount); i++) {
			binary = binaryUtil.toPaddedBinaryList(i, inputCount);
			f = tfConvert(truthFunction.apply(this, binary));
			binary.push(f);
			truthTableList.push(binary);
		};

		return truthTableList
	}

	return exports
});
