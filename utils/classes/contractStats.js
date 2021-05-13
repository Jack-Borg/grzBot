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
}
