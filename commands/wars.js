require('dotenv').config();
const Discord = require('discord.js');
const { embed, numberFormat, minToHM } = require('../utils');
const table = require('table');

module.exports = {
	name: process.env.PREFIX+'.wars',
	description: 'wars cmd',
	async execute(msg, args, bot, socket) {
		if (
			msg.author.id !== process.env.DEVID &&
			!msg.member.roles.cache.has(process.env.MEMBERROLE)
		)
			return;

		if (!args[0]) return msg.channel.send(embed({ title: ':x: Missing argument' }));

		try {
			if (args[0].startsWith('region:')) {
				const rStr = args[0].split(':')[1].toLowerCase();
				const r = region(rStr);

				if (!r) return msg.channel.send(embed({ title: ':x: Incorrect region' }));

				await socket.connected();
				const cw = await socket.cw();

				const c = cw[3].l
					.filter((c) => c.ri == r || r == 9)
					.map((c) => [`[${c.cn}]`, c.kl, c.c1, c.c3])
					.sort((a, b) => b[1] - a[1])
					.slice(0, 10);

				// const tab = [['Name', 'Kills', 'Alive', 'Dead']].concat(c.slice(0, 10));
				// const TableConfig = {
				// 	border: table.getBorderCharacters(`ramac`),
				// };

				// const desc = `\`\`\`css\n${table.table(tab, TableConfig)}\`\`\``;
				// console.log(c);
				// msg.channel.send(c.map((c) => c[0]).join('\n'));

				msg.channel.send(regionEmbed(rStr, c));
			} else {
				return msg.channel.send(
					embed({
						title: ':zzz: Not implemented yet',
						desc: 'Single clan lookup comming soon',
					})
				);
			}

			// const t = [];
			// cw[3].l.forEach((c) => {
			// 	if (!t[c.ri]) t[c.ri] = c;
			// });
			// console.log(t);
		} catch (e) {
			console.error('e', e);
			// bot.users.cache
			// 	.find((user) => user.id === process.env.DEVID)
			// 	.send(embed({ title: 'pf error' }));
			msg.reply(embed({ title: ':x: error' }));
		}
	},
};

function regionEmbed(region, clans) {
	const names = [];
	const kills = [];
	const soldiers = [];
	// const dead = [];

	clans.forEach((c) => {
		names.push(c[0]);
		kills.push(numberFormat(c[1]));
		soldiers.push(c[2] + '/' + c[3]);
		// alive.push(c[2]);
		// dead.push(c[3]);
	});

	const fields = [
		{ name: 'Name', value: names.join('\n'), inline: true },
		{ name: 'Kills', value: kills.join('\n'), inline: true },
		{ name: 'Alive / dead', value: soldiers.join('\n'), inline: true },
	];
	// { name: 'dead', value: dead.join('\n'), inline: true },

	return embed({ title: `Region: ${region}`, fields });
}

/*
1 = na
2 = sa
3 = we
4 = af
5 = me
6 = as
7 = oc
8 = eu
*/
function region(r) {
	switch (r) {
		case 'na':
			return 1;
		case 'sa':
			return 2;
		case 'we':
			return 3;
		case 'af':
			return 4;
		case 'me':
			return 5;
		case 'as':
			return 6;
		case 'oc':
			return 7;
		case 'eu':
			return 8;
		case 'gb':
			return 9;
		default:
			return false;
	}
}
