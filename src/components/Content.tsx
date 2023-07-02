import  React, { useEffect, useState } from 'react';
import { apiURL } from '../util/api';
import Search from './Search';

function Content(){
    
    const [countries, setCountries] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const webData = async () => {
        try {
            const response = await fetch(apiURL);

            if(!response) throw new Error('Something went wrong');
            const data = await response.json();

            setCountries(data);
            setLoading(false);

        } catch (error:any) {
            setLoading(false);
            setError(error.message);
        }
    }

    let getCountryByName;
    console.log(countries);

    useEffect(() => {
        webData();
    }, []);

    return (
        <div className='countries__wrapper'>
            <div className='countries__top'>
                <div className="search">
                    <Search onSearch={getCountryByName}/>
                </div>
            </div>

            <div className='countries__bottom'>
                 {loading && !error && <h2>Loading....</h2>}   
                 {!loading && error && <h2>{error}</h2>}

                {
                    countries.map(country => (
                        <div className='country__card'>
                            <div className='country__img'>
                                <img src={country.flags.png} alt={country.flags.alt} />
                            </div>
                            <div className="country__data">
                                <h4>{country.name.common}</h4>
                                <h6><b>Population: </b>{country.population}</h6>
                                <h6><b>Region: </b>{country.region}</h6>
                                <h6><b>Capital: </b>{country.capital}</h6>
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default Content;