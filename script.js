const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

async function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const resultCard = document.getElementById('weatherResult');
  const errorMsg = document.getElementById('errorMsg');

  if (!city) {
    errorMsg.textContent = 'Please enter a city name.';
    errorMsg.classList.remove('hidden');
    resultCard.classList.add('hidden');
    return;
  }

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await res.json();

    if (data.cod !== 200) {
      throw new Error(data.message);
    }

    document.getElementById('cityName').textContent = data.name;
    document.getElementById('temperature').textContent = `🌡️ Temp: ${data.main.temp} °C`;
    document.getElementById('description').textContent = `🌥️ Condition: ${data.weather[0].description}`;
    document.getElementById('humidity').textContent = `💧 Humidity: ${data.main.humidity}%`;

    resultCard.classList.remove('hidden');
    errorMsg.classList.add('hidden');
  } catch (err) {
    errorMsg.textContent = `Error: ${err.message}`;
    errorMsg.classList.remove('hidden');
    resultCard.classList.add('hidden');
  }
}
