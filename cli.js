#!/usr/bin/env node
'use strict';
var brightness = require('brightness');
var meow = require('meow');
var progressControl = require('progress-control');
var chalk = require('chalk');
var cliCursor = require('cli-cursor');
var firstRun = require('first-run');

var cli = meow({
	help: [
		'Example',
		'  $ brightness',
		'  $ brightness 0.8'
	]
});

try {
	if (!cli.input.length) {
		brightness.get(function (err, val) {
			if (err) {
				console.error(err.message);
				process.exit(1);
			}

			if (!process.stdin.isTTY) {
				console.log(val);
				return;
			}

			brightness.set(val, function (err) {
				if (err) {
					console.error(err.message);
					process.exit(1);
				}

				val = Math.round((val) * 10) / 10;

				function updateBar(val) {
					brightness.set(val, function (err) {
						if (err) {
							console.error(err.message);
							process.exit(1);
						}
					});

					bar.update(val, {val: val * 100 + '%'});
				}

				cliCursor.hide();

				var text = '[:bar] :val';

				if (firstRun()) {
					text += '   ' + chalk.dim('Use up/down arrows');
				}

				var bar = progressControl(text, {total: 10}, {
					up: function () {
						val = Math.min(Math.round((val + 0.1) * 10) / 10, 1);
						updateBar(val);
					},
					down: function () {
						val = Math.max(Math.round((val - 0.1) * 10) / 10, 0);
						updateBar(val);
					}
				});

				updateBar(val);
			});
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
