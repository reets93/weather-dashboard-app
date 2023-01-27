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


    })

})