import Header from './components/Header'
import './App.css'
import SearchBar from './components/SearchBar'
import LocationContainer from './components/LocationContainer'
import { useState } from 'react'
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

function App() {
  const [searchLocation, setSearchLocation] = useState("");
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAn3Z4M460U1yWWNulaTOs09Aj6atUIXmk",
    libraries: ["places"]
  });
  if(!isLoaded) return <p>Loading...</p>;
  console.log(window);
  return (
        <div className="App">
          <Header />
          <SearchBar searchLocation={searchLocation} setSearchLocation={setSearchLocation} />
          <LocationContainer setSearchLocation={setSearchLocation} />
        </div>
  );
}

export default App;
