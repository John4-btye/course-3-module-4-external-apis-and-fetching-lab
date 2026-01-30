// index.js

const API_URL = "https://api.weather.gov/alerts/active?area=";

const input = document.getElementById("state-input");
const button = document.getElementById("fetch-alerts");
const alertsDisplay = document.getElementById("alerts-display");
const errorDiv = document.getElementById("error-message");

// Step 1: Fetch alerts 
function fetchWeatherAlerts(state) {
  return fetch(`${API_URL}${state}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Invalid state code or API error");
      }
      return response.json();
    })
}

// Step 2: Display alerts 
function displayAlerts(data) {
  alertsDisplay.innerHTML = "";

  const count = data.features.length;
  const heading = document.createElement("h2");
  heading.textContent = `Weather Alerts: ${count}`;
  alertsDisplay.appendChild(heading);

  data.features.forEach(alert => {
    const p = document.createElement("p");
    p.textContent = alert.properties.headline;
    alertsDisplay.appendChild(p);
  });
}

// Step 3: Reset UI 
function resetUI() {
  alertsDisplay.innerHTML = "";
  errorDiv.textContent = "";
  errorDiv.classList.add("hidden");
}

// Step 4: Show error 
function showError(message) {
  errorDiv.textContent = message;
  errorDiv.classList.remove("hidden");
}

// Button click handler 
button.addEventListener("click", () => {
  const state = input.value.trim().toUpperCase();

  resetUI();

  fetchWeatherAlerts(state)
    .then(data => {
      console.log(data); 
      displayAlerts(data);
      input.value = ""; 
    })
    .catch(error => {
      console.log(error.message);
      showError(error.message);
    });
});


  