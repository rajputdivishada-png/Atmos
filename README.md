🌤️ ATMOS— Weather & Environment Module
A real-time weather intelligence system providing environmental insights, heatwave alerts, and interactive dashboards using API-based data.
> Overview-
This module is part of The Smart City Platform, focused on delivering accurate weather and environmental intelligence to support smarter urban decisions.
It fetches real-time weather data, processes it, and presents it through a modern, data-driven dashboard UI.
# 🌩️ Weather Intelligence Dashboard

> A weather app that **remembers**, **maps hyperlocal truth**, and **advises your day** — powered by OpenWeatherMap, MongoDB, and Claude AI.

![Tech Stack](https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=white)
![Node](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)
![Claude](https://img.shields.io/badge/Claude-Sonnet_4-8B5CF6?logo=anthropic&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## Overview

Most weather apps show you numbers. This one learns from you.

Three interlocked innovations sit on top of a full-featured weather dashboard:

| Innovation | What it does |
|---|---|
| **Weather Memory Engine** | Logs every search to MongoDB and detects personal anomalies via z-score analysis — *"8°C hotter than your 30-day average"* |
| **Micro-Climate Fingerprint** | Crowd-sourced, GPS-pinned heat map showing block-by-block real-feel variance with recency decay weighting |
| **Predictive Life Advisor** | Claude AI synthesises current conditions, your personal history, and a 3-day forecast into a structured daily briefing — best outdoor window, clothing tip, risk level |

---

## Screenshots

> *(Add your own screenshots here)*

---

## Features

### Base Dashboard
- Real-time weather (temp, humidity, condition, wind, AQI)
- Heatwave detection with alert banners (triggers at 40°C / 45°C)
- 7-day forecast graph via Chart.js
- City search + geolocation-based weather
- Recent searches (localStorage)
- Dark / light mode toggle

### Innovation 1 — Weather Memory Engine
- Silent per-session logging on every search (MongoDB)
- 30-day rolling history per city
- Z-score anomaly detection with human-readable labels
- Historical sparkline chart in the weather card
- Percentile context: *"hotter than 94% of your logged days"*

### Innovation 2 — Micro-Climate Fingerprint
- One-tap micro-report (7 feeling categories: much hotter, slightly hotter, as forecast, slightly cooler, windy, dusty, humid)
- GPS-precise report submission
- ~1km grid bucketing with exponential recency decay (half-life: 30 min)
- Leaflet.js heat map on dark CartoDB tiles with live bounding-box refresh

### Innovation 3 — Predictive Life Advisor
- Structured Claude API prompt bundling weather + personal history + forecast
- JSON-validated response: morning tip, best outdoor window, clothing advice, unusual fact, risk level (low → extreme)
- Graceful fallback if AI is unavailable

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Tailwind CSS + Chart.js + Leaflet.js |
| Backend | Node.js + Express |
| Database | MongoDB Atlas (free tier) |
| Weather API | OpenWeatherMap |
| AI | Anthropic Claude (`claude-sonnet-4-20250514`) |
| Deployment | Vercel (frontend) + Render (backend) |

---

## Getting Started

### Prerequisites

- Node.js 18+
- A free [OpenWeatherMap API key](https://openweathermap.org/api)
- A free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster
- An [Anthropic API key](https://console.anthropic.com/)

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/your-username/weather-dashboard.git
cd weather-dashboard

# 2. Install server dependencies
cd server
npm install

# 3. Install client dependencies
cd ../client
npm install
```

### Environment Variables

Create `server/.env`:

```env
PORT=5000
OPENWEATHER_API_KEY=your_openweathermap_key
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/weatherdb
ANTHROPIC_API_KEY=your_anthropic_key
SESSION_SECRET=any_random_string
```

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000
```

### Running Locally

```bash
# Terminal 1 — backend
cd server && node index.js

# Terminal 2 — frontend
cd client && npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## Project Structure

```
weather-dashboard/
├── server/
│   ├── index.js
│   ├── models/
│   │   ├── WeatherLog.js        # Memory Engine: per-session search history
│   │   └── MicroReport.js       # Fingerprint: crowd-sourced geo reports
│   ├── routes/
│   │   ├── weather.js           # GET /api/weather
│   │   ├── forecast.js          # GET /api/forecast
│   │   ├── history.js           # GET /api/history (Memory Engine)
│   │   ├── microreport.js       # POST/GET /api/microreport (Fingerprint)
│   │   └── advisor.js           # POST /api/advisor (Claude AI)
│   └── utils/
│       ├── weatherParser.js
│       ├── heatwaveDetector.js
│       ├── anomalyScorer.js     # Z-score from rolling history
│       ├── microclimateBucket.js # Grid bucketing + decay weighting
│       └── advisorPrompt.js     # Claude prompt builder
├── client/
│   └── src/
│       ├── components/
│       │   ├── SearchBar.jsx
│       │   ├── WeatherCard.jsx
│       │   ├── AlertBanner.jsx
│       │   ├── ForecastGraph.jsx
│       │   ├── AnomalyBadge.jsx
│       │   ├── MicroClimateMap.jsx
│       │   └── DailyBriefingCard.jsx
│       ├── hooks/
│       │   ├── useWeather.js
│       │   ├── useHistory.js
│       │   └── useAdvisor.js
│       ├── context/
│       │   └── AppContext.jsx
│       └── App.jsx
└── README.md
```

---

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/weather?city=&sessionId=` | Current weather + heatwave status. Silently logs to DB. |
| `GET` | `/api/forecast?city=` | 7-day grouped forecast |
| `GET` | `/api/history?city=&sessionId=` | 30-day rolling history + anomaly score |
| `POST` | `/api/microreport` | Submit a crowd-sourced micro-report |
| `GET` | `/api/microreport/heatmap?latMin=&latMax=&lonMin=&lonMax=` | Heat map points for a bounding box |
| `POST` | `/api/advisor` | AI daily briefing from Claude |

---

## Data Flow

```
User searches "Bhopal"
        │
        ▼
GET /api/weather?city=Bhopal&sessionId=abc123
  → OWM API fetch → parseWeather() → detectHeatwave()
  → WeatherLog.create()  ← silent logging
        │
        ├── GET /api/forecast  →  7-day chart data
        ├── GET /api/history   →  anomaly score + sparkline
        ├── POST /api/advisor  →  Claude AI briefing card
        └── GET /api/microreport/heatmap  →  Leaflet heat layer
```

---

## Deployment

### Frontend → Vercel

```bash
cd client
npm run build
npx vercel --prod
```

Set `VITE_API_URL` to your Render backend URL in the Vercel dashboard.

### Backend → Render

Connect your GitHub repo in Render. Set the start command to `node server/index.js` and add all `.env` variables in the Render dashboard.

### Database → MongoDB Atlas

Create a free M0 cluster. Add `0.0.0.0/0` to the IP allowlist for development (restrict to your server IP in production).

---

## Anomaly Scoring

The Memory Engine computes a **z-score** comparing today's temperature against the user's rolling 30-day history for that city:

```
z = (currentTemp − mean) / stdDev
```

A score above **+2** or below **−2** triggers a human-readable badge. At least 5 data points are required before anomaly labels appear.

---

## Micro-Climate Grid

Reports are bucketed to a **~1km grid** (0.01° precision). Each report is weighted by recency using exponential decay with a 30-minute half-life:

```
weight = e^(−minutesOld / 30)
```

The heat map normalises intensity so 5+ reports in a cell = full intensity. Only reports from the past 2 hours are included.

---

## Contributing

Pull requests are welcome. For significant changes, please open an issue first to discuss what you'd like to change.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a pull request

---

## License

[MIT](LICENSE)

---

## Acknowledgements

- [OpenWeatherMap](https://openweathermap.org/) for weather and AQI data
- [Anthropic](https://www.anthropic.com/) for the Claude API
- [Leaflet.js](https://leafletjs.com/) + [leaflet-heat](https://github.com/Leaflet/Leaflet.heat) for the heat map
- [CartoDB](https://carto.com/) for the dark map tiles
