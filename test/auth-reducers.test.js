import reducer from '../src/store/reducers/auth.js'
import C from '../src/constants'

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
	  username: null,
	  uid: null,
	  status: C.AUTH_ANONYMOUS
    })
  })
   it('should handle AUTH_OPEN', () => {
    expect(reducer({}, {type: C.AUTH_OPEN})).toEqual({
        status: C.AUTH_AWAITING_RESPONSE,
        username: "guest",
        uid: null
      })
  })
  it('should handle AUTH_LOGIN', () => {
    expect(reducer({}, {type: C.AUTH_LOGIN, username: "anatd", uid: "111"})).toEqual({
        status: C.AUTH_LOGGED_IN,
        username: "anatd",
        uid: "111"
      })
  }) 
   it('should handle AUTH_LOGOUT', () => {
    expect(reducer({}, {type: C.AUTH_LOGOUT})).toEqual({
        status: C.AUTH_ANONYMOUS,
        username: "guest",
        uid: null
      })
  })  
  })	