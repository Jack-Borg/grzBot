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

const table = require('table');

const data = [
	['0A', '0B', '0C'],
	['1A', '1B', '1C'],
	['2A', '2B', '2C'],
	['3A', '3B', '3C'],
	['4A', '4B', '4C'],
];

const config = {
	drawHorizontalLine: (lineIndex, rowCount) => {
		return lineIndex === 0 || lineIndex === 1 || lineIndex === rowCount;
	},
};

console.log(table.table(data, config));
