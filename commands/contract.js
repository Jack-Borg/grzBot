require('dotenv').config();
const Discord = require('discord.js');
const { embed, msToDHM, numberFormat } = require('../utils/utils');
const table = require('table');
const contractStats = require('../utils/classes/contractStats');

module.exports = {
	name: process.env.PREFIX+'.contract',
	description: 'Contract command',
	async execute(msg, args, bot, socket) {
		if (
			msg.author.id !== process.env.DEVID &&
			!msg.member.roles.cache.has(process.env.MEMBERROLE)
		)
			return;

		if (args.length == 0) {
			return msg.channel.send(
				embed({
					title: ':x: Missing arguments',
					desc: process.env.PREFIX+`.contract \`<Player>\` `,
				})
			);
		}

		try {
			await socket.connected();
            const playerName = args.join(' ');
			const data = await socket.clan("grz");
			var playerIndex;
			for(var i=0;i<data[3].members.length;i++) {
				if(data[3].members[i].p === playerName) {
					playerIndex=i;
					break;
				}
			}
			if(playerIndex == null) {
				msg.reply(embed({ title: ':x: Player is probably not in GrZ' }));
			}
			else {

				contract = new contractStats(data, playerIndex);

				const TableData = createTable(contract);
				const TableConfig = {
					border: table.getBorderCharacters(`ramac`),
				};
				const desc = `\`\`\`css\n${table.table(TableData, TableConfig)}\`\`\``;
				msg.reply(embed({ title: contract.name(), desc }));
			}
		} catch (e) {
			console.error('e', e);
			bot.users.cache
				.find((user) => user.id === process.env.DEVID)
				.send(embed({ title: 'contract error', desc: 'contract: ' + args.join(' ') }));
			msg.reply(embed({ title: ':x: Unable to get contract' }));
		}
	},
};

function createTable(contract) {
	const kpm = contract.kills() / ((contract.timePlayed()/60000)<180 ? (contract.timePlayed()/60000) : 180);
	const kpg = kpm*4;
	const estKills = kpm * 60 * 3;
	const kd = contract.kills()/contract.deaths()
	return [
		[
			'Name',
			'Value',
		],
		[
		    '[Kills]\n[Time Played]\n[KPM]\n[KPG]\n[est.Total]\n\n[Deaths]\n[K/D]',
			numberFormat(contract.kills())+'\n'+
			msToDHM(contract.timePlayed())+'\n'+
			numberFormat(kpm)+'\n'+
			numberFormat(kpg)+'\n'+
			numberFormat(estKills)+'\n\n'+
			numberFormat(contract.deaths())+'\n'+
			numberFormat(kd)
		]
	];
}
