import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherCard from "./Components/WeatherCard";
import "./App.css";

// 🔑 Replace with your actual WeatherAPI key
const API_KEY = "334ba4e3e2fb44b690e34427252406";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [date, setDate] = useState("");

  // Set date on app load and update every day if you want (optional)
  useEffect(() => {
    const updateDate = () => {
      const today = new Date();
      const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
      setDate(today.toLocaleDateString(undefined, options));
    };

    updateDate();

    // Optional: update date at midnight automatically (if app runs very long)
    const interval = setInterval(updateDate, 1000 * 60 * 60); // every hour, for example
    return () => clearInterval(interval);
  }, []);

  const fetchWeather = async () => {
    try {
      const res = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );
      setWeather(res.data);
    } catch (err) {
      console.error("Error fetching weather:", err);
      setWeather(null);
    }
  };

  return (
    <div className="app-container">
      {/* Date always visible above input */}
      <p className="current-date">📅 {date}</p>

      <input
        type="text"
        placeholder="Search city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="search-input"
      />
      <button onClick={fetchWeather} className="search-button">
        Get Weather
      </button>

      <div className="weather-display">
        {weather && <WeatherCard data={weather} />}
      </div>
    </div>
  );
}

export default App;
