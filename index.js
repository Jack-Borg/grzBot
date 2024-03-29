require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const botCommands = require('./commands');
let socket = require('./utils/socket/socket');

Object.keys(botCommands).map((key) => {
	bot.commands.set(botCommands[key].name, botCommands[key]);
});

bot.login(process.env.TOKEN);

bot.on('ready', () => {
	console.info(`Logged in as ${bot.user.tag}!`);
	bot.user.setActivity(process.env.PREFIX + '.help', {
		type: 'LISTENING',
	});
});

bot.on('message', (msg) => {
	const args = msg.content.split(/ +/);
	let command = args.shift().toLowerCase();
	// console.log('-----');
	// console.log('args', args);
	// console.log('command', command);

	// if (msg.author.id != process.env.DEVID) {
	// 	console.log(msg.author.username + ': ', msg.content);
	// }

	if (!bot.commands.has(command) || msg.channel.type == 'dm') return;

	try {
		bot.commands.get(command).execute(msg, args, bot, socket);
	} catch (error) {
		console.error(error);
		msg.reply('there was an error trying to execute that command!');
	}
});
