import React from 'react';
import Auth from '../src/Auth';
import renderer from 'react-test-renderer';
import { render } from 'enzyme';
import { Provider } from "react-redux";
import store from "../src/store/index.js";
import C from "../src/constants/auth.js";
test('If logged in, shows username', () => {
	var auth = {status: C.AUTH_LOGGED_IN, username: "anat"};
  	const component = renderer.create(
  	<Provider store={store}>
  			<Auth auth={auth} logoutUser="logoutUser()"></Auth>
  			</Provider>);
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('When logged out, shows: "log in"', () => {
	var auth = {status: C.AUTH_ANONYMOUS};
  	const component = renderer.create(
  	<Provider store={store}>
  			<Auth auth={auth} logoutUser="logoutUser()"></Auth>
  			</Provider>);
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})