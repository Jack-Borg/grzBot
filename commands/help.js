require('dotenv').config();
const Discord = require('discord.js');
const { embed } = require('../utils/utils');

module.exports = {
	name: process.env.PREFIX + '.help',
	description: 'help cmd',
	execute(msg, args, bot) {
		msg.reply(embed({ title: ':email: You got a mail' }));

		const fields = [];

		if (
			msg.member.roles.cache.has(process.env.CAPTAINROLE) ||
			msg.author.id == process.env.LEADERID
		) {
			const cwf = [
				process.env.PREFIX + '.stats [War number]',
				process.env.PREFIX + '.stats <kr-username> [War number]',
				process.env.PREFIX + '.hist <kr-username>',
				process.env.PREFIX + '.post <Post data>',
			];
			fields.push({
				name: 'Clan War Commands',
				value: `>>> \`\`\`css\n${cwf.join('\n')} \`\`\``,
				inline: false,
			});
		}

		if (msg.member.roles.cache.has(process.env.MEMBERROLE)) {
			const mCommands = [
				process.env.PREFIX + '.pf <kr-username>',
				process.env.PREFIX + '.mastery <kr-username>',
			];
			fields.push({
				name: 'Member Commands',
				value: `>>> \`\`\`css\n${mCommands.join('\n')} \`\`\``,
				inline: false,
			});
		}

		const df = [process.env.PREFIX + '.xp <current lvl> <targetlvl> [current xp]'];
		fields.push({
			name: 'Public Commands',
			value: `>>> \`\`\`css\n${df.join('\n')} \`\`\``,
			inline: false,
		});

		fields.push({
			name: 'Information',
			value: `*Syntax: \`<>\` required, \`[]\` optional
            do not write \`<>\` or \`[]\`*
            
            This bot is being developed by <@${process.env.DEVID}>
            Please contact <@${process.env.DEVID}> about any bugs, suggestions or questions`,
			inline: false,
		});

		const emoji = bot.emojis.cache.get('815588419673391186');
		msg.author.send(
			embed({
				title: `${emoji} Help`,
				desc: `**Prefix:** \`${process.env.PREFIX}\`.`,
				fields,
			})
		);
	},
};
