const AppDAO = require('../dao');
const clanRequest = require('../clanRequest');
const fs = require('fs');

async function main() {
	const dao = new AppDAO('./db/grzDB.sqlite3');
	const requestRepo = new clanRequest(dao);
	let newReq = [];

	requestRepo.createTable();

	fs.readFile('./testData/data.json', 'utf8', (err, jsonString) => {
		if (err) {
			console.log('File read failed:', err);
			return;
		}
		newReq = JSON.parse(jsonString);
		newReq.forEach((req) => {
			console.log(req);
			requestRepo.create(req);
		});
	});

	// console.log(await requestRepo.getAll());

	// console.log(await requestRepo.getNext());
}

main();

// console.log(new Date().toLocaleDateString());
