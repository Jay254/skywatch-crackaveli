import { useState } from 'react'
import './App.css'
import CityInput from './components/CityInput'

function App() {
  const [selectedCity, setSelectedCity] = useState('')

  const handleCitySubmit = (city) => {
    setSelectedCity(city)
    // We'll handle the API call in the next stage
  }

  return (
    <div className="app">
      <h1>SkyWatch</h1>
      <div className="weather-container">
        <CityInput onSubmit={handleCitySubmit} />
        {selectedCity && (
          <p className="selected-city">Selected city: {selectedCity}</p>
        )}
      </div>
    </div>
  )
}

export default App
