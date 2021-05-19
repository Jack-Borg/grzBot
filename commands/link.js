require('dotenv').config();
const Discord = require('discord.js');
const { linkAccount } = require('../utils/dao');
const { embed } = require('../utils/utils');

module.exports = {
	name: process.env.PREFIX + '.link',
	description: 'linking cmd',
	async execute(msg, args, bot, socket) {
		if (msg.author.id !== process.env.DEVID) return;

		if (args.length != 2) return msg.channel.send(embed({ title: 'Missing argument' }));

		const name = args[1];
		const id = msg.mentions.users.first() ? msg.mentions.users.first().id : args[0];

		linkAccount(id, name);

		msg.channel.send(
			embed({
				title: 'Account linked',
				desc: `<@${id}> linked to ${name}
                If you want to have your account linked ask <@${process.env.DEVID}>`,
			})
		);
	},
};
