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
