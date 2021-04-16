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
	embed: function ({ title, desc, fields, stamp }) {
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
};
