require('dotenv').config();
const Discord = require('discord.js');
const { embed, msToDHM, numberFormat, minToHM } = require('../utils/utils');
const table = require('table');
const contractStats = require('../utils/classes/contractStats');

module.exports = {
	name: process.env.PREFIX + '.contract',
	description: 'Contract command',
	async execute(msg, args, bot, socket) {
		if (
			msg.author.id !== process.env.DEVID &&
			!msg.member.roles.cache.has(process.env.CAPTAINROLE)
		)
			return;

		try {
			await socket.connected();
			const data = await socket.clan('grz');
			console.log(data[3].members);

			if (args.length == 0) {
				const soldiers = data[3].members
					.filter((m) => m.tp > 0)
					.map((m) => {
						return { name: m.p, kills: m.ki, minutesSpent: Math.floor(m.tp / 60000) };
					});
				if (soldiers.length == 0)
					return msg.channel.send(embed({ title: 'No soldiers found' }));

				msg.channel.send(clanEmbed(soldiers, process.env.CURRENTWAR));
			} else {
				const playerName = args.join(' ');
				var playerIndex;
				for (var i = 0; i < data[3].members.length; i++) {
					if (data[3].members[i].p.toLowerCase() === playerName.toLowerCase()) {
						playerIndex = i;
						break;
					}
				}
				if (playerIndex == null) {
					msg.reply(embed({ title: ':x: Player is probably not in GrZ' }));
				} else {
					contract = new contractStats(data, playerIndex);

					const TableData = createTable(contract);
					const TableConfig = {
						border: table.getBorderCharacters(`ramac`),
					};
					const desc = `\`\`\`css\n${table.table(TableData, TableConfig)}\`\`\``;
					msg.reply(embed({ title: contract.name(), desc }));
				}
			}
		} catch (e) {
			console.error('e', e);
			bot.users.cache
				.find((user) => user.id === process.env.DEVID)
				.send(embed({ title: 'contract error', desc: 'contract: ' + args.join(' ') }));
			msg.reply(embed({ title: ':x: Unable to get contract' }));
		}
	},
};

function createTable(contract) {
	return [
		['Name', 'Value'],
		[
			'[Kills]\n[Time Played]\n[KPM]\n[KPG]\n[est.Total]\n\n[Deaths]\n[K/D]',
			numberFormat(contract.kills()) +
				'\n' +
				msToDHM(contract.timePlayed()) +
				'\n' +
				numberFormat(contract.kpm()) +
				'\n' +
				numberFormat(contract.kpg()) +
				'\n' +
				numberFormat(contract.estKills()) +
				'\n\n' +
				numberFormat(contract.deaths()) +
				'\n' +
				numberFormat(contract.kd()),
		],
	];
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
		// console.log(s.name, t);
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
