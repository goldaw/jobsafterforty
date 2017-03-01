import React, { Component } from 'react';
import AppBar from './components/Appbar';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
		<jafAppBar/>
        <p className="App-intro">
מי אמר שאי אפשר להתבגר בהיי-טק..
להלן רשימת משרות פתוחות של חברות היי-טק מובילות במשק - Faceboock,Rad,Verint,IBM וכו', המתעדפות עובדים ועובדות מנוסים.        </p>
      </div>
    );
  }
}

export default App;
