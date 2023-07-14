import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { apiURL } from "../util/api";
import './modules/Details.css';

import { Types } from "./Types";

function Details(){

    const [countries, setCountries] = useState<Types[]>([]);
    const [country, setCountry] = useState<Types[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const {countryName} = useParams();

    let borders: {[key: string]: string} = {};
    for(let i=0; i < countries.length; i++){
        borders[countries[i].cca3] = countries[i].name.common;
    }

    useEffect(()=>{
        const getCountries = async () => {
            try {
                const response = await fetch(`${apiURL}/all`);
    
                if(!response) throw new Error('Country not found!');
                const data = await response.json();
                setCountries(data);
                setLoading(false);
            } catch (error: any) {
                setLoading(false);
                console.log(error.message);
                setError(error.message);
            }
        }

        const getCountryByName = () =>{
            const country = countries.filter(country => country.name.common === countryName);
            setCountry(country);
        }

        getCountries();
        getCountryByName();
    }, [countryName, countries]);

    let fill = localStorage.mode === 'dark' ? '#fff' : '#111517';

    return (
        <div className="country__details__wrapper"> 
            <button className={`button__back ${localStorage.mode}`}>
                <Link to='/'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M6.46447 4.10744L7.64298 5.28596L3.75389 9.17504L18.6031 9.17504L18.6031 10.825L3.75389 10.825L7.64298 14.714L6.46447 15.8926L0.57191 10L6.46447 4.10744Z" fill={fill}/>
                    </svg>
                    <p id='back' className={localStorage.mode}>Back</p>
                </Link>
            </button>
   
            {loading && !error && <h2>Loading....</h2>}   
            {!loading && error && <h2>{error}</h2>}

            {
                country.map((country)=>(
                    <div className="country__details__container" key={country.ccn3}>
                        <div className="country__details-img">
                            <img src={country.flags.png} alt={country.flags.alt} />
                        </div>
                        <div className="country__details">

                            <h3>{country.name.common}</h3>

                            <div className="country__info">
                                <div className="country__details-left">
                                    <h5><b>Native Name:</b> { country.name.nativeName ? (Object.values(country.name.nativeName))[0].official : country.name.common }</h5>
                                    <h5><b>Population:</b> { new Intl.NumberFormat().format(country.population) }</h5>
                                    <h5><b>Region:</b> {country.region}</h5>
                                    <h5><b>Sub Region:</b> {country.subregion}</h5>
                                    <h5><b>Capital:</b> {country.capital}</h5>
                                </div>

                                <div className="country__details-right">
                                    <h5><b>Top Level Domain:</b> {country.tld}</h5>
                                    <h5>
                                        <b>Currencies: </b> 
                                        { country.currencies ? (Object.values(country.currencies))[0].name : '' }
                                    </h5>
                                    <h5 className="languages"><b>Languages: </b> 
                                        { country.languages ? Object.values(country.languages).join(', ') : '' }
                                    </h5>
                                </div>
                            </div>

                            <div className="border__countries">
                                <h5><b>Border Countries: </b> 
                                    <div>
                                        { country.borders ? Object.values(country.borders).map(border => (
                                            <p key={border} className={`border ${localStorage.mode}`}>
                                                {borders[border]}
                                            </p>
                                        )) : ''} 
                                    </div>
                                </h5>
                            </div>
                            
                        </div>
                    </div>
                ))
            }
            
        </div>

    )
}

export default Details;