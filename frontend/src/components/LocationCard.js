import React from 'react'

const LocationCard = () => {
    const onClick = ()=>{
        console.log("Clicked")
    }
    return (
        <button className="LocationCard" onClick={onClick}>
            <div className="Photo"></div>
            <div className="CountryName">Madrid</div>
            <div className="Vaccinability">
                <p> Over 9000</p>
            </div>
        </button>
    )
}

export default LocationCard
