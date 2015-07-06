'use strict';
var path = require('path');
var spawn = require('child_process').spawn;
var concatStream = require('concat-stream');
var test = require('ava');

test('show help screen', function (t) {
	t.plan(1);

	var concat = concatStream(end);
	var cp = spawn(path.join(__dirname, 'cli.js'), ['--help']);

	function end(str) {
		t.assert(/Change screen brightness/.test(str), str);
	}

	cp.stdout.setEncoding('utf8');
	cp.stdout.pipe(concat);
});
