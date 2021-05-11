require('dotenv').config();
const Discord = require('discord.js');

module.exports = {
	name: 'grz.test',
	description: 'testing cmd',
	execute(msg, args, bot) {
		if (msg.author.id !== process.env.DEVID) return;

		// msg.reply(new Discord.MessageEmbed().setTitle(':email: you got mail').setColor('#ffc800'));
		// console.log(msg.guild.channels.cache.map((role) => role.name + ': ' + role.id));

		// const embed = new Discord.MessageEmbed()
		// 	.setTitle('test')
		// 	.setColor('#ffc800')
		// 	.addField('before')
		// 	.setImage(msg.attachments.array()[0].url)
		// 	.setColor('#ffc800')
		// 	.addField('ater');

		// console.log(msg.attachments.array()[0].url);
		// msg.reply(embed);
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
