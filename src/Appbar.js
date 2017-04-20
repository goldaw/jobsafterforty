import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import LocalesMenu from './locales-menu';

class JafAppBar extends Component {
  getChildContext() {
  	return { muiTheme: getMuiTheme(baseTheme) };
  }	

  render() {
  	const aLocales=[
  	{shortText: "he", primaryText: "עברית"},
  	{shortText: "en", primaryText: "English"}];
  return (<div>
  <AppBar
    title="להתבגר בהיי-טק"
    iconElementRight={<LocalesMenu locales={aLocales} sLocale={this.props.sLocale} setLocale={this.props.setLocale}/>}
  />
  </div>
	);
}}
       JafAppBar.childContextTypes = {
            muiTheme: React.PropTypes.object.isRequired,
        };

export default JafAppBar;