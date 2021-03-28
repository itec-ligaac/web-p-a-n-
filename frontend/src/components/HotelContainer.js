import React from 'react'
import Hotel from './Hotel'
import Weather from './Weather'

const HotelContainer = () => {
    return (
        <div className="HotelCont">
            <Hotel/>
            <Weather/>    
        </div>
    )
}

export default HotelContainer
