import CityInput from './CityInput'
import './MainDashboard.css'

function MainDashboard({ weather, loading, error, onCitySubmit }) {
  const today = new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <main className="main-dashboard">
      <div className="main-dashboard-header">
        <CityInput onSubmit={onCitySubmit} />
        <div className="main-dashboard-date">{today}</div>
      </div>
      {error && <p className="error-message">{error}</p>}
      {weather ? (
        <div className="main-dashboard-overview">
          <div className="overview-card">💨 Wind: {weather.wind.speed} m/s</div>
          <div className="overview-card">💧 Humidity: {weather.main.humidity}%</div>
          <div className="overview-card">🧭 Pressure: {weather.main.pressure} hPa</div>
        </div>
      ) : (
        <div className="main-dashboard-empty">
          <h2>Welcome to SkyWatch</h2>
          <p>Search for a city or enable location to see the weather dashboard.</p>
        </div>
      )}
      <div className="main-dashboard-forecast-placeholder">
        {/* Placeholder for forecast graph or cards */}
        <div className="forecast-placeholder">[Forecast graph coming soon]</div>
      </div>
    </main>
  )
}

export default MainDashboard 