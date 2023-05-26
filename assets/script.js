//Selectors
var localDateTime = document.querySelector("#localDateTime")
var aside = document.querySelector("aside")
var submitBtnEl = document.querySelector("#form")
var userInputEl = document.querySelector("#userInput")
var searchedCity = document.querySelector("#searchedCity")
var forecastDiv = document.querySelector("#forecastDiv")
var icon = document.querySelector(".icon")
var tempNow = document.querySelector("#currentTemp")
var humNow = document.querySelector("#currentHumidity")
var windNow = document.querySelector("#currentWindSpeed")

//variables
var geoLatitude = ""
var geoLongitude = ""

//Displays the current date and time in the header
function displayTime() {
    var localDateTime = document.querySelector("#localDateTime")
    var today = dayjs().format('MMM DD, YYYY HH:mm');
    localDateTime.textContent = today
  }

  displayTime()


//This function is the primary function that executes on a submit event from the user that pulls the latitude and longitude of a queried city name. 

                //Tutor Help From Faran Navazi to change parameters to city so that the function can pass through either the user input, or the buttons created from previous searches. 
function getAPITest(city) {
    var latLonCoordsURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + city +"&limit=1&appid=42c66a48a76a8c63ca42a8a780c249a4";
    
    searchedCity.textContent = city
    
    fetch(latLonCoordsURL)
    .then(function(response){
        return response.json()
    }) .then(function(data){
        for (let i = 0; i < data.length; i++) {
            console.log(data)
            geoLatitude = data[i].lat;
            geoLongitude = data[i].lon;
            console.log(geoLatitude)
            console.log(geoLongitude)
        } 
                //assistance with chaining fetch requests courtesty of instructor Becky Goldstein
    }).then(function(){
            getWeatherNow()
            getWeather5()
        })
}

//This function pulls the current weather data and displays it on screen.
function getWeatherNow(){
    var weatherNowUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + geoLatitude + "&lon=" + geoLongitude + "&units=imperial&appid=42c66a48a76a8c63ca42a8a780c249a4"

    fetch(weatherNowUrl)
    .then(function(response){
        return response.json();
    }) .then(function(data){
        console.log(data);
        var todayDateTime = document.querySelector("#currentDate")
        var today = dayjs.unix(data.dt)
        todayDateTime.textContent = today
        icon.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
        tempNow.textContent = data.main.temp;
        humNow.textContent = data.main.humidity;
        windNow.textContent = data.wind.speed;
    })
}

//This function pulls the weather data for the next 5 days and dynamically creates the elements that the data will be displayed in.
function getWeather5(){
var weather5Url = "https://api.openweathermap.org/data/2.5/forecast?lat=" + geoLatitude + "&lon=" + geoLongitude + "&units=imperial&appid=42c66a48a76a8c63ca42a8a780c249a4"
    
    fetch(weather5Url)
    .then(function(response){
        return response.json()
    }) .then(function(data){
        console.log(data)
        
                //tutor Assistance from Faran Navazi  for clearing any dynamically created divs from previous searches without reloading the page. 
            forecastDiv.innerHTML = ""

        for (let j = 0; j < data.list.length; j++){
            if ((j === 6) ||
            (j === 14) ||
            (j === 22) ||
            (j === 30) ||
            (j === 38)) {

          var dynoBoxDiv = document.createElement("div")
          var dynoDate = document.createElement("p")
          dynoDate.textContent = "Date: " + data.list[j].dt_txt
          var dynoIcon = document.createElement("img")
          dynoIcon.setAttribute("id", "forecastItemIcon")
          dynoIcon.setAttribute("src", `https://openweathermap.org/img/wn/${data.list[j].weather[0].icon}@2x.png`)
          var dynoTemp = document.createElement("p")
          dynoTemp.textContent = "Temperature: " + data.list[j].main.temp + " °F"
          var dynoHum = document.createElement("p")
          dynoHum.textContent = "Humidity: " + data.list[j].main.humidity + "%"
          var dynoWindSpeed = document.createElement("p")
          dynoWindSpeed.textContent = "Wind Speed: " + data.list[j].wind.speed + " MPH"
          dynoBoxDiv.setAttribute("class", "forecastItem") 
          forecastDiv.appendChild(dynoBoxDiv) 
          dynoDate.appendChild(dynoIcon)
          dynoBoxDiv.appendChild(dynoDate)
          dynoBoxDiv.appendChild(dynoTemp)
          dynoBoxDiv.appendChild(dynoHum)
          dynoBoxDiv.appendChild(dynoWindSpeed)
        }
    }
    })

}

//The array that is created from items stored in local storage
var preSearchedCities = JSON.parse(localStorage.getItem("cityName")) || []

function submitHandler(event){
    event.preventDefault()
    console.log(userInputEl.value)
            //Assistance from Faran Navazi
    var exists = preSearchedCities.includes(userInputEl.value)
    if (!exists) {
       preSearchedCities.push(userInputEl.value) 
    }
    saveSearchedCity();
    getAPITest(userInputEl.value);
}
            //Assistance from Faran Navazi for dynamically adding an even listener to a dynamically created button.
function displayPreSearchedCities(){
    for (var i = 0; i < preSearchedCities.length; i++) {
        var cityButton = document.createElement("button")
        var cityButtonText = preSearchedCities[i]
        cityButton.textContent = cityButtonText
        cityButton.onclick = searchAgain 
        aside.appendChild(cityButton)
      } 
}

displayPreSearchedCities()

            //Assistance by Faran Navazi for applying event.target and pass it through the getAPITest function again without re-writing any of the code for this function. 
function searchAgain(event){
    console.log (event.target.textContent)
    getAPITest(event.target.textContent)
}

function saveSearchedCity(){
    localStorage.setItem("cityName", JSON.stringify(preSearchedCities))
    console.log(preSearchedCities)
    }
submitBtnEl.addEventListener("submit", submitHandler)