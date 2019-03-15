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
    //populate the div id = weather
    $.getJSON(url, function(data){
        console.log(data);
    });
}