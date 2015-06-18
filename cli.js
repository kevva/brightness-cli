#!/usr/bin/env node
'use strict';
var meow = require('meow');
var brightness = require('./');

var cli = meow({
	help: [
		'Example',
		'  $ brightness',
		'  $ brightness 0.8'
	]
});

if (!cli.input.length) {
	brightness.get(function (err, data) {
		if (err) {
			console.error(err.message);
			process.exit(1);
		}

		console.log(data);
	});

	return;
}

brightness.set(parseFloat(cli.input[0], 10), function (err) {
	if (err) {
		console.error(err.message);
		process.exit(1);
	}
});
