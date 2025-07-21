import { cityApiKey } from "./apiKeys.js"; // Import the API key from apiKeys.js
import { fecthFiveDayForecastData } from "./fiveDaysWeather.js";
import { cityNotFound, internetError, serverError, unexpectedErrors } from "./utils.js";
import { fetchData } from "./weather.js"; // Import the function to fetch weather data
import { setMapView } from "./weatherMap.js";


const myHeaders = new Headers();
myHeaders.append("X-Api-Key", cityApiKey); // Use the API key from apiKeys.js

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

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
				//
				fetchData(lat, lon, cityName) // Call the function to fetch weather data using the cached coordinates
				.then(() => {
					fecthFiveDayForecastData(lat, lon); // Call the function to fetch 5-day forecast data
				});
				document.querySelector("#map").style.display = "block"; // Show the map container
				setMapView(lat, lon);
				return; // Exit the function if cached data is used
		}
	}
	
	// If no cached data or cache expired, fetch new data
	const cityURL = `https://api.api-ninjas.com/v1/city?name=${cityName}`; // API endpoint to fetch city data
	fetch(cityURL, requestOptions)
		.then((response) => {
			if (!response.ok) {
					if (response.status === 404) {
							cityNotFound(); // Call the function to display a not found message
							document.querySelector("#map").style.display = "none"; // Hide the map container
							throw new Error(`City not found: ${response.status} ${response.statusText}`);
					} else if (response.status === 500) {
							serverError(); // Call the function to display a server error message
							document.querySelector("#map").style.display = "none"; // Hide the map container	
							throw new Error(`Server error: ${response.status} ${response.statusText}`);
					}
					internetError(); // Call the function to display a generic error message
					document.querySelector("#map").style.display = "none"; // Hide the map container
					throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);

			}
			return response.json();
		})
		.then((data) => {
			if (data.length === 0) {
					cityNotFound(); // Call the function to display a not found message
					document.querySelector("#map").style.display = "none"; // Hide the map container
					return;
			}
			let lat = data[0].latitude;
			let lon = data[0].longitude;
			fetchData(lat, lon, cityName) // Call the function to fetch weather data using the coordinates
			.then(() => {
					fecthFiveDayForecastData(lat, lon); // Call the function to fetch 5-day forecast data
				});
			storeDataInLocalStorage(cityName, lat, lon); // Store city data in localStorage
			document.querySelector("#map").style.display = "block"; // Show the map container
			setMapView(lat, lon); // Call the function to set the map view using the coordinates
		})
		.catch((error) => {
			unexpectedErrors(); // Call the function to display an unexpected error message
			document.querySelector("#map").style.display = "none"; // Hide the map container
			throw new Error(error);
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
