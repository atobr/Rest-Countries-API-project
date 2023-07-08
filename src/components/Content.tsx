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

    const webData = async () => {
        try {
            const response = await fetch(`${apiURL}/all`);

            if(!response) throw new Error('Something went wrong');
            const data = await response.json();

            console.log(data);
            setCountries(data);
            setLoading(false);

        } catch (error: any) {
            setLoading(false);
            setError(error.message);
        }
    }

    const getCountryByName = async (countryName:string) => {
        try {
            let response;
            if(!countryName){
                response = await fetch(`${apiURL}/all`);
            } else { 
                response = await fetch(`${apiURL}/name/${countryName}`);
            }


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

    const getCountryByRegion = async (regionName:string) => {
        try {
            let response;
            if(!regionName){
                response = await fetch(`${apiURL}/all`);
            } else {
                response = await fetch(`${apiURL}/region/${regionName}`);
            }
            
            if(!response) throw new Error('Region not found!');
            const data = await response.json();

            setCountries(data);
            setLoading(false);

        } catch (error: any) {
            setLoading(false);
            console.log(error.message);
            setError(error.message);
        }
    }

    useEffect(() => {
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

                {
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