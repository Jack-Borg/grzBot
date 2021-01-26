require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const clanRequest = require('../clanRequest');
bot.commands = new Discord.Collection();
const botCommands = require('./commands');
const AppDAO = require('./dao');

const dao = new AppDAO('./db/grzDB.sqlite3');

Object.keys(botCommands).map((key) => {
	bot.commands.set(botCommands[key].name, botCommands[key]);
});

const TOKEN = process.env.TOKEN;
requestRepo.createTable();

bot.login(TOKEN);

bot.on('ready', () => {
	console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', (msg) => {
	const args = msg.content.split(/ +/);
	let command = args.shift().toLowerCase();
	// console.log('-----');
	// console.log('args', args);
	// console.log('command', command);

	if (!bot.commands.has(command)) return;

	try {
		bot.commands.get(command).execute(msg, args, dao, bot);
	} catch (error) {
		console.error(error);
		msg.reply('there was an error trying to execute that command!');
	}
});
