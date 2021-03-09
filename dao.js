var MongoClient = require('mongodb').MongoClient;

const dbUser = process.env.MONGOUSER;
const dbPass = process.env.MONGOPASS;
const dbName = process.env.MONGODBNAME;
const url = `mongodb+srv://${dbUser}:${dbPass}@mongodb.ikrgp.mongodb.net/${dbName}?retryWrites=true&w=majority`;

module.exports = async function (report) {
	await MongoClient.connect(url, async function (err, db) {
		if (err) throw err;
		var dbo = db.db('Krunker');
		report.soldiers.forEach((s) => {
			const query = { war: report.war, name: s.name };
			const update = {
				$set: { last: { kills: s.kills, minutesSpent: s.minutesSpent } },
				$addToSet: {
					scores: { kills: s.kills, minutesSpent: s.minutesSpent },
				},
			};
			const options = { upsert: true };
			dbo.collection('wars').updateOne(query, update, options);
		});
		await setTimeout(() => {
			db.close();
		}, 5000);
	});
	return;
};

// MongoClient.connect(url, function (err, db) {
// 	if (err) throw err;
// 	var dbo = db.db('Krunker');
// 	dbo.collection('wars').deleteMany();
// });
