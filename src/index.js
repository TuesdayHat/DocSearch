var apiKey = require('./../.env').apiKey;
import {searchDoc, getConditions} from './DocSearch.js';

$(document).ready(function(){

  const conditions = getConditions(); //builds dropdown of all valid conditions to search for
  conditions.then(function(response){
    let ails = JSON.parse(response);
    for (let i=0;i<ails["data"].length;i++){
      // console.log(ails["data"][i]["name"]);
      let name = ails["data"][i]["name"];
      let uid = ails["data"][i]["uid"];
      $('#condition').append(`<option value='${uid}'>${name}</option>`);
    }
  })

  $('#search').submit(function(){
    event.preventDefault()
    const state = $("#locState").val().toLowerCase();
    const city = $("#locCity").val().toLowerCase();
    const location = `${state}-${city}`;//creates a location slug

    let query = $("#condition"); //what ails you

    const url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${query}&location=${location}&skip=0&limit=10&user_key=${apiKey}`;
    const doctors = searchDoc(url);

    doctors.then(function(response){
      let docs = JSON.parse(response);

    })
  })//end click event
})//end document
