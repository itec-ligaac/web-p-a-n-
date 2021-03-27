import Header from './components/Header'
import './App.css'
import SearchBar from './components/SearchBar'
import LocationContainer from './components/LocationContainer'
import { useState } from 'react'
import HotelContainer from './components/HotelContainer'
import Popup from './components/Popup'

function App() {
  const [searchLocation, setSearchLocation] = useState("");
  return (
    <div className="App">
      <Header />
      <SearchBar searchLocation={searchLocation} setSearchLocation={setSearchLocation} />
      <LocationContainer setSearchLocation={setSearchLocation} />
      <HotelContainer/>
      <Popup/>
    </div>
  );
}

export default App;
