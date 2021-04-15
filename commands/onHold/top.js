require('dotenv').config();
const { getAllWarReport } = require('../dao');
const { numberFormat, minToHM, embed } = require('../utils');

module.exports = {
	name: 'grz.top',
	description: 'Clan War top soldiers',
	execute(msg, args, bot) {
		if (
			msg.channel.id != process.env.CWMANAGECHANNEL &&
			msg.author.id != process.env.LEADERID &&
			msg.author.id != process.env.DEVID
		)
			return;

		getAllWarReport().then((soldiers) => {
			let tmp = {};

			soldiers.forEach((s) => {
				if (tmp[s.name]) return tmp[s.name].push({ war: s.war, score: s.last });
				tmp[s.name] = [{ war: s.war, score: s.last }];
			});

			scores = [];
			for (const k in tmp) {
				const sol = tmp[k];

				let kills;
				let kpm;
				if (sol.length > 1) {
					kills = sol.reduce((a, b) => a.score.kills + b.score.kills) / sol.length;
					kpm =
						kills /
						(sol.reduce((a, b) => a.score.minutesSpent + b.score.minutesSpent) /
							sol.length);
				} else {
					kills = sol[0].score.kills;
					kpm = kills / sol[0].score.minutesSpent;
				}

				scores.push({
					name: k,
					kills,
					kpm,
				});
			}

			msg.channel.send(embed(clanEmbed(scores.sort((a, b) => b.kpm - a.kpm))));
		});
	},
};

function clanEmbed(soldiers) {
	const names = [];
	const kills = [];
	const kpm = [];

	soldiers.forEach((s) => {
		names.push(s.name.replace('_', '\\_'));
		kills.push(numberFormat(s.kills));
		kpm.push(s.kpm.toFixed(2));
	});

	const fields = [
		{ name: 'Name', value: names.join('\n'), inline: true },
		{ name: 'Kills', value: kills.join('\n'), inline: true },
		{ name: 'KPM', value: kpm, inline: true },
	];

	return embed({ title: 'Top soldiers', fields });
}
