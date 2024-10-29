const apiKey = '7c4fd8fe5881bdd4adf6b66a2ebfaeb1';

async function fetchWeather() {
  const location = document.getElementById('locationInput').value;
  if (!location) return alert('Please enter a city name.');
  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
  displayWeather(url);
}

function getLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
      displayWeather(url);
    }, () => {
      alert("Unable to retrieve location.");
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

async function displayWeather(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('City not found');
    const data = await response.json();

    // Extract data
    const { name, main, weather, wind, sys } = data;
    const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
    const sunrise = new Date(sys.sunrise * 1000).toLocaleTimeString();
    const sunset = new Date(sys.sunset * 1000).toLocaleTimeString();

    // Display data
    const weatherInfo = `
      <h2>${name}</h2>
      <img src="${iconUrl}" alt="${weather[0].description}" class="weather-icon" />
      <p>${weather[0].description}</p>
      <p>Temperature: ${main.temp} °C</p>
      <div class="humidity-info">
        <span>Humidity: ${main.humidity}%</span>
        <span>Wind Speed: ${wind.speed} m/s</span>
      </div>
      <div class="sun-info">
        <span>Sunrise: ${sunrise}</span>
        <span>Sunset: ${sunset}</span>
      </div>
    `;
    document.getElementById('weatherInfo').innerHTML = weatherInfo;
  } catch (error) {
    document.getElementById('weatherInfo').innerHTML = `<p>${error.message}</p>`;
  }
}
