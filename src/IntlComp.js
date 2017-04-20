import React, { Component } from 'react';
import App from './App';
import {addLocaleData, IntlProvider } from "react-intl";
import enUsLocaleData from "react-intl/locale-data/en";
import heLocaleData from "react-intl/locale-data/he";
// add info on the current locale
addLocaleData([...enUsLocaleData, ...heLocaleData]);




class IntlComp extends Component {
  constructor(props) {
    super(props);
    this.state = {locale: "he", messages: require("./i18n/lang/he.json")};
  } 
  setLocale(sNewLocale) {
	console.log(sNewLocale)
	this.setState({locale: sNewLocale, messages: require("./i18n/lang/" + sNewLocale+ ".json")});
  }  
  render() {

    return (

    	<IntlProvider locale={this.state.locale} key={this.state.locale} messages={this.state.messages}>
    		<App setLocale={this.setLocale.bind(this)} sLocale={this.state.locale}/>
  		</IntlProvider>
    );
  }
}

export default IntlComp;