require('dotenv').config();
const Discord = require('discord.js');
const { embed, numberFormat } = require('../utils');

module.exports = {
	name: 'grz.xp',
	description: 'class xp',
	execute(msg, args, bot) {
		if (args.length == 0) return msg.channel.send(embed({ title: 'error msg' }));

		let currLvl = 0;
		let tarLvl = 0;

		if (args.length == 1) {
			currLvl = 1;
			tarLvl = args[0];
			// if (tarLvl > 1000)
			// 	return msg.channel.send(
			// 		embed({
			// 			title: ':x: Number too large',
			// 			desc: 'Largest supported level is 1000',
			// 		})
			// 	);
			// msg.channel.send(xpTo(args[0]));
		} else if (args.length == 2) {
			currLvl = args[0];
			tarLvl = args[1];
		}
		if (currLvl < 1 || tarLvl < 1)
			return msg.channel.send(
				embed({
					title: ':x: Level cannot be lower than 1',
				})
			);

		if (tarLvl > 1000)
			return msg.channel.send(
				embed({
					title: ':x: Number too large',
					desc: 'Largest supported level is 1000',
				})
			);

		if (currLvl > tarLvl)
			return msg.channel.send(
				embed({
					title: ':x: Current level cannot be larger than target level',
				})
			);

		const totalReq = xpToTarget(currLvl, tarLvl);
		const desc = `
                Current level: \`${currLvl}\`
                Target level: \`${tarLvl}\`

                Total XP required: \`${numberFormat(totalReq)}\`
                Games required with an average score of 3000: \`${numberFormat(totalReq / 3000)}\`
                `;

		msg.channel.send(
			embed({
				title: 'Class XP calculator',
				desc,
			})
		);
	},
};

function xp(lvl) {
	if (lvl == 2) return 4444;

	const res = 1111 + 2222 * (lvl - 1);

	return res + parseInt(res / 10000);
}

function xpTo(lvl) {
	let total = 0;
	for (let i = 1; i < lvl; i++) {
		total += xp(i);
	}
	return total;
}

function xpToTarget(currLvl, tarLvl) {
	return xpTo(tarLvl) - xpTo(currLvl);
}
