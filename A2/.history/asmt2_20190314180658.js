$(document).ready(function(){
    $("#goButton").on("click", function(){
        //call both the downloadWeather and downloadForecast
        //get the values of the input field first
        var lat = $("#lat").val();
        var lon = $("#lon").val();
        var url = "http://api.apixu.com/v1/forecast.json?q="+lat+","+lon+"&key=4ef42f6c9f6444b0974200521191403";
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

       temp_results = "<div id = \"Temperature\"><h3>Temperature</h3>"+
                    "<div>Current: "  + current.temp_c + "°C</div>"+
                    "<div>Low: " + forecast.mintemp_c + "°C</div>"+
                    "<div>High: " + forecast.maxtemp_c + "°C</div>"+
                    "<div>Feels like: " + current.feelslike_c + "°C</div></div>";
        cond_results = "<div id = \"Condition\"><h3>Condition</h3>"+
                        "<div>"+current.condition.text+"</div>"+
                        "<div>Cloud coverage: "+current.cloud+"%</div>"+
                        "<div>Humidity: "+current.humidity+"%</div>"+
                        "<div>Pressure: "+current.pressure_mb+"mB</div></div>";
        wind_results = "<div id = \"Wind\"><h3>Wind</h3>"+
                        "<div>Direction: "+current.wind_dir+"</div>"+
                        "<div>Speed: "+current.wind_kph+"km/h</div></div>";
       $("#weather").html(temp_results+cond_results);
    });
}