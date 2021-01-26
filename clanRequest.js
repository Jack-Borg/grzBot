class clanRequest {
	constructor(dao) {
		this.dao = dao;
	}

	createTable() {
		const sql = `
        CREATE TABLE IF NOT EXISTS clanrequest (
            id TEXT PRIMARY KEY,
            tag TEXT,
            ign TEXT,
            lvl INTEGER,
            kdr  REAL,
            kpg REAL,
            nukes INTEGER,
            applied TEXT
        )`;
		return this.dao.run(sql);
	}

	create({ id, tag, ign, lvl, kdr, kpg, nukes, date }) {
		console.log('application', id, tag, ign, lvl, kdr, kpg, nukes, date);
		return this.dao.run(
			`REPLACE INTO clanrequest (id, tag, ign, lvl, kdr, kpg, nukes, applied) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
			[id, tag, ign, lvl, kdr, kpg, nukes, date]
		);
	}

	getNext() {
		return this.dao.all(`SELECT * FROM clanrequest 
        ORDER BY kpg DESC
        limit 5`);
	}

	getAll() {
		return this.dao.all(`SELECT * FROM clanrequest`);
	}

	getById(id) {
		return this.dao.get(`SELECT * FROM clanrequest WHERE id = ?`, [id]);
	}

	getByTag(tag) {
		return this.dao.get(`SELECT * FROM clanrequest WHERE tag = ?`, [tag]);
	}

	deleteById(id) {
		return this.dao.run(`DELETE FROM clanrequest WHERE id = ?`, [id]);
	}

	deleteByTag(tag) {
		return this.dao.run(`DELETE FROM clanrequest WHERE tag = ?`, [tag]);
	}

	count() {
		return this.dao.get(`SELECT COUNT (id) FROM clanrequest`);
	}
}

module.exports = clanRequest;
