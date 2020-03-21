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

const portalBase = {
    id: "10255",
    duration: 24024,
    startDate: 1584435600,
    themeID: 6,
    campaignID: 10255,
    bossID: ["RAMBOY"],
    location: [0, 0],
    name: "",
};


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
    const portals = {};

    const portal = {
        duration: 24000,
        startDate: 1584435600,
        themeID: 6,
        campaignID: 10255,
        bossID: ["RAMBOY"],
        location: [0, 420],
        name: "Saint Patrick Special",
    };
    
    for (let i = 0; i < 20; i++)
    {
        const o = Object.assign(portal);

        o.location = [50 + 70 * i, 420];
        
        portals[10255 + i] = o;
    }

    console.log(portals);

    // const portalIDs = Object.keys(portals);

    // for (let i = 0; i < portalIDs.length; i++)
    // {
    //     const portal = portals[portalIDs[i]];
        
    //     portal.location = [50 + 85 * i, 420];
    //     portal.duration = 24024;
    // }

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
