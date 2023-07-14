const nameEl = document.querySelector(".js-name");
const regionEl = document.querySelector(".js-region ");

const conditionEl = document.querySelector(".js-condition-text");
const uvEl = document.querySelector(".js-uv");

const tempEl = document.querySelector(".js-temp");

const feelsLikeEl = document.querySelector(".js-feels-like");
const humidityEL = document.querySelector(".js-humidity");

import "./assets/css/style.css";
import getWeather from "./weather.js";
const searchInputEl = document.getElementById("js-search-bar");

const getUvValue = (index) => {
  if (index >= 8) {
    return "Very high";
  } else if (index >= 6) {
    return "High";
  } else if (index >= 3) {
    return "Moderate";
  } else return "Low";
};
const processData = (weatherResp) => {
  const temp = weatherResp.current.temp_f + '°';
  const condition = weatherResp.current.condition.text;
  const feelsLikeF = weatherResp.current.feelslike_f + '°';
  const humidity = weatherResp.current.humidity + '%';
  const uv = getUvValue(weatherResp.current.uv)  
  const name = weatherResp.location.name;
  const region = weatherResp.location.region;
  const country = weatherResp.location.country;

  const weatherData = {
    name: name,
    region: region,
    country: country,
    temp: temp,
    condition: condition,
    feelsLikeF: feelsLikeF,
    humidity: humidity,
    uv: uv,
  };

  return weatherData;
};

async function getWeatherData(locationName) {
  const resp = await getWeather(locationName);

  console.log(resp);

  const obj = processData(resp);

  return obj;
}

async function displayWeather(userLocation) {
  const weatherData = await getWeatherData(userLocation);

  regionEl.textContent = weatherData.region;
  nameEl.textContent = weatherData.name;
  conditionEl.textContent = weatherData.condition;
  tempEl.textContent = weatherData.temp;
  feelsLikeEl.textContent = weatherData.feelsLikeF;
  uvEl.textContent = weatherData.uv;
  humidityEL.textContent = weatherData.humidity;
}

const inputEl = document.getElementById("js-search-bar");

inputEl.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const userLocation = searchInputEl.value;
    displayWeather(userLocation);
  }
});

//const submitBtn = document.querySelector(".js-submit-btn");
//submitBtn.addEventListener("click", () => {
//});
