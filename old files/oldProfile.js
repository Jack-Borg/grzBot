module.exports = class {
	constructor(pfData) {
		this.pfData = pfData;
		this.pfStats = new Function('return ' + pfData[3]['player_stats'])();
	}
	name() {
		return this.pfData[3]['player_name'];
	}
	id() {
		return this.pfData[3]['player_id'];
	}
	kills() {
		return this.pfData[3]['player_kills'];
	}
	wins() {
		return this.pfData[3]['player_wins'];
	}
	games() {
		return this.pfData[3]['player_games_played'];
	}
	deaths() {
		return this.pfData[3]['player_deaths'];
	}
	timeplayed() {
		return this.pfData[3]['player_timeplayed'];
	}
	kr() {
		return this.pfData[3]['player_funds'];
	}
	score() {
		return this.pfData[3]['player_score'];
	}
	verified() {
		return this.pfData[3]['player_featured'];
	}
	clan() {
		return this.pfData[3]['player_clan'];
	}
	hackertag() {
		return this.pfData[3]['player_hack'];
	}
	following() {
		return this.pfData[3]['player_following'];
	}
	followers() {
		return this.pfData[3]['player_followed'];
	}
	createdOn() {
		return this.pfData[3]['player_datenew'];
	}
	region() {
		return this.pfData[3]['player_region'];
	}
	MMR1() {
		return this.pfData[3]['player_elo'];
	}
	MMR2() {
		return this.pfData[3]['player_elo2'];
	}
	MMR4() {
		return this.pfData[3]['player_elo4'];
	}
	challenge() {
		return this.pfData[3]['player_chal'];
	}
	krunkitis() {
		return this.pfData[3]['player_infected'];
	}
	premiumName() {
		return this.pfData[3]['player_alias'];
	}
	premium() {
		if (0 < this.pfData[3]['player_premium']) {
			return 1;
		} else {
			return 0;
		}
	}
	partner() {
		return this.pfData[3]['partner_approved'];
	}
	twitchName() {
		return this.pfData[3]['player_twitchname'];
	}
	nukes() {
		return this.pfStats['n'];
	}
	bullseyes() {
		return this.pfStats['tmk'];
	}
	headshots() {
		return this.pfStats['hs'];
	}
	beatdowns() {
		return this.pfStats['fk'];
	}
	wallbangs() {
		return this.pfStats['wb'];
	}
	melee() {
		return this.pfStats['mk'];
	}
	sprays() {
		return this.pfStats['spry'];
	}
	assists() {
		return this.pfStats['ast'];
	}
	shots() {
		return this.pfStats['s'];
	}
	hits() {
		return this.pfStats['h'];
	}
	kd() {
		return this.kills() / this.deaths();
	}
	kpg() {
		return this.kills() / this.games();
	}
	dpg() {
		return this.deaths() / this.games();
	}
	spk() {
		return this.score() / this.kills();
	}
	accuracy() {
		return (this.shots() ? ((this.hits() || 0) / this.shots()) * 100 : 0).toFixed(2);
	}
	losses() {
		return this.games() - this.wins();
	}
	wl() {
		return this.wins() / this.losses();
	}
	kr_packages() {
		return this.pfStats['ad'];
	}
	class(classNumber) {
		return this.pfStats['c' + classNumber];
	}
	lvl() {
		return Math.floor(0.03 * Math.sqrt(this.score()));
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
ast = assist
*/
