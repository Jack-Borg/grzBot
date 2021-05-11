require('dotenv').config();
const Discord = require('discord.js');
const { embed, msToDHM, numberFormat } = require('../utils');
const table = require('table');
const profile = require('../profile');

module.exports = {
	name: 'grz.pf',
	description: 'Profile command',
	async execute(msg, args, bot, socket) {
		if (!msg.member.roles.cache.has(process.env.MEMBERROLE)) return;

		if (args.length == 0) {
			return msg.channel.send(
				embed({
					title: ':x: Missing arguments',
					desc: `grz.pf \`<Player>\` `,
				})
			);
		}

		try {
			await socket.connected();
			const data = await socket.profile(args.join(' '));
			const pf = new profile(data);

			const TableData = createTable(pf);
			const TableConfig = {
				border: table.getBorderCharacters(`ramac`),
			};

			const desc = `\`\`\`css\n${table.table(TableData, TableConfig)}\`\`\``;
			msg.reply(embed({ title: pf.name(), desc }));
		} catch (e) {
			console.error('e', e);
			bot.users.cache
				.find((user) => user.id === process.env.DEVID)
				.send(embed({ title: 'pf error' }));
			msg.reply(embed({ title: ':x: Unable to get profile' }));
		}
	},
};

function createTable(pf) {
	return [
		[
			'LVL\n' + pf.lvl(),
			'Challenge\n' + pf.challenge(),
			'KR\n' + numberFormat(pf.kr()),
			'Score\n' + numberFormat(pf.score()),
		],
		[
			'SPK\n' + numberFormat(pf.spk()),
			'Kills\n' + numberFormat(pf.kills()),
			'Deaths\n' + numberFormat(pf.deaths()),
			'KDR\n' + numberFormat(pf.kd()),
		],
		[
			'KPG\n' + numberFormat(pf.kpg()),
			'Games\n' + numberFormat(pf.games()),
			'W/L\n' + numberFormat(pf.wl()),
			'Wins\n' + numberFormat(pf.wins()),
		],
		[
			'Losses\n' + numberFormat(pf.losses()),
			'Assists\n' + numberFormat(pf.assists()),
			'Nukes\n' + numberFormat(pf.nukes()),
			'KR-Packages\n' + numberFormat(pf.kr_packages()),
		],
		[
			'Melee\n' + numberFormat(pf.melee()),
			'Beatdowns\n' + numberFormat(pf.beatdowns()),
			'Bullseyes\n' + numberFormat(pf.bullseyes()),
			'Headshots\n' + numberFormat(pf.headshots()),
		],
		[
			'Wallbangs\n' + numberFormat(pf.wallbangs()),
			'Sprays Placed\n' + numberFormat(pf.sprays()),
			'Accuracy\n' + numberFormat(pf.accuracy()) + '%',
			'Time Played\n' + msToDHM(pf.timeplayed()),
		],
	];
}
