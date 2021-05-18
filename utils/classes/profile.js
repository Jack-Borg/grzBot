module.exports = class {
	constructor(pfData) {
		// this.pfData = pfData;
		// this.pfStats = new Function('return ' + pfData[3]['player_stats'])();
		let pfStats = JSON.parse(pfData[3]['player_stats']);
		if (!pfStats) pfStats = {};

		this.classes = {};
		for (let key in pfStats) {
			if (key.startsWith('c') && !isNaN(key.slice(-1))) this.classes[key] = pfStats[key];
		}

		this.name = pfData[3]['player_name'];
		this.id = pfData[3]['player_id'];
		this.kills = pfData[3]['player_kills'];
		this.wins = pfData[3]['player_wins'];
		this.games = pfData[3]['player_games_played'];
		this.deaths = pfData[3]['player_deaths'];
		this.timePlayed = pfData[3]['player_timeplayed'];
		this.kr = pfData[3]['player_funds'];
		this.score = pfData[3]['player_score'];
		this.verified = pfData[3]['player_featured'];
		this.clan = pfData[3]['player_clan'];
		this.hackertag = pfData[3]['player_hack'];
		this.following = pfData[3]['player_following'];
		this.followers = pfData[3]['player_followed'];
		this.createdOn = pfData[3]['player_datenew'];
		this.region = pfData[3]['player_region'];
		this.MMR1 = pfData[3]['player_elo'];
		this.MMR2 = pfData[3]['player_elo2'];
		this.MMR4 = pfData[3]['player_elo4'];
		this.challenge = pfData[3]['player_chal'];
		this.krunkitis = pfData[3]['player_infected'];
		this.premiumName = pfData[3]['player_alias'];
		this.premium = 0 < pfData[3]['player_premium'] ? 1 : 0;
		this.partner = pfData[3]['partner_approved'];
		this.twitchName = pfData[3]['player_twitchname'];

		this.nukes = pfStats['n'];
		this.bullseyes = pfStats['tmk'];
		this.headshots = pfStats['hs'];
		this.beatdowns = pfStats['fk'];
		this.wallbangs = pfStats['wb'];
		this.melee = pfStats['mk'];
		this.sprays = pfStats['spry'];
		this.assists = pfStats['ast'];
		this.shots = pfStats['s'];
		this.hits = pfStats['h'];
		this.kr_packages = pfStats['ad'];

		this.kd = this.kills / this.deaths;
		this.kpg = this.kills / this.games;
		this.dpg = this.deaths / this.games;
		this.spk = this.score / this.kills;
		this.accuracy = this.shots ? ((this.hits || 0) / this.shots) * 100 : 0;
		this.losses = this.games - this.wins;
		this.wl = this.wins / this.losses;
		this.lvl = Math.floor(0.03 * Math.sqrt(this.score));
	}

	class(classNumber) {
		return this.classes['c' + classNumber];
	}
};
/*
class 0 = ak
class 1 = sniper
class 2 = smg
class 3 = lmg
class 4 = shotgun
class 5 = revolver
class 6 = semi auto
class 7 = rocket
class 8 = akimbo
class 9 = runner
class 11 = crossbow
class 12 = famas
class 13 = trooper

tmk = bullseye
hs = headshot
fk = beatdown
wb = wallbang
n = nukes
mk = melee
spry = sprays
ast = assist*/
