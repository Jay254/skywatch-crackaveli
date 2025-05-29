import { useState } from 'react';
import './CityInput.css';

function CityInput({ onSubmit }) {
  const [city, setCity] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Basic validation
    if (!city.trim()) {
      setError('Please enter a city name')
      return
    }
    
    setError('')
    onSubmit(city.trim())
  }

  return (
    <form onSubmit={handleSubmit} className="city-form">
      <div className="input-group">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
          className="city-input"
        />
        <button type="submit" className="submit-button">
          Search
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </form>
  )
}

export default CityInput 