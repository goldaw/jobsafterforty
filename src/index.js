import React from 'react';
import ReactDOM from 'react-dom';
import IntlComp from './IntlComp';
import './index.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import './firebaseApp.js';

injectTapEventPlugin();


ReactDOM.render(
	
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    	<IntlComp>
  		</IntlComp>
  	</MuiThemeProvider>,
  document.getElementById('root')
);
