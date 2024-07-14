import React, { useRef } from 'react';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS

import { LoadScript, Autocomplete, Libraries } from "@react-google-maps/api";

interface GoogleMapsResponseData {
  results: google.maps.places.PlaceResult[];
}

const GoogleAddressSearch: React.FC = () => {
  const [address, setAddress] = React.useState<string>("");
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const libraries: Libraries = ["places"];
  const handlePlaceChanged = async () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current?.getPlace();
      console.log("Place is:", place);
      if (place.formatted_address) {
        setAddress(place.formatted_address);
        console.log("Address is:", place.formatted_address);

        const location = place.geometry?.location;
        if (location) {
          const lat = location.lat();
          const lng = location.lng();
          console.log("Lat is:", lat);
          console.log("Lng is:", lng);

          try {
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${
                import.meta.env.GOOGLE_MAPS_API_KEY ?? ""
              }`
            );
            const data = (await response.json()) as GoogleMapsResponseData;
            console.log("Data is:", data)

          } catch (error) {
            console.error("Error fetching geocode data:", error);
          }
        }
      }
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.GOOGLE_MAPS_API_KEY!}
      libraries={libraries}
    >
        <div className="flex flex-col items-center">
          <Autocomplete
            onLoad={(autocomplete) => {
              autocompleteRef.current = autocomplete;
            }}
            onPlaceChanged={() => {
              handlePlaceChanged().catch(console.error);
            }}
          >
            <input
              type="text"
              placeholder="Search for an address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border-gray-300 focus:ring-blue-500 focus:border-transparent w-96 rounded-md border p-2 shadow-sm focus:outline-none focus:ring-2"
            />
          </Autocomplete>
          <div className="mt-4 text-center">

          </div>
        </div>
    </LoadScript>
  );
};

export default GoogleAddressSearch;