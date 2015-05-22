'use strict';
var test = require('ava');
var brightness = require('./');

if (!process.env.CI) {
	test('should get brightness', function (t) {
		t.plan(2);

		brightness.get(function (err, brightness) {
			t.assert(!err, err);
			t.assert(brightness);
		});
	});

	test('should set brightness', function (t) {
		t.plan(3);

		brightness.set(0.5, function (err) {
			t.assert(!err, err);

			brightness.get(function (err, brightness) {
				t.assert(!err, err);
				t.assert(parseInt(brightness) === 0.5);
			});
		});
	});
}
