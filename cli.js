#!/usr/bin/env node
'use strict';
const brightness = require('brightness');
const meow = require('meow');
const progressControl = require('progress-control');
const chalk = require('chalk');
const cliCursor = require('cli-cursor');
const firstRun = require('first-run');
const indentString = require('indent-string');

const cli = meow({
	help: [
		'Example',
		'  $ brightness',
		'  $ brightness 0.8'
	]
});

try {
	if (cli.input.length === 0) {
		brightness.get().then(val => {
			if (!process.stdin.isTTY) {
				console.log(val);
				return;
			}

			brightness.set(val).then(() => {
				val = Math.round((val) * 10) / 10;

				let text = '[:bar] :val';

				const bar = progressControl(text, {total: 10}, {
					up: () => {
						val = Math.min(Math.round((val + 0.1) * 10) / 10, 1);
						updateBar(val);
					},
					down: () => {
						val = Math.max(Math.round((val - 0.1) * 10) / 10, 0);
						updateBar(val);
					}
				});

				function updateBar(val) {
					brightness.set(val).then();

					const str = `${(val * 100)}%`;
					const maxLength = 4;

					bar.update(val, {val: indentString(str, ' ', maxLength - str.length)});
				}

				cliCursor.hide();

				if (firstRun()) {
					text += `   ${chalk.dim('Use up/down arrows')}`;
				}

				updateBar(val);
			});
		});
	} else {
		brightness.set(parseFloat(cli.input[0], 10));
	}
} catch (err) {
	console.error(err.message);
	process.exit(1);
}
