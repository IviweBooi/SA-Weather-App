import { weatherApiKey } from "./apiKeys.js"; // Import the weather API key
import { checkPrecipitation, convertMetersPerSecondToKilometersPerHour } from "./utils.js"; 
import { convertMetersToKilometers } from "./utils.js";
import { convertUnixToReadableTime } from "./utils.js";
import { getCurrentTimeInTimeZone } from "./utils.js";
import { unexpectedErrors } from "./utils.js";

// Function to fetch weather data based on latitude and longitude
export function fetchData(lat, lon, cityName) {
  return new Promise((resolve, reject) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${weatherApiKey}` // Use the weather API key
    )
      .then((response) => {
        if (!response.ok) {
          unexpectedErrors(); // Call the function to display an unexpected error message
          throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        // Process the weather data here
        displayWeatherData(data, cityName); // Call the function to display weather data
        resolve(data); // Resolve the promise with the weather data
      })
      .catch((error) => {
        unexpectedErrors(); // Call the function to display an unexpected error message
        document.querySelector("#map").style.display = 'none';
        reject(error); // Reject the promise with the error
        throw new Error(error);
      });
  });
}



// parse through the weather data and display it on the page
function displayWeatherData(data, cityName) {
  // Get the weather container element
  // if cityName is not provided, use the city name from the data
  if (!cityName){
    cityName = data.name;
  }
  const weatherContainer = document.querySelector(".weather-container");
  const mainWeather = `
    <div class="upper-div">
      <div class="location-units-div">
        <h2>${cityName}</h2>
        <select>
          <option value="metric">°C</option>
          <option value="imperial">°F</option>
        </select>
      </div>
      <div class="time-div">
        <p class="current-time">${getCurrentTimeInTimeZone(data.timezone)}</p>
      </div>
      <div class="weather-div">
        <img
          src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"
          alt="Weather Icon"
          class="weather-icon"
        />
        <h1 class="temperature">${Math.round(data.main.temp)}<sup>°C</sup></h1>
        <div class="weather-details">
          <p class="weather-description">${data.weather[0].main}</p>
          <p class="feels-like">Feels like ${Math.round(data.main.feels_like)}°C</p>
        </div>
      </div>
      <div class="additional-info-div">
        <p class="additional-info">${data.weather[0].description}</p>
      </div>
    </div>
    <div class="additional-weather-info-div">
      <div class="wind-div">
          <div class="icon-div">
          <img src="assets/icons/wind-icon.svg" alt="Wind icon" height="20"/>
          <p>Wind</p>
          </div>
          <h2>${Math.round(convertMetersPerSecondToKilometersPerHour(data.wind.speed))} Km/H</h2>
      </div>
      <div class="humidity-div">
          <div class="icon-div">
          <img src="assets/icons/humidity.svg" alt="Humidity icon" height="20"/>
          <p>Humidity</p>
          </div>
          <h2>${data.main.humidity}%</h2>
      </div>
      <div class="pressure-div">
          <div class="icon-div">
          <img src="assets/icons/precipitation.svg" alt="Precipitation icon" height="20"/>
          <p>Precipitation</p>
          </div>
          <h2>${checkPrecipitation(data)} mm/h</h2>
      </div>
      <div class="visibility-div">
          <div class="icon-div">
          <img src="assets/icons/visibility-icon.svg" alt="Visibility icon" height="20"/>
          <p>Visibility</p>
          </div>
          <h2>${convertMetersToKilometers(data.visibility)} Km</h2>
      </div>
      <div class="wind-dir-div">
          <div class="icon-div">
          <img src="assets/icons/direction.svg" alt="Wind direction icon" height="18"/>
          <p>Wind Direction</p>
          </div>
          <h2>${data.wind.deg}°</h2>
      </div>
      <div class="sunset-sunrise-div">
          <div class="icon-div">
          <img src="assets/icons/sunrise-icon.svg" alt="sunrise icon" height="20"/>
          <p>Sun Summary</p>
          </div>
          <div class="sunrise-sunset-inner-div">
          <div class="sunrise-div">
              <p>Sunrise</p>
              <p>${convertUnixToReadableTime(data.sys.sunrise, data.timezone)}</p>
          </div>
          <div class="sunset-div">
              <p>Sunset</p>
              <p>${convertUnixToReadableTime(data.sys.sunset, data.timezone)}</p>
          </div>  
          </div>
      </div>
      </div>
  `;

    weatherContainer.innerHTML = mainWeather;
}