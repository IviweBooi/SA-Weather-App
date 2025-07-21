import { weatherApiKey } from "./apiKeys.js"; // Import the weather API key
var map;
var currentWeatherLayer;

// Function to set map view based on coordinates
export function setMapView(lat, lon) {
    if (!map) {
        map = L.map('map').setView([lat, lon], 10); // Adjust the zoom level as needed
        addTileLayer(map); // Add OpenStreetMap tile layer
        // Add multiple weather layers
        const weatherLayer = 'clouds_new'; // Default weather layer
        addWeatherLayers(map, weatherLayer);
        return;
    }
    updateMapView(lat, lon); // Update the map view based on coordinates
}

// Function to update the map view based on coordinates
function updateMapView(lat, lon) {
    map.setView([lat, lon], 10); // Adjust the zoom level as needed
}

// Function to add OpenStreetMap tile layer
function addTileLayer(map) {
    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
    }).addTo(map);
}

// Function to add weather layers to the map, default is "clouds_new"
function addWeatherLayers(map, layer="clouds_new") {
    // Check if the map is initialized
    if (!map) {
        throw new Error('Map is not initialized. Cannot add weather layers.');
    }
    const weatherLayerUrl = `https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=${weatherApiKey}`;
    const weatherLayer = L.tileLayer(weatherLayerUrl, {
        maxZoom: 18,
        opacity: 0.5, // Adjust opacity as needed
    }).addTo(map);

    // Store the current layer reference
    currentWeatherLayer = weatherLayer;
    const myMap = document.querySelector("#map");
    const options = `
        <select id="weather-layers-select">
            <option value="clouds_new">Clouds</option>
            <option value="precipitation_new">Precipitation</option>
            <option value="pressure_new">Sea Level Pressure</option>
            <option value="wind_new">Wind Speed</option>
            <option value="temp_new">Temperature</option>
        </select>
    `
    myMap.insertAdjacentHTML("beforeend", options);

    // Add event listener to the select element
    document.getElementById("weather-layers-select").addEventListener("change", function() {
        const selectedLayer = this.value;
        updateWeatherLayer(selectedLayer); // Call function to update the weather layer
    });
}

// Function to update the weather layer
function updateWeatherLayer(layer) {
    if (currentWeatherLayer) {
        map.removeLayer(currentWeatherLayer); // Remove the current layer
    }
    const weatherLayerUrl = `https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=${weatherApiKey}`;
    const weatherLayer = L.tileLayer(weatherLayerUrl, {
        maxZoom: 18,
        opacity: 0.5, // Adjust opacity as needed
    }).addTo(map);
    currentWeatherLayer = weatherLayer; // Update the current layer reference
}

