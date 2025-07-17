import { weatherApiKey } from "./apiKeys.js"; // Import the weather API key

// Function to fetch weather data based on latitude and longitude
export function fecthData(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${weatherApiKey}` // Use the weather API key
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
      alert("Data was retrieved successfully."); //for debugging purposes
      console.log(data); // Log the data to the console for debugging
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      alert("Failed to fetch data. Please try again later.");
    });
}
