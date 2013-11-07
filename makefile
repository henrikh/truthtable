install :
	make build/main.js
	make build/require.js
	make scripts/parser.js

scripts/parser.js :
	node_modules/pegjs/bin/pegjs parser/parser.pegjs
	node r.js -convert parser/ scripts/

build/main.js :
	node r.js -o build.js

build/require.js :
	cp scripts/require.js build/

server:
	python -m http.server 8080
