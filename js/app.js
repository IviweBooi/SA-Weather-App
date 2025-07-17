import { getCurrentDateTime } from "./utils.js";
import { fetchCityData } from "./geolocation.js";

// displays the current date and time.
const currentDate = document.querySelector(".current-date");
currentDate.innerHTML = getCurrentDateTime();

// Function to handle city search when the search button is clicked or Enter key is pressed
const handleCitySearch = (cityName) => {
  // Check if the city name is not empty before fetching data
  if (cityName) {
    fetchCityData(cityName); // Call the function to fetch city data
  } else {
    alert("Please enter a city name."); //debugging purposes
  }
};

let enterKey = document.querySelector("#search-input");
// Add keypress event listener to the input field
enterKey.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    document.querySelector("#search-button").click(); // Trigger the search button click
  }
});

let button = document.querySelector("#search-button");
// Add click event listener to the search button
button.addEventListener("click", () => {
  const cityName = document.querySelector("#search-input").value;
  console.log(cityName); // Log the city name for debugging
  handleCitySearch(cityName); // Call the function to handle city search
});
