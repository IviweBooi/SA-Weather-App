import { cityApiKey } from "./apiKeys.js"; // Import the API key from apiKeys.js
import { fecthData } from "./weather.js"; // Import the function to fetch weather data
const myHeaders = new Headers();
myHeaders.append("X-Api-Key", cityApiKey); // Use the API key from apiKeys.js

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

// Function to fetch city data based on the city name
export function fetchCityData(cityName) {

  // Check if the city name is already in localStorage
  const cachedCityData = localStorage.getItem(cityName);
	// If cached data exists, parse it and check if it's still valid
  if (cachedCityData) {
    const cityData = JSON.parse(cachedCityData); 
    const currentTime = Date.now();
    const cacheDuration = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    // Check if the cached data is still valid
    if (currentTime - cityData.timestamp < cacheDuration) {
      const lat = cityData.lat;
      const lon = cityData.lon;
			console.log("Using cached data for:", cityName); // Debugging log
      console.log([lat, lon]); // Log the latitude and longitude for debugging
      fecthData(lat, lon); // Call the function to fetch weather data using the cached coordinates
      return; // Exit the function if cached data is used
    }
  }
  // If no cached data or cache expired, fetch new data
  console.log("Fetching new city data for:", cityName); // Debugging log
  const cityURL = `https://api.api-ninjas.com/v1/city?name=${cityName}`; // API endpoint to fetch city data
  fetch(cityURL, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Network response was not ok: ${response.status} ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((data) => {
      if (data.length === 0) {
        alert("City not found. Please try another city name."); //debugging purposes
        return;
      }
      let lat = data[0].latitude;
      let lon = data[0].longitude;
      console.log([lat, lon]); // Log the latitude and longitude for debugging
      fecthData(lat, lon); // Call the function to fetch weather data using the coordinates
      storeDataInLocalStorage(cityName, lat, lon); // Store city data in localStorage
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      alert("Failed to fetch data. Please try again later.");
    });
}

// Function to store city data in localStorage
export function storeDataInLocalStorage(cityName, lat, lon) {
  const cityData = {
    cityName,
    lat,
    lon,
    timestamp: Date.now(), // Store the timestamp to handle cache expiration
  };
  localStorage.setItem(cityName, JSON.stringify(cityData));
}
