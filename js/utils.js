//This funtion calculates the current date and time in a human-readable format in South Africa
// and returns it as a string in this format 'Wednesday, July 16, 2025'
export function getCurrentDateTime() {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = new Date().toLocaleDateString("en-ZA", options);
  return date;
}

/**
 * returns the current time based on the timezone offset
 * @param {number} offsetInSeconds 
 * @returns {string} - The current time in HHMM format
 */
export function getCurrentTimeInTimeZone(offsetInSeconds) {
    // Get current UTC time
    const now = new Date();

    // Convert offset from seconds to milliseconds
    const offsetInMilliseconds = offsetInSeconds * 1000;

    // Create a new date object adjusted for the time zone
    const localTime = new Date(now.getTime() + offsetInMilliseconds);

    // Format hours and minutes
    const hours = String(localTime.getUTCHours()).padStart(2, '0');
    const minutes = String(localTime.getUTCMinutes()).padStart(2, '0');

    // Return time in HHMM format
    return `${hours}:${minutes}`;
}

/**
 * Converts a Unix timestamp to a readable time format (24-hour format) based on a time zone offset.
 * @param {number} unixTimestamp - The Unix timestamp (in seconds).
 * @param {number} timeZoneOffset - The time zone offset in seconds (e.g., 7200 for UTC+2).
 * @returns {string} - The formatted time as a string.
 */
export function convertUnixToReadableTime(unixTimestamp, timeZoneOffset) {
    // Create a new Date object from the Unix timestamp (in milliseconds)
    const date = new Date(unixTimestamp * 1000);

    // Adjust the time based on the time zone offset
    const localTime = new Date(date.getTime() + timeZoneOffset * 1000);
    
    // Options for formatting the time
    const options = {
        hour: '2-digit', // Two-digit hour
        minute: '2-digit', // Two-digit minute
        hour12: false, // Use 24-hour format
        timeZone: 'UTC' // Specify a time zone to avoid local settings
    };

    // Return the formatted time string
    return localTime.toLocaleTimeString('en-US', options);
}


/**
 * Converts meters to kilometers.
 * @param {number} meters - The distance in meters.
 * @returns {number} - The distance in kilometers.
 */
export function convertMetersToKilometers(meters) {
    // 1 kilometer is equal to 1000 meters
    const kilometers = meters / 1000; // Convert meters to kilometers
    return kilometers; // Return the converted value
}

/**
 * Converts speed from meters per second (m/s) to kilometers per hour (km/h).
 * @param {number} metersPerSecond - The speed in meters per second.
 * @returns {number} - The speed in kilometers per hour.
 */
export function convertMetersPerSecondToKilometersPerHour(metersPerSecond) {
    // 1 m/s is equal to 3.6 km/h
    const kilometersPerHour = metersPerSecond * 3.6; // Convert m/s to km/h
    return kilometersPerHour; // Return the converted value
}

/**
 * check if there is precipitation in the weather data
 * @param {object} weatherData - The weather data object.
 * @returns {number} - The precipitation amount.
 */
export function checkPrecipitation(weatherData) {

    // Check if 'rain/snow' data is available
    try{
      // Check if 'rain' data is available
      if (weatherData.rain['1h']) {
          precipitation = weatherData.rain['1h'];
          return precipitation;
      }
    }catch(error){
      return 0; // return 0 if no precipitation is found
    }

    try{
      // Check if 'snow' data is available
      if (weatherData.snow['1h']) {
          precipitation = weatherData.snow['1h'];
          return precipitation;
      }
    }catch(error){
      return 0; // return 0 if no precipitation is found
    }
}

// check if the city is found
export function cityNotFound(){
  const cityNotFound = document.querySelector(".weather-container");
  cityNotFound.innerHTML = `
    <div class="error-message">
      <h1>Opps! City not found</h1>
      <p>Please try again.</p>
      <img src="assets/images/not-Found.svg" alt="City not found"/>
    </div>
  `
}

// check if the server is down
export function serverError(){
  const serverError = document.querySelector(".weather-container");
  serverError.innerHTML = `
    <div class="error-message">
      <h1>Opps! The server seems to be down.</h1>
      <p>Please try again later.</p>
      <img src="assets/images/server-e.svg" alt="Server Error"/>
    </div>
  `
}

// check if there is an error
export function internetError(){
  const internetError = document.querySelector(".weather-container");
  internetError.innerHTML = `
    <div class="error-message">
      <h1>Unable to connect to the server.</h1>
      <p>Please check your internet connection and try again.</p>
      <img src="assets/images/error.svg" alt="Error"/>
    </div>
  `
}


export function unexpectedErrors(){
  const unexpectedError = document.querySelector(".weather-container");
  unexpectedError.innerHTML = `
    <div class="error-message">
      <h1>An unexpected error occurred.</h1>
      <p> Please try again later.</p>
      <img src="assets/images/error.svg" alt="Error"/>
    </div>
  `
}