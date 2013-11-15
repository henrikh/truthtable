define("history", ["storage"], function(storage){

var exports = {};
var _tmp = storage.get("history");
if(_tmp === undefined || _tmp === null){
	storage.set("history", {
		history: []
	});
}

var outputElement;

function render(){
	var history = storage.get("history").history.reverse();
	var output = "";
	for(var i=0; i < history.length; i++){
		output += "<li>" + history[i] + "</li>";
	}
	outputElement.innerHTML = output;
}

function save(value){
	var store = storage.get("history");
	if(store.history[store.history.length-1] === value){
		return;
	}
	store.history.push(value);
	if(store.history.length > 5){
		store.history = store.history.slice(1);
	}
	storage.set("history", store);
	render();
}

function eventHandler(e){
	if(e.keyCode!==13){
		return;
	}
	save(e.target.value);
}

exports.saveStateOf = function(input, output){
	outputElement = output;
	input.addEventListener("keyup", eventHandler);
	render();
};

return exports;

});
