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

// This function calculates the current time in South Africa in a human-readable format
export function getSouthAfricanTime() {
    // Create a new Date object
    const date = new Date();

    // Convert to UTC+2 (South Africa Standard Time)
    const utcOffset = 2 * 60; // 2 hours in minutes
    const localOffset = date.getTimezoneOffset(); // Local timezone offset in minutes
    const southAfricaTime = new Date(date.getTime() + (utcOffset + localOffset) * 60000);

    // Format the time to 12-hour format with AM/PM
    let hours = southAfricaTime.getHours();
    const minutes = southAfricaTime.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12; // Convert to 12-hour format
    hours = hours ? hours : 12; // The hour '0' should be '12'
    const formattedTime = hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + ampm;

    return formattedTime;
}

/**
 * Converts a Unix timestamp to a readable time format (12-hour format with AM/PM).
 * @param {number} unixTimestamp - The Unix timestamp (in seconds).
 * @returns {string} - The formatted time as a string.
 */
export function convertUnixToReadableTime(unixTimestamp) {
    // Create a new Date object from the Unix timestamp (convert seconds to milliseconds)
    const date = new Date(unixTimestamp * 1000);

    // Get the hours and minutes in UTC
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    // Determine AM/PM suffix
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert hours to 12-hour format
    hours = hours % 12; // Convert to 12-hour format
    hours = hours ? hours : 12; // The hour '0' should be '12'

    // Format minutes to ensure two digits
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    // Create the final formatted time string
    const formattedTime = hours + ':' + formattedMinutes + ' ' + ampm;

    return formattedTime; // Return the formatted time
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