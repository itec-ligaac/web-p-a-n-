import React, { useState } from 'react'

const SearchBar = ({ searchLocation, setSearchLocation }) => {
    const [date, setDate] = useState("2021-06-06");

    return (
        <div className="Search">
            <input type="text" placeholder="Location" className="Search-Bar" value={searchLocation} onChange={(e) => setSearchLocation(e.target.value)} />
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
