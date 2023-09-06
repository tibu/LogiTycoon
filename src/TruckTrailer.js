// ==UserScript==
// @name         Truck/Trailer
// @namespace    https://github.com/tibu/LogiTycoon/
// @author       TransportScripts
// @version      0.2
// @description  try to take over the world!
// @match        https://www.logitycoon.com/eu1/index.php?a=garage_truck&t=*
// @match        https://www.logitycoon.com/eu1/index.php?a=garage_trailer&t=*
// @match        https://www.logitycoon.com/eu1/index.php?a=garage_truck_ftlock
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/tibu/LogiTycoon/main/src/TruckTrailer.js
// @require      https://raw.githubusercontent.com/tibu/LogiTycoon/main/src/shared/Utils.js
// ==/UserScript==

(function() {
    'use strict';
    let close = true;

    function InstallParts(){
        let nav = $('button[name=navinstall]');
        if(nav.length > 0){
            close = false;
            nav.click();
        }
        let lock = $('button[name=ftlinstall]');
        if(lock.length > 0){
            close = false;
            lock.click();
        }
    }

    function Repair(){
        let repairTruck = $('button[onclick*=repairtruck]');
        if(repairTruck.length > 0 && !!!repairTruck.attr('disabled')){
            close = false;
            repairTruck.click();
        }

        let repairTrailer = $('button[onclick*=repairtrailer]');
        if(repairTrailer.length > 0 && !!!repairTrailer.attr('disabled')){
            close = false;
            repairTrailer.click();
        }
    }

    Repair();
    //InstallParts();   // HQ detection has to be added

    if(close){
        //window.close();
        // we don't close it, it was not opened in new windows. let's go back to warehouse
        Utils.GoTo.warehouse();
    }
})();
