import  React, { useEffect, useState } from 'react';
import { apiURL } from '../util/api';
import { Link } from 'react-router-dom';
import Search from './Search';
import Filter from './Filter';

import './modules/Content.css';

function Content(){
    
    const [countries, setCountries] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [found, setFound] = useState<boolean>(false);

    const handleError = (error: Error) => setError(error.message);

    const getCountryByName = async (countryName:string) => {
        try {
            let response;
            if(!countryName){
                response = await fetch(`${apiURL}/all`);
            } else { 
                response = await fetch(`${apiURL}/name/${countryName}`);
            }

            if (response.ok) {
                const data = await response.json();
                setCountries(data);
                setLoading(false);
                setFound(true);
            } else {
                setFound(false);
            }

        } catch (error: any) {
            setLoading(false);
        }
    }


    const getCountryByRegion = async (regionName:string) => {
        try {
            let response;
            if(!regionName){
                response = await fetch(`${apiURL}/all`);
            } else {
                response = await fetch(`${apiURL}/region/${regionName}`);
            }
            
            if (response.ok) {
                const data = await response.json();
                setCountries(data);
                setLoading(false);
                setFound(true);
            } else {
                throw new Error('Region not found');
            }
            
        } catch (error: any) {
            setLoading(false);
            handleError(error);
        }
    }

    useEffect(() => {
        const webData = async () => {
            try {
                const response = await fetch(`${apiURL}/all`);
    
                if (response.ok) {
                    const data = await response.json();
                    setCountries(data);
                    setLoading(false);
                    setFound(true);
                } else {
                    throw new Error('Something went wrong!');
                }
            
            } catch (error: any) {
                setLoading(false);
                handleError(error);
            }
        };
        webData();
    }, []);

    return (
        <div className='countries__wrapper'>
            <div className='countries__top'>
                <div className="search-options">
                    <div className="search">
                        <Search onSearch={getCountryByName} />
                    </div>
                    <div className={`filter ${localStorage.mode}`}>
                        <Filter onSelect={getCountryByRegion} />
                    </div>
                </div>
                
            </div>

            <div className='countries__bottom'>
                 {loading && !error && <h2>Loading....</h2>}   
                 {!loading && error && <h2>{error}</h2>}
                 {!loading && !error && !found && <h2>Country not found!</h2>}

                {!loading && !error && found &&
                    countries?.map((country, index) => (
                            <Link to={`/country/${country.name.common}`} key={index} >
                                <div className={`country__card ${localStorage.mode}`} >
                                    <div className='country__img'>
                                        <img src={country.flags.png} alt={country.flags.alt} />
                                    </div>
                                    <div className="country__data">
                                        <h4>{country.name.common}</h4>
                                        <h6><b>Population: </b>{new Intl.NumberFormat().format(country.population)}</h6>
                                        <h6><b>Region: </b>{country.region}</h6>
                                        <h6><b>Capital: </b>{country.capital}</h6>
                                    </div>
                                </div>
                            </Link>
                    ))    
                }
            </div>

        </div>
    )
}

export default Content;