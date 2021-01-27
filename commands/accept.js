require('dotenv').config();
const Discord = require('discord.js');
const clanReq = require('../clanRequest');

module.exports = {
	name: 'grz.accept',
	description: 'Accept clan application',
	execute(msg, args, dao, bot) {
		if (
			msg.channel.name !== env.process.OUTCOMECHANNEL &&
			!msg.member.roles.cache.has(env.process.TESTERROLE)
		)
			return; // check for tester role and channel

		const reqRepo = new clanReq(dao);

		const user = msg.mentions.users.first();
		const id = user.id;
		const mRole = msg.guild.roles.cache.find((r) => r.name == 'Member');
		// console.log(msg.member.roles.cache.has('802505344668532746'));

		reqRepo.getById(id).then((applicant) => {
			if (!applicant) return msg.reply('application not found');

			reqRepo.deleteById(msg.mentions.users.first().id).then((val) => {
				const embed = new Discord.MessageEmbed().setTitle('GRZ application accepted');

				embed.setDescription(
					'Your application to join GRZ has been accepted\n Welcome to the clan. You will be accepted ingame soon'
				);

				msg.member.roles.add(mRole);

				user.send(embed);

				msg.channel.send(new Discord.MessageEmbed().setTitle('application Accepted'));

				msg.guild.members.cache
					// .find((u) => u.user.id == '134785189128830977')
					.find((u) => u.user.id == env.process.LEADERID)
					.send(
						new Discord.MessageEmbed()
							.setTitle('New clan member accepted')
							.setDescription(
								`${applicant.tag}\n**IGN:** ${applicant.ign}\n**LVL:** ${applicant.lvl}\n**KDR:** ${applicant.kdr}\n**KPG:** ${applicant.kpg}\n**Nukes:** ${applicant.nukes}`
							)
					);
			});
		});
	},
};
