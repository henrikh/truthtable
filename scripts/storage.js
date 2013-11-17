define("storage", function(){
'use strict';

var exports = {};

exports.set = function(key, value){
	localStorage.setItem(key, JSON.stringify(value));
};

exports.get = function(key){
	return JSON.parse(localStorage.getItem(key));
};

return exports;

});
