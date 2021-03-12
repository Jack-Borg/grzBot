const Discord = require('discord.js');

module.exports = {
	numberFormat: function (n) {
		return new Intl.NumberFormat('de-DE').format(n);
	},
	minToHM: function (mins) {
		const timeLeft = 240 - mins;
		const h = parseInt(timeLeft / 60);
		const m = timeLeft % 60;
		return `${h}H ${m}M`;
	},
	embed: function ({ title, desc, fields, stamp }) {
		const embed = new Discord.MessageEmbed().setColor('#ffc800');

		if (title) embed.setTitle(title);
		if (desc) embed.setDescription(desc);

		if (fields) {
			for (const f of fields) {
				embed.addField(f.name, f.value, true);
			}
		}

		if (stamp) embed.setTimestamp();

		return embed;
	},
};
