require('dotenv').config();
const Discord = require('discord.js');

module.exports = {
	name: 'grz.test',
	description: 'testing cmd',
	execute(msg, args, bot) {
		if (msg.author.id !== process.env.DEVID) return;

		msg.channel.send('g.pf jack_borg');
		// console.log(msg.guild.roles.cache.map((role) => role.name + ': ' + role.id));
		// console.log(
		// 	msg.guild.members.cache
		// 		.filter((m) => m._roles.includes('801445893210636299'))
		// 		.map((m) => `${m.user.username}: ${m.id}`)
		// 	// .join('\n')
		// );

		// console.log(
		// msg.guild.members.cache.filter((m) => m._roles.includes('802505344668532746')).size
		//.map((m) => `${m.user.username}: ${m.id}`)
		// .join('\n')
		// );
	},
};
