(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();

            let period = "AM"; 

            if (h >= 12) {
                period = "PM";
            }

            if (h > 12) {
                h -= 12; 
            }
    
            if (h == 0) {
                h = 12; 
            }
    
            if (m < 10) {
                m = "0" + m;
            }
    
            if (s < 10) {
                s = "0" + s;
            }
            c.innerHTML = h + ":" + m + ":" + s + " " + period;
            
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);

    
    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";
    
    function estimateDelivery(event) {
        event.preventDefault();
        
        let fname = document.getElementById("fname").value;
        let lname = document.getElementById("lname").value;
        let radios = document.getElementsByName("courier");
        let isRadioSelected = Array.from(radios).some(radio => radio.checked);
        
    
        if (!fname || !lname) {
            alert("Palun sisestage mõlemad nimed.");
            return;
        }
        
        if (/\d/.test(fname) || /\d/.test(lname)) {
            alert("Nimed ei tohi sisaldada numbreid.");
            return;
        }
        
        if (!isRadioSelected) {
            alert("Palun valige kuller.");
            return;
        }

        let linn = document.getElementById("linn");
        let hind; 

        if (linn.value === "") {
            
            alert("Palun valige nimekirjast linn");
            
            linn.focus();
            
            return;
            
            
        } else {
            switch (linn.value){
                case "tln":
            hind = "0,00 &euro;";
            break;
        case "trt":
        case "nrv":
            hind = "2,50 &euro;";
            break;
        case "prn":
            hind = "3,00 &euro;";
            break;
            }
            e.innerHTML = hind;
            
        }        
        
        console.log("Tarne hind on arvutatud");
    }
    
})();



// map

let mapAPIKey = "Aje3Yf3eUXTSm-CmWoisWhPtAO9prQLYi9P557jxobvNqcEFdrkt4PJl7FiP8ZGB";

let map;

function GetMap() {
    
    "use strict";

    let centerPoint = new Microsoft.Maps.Location(
            58.38104, 
            26.71992
        );

    let tallinnPoint = new Microsoft.Maps.Location(
        59.4370,
        24.7536
    )

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint,
        zoom: 14,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });
    
    let pushpin = new Microsoft.Maps.Pushpin(centerPoint, {
            title: 'Tartu Ülikool',
            subTitle: 'Hea koht',
            text: 'UT'
        });

    let tallinnPushpin = new Microsoft.Maps.Pushpin(tallinnPoint, {
            title: 'Tallinna Vanalinn',
            subTitle: 'Ka hea koht, aga mitte nii hea',
            text: 'Tallinna vanalinn'
        });


    let locations = [centerPoint, tallinnPoint];
    let bounds = Microsoft.Maps.LocationRect.fromLocations(locations);
    map.setView({ bounds: bounds });

    let infobox = new Microsoft.Maps.Infobox(centerPoint, {
        visible: false
    });

    infobox.setMap(map);


    Microsoft.Maps.Events.addHandler(pushpin, 'click', function() {
        infobox.setLocation(centerPoint);
        infobox.setOptions({
            visible: true,
        });
    });

    Microsoft.Maps.Events.addHandler(tallinnPushpin, 'click', function() {
        infobox.setLocation(tallinnPoint);
        infobox.setOptions({
            visible: true,
        });
    });

    map.entities.push(pushpin, tallinnPushpin);

}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

