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
			kills = sol
				.map((s) => {
					if (s.war == 3) return 0;
					return s.score.kills;
				})
				.reduce((a, b) => a + b);
			// console.log(kills);
		} else {
			kills = sol[0].score.kills;
		}

		scores.push({
			name: k,
			kills,
		});
	}

	console.log(scores.sort((a, b) => b.kills - a.kills).slice(0, 20));
});

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

// console.log(isNaN(0 / 1) ? 0 : 1);

// (function () {
// 	var soldiers = [];
// 	let count = 0;
// 	for (var item of Array.from(document.getElementById('clanErr').childNodes)) {
// 		const arr = Array.from(item.childNodes);
// 		if (item.className == 'setHed') {
// 			count++;
// 			if (count == 3) break;
// 		}
// 		if (item.className == 'setBodH' && count == 1) {
// 			for (let i = 0; i < arr.length; i++) {
// 				const cNodes = Array.from(arr[i].childNodes);
// 				if (cNodes[0].className == 'material-icons') cNodes.shift();
// 				const name = cNodes[0].innerHTML;
// 				cNodes[1].childNodes[1].onclick();
// 				const kills = parseInt(
// 					document.getElementById('popupContent').children[3].children[0].innerHTML.replace(',', '')
// 				);
// 				const time = document
// 					.getElementById('popupContent')
// 					.children[5].children[0].innerHTML.split(' ');
// 				time.pop();
// 				const minutesSpent =
// 					time.length == 1
// 						? 180 - parseInt(time[0])
// 						: 180 - (parseInt(time[0]) * 60 + parseInt(time[1]));
// 				soldiers.push({ name, kills, minutesSpent });
// 			}
// 		} else if (item.className == 'setBodH' && count == 2) {
// 			for (let i = 0; i < arr.length; i++) {
// 				const cNodes = Array.from(arr[i].childNodes);
// 				if (cNodes[0].className == 'material-icons') cNodes.shift();
// 				const name = cNodes[0].innerHTML;
// 				const kills = parseInt(cNodes[1].innerHTML.split(' ')[0]);
// 				soldiers.push({ name, kills, minutesSpent: 180 });
// 			}
// 		}
// 	}
// 	return JSON.stringify({ soldiers });
// })();
