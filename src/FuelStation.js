// ==UserScript==
// @name         Fuel Station
// @namespace    https://github.com/tibu/LogiTycoon/
// @author       TransportScripts
// @version      0.7
// @description  try to take over the world!
// @match        https://www.logitycoon.com/eu1/index.php?a=fuelstation*
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/tibu/LogiTycoon/main/src/FuelStation.js
// ==/UserScript==

(function() {
    'use strict';

    function Refuel() {
        setTimeout(10000);  // wait for debugging
        $('button[onclick*=refuelft]').click();
        setTimeout(50);
        $('button[onclick*=refuelfc]').click();
        setTimeout(50);
        $('button[onclick*=refuel]').click();
    }

    //removed for programming
    //setTimeout("location.reload(true);", 15000);
    Refuel();
})();
