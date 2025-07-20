import React from "react";

function WeatherCard({ data }) {
  if (!data || !data.location || !data.current) return null;

  // Get today's date in a nice format, e.g. "Monday, June 24, 2025"
  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString(undefined, options);

  const forecast = data.forecast?.forecastday;

  return (
    <div className="weather-card">
      {/* Display today's date */}
      <p style={{ fontSize: "1rem", color: "#00ffe7", marginBottom: "1rem" }}>
        📅 {formattedDate}
      </p>

      <h2>
        📍 {data.location.name}, {data.location.country}
      </h2>
      <img
        src={data.current.condition.icon}
        alt={data.current.condition.text}
      />
      <p>☁️ {data.current.condition.text}</p>
      <p>🌡 Temp: {data.current.temp_c}°C</p>
      <p>🤖 Feels Like: {data.current.feelslike_c}°C</p>
      <p>💧 Humidity: {data.current.humidity}%</p>
      <p>💨 Wind: {data.current.wind_kph} km/h</p>
      <p>🕒 Local Time: {data.location.localtime}</p>

      {forecast && (
        <>
          <h3 style={{ marginTop: "1.5rem", color: "#00ffe7" }}>🔮 3-Day Forecast</h3>
          <div className="forecast">
            {forecast.map((day, i) => (
              <div key={i} className="forecast-day">
                <p>{day.date}</p>
                <img
                  src={day.day.condition.icon}
                  alt={day.day.condition.text}
                  style={{ width: "48px" }}
                />
                <p>{day.day.avgtemp_c}°C</p>
                <p>{day.day.condition.text}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default WeatherCard;
