import React from 'react';
import LocalesMenu from '../src/locales-menu';
import renderer from 'react-test-renderer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import { render } from 'enzyme';
test.skip('Menu changes the value when an option is selected', () => {
	const aLocales=[
  	{shortText: "he", primaryText: "עברית"},
  	{shortText: "en", primaryText: "English"}];
  	function setLocale(sLocale) {
  		console.log("setting locale to " + sLocale);
  	}
  	debugger;
  const component = renderer.create(
  	<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
  		<div>
  			<LocalesMenu locales={aLocales} sLocale='he' setLocamle={setLocale}/>
  		</div>
  	</MuiThemeProvider>);
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();

});