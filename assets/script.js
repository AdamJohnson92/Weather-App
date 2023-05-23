var aside = document.querySelector("aside")
var submitBtnEl = document.querySelector("#form")
var userInputEl = document.querySelector("#userInput")
var searchedCity = document.querySelector("#searchedCity")


function getApiTest() {
    var latLonCoordsURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + userInputEl.value +"&limit=1&appid=42c66a48a76a8c63ca42a8a780c249a4";

    fetch(latLonCoordsURL)
    .then(function(response){
        return response.json()
        
    }) .then(function(data){
        console.log(data)
        for (var i = 0; i < data.length; i++) {
            console.log(data[i].lat);
            console.log(data[i].lon)
          }
    })
}

// function getApi() {
//     var latLonCoords = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityNameEl + "&limit=5&appid=42c66a48a76a8c63ca42a8a780c249a4";

//     var requestUrl = "api.openweathermap.org/data/2.5/forecast?lat=" + cityLat + "&lon=" + cityLon + "&appid=42c66a48a76a8c63ca42a8a780c249a4"
// }

var preSearchedCities = JSON.parse(localStorage.getItem("cityName")) || []

function submitHandler(event){
    event.preventDefault()
    searchedCity.textContent = userInputEl.value
    console.log(userInputEl.value)
    preSearchedCities.push(userInputEl.value)
    saveSearchedCity()
    getApiTest()
}

// function displayPreSearchedCities(){
//     for (var i = 0; i < preSearchedCities.length; i++) {
//         var cityButton = document.createElement("button")
//         var cityButtonText = document.createTextNode(localStorage.getItem(preSearchedCities[i])) 
//         cityButton = appendChild(cityButtonText)
//         aside = appendChild(cityButton)
//       } 
// }

//displayPreSearchedCities()

function saveSearchedCity(){
    
    
    localStorage.setItem("cityName", JSON.stringify(preSearchedCities))
    console.log(preSearchedCities)
    }

submitBtnEl.addEventListener("submit", submitHandler)