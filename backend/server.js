require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// AI Advice Generator Logic (USP)
function generateAIAdvice(data) {
  const temp = data.main.temp;
  const condition = data.weather[0].main.toLowerCase();
  const wind = data.wind.speed;
  const humidity = data.main.humidity;

  let morningTip = "Standard morning routine recommended.";
  let outdoorWindow = "Conditions are generally stable today.";
  let clothingTip = "Wear comfortable casual attire.";
  let riskLevel = "LOW RISK";
  let summary = "The atmosphere is balanced. No significant anomalies detected.";

  // Intelligence rules
  if (temp > 35) {
    morningTip = "Complete outdoor tasks before 9 AM to avoid peak thermal radiation.";
    outdoorWindow = "Best outdoor conditions expected after 7 PM tonight.";
    clothingTip = "Opt for loose, light-colored linens. Hydration is critical.";
    riskLevel = "HIGH RISK";
    summary = "Extreme heat alert. Micro-climatic shifts indicate significant thermal stress on the urban grid.";
  } else if (temp < 15) {
    morningTip = "Delay outdoor activity until 10 AM for optimal solar warming.";
    outdoorWindow = "Peak solar efficiency window between 12 PM and 3 PM.";
    clothingTip = "Insulated layers and windbreakers recommended.";
    summary = "Cooler trends observed. Energy consumption for heating likely to increase in this sector.";
  }

  if (condition.includes('rain') || condition.includes('drizzle')) {
    morningTip = "Expect transit delays due to decreased spectral visibility.";
    outdoorWindow = "Sporadic breaks in precipitation expected in 2-hour cycles.";
    clothingTip = "Waterproof shells with ventilation focus.";
    summary = "Precipitation event in progress. Soil moisture levels rising, beneficial for local vegetation.";
  }

  if (wind > 10) {
    outdoorWindow = "Exercise caution with elevated structures; wind gusts exceeding 35km/h predicted.";
    riskLevel = "MODERATE RISK";
  }

  if (humidity > 80) {
    summary += " High moisture saturation detected. Evaporative cooling efficiency is significantly reduced.";
  }

  return {
    morningTip,
    outdoorWindow,
    clothingTip,
    riskLevel,
    summary
  };
}

// Main weather endpoint
app.get('/api/weather', async (req, res) => {
  const { city } = req.query;
  try {
    if (!city) {
      return res.status(400).json({ error: 'City query parameter is required.' });
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
      // Logic for developers who haven't set the key yet
      return res.status(500).json({ error: 'OPENWEATHER_API_KEY is not configured.' });
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;
    const response = await axios.get(url);
    const data = response.data;

    const payload = {
      city: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      feels_like: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      wind_speed: data.wind.speed,
      description: data.weather[0].description,
      main_condition: data.weather[0].main,
      insights: generateAIAdvice(data)
    };

    return res.json(payload);

  } catch (error) {
    console.error('Weather API Error:', error.message);
    
    // FALLBACK MOCK DATA IF KEY IS PENDING OR NETWORK TIMEOUT
    if ((error.response && error.response.status === 401) || error.code === 'ETIMEDOUT') {
      const reason = error.code === 'ETIMEDOUT' ? "Network Timeout" : "API Key Pending";
      console.log(`Serving realistic mock data (${reason})...`);
      
      const mockPayload = {
        city: city.charAt(0).toUpperCase() + city.slice(1),
        country: 'IN',
        temperature: 34,
        feels_like: 32,
        humidity: 45,
        wind_speed: 4.2,
        description: `clear sky (${reason})`,
        main_condition: 'Clear',
        insights: generateAIAdvice({ 
            main: { temp: 34, humidity: 45 }, 
            weather: [{ main: 'Clear', description: 'clear sky' }],
            wind: { speed: 4.2 }
        }),
        isMock: true
      };
      return res.json(mockPayload);
    }


    return res.status(500).json({ error: 'Error fetching weather data.' });
  }
});

app.listen(PORT, () => {
  console.log(`Atmos Backend running on http://localhost:${PORT}`);
});
