import React, { useState, useEffect } from 'react';

function Mode(){
    // localStorage.setItem('mode', 'light');
    // const [mode, setMode] = useState(localStorage.getItem('mode'));

    // const handleClick = () => {
    //     setMode('dark');
    //     localStorage.setItem('mode', 'dark');
    // }
    // useEffect(()=>{
    //     document.addEventListener('click', handleClick);
    // return() => {
    //     document.removeEventListener('click', handleClick);
    // }
// });
    
    return(
        <div className='mode__control'>
            <div className='mode__select'>...</div>
            <div>Dark Mode</div>
        </div>
    );
}

export default Mode;