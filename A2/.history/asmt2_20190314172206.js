$(document).ready(function(){
    //get the values of the input field first
    var lat = $("#lat").val();
    var lon = $("#lon").val();
    //load up the api key
    var url = "http://api.apixu.com/v1/forecast.json?q="+lat+","+lon+"&key=4ef42f6c9f6444b0974200521191403";
    $("#goButton").on("click", function(){
        //call both the downloadWeather and downloadForecast
        downloadWeather(url);
    });
});
function downloadWeather(url){
    $.getJSON(url, function(data){
        /*
        want temperature:
            current = current.temp_c
            low = forecast.forecastday.mintemp_c
            high = forecast.forecastday.maxtemp_c
            feels like = current.condition.feelslike_c
        condition:
            current.condition.text
            cloud cover: current.condition.cloud
            humiditiy: current.condition.humidity
            pressure: current.condition.pressure_mb
        wind
            direction: current.wind_dir
            speed: current.wind_kph
        */
    });
}