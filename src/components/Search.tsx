import React, { useState } from 'react';

function Search(props:any){
    const [input, setInput] = useState('');
    const handleChange = (e:any) => {
        setInput(e.target.key);
    }
    const handleSubmit = (e:any) =>{
        e.preventDefault();
        props.onSearch(input);
    }
    return(
        <form onSubmit={handleSubmit}>
            <input name='search' type='text' placeholder='Search for a country' value={input} onChange={handleChange}/>
            <label htmlFor='search'></label>
            <select name="region" id="region" placeholder='Filter by region'>Filter by region
                <option value=""></option>
            </select>
        </form>
    )
}
export default Search;