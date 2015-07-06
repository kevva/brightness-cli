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
		var value = null;

		brightness.get(function (err, value) {
			if (err) {
				console.error(err.message);
				process.exit(1);
			}

			// check permissions
			brightness.set(value, function (err) {
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

					bar.update(val, {
						value: val
					});
				};

				var bar = progressControl('Use up/down arrows [:bar] :value ', { total: 10 }, {
				  up: function () {
						value = Math.min(Math.round((value + 0.1) * 10) / 10, 1);
						updateBar(value);
				  },
				  down: function () {
						value = Math.max(Math.round((value - 0.1) * 10) / 10, 0);
						updateBar(value);
				  }
				});

				updateBar(value);
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
