import './WeatherCard.css'

function WeatherCard({ weather }) {
  if (!weather) return null

  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`

  // Convert sunrise/sunset from unix to local time
  const formatTime = (unix, tz) => {
    return new Date((unix + weather.timezone) * 1000).toUTCString().slice(17, 22)
  }

  return (
    <div className="weather-card landscape">
      <div className="weather-main-left">
        <h2>{weather.name}, {weather.sys.country}</h2>
        <img src={iconUrl} alt={weather.weather[0].description} className="weather-icon-large" />
        <div className="weather-temp-large">
          <span className="temp-large">{Math.round(weather.main.temp)}°C</span>
          <span className="desc-large">{weather.weather[0].description}</span>
        </div>
      </div>
      <div className="weather-main-right">
        <ul className="weather-details-landscape">
          <li>🥵 Feels Like: {Math.round(weather.main.feels_like)}°C</li>
          <li>💧 Humidity: {weather.main.humidity}%</li>
          <li>💨 Wind: {weather.wind.speed} m/s (T{weather.wind.deg}°)</li>
          <li>🧭 Pressure: {weather.main.pressure} hPa</li>
          <li>🌅 Sunrise: {formatTime(weather.sys.sunrise, weather.timezone)} AM</li>
          <li>🌇 Sunset: {formatTime(weather.sys.sunset, weather.timezone)} PM</li>
        </ul>
      </div>
    </div>
  )
}

export default WeatherCard 