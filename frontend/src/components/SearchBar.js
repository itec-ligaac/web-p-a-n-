import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import Geosuggest from 'react-geosuggest'
import '../searchBar.css'

function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}

const SearchBar = ({ searchLocation, setSearchLocation, setCanSeeLocationContainers }) => {
  const dateNow = formatDate(Date.now());
  const [date, setDate] = useState(dateNow);

  const geosuggestRef = useRef(null);

  const searchForHotels = async () => {
    const location = await axios({
      method: 'GET',
      url: `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAn3Z4M460U1yWWNulaTOs09Aj6atUIXmk&address=${searchLocation}`
    });
    window.location.assign(`https://booking.com/searchresults.html?ss=${encodeURI(location.data.results[0].formatted_address)}&place_id_lat=${location.data.results[0].geometry.location.lat}&place_id_lon=${location.data.results[0].geometry.location.lng}`);
  }

  useEffect(() => {
    geosuggestRef.current.update(searchLocation);
  }, [searchLocation])

  return (
    <div className="Search">
      <div>
        <Geosuggest placeholder="Location"
          value={searchLocation}
          onChange={setSearchLocation}
          types={['(regions)']}
          ref={geosuggestRef}
        />
      </div>
      <select name="dangerousnes" className="Dropdown">
        <option>Ascending</option>
        <option>Descending</option>
      </select>
      <input className="Datepick" type="date" name="start-date" value={date} min={dateNow} max="2021-08-30" onChange={(e) => setDate(e.target.value)} />
      <button className="Button" onClick={searchForHotels}>GO!</button>
    </div>
  )
}

export default SearchBar