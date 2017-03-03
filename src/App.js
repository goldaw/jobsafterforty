import React, { Component } from 'react';
import JafAppBar from './Appbar';
import './App.css';

class App extends Component {
  render() {
  	console.log("app");
    return (
      <div className="App">
		<JafAppBar/>
        <p className="App-intro">
מי אמר שאי אפשר להתבגר בהיי-טק..
להלן רשימת משרות פתוחות של חברות היי-טק מובילות במשק - Faceboock,Rad,Verint,IBM וכו', המתעדפות עובדים ועובדות מנוסים.        </p>
      </div>
    );
  }
}

export default App;
