'use strict';


const portals = getLS('portals');


// Functions

function init ()
{
    for (const id in portals)
    {
        const innerHTML = JSON.stringify(portals[id])
            .replace(/(".*?":".*?")/g, '\n    $1')
            .replace(/"}/g, '"\n}')
            .replace(/:"/g, ': "')
            .replace(/"(.+)":/g, '$1:');

        const ctnData  = dom('ctn-data', { innerHTML });
        const elmBlock = dom('elm-portal-block', null, [ctnData]);

        document.body.appendChild(elmBlock);
    }
}


// Start

init();
