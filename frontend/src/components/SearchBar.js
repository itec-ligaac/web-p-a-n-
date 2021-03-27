import React, { useState } from 'react'
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete'

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

    const {
        ready,
        value,
        suggestions: { status, data },
        setValue, clearSuggestions
      } = usePlacesAutocomplete({
        requestOptions: { /* Define search scope here */ }
      });
  
      const handleInput = e => {
          // Update the keyword of the input element
          setValue(e.target.value);
        };
  
        const handleSelect = ({ description }) => () => {
          // When user selects a place, we can replace the keyword without request data from API
          // by setting the second parameter as "false"
          setValue(description, false);
      
          // Get latitude and longitude via utility functions
          getGeocode({ address: description })
            .then(results => getLatLng(results[0]))
            .then(({ lat, lng }) => {
              console.log('📍 Coordinates: ', { lat, lng });
            }).catch(error => {
              console.log('😱 Error: ', error)
            });
        };
  
      const renderSuggestions = () =>
      data.map(suggestion => {
        const {
          id,
          structured_formatting: { main_text, secondary_text }
        } = suggestion;
  
        return (
          <li
            key={id}
            onClick={handleSelect(suggestion)}
          >
            <strong>{main_text}</strong> <small>{secondary_text}</small>
          </li>
        );
      });

      return (
        <div className="Search">
            <div>
                <input type="text" placeholder="Location" className="Search-Bar" value={value} 
                onChange={handleInput} />
                {<ul>{renderSuggestions()}</ul>}
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
