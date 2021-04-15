require('dotenv').config();
const Discord = require('discord.js');
const fetch = require('node-fetch');
const { embed } = require('../utils');
const dao = require('../dao');

module.exports = {
	name: 'grz.post',
	description: 'post new cw stats',
	execute(msg, args, bot) {
		if (msg.author.id !== process.env.DEVID) return;

		if (msg.attachments.first()) {
			fetch(msg.attachments.first().url).then((response) => {
				response.arrayBuffer().then((res) => {
					var string = new TextDecoder().decode(res);
					let report = JSON.parse(string);
					report['war'] = parseInt(process.env.CURRENTWAR);
					dao.postReport(report);
				});
			});
		} else {
			let report = JSON.parse(args[0]);
			report['war'] = parseInt(process.env.CURRENTWAR);
			dao.postReport(report);
		}

		msg.delete({ timeout: 1500 }).then(
			(e) => e.channel.send(embed({ title: ':email: Post recieved' }))
			// .then((m) => m.delete({ timeout: 10000 }))
		);
	},
};
