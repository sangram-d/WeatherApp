// useWeather.js
// Custom hook — handles API call, loading state, error state
// This is the #1 thing interviewers ask about: "How did you handle async data?"

import { useState } from "react";

// OpenWeatherMap free API — no key needed for this public endpoint
const API_KEY = "bd5e378503939ddaee76f12ad7a97608"; // free demo key
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export function useWeather() {
  // Three states every real-world API call needs:
  const [weather, setWeather] = useState(null);   // the data
  const [loading, setLoading] = useState(false);  // is it fetching?
  const [error, setError]     = useState("");     // did it fail?

  async function fetchWeather(city) {
    // 1. Reset previous state before new search
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      // 2. Call the API
      const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;
      const response = await fetch(url);

      // 3. HTTP errors (404 city not found, etc.) don't throw — check manually
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`City "${city}" not found. Check the spelling.`);
        }
        throw new Error("Something went wrong. Please try again.");
      }

      // 4. Parse the JSON response
      const data = await response.json();

      // 5. Save what we need into a clean object
      setWeather({
        city:        data.name,
        country:     data.sys.country,
        temp:        Math.round(data.main.temp),
        feelsLike:   Math.round(data.main.feels_like),
        humidity:    data.main.humidity,
        wind:        Math.round(data.wind.speed * 3.6), // m/s → km/h
        description: data.weather[0].description,
        icon:        data.weather[0].icon,
        visibility:  (data.visibility / 1000).toFixed(1), // m → km
        pressure:    data.main.pressure,
      });

    } catch (err) {
      // 6. Network errors AND our thrown errors both land here
      setError(err.message);
    } finally {
      // 7. Always stop loading — whether success or error
      setLoading(false);
    }
  }

  return { weather, loading, error, fetchWeather };
}
