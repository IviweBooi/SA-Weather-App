import { weatherForecastApiKey } from "./apiKeys.js"; // Import the weather API key
import { getDayFromDate } from "./utils.js";

const requestOptions = {
  method: "GET",
  redirect: "follow"
};
// Function to fetch weather data based on latitude and longitude
export function fecthFiveDayForecastData(lat, lon) {
  fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${weatherForecastApiKey}&q=${lat},${lon}&days=6&aqi=no&alerts=yes`, // Use the weather API key
    requestOptions 
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Network response was not ok: ${response.status} ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((data2) => {
      console.log(data2); // Log the data to the console for debugging
      displayWeatherData(data2); // Call the function to display the weather data
      // Process the weather data here
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      alert("Failed to fetch data. Please try again later.");
    });
}

// Function to display weather data on the webpage
function displayWeatherData(data2) {
    let weatherData = data2;
    let weatherContainer = document.querySelector(".weather-container");
    let fiveDays = `<div class="five-day-forecast-div">`;

    // Loop through the first five forecast days
    for (let index = 0; index <= 5; index++) {
        const date = weatherData.forecast.forecastday[index].date;
        const forecastTemp = weatherData.forecast.forecastday[index].day.maxtemp_c;
        const forecastImg = weatherData.forecast.forecastday[index].day.condition.icon;

        fiveDays += `
            <div class="weather-forecast-div">
                <p class="forecast-day">${getDayFromDate(date)}</p>
                <img src="${forecastImg}" alt="Weather Icon" class="forecast-img">
                <h2 class="forecast-temp">${Math.round(forecastTemp)}<sup>°C</sup></h2>
            </div>
        `;
    }

    fiveDays += `</div>`;
    weatherContainer.insertAdjacentHTML("beforeend", fiveDays);
}

