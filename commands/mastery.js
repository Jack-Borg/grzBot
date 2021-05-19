require('dotenv').config();
const Discord = require('discord.js');
const { embed, numberFormat, isDiscordId } = require('../utils/utils');
const { getSoldierByDiscord } = require('../utils/dao');
const table = require('table');
const profile = require('../utils/classes/profile');

const lvl100 = 10890000;
const lvl50 = 2667778;

module.exports = {
	name: process.env.PREFIX + '.mastery',
	description: 'mastery calculator',
	async execute(msg, args, bot, socket) {
		if (
			msg.author.id !== process.env.DEVID &&
			!msg.member.roles.cache.has(process.env.MEMBERROLE)
		)
			return;

		let arg = args.join(' ');
		if (args.length == 0) arg = msg.author.id;

		if (isDiscordId(arg)) {
			const player = await getSoldierByDiscord(arg);
			if (!player) {
				return msg.channel.send(
					embed({
						title: ':x: Profile not found',
						desc: `grz.mastery \`[Player]\`
                        Linked account required to use command with no \`[Player]\`
                        Ask <@${process.env.DEVID}> for account linking`,
					})
				);
			}
			mast(player.name, msg, bot, socket);
		} else mast(arg, msg, bot, socket);
	},
};

async function mast(name, msg, bot, socket) {
	try {
		await socket.connected();
		const data = await socket.profile(name);
		const pf = new profile(data);

		const cM = [
			['Class mastery', '%', 'Level'],
			classMastery('[Trigger Mastery]', pf.class(0), lvl100),
			classMastery('[Scout Mastery]', pf.class(1), lvl100),
			classMastery('[SMG Mastery]', pf.class(2), lvl100),
			classMastery('[Shotgun Mastery]', pf.class(4), lvl100),
			classMastery('[Agent Mastery]', pf.class(8), lvl100),
			classMastery('[Crossbow Mastery]', pf.class(11), lvl100),
			classMastery('[Marksman Mastery]', pf.class(6), lvl100),
			classMastery('[Revolver Mastery]', pf.class(5), lvl100),
			classMastery('[Runner Mastery]', pf.class(9), lvl50),
			['[Alien Blaster]', 'Coming soon', 'Coming soon'],
		];

		const oM = [
			['Other mastery', '%', 'Progress'],
			otherMastery('[Nuke Tamer]', pf.nukes, 1000, '1k'),
			otherMastery('[Shuriken]', pf.bullseyes, 10000, '10k'),
			otherMastery('[Vandal]', pf.sprays, 50000, '50k'),
			['[High Roller]', doneOrFormat(pf.kr / 1000000), numberFormat(pf.kr / 1000) + 'k/1m'],
			otherMastery('[Killa]', pf.kills, 50000, '50k'),
			['[KPD Mastery]', 'Coming soon', 'Coming soon'],
		];
		const masteries = [].concat(cM, oM);

		// Master Trader \`${'???'}\`

		const TableConfig = {
			border: table.getBorderCharacters(`ramac`),
			drawHorizontalLine: (lineIndex, rowCount) => {
				return (
					lineIndex === 0 ||
					lineIndex === 1 ||
					lineIndex === cM.length ||
					lineIndex === cM.length + 1 ||
					lineIndex === rowCount
				);
			},
			columns: [{ alignment: 'left' }, { alignment: 'right' }, { alignment: 'right' }],
		};

		const desc = `\`\`\`css\n${table.table(masteries, TableConfig)}\`\`\``;
		// console.log(table.table(t, TableConfig));

		msg.channel.send(embed({ title: 'Mastery for ' + pf.name, desc }));
	} catch (e) {
		console.error('e', e);
		bot.users.cache
			.find((user) => user.id === process.env.DEVID)
			.send(
				embed({
					title: 'mastery error',
					desc: `pf: ${name}\nBy: <@${msg.author.id}>\nIn: <#${msg.channel.id}>`,
				})
			);
		msg.reply(embed({ title: ':x: Unable to get profile' }));
	}
}

function doneOrFormat(percent) {
	percent *= 100;
	if (isNaN(percent)) return '0%';
	return percent >= 100 ? 'Done' : numberFormat(percent.toFixed(2)) + '%';
}

function classMastery(name, score, tar) {
	if (!score) score = 1;
	const percent = doneOrFormat(score / tar);
	const lvl = Math.floor(0.03 * Math.sqrt(score)) + 1;
	const tarLvl = Math.floor(0.03 * Math.sqrt(tar)) + 1;

	return [name, percent, lvl + '/' + tarLvl];
}

function otherMastery(name, cur, tar, formattedTar) {
	if (!cur) cur = 0;
	if (cur >= tar) return [name, 'Done', 'Done'];

	const percent = doneOrFormat(cur / tar);

	return [name, percent, numberFormat(cur) + '/' + formattedTar];
}
