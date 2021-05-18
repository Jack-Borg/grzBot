require('dotenv').config();
const { embed, numberFormat } = require('../utils/utils');

module.exports = {
	name: process.env.PREFIX + '.xp',
	description: 'class xp',
	execute(msg, args, bot) {
		if (args.length <= 1)
			return msg.channel.send(
				embed({
					title: ':x: Missing arguments',
					desc: `grz.xp \`<Current level>\` \`<Target level>\` \`[Optional current xp]\``,
				})
			);

		let currLvl = parseInt(args[0]);
		let tarLvl = parseInt(args[1]);
		let currentXp = args[2] ? parseInt(args[2]) : 0;

		if (currLvl < 1 || tarLvl < 1)
			return msg.channel.send(
				embed({
					title: ':x: Level cannot be lower than 1',
				})
			);

		if (currLvl > tarLvl)
			return msg.channel.send(
				embed({
					title: ':x: Current level cannot be larger than target level',
				})
			);

		if (currentXp > xp(currLvl))
			return msg.channel.send(
				embed({
					title: ':x: Current xp too large',
					desc: 'Current xp larger than required for current level',
				})
			);

		if (currLvl <= 0 || tarLvl <= 0 || currentXp < 0)
			return msg.channel.send(
				embed({
					title: ':x: Argument cannot be lower than 0',
				})
			);

		const totalReq = xp(tarLvl) - xp(currLvl) - currentXp;
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
	return Math.pow((lvl - 1) / 0.03, 2);
}

// const lvl = 94;
// const currentxp = 104915;
// const total = 9714915;

// console.log(Math.sqrt(total) * 0.03); // lvl from xp
// console.log(total-currentxp) // xp in current lvl
// console.log(Math.pow((lvl-1)/0.03,2)) // score for lvl
