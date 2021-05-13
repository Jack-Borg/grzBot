require('dotenv').config();
const Discord = require('discord.js');
const { embed, msToDHM } = require('../utils');

module.exports = {
	name: 'grz.contracts',
	description: 'contracts cmd',
	async execute(msg, args, bot, socket) {
		if (msg.author.id !== process.env.DEVID) return;
	},
};
