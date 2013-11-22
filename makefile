install : build/main.js build/require.js scripts/parser.js

scripts/parser.js : parser/parser.pegjs
	node_modules/pegjs/bin/pegjs parser/parser.pegjs
	node r.js -convert parser/ scripts/

build/main.js : scripts/*.js
	node r.js -o build.js

build/require.js : bower_components/
	uglifyjs bower_components/requirejs/require.js -o build/require.js

bower_components/ :
	bower install

server:
	python -m http.server 8080
