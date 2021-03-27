import React, { useState } from 'react'
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

const SearchBar = () => {
  const [date, setDate] = useState(formatDate(Date.now()));
  const [value, setValue] = useState();

  const handleInput = e => {
    // Update the keyword of the input element
    setValue(e);
  };

  return (
    <div className="Search">
      <div>
        <Geosuggest placeholder="Location"
          value={value}
          onChange={(value) => { handleInput(value) }}
        />
      </div>
      <select name="dangerousnes" className="Dropdown">
        <option>Ascending</option>
        <option>Descending</option>
      </select>
      <input className="Datepick" type="date" name="start-date" value={date} min="2021-06-01" max="2021-08-30" onChange={(e) => setDate(e.target.value)} />
      <button className="Button">GO!</button>
    </div>
  )
}

export default SearchBar