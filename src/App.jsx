import { useState } from 'react'
import './App.css'
import CityInput from './components/CityInput'
import WeatherCard from './components/WeatherCard'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const API_URL = 'https://api.openweathermap.org/data/2.5/weather'

function App() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

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

  return (
    <div className="app">
      <h1>SkyWatch</h1>
      <div className="weather-container">
        <CityInput onSubmit={handleCitySubmit} />
        {loading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}
        {weather && <WeatherCard weather={weather} />}
      </div>
    </div>
  )
}

export default App
