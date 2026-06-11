import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar({ onSearch, loading }) {
  const [city, setCity] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (city.trim()) onSearch(city.trim());
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search city... e.g. London, Tokyo"
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700
                     bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100
                     placeholder-gray-400 dark:placeholder-gray-500
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     text-sm transition"
        />
      </div>
      <button
        type="submit"
        disabled={loading || !city.trim()}
        className="px-5 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50
                   text-white text-sm font-semibold rounded-xl transition"
      >
        {loading ? "..." : "Search"}
      </button>
    </form>
  );
}
