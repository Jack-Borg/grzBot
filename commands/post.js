require('dotenv').config();
const Discord = require('discord.js');
const fetch = require('node-fetch');
const { embed } = require('../utils');
const dao = require('../dao');

module.exports = {
	name: 'grz.post',
	description: 'post new cw stats',
	execute(msg, args, bot) {
		if (
			!msg.member.roles.cache.has(process.env.CAPTAINROLE) &&
			msg.author.id != process.env.LEADERID &&
			msg.author.id != process.env.DEVID
		)
			return;

		if (msg.attachments.first()) {
			fetch(msg.attachments.first().url).then((response) => {
				response.arrayBuffer().then((res) => {
					var string = new TextDecoder().decode(res);

					try {
						let report = JSON.parse(JSON.parse(string));
						report['war'] = parseInt(process.env.CURRENTWAR);
						console.log('str', report);
						dao.postReport(report);

						postRecieved(msg);
					} catch (e) {
						console.log('post attachment error:', e);
						return msg.channel.send(embed({ title: ':x: Incorrect input' }));
					}
				});
			});
		} else {
			try {
				let report = JSON.parse(JSON.parse(args[0]));
				console.log('arg', report);
				report['war'] = parseInt(process.env.CURRENTWAR);
				dao.postReport(report);
			} catch (e) {
				console.log('post inline error:', e);
				return msg.channel.send(embed({ title: ':x: Incorrect input' }));
			}
			postRecieved(msg);
		}
	},
};

function postRecieved(msg) {
	msg.delete({ timeout: 1500 }).then((e) =>
		e.channel.send(embed({ title: ':email: Post recieved', desc: `By: ${msg.author}` }))
	);

	setTimeout(function () {
		bot.commands.get('grz.stats').execute(undefined, ['3MTIwOD'], bot);
	}, 3000);
}
