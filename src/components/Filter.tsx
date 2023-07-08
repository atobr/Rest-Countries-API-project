import React from "react";
import './modules/Filter.css';

function Filter(props: any){

    const handleChange = (e:any) =>{
        const regionName = e.target.value;
        props.onSelect(regionName);
    }

    return(
        <div>
            <label htmlFor='region' placeholder='Filter by region'></label>
                    <select name="region" id="region" className={`${localStorage.mode}`} onChange={handleChange}>
                        <option value=''>Filter by Region</option>
                        <option value="Africa">Africa</option>
                        <option value="America">America</option>
                        <option value="Asia">Asia</option>
                        <option value="Europe">Europe</option>
                        <option value="Oceania">Oceania</option>
                    </select>
        </div>
    )
}

export default Filter;