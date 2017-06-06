import React, { Component } from 'react';
import {FormattedMessage} from 'react-intl';
import JafAppBar from './Appbar';
//import JobsGrid from './Jobsgrid';
import { Provider } from "react-redux";
import store from "./store/index.js";
import { listenToAuth } from "./actions/auth";
import { listenToArticles } from "./actions/articles";
import "./Auth.js";
import './App.css';

class App extends Component {
   componentWillMount() {
    store.dispatch(listenToAuth());
    store.dispatch(listenToArticles());
  }
  render() {
  	const egCompanies = "Faceboock,Rad,Verint,IBM"
    return (
<Provider store={store}>
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
</Provider>
    );
  }
}

export default App;
