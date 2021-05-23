require('dotenv').config();
const Discord = require('discord.js');
const { linkAccount, getPlayerByName, getPlayerByDiscord } = require('../utils/dao');
const { embed,getEmoji } = require('../utils/utils');
const profile = require('../utils/classes/profile');
const { NumToRegion, RandomRegion } = require('../utils/classes/region');

module.exports = {
	name: process.env.PREFIX + '.link',
	description: 'linking cmd',
	async execute(msg, args, bot, socket) {
		//if (msg.author.id !== process.env.DEVID && msg.author.id !== process.env.DEV2ID) return;

		if (args.length != 1) return msg.channel.send(embed({ title: 'Missing argument' }));

		let arg = args.join(' ');
		
		await socket.connected();
		const data = await socket.profile(arg);
		const pf = new profile(data);
		
		let RegionToVerify = RandomRegion(pf.flag);

		const desc = 
		`**4 Steps**
		\n > **1.** Set your country flag in krunker to \`\`${NumToRegion(RegionToVerify)}\`\`.
		\n > **2.** Join a lobby, otherwise country flag won't change!!!
		\n > **3.** Refresh the game. (use F5 on client)
		\n > **4.** React below to this message.
		\n You have 5 minutes to react.`
		m = msg.reply(embed({title: 'Verify your account', desc})).then((m)=> {
			m.react('✅');
			m.react('❌');
			const filter = (reaction, user) => {
				return ['✅', '❌'].includes(reaction.emoji.name) && user.id === msg.author.id;
			};
			
			m.awaitReactions(filter, { max: 1, time: 1000*60*5, errors: ['time'] })
				.then(collected => {
					const reaction = collected.first();
			
					if (reaction.emoji.name === '✅') {
						verify(pf.name, msg, bot, RegionToVerify, socket)
					} else {
						msg.reply(embed({title: 'Process canceled.'}));
					}
				})
				.catch(collected => {
					msg.reply('Process canceled.');
			    });
		})

	},
};

async function verify(name, msg, bot, RegionToVerify, socket) {
	try {
		const data_later = await socket.profile(name); 
		const pf_later = new profile(data_later);      // _later because without that it uses data from the first profile request (same with pf)
		if (pf_later.flag == RegionToVerify) {
			linkAccount(msg.author.id, pf_later.name)
			msg.reply(embed({title: 'Successfull linked'}))
		}
		else {
			msg.reply(embed({title : 'Account wasn\'t verified.'}))
		}
	} catch (e) {
		console.error('e', e);
		bot.users.cache
			.find((user) => user.id === process.env.DEVID)
			.send(
				embed({
					title: 'linking pf error',
					desc: `linking pf: ${name}\nBy: <@${msg.author.id}>\nIn: <#${msg.channel.id}>`,
				})
			);
		msg.reply(embed({ title: ':x: Unable to link the account.' }));
	}
}
