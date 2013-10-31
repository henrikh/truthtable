parser: grammar.pegjs
	node_modules/pegjs/bin/pegjs grammar.pegjs

server:
	python -m http.server 8080
