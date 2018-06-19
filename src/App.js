import React, { Component } from 'react';
import './App.css';
import MainTable from './components/MainTable';

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1>Goldeneye Speedrun World Records</h1>
        <MainTable />
      </div>
    );
  }
}

export default App;
