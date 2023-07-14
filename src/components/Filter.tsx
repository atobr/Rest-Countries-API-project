import React, { useState } from "react";
import {Region} from './Types'

import './modules/Filter.css';

interface getCountryByRegionProps {
    onSelect: (regionName: string) => void;
}

function Filter({onSelect}: getCountryByRegionProps){
    const [selectedRegion, setSelectedRegion] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) =>{
        const regionName = e.target.value;
        localStorage.setItem('regionName', `${regionName}`);
        setSelectedRegion(regionName);
        onSelect(regionName);
    }

    return(
        <div>
            <label htmlFor='region' placeholder='Filter by region'></label>
                <div>
                    <select value = {selectedRegion} name="region" id="region" className={`${localStorage.mode}`} onChange={handleChange}>
                        <option value=''>Filter by Region</option>
                        <option value={Region.Africa} >Africa</option>
                        <option value={Region.Americas}>Americas</option>
                        <option value={Region.Asia}>Asia</option>
                        <option value={Region.Europe}>Europe</option>
                        <option value={Region.Oceania}>Oceania</option>
                    </select>
                </div>
        </div>
    )
}

export default Filter;