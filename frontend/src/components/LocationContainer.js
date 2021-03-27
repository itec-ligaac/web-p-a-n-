import React, { useEffect, useState } from 'react'
import LocationCard from './LocationCard'
const LocationContainer = ({ setSearchLocation }) => {

    const [locations, setLocations] = useState([
        { countryName: "Madrid", vaccinability: 32 },
        { countryName: "Barcelona", vaccinability: 54 },
        { countryName: "Romania", vaccinability: 12 },
        { countryName: "United Kingdom", vaccinability: 99 },
        { countryName: "Norway", vaccinability: 12 },
        { countryName: "Germany", vaccinability: 66 },
        { countryName: "Hungary", vaccinability: 13 },
        { countryName: "Serbia", vaccinability: 74 },
    ]);

    useEffect(() => {
        // TODO: Take Locations from back-end
        //setLocations([]);
    }, []);

    return (
        <div className="LocationsGrid">
            {
                locations !== [] && locations.map((location) => {
                    return (<LocationCard countryName={location.countryName} vaccinability={location.vaccinability} setSearchLocation={setSearchLocation} />);
                })
            }
        </div>
    )
}

export default LocationContainer
