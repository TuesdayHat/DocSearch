var apiKey = require('./../.env').apiKey;

export function searchDoc(search) {
  return new Promise(function(resolve, reject){
    let request = new XMLHttpRequest();
    let url = search;

    request.onload = function(){
      if(this.status === 200){
        resolve(request.response);
      } else {
        reject(Error(request.statusText));
      }
    }

    request.open('GET', url, true);
    request.send();
  });
}

export function getConditions(){
  return new Promise(function(resolve, reject){
    let request = new XMLHttpRequest();
    let url = `https://api.betterdoctor.com/2016-03-01/conditions?user_key=${apiKey}`;

    request.onload = function(){
      if (this.status === 200){
        resolve(request.response);
      } else {
        reject(Error(request.statusText));
      }
    }

    request.open('GET', url, true);
    request.send();
  });
}
