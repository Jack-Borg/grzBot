require('dotenv').config();
const Discord = require('discord.js');
const { embed, numberFormat } = require('../utils');

module.exports = {
	name: 'grz.kpm',
	description: 'testing cmd',
	async execute(msg, args, bot, socket) {
		// if (msg.author.id !== process.env.DEVID) return;

		const kpm = parseFloat(args[0].replace(',', '.'));

		msg.channel.send(
			embed({
				title: 'Estimate kills calc',
				desc: `With \`${kpm}\` KPM you can get \`${numberFormat(kpm * 180)}\` total kills`,
			})
		);
	},
};
