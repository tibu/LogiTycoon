// ==UserScript==
// @name         Trips
// @namespace    https://github.com/tibu/LogiTycoon/
// @author       TransportScripts
// @version      0.9
// @description  try to take over the world!
// @match        https://www.logitycoon.com/eu1/index.php?a=trips*
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/tibu/LogiTycoon/main/src/Trips.js
// @require      https://raw.githubusercontent.com/tibu/LogiTycoon/main/src/shared/Utils.js
// ==/UserScript==

(function() {
    'use strict';
    let urlParams = new URLSearchParams(window.location.search);
    let from = '';
    let type = '';
    let trips = [];

    try{
        if(!urlParams.has('from')){
            Utils.GoTo.warehouse();
            return;
        }

        from = urlParams.get('from').trim();
        type = urlParams.get('type').trim();

        $('tbody').first().find('tr').each((i,e) => {
            let row = $(e);
            let split = e.innerText.split(/\t|\n|€/).filter(Boolean);
            let earnings = parseInt(split[0].replace('.',''));
            let distance = parseInt(split[3]);

            trips.push({
                from: split[1].trim(),
                to: split[2].trim(),
                earnings: earnings,
                distance: distance,
                type: split[4].trim(),
                onClick: row.attr('onclick'),
                profit: earnings/distance
            });
        });

        trips.sort((a, b) => b.profit - a.profit );
        let trip = trips.find(t => t.from === from && t.type === type);

        if(!!!trip){
            Utils.GoTo.warehouse();
        }

        eval(trip.onClick);
        $('#submit-trips').click();
    } catch (e) {
        Utils.GoTo.warehouse();
        console.log(e)
    }

    Utils.Refresh(10000);
})();
