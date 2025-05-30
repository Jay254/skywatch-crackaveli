import './Sidebar.css'

function Sidebar({ weather, loading }) {
  if (loading) return <aside className="sidebar"><p>Loading...</p></aside>

  if (!weather) {
    return (
      <aside className="sidebar sidebar-empty">
        <h2>Welcome to SkyWatch</h2>
        <p>Get started by searching for a city or enabling location.</p>
        <div className="sidebar-illustration">☁️</div>
      </aside>
    )
  }

  const sunrise = new Date((weather.sys.sunrise + weather.timezone) * 1000).toUTCString().slice(17, 22)
  const sunset = new Date((weather.sys.sunset + weather.timezone) * 1000).toUTCString().slice(17, 22)

  // Large weather icon
  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`

  // Day/night indicator
  const now = new Date()
  const utc = now.getTime() + now.getTimezoneOffset() * 60000
  const cityTime = new Date(utc + 1000 * (weather.timezone || 0))
  const cityHour = cityTime.getHours()
  const isDay = cityHour >= 6 && cityHour < 18
  const dayNightIcon = isDay ? '☀️' : '🌙'

  return (
    <aside className="sidebar">
      <div className="sidebar-location">
        <h3>{weather.name}, {weather.sys.country}</h3>
      </div>
      <div className="sidebar-icon-row">
        <img src={iconUrl} alt={weather.weather[0].description} className="sidebar-weather-icon" />
        <span className="sidebar-daynight-icon">{dayNightIcon}</span>
      </div>
      <div className="sidebar-current">
        <div className="sidebar-temp">{Math.round(weather.main.temp)}°C</div>
        <div className="sidebar-desc">{weather.weather[0].description}</div>
      </div>
      <div className="sidebar-sun">
        <div>🌅 Sunrise: {sunrise} AM</div>
        <div>🌇 Sunset: {sunset} PM</div>
      </div>
      <div className="sidebar-chance">
        <div>🌧️ Chance of Rain: {weather.clouds.all}%</div>
      </div>
    </aside>
  )
}

export default Sidebar 