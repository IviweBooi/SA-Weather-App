import { getCurrentDateTime } from "./utils.js";

// displays the current date and time.
const currentDate = document.querySelector(".current-date");
currentDate.innerHTML = getCurrentDateTime();
