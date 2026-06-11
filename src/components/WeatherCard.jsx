import { Droplets, Wind, Eye, Gauge } from "lucide-react";

// Map weather description → background gradient class
function getBgClass(description) {
  const d = description.toLowerCase();
  if (d.includes("clear"))                           return "from-sky-400 to-blue-500";
  if (d.includes("cloud"))                           return "from-slate-400 to-gray-500";
  if (d.includes("rain") || d.includes("drizzle"))   return "from-blue-500 to-indigo-600";
  if (d.includes("thunder") || d.includes("storm"))  return "from-gray-700 to-slate-800";
  if (d.includes("snow"))                            return "from-blue-100 to-indigo-200";
  if (d.includes("mist") || d.includes("fog"))       return "from-gray-300 to-slate-400";
  return "from-blue-400 to-indigo-500";
}

// Individual stat tile
function StatTile({ icon: Icon, label, value, unit }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4">
      <div className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500 mb-2">
        <Icon className="w-4 h-4" />
        <span className="text-xs font-medium uppercase tracking-wide">{label}</span>
      </div>
      <p className="text-xl font-bold text-gray-800 dark:text-gray-100">
        {value}
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-1">{unit}</span>
      </p>
    </div>
  );
}

export default function WeatherCard({ weather }) {
  const bgClass = getBgClass(weather.description);
  const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;

  return (
    <div className="mt-6 space-y-4">

      {/* Hero card */}
      <div className={`bg-gradient-to-br ${bgClass} rounded-2xl p-6 text-white shadow-lg`}>
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold">{weather.city}</h2>
            <p className="text-white/80 text-sm">{weather.country}</p>
          </div>
          <img
            src={iconUrl}
            alt={weather.description}
            className="w-16 h-16 -mt-2 -mr-2 drop-shadow"
          />
        </div>

        <div className="mt-2">
          <p className="text-6xl font-bold tracking-tight">{weather.temp}°</p>
          <p className="text-white/80 capitalize mt-1">{weather.description}</p>
          <p className="text-white/60 text-sm mt-0.5">Feels like {weather.feelsLike}°C</p>
        </div>
      </div>

      {/* Stat tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatTile icon={Droplets} label="Humidity"   value={weather.humidity} unit="%" />
        <StatTile icon={Wind}     label="Wind"       value={weather.wind}     unit="km/h" />
        <StatTile icon={Eye}      label="Visibility" value={weather.visibility} unit="km" />
        <StatTile icon={Gauge}    label="Pressure"   value={weather.pressure} unit="hPa" />
      </div>

    </div>
  );
}
