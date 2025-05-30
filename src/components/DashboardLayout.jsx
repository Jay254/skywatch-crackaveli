import './DashboardLayout.css'
import MainDashboard from './MainDashboard'
import Sidebar from './Sidebar'

function DashboardLayout({ weather, forecast, loading, error, onCitySubmit }) {
  return (
    <div className="dashboard-layout">
      <Sidebar weather={weather} loading={loading} />
      <MainDashboard weather={weather} forecast={forecast} loading={loading} error={error} onCitySubmit={onCitySubmit} />
    </div>
  )
}

export default DashboardLayout 