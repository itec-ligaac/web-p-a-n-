import React, { useState } from 'react'

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

const SearchBar = ({ searchLocation, setSearchLocation }) => {
    const [date, setDate] = useState(formatDate(Date.now()));

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
