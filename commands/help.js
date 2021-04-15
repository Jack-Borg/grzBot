require('dotenv').config();
const Discord = require('discord.js');
const { embed } = require('../utils');

module.exports = {
	name: 'grz.help',
	description: 'help cmd',
	execute(msg, args, bot) {
		if (msg.author.id !== process.env.DEVID) return;

		msg.reply(embed({ title: ':email: you got mail' }));

		const fields = [];

		if (msg.member.roles.cache.has(process.env.CAPTAINROLE)) {
			const cwf = [
				'grz.stats [War number]',
				'grz.stats <kr-username>',
				'grz.hist <kr-username>',
				'grz.post <Post data>',
			];
			fields.push({
				name: 'Clan War Commands',
				value: `>>> \`\`\`css\n${cwf.join('\n')} \`\`\``,
				inline: false,
			});
		}

		const df = ['grz.xp <current lvl> <targetlvl> [current xp]'];
		fields.push({
			name: 'Public Commands',
			value: `>>> \`\`\`css\n${df.join('\n')} \`\`\``,
			inline: false,
		});

		fields.push({
			name: 'Information',
			value: `*Syntax: \`<>\` required, \`[]\` optional
            do not write \`<>\` or \`[]\`*
            
            This bot is being developed by <@134785189128830977>
            Please contact <@134785189128830977> about any bugs, suggestions or questions`,
			inline: false,
		});

		const emoji = bot.emojis.cache.get('815588419673391186');
		msg.author.send(embed({ title: `${emoji} Help`, desc: `**Prefix:** \`grz.\``, fields }));
	},
};
// https://cdn.discordapp.com/emojis/815588419673391186.png?v=1
