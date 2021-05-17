import React from 'react';
import logo from './logo.svg';
import './App.css';

import ProfileBar from './components/ProfileBar/ProfileBar';
import NavBar from './components/NavBar/NavBar';
function App() {
  return (
    <div className="App">
      {/* <NavBar/> */}
      <ProfileBar />
    </div>
  );
}

export default App;
