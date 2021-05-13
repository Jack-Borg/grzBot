require('dotenv').config();
const { getSoldierHistory: newGetSoldierReport } = require('../dao');
const { numberFormat, minToHM, embed } = require('../utils');

module.exports = {
	name: process.env.PREFIX+'.hist',
	description: 'history cmd',
	execute(msg, args, bot) {
		if (
			!msg.member.roles.cache.has(process.env.CAPTAINROLE) &&
			msg.author.id != process.env.LEADERID &&
			msg.author.id != process.env.DEVID
		)
			return;

		newGetSoldierReport(args[0]).then((soldier) => {
			if (!soldier)
				return msg.channel.send(embed({ title: args[0] + ' not found', stamp: false }));

			msg.channel.send(soldierEmbed(soldier));
		});
	},
};

function soldierEmbed(r) {
	const wars = [];
	const kills = [];
	const time = [];

	r.wars.forEach((w) => {
		const contractLength = w.war <= 3 ? 240 : 180;
		wars.push(w.war);
		kills.push(numberFormat(w.score.kills));
		time.push(minToHM(contractLength - w.score.minutesSpent));
	});

	const fields = [
		{ name: 'Wars', value: wars, inline: true },
		{ name: 'Kills', value: kills, inline: true },
		{ name: 'Time left', value: time, inline: true },
	];

	return embed({ title: r.name.replace('_', '\\_') + ' history', fields });
}
