var MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const dbUser = process.env.MONGOUSER;
const dbPass = process.env.MONGOPASS;
const dbName = process.env.MONGODBNAME;
const colName = process.env.MONGOCOLNAME;
const url = `mongodb+srv://${dbUser}:${dbPass}@mongodb.ikrgp.mongodb.net/${dbName}?retryWrites=true&w=majority`;

module.exports = {
	postReport: async function (report) {
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
				dbo.collection(colName).updateOne(query, update, options);
			});
			await setTimeout(() => {
				db.close();
			}, 5000);
		});
		return;
	},
	getWarReport: async function (warN) {
		return new Promise((resolve, reject) => {
			MongoClient.connect(
				url,
				{
					useNewUrlParser: true,
					useUnifiedTopology: true,
				},
				function (err, db) {
					if (err) throw err;
					var dbo = db.db('Krunker');

					dbo.collection(colName)
						.find({ war: warN })
						.toArray((err, result) => {
							if (err) reject(err);
							resolve(result);
						});
				}
			);
		});
	},
	getAllWarReport: async function (warN) {
		return new Promise((resolve, reject) => {
			MongoClient.connect(
				url,
				{
					useNewUrlParser: true,
					useUnifiedTopology: true,
				},
				function (err, db) {
					if (err) throw err;
					var dbo = db.db('Krunker');

					dbo.collection(colName)
						.find()
						.toArray((err, result) => {
							if (err) reject(err);
							resolve(result);
						});
				}
			);
		});
	},
	getSoldierReport: async function (name, warNumber = process.env.CURRENTWAR) {
		return new Promise((resolve, reject) => {
			MongoClient.connect(
				url,
				{
					useNewUrlParser: true,
					useUnifiedTopology: true,
				},
				function (err, db) {
					if (err) throw err;
					var dbo = db.db('Krunker');

					dbo.collection(colName)
						.findOne({
							name: { $regex: new RegExp(name, 'i') },
							war: parseInt(warNumber),
						})
						.then((result) => {
							resolve(result);
						})
						.catch((err) => console.error(`Failed to find document: ${err}`));
				}
			);
		}).catch((err) => console.error(`Failed to find document: ${err}`));
	},
	getSoldierHistory: async function (name) {
		return new Promise((resolve, reject) => {
			MongoClient.connect(
				url,
				{
					useNewUrlParser: true,
					useUnifiedTopology: true,
				},
				function (err, db) {
					if (err) throw err;
					var dbo = db.db('Krunker');

					dbo.collection(colName)
						.find({ name: { $regex: new RegExp(name, 'i') } })
						.toArray((err, result) => {
							if (err) reject(err);
							if (result.length == 0) return resolve(undefined);

							result = {
								name: result[0].name,
								wars: result.map((r) => {
									return { war: r.war, score: r.last };
								}),
							};

							resolve(result);
						});
				}
			);
		}).catch((err) => console.error(`Failed to find document: ${err}`));
	},
	// delete: async function () {
	// 	MongoClient.connect(url, function (err, db) {
	// 		if (err) throw err;
	// 		var dbo = db.db('Krunker');
	// 		dbo.collection(colName).deleteMany({ war: '3' });
	// 	});
	// },
};
