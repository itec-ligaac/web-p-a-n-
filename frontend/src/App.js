import Header from './components/Header'
import './App.css'
import SearchBar from './components/SearchBar'
import LocationContainer from './components/LocationContainer'
import { useState } from 'react'
import HotelContainer from './components/HotelContainer'

function App() {
  const [searchLocation, setSearchLocation] = useState("");
  return (
    <div className="App">
      <Header />
      <SearchBar searchLocation={searchLocation} setSearchLocation={setSearchLocation} />
      <LocationContainer setSearchLocation={setSearchLocation} />
      <HotelContainer/>
    </div>
  );
}

export default App;
