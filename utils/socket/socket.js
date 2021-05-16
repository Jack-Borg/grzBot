'use strict';

const WebSocket = require('ws');
const msgpack = require('msgpack-lite');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const html = require('./html');

var dataPackage = '';
var connected = false;
var captchaPassed = false;
var token = '';
var website = {
	sitekey: '60a46f6a-e214-4aa8-b4df-4386e68dfde4',
	url: 'krunker.io',
	port: 8080,
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
	response.send(html.noCaptcha());
	console.log('Submitting captcha token...');
	socket.send(Buffer.from([...msgpack.encode(['cptR', token]), 0, 0]));
});

var socket;

function connect() {
	socket = new WebSocket('wss://social.krunker.io/ws', {
		headers: { origin: 'https://krunker.io/' },
	});
	socket.binaryType = 'arraybuffer';
	socket.onopen = function (event) {
		console.log('Socket is connected');
		connected = true;
	};
	socket.onerror = function (error) {
		console.error('Websocket error: ', error);
	};
	socket.onclose = function (event) {
		console.log('Socket connection closed');
		connected = false;
		reconnect();
	};
	socket.onmessage = (event) => {
		let data = msgpack.decode(new Uint8Array(event.data));

		//console.log('In:', data);
		switch (data[0]) {
			case 'pi':
				sendData(['po']);
				break;
			case 'cpt':
				console.log('Need to complete captcha... Captcha is hosted...');
				captchaPassed = false;
				break;
			case '0':
				dataPackage = data;
				break;
			case 'pir':
				if (!connected) {
					//console.log('Socket connection open');
					connected = true;
				}
				captchaPassed = true;
				break;
		}
	};
}

function reconnect() {
	var interval = setInterval(function () {
		if (!connected) {
			connect();
			console.log('Trying to reconnect to the socket...');
		} else {
			clearInterval(interval);
		}
	}, 2500);
}

connect();

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
				if (dataPackage[2] === name) {
					clearInterval(interval);
					resolve(dataPackage);
				}
			}, 200);
			setTimeout(() => {
				reject(new Error('Profile Timeout'));
				clearInterval(interval);
			}, 2000);
		});
	},
	clan(name) {
		return new Promise(function (resolve, reject) {
			sendData(['r', 'clan', name, null]);
			console.log('Requesting Clan: ', name);
			var interval = setInterval(function () {
				if (dataPackage[2] === name) {
					clearInterval(interval);
					resolve(dataPackage);
				}
			}, 200);
			setTimeout(() => {
				reject(new Error('Clan Timeout'));
				clearInterval(interval);
			}, 2000);
		});
	},
	cw() {
		return new Promise(function (resolve, reject) {
			sendData(['r', 'clanwars', null, null]);
			console.log('Requesting CW');
			var interval = setInterval(function () {
				if (dataPackage[1] === 'clanwars') {
					clearInterval(interval);
					resolve(dataPackage);
				}
			}, 200);
			setTimeout(() => {
				reject(new Error('CW Timeout'));
				clearInterval(interval);
			}, 2000);
		});
	},
};
