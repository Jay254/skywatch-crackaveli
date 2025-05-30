import { useEffect, useState } from 'react'
import './App.css'
import CityInput from './components/CityInput'
import WeatherCard from './components/WeatherCard'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const API_URL = 'https://api.openweathermap.org/data/2.5/weather'

function App() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Fetch weather by city name
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
      setWeather(data)
    }
    catch (err) {
      setError(err.message || 'Failed to fetch weather')
    }
    finally {
      setLoading(false)
    }
  }

  // Fetch weather by coordinates
  const fetchWeatherByCoords = async (lat, lon) => {
    setWeather(null)
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
      if(!res.ok){
        throw new Error('Could not get weather for your location')
      }
      const data = await res.json()
      setWeather(data)
    }
    catch (err) {
      setError(err.message || 'Failed to fetch weather')
    }
    finally {
      setLoading(false)
    }
  }

  // On mount, try to get user's geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords
          fetchWeatherByCoords(latitude, longitude)
        },
        () => {
          // User denied or error, do nothing
        }
      )
    }
  }, [])

  return (
    <div className="app">
      <h1>SkyWatch</h1>
      <div className="weather-container">
        <CityInput onSubmit={handleCitySubmit} />
        {loading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}
        <WeatherCard weather={weather} />
      </div>
    </div>
  )
}

export default App
