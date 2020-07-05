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
	// need to add leading zeros :P
	document.querySelector('.hours').innerHTML = addLeadingZero(currentTime.getHours());
	document.querySelector('.minutes').innerHTML = addLeadingZero(currentTime.getMinutes());
	document.querySelector('.seconds').innerHTML = addLeadingZero(currentTime.getSeconds());

}

const xhr = new XMLHttpRequest();

const url = 'https://api-to-call.com/endpoint';

// Saving response to jSon format 
xhr.responseType  = 'json';

// event handler 
xhr.onreadystatechange = () => {
  // Check if the request is finish.
  if (xhr.readyState === XMLHttpRequest.DONE) {
    return xhr.response; 
  }
};

// Opens request and send object
xhr.open('GET', url);
xhr.send();