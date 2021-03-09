// const arr = ['ign:jack_borg', 'lvl:100', 'kdr:3.8', 'kpg:15.7'];
// for (let i = 0; i < arr.length; i++) arr[i] = arr[i].split(':');
// console.log(arr);

// const { resolve } = require('bluebird');

// const obj = Object.fromEntries(arr);

// console.log(obj);
// const str =
// 	'over 2.6 because i was pretty bad when i started playing. i was on 60 fps an started changing settings on like lvl 30 xD';
// str.split(' ').forEach((e) => {
// 	if (!isNaN(e)) console.log(parseFloat(e));
// });

const scrape = require('./scrape');
const dao = require('./dao');
scrape().then((res) => dao(res));
