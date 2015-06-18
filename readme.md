<h1 align="center">
	<br>
	<img width="360" src="https://rawgit.com/kevva/brightness/master/media/logo.svg" alt="brightness">
	<br>
	<br>
	<br>
</h1>

> Change screen brightness

[![Build Status](https://travis-ci.org/kevva/brightness.svg?branch=master)](https://travis-ci.org/kevva/brightness)


## Install

```
$ npm install --save brightness
```


## Usage

```js
var brightness = require('brightness');

brightness.get(function (err, level) {
	console.log(level);
	// 0.5
});

brightness.set(0.8, function (err) {
	console.log('Changed brightness to 80%');
});
```


## API

### .get(callback)

Get brightness level. *Doesn't work on Windows systems.*

#### callback(err, level)

Type: `function`

##### level

Type: `number`

Current brightness level.

### .set(level, callback)

Set brightness level.

#### level

*Required*  
Type: `number`

A number between `0` and `1`.

#### callback(err)

Type: `function`

Callback that returns nothing but a possible exception.


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
