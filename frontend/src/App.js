import Header from './components/Header'
import './App.css'
import SearchBar from './components/SearchBar'
import LocationContainer from './components/LocationContainer'

function App() {
  return (
    <div className="App">
      <Header/>
      <SearchBar/>
      <LocationContainer/>
    </div>
  );
}

export default App;
