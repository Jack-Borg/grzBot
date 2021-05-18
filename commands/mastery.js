require('dotenv').config();
const Discord = require('discord.js');
const { embed, numberFormat } = require('../utils/utils');
const table = require('table');
const profile = require('../utils/classes/profile');

module.exports = {
	name: process.env.PREFIX + '.mastery',
	description: 'mastery calculator',
	async execute(msg, args, bot, socket) {
		if (
			msg.author.id !== process.env.DEVID &&
			!msg.member.roles.cache.has(process.env.MEMBERROLE)
		)
			return;

		const lvl100 = 10890000;
		const lvl50 = 2667778;

		try {
			await socket.connected();
			if (args.length == 0) {
				return msg.channel.send(
					embed({
						title: ':x: Missing arguments',
						desc: `grz.mastery \`<Player>\` `,
					})
				);
			}
			const data = await socket.profile(args.join(' '));
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
				otherMastery('[Nuke Tamer]', pf.nukes, 1000),
				otherMastery('[Shuriken]', pf.bullseyes, 10000),
				otherMastery('[Vandal]', pf.sprays, 50000),
				[
					'[High Roller]',
					doneOrFormat(pf.kr / 1000000),
					numberFormat(pf.kr / 1000) + 'k/' + numberFormat(1000) + 'k',
				],
				otherMastery('[Killa]', pf.kills, 50000),
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
				.send(embed({ title: 'mastery error', desc: 'pf: ' + args.join(' ') }));
			msg.reply(embed({ title: ':x: Unable to get profile' }));
		}
	},
};

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

function otherMastery(name, cur, tar) {
	if (!cur) cur = 0;
	if (cur >= tar) return [name, 'Done', 'Done'];

	const percent = doneOrFormat(cur / tar);

	return [name, percent, numberFormat(cur) + '/' + numberFormat(tar)];
}
