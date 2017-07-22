import execa from 'execa';
import test from 'ava';

test('doesn\'t throw', async t => {
	await t.notThrows(execa.stdout('./cli.js'));
});

test('should set brightness', async t => {
	await t.notThrows(execa.stdout('./cli.js', [0.8]));
});
