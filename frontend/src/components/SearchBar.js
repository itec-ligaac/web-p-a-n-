import React from 'react'

const SearchBar = () => {
    return (
        <div className="Search">
            <input type="text" placeholder="Location" className="Search-Bar"/>
            <select name="dangerousnes" className="Dropdown">
                <option>Ascending</option>
                <option>Descending</option>
            </select>
            <input className="Datepick" type="date" name="start-date" value="2021-06-06" min="2021-06-01" max="2021-08-30"/>
            <button className="Button">GO!</button>
        </div>
    )
}

export default SearchBar
