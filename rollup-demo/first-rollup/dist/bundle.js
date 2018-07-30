'use strict';

// src/foo.js
var foo = 'hello world!';

var index = 42;

// main.js
function main () {
  console.log(foo);
  console.log('the answer is ' + index);
}

module.exports = main;
