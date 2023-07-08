import React, { useState } from 'react';

function Mode(){
    const [mode, setMode] = useState(localStorage.mode);

    const handleClick = () => {
        localStorage.mode === 'light' ? localStorage.setItem('mode', 'dark') : localStorage.setItem('mode', 'light');
        setMode(localStorage.mode);
    }
    console.log(mode);

//     useEffect(()=>{
//         document.addEventListener('click', handleClick);
//     // return() => {
//     //     document.removeEventListener('click', handleClick);
//     // }
// }, []);
    
    return(
        <div className='mode__control' onClick={handleClick}>
            <div className='mode__select'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M10.8426 11.052C7.73486 11.052 5.21543 8.74226 5.21543 5.89457C5.21543 4.82024 5.57343 3.82526 6.18514 3C3.75229 3.75612 2 5.86498 2 8.35045C2 11.4708 4.75943 14 8.16286 14C10.8743 14 13.1757 12.3945 14 10.1636C13.1 10.7238 12.0129 11.052 10.8426 11.052Z" fill="white" stroke="#111517"/>
                </svg>
            </div>
            <div>Dark Mode</div>
        </div>
    );
}

export default Mode;