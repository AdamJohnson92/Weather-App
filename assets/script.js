var submitBtnEl = document.querySelector("#form")
var userInputEl = document.querySelector("#userInput")
var searchedCity = document.querySelector("#searchedCity")
var preSearchedCities = []

function getApiTest() {
    var latLonCoordsURL = "http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=42c66a48a76a8c63ca42a8a780c249a4";

    fetch(latLonCoordsURL)
    .then(function(response){
        console.log(response)
        return response.json()
        
    }) .then(function(data){
        console.log(data)
    })
}

getApiTest()

// function getApi() {
//     var latLonCoords = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityNameEl + "&limit=5&appid=42c66a48a76a8c63ca42a8a780c249a4";

//     var requestUrl = "api.openweathermap.org/data/2.5/forecast?lat=" + cityLat + "&lon=" + cityLon + "&appid=42c66a48a76a8c63ca42a8a780c249a4"
// }


function submitHandler(event){
    event.preventDefault()
    searchedCity.textContent = userInputEl.value
    console.log(userInputEl.value)
    console.log(10)
}

submitBtnEl.addEventListener("submit", submitHandler)