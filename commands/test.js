require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const clanReq = require('../clanRequest');

module.exports = {
	name: 'grz.test',
	description: 'testing cmd',
	execute(msg, args, dao) {
		if (msg.author.id !== process.env.DEVID) return;

		// const role = msg.guild.roles.cache.get('801445893210636299');
		console.log(
			msg.guild.members.cache
				.filter((m) => m._roles.includes('801445893210636299'))
				.map((m) => `${m.user.username}: ${m.id}`)
			// .join('\n')
		);
	},
};
