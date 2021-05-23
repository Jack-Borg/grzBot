const Discord = require('discord.js');

module.exports = {
	numberFormat: function (n) {
		return new Intl.NumberFormat('da-DK', { maximumFractionDigits: 2 }).format(n);
	},
	minToHM: function (mins) {
		const h = parseInt(mins / 60);
		const m = mins % 60;
		return `${h}H ${m}M`;
	},
	msToDHM: function (millis) {
		let m = millis / 60000;
		let h = m / 60;
		let d = Math.floor(h / 24);

		m = Math.floor(m % 60);
		h = Math.floor(h % 24);

		return `${d > 0 ? d + 'd' : ''} ${h}h ${m}m`;
	},
	getRandomInt: function (min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min +1)) + min;
	},
	embed: function ({ title, desc, fields, stamp = false }) {
		const embed = new Discord.MessageEmbed().setColor('#ffc800');

		if (title) embed.setTitle(title);	
		
		if (desc) embed.setDescription(desc);

		if (fields) {
			for (const f of fields) {
				embed.addField(f.name, f.value, f.inline);
			}
		}

		if (stamp) embed.setTimestamp();

		return embed;
	},
	isDiscordId: function (id) {
		return !isNaN(id) && id.length == 18;
	},
	getEmoji: function (bot ,emojiName) {
		return emojiID = bot.emojis.cache.find((emoji) => emoji.name === emojiName);
	}
};
