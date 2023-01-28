// prompt user to enter API key so that mine is not public
var apiKEY = prompt("Please enter your OpenWeather API key to continue")
console.log(apiKEY)
var cityName;



// event lister for submit button
$('#search-button').on("click", function weatherData(e) {
    e.preventDefault()
    $('#today').empty()
    cityName = $('#search-input').val().trim()
    console.log(cityName)
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKEY

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        console.log("city name: " + response.city.name)
        console.log("temp: " + Math.floor(response.list[0].main.temp - 273.15))
        console.log("wind: " + response.list[0].wind.speed)
        console.log("humidity: " + response.list[0].main.humidity + "%")

        // today's weather data
        var today = moment().format("(D MMM YYYY)")
        var theCity = response.city.name
        var todayCelsius = Math.floor(response.list[0].main.temp - 273.15)
        var todayWind = response.list[0].wind.speed
        var todayHumidity = response.list[0].main.humidity
        var todayIcon = response.list[0].weather[0].icon
        var todayIconURL = "https://openweathermap.org/img/wn/" + todayIcon + ".png"

        // create h2 element for today's city + date
        var todayTitle = $('<h2>')
        todayTitle.text(theCity + " " + today)

        var todayIconImg = $('<img>')
        todayIconImg.attr("src", todayIconURL)
        todayTitle.append(todayIconImg)

        $('#today').append(todayTitle)

        //create p elements for today weather data
        var todayDetailsTemp = $('<p>')
        todayDetailsTemp.text("Temp: " + todayCelsius + "°C")
        $("#today").append(todayDetailsTemp)

        var todayDetailsWind = $('<p>')
        todayDetailsWind.text("Wind: " + todayWind + " KPH")
        $("#today").append(todayDetailsWind)

        var todayDetailsHumidity = $('<p>')
        todayDetailsHumidity.text("Humidity: " + todayHumidity + "%")
        $("#today").append(todayDetailsHumidity)

        $("#today").css({ border: "solid 1px grey", padding: "8px" })

        // create element for forecast heading
        var forecastTitle = $('<h4>')
        forecastTitle.text("5-Day Forecast:")
        $("#forecast-title").append(forecastTitle)

        // create daily forecasts
        // day 1 forecast
        var day1 = $('<div>').attr("id", "day1").css({ "margin-left": "12px", padding: "20px", color: "white", "background-color": "#0A3668" })

        var day1Date = $('<h6>')
        day1Date.text(moment().add(1, 'day').format("D-MM-YY"))

        var day1Icon = response.list[12].weather[0].icon
        var day1IconURL = "https://openweathermap.org/img/wn/" + day1Icon + ".png"
        var day1Img = $('<img>')
        day1Img.attr("src", day1IconURL)

        var day1Temp = $('<p>')
        var day1Celsius = Math.floor(response.list[12].main.temp - 273.15)
        day1Temp.text("Temp: " + day1Celsius + "°C")

        var day1Wind = $('<p>')
        day1Wind.text("Wind: " + response.list[12].wind.speed + " kph")

        var day1Humidity = $('<p>')
        day1Humidity.text("Humidity: " + response.list[12].main.humidity + "%")

        day1.append(day1Date).append(day1Img).append(day1Temp).append(day1Wind).append(day1Humidity)
        $("#forecast").prepend(day1)


        // day 2 forecast
        var day2 = $('<div>').attr("id", "day1").css({ "margin-left": "12px", padding: "20px", color: "white", "background-color": "#0A3668" })

        var day2Date = $('<h6>')
        day2Date.text(moment().add(2, 'days').format("D-MM-YY"))

        var day2Icon = response.list[20].weather[0].icon
        var day2IconURL = "https://openweathermap.org/img/wn/" + day2Icon + ".png"
        var day2Img = $('<img>')
        day2Img.attr("src", day2IconURL)

        var day2Temp = $('<p>')
        var day2Celsius = Math.floor(response.list[20].main.temp - 273.15)
        day2Temp.text("Temp: " + day2Celsius + "°C")

        var day2Wind = $('<p>')
        day2Wind.text("Wind: " + response.list[20].wind.speed + " kph")

        var day2Humidity = $('<p>')
        day2Humidity.text("Humidity: " + response.list[20].main.humidity + "%")

        day2.append(day2Date).append(day2Img).append(day2Temp).append(day2Wind).append(day2Humidity)
        $("#forecast").append(day2)

        // day 3 forecast
        var day3 = $('<div>').attr("id", "day1").css({ "margin-left": "12px", padding: "20px", color: "white", "background-color": "#0A3668" })

        var day3Date = $('<h6>')
        day3Date.text(moment().add(3, 'days').format("D-MM-YY"))

        var day3Icon = response.list[28].weather[0].icon
        var day3IconURL = "https://openweathermap.org/img/wn/" + day3Icon + ".png"
        var day3Img = $('<img>')
        day3Img.attr("src", day3IconURL)

        var day3Temp = $('<p>')
        var day3Celsius = Math.floor(response.list[28].main.temp - 273.15)
        day3Temp.text("Temp: " + day3Celsius + "°C")

        var day3Wind = $('<p>')
        day3Wind.text("Wind: " + response.list[28].wind.speed + " kph")

        var day3Humidity = $('<p>')
        day3Humidity.text("Humidity: " + response.list[28].main.humidity + "%")

        day3.append(day3Date).append(day3Img).append(day3Temp).append(day3Wind).append(day3Humidity)
        $("#forecast").append(day3)

        // day 4 forecast
        var day4 = $('<div>').attr("id", "day1").css({ "margin-left": "12px", padding: "20px", color: "white", "background-color": "#0A3668" })

        var day4Date = $('<h6>')
        day4Date.text(moment().add(4,'days').format("D-MM-YY"))

        var day4Icon = response.list[36].weather[0].icon
        var day4IconURL = "https://openweathermap.org/img/wn/" + day4Icon + ".png"
        var day4Img = $('<img>')
        day4Img.attr("src", day4IconURL)

        var day4Temp = $('<p>')
        var day4Celsius = Math.floor(response.list[36].main.temp - 273.15)
        day4Temp.text("Temp: " + day4Celsius + "°C")

        var day4Wind = $('<p>')
        day4Wind.text("Wind: " + response.list[36].wind.speed + " kph")

        var day4Humidity = $('<p>')
        day4Humidity.text("Humidity: " + response.list[36].main.humidity + "%")

        day4.append(day4Date).append(day4Img).append(day4Temp).append(day4Wind).append(day4Humidity)
        $("#forecast").append(day4)


        // day 5 forecast
        var day5 = $('<div>').attr("id", "day1").css({ "margin-left": "12px", padding: "20px", color: "white", "background-color": "#0A3668" })

        var day5Date = $('<h6>')
        day5Date.text(moment().add(5,'days').format("D-MM-YY"))

        var day5Icon = response.list[39].weather[0].icon
        var day5IconURL = "https://openweathermap.org/img/wn/" + day5Icon + ".png"
        var day5Img = $('<img>')
        day5Img.attr("src", day5IconURL)

        var day5Temp = $('<p>')
        var day5Celsius = Math.floor(response.list[39].main.temp - 273.15)
        day5Temp.text("Temp: " + day5Celsius + "°C")

        var day5Wind = $('<p>')
        day5Wind.text("Wind: " + response.list[39].wind.speed + " kph")

        var day5Humidity = $('<p>')
        day5Humidity.text("Humidity: " + response.list[39].main.humidity + "%")

        day5.append(day5Date).append(day5Img).append(day5Temp).append(day5Wind).append(day5Humidity)
        $("#forecast").append(day5)
    })

})

// how could a for-loop work instead of above?