'use strict';

const WebSocket = require('ws');
const msgpack = require('msgpack-lite');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const html = require('./html');

var profilePackage = '';
var connected = false;
var captchaPassed = false;
var token = '';
var website = {
	sitekey: '60a46f6a-e214-4aa8-b4df-4386e68dfde4',
	url: 'krunker.io',
	port: 80,
};

app.use(bodyParser.urlencoded({ extended: false }));
app.listen(website.port, () => console.log('Listening on port ' + website.port));
app.get('/', function (req, res) {
	if (!captchaPassed) {
		res.send(html.captcha(website.sitekey));
	} else {
		res.send(html.noCaptcha());
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
	console.log('Socket connection open');
	connected = true;
};
socket.onerror = function (error) {
	console.error('Websocket error: ', error);
};
socket.onclose = function (event) {
	console.log('Socket connection closed');
	connected = false;
};
socket.onmessage = (event) => {
	let data = msgpack.decode(new Uint8Array(event.data));
	console.log('In:', data);
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
	// console.log('Out:', data);
	socket.send(msgpack.encode(data).buffer);
};

module.exports = {
	connected() {
		return new Promise(function (resolve, reject) {
			var interval = setInterval(function () {
				if (connected && captchaPassed) {
					clearInterval(interval);
					resolve(connected);
				}
			}, 200);
			setTimeout(() => {
				reject(new Error('Socket Timeout'));
				clearInterval(interval);
			}, 2000);
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
			}, 2000);
		});
	},
	get(profile, state) {
		return profile[3]['player_' + state];
	},
};

/*
this.updateLevel = function() {
    var e = n.rankVar * Math.sqrt(this.score);
    this.level = Math.floor(e), this.levelProg = Math.round(100 * (e - this.level)), this.level = Math.max(1, this.level)
}
*/
