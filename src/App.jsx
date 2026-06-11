import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useWeather } from "./hooks/useWeather";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import LoadingSkeleton from "./components/LoadingSkeleton";
import ErrorMessage from "./components/ErrorMessage";

// Popular cities for quick search
const QUICK_CITIES = ["Mumbai", "London", "Tokyo", "New York", "Sydney"];

export default function App() {
  // Dark mode: stored in localStorage so it persists on refresh
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  function toggleDark() {
    const next = !dark;
    setDark(next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  // Our custom hook gives us all the API state
  const { weather, loading, error, fetchWeather } = useWeather();

  return (
    // "dark" class on root div enables Tailwind dark mode
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-xl mx-auto px-4 py-10">

          {/* ── Header ──────────────────────────────────────────────── */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                WeatherNow
              </h1>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-0.5">
                Real-time weather data
              </p>
            </div>

            {/* Dark mode toggle */}
            <button
              onClick={toggleDark}
              aria-label="Toggle dark mode"
              className="w-10 h-10 rounded-xl border border-gray-200 dark:border-gray-700
                         bg-white dark:bg-gray-800
                         text-gray-500 dark:text-gray-400
                         hover:bg-gray-100 dark:hover:bg-gray-700
                         flex items-center justify-center transition"
            >
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          {/* ── Search ──────────────────────────────────────────────── */}
          <SearchBar onSearch={fetchWeather} loading={loading} />

          {/* Quick city buttons */}
          <div className="flex flex-wrap gap-2 mt-3">
            {QUICK_CITIES.map((city) => (
              <button
                key={city}
                onClick={() => fetchWeather(city)}
                className="text-xs px-3 py-1.5 rounded-lg
                           bg-white dark:bg-gray-800
                           border border-gray-200 dark:border-gray-700
                           text-gray-500 dark:text-gray-400
                           hover:text-blue-600 dark:hover:text-blue-400
                           hover:border-blue-300 dark:hover:border-blue-600
                           transition"
              >
                {city}
              </button>
            ))}
          </div>

          {/* ── States ──────────────────────────────────────────────── */}

          {/* Loading: show skeleton */}
          {loading && <LoadingSkeleton />}

          {/* Error: show error message */}
          {error && !loading && <ErrorMessage message={error} />}

          {/* Success: show weather card */}
          {weather && !loading && <WeatherCard weather={weather} />}

          {/* Empty state: nothing searched yet */}
          {!weather && !loading && !error && (
            <div className="mt-16 text-center text-gray-400 dark:text-gray-600">
              <p className="text-5xl mb-4">🌤</p>
              <p className="text-sm">Search a city to see the weather</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
