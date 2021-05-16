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

			const masteries = [
				['Class mastery', '%'],
				['[Trigger Mastery]', DoneOrFormat((pf.class(0) / lvl100) * 100)],
				['[Scout Mastery]', DoneOrFormat((pf.class(1) / lvl100) * 100)],
				['[SMG Mastery]', DoneOrFormat((pf.class(2) / lvl100) * 100)],
				['[Shotgun Mastery]', DoneOrFormat((pf.class(4) / lvl100) * 100)],
				['[Agent Mastery]', DoneOrFormat((pf.class(8) / lvl100) * 100)],
				['[Crossbow Mastery]', DoneOrFormat((pf.class(11) / lvl100) * 100)],
				['[Marksman Mastery]', DoneOrFormat((pf.class(6) / lvl100) * 100)],
				['[Revolver Mastery]', DoneOrFormat((pf.class(5) / lvl100) * 100)],
				['[Runner Mastery]', DoneOrFormat((pf.class(9) / lvl50) * 100)],
				['[Alien Blaster]', 'Coming soon'],
				['Other mastery', '%'],
				['[Nuke Tamer]', DoneOrFormat((pf.nukes() / 1000) * 100)],
				['[Shuriken]', DoneOrFormat((pf.bullseyes() / 10000) * 100)],
				['[Vandal]', DoneOrFormat((pf.sprays() / 50000) * 100)],
				['[High Roller]', DoneOrFormat((pf.kr() / 1000000) * 100)],
				['[Killa]', DoneOrFormat((pf.kills() / 50000) * 100)],
				['[KPD Mastery]', 'Coming soon'],
			];
			// Master Trader \`${'???'}\`

			const TableConfig = {
				border: table.getBorderCharacters(`ramac`),
				drawHorizontalLine: (lineIndex, rowCount) => {
					return (
						lineIndex === 0 ||
						lineIndex === 1 ||
						lineIndex === 11 ||
						lineIndex === 12 ||
						lineIndex === rowCount
					);
				},
				columns: [{ alignment: 'left' }, { alignment: 'right' }],
			};

			const desc = `\`\`\`css\n${table.table(masteries, TableConfig)}\`\`\``;
			// console.log(table.table(t, TableConfig));

			msg.channel.send(embed({ title: 'Mastery for ' + pf.name(), desc }));
		} catch (e) {
			console.error('e', e);
			bot.users.cache
				.find((user) => user.id === process.env.DEVID)
				.send(embed({ title: 'mastery error', desc: 'pf: ' + args.join(' ') }));
			msg.reply(embed({ title: ':x: Unable to get profile' }));
		}
	},
};

function DoneOrFormat(percent) {
	if (isNaN(percent)) return '0%';
	return percent >= 100 ? 'Done' : numberFormat(percent.toFixed(2)) + '%';
}
