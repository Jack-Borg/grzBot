require('dotenv').config();
const Discord = require('discord.js');
const { embed } = require('../utils');
const profile = require('../profile');

module.exports = {
	name: 'grz.roles',
	description: 'get roles cmd',
	async execute(msg, args, bot, socket) {
		if (msg.author.id !== process.env.DEVID) return;

		try {
			await socket.connected();
			if (args.length == 0) {
				return msg.channel.send(
					embed({
						title: ':x: Missing arguments',
						desc: `grz.roles \`<Player>\` `,
					})
				);
			}
			const data = await socket.profile(args.join(' '));
			const pf = new profile(data);

			const user = msg.guild.members.cache.find((m) => m.id == msg.author.id);

			let desRoles = getDeservedRoles(pf.nukes(), pf.kd(), pf.lvl(), pf.challenge());

			const notDesRoles = allRolesList()
				.filter((r) => !desRoles.includes(r))
				.map((r) => msg.guild.roles.cache.get(r));

			user.roles.remove(notDesRoles).catch(console.error);

			desRoles = desRoles.map((r) => msg.guild.roles.cache.get(r));

			setTimeout(function () {
				user.roles.add(desRoles).catch(console.error);

				msg.reply(embed({ title: ':white_check_mark: Your roles have been updated' }));
			}, 500);
		} catch (e) {
			console.error('e', e);
			bot.users.cache
				.find((user) => user.id === process.env.DEVID)
				.send(embed({ title: 'roles error' }));
			msg.reply(embed({ title: ':x: Unable to get profile' }));
		}
	},
};

function getDeservedRoles(n, kd, l, chal) {
	const deservedRoles = [];

	switch (true) {
		case n >= 1000:
			deservedRoles.push(process.env.N1000);
			break;
		case n >= 750:
			deservedRoles.push(process.env.N750);
			break;
		case n >= 500:
			deservedRoles.push(process.env.N500);
			break;
		case n >= 400:
			deservedRoles.push(process.env.N400);
			break;
		case n >= 250:
			deservedRoles.push(process.env.N250);
			break;
		case n >= 100:
			deservedRoles.push(process.env.N100);
			break;
		case n >= 50:
			deservedRoles.push(process.env.N50);
			break;
	}

	switch (true) {
		case kd >= 10:
			deservedRoles.push(process.env.KD10);
			break;
		case kd >= 9:
			deservedRoles.push(process.env.KD9);
			break;
		case kd >= 8:
			deservedRoles.push(process.env.KD8);
			break;
		case kd >= 7:
			deservedRoles.push(process.env.KD7);
			break;
		case kd >= 6:
			deservedRoles.push(process.env.KD6);
			break;
		case kd >= 5:
			deservedRoles.push(process.env.KD5);
			break;
		case kd >= 4:
			deservedRoles.push(process.env.KD4);
			break;
		case kd >= 3:
			deservedRoles.push(process.env.KD3);
			break;
		case kd >= 2:
			deservedRoles.push(process.env.KD2);
			break;
	}

	switch (true) {
		case chal >= 30:
			deservedRoles.push(process.env.C30);
			break;
		case chal >= 25:
			deservedRoles.push(process.env.C25);
			break;
		case chal >= 20:
			deservedRoles.push(process.env.C20);
			break;
		case chal >= 15:
			deservedRoles.push(process.env.C15);
			break;
	}

	switch (true) {
		case l >= 200:
			deservedRoles.push(process.env.L200);
			break;
		case l >= 175:
			deservedRoles.push(process.env.L175);
			break;
		case l >= 150:
			deservedRoles.push(process.env.L150);
			break;
		case l >= 125:
			deservedRoles.push(process.env.L125);
			break;
		case l >= 100:
			deservedRoles.push(process.env.L100);
			break;
		case l >= 75:
			deservedRoles.push(process.env.L75);
			break;
		case l >= 50:
			deservedRoles.push(process.env.L50);
			break;
	}

	return deservedRoles;
}

function allRolesList() {
	return [
		process.env.N1000,
		process.env.N750,
		process.env.N500,
		process.env.N400,
		process.env.N250,
		process.env.N100,
		process.env.N50,
		process.env.L200,
		process.env.L175,
		process.env.L150,
		process.env.L125,
		process.env.L100,
		process.env.L75,
		process.env.L50,
		process.env.KD10,
		process.env.KD9,
		process.env.KD8,
		process.env.KD7,
		process.env.KD6,
		process.env.KD5,
		process.env.KD4,
		process.env.KD3,
		process.env.KD2,
		process.env.C30,
		process.env.C25,
		process.env.C20,
		process.env.C15,
	];
}
