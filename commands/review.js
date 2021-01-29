// const Discord = require('discord.js');
// const clanReq = require('../clanRequest');

// module.exports = {
// 	name: 'grz.review',
// 	description: 'Testers review of applicant',
// 	execute(msg, args, dao, bot) {
// 		// console.log('msg', msg);
// 		// console.log('args', args);

// 		const reqRepo = new clanReq(dao);

// 		// console.log(msg.mentions.users.first().id);
// 		// console.log(Object.keys(msg.mentions.users));

// 		reqRepo.getById(msg.mentions.users.first().id).then(
// 			(val) => {
// 				const embed = new Discord.RichEmbed();
// 				embed.setDescription(`
//                     IGN: ${val.ign}
//                     Level: ${val.lvl}
//                     KDR: ${val.kdr}
//                     KPG: ${val.kpg}
//                     Nukes: ${val.nukes}
//                 `);

// 				msg.channel.send(embed).then((msg) => {
// 					msg.react('❌');
// 					msg.react('✅');
// 				});
// 			},
// 			(val) => msg.reply('An error occurred')
// 		);
// 	},
// };
