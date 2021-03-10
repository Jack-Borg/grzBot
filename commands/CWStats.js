require('dotenv').config();
const Discord = require('discord.js');
var MongoClient = require('mongodb').MongoClient;
var Promise = require('rsvp').Promise;

module.exports = {
	name: 'grz.stats',
	description: 'Clan War Stats',
	execute(msg, args, bot) {
		if (
			args[0] != '3MTIwOD' &&
			msg.channel.id != process.env.CWMANAGECHANNEL &&
			msg.author.id != process.env.LEADERID &&
			msg.author.id != process.env.DEVID
		)
			return;

		if (args[0] == '3MTIwOD') {
			getSoldiers(parseInt(process.env.CURRENTWAR)).then((soldiers) => {
				if (!soldiers)
					return bot.channels.cache
						.get(process.env.CWSTATSCHANNEL)
						.send(new Discord.MessageEmbed().setDescription('war: ' + args[0]));

				soldiers.sort((a, b) => b.last.kills - a.last.kills);
				bot.channels.cache
					.get(CWSTATSCHANNEL)
					.send(clanEmbed(soldiers, process.env.CURRENTWAR));
			});
			return;
		}

		if (args.length == 0) args[0] = process.env.CURRENTWAR;

		if (isNaN(args[0])) {
			getSoldier(args[0], args[1]).then((soldier) => {
				if (!soldier)
					return msg.channel.send(
						new Discord.MessageEmbed()
							.setDescription(args[0] + ' not found')
							.setColor('#ffc800')
					);

				msg.channel.send(soldierEmbed(soldier));
			});
		} else {
			getSoldiers(parseInt(args[0])).then((soldiers) => {
				if (!soldiers) {
					msg.channel.send(new Discord.MessageEmbed().setDescription('war: ' + args[0]));
					return;
				}
				soldiers.sort((a, b) => b.last.kills - a.last.kills);
				msg.channel.send(clanEmbed(soldiers, args[0]));
			});
		}
	},
};

function soldierEmbed(s) {
	const embed = new Discord.MessageEmbed()
		.setTitle(s.name.replace('_', '\\_') + ' report')
		.setColor('#ffc800')
		.setTimestamp();

	const timeLeft = minToHM(s.last.minutesSpent);
	const kpm = (s.last.kills / s.last.minutesSpent).toFixed(2);
	const totalKills = (kpm * 240).toFixed(2);

	embed.addFields(
		{ name: 'kills', value: s.last.kills, inline: true },
		{ name: 'time left', value: timeLeft, inline: true },
		{ name: 'kpm', value: kpm, inline: true },
		{ name: 'est. total kills', value: totalKills, inline: true }
	);
	return embed;
}

function clanEmbed(soldiers, warN) {
	const embed = new Discord.MessageEmbed()
		.setTitle('Report: war ' + warN)
		.setColor('#ffc800')
		.setTimestamp();
	const names = [];
	const kills = [];
	const kpm = [];
	const time = [];

	soldiers.forEach((s) => {
		names.push(s.name.replace('_', '\\_'));
		kills.push(s.last.kills);
		kpm.push((s.last.kills / s.last.minutesSpent).toFixed(2));
		time.push(minToHM(s.last.minutesSpent));
	});
	embed.addFields(
		{ name: 'name', value: names.join('\n'), inline: true },
		{ name: 'kills', value: kills.join('\n'), inline: true },
		{ name: 'time left', value: time.join('\n'), inline: true }
	);

	return embed;
}

function minToHM(mins) {
	const timeLeft = 240 - mins;
	const h = parseInt(timeLeft / 60);
	const m = timeLeft % 60;
	return `${h}H ${m}M`;
}

const dbUser = process.env.MONGOUSER;
const dbPass = process.env.MONGOPASS;
const dbName = process.env.MONGODBNAME;
const url = `mongodb+srv://${dbUser}:${dbPass}@mongodb.ikrgp.mongodb.net/${dbName}?retryWrites=true&w=majority`;

async function getSoldiers(warN) {
	return new Promise((resolve, reject) => {
		MongoClient.connect(
			url,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			},
			function (err, db) {
				if (err) throw err;
				var dbo = db.db('Krunker');

				dbo.collection('wars')
					.find({ war: warN })
					.toArray((err, result) => {
						if (err) reject(err);
						resolve(result);
					});
			}
		);
	});
}

async function getSoldier(name, warNumber = process.env.CURRENTWAR) {
	return new Promise((resolve, reject) => {
		MongoClient.connect(
			url,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			},
			function (err, db) {
				if (err) throw err;
				var dbo = db.db('Krunker');

				dbo.collection('wars')
					.findOne({ name: { $regex: new RegExp(name, 'i') }, war: parseInt(warNumber) })
					.then((result) => {
						resolve(result);
					})
					.catch((err) => console.error(`Failed to find document: ${err}`));
			}
		);
	}).catch((err) => console.error(`Failed to find document: ${err}`));
}
