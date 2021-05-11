'use strict';

const WebSocket = require('ws');
const msgpack = require('msgpack-lite');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

var profilePackage = '';
var connected = false;
var captchaPassed = false;
var token = '';
var website = {
	sitekey: '60a46f6a-e214-4aa8-b4df-4386e68dfde4',
	url: 'krunker.io',
	port: 2000,
};
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(website.port, () => console.log('Listening on port ' + website.port));
app.get('/', function (req, res) {
	if (!captchaPassed) {
		res.send(HtmlCaptcha);
	} else {
		res.send(HtmlNoCaptcha);
	}
});
app.post('/', function (request, response) {
	token = request.body['h-captcha-response'];
	response.send(HtmlNoCaptcha);
	console.log('Submitting captcha token...');
	socket.send(Buffer.from([...msgpack.encode(['cptR', token]), 0, 0]));
});

const socket = new WebSocket('wss://social.krunker.io/ws', {
	headers: { origin: 'https://krunker.io/' },
});
socket.binaryType = 'arraybuffer';
socket.onopen = () => {
	connected = true;
};
socket.onerror = function (error) {
	console.error('Websocket error: ', error);
};
socket.onclose = function (event) {
	console.log('Connection Closed');
	connected = false;
};
socket.onmessage = (event) => {
	let data = msgpack.decode(new Uint8Array(event.data));
	//console.log("In:", data);
	switch (data[0]) {
		case 'pi':
			sendData(['po']);
			break;
		case 'cpt':
			console.log('Need to complete captcha... Captcha is hosted...');
			captchaPassed = false;
			break;
		case '0':
			profilePackage = data;
			break;
		case 'pir':
			captchaPassed = true;
			break;
	}
};
const sendData = (data) => {
	//console.log("Out:", data);
	socket.send(msgpack.encode(data).buffer);
};

module.exports = {
	captcha() {
		return new Promise(function (resolve, reject) {
			var interval = setInterval(function () {
				if (captchaPassed) {
					clearInterval(interval);
					resolve();
				}
			}, 200);
			setTimeout(() => {
				reject(new Error('Captcha Timeout'));
				clearInterval(interval);
			}, 120 * 1000);
		});
	},
	connected() {
		return new Promise(function (resolve, reject) {
			var interval = setInterval(function () {
				if (connected) {
					console.log('Connected to websocket!');
					clearInterval(interval);
					resolve();
				}
			}, 200);
			setTimeout(() => {
				reject(new Error('Socket Timeout'));
				clearInterval(interval);
			}, 5000);
		});
	},
	profile(name) {
		return new Promise(function (resolve, reject) {
			sendData(['r', 'profile', name, null]);
			console.log('Requesting Profile from: ', name);
			var interval = setInterval(function () {
				if (profilePackage[2] === name) {
					clearInterval(interval);
					resolve(profilePackage);
				}
			}, 200);
			setTimeout(() => {
				reject(new Error('Profile Timeout'));
				clearInterval(interval);
			}, 5000);
		});
	},
	get(profile, state) {
		return profile[3]['player_' + state];
	},
};

class profileStats {
	constructor(pfData) {
		this.pfData = pfData;
		this.pfStats = new Function('return ' + test[3]['player_stats'])();
	}
	name() {
		return this.pfData[3]['player_name'];
	}
	id() {
		return this.pfData[3]['player_id'];
	}
	kills() {
		return this.pfData[3]['player_kills'];
	}
	wins() {
		return this.pfData[3]['player_wins'];
	}
	games() {
		return this.pfData[3]['player_games_played'];
	}
	deaths() {
		return this.pfData[3]['player_deaths'];
	}
	timeplayed() {
		return this.pfData[3]['player_timeplayed'];
	}
	kr() {
		return this.pfData[3]['player_funds'];
	}
	score() {
		return this.pfData[3]['player_score'];
	}
	verified() {
		return this.pfData[3]['player_featured'];
	}
	clan() {
		return this.pfData[3]['player_clan'];
	}
	hackertag() {
		return this.pfData[3]['player_hack'];
	}
	following() {
		return this.pfData[3]['player_following'];
	}
	followers() {
		return this.pfData[3]['player_followed'];
	}
	createdOn() {
		return this.pfData[3]['player_datenew'];
	}
	region() {
		return this.pfData[3]['player_region'];
	}
	MMR1() {
		return this.pfData[3]['player_elo'];
	}
	MMR2() {
		return this.pfData[3]['player_elo2'];
	}
	MMR4() {
		return this.pfData[3]['player_elo4'];
	}
	challenge() {
		return this.pfData[3]['player_chal'];
	}
	krunkitis() {
		return this.pfData[3]['player_infected'];
	}
	premiumName() {
		return this.pfData[3]['player_alias'];
	}
	premium() {
		if (0 < this.pfData[3]['player_premium']) {
			return 1;
		} else {
			return 0;
		}
	}
	partner() {
		return this.pfData[3]['partner_approved'];
	}
	twitchName() {
		return this.pfData[3]['player_twitchname'];
	}
	nukes() {
		return this.pfStats['n'];
	}
	bullseyes() {
		return this.pfStats['tmk'];
	}
	headshots() {
		return this.pfStats['hs'];
	}
	beatdowns() {
		return this.pfStats['fk'];
	}
	wallbangs() {
		return this.pfStats['wb'];
	}
	meele() {
		return this.pfStats['mk'];
	}
	sprays() {
		return this.pfStats['spry'];
	}
	assists() {
		return this.pfStats['ast'];
	}
	shots() {
		return this.pfStats['s'];
	}
	hits() {
		return this.pfHits['h'];
	}
	kd() {
		return this.kills() / this.deaths();
	}
	kpg() {
		return this.kills() / this.games();
	}
	dpg() {
		return this.deaths() / this.games();
	}
	spk() {
		return this.score() / this.kills();
	}
	accuracy() {
		return (this.shots / this.hits) * 100;
	}
	class(classNumber) {
		return this.pfStats['c' + classNumber];
	}
}
module.exports.profileStats = profileStats;

var HtmlCaptcha = `<!DOCTYPE HTML>
	<html>
		<head>
			<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
			<title>KrunkBotCaptcha</title>
		</head>
		<body>
      <div style="position:absolute;left:50%;top:30%;transform: translate(-50%, -50%)";><h1>Captcha Harvester</h1></div>
			<div class="h-captcha" data-callback="sendToken" data-sitekey="${website.sitekey}" style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);"></div>
			<script>
				function sendToken(){post('/', {'h-captcha-response': hcaptcha.getResponse()});}
				function post(path, params, method) {
					method = method || "post";
					var form = document.createElement("form");
					form.setAttribute("method", method);
					form.setAttribute("action", path);
					for(var key in params) {
						if(params.hasOwnProperty(key)) {
							var hiddenField = document.createElement("input");
							hiddenField.setAttribute("type", "hidden");
							hiddenField.setAttribute("name", key);
							hiddenField.setAttribute("value", params[key]);
							form.appendChild(hiddenField);
						}
					}
					document.body.appendChild(form);
					form.submit();
				}
			</script>
			<script src='https://hcaptcha.com/1/api.js'></script>
		</body>
	</html>`;

var HtmlNoCaptcha = `<!DOCTYPE HTML>
	<html>
		<head>
			<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
			<title>KrunkBotCaptcha</title>
		</head>
		<body>
      <div style="position:absolute;left:50%;top:30%;transform: translate(-50%, -50%)";><h1>Captcha Harvester</h1></div>
			<div style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);"><h3>KrunkBot passed captcha</h3></div>
		</body>
	</html>`;

/*
  this.updateLevel = function() {
    var e = n.rankVar * Math.sqrt(this.score);
    this.level = Math.floor(e), this.levelProg = Math.round(100 * (e - this.level)), this.level = Math.max(1, this.level)
  }
  */
