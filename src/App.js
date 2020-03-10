import React from 'react';
import Particles from 'react-particles-js';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div
    style={{
      width: "100%",
      height: "100%",
      backgroundColor: "blue"
    }}
  >
    <Particles
      // Add window resize logic if required
      height={window.outerHeight}
      params={{
        "particles": {
           "number": {
              "value": 60
           },
           "size": {
              "value": 3
           },
           "color": {
              "value": "#00f7ce"
           }
        },
        "interactivity": {
           "events": {
              "onhover": {
                 "enable": true,
                 "mode": "repulse"
              }
           }
        }
     }}
    />
  </div>
  );
}

export default App;
