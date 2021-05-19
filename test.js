//////////////////////////////////////////////////////////////////////////////////////////////////////////
//top soldiers 5 war program
// const { getAllWarReport } = require('./utils/dao');

// getAllWarReport().then((soldiers) => {
// 	let tmp = {};

// 	soldiers.forEach((s) => {
// 		if (tmp[s.name]) return tmp[s.name].push({ war: s.war, score: s.last });
// 		tmp[s.name] = [{ war: s.war, score: s.last }];
// 	});
// 	// console.log(tmp);

// 	scores = [];
// 	for (const k in tmp) {
// 		const sol = tmp[k];
// 		let kills;
// 		if (sol.length > 1) {
// 			kills = sol
// 				.map((s) => {
// 					if (s.war == 3) return 0;
// 					return s.score.kills;
// 				})
// 				.reduce((a, b) => a + b);
// 			// console.log(kills);
// 		} else {
// 			kills = sol[0].score.kills;
// 		}

// 		scores.push({
// 			name: k,
// 			kills,
// 		});
// 	}

// 	console.log(scores.sort((a, b) => b.kills - a.kills).slice(0, 30));
// });

//////////////////////////////////////////////////////////////////////////////////////////////////////////

// const fs = require('fs');
// const dao = require('./utils/dao');

// dao.linkAccount(134785189128830977, 'jack_borg');
// dao.getSoldierByDiscord(134785189128830977).then((s) => console.log(s));

// dao.delete();

// const res = {};
// dao.getAllWarReport().then((r) => {
// 	r.map((s) => {
// 		if (res[s.name]) {
// 			res[s.name].wars[s.war] = {
// 				kills: s.last.kills,
// 				timePlayed: s.last.minutesSpent * 60000,
// 				scores: s.scores.map((score) => {
// 					return { kills: score.kills, timePlayed: score.minutesSpent * 60000 };
// 				}),
// 			};
// 		} else {
// 			res[s.name] = {
// 				name: s.name,
// 				wars: {
// 					[s.war]: {
// 						kills: s.last.kills,
// 						timePlayed: s.last.minutesSpent * 60000,
// 						scores: s.scores.map((score) => {
// 							return { kills: score.kills, timePlayed: score.minutesSpent * 60000 };
// 						}),
// 					},
// 				},
// 			};
// 		}
// 	});
// 	fs.writeFile('backup.json', JSON.stringify(Object.values(res)), function (err) {
// 		if (err) throw err;
// 		console.log('Saved!');
// 	});
// dao.postAll(Object.values(res));
// });

// fs.readFile('./tmp.json', 'utf8', (err, data) => {
// 	if (err) throw err;
// 	dao.postAll(JSON.parse(data));
// });
