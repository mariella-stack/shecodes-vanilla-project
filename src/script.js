function updateWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#weather-app-city");
  let conditionsElement = document.querySelector("#conditions");
  let humidityElement = document.querySelector("#humidity");
  let speedElement = document.querySelector("#speed");
  let timeElement = document.querySelector("#day-time");
  let date = new Date(response.data.time * 1000);
  let iconUrl = response.data.condition.icon_url;
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  temperatureElement.innerHTML = Math.round(temperature);
  conditionsElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  speedElement.innerHTML = `${response.data.wind.speed} km/h`;
  iconElement.innerHTML = `<img src="${iconUrl}">`;
getForecast(response.data.city)
}


function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}, ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "58ca0f5cbec7bta7cefa3ffa3o04436b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}


function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);

}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

function formatDay(timestamp) {
  let date = new Date(timestamp *1000);
  let days = [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat","Sun"];
  return days [date.getDay()];

}

function getForecast (city) {
  let apiKey = "58ca0f5cbec7bta7cefa3ffa3o04436b"
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&unit=metric`
 axios.get(apiUrl).then(displayForecast)

}

function displayForecast(response) {
  console.log(response.data);


  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml = 
      forecastHtml + 
      `<div class="weather-app-forecast-day">
<div class="weather-app-forecast-date">${formatDay(day.time)}</div>
<div ><img src="${day.condition.icon_url}" class="weather-app-forecast-icon"/></div>
<div class="weather-app-forecast-temps">
  <div class= "weather-app-forecast-temp">
    <strong>${Math.round(day.temperature.maximum)}°C</strong>
  </div>
  <div class="weather-app-forecast-temp"> | </div>
  <div class="weather-app-forecast-temp" id="forecast">${Math.round(day.temperature.minimum)}°C</div>
</div>
</div>
</div>
    `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
  searchCity("Paris");
  getForecast("Paris");