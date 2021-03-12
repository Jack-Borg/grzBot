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

// newGetSoldierReport('jack_borg').then((s) => console.log(s));
// dao.delete();
// dao.getWarReport(2).then((r) => console.log(r));
// dao.getWarReport(2).then((r) =>
// 	console.log(r.filter((e) => e.scores.length == 1).map((e) => e.name))
// );

const { getAllWarReport } = require('./dao');
// const { numberFormat, minToHM, embed } = require('../utils');

getAllWarReport().then((soldiers) => {
	let tmp = {};

	soldiers.forEach((s) => {
		if (tmp[s.name]) return tmp[s.name].push({ war: s.war, score: s.last });
		tmp[s.name] = [{ war: s.war, score: s.last }];
	});

	scores = [];
	for (const k in tmp) {
		const sol = tmp[k];

		let kills;
		let kpm;
		if (sol.length > 1) {
			kills = sol.reduce((a, b) => a.score.kills + b.score.kills) / sol.length;
			kpm =
				kills /
				(sol.reduce((a, b) => a.score.minutesSpent + b.score.minutesSpent) / sol.length);
		} else {
			kills = sol[0].score.kills;
			kpm = kills / sol[0].score.minutesSpent;
		}

		scores.push({
			name: k,
			kills,
			kpm,
		});
	}

	console.log(scores.sort((a, b) => b.kpm - a.kpm));
});
