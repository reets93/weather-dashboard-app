// prompt user to enter API key so that mine is not public
// var apiKEY = prompt("Please enter your OpenWeather API key to continue")

var apiKEY = "67ab21e9ad344035c753856c9739f6f2"
console.log(apiKEY)
var cityName;

// event lister for submit button
$('#search-button').on("click", function weatherData(e) {
    e.preventDefault()

    // clears weather data sections when new city searched
    $('#today').empty()
    $('#forecast-title').empty()
    $("#forecast").empty()

    // persist local storage here? 


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
        console.log("searchInput test")
        $("#history").append(searchInput)

        $('#historical-btn').on("click", function (event) {
            event.target
            console.log("historical button")
            cityName = $("#historical-btn").innerHTML
            console.log("hist - city name:"+cityName)

        })        
        
        // local storage for buttons 
        // persist local storage (add at top of function alongside empty() and after prevent default)
        // link button click to search for city (use val() for city name search?) and consider event.target? 


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
        var currentTemp = $('<p>')
        currentTemp.text("Temp: " + today.celsius + "°C")

        var currentWind = $('<p>')
        currentWind.text("Wind: " + today.wind + " KPH")

        var currentHumidity = $('<p>')
        currentHumidity.text("Humidity: " + today.humidity + "%")

        // styling and append details to today section
        $("#today").css({ border: "solid 1px grey", padding: "8px" }).append(todayTitle).append(currentTemp).append(currentWind).append(currentHumidity)

        // create element for forecast heading
        var forecastTitle = $('<h4>')
        forecastTitle.text("5-Day Forecast:")
        $("#forecast-title").append(forecastTitle)


        // Weather details for 5-day forecast
        var fiveForecast = [
            {
                date: moment().add(1, 'days').format("D-MM-YY"),
                icon: "https://openweathermap.org/img/wn/" + response.list[12].weather[0].icon + ".png",
                temp: Math.floor(response.list[12].main.temp - 273.15),
                wind: response.list[12].wind.speed,
                humidity: response.list[12].main.humidity,
            },
            {
                date: moment().add(2, 'days').format("D-MM-YY"),
                icon: "https://openweathermap.org/img/wn/" + response.list[20].weather[0].icon + ".png",
                temp: Math.floor(response.list[20].main.temp - 273.15),
                wind: response.list[20].wind.speed,
                humidity: response.list[20].main.humidity,
            },
            {
                date: moment().add(3, 'days').format("D-MM-YY"),
                icon: "https://openweathermap.org/img/wn/" + response.list[28].weather[0].icon + ".png",
                temp: Math.floor(response.list[28].main.temp - 273.15),
                wind: response.list[28].wind.speed,
                humidity: response.list[28].main.humidity,
            },
            {
                date: moment().add(4, 'days').format("D-MM-YY"),
                icon: "https://openweathermap.org/img/wn/" + response.list[36].weather[0].icon + ".png",
                temp: Math.floor(response.list[36].main.temp - 273.15),
                wind: response.list[36].wind.speed,
                humidity: response.list[36].main.humidity,
            },
            {
                date: moment().add(5, 'days').format("D-MM-YY"),
                icon: "https://openweathermap.org/img/wn/" + response.list[39].weather[0].icon + ".png",
                temp: Math.floor(response.list[39].main.temp - 273.15),
                wind: response.list[39].wind.speed,
                humidity: response.list[39].main.humidity,
            }
        ]

        // function that creates 5 day forecast 
        function dailyForecast() {
            console.log(fiveForecast)

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
                temp.text("Temp: " + fiveForecast[i].temp + "°C")

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

        //call the daily forecast function
        dailyForecast()
    })



})



// clear search input after clicking search
//validation for adding a correct city 