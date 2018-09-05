/*  Project 01_11_02

    Author: Braddock Ghahate
    Date: 08.31.18

    Filename: script.js
*/

"use strict";

//global variables
var httpRequest = false; // var to hold XMR object
var entry = "^IXIC";

// function to create an XMR
function getRequestObject() {
    //instantiate an XHR object
    try {
        httpRequest = new XMLHttpRequest();
    } catch (errorMessage) {
        return false;
    }
    alert(httpRequest);
    return httpRequest;
}
// Function to stop default submission from executing
function stopSubmission(evt) {
    alert("stopSubmission()");
    if (evt.preventDefault) {
        evt.preventDefault();
    } else {
        evt.returnValue = false;
    }
    getQuote();
}
// function to request stock quote data from the server
function getQuote() {
    alert("getQuote()");
    if (document.getElementsByTagName("input")[0].value) {
        entry = document.getElementsByTagName("input")[0].value;
    }
    if (!httpRequest) {
        httpRequest = getRequestObject();
    }
}

// event handler to call function as an event handler on the submit event
var form = document.getElementsByTagName("form")[0];
if (window.addEventListener) {
    form.addEventListener("submit", stopSubmission, false);
    window.addEventListener("load", getQuote, false);
} else if (window.attachEvent) {
    form.attachEvent("onsubmit", stopSubmission);
    window.attachEvent("onload", getQuote);
}
