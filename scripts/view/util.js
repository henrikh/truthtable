define('view/util', function(){
'use strict';

var exports = {};

exports.formatSymbol = function(symbol) {
	return symbol.replace(/_?(\d+)/, '<sub>$1</sub>')
}

return exports;

});
