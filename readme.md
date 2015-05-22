# brightness [![Build Status](https://travis-ci.org/kevva/brightness.svg?branch=master)](https://travis-ci.org/kevva/brightness)

> Change screen brightness (OS X and Linux only)


## Install

```
$ npm install --save brightness
```


## Usage

```js
var brightness = require('brightness');

brightness.get(function (err, level) {
	console.log(level);
	// '0.5'
});

brightness.set(0.8, function (err) {
	console.log('Changed brightness to 80%');
});
```


## CLI

```
$ npm install --global brightness
```

```
$ brightness --help

  Example
    $ brightness
    $ brightness 0.8
```


## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
