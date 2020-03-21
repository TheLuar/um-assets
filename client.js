'use strict';


// Elements

const btnPortSwitch = document.getElementById('port-switch');

const gameContainer = document.getElementById('game-container');

const game = document.getElementById('game');

const elmFlashVars = document.getElementById('flash-vars');


// Data

const portals = getLS('portals', {});

const ports = ['9010', '915'];

let currentPort = 0;


// Functions

function getLS (key, data)
{
    const json = localStorage.getItem(key);

    if (json) return JSON.parse(json);

    return setLS(key, data);
}

function setLS (key, data)
{
    localStorage.setItem(key, JSON.stringify(data));

    return data;
}

function switchPort ()
{
    currentPort++;

    if (currentPort >= ports.length) currentPort = 0;

    flashvars.value = flashvars.value.replace(/(port=)\d+/, '$1' + ports[currentPort]);
    btnPortSwitch.innerText = portNames[currentPort];
};

function setFlashVars ()
{
    const flashVars = {
        port: ports[currentPort],
        resourceURL: '',
        disableFB: '1',
        version: '7401',
        portals: JSON.stringify(portals),
    };
    
    const keys = Object.keys(flashVars);

    elmFlashVars.value = keys.map(v => v += '=').join('&');
    
    btnPortSwitch.innerText = portNames[currentPort];

    for (const k of keys)
    {
        elmFlashVars.value = elmFlashVars.value.replace(k + '=', k + '=' + flashVars[k]);
    }
}

function tslog (a)
{
    console.log(a);

    if (/.+PORTALS~~/.test(a))
    {
        const m = a.match(/.+PORTALS~~/);
        const b = a.substr(m[0].length);

        console.log(JSON.parse(b));
 
        //setLS();
    }
}

function init ()
{
    const portalIDs = Object.keys(portals);

    for (let i = 0; i < portalIDs.length; i++)
    {
        const portal = portals[portalIDs[i]];
        
        portal.location = [45 + 45 * i, 425];
        portal.duration = 24024;
    }
    
    setFlashVars();

    game.data = 'bmmLoader.swf?version=' + (666 + Math.random());
}


// Start

init();
