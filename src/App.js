import React, { Component } from 'react';
import {FormattedMessage} from 'react-intl';
import JafAppBar from './Appbar';
import './App.css';

class App extends Component {
  render() {
  	const egCompanies = "Faceboock,Rad,Verint,IBM"
    return (

	      <div className="App">
			<JafAppBar setLocale={this.props.setLocale} sLocale={this.props.sLocale}/>
	        <p className="App-intro">
	            <FormattedMessage
                    id="intro"
                    defaultMessage={`Here you can find a list of available job opportunities in leading high-tech companies such as {egCompanies}, that prioritize experienced employees.`}
                    values={{egCompanies: <b dir="rtl">{egCompanies}</b>}}
                />
                </p>
	     </div>

    );
  }
}

export default App;
