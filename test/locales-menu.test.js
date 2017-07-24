import React from 'react';
import LocalesMenu from '../src/locales-menu';
import renderer from 'react-test-renderer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

test('Menu changes the value when an option is selected', () => {
	const aLocales=[
  	{shortText: "he", primaryText: "עברית"},
  	{shortText: "en", primaryText: "English"}];
  	function setLocale(sLocale) {
  		console.log("setting locale to " + sLocale);
  	}
	const component = renderer.create(	
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
   <LocalesMenu locales={aLocales} sLocale='he' setLocale={setLocale}/></MuiThemeProvider>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

});