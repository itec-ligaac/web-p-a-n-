import Header from './components/Header'
import './App.css'
import SearchBar from './components/SearchBar'
import LocationContainer from './components/LocationContainer'
import { useState } from 'react'
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import HotelContainer from './components/HotelContainer'
import Popup from './components/Popup'

const libraries = ['places'];

function App() {
  let [searchLocation, setSearchLocation] = useState();
  let [canSeeLocationContainers, setCanSeeLocationContainers] = useState(true);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAn3Z4M460U1yWWNulaTOs09Aj6atUIXmk",
    libraries: libraries
  });
  if (!isLoaded) return <p>Loading...</p>;

  return (

    <div className="App">
      <Header />
      {canSeeLocationContainers && <LocationContainer setSearchLocation={setSearchLocation} />}
    </div>
  );
}

export default App;
