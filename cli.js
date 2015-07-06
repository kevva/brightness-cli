#!/usr/bin/env node
'use strict';
var brightness = require('brightness');
var meow = require('meow');

var cli = meow({
	help: [
		'Example',
		'  $ brightness',
		'  $ brightness 0.8'
	]
});

try {
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
} catch (err) {
	console.error(err.message);
	process.exit(1);
}