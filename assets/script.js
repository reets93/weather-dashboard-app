// prompt user to enter API key so that mine is not public
var apiKEY = prompt("Please enter your OpenWeather API key to continue")
console.log(apiKEY)
var cityName;



// event lister for submit button
$('#search-button').on("click", function weatherData(e) {
    e.preventDefault()
    cityName = $('#search-input').val().trim()
    console.log(cityName)
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKEY

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        console.log("city name: " + response.city.name)
        console.log("temp: " + response.list[0].main.temp)
        console.log("wind: " + response.list[0].wind.speed)
        console.log("humidity: " + response.list[0].main.humidity + "%")

        // today's weather data
        var today = moment().format("(D MMM YYYY)")
        var theCity = response.city.name
        var todayTemp = response.list[0].main.temp
        var todayWind = response.list[0].wind.speed
        var todayHumidity = response.list[0].main.humidity
        var todayIcon = response.list[0].weather[0].icon
        var todayIconURL = "https://openweathermap.org/img/wn/" + todayIcon + ".png"

        // create h2 element for today data
        var todayTitle = $('<h2>')
        todayTitle.text(theCity + " " + today)

        var todayIconImg = $('<img>')
        todayIconImg.attr("src", todayIconURL)
        todayTitle.append(todayIconImg)

        $('#today').append(todayTitle)



        // create elements for:
        //          TODAY: city name + date + weather icon [h2]
        //          p :  "temp" + temp + "*C" -->temperature
        //          p : "Wind" + wind + "KPH" --> wind
        //          p : "Humidity" + humidity + % --> humidity

    })

})