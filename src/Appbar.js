import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import LocalesMenu from './locales-menu';
import Auth from './Auth';

class JafAppBar extends Component {
  getChildContext() {
  	return { muiTheme: getMuiTheme(baseTheme) };
  }	

  render() {
  	const aLocales=[
  	{shortText: "he", primaryText: "עברית"},
    {shortText: "en", primaryText: "English"}];
    const style={padding:0, color: 'white'}
    let iconElementRight = (<div><Auth></Auth></div>)
  return (<div>
  <AppBar
    title="להתבגר בהיי-טק"
    iconElementRight={iconElementRight}
    iconStyleRight={style}
  >
  </AppBar>
  </div>
	);
}}
       JafAppBar.childContextTypes = {
            muiTheme: React.PropTypes.object.isRequired,
        };

export default JafAppBar;