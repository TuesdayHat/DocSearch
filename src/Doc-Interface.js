var apiKey = require('./../.env').apiKey;
import {searchDoc, getConditions} from './DocSearc.js';

$(document).ready(function(){

  const conditions = getConditions(); //builds dropdown of all valid conditions to search for
  for (let i=0;i<conditions.length;i++){
    const name = conditions["data"][i]["name"];
    $('#query').append(name);
  }

  $('#search').submit(function(){
    const state = $("#locState").val().toLowerCase();
    const city = $("#locCity").val().toLowerCase();
    const location = `${state}-${city}`;//creates a location slug

    let query = $("#query"); //what ails you

    const url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${query}&location=${location}&skip=0&limit=10&user_key=${apiKey}`;
    const response = searchDoc(url);


  })

})
