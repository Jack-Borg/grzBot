const Discord = require('discord.js');
const clanReq = require('../clanRequest');

module.exports = {
	name: 'grz.apply',
	description: 'Apply for clan',
	execute(msg, args, dao, bot) {
		if (msg.member.roles.cache.has('729731553663647826'))
			return msg.reply('You are already in GRZ');

		if (msg.channel.name !== '〔👑〕clan-recruitment') return;

		const reqRepo = new clanReq(dao);

		let appRequest = {};

		appRequest.id = msg.author.id;
		appRequest.tag = msg.author.tag;
		appRequest.date = new Date().toLocaleDateString();

		args.forEach((arg) => {
			arg = arg.split(':');

			switch (arg[0]) {
				case 'ign':
					appRequest.ign = arg[1];
					break;
				case 'lvl':
					appRequest.lvl = arg[1];
					break;
				case 'kdr':
					appRequest.kdr = parseFloat(arg[1]).toFixed(2);
					break;
				case 'kpg':
					appRequest.kpg = parseFloat(arg[1]).toFixed(2);
					break;
				case 'nukes':
					appRequest.nukes = arg[1];
					break;
			}
		});

		console.log(appRequest);

		if (
			!(
				appRequest.ign &&
				appRequest.lvl &&
				appRequest.kdr &&
				appRequest.kpg &&
				appRequest.nukes
			)
		)
			return msg.reply('missing argument');

		if (appRequest.lvl < 30 || isNaN(appRequest.lvl)) return msg.reply('not high enough lvl');
		else if (appRequest.kdr < 2.5 || isNaN(appRequest.kdr))
			return msg.reply('not high enough KDR');
		else if (appRequest.kpg < 15 || isNaN(appRequest.kpg))
			return msg.reply('not high enough KPG');
		else if (appRequest.nukes < 25 || isNaN(appRequest.nukes))
			return msg.reply('not enough Nukes');

		const embed = new Discord.MessageEmbed().setTitle(
			':white_check_mark: application accepted'
		);

		reqRepo.create(appRequest).then(
			(val) => msg.channel.send(embed),
			(val) => msg.reply('An error occurred')
		);

		// reqRepo.count().then((c) => {
		// 	bot.user.setPresence({
		// 		status: 'online', // You can show online, idle... Do not disturb is dnd
		// 		game: {
		// 			name: `${c['COUNT (id)']} Applications in queue`, // The message shown
		// 			type: 'WATCHING', // PLAYING, WATCHING, LISTENING, STREAMING,
		// 		},
		// 	});
		// });
	},
};
