// Importing axios (make sure axios is included in your project)
import axios from "axios";

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;
  searchCityWeather(city);
}

function searchCityWeather(city) {
  let apiKey = "fa506aa8bdtd3d64a554291oa74a69fb";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  // Make an API call using axios
  axios.get(apiUrl).then(displayWeather);
}

function displayWeather(response) {
  let cityElement = document.querySelector("#current-city");
  let temperatureElement = document.querySelector(".current-temperature-value");
  let weatherDescriptionElement = document.querySelector(".current-details");
  let iconElement = document.querySelector(".current-temperature-icon");

  let temperature = Math.round(response.data.temperature.current);
  let cityName = response.data.city;
  let description = response.data.condition.description;
  let icon = response.data.condition.icon;

  cityElement.innerHTML = cityName;
  temperatureElement.innerHTML = temperature;
  weatherDescriptionElement.innerHTML = `${formatDate(
    new Date()
  )}, ${description}`;
  iconElement.innerHTML = getWeatherIcon(icon);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

function getWeatherIcon(icon) {
  const weatherIcons = {
    "clear-sky-day": "☀️",
    "clear-sky-night": "🌙",
    "few-clouds-day": "⛅",
    "few-clouds-night": "🌑",
    "scattered-clouds": "☁️",
    "broken-clouds": "🌥️",
    "shower-rain": "🌧️",
    rain: "🌦️",
    thunderstorm: "⛈️",
    snow: "❄️",
    mist: "🌫️",
  };

  return weatherIcons[icon] || "☀️"; // Default to sun if the icon is not in the map
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

// Initialize with a default city (e.g., Paris)
searchCityWeather("Paris");
