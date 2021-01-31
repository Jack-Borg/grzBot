require('dotenv').config();
const Discord = require('discord.js');
const clanReq = require('../clanRequest');

module.exports = {
	name: 'grz.decline',
	description: 'Decline clan application',
	execute(msg, args, dao, bot) {
		if (
			msg.channel.id !== process.env.OUTCOMECHANNEL ||
			!msg.member.roles.cache.has(process.env.TESTERROLE) ||
			msg.mentions.users.first() == undefined
		)
			return; // check for tester role and channel

		const reqRepo = new clanReq(dao);
		const user = msg.guild.members.cache.find((m) => m.id == msg.mentions.users.first().id);

		reqRepo.getById(user.id).then((val) => {
			if (!val) return msg.reply('application not found');

			reqRepo.deleteById(user.id).then((val) => {
				const aftRole = msg.guild.roles.cache.find((r) => r.id == process.env.TOTESTROLE);
				user.roles.remove(aftRole);

				const embed = new Discord.MessageEmbed().setTitle('GrZ application declined');
				embed.setDescription(
					'Your application to join GrZ has been declined\n You can try agin in 3 weeks'
				);
				user.send(embed);
				msg.channel.send(new Discord.MessageEmbed().setTitle('Application declined'));
			});
		});
	},
};
