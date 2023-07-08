import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Mode from './components/Mode';
import Content from './components/Content';
import Details from './components/Details';

function App() {

  return (
    <div className={`App ${localStorage.mode}`}>
      <div className={`App-header ${localStorage.mode}`}>
        <h3>Where in the world? </h3>
        <Mode />
      </div>
      <div className="container">
        <Routes>
          <Route path='/' element={<Content />} />
          <Route path='/country/:countryName' element={<Details />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
