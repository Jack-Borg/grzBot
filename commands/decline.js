const Discord = require('discord.js');
const clanReq = require('../clanRequest');

module.exports = {
	name: 'grz.decline',
	description: 'Decline clan application',
	execute(msg, args, dao, bot) {
		if (
			msg.channel.name !== '》recruitment-outcome' &&
			!msg.member.roles.cache.has('767034530057945109')
		)
			return; // check for tester role and channel

		const reqRepo = new clanReq(dao);
		const id = msg.mentions.users.first().id;

		reqRepo.getById(id).then((val) => {
			if (!val) return msg.reply('application not found');
			reqRepo.deleteById(msg.mentions.users.first().id).then((val) => {
				let user = msg.mentions.users.first();
				const embed = new Discord.MessageEmbed().setTitle('GRZ application denied');
				embed.setDescription(
					'Your application to join GRZ has been denied\n You can try agin in 3 weeks'
				);
				user.send(embed);
				msg.channel.send(new Discord.MessageEmbed().setTitle('application Declined'));
			});
		});
	},
};
