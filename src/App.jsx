import { useEffect, useState } from 'react'
import './App.css'
import DashboardLayout from './components/DashboardLayout'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const API_URL = 'https://api.openweathermap.org/data/2.5/weather'
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast'

function App() {
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Fetch weather and forecast by city name
  const handleCitySubmit = async (city) => {
    setWeather(null)
    setForecast(null)
    setError('')
    setLoading(true)
    try {
      const [weatherRes, forecastRes] = await Promise.all([
        fetch(`${API_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`),
        fetch(`${FORECAST_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`)
      ])
      if (!weatherRes.ok) throw new Error('City not found')
      if (!forecastRes.ok) throw new Error('Could not get forecast')
      const weatherData = await weatherRes.json()
      const forecastData = await forecastRes.json()
      setWeather(weatherData)
      setForecast(forecastData)
    }
    catch (err) {
      setError(err.message || 'Failed to fetch weather')
    }
    finally {
      setLoading(false)
    }
  }

  // Fetch weather and forecast by coordinates
  const fetchWeatherByCoords = async (lat, lon) => {
    setWeather(null)
    setForecast(null)
    setError('')
    setLoading(true)
    try {
      const [weatherRes, forecastRes] = await Promise.all([
        fetch(`${API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`),
        fetch(`${FORECAST_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
      ])
      if (!weatherRes.ok) throw new Error('Could not get weather for your location')
      if (!forecastRes.ok) throw new Error('Could not get forecast')
      const weatherData = await weatherRes.json()
      const forecastData = await forecastRes.json()
      setWeather(weatherData)
      setForecast(forecastData)
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
      <div className="skywatch-title">SkyWatch</div>
      <DashboardLayout
        weather={weather}
        forecast={forecast}
        loading={loading}
        error={error}
        onCitySubmit={handleCitySubmit}
      />
    </div>
  )
}

export default App
