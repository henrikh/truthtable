install : build/main.js build/require.js scripts/parser.js

scripts/parser.js :
	node_modules/pegjs/bin/pegjs parser/parser.pegjs
	node r.js -convert parser/ scripts/

build/main.js : scripts/*.js
	node r.js -o build.js

build/require.js :
	uglifyjs bower_components/requirejs/require.js -o build/require.js

server:
	python -m http.server 8080
