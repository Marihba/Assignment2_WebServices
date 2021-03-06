$(document).ready(function () {
    $("#lat").val(43.944847);
    $('#lon').val(-78.891703);
    $("#goButton").on("click", function () {
        //call both the downloadWeather and downloadForecast
        //get the values of the input field first
        var lat = $("#lat").val();
        var lon = $("#lon").val();
        var url_w = "http://api.apixu.com/v1/forecast.json?q=" + lat + "," + lon + "&key=4ef42f6c9f6444b0974200521191403"; //weather
        var url_f = "http://api.apixu.com/v1/forecast.json?q=" + lat + "," + lon + "&days=7&key=4ef42f6c9f6444b0974200521191403";  //forecast
        downloadWeather(url_w);
        downloadForecast(url_f);
    });
});
function downloadWeather(url) {
    $.getJSON(url, function (data) {
        var forecast = data.forecast.forecastday[0].day;
        var current = data.current;
        temp_results = "<div id = \"Temperature\"><h3>Temperature</h3>" +
            "<div>Current: " + current.temp_c + "°C</div>" +
            "<div>Low: " + forecast.mintemp_c + "°C</div>" +
            "<div>High: " + forecast.maxtemp_c + "°C</div>" +
            "<div>Feels like: " + current.feelslike_c + "°C</div></div>";
        cond_results = "<div id = \"Condition\"><h3>Condition</h3>" +
            "<div>" + current.condition.text + "</div>" +
            "<div>Cloud coverage: " + current.cloud + "%</div>" +
            "<div>Humidity: " + current.humidity + "%</div>" +
            "<div>Pressure: " + current.pressure_mb + "mB</div></div>";
        wind_results = "<div id = \"Wind\"><h3>Wind</h3>" +
            "<div>Direction: " + current.wind_dir + "°</div>" +
            "<div>Speed: " + current.wind_kph + "km/h</div></div>";
        $("#weather").html(temp_results + cond_results + wind_results);
    });
}
function downloadForecast(url) {
    $.getJSON(url, function (data) {
        var forecast = data.forecast.forecastday; //gets the array of all the forecasts
        $("#forecast").html(""); //clear the contents first
        generateHeader();
        contents = $("<tbody></tbody>");
        for (let i = 0; i < forecast.length; i++) {
            day = forecast[i].day;
            condition = forecast[i].day.condition;
            contents.append($("<tr>" +
                "<td scope = \"row\">" + forecast[i].date + "</td>" +
                "<td><img src=http:" + condition.icon + "></img>" + "</td>" +
                "<td>" + day.maxtemp_c + "</td>" +
                "<td>" + day.mintemp_c + "</td>" +
                "<td>" + day.maxwind_kph + "</td>" +
                "<td>" + condition.text + "</td>" +
                "</tr>"));
            $(".table").append(contents);
        }
    })
}
function generateHeader() {
    //generates the header contents of the table
    forecast_table = $("<table class =\"table\">" +
        "<thead><tr>" +
        "<th scope=\"col\">Date</th>" +
        "<th scope=\"col\">Condition</th>" +
        "<th scope=\"col\">High</th>" +
        "<th scope=\"col\">Low</th>" +
        "<th scope=\"col\">Wind</th>" +
        "<th scope=\"col\">Outlook</th>" +
        "</tr>" +
        "</thead></table>");
    $("#forecast").append("<h2>Forecast</h2>")
    $("#forecast").append(forecast_table);
}