require('dotenv').config();
const fs = require('fs');

module.exports = {
	name: 'grz.warnum',
	description: 'Dev cmd to change war number',
	execute(msg, args, bot) {
		if (msg.author.id !== process.env.DEVID) return;
		if (args.length !== 1) return msg.channel.send('Current war is ' + process.env.CURRENTWAR);
		if (isNaN(args[0])) return msg.channel.send('Not a number');

		const value = args[0];

		fs.readFile('./.env', 'utf8', (err, data) => {
			if (err) return console.error(err);

			env = data.split('\n');

			let target = env.findIndex((f) => f.split('=')[0] == 'CURRENTWAR');

			env[target] = env[target].split('=')[0] + '=' + value;

			process.env.CURRENTWAR = value;
			fs.writeFile('./.env', env.join('\n'), function (err) {
				if (err) return console.log(err);
				msg.channel.send('Current war changed to ' + value);
			});
		});
	},
};
