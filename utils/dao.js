var MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const dbUser = process.env.MONGOUSER;
const dbPass = process.env.MONGOPASS;
const dbName = process.env.MONGODBNAME;
const colName = process.env.MONGOCOLNAME;
const url = `mongodb+srv://${dbUser}:${dbPass}@mongodb.ikrgp.mongodb.net/${dbName}?retryWrites=true&w=majority`;

module.exports = {
	// postReport: async function (report) {
	// 	await MongoClient.connect(url, async function (err, db) {
	// 		if (err) throw err;
	// 		var dbo = db.db('Krunker');
	// 		report.soldiers.forEach((s) => {
	// 			const query = { war: report.war, name: s.name };
	// 			const update = {
	// 				$set: { last: { kills: s.kills, minutesSpent: s.minutesSpent } },
	// 				$addToSet: {
	// 					scores: { kills: s.kills, minutesSpent: s.minutesSpent },
	// 				},
	// 			};
	// 			const options = { upsert: true };
	// 			dbo.collection(colName).updateOne(query, update, options);
	// 		});
	// 		await setTimeout(() => {
	// 			db.close();
	// 		}, 5000);
	// 	});
	// 	return;
	// },
	// getWarReport: async function (warN) {
	// 	return new Promise((resolve, reject) => {
	// 		MongoClient.connect(
	// 			url,
	// 			{
	// 				useNewUrlParser: true,
	// 				useUnifiedTopology: true,
	// 			},
	// 			function (err, db) {
	// 				if (err) throw err;
	// 				var dbo = db.db('Krunker');

	// 				dbo.collection(colName)
	// 					.find({ war: warN })
	// 					.toArray((err, result) => {
	// 						if (err) reject(err);
	// 						resolve(result);
	// 						db.close();
	// 					});
	// 			}
	// 		);
	// 	});
	// },
	getAllSoldiers: async function () {
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
							db.close();
						});
				}
			);
		});
	},
	// getSoldierReport: async function (name, warNumber = process.env.CURRENTWAR) {
	// 	return new Promise((resolve, reject) => {
	// 		MongoClient.connect(
	// 			url,
	// 			{
	// 				useNewUrlParser: true,
	// 				useUnifiedTopology: true,
	// 			},
	// 			function (err, db) {
	// 				if (err) throw err;
	// 				var dbo = db.db('Krunker');

	// 				dbo.collection(colName)
	// 					.findOne({
	// 						name: { $regex: new RegExp(name, 'i') },
	// 						war: parseInt(warNumber),
	// 					})
	// 					.then((result) => {
	// 						resolve(result);
	// 						db.close();
	// 					})
	// 					.catch((err) => console.error(`Failed to find document: ${err}`));
	// 			}
	// 		);
	// 	}).catch((err) => console.error(`Failed to find document: ${err}`));
	// },
	// getSoldierHistory: async function (name) {
	// 	return new Promise((resolve, reject) => {
	// 		MongoClient.connect(
	// 			url,
	// 			{
	// 				useNewUrlParser: true,
	// 				useUnifiedTopology: true,
	// 			},
	// 			function (err, db) {
	// 				if (err) throw err;
	// 				var dbo = db.db('Krunker');

	// 				dbo.collection(colName)
	// 					.find({ name: { $regex: new RegExp(name, 'i') } })
	// 					.toArray((err, result) => {
	// 						if (err) reject(err);
	// 						if (result.length == 0) return resolve(undefined);

	// 						result = {
	// 							name: result[0].name,
	// 							wars: result.map((r) => {
	// 								return { war: r.war, score: r.last };
	// 							}),
	// 						};

	// 						resolve(result);
	// 						db.close();
	// 					});
	// 			}
	// 		);
	// 	}).catch((err) => console.error(`Failed to find document: ${err}`));
	// },
	getPlayerByName: async function (name) {
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
						.findOne({ name: { $regex: new RegExp(name, 'i') } })
						.then((s) => {
							resolve(s);
						});
				}
			);
		}).catch((err) => console.error(`Failed to find document: ${err}`));
	},
	getPlayerByDiscord: async function (id) {
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
						.findOne({ discordID: id })
						.then((s) => {
							resolve(s);
						});
				}
			);
		}).catch((err) => console.error(`Failed to find document: ${err}`));
	},
	getWar: async function (warN) {
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
						.find({ [`wars.${warN}`]: { $exists: true } })
						.toArray((err, result) => {
							if (err) reject(err);
							resolve(
								result.map((s) => {
									return {
										name: s.name,
										kills: s.wars[warN].kills,
										timePlayed: s.wars[warN].timePlayed,
									};
								})
							);
						});
				}
			);
		}).catch((err) => console.error(`Failed to find document: ${err}`));
	},
	postAll: async function (report) {
		await MongoClient.connect(
			url,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			},
			async function (err, db) {
				if (err) throw err;
				var dbo = db.db('Krunker');

				dbo.collection(colName).insertMany(report);
			}
		);
		return;
	},
	postReport: async function (members) {
		const warN = process.env.CURRENTWAR;
		await MongoClient.connect(
			url,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			},
			async function (err, db) {
				if (err) throw err;
				var dbo = db.db('Krunker');

				members.forEach((m) => {
					const filter = { name: m.name };
					const update = {
						$set: {
							[`wars.${warN}.kills`]: m.kills,
							[`wars.${warN}.timePlayed`]: m.timePlayed,
						},
						$addToSet: {
							[`wars.${warN}.scores`]: {
								kills: m.kills,
								timePlayed: m.timePlayed,
							},
						},
					};
					const options = { upsert: true };
					dbo.collection(colName).updateOne(filter, update, options);
				});
			}
		);
		return;
	},
	linkAccount: async function (discId, name) {
		await MongoClient.connect(
			url,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			},
			async function (err, db) {
				if (err) throw err;
				var dbo = db.db('Krunker');

				const filter = { name: name };
				const update = {
					$set: {
						discordID: discId,
					},
				};
				const options = { upsert: true };
				dbo.collection(colName).updateOne(filter, update, options);
			}
		);
		return;
	},
	deleteAll: async function () {
	 	MongoClient.connect(url, function (err, db) {
	 		if (err) throw err;
			var dbo = db.db('Krunker');
	 		dbo.collection(colName).deleteMany({});
	 	});
	},
};
