require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const clanReq = require('../clanRequest');

module.exports = {
	name: 'grz.next',
	description: 'next 5 applications',
	execute(msg, args, dao) {
		if (!msg.member.roles.cache.has(process.env.TESTERROLE)) return;

		const reqRepo = new clanReq(dao);
		reqRepo.getNext().then(
			(val) => {
				const embed = new Discord.MessageEmbed().setTitle('Top 5 applicants');
				let desc = [];
				val.forEach((a, i) => {
					desc.push(
						`**${i + 1}:** ${a.tag} **IGN: **${a.ign} **LVL: **${a.lvl} **KDR **:${
							a.kdr
						} **KPG**:${a.kpg} **Nukes**:${a.nukes}`
					);
				});

				desc.push(`${val.length} applications in queue`);
				embed.setDescription(desc.join('\n\n'));
				msg.channel.send(embed);
			},
			(val) => msg.reply('An error occurred')
		);
	},
};
