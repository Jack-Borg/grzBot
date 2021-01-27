require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const clanReq = require('../clanRequest');

module.exports = {
	name: 'grz.next',
	description: 'next 5 applications',
	execute(msg, args, dao) {
		if (!msg.member.roles.cache.has(env.process.TESTERROLE)) return;

		const reqRepo = new clanReq(dao);
		reqRepo.getNext().then(
			(val) => {
				const embed = new Discord.MessageEmbed().setTitle('Next 5 applications');
				let desc = [];
				val.forEach((e) => {
					desc.push(
						`${e.tag} **IGN: **${e.ign} **LVL: **${e.lvl} **KDR **:${e.kdr} **KPG**:${e.kpg} **Nukes**:${e.nukes}`
					);
				});
				embed.setDescription(desc.join('\n\n'));
				msg.channel.send(embed);
			},
			(val) => msg.reply('An error occurred')
		);
	},
};
