define("qm", [], function(){
'use strict';

var toPaddedBinary = function (decimal, width) {
var binary = decimal.toString(2);
while(binary.length < width){
binary = "0" + binary;
}
return binary;
};

function is_super_set (master, match) {
	if(match.length <= master.length) return false;
	return contains_all(master, match);
}

function contains_all (master, match) {
	for (var i = master.length - 1; i >= 0; i--) {
		if(match.indexOf(master[i]) === -1) return false;
	};

	return true;
}

function covered_implicant (implicants, implicant) {
	for (var i = 0; i < implicants.length; i++) {
		if(implicants[i] === implicant) return true;
	};
	return false;
}

function match_implicant(implicant, minterms, vars) {
	var return_value = [];
	for(var i = 0; i < minterms.length; i++) {
		if(minterms[i].number <= implicant.number) continue;
		if((minterms[i].number & ~(implicant.dc)) === implicant.number
			&& !covered_implicant(implicant.implicants, minterms[i].number)){
			var implicant_copy = {};
			implicant_copy.turn = turns;
			implicant_copy.number = implicant.number;
			implicant_copy.dc = implicant.dc;
			implicant_copy.implicants = implicant.implicants.slice(0);
			implicant_copy.implicants.push(minterms[i].number);
			implicant_copy.matchedBy = implicant.matchedBy.slice(0);
			minterms[i].matchedBy.push(implicant.number);
			return_value.push(implicant_copy);
			continue;
		}
		if(minterms[i].dc ^ implicant.dc) continue;

		var t = implicant.number ^ minterms[i].number;
		for(var n = 0; n < vars; n++) {
			if(t == Math.pow(2, n)) {
				var implicant_copy = {};
				implicant_copy.turn = turns;
				implicant_copy.number = implicant.number;
				implicant_copy.dc = implicant.dc | t;
				implicant_copy.implicants = implicant.implicants.slice(0);
				implicant_copy.implicants.push(minterms[i].number);
				implicant_copy.matchedBy = implicant.matchedBy.slice(0);
				minterms[i].matchedBy.push(implicant.number);
				return_value.push(implicant_copy);
			}
		}
	}

	return return_value;
}

exports.minimize = function (original_minterms, original_vars) {
var dc = [];

var minterms = original_minterms.concat(dc).sort(function(a,b){return a - b});
var vars = original_vars.length;

for(var i = 0; i < minterms.length; i++) {
	minterms[i] = {
		number: minterms[i],
		dc: 0,
		implicants: [minterms[i]],
		matchedBy: []
	};
}

var implicants = minterms;
var turns = 0;

while(true) {
	var new_implicants = [];
	var reduction = false;
	turns++;

	for(var i = 0; i < implicants.length; i++) {
		var heap = [];
		for (var j = 0; j < implicants.length; j++) {
			heap.push(implicants[j].number)
		};

		var reduced_implicants = match_implicant(implicants[i], implicants, vars);
		if(reduced_implicants.length != 0) {
			for (var j = reduced_implicants.length - 1; j >= 0; j--) {
				new_implicants.push(reduced_implicants[j])
				reduction = true;
			};
		} else {
			new_implicants.push(implicants[i])
		}
	}

	if(reduction) {
		implicants = [];
		outer_loop:
		for (var i = 0; i < new_implicants.length; i++) {
			for (var j = i-1 ; j >= 0; j--) {
				if(new_implicants[j].number === new_implicants[i].number &&
					new_implicants[j].dc === new_implicants[i].dc) continue outer_loop;
			};
			implicants.push(new_implicants[i]);
		};
		continue;
	}

	break;
}

var prime_implicants = [];

prime_implicant_reduction_loop:
for (var i = 0; i < implicants.length; i++) {
	for (var j = i - 1; j >= 0; j--) {
			if(is_super_set(implicants[i].implicants, implicants[j].implicants)) {
				continue prime_implicant_reduction_loop;
			}
	};
	prime_implicants.push(implicants[i]);
};

var essential_prime_implicants = [];

var working_minterms = original_minterms.slice(0);
i = 0;
while(true) {
	var matches = [];
	for (var j = 0; j < prime_implicants.length; j++) {
		for (var k = 0; k < prime_implicants[j].implicants.length; k++) {
			if(prime_implicants[j].implicants[k] === working_minterms[i]) matches.push(prime_implicants[j]);
		};
	};
	if(matches.length === 1) {
		essential_prime_implicants.push(matches[0]);
		working_minterms = working_minterms.filter(function (element) {
			return matches[0].implicants.indexOf(element) === -1;
		})
		i = 0;
	} else {
		i++;
	}
	if(i >= working_minterms.length) break;
};

if(working_minterms.length !== 0) {
	for (var i = 0; i < working_minterms.length; i++) {
		var essential_prime_implicant_candidates = prime_implicants.filter(function (element) {
			return element.implicants.indexOf(working_minterms[i]) !== -1;
		});

		var candidate = essential_prime_implicant_candidates[0];
		for (var j = 1; j < essential_prime_implicant_candidates.length; j++) {
			if(essential_prime_implicant_candidates[j].implicants.length < candidate.implicants.length)
				candidate = essential_prime_implicant_candidates[j];
		};
		essential_prime_implicants.push(candidate);
	};
}

var exp = [];

for(var i = 0; i < essential_prime_implicants.length; i++) {
	var implicant = toPaddedBinary(essential_prime_implicants[i].number, vars);
	var dc = toPaddedBinary(essential_prime_implicants[i].dc, vars);
	var subexp = "";
	for (var j = 0; j < vars; j++) {
		if(dc[j] === "1") continue;
		if(implicant[j] === "0") subexp += "!";
		subexp += original_vars[j];
	};
	exp.push(subexp);
}

return exp.join(" + ");
}

return exports;

});