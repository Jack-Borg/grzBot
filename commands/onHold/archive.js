require('dotenv').config();
const Discord = require('discord.js');
const { embed } = require('../../utils');

module.exports = {
	name: 'grz.archive',
	description: 'archiving applications',
	execute(msg, args, bot) {
		const ans = args[0].toLowerCase();
		let result = '';

		if (ans == 'accept') {
			result = 'Accepted';
		} else if (ans == 'decline') {
			result = 'Declined';
		} else {
			return msg.reply(embed({ title: 'Invalid argument' }));
		}
		msg.channel.messages.fetch(msg.reference.messageID).then((m) => {
			msg.delete();

			msg.channel.messages.fetch(m.id).then((a) => a.delete());

			bot.channels.cache
				.get('814871788734382080')
				.send(m.embeds[0].addField(result + ' by', msg.author));
		});
	},
};
