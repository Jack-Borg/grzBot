require('dotenv').config();
const Discord = require('discord.js');
const { embed, msToDHM, numberFormat, isDiscordId } = require('../utils/utils');
const { getPlayerByDiscord } = require('../utils/dao');
const table = require('table');
const profile = require('../utils/classes/profile');

module.exports = {
	name: process.env.PREFIX + '.pf',
	description: 'Profile command',
	async execute(msg, args, bot, socket) {
		if (
			msg.author.id !== process.env.DEVID &&
			!msg.member.roles.cache.has(process.env.MEMBERROLE)
		)
			return;

		let arg = args.join(' ');
		if (msg.mentions.members.first()) arg = msg.mentions.members.first().id;
		else if (args.length == 0) arg = msg.author.id;

		if (isDiscordId(arg)) {
			const player = await getPlayerByDiscord(arg);
			if (!player) {
				return msg.channel.send(
					embed({
						title: ':x: Profile not found',
						desc:
							process.env.PREFIX +
							`.pf \`[username]\` 
                            Linked account required to use command with no \`[username]\`
                            Ask <@${process.env.DEVID}> or <@${process.env.DEV2ID}> for account linking`,
					})
				);
			}
			pf(player.name, msg, bot, socket);
		} else pf(arg, msg, bot, socket);
	},
};

async function pf(name, msg, bot, socket) {
	try {
		await socket.connected();
		const data = await socket.profile(name);
		const pf = new profile(data);

		const TableData = newCreateTable(pf);
		const TableConfig = {
			border: table.getBorderCharacters(`ramac`),
		};

		const desc = `\`\`\`css\n${table.table(TableData, TableConfig)}\`\`\``;
		msg.reply(embed({ title: pf.name, desc }));
	} catch (e) {
		console.error('e', e);
		bot.users.cache
			.find((user) => user.id === process.env.DEVID)
			.send(
				embed({
					title: 'pf error',
					desc: `pf: ${name}\nBy: <@${msg.author.id}>\nIn: <#${msg.channel.id}>`,
				})
			);
		msg.reply(embed({ title: ':x: Unable to get profile' }));
	}
}

function newCreateTable(pf) {
	return [
		[
			'LVL\n' + pf.lvl,
			'Challenge\n' + pf.challenge,
			'KR\n' + numberFormat(pf.kr),
			'Score\n' + numberFormat(pf.score),
		],
		[
			'SPK\n' + numberFormat(pf.spk),
			'Kills\n' + numberFormat(pf.kills),
			'Deaths\n' + numberFormat(pf.deaths),
			'KDR\n' + numberFormat(pf.kd),
		],
		[
			'KPG\n' + numberFormat(pf.kpg),
			'Games\n' + numberFormat(pf.games),
			'W/L\n' + numberFormat(pf.wl),
			'Wins\n' + numberFormat(pf.wins),
		],
		[
			'Losses\n' + numberFormat(pf.losses),
			'Assists\n' + numberFormat(pf.assists),
			'Nukes\n' + numberFormat(pf.nukes),
			'KR-Packages\n' + numberFormat(pf.kr_packages),
		],
		[
			'Melee\n' + numberFormat(pf.melee),
			'Beatdowns\n' + numberFormat(pf.beatdowns),
			'Bullseyes\n' + numberFormat(pf.bullseyes),
			'Headshots\n' + numberFormat(pf.headshots),
		],
		[
			'Wallbangs\n' + numberFormat(pf.wallbangs),
			'Sprays Placed\n' + numberFormat(pf.sprays),
			'Accuracy\n' + numberFormat(pf.accuracy) + '%',
			'Time Played\n' + msToDHM(pf.timePlayed),
		],
	];
}
