require('dotenv').config();
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
puppeteer.use(StealthPlugin());
puppeteer.use(AdblockerPlugin());

module.exports = async function () {
	const options = {
		headless: true, //headless false for debug
		defaultViewport: null,
	};
	const browser = await puppeteer.launch(options); // starts the browser
	const page = await browser.newPage(); //creates new page in browser
	await page.goto('https://krunker.io/'); // open url

	// await page.waitFor('onetrust-accept-btn-handler');
	await page.waitForSelector('div.streamItem');
	await page.click('button#onetrust-accept-btn-handler');

	const username = process.env.KRUNKERNAME;
	const password = process.env.KRUNKERPASS;
	//login
	await page.evaluate(
		({ username, password }) => {
			showWindow(5);
			document.querySelector('#accName').value = username;
			document.querySelector('#accPass').value = password;
			loginAcc();
			return;
		},
		{ username, password }
	);

	//wait for login
	await page.waitForFunction(
		`document.querySelector("#menuAccountUsername").innerText.toLowerCase().includes("${username}")`
	);

	//go to clan page
	await page.evaluate(() => {
		clearPops();
		showWindow(13);
		windows[12].switchTab(3);
		return;
	});

	await page.waitForFunction(
		"document.querySelector('div.menuTabNew.tabANew') != null && document.querySelector('div.menuTabNew.tabANew').innerText.includes('Clan War')"
	);

	const soldiers = await page.evaluate(() => {
		var soldiers = [];
		let count = 0;
		for (var item of Array.from(document.getElementById('clanErr').childNodes)) {
			const arr = Array.from(item.childNodes);
			if (item.className == 'setHed') {
				count++;
				if (count == 3) break;
			}
			if (item.className == 'settName settNHov') {
				const name = arr[0].innerHTML == 'beenhere' ? arr[1].innerHTML : arr[0].innerHTML;
				const line = arr.pop();
				if (line.tagName == 'SPAN') {
					const kills = parseInt(line.innerHTML.replace(',', ''));
					soldiers.push({ name, kills: kills, minutesSpent: 180 });
				} else if (line.tagName == 'DIV') {
					line.childNodes[1].onclick();
					const kills = parseInt(
						document
							.getElementById('popupContent')
							.children[3].children[0].innerHTML.replace(',', '')
					);
					const time = document
						.getElementById('popupContent')
						.children[5].children[0].innerHTML.split(' ');
					time.pop();
					const minutesSpent =
						time.length == 1
							? 180 - parseInt(time[0])
							: 180 - (parseInt(time[0]) * 60 + parseInt(time[1]));
					soldiers.push({ name, kills, minutesSpent });
				}
			}
		}
		return soldiers;
	});
	browser.close();

	return { war: parseInt(process.env.CURRENTWAR), soldiers };
};
