require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const clanReq = require('../clanRequest');

module.exports = {
	name: 'grz.test',
	description: 'testing cmd',
	execute(msg, args, dao) {
		if (msg.author.id !== process.env.DEVID) return;

		//console.log(msg.guild.roles.cache.map((role) => role.name + ': ' + role.id));
		console.log(
			msg.guild.members.cache
				.filter((m) => m._roles.includes('745898067924091001')).size
				//.map((m) => `${m.user.username}: ${m.id}`)
			// .join('\n')
		);
	},
};
