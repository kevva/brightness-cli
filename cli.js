#!/usr/bin/env node
'use strict';
var brightness = require('brightness');
var meow = require('meow');
var progressControl = require('progress-control');

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

			brightness.set(val, function (err) {
				if (err) {
					console.error(err.message);
					process.exit(1);
				}

				function updateBar(val) {
					brightness.set(val, function (err) {
						if (err) {
							console.error(err.message);
							process.exit(1);
						}
					});

					bar.update(val, {val: val});
				}

				var bar = progressControl('Use up/down arrows [:bar] :val ', {total: 10}, {
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
