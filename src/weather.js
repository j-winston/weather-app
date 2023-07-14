import getKey from "./apikey";

async function getWeather(locationName) {
  const response = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=${getKey()}&q=${locationName}&aqi=no`,

    {
      mode: "cors",
    },
  );

  const respJsn = await response.json();
  const data = await respJsn;

  return data;
}

export default getWeather;
