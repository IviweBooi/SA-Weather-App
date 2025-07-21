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
    const redSearchInput = document.querySelector("#search-input");
    redSearchInput.style.border = "1px solid red"; // Change border color to red
    setTimeout(() => {
      redSearchInput.style.border = ""; // Reset border color after 1 second
    }, 1500);
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
  handleCitySearch(cityName); // Call the function to handle city search
});


// Select essential elements from the DOM
const themeToggleButton = document.querySelector("theme-toggle-button");
const body = document.body;
const lightIcon = document.querySelector(".light-icon");
const darkIcon = document.querySelector(".dark-icon");

/**
 * Applies the specified theme and updates icon visibility.
 * @param {string} theme - The theme to apply ('dark' or 'light').
 */
const applyTheme = (theme) => {
  if (theme === "dark") {
    body.classList.add("dark-theme");
    lightIcon.style.display = "none";
    darkIcon.style.display = "inline-block";
  } else {
    body.classList.remove("dark-theme");
    lightIcon.style.display = "inline-block";
    darkIcon.style.display = "none";
  }
};

// Function to determine the current theme based on time
const setAutomaticTheme = () => {
  const currentHour = new Date().getHours();
  const theme = currentHour >= 6 && currentHour < 18 ? "light" : "dark"; // Daytime from 6 AM to 6 PM
  applyTheme(theme);
};

// Apply the saved theme on initial page load
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  applyTheme(savedTheme);
} else {
  setAutomaticTheme(); // Set theme based on time if no saved theme
}

// Add event listener to the theme toggle button
themeToggleButton.addEventListener("click", () => {
  const isDarkTheme = body.classList.contains("dark-theme");
  const newTheme = isDarkTheme ? "light" : "dark";
  
  applyTheme(newTheme);
  
  // Save the new theme to localStorage
  localStorage.setItem("theme", newTheme);
});
