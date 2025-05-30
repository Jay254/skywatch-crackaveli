# 🌤️ SkyWatch Crackaveli

A sleek, modern weather dashboard built with React, Chart.js, and pure CSS.

## 🚀 Features

- 🔍 Search weather by city
- 📍 Auto-detect location using geolocation
- 🕒 Local time display for each city
- 🌡️ Real-time temperature, humidity, wind, pressure, feels like, min/max
- ⏳ Hourly forecast cards (next 5 hours)
- 📈 5-day temperature trend chart (max temp per day)
- 🎨 Clean, responsive UI with glassmorphism and weather icons
- 🌅 Sunrise/sunset, day/night indicator, and chance of rain
- 🧭 Sidebar with large weather icon and city info
- ⚡ Fast, client-side experience (Vite + React)

## 🛠️ Built With

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Chart.js](https://www.chartjs.org/) via [react-chartjs-2](https://react-chartjs-2.js.org/)
- Plain CSS (no Tailwind, no fluff)
- [OpenWeather API](https://openweathermap.org/api)

## 📦 Getting Started

1. **Clone the repo:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/skywatch-crackaveli.git
   cd skywatch-crackaveli
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Create a `.env` file in the root:**
   ```env
   VITE_OPENWEATHER_API_KEY=your_openweather_api_key_here
   ```
4. **Run the app locally:**
   ```bash
   npm run dev
   ```

## 🔒 API Key Security
- Your `.env` file is gitignored and should NOT be committed.
- For production, set your environment variables in your deployment platform (Vercel, Netlify, etc.).
- For maximum security, use a backend proxy to hide your API key from the frontend.

## 🌐 Deployment
- Deploy to Vercel, Netlify, or Render.
- Set `VITE_OPENWEATHER_API_KEY` in your platform's environment variables settings.
- (Optional) Set up a backend proxy for your API key.

## ✨ Credits
- Weather data from [OpenWeather](https://openweathermap.org/)
- Weather icons from [OpenWeather Icons](https://openweathermap.org/weather-conditions)
- UI inspiration from modern weather apps

---

Enjoy your beautiful, modern weather dashboard! 🌦️

```bash
git clone https://github.com/YOUR_USERNAME/skywatch-crackaveli.git
cd skywatch-crackaveli
npm install
npm run dev
