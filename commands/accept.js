require('dotenv').config();
const Discord = require('discord.js');
const clanReq = require('../clanRequest');

module.exports = {
	name: 'grz.accept',
	description: 'Accept clan application',
	execute(msg, args, dao, bot) {
		if (
			msg.channel.id !== process.env.OUTCOMECHANNEL ||
			!msg.member.roles.cache.has(process.env.TESTERROLE) ||
			msg.mentions.users.first() == undefined
		)
			return; // check for tester role and channel

		const reqRepo = new clanReq(dao);

		const user = msg.guild.members.cache.find((m) => m.id == msg.mentions.users.first().id);

		reqRepo.getById(user.id).then((applicant) => {
			if (!applicant) return msg.reply('application not found');

			reqRepo.deleteById(user.id).then((val) => {
				const embed = new Discord.MessageEmbed().setTitle('GrZ application accepted');

				embed.setDescription(
					'Your application to join GrZ has been accepted\n Welcome to the clan. You will be accepted ingame soon'
				);

				const mRole = msg.guild.roles.cache.find((r) => r.id == process.env.MEMBERROLE);
				user.roles.add(mRole);
				const aftRole = msg.guild.roles.cache.find((r) => r.id == process.env.TOTESTROLE);
				user.roles.remove(aftRole);

				user.send(embed);

				msg.channel.send(new Discord.MessageEmbed().setTitle('Application accepted'));

				msg.guild.members.cache
					.find((u) => u.user.id == process.env.LEADERID)
					.send(
						new Discord.MessageEmbed()
							.setTitle('New clan member accepted')
							.setDescription(
								`**Accepted by:** ${msg.author.username}

                                ${applicant.tag}
                                **IGN:** ${applicant.ign}
                                **LVL:** ${applicant.lvl}
                                **KDR:** ${applicant.kdr}
                                **KPG:** ${applicant.kpg}
                                **Nukes:** ${applicant.nukes}`
							)
					);
			});
		});
	},
};
