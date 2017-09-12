import * as actions from '../src/actions/auth.js'
import C from '../src/constants'
import { auth } from "../src/firebaseApp";
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import assert from 'assert'
import sinon from 'sinon'


const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const store = mockStore()

describe('auth actions', () => {
	describe('listenToAuth', () => {
		const s1 = sinon.stub(auth, "onAuthStateChanged");

		it('creates AUTH_LOGIN when fetching authentication data', () => {
			const expectedActions = [
     		{
        	type: C.AUTH_LOGIN,
        	uid: "1",
        	username: "Anat Dagan"
      		}
    		]
			s1.yields({uid: "1", providerData:[{displayName: "Anat Dagan"}], status: C.AUTH_LOGGED_IN})
			var entire = store.dispatch.toString(); // this part may fail!
			var body = entire.substring(entire.indexOf("{") + 1, entire.lastIndexOf("}"));
			store.dispatch(actions.listenToAuth())
			expect(store.getActions()).toEqual(expectedActions)
		})
		it('creates AUTH_LOGOUT when fetching no data', () => {
			const loggedin_store = mockStore(function getState() {return {auth: {status: C.AUTH_LOGGED_IN}}})
			const expectedActions = [
     		{
        	type: C.AUTH_LOGOUT
      		}
    		]
			s1.yields(null)
			var entire = loggedin_store.dispatch.toString(); // this part may fail!
			var body = entire.substring(entire.indexOf("{") + 1, entire.lastIndexOf("}"));
			loggedin_store.dispatch(actions.listenToAuth())
			expect(loggedin_store.getActions()).toEqual(expectedActions)			
		});
		it('do not dispatch when fetching no data and already logged out', () => {
			const loggedout_store = mockStore(function getState() {return {auth: {status: C.AUTH_ANONYMOUS}}})
			const expectedActions = [
     		{
        	type: C.AUTH_LOGOUT
      		}
    		]
			s1.yields(null)
			var entire = loggedout_store.dispatch.toString(); // this part may fail!
			var body = entire.substring(entire.indexOf("{") + 1, entire.lastIndexOf("}"));
			loggedout_store.dispatch(actions.listenToAuth())
			expect(loggedout_store.getActions().length).toEqual(0)			
		});
	})
	describe('openAuth', () => {
//todo: add tests to all auth action dispatchers
	})
})