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

        $("#today").css({border: "solid 1px grey", padding: "8px"})
      
        // create element for forecast heading
        var forecastTitle = $('<h4>')
        forecastTitle.text("5-Day Forecast:")
        $("#forecast-title").append(forecastTitle)

        // day1 forecast div
        // var dforecast = $('<div>').css({border: "solid 1px red"})
        // $('#forecast').append(forecast)

        // create daily forecasts
        var day1 = $('<div>').attr("id","day1")
        var day1Date = $('<p>')
        day1Date.text("text")
        $(day1).append(day1Date)
        //date <h5> moment(). add(15,'days'). format('DD-MM-YYYY')
        //icon <img>
        //temp <p>
        //wind <p>
        //humidity <p>
        
        
        
        $("#forecast").append(day1)

    })

})