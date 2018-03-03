
import * as firebase from "firebase";
import C from "../constants";
import { auth } from "../firebaseApp";

export const listenToAuth = () => {return (dispatch, getState) => {
  return auth.onAuthStateChanged(authData => {
    if (authData) {
      return dispatch({
        type: C.AUTH_LOGIN,
        uid: authData.uid,
        username: authData.displayName
      });
      
    } else {
      if (getState().auth.status !== C.AUTH_ANONYMOUS) {
        return dispatch({ type: C.AUTH_LOGOUT });
      }
    }
  })
}};

export const openAuth = () => dispatch => {
  dispatch({ type: C.AUTH_OPEN });
 
};
export const signIn = (email, password) => dispatch => {
  firebase.auth().signInWithEmailAndPassword(email, password).then((authData) => {
  }). catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    dispatch({
      type: C.FEEDBACK_DISPLAY_ERROR,
      error: `Login failed! ${errorMessage}`
    });
    dispatch({ type: C.AUTH_LOGOUT });
  });
};
export const logoutUser = () => dispatch => {
  //alert("logout")
  dispatch({ type: C.AUTH_LOGOUT });
  auth.signOut();
};
