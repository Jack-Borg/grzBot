require('dotenv').config();
const { getSoldierHistory: newGetSoldierReport } = require('../dao');
const { numberFormat, minToHM, embed } = require('../utils');

module.exports = {
	name: 'grz.hist',
	description: 'history cmd',
	execute(msg, args, bot) {
		if (msg.author.id !== process.env.DEVID) return;

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
		wars.push(w.war);
		kills.push(numberFormat(w.score.kills));
		time.push(minToHM(w.score.minutesSpent));
	});

	const fields = [
		{ name: 'Wars', value: wars },
		{ name: 'Kills', value: kills },
		{ name: 'Time left', value: time },
	];

	return embed({ title: r.name.replace('_', '\\_') + ' history', fields });
}
