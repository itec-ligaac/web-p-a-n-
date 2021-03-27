import React from 'react'

const LocationCard = ({ countryName, vaccinability, setSearchLocation }) => {
    const onClick = () => {
        console.log("Clicked");
        setSearchLocation(countryName);
    }

    return (
        <button className="LocationCard" onClick={onClick}>
            <div className="Photo"></div>
            <div className="CountryName">{countryName}</div>
            <div className="Vaccinability">
                <p> {vaccinability}</p>
            </div>
        </button>
    )
}

export default LocationCard
