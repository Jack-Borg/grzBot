require('dotenv').config();
const { embed, numberFormat } = require('../utils');

module.exports = {
	name: 'grz.xp',
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

		console.log('cur', currentXp);
		console.log('cur lvl xp', xp(currLvl));
		// if (args.length >= 2) {
		// 	currLvl = parseInt(args[0]);
		// 	tarLvl = parseInt(args[1]);
		//     currentXp = parseInt(args[2])
		// }

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

		const totalReq = xpToTarget(currLvl, tarLvl) - currentXp;
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
