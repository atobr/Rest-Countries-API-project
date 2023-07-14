import  React, { useEffect, useState } from 'react';
import { apiURL } from '../util/api';
import { Link } from 'react-router-dom';
import Search from './Search';
import Filter from './Filter';
import { Types } from './Types'

import './modules/Content.css';

function Content(){
    
    const [allCountries, setAllCountries] = useState<Types[]>([]);
    const [countries, setCountries] = useState<Types[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [found, setFound] = useState<boolean>();

    const getCountryByName = (countryName: string) => {
        let getCountries: Types[];
        if(countryName !== '' && localStorage.regionName !==''){
            getCountries = allCountries.filter(country => {
            return country.name.common.toLowerCase().includes(countryName.toLowerCase()) && country.region === localStorage.regionName;
            });
        } 
        else if(countryName ==='' && localStorage.regionName !== ''){
            getCountries = allCountries.filter(country => country.region === localStorage.regionName);
        }
        else if(countryName !=='' && localStorage.regionName ===''){
            getCountries = allCountries.filter(country => country.name.common.toLowerCase().includes(localStorage.countryName.toLowerCase()));
        }
        else{
            getCountries = allCountries;     
        }
        setCountries(getCountries);
        setLoading(false);
        getCountries.length > 0 ? setFound(true) : setFound(false);
    }


    const getCountryByRegion = (regionName:string) => {
        let getCountries: Types[];
        if(localStorage.countryName !== '' && regionName !==''){
           getCountries = allCountries.filter(country => {
            return country.region === regionName && country.name.common.toLowerCase().includes(localStorage.countryName.toLowerCase());
        }); 
        } 
        else if(localStorage.countryName === '' && regionName !== ''){
            getCountries = allCountries.filter(country => country.region === regionName);
        }
        else if(localStorage.countryName !== '' && regionName === ''){
            getCountries = allCountries.filter(country => country.name.common.toLowerCase().includes(localStorage.countryName.toLowerCase()));
        }
        else{
            getCountries = allCountries;
        }
    
        setCountries(getCountries); 
        setLoading(false);
        getCountries.length > 0 ? setFound(true) : setFound(false);
    }


    
    useEffect(() => {
        const webData = async () => {
            try {
                const response = await fetch(`${apiURL}/all`);  
                if (response.ok) {
                    const data: Types[] = await response.json();
                    setAllCountries(data);
                    setCountries(data);
                    setLoading(false);
                    setFound(true);
                } else {
                    throw new Error('Something went wrong!');
                }
            
            } catch (error: any) {
                setLoading(false);
                setError(error.message);
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
                    countries?.map((country) => (
                            <Link to={`/country/${country.name.common}`} key={country.cca3} >
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