import React, { useEffect, useState } from 'react'
import LocationCard from './LocationCard'
import axios from 'axios'

function sortVaccinated(country1, country2) {
    if (!country1.lockdownInfo && !country2.lockdownInfo) {
        if (country1.vaccinated > country2.vaccinated) return 1;
        else if (country1.vaccinated < country2.vaccinated) return -1;
        return 0;
    }
    if (!country2.lockdownInfo) {
        if (country1.lockdownInfo.touristEntry === 'Banned') return -1;
        if (country1.lockdownInfo.lockdown === 'No') return 1;
        if (country1.lockdownInfo.quarantineRequired === 'No') return 1;
        if (country1.condition === 'Recovering' || country1.condition === 'Recovered') return 1;
        if (country1.sickLast7 < 0) return 1;
        return -1;
    }
    if (!country1.lockdownInfo) {
        if (country2.lockdownInfo.touristEntry === 'Banned') return 1;
        if (country2.lockdownInfo.lockdown === 'No') return -1;
        if (country2.lockdownInfo.quarantineRequired === 'No') return -1;
        if (country2.condition === 'Recovering' || country2.condition === 'Recovered') return -1;
        if (country2.sickLast7 < 0) return -1;
        return 1;
    }
    if (country1.lockdownInfo.touristEntry === 'Banned') return -1;
    if (country2.lockdownInfo.touristEntry === 'Banned') return 1;
    if (country1.lockdownInfo.quarantineRequired === 'No') {
        if (country2.lockdownInfo.quarantineRequired !== 'No') return 1;
    } else if (country2.lockdownInfo.quarantineRequired === 'No') return -1;
    if (country1.lockdownInfo.lockdown === 'No') {
        if (country2.lockdownInfo.lockdown !== 'No') return 1;
    } else if (country2.lockdownInfo.lockdown === 'No') return -1;
    return 0;
}

function sortSafe(country1, country2) {
    if (!country1.lockdownInfo && !country2.lockdownInfo) {
        if (country1.condition === 'Recovered' && country2.condition !== 'Recovered') return 1;
        else if (country2.condition === 'Recovered' && country2.condition !== 'Recovered') return -1;
        if (country1.vaccinated > country2.vaccinated) return 1;
        else if (country1.vaccinated < country2.vaccinated) return -1;
        return 0;
    }
    if (!country2.lockdownInfo) {
        if (country1.lockdownInfo.lockdown === 'Yes') return 1;
        if (country1.lockdownInfo.quarantineRequired === 'Yes') return 1;
        if (country1.condition === 'Recovering' || country1.condition === 'Recovered') return 1;
        if (country1.sickLast7 < 0) return 1;
        return -1;
    }
    if (!country1.lockdownInfo) {
        if (country2.lockdownInfo.lockdown === 'Yes') return -1;
        if (country2.lockdownInfo.quarantineRequired === 'Yes') return -1;
        if (country2.condition === 'Recovering' || country2.condition === 'Recovered') return -1;
        if (country2.sickLast7 < 0) return -1;
        return 1;
    }
    if (country1.lockdownInfo.quarantineRequired === 'Yes') {
        if (country2.lockdownInfo.quarantineRequired !== 'Yes') return 1;
    } else if (country2.lockdownInfo.quarantineRequired === 'Yes') return -1;
    if (country1.lockdownInfo.lockdown === 'Yes') {
        if (country2.lockdownInfo.lockdown !== 'Yes') return 1;
    } else if (country2.lockdownInfo.lockdown === 'Yes') return -1;
    return 0;
}

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

    const [locationsForVaccinatedPeople, setLocationsForVaccinatedPeople] = useState([]);
    const [locationsForSafePeople, setLocationsForSafePeople] = useState([]);

    useEffect(() => {
        async function locss() {
            let locs = [];
            let promises = [];
            promises = locationsForVaccinatedPeople.map((location) => {
                return axios({
                    method: 'GET',
                    url: `https://prod.greatescape.co/api/travel/countries/${location.cId}/corona/`,
                    headers: {
                        'Authorization': '310dec693cf7176b37c859f3ae6f596e7fc24ea8a58b580148754292c6e42590'
                    }
                }).then(result => {
                    locs.push(result.data);
                }).catch(err => {
                    console.log(err);
                });
            });
            await Promise.all(promises);
            console.log(locs);
            setLocationsForVaccinatedPeople(locs);
        }
        if (locationsForVaccinatedPeople[0] === undefined || locationsForVaccinatedPeople[0].cases) return;
        locss();
    }, [locationsForVaccinatedPeople]);

    useEffect(() => {
        async function locss() {
            let locs = [];
            let promises = [];
            promises = locationsForSafePeople.map((location) => {
                return axios({
                    method: 'GET',
                    url: `https://prod.greatescape.co/api/travel/countries/${location.cId}/corona/`,
                    headers: {
                        'Authorization': '310dec693cf7176b37c859f3ae6f596e7fc24ea8a58b580148754292c6e42590'
                    }
                }).then(result => {
                    locs.push(result.data);
                }).catch(err => {
                    console.log(err);
                });
            });
            await Promise.all(promises);
            console.log(locs);
            setLocationsForSafePeople(locs);
        }
        if (locationsForSafePeople[0] === undefined || locationsForSafePeople[0].cases) return;
        locss();
    }, [locationsForSafePeople]);

    useEffect(() => {
        async function getBestLocations() {
            const res = await axios({
                method: 'GET',
                url: 'https://prod.greatescape.co/api/travel/countries/corona/',
                headers: {
                    'Authorization': '310dec693cf7176b37c859f3ae6f596e7fc24ea8a58b580148754292c6e42590'
                }
            });
            const data = Object.values(res.data);
            setLocations(data);
            setLocationsForVaccinatedPeople(data.sort(sortVaccinated).reverse().slice(0, 8));
            setLocationsForSafePeople(data.sort(sortSafe).reverse().slice(0, 8));
        }
        getBestLocations();
    }, []);

    return (
        <div>
            <h2>Locations if you have been vaccinated</h2>
            <div className="LocationsGrid">
                {
                    locationsForVaccinatedPeople !== [] && locationsForVaccinatedPeople.map((location) => {
                        return (<LocationCard location={location} countryName={location.name} setSearchLocation={setSearchLocation} />);
                    })
                }
            </div>
            <h2>Locations if you want to be safe</h2>
            <div className="LocationsGrid">
                {
                    locationsForSafePeople !== [] && locationsForSafePeople.map((location) => {
                        return (<LocationCard location={location} countryName={location.name} setSearchLocation={setSearchLocation} />);
                    })
                }
            </div>
        </div>
    )
}

export default LocationContainer
