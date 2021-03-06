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
            feels like = current.feelslike_c
        condition:
            current.condition.text
            cloud cover: current.condition.cloud
            humiditiy: current.condition.humidity
            pressure: current.condition.pressure_mb
        wind
            direction: current.wind_dir
            speed: current.wind_kph
        */
       var forecast = data.forecast.forecastday[0].day;
       var current = data.current;
       var c_con = current.condition;
       temp_results = "<div><h3>Temperature</h3>"+
                    "<div>" + current.temp_c + "</div>"+
                    "<div>" + forecast.min_temp_c + "</div>"+
                    "<div>" + forecast.max_temp + "</div>"+
                    "<div>" + current.feelslike_c + "</div>";
       $("#weather").append(temp_results);
    });
}