require('dotenv').config();
const { getSoldier } = require('../utils/dao');
const table = require('table');
const { numberFormat, msToDHM, embed } = require('../utils/utils');

module.exports = {
	name: process.env.PREFIX + '.hist',
	description: 'history cmd',
	execute(msg, args, bot) {
		if (
			!msg.member.roles.cache.has(process.env.CAPTAINROLE) &&
			msg.author.id != process.env.LEADERID &&
			msg.author.id != process.env.DEVID
		)
			return;

		getSoldier(args[0]).then((s) => {
			if (!s) return msg.channel.send(embed({ title: args[0] + ' not found' }));

			msg.channel.send(soldierEmbed(s));
		});
	},
};

function soldierEmbed(s) {
	const hist = [['War', 'Kills', 'Time Spent']];
	const wars = Object.values(s.wars);
	const avgKills = wars.reduce((a, b) => a + b.kills, 0) / wars.length;
	const avgKpm = wars.reduce((a, b) => a + b.kills / (b.timePlayed / 60000), 0) / wars.length;

	for (let n in s.wars) {
		hist.push([n, numberFormat(s.wars[n].kills), msToDHM(s.wars[n].timePlayed)]);
	}

	const fields = [
		{ name: 'Average kills', value: numberFormat(avgKills), inline: true },
		{ name: 'Average kpm', value: numberFormat(avgKpm), inline: true },
	];

	const config = {
		border: table.getBorderCharacters(`ramac`),
		drawHorizontalLine: (lineIndex, rowCount) => {
			return lineIndex === 0 || lineIndex === 1 || lineIndex === rowCount;
		},
	};

	const desc = `\`\`\`css\n${table.table(hist, config)}\`\`\``;

	return embed({ title: s.name.split('_').join('\\_') + ' history', desc, fields });
}
