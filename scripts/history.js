define("history", ["storage"], function(storage){

var exports = {};

if(storage.getItem("history") === undefined){
	storage.setItem("history", {
		history: []
	});
}

function eventHandler(e){
	if(e.keyCode!==13){
		return;
	}
	var value = e.target.value;
	storage.getItem
}

exports.saveStateOf = function(input){
	input.addEventListener("keyup", eventHandler);

};

return exports;

});
