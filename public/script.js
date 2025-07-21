//const { response } = require("express");

//const { response } = require("express");


//const localHostUrl = "http://localhost/port3001/data";

document.getElementById("crud-r").addEventListener("click" , function(){
    //document.getElementById("message").innerHTML = "some activity";
    //fetching the data from local host server
    fetch("http://localhost:3001/data")
    //fetch("./info.txt")
    .then(response=> response.json())
    //.then(response => response.text())
    // output the data to textarea id: output
    .then((data) => document.getElementById("output").innerHTML = data);
});