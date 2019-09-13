import React from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from './dashboard/dashboard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h4>Pokemon List</h4>
        <Dashboard/>
      </header>
    </div>
  );
}

export default App;
