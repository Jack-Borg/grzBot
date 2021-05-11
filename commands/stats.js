require('dotenv').config();
const { getWarReport: getWarReport, getSoldierReport } = require('../dao');
const { numberFormat, minToHM, embed } = require('../utils');
const { table } = require('table');

module.exports = {
	name: 'grz.stats',
	description: 'Clan War Stats',
	execute(msg, args, bot) {
		if (
			args[0] != '3MTIwOD' &&
			!msg.member.roles.cache.has(process.env.CAPTAINROLE) &&
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
	const contractLength = s.war <= 3 ? 240 : 180;

	const timeLeft = minToHM(contractLength - s.last.minutesSpent);
	const kpm = s.last.kills / s.last.minutesSpent;
	const estKills = kpm * contractLength;

	const fields = [
		{ name: 'Kills', value: numberFormat(s.last.kills), inline: true },
		{ name: 'Time left', value: timeLeft, inline: true },
		{ name: 'KPM', value: kpm.toFixed(2), inline: true },
		{ name: 'Est. total kills', value: numberFormat(estKills.toFixed(2)), inline: true },
	];

	return embed({ title: s.name.split('_').join('\\_') + ' in war ' + s.war, fields });
}

function newClanEmbed(soldiers, warN) {
	const contractLength = warN <= 3 ? 240 : 180;
	const totalCount = soldiers.length;

	console.log(soldiers.length);
	let sTable = [['Name', 'Kills', 'Time Left', 'Est. Kills', 'KPM']];
	sTable = sTable.concat(
		soldiers.map((s) => {
			const tmp = s.last.kills / s.last.minutesSpent;
			//handle 0/0 == NaN
			const kpm = isNaN(tmp) ? 0 : tmp;
			const est = kpm * 180;
			const time = minToHM(contractLength - s.last.minutesSpent);
			return [s.name, s.last.kills, time, numberFormat(est), numberFormat(kpm)];
		})
	);
	console.log(sTable);
	console.log(table(sTable));

	return embed({ title: 'Report: war ' + warN });
}

function clanEmbed(soldiers, warN) {
	const contractLength = warN <= 3 ? 240 : 180;
	const names = [];
	const kills = [];
	const kpm = [];
	const time = [];
	const totalCount = soldiers.length;
	let activeCount = 0;
	let totalKills = 0;

	soldiers.forEach((s) => {
		names.push(s.name.split('_').join('\\_'));
		kills.push(numberFormat(s.last.kills));
		totalKills += s.last.kills;
		const tmp = s.last.kills / s.last.minutesSpent;
		//handle 0/0 == NaN
		kpm.push(isNaN(tmp) ? 0 : tmp);
		time.push(minToHM(contractLength - s.last.minutesSpent));
		if (s.last.minutesSpent < contractLength) activeCount++;
	});
	const avgKPM = kpm.reduce((p, c) => p + c) / kpm.length;
	const avgEstKills = avgKPM * contractLength;

	const fields = [
		{ name: 'Name', value: names.join('\n'), inline: true },
		{ name: 'Kills', value: kills.join('\n'), inline: true },
		{ name: 'Time left', value: time.join('\n'), inline: true },
		{ name: 'Kills', value: numberFormat(totalKills), inline: true },
		{ name: 'Avg KPM', value: numberFormat(avgKPM.toFixed(2)), inline: true },
		{
			name: 'Avg est. kills',
			value: numberFormat(avgEstKills.toFixed(2)),
			inline: true,
		},
		{ name: 'Total Soldiers', value: totalCount, inline: true },
		{ name: 'Active Soldiers', value: activeCount, inline: true },
	];

	return embed({ title: 'Report: war ' + warN, fields });
}
