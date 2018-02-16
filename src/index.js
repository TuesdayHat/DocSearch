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
    $('.results').empty();
    const state = $("#locState").val();
    const city = $("#locCity").val();
    const location = `${state.toLowerCase()}-${city.toLowerCase()}`;//creates a location slug

    let query = $("#condition").val(); //what ails you

    const url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${query}&location=${location}&skip=0&limit=10&user_key=${apiKey}`;
    const doctors = searchDoc(url);

    doctors.then(function(response){
      let docs = JSON.parse(response);
      // console.log(docs["data"][1]["practices"][0]["visit_address"]["city"]);
      if(docs["meta"]["count"] === 0){
        /*put 'No Doctors Matched Your Search' in Results*/
        $(".results").text("<h3>No doctors matched your search.<h3>")
      }else{
        for (var i = 0; i < docs["data"].length; i++) {
          const doctor = docs["data"][i];

          //profile
          const docImg = doctor["profile"]["image_url"];
          const docFirst = doctor["profile"]["first_name"];
          const docLast = doctor["profile"]["last_name"];
          const docName = docFirst + " " + docLast;

          //practices
          const docAccept = doctor["practices"][0]["accepts_new_patients"];
          const docZip = doctor["practices"][0]["visit_address"]["zip"];
          const docCity = doctor["practices"][0]["visit_address"]["city"];
          const docState = doctor["practices"][0]["visit_address"]["state"];
          const docStreet = doctor["practices"][0]["visit_address"]["street"];
          const docAddress = `${docStreet} ${docCity}, ${docState} ${docZip}`;

          const docPhone = searchPhones();
          // console.log(doctor["practices"][0]["phones"]);
          const accept = acceptSentence(docAccept, docLast);

          //Specialties
          const docSpecial = doctor["specialties"][0]["description"];

          $('.results').append(
            `<div class="doctors">
              <img src="${docImg}"><br>
              <h3>${docName}</h3>
              <p>${docSpecial}</p>
              <p>${docAddress}</p>
              <p>${docPhone}</p>
              <p>${accept}</p>
            </div>`
          )//note: add alt text to image

          //helper functions
          function searchPhones(){
            console.log(doctor["practices"][0]["phones"]);
            for (let j=0;j<doctor["practices"][0]["phones"].length;j++){
              const phone = doctor["practices"][0]["phones"][j];
              if(phone.type !== "fax"){
                const num = phone["number"]
                return `(${num.slice(0,3)}) ${num.slice(3, 6)}-${num.slice(6)}`;
              }
            }
          }
          function acceptSentence(accept, docLast){
            if(accept){
              return `Dr. ${docLast} is accepting new patients!`
            } else {
              return `Dr. ${docLast} not accepting new patients at this time.`
            }
          };
        }
      }

    })
  })//end click event
})//end document
