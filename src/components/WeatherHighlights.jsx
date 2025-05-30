import './WeatherHighlights.css'

function WeatherHighlights({ weather }) {
  if (!weather) return null
  const uv = weather.uvi !== undefined ? weather.uvi : 'N/A'
  const visibility = weather.visibility ? (weather.visibility / 1000).toFixed(1) + ' km' : 'N/A'
  const dew = weather.main && weather.main.temp && weather.main.humidity
    ? (weather.main.temp - ((100 - weather.main.humidity) / 5)).toFixed(1) + '°C'
    : 'N/A'
  const windDeg = weather.wind && weather.wind.deg
  const windDir = windDeg !== undefined ? degToCompass(windDeg) : 'N/A'

  function degToCompass(num) {
    const val = Math.floor((num / 22.5) + 0.5)
    const arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"]
    return arr[(val % 16)]
  }

  return (
    <div className="weather-highlights">
      <div className="highlight-card">☀️ UV Index: {uv}</div>
      <div className="highlight-card">👁️ Visibility: {visibility}</div>
      <div className="highlight-card">💧 Dew Point: {dew}</div>
      <div className="highlight-card">🧭 Wind Dir: {windDir}</div>
    </div>
  )
}

export default WeatherHighlights 