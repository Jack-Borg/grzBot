module.exports = class {
	constructor(contractData, playerIndex) {
		this.contractData = contractData;
        this.playerIndex = playerIndex;
	}
	name() {
		return this.contractData[3].members[this.playerIndex].p
	}
    kills() {
        return this.contractData[3].members[this.playerIndex].ki
    }
    deaths() {
        return this.contractData[3].members[this.playerIndex].de
    }
    timePlayed() {
        return this.contractData[3].members[this.playerIndex].tp
    }
    kpm() {
        return this.kills() / ((this.timePlayed()/60000)<180 ? (this.timePlayed()/60000) : 180);
    }
    kpg() {
        return this.kpm()*4
    }
	estKills() {
        return this.kpm()*60*3
    }
    kd() {
        return this.kills()/this.deaths()
    }
}
