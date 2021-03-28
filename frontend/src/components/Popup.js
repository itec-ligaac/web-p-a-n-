import React from 'react'
import Ameneties from './Ameneties'
import Information from './Information'
import Pictures from './Pictures'
import Offers from './Offers'

const Popup = () => {
    return (
        <div className="PopupContainer">
            <Pictures />
            <Information />
            <Ameneties />
            <Offers />
            <button className="Button">Close</button>
        </div>
    )
}

export default Popup
