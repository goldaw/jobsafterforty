import C from '../constants/scopes';
import C_feedback from '../constants/feedback';
import { database } from '../firebaseApp';

const scopesRef = database.ref('scopes');

export const listenToScopes = () => dispatch =>
  scopesRef.on(
    'value',
    snapshot =>
      dispatch({
        type: C.SCOPES_RECEIVE_DATA,
        data: Object.keys(snapshot.val()).map(key => ({ name: snapshot.val()[key].content.name, uid: key })),
      }),
    error =>
      dispatch({
        type: C.SCOPES_RECEIVE_DATA_ERROR,
        message: error.message,
      }),
  );
//checkedRegionsArrName
export const chooseScopes = (checkedScopesArrId,checkedScopesArrName) => dispatch =>
dispatch({type:C.SCOPE_CHOOSESCOPE,checkedScopesArrId,checkedScopesArrName});

  export const submitScope = content => (dispatch, getState) => {
  const state = getState();
  const scope = {
    content,
    username: state.auth.username,
    uid: state.auth.uid,
  };
  dispatch({ type: C.SCOPE_AWAIT_CREATION_RESPONSE });
  scopesRef.push(scope, (error) => {
    dispatch({ type: C.SCOPE_RECEIVE_CREATION_RESPONSE });
    if (error) {
      dispatch({
        type: C_feedback.FEEDBACK_DISPLAY_ERROR,
        error: `Scope submission failed! ${error}`,
      });
    } else {
      dispatch({
        type: C_feedback.FEEDBACK_DISPLAY_MESSAGE,
        message: 'Scope successfully saved!',
      });
    }
  });
};

export const startScopeEdit = qid => dispatch =>
  dispatch({ type: C.SCOPE_EDIT, qid });

export const cancelScopeEdit = qid => dispatch =>
  dispatch({ type: C.SCOPE_EDIT_FINISH, qid });

export const submitScopeEdit = (qid, content) => (dispatch, getState) => {
  const state = getState();
  const scope = {
    content,
    username: state.auth.username,
    uid: state.auth.uid,
  };
  dispatch({ type: C.SCOPE_EDIT_SUBMIT, qid });
  scopesRef.child(qid).set(scope, (error) => {
    dispatch({ type: C.SCOPE_EDIT_FINISH, qid });
    if (error) {
      dispatch({
        type: C_feedback.FEEDBACK_DISPLAY_ERROR,
        error: `Scope update failed! ${error}`,
      });
    } else {
      dispatch({
        type: C_feedback.FEEDBACK_DISPLAY_MESSAGE,
        message: 'Scope successfully updated!',
      });
    }
  });
};

export const deleteScope = qid => (dispatch) => {
  dispatch({ type: C.SCOPE_EDIT_SUBMIT, qid });
  scopesRef.child(qid).remove((error) => {
    dispatch({ type: C.SCOPE_EDIT_FINISH, qid });
    if (error) {
      dispatch({
        type: C_feedback.FEEDBACK_DISPLAY_ERROR,
        error: `Scope deletion failed! ${error}`,
      });
    } else {
      dispatch({
        type: C_feedback.FEEDBACK_DISPLAY_MESSAGE,
        message: 'Scope successfully deleted!',
      });
    }
  });
};
