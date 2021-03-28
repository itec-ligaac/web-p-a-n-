import React, { useState } from 'react'
import axios from 'axios';

const LocationCard = ({ countryName, location, setSearchLocation }) => {
    const onClick = async () => {
        const location = await axios({
            method: 'GET',
            url: `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAn3Z4M460U1yWWNulaTOs09Aj6atUIXmk&address=${countryName}`
        });
        window.location.assign(`https://booking.com/searchresults.html?ss=${encodeURI(location.data.results[0].formatted_address)}&place_id_lat=${location.data.results[0].geometry.location.lat}&place_id_lon=${location.data.results[0].geometry.location.lng}`);
    }

    let [style, setStyle] = useState();
    if (!location && location.condition === 'Declining')
        style = { color: 'red' };

    return (
        <button className="LocationCard">
            <div style={{ alignSelf: 'center', fontSize: 'x-large', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', }}><p style={{ paddingLeft: '30' }}>{countryName}</p></div>
            <h2 style={{ style }}>Status: {location.condition}</h2>
            <h2>Statistics</h2>
            <div><p>Dead: {location.dead}</p></div>
            <div><p>Infected: {location.infected}</p></div>
            {location.sick && <div><p>Sick: {location.sick}</p></div>}
            <div><p>Outbreak Containment: {((location.recovered + location.dead) / location.infected * 100).toFixed(2)}{'%'}</p></div>
            {location.lockdownInfo &&
                <div>
                    <div><p>Lockdown: {location.lockdownInfo.lockdown}</p></div>
                    <div><p>Lockdown Details: {location.lockdownInfo.details}</p></div>
                    <div><p>Lockdown Source: {location.lockdownInfo.lockdownInfoSource}</p></div>
                    <div><p>Lockdown Start Date: {location.lockdownInfo.lockdownStartDate}</p></div>
                    <div><p>Events: {location.lockdownInfo.events} - {location.lockdownInfo.eventMoreInfo}</p></div>
                    {location.lockdownInfo.masks && location.lockdownInfo.masks !== [] && <div><p>Masks: {location.lockdownInfo.masks.map((arr) => {
                        return <p key={arr}>{arr}</p>;
                    })}</p></div>}
                    <div><p>Quarantine: {location.lockdownInfo.quarantineRequired}</p></div>
                    {location.lockdownInfo.quarantineRequired !== 'No' && <div><p>Quarantine details: {location.lockdownInfo.quarantine}</p></div>}
                    <div><p>Restaurants/Bars: {location.lockdownInfo.restaurantsAndBars}</p></div>
                    <div><p>Shopping: {location.lockdownInfo.shopping}</p></div>
                    <div><p>COVID-19 Test: {location.lockdownInfo.tests}</p></div>
                    <div><p>Tourist Entry: {location.lockdownInfo.touristEntry}</p></div>
                    {location.lockdownInfo.touristEntry == 'Banned' && <div>
                        <div><p>Ban start:{location.lockdownInfo.touristBanStart}</p></div>
                        <div><p>Ban end: {location.lockdownInfo.touristBanEnd}</p></div>
                        <div><p>Ban details: {location.lockdownInfo.touristInfo}</p></div>
                        {location.lockdownInfo.touristInfoSource && <div><p>Source: {location.lockdownInfo.touristInfoSource}</p></div>}
                    </div>}
                    <div><p>Tourist Attractions: {location.lockdownInfo.touristAttractions}</p></div>
                </div>}
            {location.news && location.news !== [] && location.news.map(news => {
                return <div><p style={{ alignSelf: 'center' }}><a style={{ alignSelf: 'center' }} href={news.link}>{news.title}</a></p></div>
            })}
            <button style={{ alignSelf: 'center', justifyContent: 'center' }} className="Button" onClick={onClick}>Book a Hotel!</button>
        </button>
    )
}

export default LocationCard
