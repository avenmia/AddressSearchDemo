
import './App.css'
import EsriAddressSearch from "./components/EsriProviderSearch"
import GoogleAddressSearch from "./components/GoogleMapProviderSearch"
import OpenMapAddressSearch from "./components/OpenMapProviderSearch"

function App() {

  return (
    <>
      <h1>Search Address Demo</h1>
      <div className="flex justify-around">
        <div className="flex flex-col">
          <h2>Google Maps Provider</h2>
          <GoogleAddressSearch />
        </div>
        <div className="flex flex-col">
          <h2>ESRI Provider</h2>
          <EsriAddressSearch />
        </div>
        <div className="flex flex-col">
          <h2>OpenStreetMap Provider</h2>
          <OpenMapAddressSearch />
        </div>
      </div>
    </>
  )
}

export default App
