import { weatherApiKey } from "./apiKeys.js"; // Import the weather API key

const requestOptions = {
  method: "GET",
  redirect: "follow"
};
// Function to fetch weather data based on latitude and longitude
export function fecthFiveDayForecastData(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast/daily?cnt=5&units=metric&lat=${lat}&lon=${lon}&appid=${weatherApiKey}`, // Use the weather API key
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
    .then((data) => {
      console.log(data); // Log the data to the console for debugging
      // Process the weather data here
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      alert("Failed to fetch data. Please try again later.");
    });
}