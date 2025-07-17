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
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      alert("Failed to fetch data. Please try again later.");
    });
}
