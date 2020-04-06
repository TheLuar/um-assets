'use strict';


// Elements

const btnPortSwitch = document.getElementById('port-switch');

const gameContainer = document.getElementById('game-container');

const game = document.getElementById('game');

const elmFlashVars = document.getElementById('flash-vars');


// General

const regExps = {
    TSLogCustomPrefix: /^[\d\s.]+\[@\]/,
    json: /{(.*|[\n])+}/,
};

const portals = getLS('portals', JSON.parse('{"10186":{"location":[50,420],"campaignID":10186,"duration":24024,"id":"10186","startDate":1585040400,"bossID":["BIGBOY"],"themeID":5,"name":"Golden Prison"},"10188":{"location":[135,420],"campaignID":10186,"duration":24024,"id":"10186","startDate":1585040400,"bossID":["BIGBOY"],"themeID":5,"name":"Golden Prison"},"10189":{"id":"10189","location":[220,420],"duration":24024,"bossID":["BIGBOY"],"themeID":5,"startDate":1585040400,"campaignID":10189,"name":"foo"},"10190":{"location":[305,420],"campaignID":10190,"duration":24024,"id":"10190","startDate":1587027600,"bossID":["ROASTER"],"themeID":4,"name":"Golden Age"},"10191":{"id":"10191","location":[390,420],"duration":24024,"bossID":["BIGBOY"],"themeID":5,"startDate":1585040400,"campaignID":10191,"name":"Golden Prison"},"10192":{"location":[475,420],"campaignID":10192,"duration":24024,"id":"10192","startDate":1585040400,"bossID":["BIGBOY"],"themeID":5,"name":"Golden Prison"},"10254":{"location":[560,420],"campaignID":10254,"duration":24024,"id":"10254","startDate":1585558800,"bossID":["SENIOR QUADS"],"themeID":6,"name":"Unreliable Protector"},"10255":{"id":"10254","duration":24024,"startDate":1584435600,"themeID":6,"campaignID":10254,"bossID":["ULTRICORN"],"location":[645,420],"name":"Saint Patrick Special"},"10256":{"location":[730,420],"campaignID":10256,"duration":24024,"id":"10256","startDate":1587632400,"bossID":["UNDERTAKER"],"themeID":5,"name":"Unrepaired Laser Cannon"},"10257":{"location":[815,420],"campaignID":10257,"duration":24024,"id":"10257","startDate":1588669200,"bossID":["THE HAT GUARDIAN"],"themeID":2,"name":"Cinco de Mayo"},"10258":{"location":[900,420],"campaignID":10258,"duration":24024,"id":"10258","startDate":1585040400,"bossID":["BIGBOY"],"themeID":5,"name":"Golden Prison"}}'));

const ports = [['9010', 'REGULAR'], ['915', 'BMMDEV']];

let currentPort = 0;

let flashVars = {};


// Functions

function switchPort ()
{
    currentPort++;

    if (currentPort >= ports.length) currentPort = 0;

    elmFlashVars.value = elmFlashVars.value.replace(/(port=)\d+/, '$1' + ports[currentPort][0]);
    btnPortSwitch.innerText = ports[currentPort][1];
    game.data += '';
};

function setFlashVars ()
{
    const keys = Object.keys(flashVars);

    elmFlashVars.value = keys.map(v => v += '=').join('&');
    
    btnPortSwitch.innerText = ports[currentPort][1];

    for (const k of keys)
    {
        elmFlashVars.value = elmFlashVars.value.replace(k + '=', k + '=' + flashVars[k]);
    }
}

function tslog (a)
{
    const style = regExps.TSLogCustomPrefix.test(a) ? 'font-weight: bold; color: #4488FF' : 'font-size: 75%';

    console.log('%c' + a, style);

    const JSONString = a.match(regExps.json)[0];

    if (JSONString.length <= 2) return;

    console.log('%cDATA:', style);
    console.log(JSON.parse(JSONString));
    console.log(' ');
}

function init ()
{
    const portalIDs = Object.keys(portals);

    for (let i = 0; i < portalIDs.length; i++)
    {
        const portal = portals[portalIDs[i]];
        
        portal.location = [50 + 85 * i, 420];
        portal.duration = 24024;
    }

    flashVars = {
        port: ports[currentPort][0],
        resourceURL: '',
        disableFB: 'true',
        version: '7401',
        portals: JSON.stringify(portals),
    };
    
    setFlashVars();

    game.data = 'bmmLoader.swf?version=7401';

    btnPortSwitch.onclick = () => switchPort();

    // const strfv = 'flashVars = ' + JSON.stringify(flashVars)
    //     .replace(/(".*?":".*?")/g, '\n    $1')
    //     .replace(/"}/g, '"\n}')
    //     .replace(/:"/g, ': "')
    //     .replace(/"(.+)":/g, '$1:');

    // console.log('%c' + strfv, 'font-weight:bold;font-size:125%;color:#004488');
}


// Start

init();
