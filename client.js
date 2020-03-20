'use strict';


// Elements

const btnPortSwitch = document.getElementById('port-switch');

const gameContainer = document.getElementById('game-container');

const game = document.getElementById('game');

const elmFlashVars = document.getElementById('flash-vars');


// Data

const portals = getLS('portals', {});

const ports = [['9010', 'BMMDEV'], ['915', 'NORMAL']];

let portID = 0;


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
    portID++;

    if (portID >= ports.length) portID = 0;

    setPort(...port[portID]);
};

function setPort (name, port)
{
    btnPortSwitch.innerText = name;
    flashvars.value = flashvars.value.replace(/(port=)\d+/, '$1' + port);
    
    // Refresh object
    game.data += '';
}

function setFlashVars ()
{
    const flashVars = {
        port: ports[0][0],
        resourceURL: '',
        disableFB: '1',
        version: '7401',
        portals: JSON.stringify(portals),
    };
    
    const keys = Object.keys(flashVars);

    elmFlashVars.value = keys.map(v => v += '=').join('&');

    for (const k of keys)
    {
        elmFlashVars.value = elmFlashVars.value.replace(k + '=', k + '=' + flashVars[k]);
    }
}

function tslog (a)
{
    console.log(a);

    if (a.indexOf('PORTALS~~') == 0)
    {
        const b = a.substr(9);

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
        
        portal.location = [60 + 60 * i, 420];
        portal.duration = 24024;
    }
    
    setFlashVars();

    game.data = 'bmmLoader.swf?version=' + (666 + Math.random());
}


// Start

init();
