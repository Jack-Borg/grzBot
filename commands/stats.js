require('dotenv').config();
const { getWarReport: getWarReport, getSoldierReport } = require('../dao');
const { numberFormat, minToHM, embed } = require('../utils');

module.exports = {
	name: 'grz.stats',
	description: 'Clan War Stats',
	execute(msg, args, bot) {
		if (
			args[0] != '3MTIwOD' &&
			msg.channel.id != process.env.CWMANAGECHANNEL &&
			msg.author.id != process.env.LEADERID &&
			msg.author.id != process.env.DEVID
		)
			return;

		if (args[0] == '3MTIwOD') {
			getWarReport(parseInt(process.env.CURRENTWAR)).then((soldiers) => {
				if (!soldiers)
					return bot.channels.cache
						.get(process.env.CWSTATSCHANNEL)
						.send(embed({ title: 'War: ' + args[0], stamp: false }));

				soldiers.sort((a, b) => b.last.kills - a.last.kills);
				bot.channels.cache
					.get(process.env.CWSTATSCHANNEL)
					.send(clanEmbed(soldiers, process.env.CURRENTWAR));
			});
			return;
		}

		if (args.length == 0) args[0] = process.env.CURRENTWAR;

		if (isNaN(args[0])) {
			if (!args[1]) args[1] = process.env.CURRENTWAR;
			getSoldierReport(args[0], args[1]).then((soldier) => {
				if (!soldier)
					return msg.channel.send(
						embed({ title: args[0] + ' not found in war ' + args[1], stamp: false })
					);

				msg.channel.send(soldierEmbed(soldier));
			});
		} else {
			getWarReport(parseInt(args[0])).then((soldiers) => {
				if (soldiers.length == 0) {
					msg.channel.send(embed({ title: 'War: ' + args[0], stamp: false }));
					return;
				}
				soldiers.sort((a, b) => b.last.kills - a.last.kills);
				msg.channel.send(clanEmbed(soldiers, args[0]));
			});
		}
	},
};

function soldierEmbed(s) {
	const timeLeft = minToHM(s.last.minutesSpent);
	const kpm = s.last.kills / s.last.minutesSpent;
	const estKills = kpm * 240;

	const fields = [
		{ name: 'Kills', value: numberFormat(s.last.kills) },
		{ name: 'Time left', value: timeLeft },
		{ name: 'KPM', value: kpm.toFixed(2) },
		{ name: 'Est. total kills', value: numberFormat(estKills.toFixed(2)) },
	];

	return embed({ title: s.name.replace('_', '\\_') + ' in war ' + s.war, fields });
}

function clanEmbed(soldiers, warN) {
	const names = [];
	const kills = [];
	const kpm = [];
	const time = [];
	const totalCount = soldiers.length;
	let activeCount = 0;
	let totalKills = 0;

	soldiers.forEach((s) => {
		names.push(s.name.replace('_', '\\_'));
		kills.push(numberFormat(s.last.kills));
		totalKills += s.last.kills;
		kpm.push(s.last.kills / s.last.minutesSpent);
		time.push(minToHM(s.last.minutesSpent));
		if (s.last.minutesSpent < 240) activeCount++;
	});

	const avgKPM = kpm.reduce((p, c) => p + c) / kpm.length;
	const avgEstKills = avgKPM * 240;

	const fields = [
		{ name: 'Name', value: names.join('\n') },
		{ name: 'Kills', value: kills.join('\n') },
		{ name: 'Time left', value: time.join('\n') },
		{ name: 'Kills', value: numberFormat(totalKills) },
		{ name: 'Avg KPM', value: numberFormat(avgKPM.toFixed(2)) },
		{
			name: 'Avg est. kills',
			value: numberFormat(avgEstKills.toFixed(2)),
		},
		{ name: 'Total Soldiers', value: totalCount },
		{ name: 'Active Soldiers', value: activeCount },
	];

	return embed({ title: 'Report: war ' + warN, fields });
}
