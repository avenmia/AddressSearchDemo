import React, { useState, ChangeEvent } from 'react';
import { EsriProvider } from 'leaflet-geosearch';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS

interface SearchResult {
  x: number;
  y: number;
  label: string;
}

const EsriAddressSearch: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lon: number } | null>(null);
  const provider = new EsriProvider();

  const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);

    if (value.length > 2) {
      const results = await provider.search({ query: value });
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: SearchResult) => {
    setQuery(suggestion.label);
    setSuggestions([]);
    setSelectedLocation({ lat: suggestion.y, lon: suggestion.x });
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Enter address"
        className="p-2 border border-gray-300 rounded w-full"
      />
      {suggestions.length > 0 && (
        <div className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer text-black"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.label}
            </div>
          ))}
        </div>
      )}
      {selectedLocation && (
        <div className="mt-4 p-2 border border-gray-300 rounded">
          <p>Latitude: {selectedLocation.lat}</p>
          <p>Longitude: {selectedLocation.lon}</p>
        </div>
      )}
    </div>
  );
};

export default EsriAddressSearch;