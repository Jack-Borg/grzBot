require('dotenv').config();
const Discord = require('discord.js');
const { embed, numberFormat, minToHM } = require('../utils/utils');
const { table } = require('table');

module.exports = {
	name: process.env.PREFIX + '.test',
	description: 'testing cmd',
	async execute(msg, args, bot, socket) {
		if (msg.author.id !== process.env.DEVID) return;

		try {
			await socket.connected();
			// const cw = await socket.cw();
			// console.log(cw[3].p);
			const data = await socket.clan('grz');
			const soldiers = data[3].members
				.filter((m) => m.tp > 0)
				.map((m) => {
					return { name: m.p, kills: m.ki, minutesSpent: Math.floor(m.tp / 60000) };
				})
				.sort((a, b) => a.minutesSpent - b.minutesSpent);
			console.log(
				soldiers
					.map((s) => 180 - s.minutesSpent)
					.filter((t) => t > 0)
					.reduce((a, c) => a + c)
			);
			// if (args[0] == 'avg') console.log(table(avg(soldiers)));
			// else clanEmbed(soldiers, process.env.CURRENTWAR);
			// msg.channel.send(clanEmbed(soldiers, process.env.CURRENTWAR));
		} catch (e) {
			console.error('e', e);
			// bot.users.cache
			// 	.find((user) => user.id === process.env.DEVID)
			// 	.send(embed({ title: 'pf error' }));
			msg.reply(embed({ title: ':x: Unable to get profile' }));
		}
	},
};
function clanEmbed(soldiers, warN) {
	const contractLength = warN <= 3 ? 240 : 180;
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
		const tmp = s.kills / s.minutesSpent;
		//handle 0/0 == NaN
		kpm.push(isNaN(tmp) ? 0 : tmp);
		let t = contractLength - s.minutesSpent;
		t = t < 0 ? '-' + minToHM(Math.abs(t)) : minToHM(t);
		console.log(s.name, t);
		time.push(t);
		if (s.minutesSpent < contractLength) activeCount++;
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

function avg(soldiers) {
	let kills = 0;
	let est = 0;
	let kpm = 0;
	let kpg = 0;
	let tP = 0;
	let tL = 0;

	console.log(
		soldiers.filter((s) => s.minutesSpent < 180).sort((a, b) => b.minutesSpent - a.minutesSpent)
	);

	soldiers.forEach((s) => {
		const sTP = s.minutesSpent >= 180 ? 180 : s.minutesSpent;
		let tmp = s.kills / sTP;
		//handle 0/0 == NaN
		tmp = isNaN(tmp) ? 0 : tmp;

		kills += s.kills;
		est += tmp * 180;
		kpm += tmp;
		kpg += tmp * 4;
		tP += sTP;
		tL += 180 - sTP;
	});

	return [
		[`Kills\n${kills}`, `KPM\n${kpm / soldiers.length}`, `KPG\n${kpg / soldiers.length}`],
		[
			`Est. kills\n${est / soldiers.length}`,
			`Time played\n${minToHM(tP)}`,
			`Time left\n${minToHM(tL)}`,
		],
	];
}
