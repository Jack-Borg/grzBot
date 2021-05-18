require('dotenv').config();
const Discord = require('discord.js');
const { embed, msToDHM, numberFormat, minToHM } = require('../utils/utils');
const table = require('table');
const contractStats = require('../utils/classes/contractStats');
const dao = require('../utils/dao');

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

			const soldiers = data[3].members
				.filter((m) => m.tp > 0)
				.map((m) => {
					return { name: m.p, kills: m.ki, timePlayed: m.tp };
				});

			if (soldiers.length > 0) {
				console.log('post soldiers', soldiers);
				// dao.postReport(soldiers);
			}

			if (args.length == 0) {
				if (soldiers.length == 0)
					return msg.channel.send(embed({ title: 'No soldiers found' }));

				msg.channel.send(clanEmbed(soldiers, process.env.CURRENTWAR));
			} else {
				const playerName = args.join(' ');
				const contractData = data[3].members.find(
					(m) => m.p.toLowerCase() == playerName.toLowerCase()
				);

				if (contractData == undefined) {
					msg.reply(embed({ title: ':x: Player is probably not in GrZ' }));
				} else {
					const contract = new contractStats(contractData);

					const TableData = createTable(contract);
					const TableConfig = {
						border: table.getBorderCharacters(`ramac`),
						drawHorizontalLine: (lineIndex, rowCount) => {
							return lineIndex === 0 || lineIndex === 1 || lineIndex === rowCount;
						},
						columns: [{ alignment: 'left' }, { alignment: 'right' }],
					};

					const desc = `\`\`\`css\n${table.table(TableData, TableConfig)}\`\`\``;
					msg.reply(embed({ title: contract.name, desc }));
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
		['[Kills]', numberFormat(contract.kills)],
		['[Time Played]', msToDHM(contract.timePlayed)],
		['[KPM]', numberFormat(contract.kpm)],
		['[KPG]', numberFormat(contract.kpg)],
		['[est.Total]', numberFormat(contract.estKills)],
		['', ''],
		['[Deaths]', numberFormat(contract.deaths)],
		['[K/D]', numberFormat(contract.kd)],
	];
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
		let t = contractLength - s.timePlayed;
		t = (t < 0 ? '-' : '') + msToDHM(Math.abs(t));
		// console.log(s.name, t);
		time.push(t);
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

// function avg(soldiers) {
// 	let kills = 0;
// 	let est = 0;
// 	let kpm = 0;
// 	let kpg = 0;
// 	let tP = 0;
// 	let tL = 0;

// 	console.log(
// 		soldiers.filter((s) => s.minutesSpent < 180).sort((a, b) => b.minutesSpent - a.minutesSpent)
// 	);

// 	soldiers.forEach((s) => {
// 		const sTP = s.minutesSpent >= 180 ? 180 : s.minutesSpent;
// 		let tmp = s.kills / sTP;
// 		//handle 0/0 == NaN
// 		tmp = isNaN(tmp) ? 0 : tmp;

// 		kills += s.kills;
// 		est += tmp * 180;
// 		kpm += tmp;
// 		kpg += tmp * 4;
// 		tP += sTP;
// 		tL += 180 - sTP;
// 	});

// 	return [
// 		[`Kills\n${kills}`, `KPM\n${kpm / soldiers.length}`, `KPG\n${kpg / soldiers.length}`],
// 		[
// 			`Est. kills\n${est / soldiers.length}`,
// 			`Time played\n${minToHM(tP)}`,
// 			`Time left\n${minToHM(tL)}`,
// 		],
// 	];
// }
