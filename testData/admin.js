const fs = require('fs');
const AppDAO = require('../dao');
const clanRequest = require('../clanRequest');

async function main() {
	const dao = new AppDAO('./db/grzDB.sqlite3');
	const requestRepo = new clanRequest(dao);
	let newReq = [];

	await requestRepo.createTable();
	// requestRepo
	// 	.delete('134785189128830977')
	// 	.then(console.log('id', await requestRepo.getById('134785189128830977')));

	// fs.readFile('data.json', 'utf8', (err, jsonString) => {
	// 	if (err) {
	// 		console.log('File read failed:', err);
	// 		return;
	// 	}
	// 	newReq = JSON.parse(jsonString);
	// 	newReq.forEach((req) => {
	// 		console.log(req);
	// 		requestRepo.create(req);
	// 	});
	// });

	// const req = {
	// 	id: '134785189128830977',
	// 	tag: 'hans16',
	// 	ign: 'lise54',
	// 	lvl: 34,
	// 	kdr: 0.7462596096188501,
	// 	kpg: 23.816689620690248,
	// 	applied: null,
	// };
	// requestRepo.create(req).then(
	// 	(val) => console.log('good'),
	// 	(val) => console.log('rejected')
	// );

	requestRepo.deleteById('134785189128830977');

	// console.log(await requestRepo.getById('134785189128830977'));

	// console.log(await requestRepo.getNext());

	// requestRepo.count().then((c) => {
	// 	console.log(Object.keys(c));
	// 	console.log(c['COUNT (id)']);
	// });
}

main();
