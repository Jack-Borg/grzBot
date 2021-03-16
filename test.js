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

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//top soldiers 5 war program
const { getAllWarReport } = require('./dao');

getAllWarReport().then((soldiers) => {
	let tmp = {};

	soldiers.forEach((s) => {
		if (tmp[s.name]) return tmp[s.name].push({ war: s.war, score: s.last });
		tmp[s.name] = [{ war: s.war, score: s.last }];
	});
	// console.log(tmp);

	scores = [];
	for (const k in tmp) {
		const sol = tmp[k];

		let kills;
		if (sol.length > 1) {
			kills = sol.reduce((a, b) => a.score.kills + b.score.kills);
		} else {
			kills = sol[0].score.kills;
		}

		scores.push({
			name: k,
			kills,
		});
	}

	console.log(scores.sort((a, b) => b.kills - a.kills));
});
