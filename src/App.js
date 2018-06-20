import React, { Component } from 'react';
import './App.css';
import MainTable from './components/MainTable';
import TierTable from './components/TierTable';

const color = ['white', '#32661e', '#418e23', '#4dbc21', '#b2d6a4', '#e8b2b2', '#c47f7f', '#b25555', '#772828'];

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1>Goldeneye Speedrun World Records</h1>
        <div className="flex-container">
          <MainTable style={{flex: 1}} color={color}/>
          <TierTable style={{flex: 1}} color={color}/>
        </div>
      </div>
    );
  }
}

export default App;
