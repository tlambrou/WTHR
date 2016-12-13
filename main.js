
// Get today's time and date
var dateToday = new Date();

var output = dateToday.getMinutes();

console.log(output);

// A helper function
function getId(id) {
  return document.getElementById(id);
}

// Get references to all of the elements that display info
var coords = getId("coords");
var weatherMain = getId("weather-main");
var desc = getId("desc");
var icon = getId("icon");
var temp = getId("temp");
var temp_min = getId("temp_min");
var temp_max = getId("temp_max");
var pressure = getId("pressure");
var humidity = getId("humidity");
var speed = getId("speed");
var clouds = getId("clouds");
var dt = getId("dt");
var sunrise = getId("sunrise");
var sunset = getId("sunset");
var locationName = getId("location-name");

var sun = getId("sun");
var avatar = getId("avatar");

var back = getId("back");
var backLink = getId("back-link");

// //Set the backgroundPositionY to the time of day
// var timeY = -100;
// $("body").css({
//   backgroundPositionY:timeY+"px"
// });
//
// $("body").css("backgroundPositionY", "-100px");
//
// $("body").css({"background-position-y":"-100px"})

var container = getId("container");

var cityForm = getId("city-form");
var cityInput = getId("city-input");
var saveCityButton = getId("save-city-button");




// Load weather for the city saved in local storage, if there is a one...
var savedCity = getCity();
console.log(savedCity);

// Hide elements when city is not selected
if (savedCity != undefined) {
  // We saved a city load the weather!
  console.log("Loading Saved city:"+saveCity);
  loadData(savedCity);

} else {
  console.log("No saved city to load");
  // $("body").addClass("no-weather");

}



// Call this method with the city name to load weather for that city
function loadData(city) {
  // Register and get an api key
  var apikey = "80ca9dfbad6312f9e9b61b98314a8ed7";
  // Make a path with the city and api key
  var path = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apikey;

  // Use jQuery to load JSON data.
  $.get(path, function (data) {
    // Print the data to console. Go look at it right now!
    console.log(data);

    if (data.cod == 200) {
      // $("body").removeClass("no-weather");
      container.classList.add("next");
    } else {
      // $("body").addClass("no-weather");
      container.classList.remove("next");
      return;
    }

    // Collect values from the json data and display it in each of the divs above.
    coords.innerHTML = data.coord.lat + " " + data.coord.lon;

    // data.weather array sometimes has more than one item!
    weatherMain.innerHTML = data.weather[0].main;
    desc.innerHTML = data.weather[0].description;
    // * Use the icon name to load an image for the weather.
    // icon.innerHTML = "<img src='weather-icons/"+data.weather[0].icon+".svg'>";
    // For more info on icons and condition codes: https://openweathermap.org/weather-conditions

    // * Convert the temp from Kelvin to F or C.
    temp.innerHTML = Math.round(kToF(data.main.temp)) + "&deg;";

    // * Convert these from K to T or C.
    temp_min.innerHTML = kToF(data.main.temp_min);
    temp_max.innerHTML = kToF(data.main.temp_max);

    pressure.innerHTML = data.main.pressure;
    humidity.innerHTML = data.main.humidity + "%";

    // Wind - These properties are some times missing. Check for undefined before displaying them!
    var speed = data.wind.speed;
    var deg = data.wind.deg;
    var gust = data.wind.gust;

    speed.innerHTML = speed;

    clouds.innerHTML = data.clouds.all;
    dt.innerHTML = new Date(data.dt * 1000).toDateString();
    sunrise.innerHTML = getTimeFrom(new Date(data.sys.sunrise * 1000));
    sunset.innerHTML = getTimeFrom(new Date(data.sys.sunset * 1000));
    locationName.innerHTML = data.name;

var beginSunrise = (data.sys.sunrise * 1000) - 3600000;
var beginDaytime = (data.sys.sunrise * 1000) + 3600000;
var beginSunset = (data.sys.sunset * 1000) - 3600000;
var beginNightime = (data.sys.sunset * 1000) + 3600000;

   if (dateToday <= beginSunrise || dateToday > beginNightime) {

     //Change assets for nighttime
     sun.src="Night.svg";

   } else if (dateToday > beginSunrise && dateToday <= beginDaytime) {

     //Change assets for sunrise
     sun.src="Sunrise.svg";

   } else if (dateToday > beginDaytime && dateToday <= beginSunset) {

     //Change assets for daytime
     sun.src="Day.svg";

   } else if (dateToday > beginSunset && dateToday <= beginNightime) {

     //Change assets for sunset
     sun.src="Sunset.svg";

   }

  });
}

$("#back-link").on('click', function() {
   container.classList.remove("next");
});

cityForm.onsubmit = function (event) {
  event.preventDefault();

  var city = cityInput.value;
  loadData(city);
};

saveCityButton.onclick = function (event) {
  var city = cityInput.value;
  saveCity(city);
};

// Save city to local storage

function saveCity(cityName) {
  localStorage.setItem("weather-app", cityName);
}

// !!! This possibly returns null you must handle this!
function getCity() {

  return localStorage.getItem("weather-app");
}

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function getTimeFrom(date) {
  var h = addZero(date.getHours());
  var m = addZero(date.getMinutes());
  var s = addZero(date.getSeconds());
  return h + ":" + m + ":" + s;
}

function getDayFrom(date) {
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var dayIndex = date.getDay();
}

// Temperature conversion functions from kelvin
function kToF(t) {
  // Do some math and round to two decimal places.
  return (t * 9/5 - 459.67).toFixed(2);
}

function kToC(t) {
  return (t - 273.15).toFixed(2);
}

// $(window).resize(function(){
//   var position = $("#avatar").position(); // {left:100, top:233}
//   console.log("Avatar position:"+position);
//   var w = $("#avatar").width(); //
//   var h = $("#avatar").height(); //
//   // Center x = top + height / 2
//   // center y = left + width / 2
//   var centerX = position.left + w / 2;
//   var centerY = position.top + h / 2;
//   console.log("Center:" + centerX + " " + centerY);

// calculate the postion based on time
// var y = Math.random() * 400;

// $("#avatar").stop().animate({top:y+"px"}, 400);
// })

// $("#sun").css({top:0})
