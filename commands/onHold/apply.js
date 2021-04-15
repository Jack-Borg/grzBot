require('dotenv').config();
const Discord = require('discord.js');
const { embed } = require('../../utils');

module.exports = {
	name: 'grz.apply',
	description: 'apply cmd',
	execute(msg, args, bot) {
		if (
			msg.channel.id != process.env.APPLYCHANNEL ||
			msg.member.roles.cache.has(process.env.MEMBERROLE)
		)
			return;

		// msg.reply(new Discord.MessageEmbed().setTitle(':email: you got mail').setColor('#ffc800'));
		msg.reply(embed({ title: ':email: you got mail' }));

		const questions = ['IGN', 'Level', 'KDR', 'KPG', 'Nukes'];
		const questions2 = [
			{ text: 'IGN', filter: (response) => response.attachments.length > 0 },
			'Level',
			'KDR',
			'KPG',
			'Nukes',
		];

		//ask questions
		question(msg, questions).then((ans) => {
			// console.log(ans);
			//check for old application
			bot.channels.cache
				.get(process.env.APPLICATIONCHANNEL)
				.messages.fetch({}, true, true)
				.then((messages) =>
					messages.find(
						(m) =>
							m.author.id == process.env.BOTID &&
							m.embeds.length > 0 &&
							m.embeds[0].description.substring(2, 20) == msg.author.id
					)
				)
				.then((m) => {
					if (m) m.delete();
					const embed = new Discord.MessageEmbed()
						.setDescription(`<@${msg.author.id}> application`)
						.setColor('#ffc800');
					ans.forEach((a) => {
						embed.addField(a.q, a.ans, true);
					});
					bot.channels.cache.get(process.env.APPLICATIONCHANNEL).send(embed);
				});
		});
	},
};

async function question(msg, q) {
	return new Promise((resolve) => {
		const curr = q.shift();

		msg.member.send(embed({ title: 'What is your ' + curr + '?' })).then(function () {
			msg.author.dmChannel
				.awaitMessages((response) => response.author.id == msg.author.id, {
					max: 1,
					time: 300000,
					errors: ['time'],
				})
				.then(async (collected) => {
					console.log(collected);
					const ans = { q: curr, ans: collected.first().content };

					if (q.length == 0) {
						msg.member.send(embed({ title: 'Your application has been submitted' }));
						return resolve(ans);
					}

					question(msg, q).then((x) => {
						resolve([ans].concat(x));
					});
				})
				.catch(function (e) {
					msg.member.send('Time expired');
					console.log('error', e);
				});
		});
	});
}
