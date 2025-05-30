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
import { Line } from 'react-chartjs-2'
import CityInput from './CityInput'
import './MainDashboard.css'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

function MainDashboard({ weather, forecast, error, onCitySubmit }) {
  const today = new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  // Prepare chart data if forecast is available
  let chartData, chartOptions
  if (forecast && forecast.list) {
    const labels = forecast.list.map(item => {
      const date = new Date(item.dt * 1000)
      return date.toLocaleString(undefined, { weekday: 'short', hour: '2-digit', hour12: false })
    })
    const temps = forecast.list.map(item => item.main.temp)
    chartData = {
      labels,
      datasets: [
        {
          label: 'Temperature (°C)',
          data: temps,
          fill: true,
          backgroundColor: 'rgba(161,196,253,0.3)',
          borderColor: '#4f8efc',
          tension: 0.4,
          pointRadius: 0,
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
          ticks: { color: '#23243a', font: { weight: 500 } }
        },
        y: {
          grid: { color: 'rgba(161,196,253,0.2)' },
          ticks: { color: '#23243a', font: { weight: 500 } }
        }
      }
    }
  }

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