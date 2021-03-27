import React from 'react'
import Ameneties from './Ameneties'
import Information from './Information'
import Pictures from './Pictures'
import Offers from './Offers'

const Popup = () => {
    return (
        <div className="PopupContainer">
            <Information/>
            <Ameneties/>
            <Pictures/>
            <Offers/>
            <button className="Button">Close</button>
        </div>
    )
}

export default Popup
