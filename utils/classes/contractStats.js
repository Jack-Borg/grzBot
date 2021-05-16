module.exports = class {
	constructor(contractData) {
		this.name = contractData.p;
		this.kills = contractData.ki;
		this.deaths = contractData.de;
		this.timePlayed = contractData.tp;

		this.kpm = this.kills / (this.timePlayed / 60000 < 180 ? this.timePlayed / 60000 : 180);
		this.kpm = isNaN(this.kpm) ? 0 : this.kpm;

		this.kpg = this.kpm * 4;
		this.kpg = isNaN(this.kpg) ? 0 : this.kpg;

		this.estKills = this.kpm * 60 * 3;
		this.estKills = isNaN(this.estKills) ? 0 : this.estKills;

		this.kd = this.kills / this.deaths;
		this.kd = isNaN(this.kd) ? 0 : this.kd;
	}
};
