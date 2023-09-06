// ==UserScript==
// @name         Freight
// @namespace    https://github.com/tibu/LogiTycoon/
// @author       TransportScripts
// @version      0.13
// @description  try to take over the world!
// @match        https://www.logitycoon.com/eu1/index.php?a=freight&n=*
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/tibu/LogiTycoon/main/src/Freight.js
// @require      https://raw.githubusercontent.com/tibu/LogiTycoon/main/src/shared/Utils.js
// ==/UserScript==

(function() {
    'use strict';
    var a = $('a:contains(Progress)>span.badge-success').text();

    // truck condition
    let truck_condition = ($('div[id=freight-truck]>div>div.portlet-body>div.row.static-info:contains(Condition)>div.value>span').length > 0 ? $('div[id=freight-truck]>div>div.portlet-body>div.row.static-info:contains(Condition)>div.value>span')[0].style.color : false);
    if (truck_condition == "red")
    {
        // go to truck page and let's repair it there
        $('button[onclick*=garage_truck]').click();
    }

    // trailer condition
    let trailer_condition = ($('div[id=freight-trailer]>div>div.portlet-body>div.row.static-info:contains(Condition)>div.value>span').length > 0 ? $('div[id=freight-trailer]>div>div.portlet-body>div.row.static-info:contains(Condition)>div.value>span')[0].style.color : false);
    if (trailer_condition == "red")
    {
        // go to trailer page and let's repair it there
        $('button[onclick*=garage_trailer]').click();
    }

    let trucker_tired = ($('span[id=status]:contains(trucker is falling)').length > 0);
    if (trucker_tired) $('div[id=freight-employees]>div>div.portlet-body>div.row.static-info:contains(Trucker)>div.value>button').click();

    let whemp_tired = ($('span[id=status]:contains(employee is falling)').length > 0);
    if (whemp_tired) $('div[id=freight-employees]>div>div.portlet-body>div.row.static-info:contains(Employee)>div.value>button').click();
    


    if(a == '0%'){

        Utils.Log("0% - Load");

        //freightautowhemployee();
        // check employee status
        let trucker_status = $('div[id=freight-employees]>div>div.portlet-body>div.row.static-info:contains(Status)>div.value')[0].outerText;
        let wh_status = $('div[id=freight-employees]>div>div.portlet-body>div.row.static-info:contains(Status)>div.value')[1].outerText;;
        
        if ((trucker_status.split(" ")[1] == "Available" && trucker_status.split(" ")[0] != "0") || (wh_status.split(" ")[1] == "Available" && wh_status.split(" ")[0] != "0" ))
        {
            // any of them is available
            // click on random
            $('button[onclick*=freightautowhemployee]').click();
        }

        // check whether we have a trailer and select one
        let trailer_status = $('div[id=freight-trailer]>div>div.portlet-body>div.row.static-info:contains(Status)>div.value').text().trim();
        if (trailer_status != "0 Available" )
        {
            // click on random
            $('button[onclick*=freightautotrailer]').click();    
        }

        // check whether we have a truck and select one
        let truck_status = $('div[id=freight-truck]>div>div.portlet-body>div.row.static-info:contains(Status)>div.value').text().trim();
        if (truck_status != "0 Available")
        {
            // click on random
            console.log("Select truck")
            $('button[onclick*=freightautotruck]').click();    
        }
        

        // if everything is okay start loading
        // check if trailer is not repaired and whemployee not sleeping
        if (trailer_status == 'Ready' && wh_status == 'Ready')
        {
            $('button[onclick*=freightstartloading]').click();
        }
        else 
        {
            // check next
            // we don't go back to the warehouse because it would be a loop in this way
            if ($('i.fa-arrow-right').parent()[0].disabled != true) $('i.fa-arrow-right').parent().click();
            else Utils.GoTo.warehouse();

        }
    }

    if(a == '13%'){ //loading
        console.log("Loading.... Go to warehouse");
        Utils.GoTo.warehouse();
    }

    if(a == '25%'){

        // Check tires
        let tires = parseInt($('div.row.static-info:contains(Tires)').find('.value').text().trim());
        if(tires < 15) {
            //Utils.Log("change tires");
            // "location.href='index.php?a=garage_truck&t=388259';"
            let garage__href = $('div.row.static-info:contains(Truck)>div.value>button').last().attr('onclick');
            //Utils.Open.truck(); // TODO Truck ID missing
            $('div[id=freight-truck]>div>div.portlet-body>div.row.static-info:contains(Truck)>div.value>button').click();
        }
        // TODO - check whether we have employees
        //freightautowhemployee();

        

        // TODO - check trailer condition
        
        // TODO - check truck condition
        // TODO - check fuel
        
        // Let's Driver
        //freightstartdriving();
        $('button[onclick*=freightstartdriving]').click();
    }

    if(a == '38%'){ //driving, cannot do anything, go back driving
        console.log("Driving.... Go to Warehouse");
        Utils.GoTo.warehouse();
    }

    if(a == '40%'){ //Out of Fuel
        freightcontinue();
        setTimeout(Utils.GoTo.warehouse, 50);
    }

    if(a == '50%'){
        //freightstartunloading();
        $('button[onclick*=freightstartunloading]').click();
    }

    if(a == '63%'){ //unloading
        let from = $('div.row.static-info:contains(Destination)').find('.value').text().trim();
        let type = $('div.row.static-info:contains(Type)').find('.value').text().trim();

        Utils.GoTo.trips({from: from, type: type});
    }

    if(a == '75%'){
        //freightautowhemployee();
        //freightstartfinishing();
        $('button[onclick*=freightstartfinishing]').click();
    }

    if(a == '88%'){
        Utils.GoTo.warehouse();
    }

    // TODO - setup back refresh
    //Utils.Refresh(10000);

})();
