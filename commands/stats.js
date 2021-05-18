require('dotenv').config();
const { getSoldier, getWar } = require('../utils/dao');
const { numberFormat, msToDHM, embed } = require('../utils/utils');

module.exports = {
	name: process.env.PREFIX + '.stats',
	description: 'Clan War Stats',
	execute(msg, args, bot) {
		if (
			!msg.member.roles.cache.has(process.env.CAPTAINROLE) &&
			msg.author.id != process.env.LEADERID &&
			msg.author.id != process.env.DEVID
		)
			return;

		// if (args[0] == '3MTIwOD') {
		// 	getWarReport(parseInt(process.env.CURRENTWAR)).then((soldiers) => {
		// 		if (!soldiers)
		// 			return bot.channels.cache
		// 				.get(process.env.CWSTATSCHANNEL)
		// 				.send(embed({ title: 'War: ' + args[0], stamp: false }));

		// 		soldiers.sort((a, b) => b.last.kills - a.last.kills);
		// 		bot.channels.cache
		// 			.get(process.env.CWSTATSCHANNEL)
		// 			.send(clanEmbed(soldiers, process.env.CURRENTWAR));
		// 	});
		// 	return;
		// }

		if (args.length == 0) args[0] = process.env.CURRENTWAR;

		if (isNaN(args[0])) {
			if (!args[1]) args[1] = process.env.CURRENTWAR;
			getSoldier(args[0]).then((soldier) => {
				if (!soldier)
					return msg.channel.send(
						embed({ title: args[0] + ' not found in war ' + args[1], stamp: false })
					);

				msg.channel.send(soldierEmbed(soldier, args[1]));
			});
		} else {
			getWar(parseInt(args[0])).then((soldiers) => {
				if (soldiers.length == 0)
					return msg.channel.send(embed({ title: 'War: ' + args[0], stamp: false }));

				msg.channel.send(clanEmbed(soldiers, args[0]));
			});
		}
	},
};

function soldierEmbed(soldier, warN) {
	const contractLength = (warN <= 3 ? 240 : 180) * 60000;

	const timeLeft = msToDHM(contractLength - soldier.wars[warN].timePlayed);
	let kpm = soldier.wars[warN].kills / (soldier.wars[warN].timePlayed / 60000);
	kpm = isNaN(kpm) ? 0 : kpm;
	const estKills = kpm * (contractLength / 60000);

	const fields = [
		{ name: 'Kills', value: numberFormat(soldier.wars[warN].kills), inline: true },
		{ name: 'Time left', value: timeLeft, inline: true },
		{ name: 'KPM', value: numberFormat(kpm), inline: true },
		{ name: 'Est. total kills', value: numberFormat(estKills), inline: true },
	];

	return embed({ title: soldier.name.split('_').join('\\_') + ' in war ' + warN, fields });
}

function clanEmbed(soldiers, warN) {
	const contractLength = (warN <= 3 ? 240 : 180) * 60000;
	const names = [];
	const kills = [];
	const kpm = [];
	const time = [];
	const totalCount = soldiers.length;
	let activeCount = 0;
	let totalKills = 0;

	soldiers.sort((a, b) => b.kills - a.kills);

	soldiers.forEach((s) => {
		names.push(s.name.split('_').join('\\_'));
		kills.push(numberFormat(s.kills));
		totalKills += s.kills;
		const tmp = s.kills / (s.timePlayed / 60000);
		//handle 0/0 == NaN
		kpm.push(isNaN(tmp) ? 0 : tmp);
		time.push(msToDHM(contractLength - s.timePlayed));
		if (s.timePlayed < contractLength) activeCount++;
	});
	const avgKPM = kpm.reduce((p, c) => p + c) / kpm.length;
	const avgEstKills = avgKPM * (contractLength / 60000);

	const fields = [
		{ name: 'Name', value: names.join('\n'), inline: true },
		{ name: 'Kills', value: kills.join('\n'), inline: true },
		{ name: 'Time left', value: time.join('\n'), inline: true },
		{ name: 'Kills', value: numberFormat(totalKills), inline: true },
		{ name: 'Avg KPM', value: numberFormat(avgKPM), inline: true },
		{ name: 'Avg est. kills', value: numberFormat(avgEstKills), inline: true },
		{ name: 'Total Soldiers', value: totalCount, inline: true },
		{ name: 'Active Soldiers', value: activeCount, inline: true },
	];

	return embed({ title: 'Report: war ' + warN, fields });
}
