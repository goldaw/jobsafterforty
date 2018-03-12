import React, { Component } from 'react';
import {FormattedMessage} from 'react-intl';
import JafAppBar from './Appbar';
import { Provider } from "react-redux";
import store from "./store/index.js";
import { listenToAuth } from "./actions/auth";
import { listenToArticles } from "./actions/articles";
import './App.css';
import Feedback from "./feedback";
import JobsList from "./JobsList.js";

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
            <div style={{width:"80%", margin: "auto"}}>
            <p className="App-intro">            
	            <FormattedMessage
                    id="intro"
                    defaultMessage={`Here you can find a list of available job opportunities in leading high-tech companies such as {egCompanies}, that prioritize experienced employees.`}
                    values={{egCompanies: <b dir="rtl">{egCompanies}</b>}}
                />
             </p>
             <JobsList/>
             </div>
             <Feedback />
         
	     </div>
</Provider>
    );
  }
}

export default App;
