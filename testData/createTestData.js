var fs = require('fs');

function genId() {
	return parseInt(Math.random() * 100000000);
}

function genName() {
	const arr = ['bob', 'lise', 'hans'];

	return arr[Math.floor(Math.random() * arr.length)] + Math.floor(Math.random() * 100);
}

function genlvl() {
	return parseInt(Math.random() * 10 + 30);
}

function genKDR() {
	return parseFloat((Math.random() * 5).toFixed(2));
}

function genKPG() {
	return parseFloat((Math.random() * 20 + 5).toFixed(2));
}

function genNukes() {
	return Math.floor(Math.random() * 100 + 5);
}

let accs = [];

for (let i = 0; i < 5; i++) {
	accs[i] = {
		id: genId(),
		tag: genName(),
		ign: genName(),
		lvl: genlvl(),
		kdr: genKDR(),
		kpg: genKPG(),
		nukes: genNukes(),
	};
}

fs.writeFile('./testData/data.json', JSON.stringify(accs), function (err) {
	if (err) throw err;
	console.log('Saved!');
});
