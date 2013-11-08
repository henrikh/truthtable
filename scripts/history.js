define("history", ["storage"], function(storage){

var exports = {};
var _tmp = storage.get("history");
if(_tmp === undefined || _tmp === null){
	storage.set("history", {
		history: []
	});
}

function save(value){
	var store = storage.get("history");
	store.history.push(value);
	if(store.history.length > 5){
		store.history = store.history.slice(1);
	}
	storage.set("history", store);
}

function eventHandler(e){
	if(e.keyCode!==13){
		return;
	}
	save(e.target.value);
}

exports.saveStateOf = function(input){
	input.addEventListener("keyup", eventHandler);

};

return exports;

});
