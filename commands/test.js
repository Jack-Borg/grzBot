require('dotenv').config();
const Discord = require('discord.js');
const { embed, numberFormat, minToHM } = require('../utils/utils');
const { table } = require('table');

module.exports = {
	name: process.env.PREFIX + '.test',
	description: 'testing cmd',
	async execute(msg, args, bot, socket) {
		if (msg.author.id !== process.env.DEVID) return;

		// try {
		// 	await socket.connected();
		// 	// const cw = await socket.cw();
		// 	// console.log(cw[3].p);
		// 	const data = await socket.clan('grz');
		// 	const soldiers = data[3].members
		// 		.filter((m) => m.tp > 0)
		// 		.map((m) => {
		// 			return { name: m.p, kills: m.ki, minutesSpent: Math.floor(m.tp / 60000) };
		// 		})
		// 		.sort((a, b) => a.minutesSpent - b.minutesSpent);
		// 	console.log(
		// 		soldiers
		// 			.map((s) => 180 - s.minutesSpent)
		// 			.filter((t) => t > 0)
		// 			.reduce((a, c) => a + c)
		// 	);
		// 	// if (args[0] == 'avg') console.log(table(avg(soldiers)));
		// 	// else clanEmbed(soldiers, process.env.CURRENTWAR);
		// 	// msg.channel.send(clanEmbed(soldiers, process.env.CURRENTWAR));
		// } catch (e) {
		// 	console.error('e', e);
		// 	// bot.users.cache
		// 	// 	.find((user) => user.id === process.env.DEVID)
		// 	// 	.send(embed({ title: 'pf error' }));
		// 	msg.reply(embed({ title: ':x: Unable to get profile' }));
		// }
	},
};
