scripts/parser.js :
	node_modules/pegjs/bin/pegjs parser/parser.pegjs
	node r.js -convert parser/ scripts/

server:
	python -m http.server 8080
