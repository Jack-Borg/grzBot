const AppDAO = require('./dao');
const clanRequest = require('./clanRequest');

function main() {
	const dao = new AppDAO('./db/grzDB.sqlite3');
	const requestRepo = new clanRequest(dao);

	requestRepo.createTable();
}

main();
