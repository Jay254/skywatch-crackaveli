import { useState } from 'react'
import './App.css'
import CityInput from './components/CityInput'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const API_URL = 'https://api.openweathermap.org/data/2.5/weather'

function App() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedCity, setSelectedCity] = useState('')

  const handleCitySubmit = async (city) => {
    setWeather(null)
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`)
      if(!res.ok){
        throw new Error('City not found')
      }
      const data = await res.json()
      console.log(data)
      setWeather(data)
    }
    catch (err) {
      setError(err.message || 'Failed to fetch weather')
    }
    finally {
      setLoading(false)
    }
  }

  const formatTime = (timestamp, timezoneOffset) => {
    const localTime = new Date((timestamp + timezoneOffset) * 1000)
    return localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }


  return (
    <div className="app">
      <h1>SkyWatch</h1>
      <div className="weather-container">
        <CityInput onSubmit={handleCitySubmit} />
        {loading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}
        {weather && (
          <div className="weather-basic">
            <h2>{weather.name}, {weather.sys.country}</h2>
            <p>🌡️ Temperature: {weather.main.temp}°C</p>
            <p>🤔 Feels Like: {weather.main.feels_like}°C</p>
            <p>💧 Humidity: {weather.main.humidity}%</p>
            <p>🌬️ Wind: {weather.wind.speed} m/s ({weather.wind.deg}°)</p>
            <p>📈 Pressure: {weather.main.pressure} hPa</p>
            <p>🌅 Sunrise: {formatTime(weather.sys.sunrise, weather.timezone)}</p>
            <p>🌇 Sunset: {formatTime(weather.sys.sunset, weather.timezone)}</p>
            <p>☁️ Condition: {weather.weather[0].description}</p>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
          </div>
        )}
        {selectedCity && (
          <p className="selected-city">Selected city: {selectedCity}</p>
        )}
      </div>
    </div>
  )
}

export default App
