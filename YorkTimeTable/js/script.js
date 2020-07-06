'use strict';

// GLOBAL VARIABLES 
let minuteLoop = 0; // duration time
const MaxItemPerPage = 1;
let currentPage = 1;
let NumbOfPage = 0;
let currentIdx = 5;
let serviceData = [];
let rotationTimer = 5000;


// Header Digital Clock

function display() {
    let currentTime = new Date();
    console.log(currentTime);
    console.log(currentTime.getHours());

    console.log(currentTime.getMinutes());
	// need to add leading zeros :P
	document.querySelector('.hours').innerHTML = currentTime.getHours();
	document.querySelector('.minutes').innerHTML = currentTime.getMinutes();
	document.querySelector('.seconds').innerHTML = currentTime.getSeconds();

}

display();

setInterval(display,500);


var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        myFunction(this);
    }
};
xhttp.open("GET", "http://iris2.rail.co.uk/tiger/3001E1.xml", true);
xhttp.send();

function myFunction(xml) {
    var xmlDoc = xml.responseXML;
    var x = xmlDoc.getElementsByTagName('ServiceType')[0];
    var y = x.childNodes[0];
    /*var calpoint='   <div class="dest-calling-point-wrapper">";  
    calpoint +='<div class="platform-heading">';
     calpoint  +='<div class="service-heading">'+
            '<div class="time-label">'
                +'<span>'++'</span>:' 
                +'<span>'++'</span>'
            +'</div>'
            +'<div class="service-status">'++'</div>'
         +'</div>'
        +'<div class="platform-number">'+Platform+'</div>'
    '</div>'

   +'<div class="calling-point-names">' 
      +'<div class="destination-name-label">Edinburgh</div>'
       +'<div class="calling-point-at-lable">This has called at:</div>' 
        +'<div class="calling-point-name">'
            
        +'</div>'
    +'</div>'
+'</div>' ;*/
    document.getElementById("ServiceType").innerHTML =
    y.nodeValue; 

}