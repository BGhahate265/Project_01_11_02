/*  Project 01_11_02

    Author: Braddock Ghahate
    Date: 08.31.18

    Filename: script.js
*/

"use strict";

//global variables
var httpRequest = false; // var to hold XMR object
var entry = "MSFT";

// function to create an XMR
function getRequestObject() {
    //instantiate an XHR object
    try {
        httpRequest = new XMLHttpRequest();
    } catch (errorMessage) {
        return false;
    }
    return httpRequest;
}
// Function to stop default submission from executing
function stopSubmission(evt) {
    if (evt.preventDefault) {
        evt.preventDefault();
    } else {
        evt.returnValue = false;
    }
    getQuote();
}
// function to request stock quote data from the server
function getQuote() {
    if (document.getElementsByTagName("input")[0].value) {
        entry = document.getElementsByTagName("input")[0].value;
    } else {
        document.getElementsByTagName("input")[0].value = entry;
    }
    if (!httpRequest) {
        httpRequest = getRequestObject();
    }
    //protect against open request
    httpRequest.abort();
    // target request
    httpRequest.open("get", "StockCheck.php?t=" + entry, true);
    httpRequest.send(null);
    // event listener for onreadystatechange
    httpRequest.onreadystatechange = displayData;
}
//event handler to test data request/retrieval
function displayData() {
    if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        var stockResults = httpRequest.responseText;
        var stockItems = stockResults.split(/,|\"/);
        for (var i = stockItems.length - 1; i >= 0; i--) {
            if (stockItems[i] === "") {
                stockItems.splice(i, 1);
            }
        }
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
