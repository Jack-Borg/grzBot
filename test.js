//////////////////////////////////////////////////////////////////////////////////////////////////////////
//top soldiers 5 war program
// const { getAllWarReport } = require('./dao');

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
// 			kills = sol.reduce((a, b) => a.score.kills + b.score.kills);
// 		} else {
// 			kills = sol[0].score.kills;
// 		}

// 		scores.push({
// 			name: k,
// 			kills,
// 		});
// 	}

// 	console.log(scores.sort((a, b) => b.kills - a.kills));
// });

//////////////////////////////////////////////////////////////////////////////////////////////////////////

// function xp(lvl) {
// 	if (lvl == 2) return 4444;

// 	const res = 1111 + 2222 * (lvl - 1);

// 	return res + parseInt(res / 10000);
// }

// function xpTo(lvl) {
// 	let total = 0;
// 	for (let i = 1; i < lvl; i++) {
// 		total += xp(i);
// 	}
// 	return total;
// }

// function xpToTarget(currLvl, tarLvl) {
// 	return xpTo(tarLvl) - xpTo(currLvl);
// }

// function xpTo2(lvl) {
// 	return 1111 + 2222 * (lvl - 1) //* ((lvl * (lvl + 1)) / 2);
// }

// console.log(xpTo(5));
// console.log(xpTo2(5));

console.log(isNaN(0 / 1) ? 0 : 1);
