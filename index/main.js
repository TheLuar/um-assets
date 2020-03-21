'use strict';


// Elements

const btnPortSwitch = document.getElementById('port-switch');

const gameContainer = document.getElementById('game-container');

const game = document.getElementById('game');

const elmFlashVars = document.getElementById('flash-vars');


// Data

const portals = getLS('portals', {});

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
    console.log(a);

    const m = a.match(/^.*PORTALS~~/);

    if (m)
    {
        const p = JSON.parse(a.substr(m[0].length));

        Object.assign(portals, p);
 
        setLS('portals', portals);

        console.log(' ');
        console.log('%c PORTALS UPDATED:', 'font-weight:bold;font-size:150%;color:#882222;');
        console.log(portals);
        console.log(' ');
    }
}

function init ()
{
    const portalIDs = Object.keys(portals);

    for (let i = 0; i < portalIDs.length; i++)
    {
        const portal = portals[portalIDs[i]];
        
        portal.location = [50 + 100 * i, 420];
        portal.duration = 24024;
    }
    
    setFlashVars();

    game.data = 'bmmLoader.swf?version=' + (666 + Math.random());

    btnPortSwitch.onclick = () => switchPort();

    const strfv = 'flashVars = ' + JSON.stringify(flashVars)
        .replace(/(".*?":".*?")/g, '\n    $1')
        .replace(/"}/g, '"\n}')
        .replace(/:"/g, ': "')
        .replace(/"(.+)":/g, '$1:');

    console.log('%c' + strfv, 'font-weight:bold;font-size:125%;color:#004488');
}


// Start

flashVars = {
    port: ports[currentPort][0],
    resourceURL: '',
    disableFB: 'true',
    version: '7401',
    portals: JSON.stringify(portals),
    //itemsLibrary1Path: 'http://supermechs.com/resources/items/itemsLibrary1.swf?version=' + (666 + Math.random()),
};

init();
