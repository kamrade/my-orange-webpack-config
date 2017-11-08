'use strict';

let welcome = require('./welcome');
welcome('home');

if(env === 'dev') {
  console.log('test');
}

let s = l => l*20;

let an = [20, 40]

let ben = [...an, 12]

exports.welcome = welcome;
