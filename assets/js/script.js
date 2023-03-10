// prompt user to enter API key so that mine is not public
// var apiKEY = prompt("Please enter your OpenWeather API key to continue")

var apiKEY = "67ab21e9ad344035c753856c9739f6f2"

var cityName;
var searchCity;
var historySearch = []

// persist local storage
for (i = 0; i < localStorage.length; i++) {
    var histBtn = $('<button>').addClass("historical-btn")
    histBtn.text(localStorage.getItem("city" + [i])).css({ "background-color": "##D5E8F6", color: "#474954", "border-radius": "4px", "margin-top": "8px" })
    $("#history").append(histBtn)
}

// event lister for submit button
$('#search-button').on("click", function weatherData(e) {
    e.preventDefault()
    e.stopPropagation()

    // clears weather data sections when new city searched
    $('#today').empty()
    $('#forecast-title').empty()
    $("#forecast").empty()

    //search terms + query url 
    cityName = $('#search-input').val().trim()
    console.log(cityName)
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKEY

    // ajax function 
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)

        //clears search input after submit
        $('#search-input').val('')

        //creates historical button 
        var searchInput = $('<button>').addClass("historical-btn")
        searchInput.text(cityName).css({ "background-color": "##D5E8F6", color: "#474954", "border-radius": "4px", "margin-top": "8px" })
        // creates event listener for newly created button
        searchInput.on('click', function (button) {
            var content = $(button.target).text()
            var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + content + "&appid=" + apiKEY
        
            //ajax function
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                console.log(response)
                // clears the dashboard divs
                $('#today').empty()
                $('#forecast-title').empty()
                $('#forecast').empty()
        
                // calls the function for today's weather
                todayWeather(response)
        
                // calls the function for the forecast
                dailyForecast(response)
        
            })
        })
        console.log("searchInput test")
        $("#history").prepend(searchInput)
        historySearch.push(searchInput.text())

        // calls function for local storage
        store()

        // calls function for today's weather
        todayWeather(response)

        //call the daily forecast function
        dailyForecast(response)


    }).catch(err => alert("Please enter a valid city name. Check spelling and try again."))
    //catch function learnt from : https://www.youtube.com/watch?v=GXrDEA3SIOQ
    // })
})

// function for setting local storage
function store() {
    for (let i = 0; i < historySearch.length; i++) {
        localStorage.setItem("city" + [i], historySearch[i])
    }
}

// function for today's weather
function todayWeather(response) {
    // today's weather data
    var today =
    {
        date: moment().format("(D MMM YYYY)"),
        city: response.city.name,
        celsius: Math.floor(response.list[0].main.temp - 273.15),
        wind: response.list[0].wind.speed,
        humidity: response.list[0].main.humidity,
        icon: "https://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + ".png"
    }

    // create h2 element for today's city + date
    var todayTitle = $('<h2>')
    todayTitle.text(today.city + " " + today.date)

    // create current weather icon
    var currentIcon = $('<img>')
    currentIcon.attr("src", today.icon)
    todayTitle.append(currentIcon)

    //create p elements for today's weather data
    // temp
    var currentTemp = $('<p>')
    currentTemp.text("Temp: " + today.celsius + "??C")

    // wind
    var currentWind = $('<p>')
    currentWind.text("Wind: " + today.wind + " KPH")

    // humidity
    var currentHumidity = $('<p>')
    currentHumidity.text("Humidity: " + today.humidity + "%")

    // styling and append details to today section
    $("#today").css({ border: "solid 1px grey", padding: "8px" }).append(todayTitle).append(currentTemp).append(currentWind).append(currentHumidity)

    // create element for forecast heading
    var forecastTitle = $('<h4>')
    forecastTitle.text("5-Day Forecast:")
    $("#forecast-title").append(forecastTitle)
}

// function that creates 5 day forecast 
function dailyForecast(response) {
    // Weather details for 5-day forecast
    var fiveForecast = [
        // day 1 forecast
        {
            date: moment().add(1, 'days').format("D-MM-YY"),
            icon: "https://openweathermap.org/img/wn/" + response.list[12].weather[0].icon + ".png",
            temp: Math.floor(response.list[12].main.temp - 273.15),
            wind: response.list[12].wind.speed,
            humidity: response.list[12].main.humidity,
        },
        //day 2 forecast
        {
            date: moment().add(2, 'days').format("D-MM-YY"),
            icon: "https://openweathermap.org/img/wn/" + response.list[20].weather[0].icon + ".png",
            temp: Math.floor(response.list[20].main.temp - 273.15),
            wind: response.list[20].wind.speed,
            humidity: response.list[20].main.humidity,
        },
        // day 3 forecast
        {
            date: moment().add(3, 'days').format("D-MM-YY"),
            icon: "https://openweathermap.org/img/wn/" + response.list[28].weather[0].icon + ".png",
            temp: Math.floor(response.list[28].main.temp - 273.15),
            wind: response.list[28].wind.speed,
            humidity: response.list[28].main.humidity,
        },
        // day 4 forecast
        {
            date: moment().add(4, 'days').format("D-MM-YY"),
            icon: "https://openweathermap.org/img/wn/" + response.list[36].weather[0].icon + ".png",
            temp: Math.floor(response.list[36].main.temp - 273.15),
            wind: response.list[36].wind.speed,
            humidity: response.list[36].main.humidity,
        },
        // day 5 forecast
        {
            date: moment().add(5, 'days').format("D-MM-YY"),
            icon: "https://openweathermap.org/img/wn/" + response.list[39].weather[0].icon + ".png",
            temp: Math.floor(response.list[39].main.temp - 273.15),
            wind: response.list[39].wind.speed,
            humidity: response.list[39].main.humidity,
        }
    ]

    console.log(fiveForecast)

    // for loop to create the five-day forecast 
    for (let i = 0; i < fiveForecast.length; i++) {
        // create div
        var day = $('<div>').css({ "margin-left": "12px", padding: "20px", color: "white", "background-color": "#0A3668" })
        $("#forecast").append(day)

        //create date
        var date = $('<h6>')
        date.text(fiveForecast[i].date)

        //create icon
        var icon = $('<img>')
        icon.attr("src", fiveForecast[i].icon)

        //create temp
        var temp = $('<p>')
        temp.text("Temp: " + fiveForecast[i].temp + "??C")

        //create wind
        var wind = $('<p>')
        wind.text("Wind: " + fiveForecast[i].wind + " kph")

        //create humidity
        var humidity = $('<p>')
        humidity.text("Humidity: " + fiveForecast[i].humidity + "%")

        //append
        day.append(date).append(icon).append(temp).append(wind).append(humidity)
    }

}

//event delegation for the buttons in search history to search for city when clicked 
$('.historical-btn').on('click', function searchHistory(button) {
    var content = $(button.target).text()
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + content + "&appid=" + apiKEY

    //ajax function
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        // clears the dashboard divs
        $('#today').empty()
        $('#forecast-title').empty()
        $('#forecast').empty()

        // calls the function for today's weather
        todayWeather(response)

        // calls the function for the forecast
        dailyForecast(response)

    })
})
