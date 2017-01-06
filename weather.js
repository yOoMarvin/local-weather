var key = config.key;

var x = document.getElementById("location-text");
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    getData(lat,lon)
}

function getData(lat, lon){
  //build url
  var url = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&units=metric&appid="+key;
  $.getJSON(url,
  function(data){
    var city = data.name;
    var country = data.sys.country;
    var temperature = data.main.temp;
    var description = data.weather[0].description;

    $("#location-text").html(city+ ", " + country);
    $("#temperature-text").html(temperature+" °C");
    $("#description-text").html(description);
  });
}

$(document).ready(function() {
  getLocation();
});
