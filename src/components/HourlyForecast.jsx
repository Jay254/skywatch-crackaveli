import './HourlyForecast.css'

function HourlyForecast({ forecast }) {
  if (!forecast || !forecast.list) return null
  const hours = forecast.list.slice(0, 5)

  return (
    <div className="hourly-forecast">
      {hours.map((item, idx) => {
        const date = new Date(item.dt * 1000)
        const hour = date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
        const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
        const temp = Math.round(item.main.temp)
        const rain = item.pop ? Math.round(item.pop * 100) : 0
        return (
          <div className="hour-card" key={idx}>
            <div className="hour-time">{hour}</div>
            <img src={iconUrl} alt={item.weather[0].description} className="hour-icon" />
            <div className="hour-temp">{temp}°C</div>
            <div className="hour-rain">🌧️ {rain}%</div>
          </div>
        )
      })}
    </div>
  )
}

export default HourlyForecast 