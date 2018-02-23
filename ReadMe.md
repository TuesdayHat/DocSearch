# DocSearch

#### Gives a list of doctors in an area. Feb 16, 2018

#### Adam Calhoun

## Description
_Enter a location and a health problem to find a doctor who specialized in treating your problem near you._

## Setup
* clone repo from github
* navigate command line/terminal to the root of the project folder
* Initialize NPM (run ```npm init```)
* run ```npm install```

* Get yourself an API key from [BetterDoctor](https://developer.betterdoctor.com/)
  * go to the above link, and sign up for a free API key if you don't have one.
  * fill out the form
  * your key should be listed on the front page OR under My Account => Applications
    * the key should look like a long jumble of letters and numbers
* in the root directory (whereverYouClonedThisRepo/DocSearch), create a file named .env
  * in this file, copy and paste this line of code: ```exports.apiKey = "APIKEY"```
  * replace APIKEY with the key you just got from BetterDoctor

* build the webpage from source code with the script ```npm run prod```
* open DocSearch/build/index.html in browser
* OPTIONAL:
  * run automated tests with ```npm run test```
  * start development server with ```npm run dev```

## To Do
* When generating list of ailments to search for:
  * sort the list alphabetically
  * possibly have multiple dropdowns, so you don't have a single menu with a bit under 500 items. Or turn them all into links/buttons or something.
* can probably clean up/separate out the Doctor properties.
* give a full list of all practices and phone numbers, rather than just the first one.

## Technologies Used
* JavaScript
* html
* WebPack
* mocha

### License
*This application is provided as-is under the MIT license.*

Copyright (c) **_Adam Calhoun_**
