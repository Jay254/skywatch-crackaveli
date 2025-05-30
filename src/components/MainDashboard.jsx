import {
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip
} from 'chart.js'
import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import CityInput from './CityInput'
import HourlyForecast from './HourlyForecast'
import './MainDashboard.css'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

function MainDashboard({ weather, forecast, error, onCitySubmit }) {
  const today = new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  // Local time calculation
  const [localTime, setLocalTime] = useState('')
  useEffect(() => {
    if (!weather) return
    function updateTime() {
      const now = new Date()
      const utc = now.getTime() + now.getTimezoneOffset() * 60000
      const cityTime = new Date(utc + 1000 * (weather.timezone || 0))
      setLocalTime(cityTime.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: true }))
    }
    updateTime()
    const interval = setInterval(updateTime, 60000)
    return () => clearInterval(interval)
  }, [weather])

  // Prepare chart data if forecast is available
  let chartData, chartOptions
  if (forecast && forecast.list) {
    // Aggregate by day: get max temp for each day
    const dayMap = {}
    forecast.list.forEach(item => {
      const date = new Date(item.dt * 1000)
      const day = date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })
      if (!dayMap[day] || item.main.temp > dayMap[day]) {
        dayMap[day] = item.main.temp
      }
    })
    const labels = Object.keys(dayMap).slice(0, 7)
    const temps = Object.values(dayMap).slice(0, 7)
    chartData = {
      labels,
      datasets: [
        {
          label: 'Max Temp (°C)',
          data: temps,
          fill: true,
          backgroundColor: ctx => {
            const chart = ctx.chart
            const {ctx: c, chartArea} = chart
            if (!chartArea) return 'rgba(59,130,246,0.10)'
            const gradient = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
            gradient.addColorStop(0, 'rgba(59,130,246,0.18)')
            gradient.addColorStop(1, 'rgba(59,130,246,0.01)')
            return gradient
          },
          borderColor: '#3b82f6',
          tension: 0.45,
          pointRadius: 6,
          pointBackgroundColor: '#2563eb',
          pointBorderColor: '#fff',
          pointHoverRadius: 8,
          borderWidth: 4,
          shadowOffsetX: 0,
          shadowOffsetY: 4,
          shadowBlur: 8,
          shadowColor: 'rgba(59,130,246,0.25)'
        }
      ]
    }
    chartOptions = {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: { mode: 'index', intersect: false }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            color: '#23243a',
            font: { weight: 700, size: 16 },
            maxTicksLimit: 7,
            autoSkip: false,
          }
        },
        y: {
          grid: { color: 'rgba(161,196,253,0.13)' },
          ticks: { color: '#23243a', font: { weight: 600, size: 14 } }
        }
      }
    }
  }

  return (
    <main className="main-dashboard">
      <div className="main-dashboard-header">
        <CityInput onSubmit={onCitySubmit} />
        <div className="main-dashboard-date">
          {today}
          {weather && localTime && (
            <span className="main-dashboard-localtime"> | Local time: {localTime}</span>
          )}
        </div>
      </div>
      {error && <p className="error-message">{error}</p>}
      {weather ? (
        <>
          <div className="main-dashboard-overview">
            <div className="overview-card">💨 Wind: {weather.wind.speed} m/s</div>
            <div className="overview-card">💧 Humidity: {weather.main.humidity}%</div>
            <div className="overview-card">🧭 Pressure: {weather.main.pressure} hPa</div>
            <div className="overview-card">🌡️ Feels Like: {Math.round(weather.main.feels_like)}°C</div>
          </div>
          <HourlyForecast forecast={forecast} />
        </>
      ) : (
        <div className="main-dashboard-empty">
          <h2>Welcome to SkyWatch</h2>
          <p>Search for a city or enable location to see the weather dashboard.</p>
        </div>
      )}
      <div className="main-dashboard-forecast-placeholder" style={{ minHeight: 220 }}>
        {forecast && forecast.list && forecast.list.length > 0 ? (
          <Line data={chartData} options={chartOptions} height={120} />
        ) : (
          <div className="forecast-placeholder">[Forecast graph coming soon]</div>
        )}
      </div>
    </main>
  )
}

export default MainDashboard 