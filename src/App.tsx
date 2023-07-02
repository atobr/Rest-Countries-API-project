import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Mode from './components/Mode';
// import Search from './components/Search';
import Content from './components/Content';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h3>Where in this world? </h3>
        <Mode />
      </header>
      <div className="container">
        <Content />
      </div>
    </div>
  );
}

export default App;
