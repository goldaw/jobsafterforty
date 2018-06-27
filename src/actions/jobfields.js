import C from '../constants/jobfields';
import C_feedback from '../constants/feedback';
import { database } from '../firebaseApp';

const jobfieldsRef = database.ref('jobfields');

export const listenToJobFields = () => dispatch =>
  jobfieldsRef.on(
    'value',
    snapshot =>
      dispatch({
        type: C.JOBFIELDS_RECEIVE_DATA,
        data: Object.keys(snapshot.val()).map(key => ({ name: snapshot.val()[key].content.name, uid: key })),
      }),
    error =>
      dispatch({
        type: C.JOBFIELDS_RECEIVE_DATA_ERROR,
        message: error.message,
      }),
  );

export const submitJobField = content => (dispatch, getState) => {
  const state = getState();
  const jobfield = {
    content,
    username: state.auth.username,
    uid: state.auth.uid,
  };
  dispatch({ type: C.JOBFIELD_AWAIT_CREATION_RESPONSE });
  jobfieldsRef.push(jobfield, (error) => {
    dispatch({ type: C.JOBFIELD_RECEIVE_CREATION_RESPONSE });
    if (error) {
      dispatch({
        type: C_feedback.FEEDBACK_DISPLAY_ERROR,
        error: `JobField submission failed! ${error}`,
      });
    } else {
      dispatch({
        type: C_feedback.FEEDBACK_DISPLAY_MESSAGE,
        message: 'JobField successfully saved!',
      });
    }
  });
};

export const startJobFieldEdit = qid => dispatch =>
  dispatch({ type: C.JOBFIELD_EDIT, qid });

export const cancelJobFieldEdit = qid => dispatch =>
  dispatch({ type: C.JOBFIELD_EDIT_FINISH, qid });

export const submitJobFieldEdit = (qid, content) => (dispatch, getState) => {
  const state = getState();
  const jobfield = {
    content,
    username: state.auth.username,
    uid: state.auth.uid,
  };
  dispatch({ type: C.JOBFIELD_EDIT_SUBMIT, qid });
  jobfieldsRef.child(qid).set(jobfield, (error) => {
    dispatch({ type: C.JOBFIELD_EDIT_FINISH, qid });
    if (error) {
      dispatch({
        type: C_feedback.FEEDBACK_DISPLAY_ERROR,
        error: `JobField update failed! ${error}`,
      });
    } else {
      dispatch({
        type: C_feedback.FEEDBACK_DISPLAY_MESSAGE,
        message: 'JobField successfully updated!',
      });
    }
  });
};

export const deleteJobField = qid => (dispatch) => {
  dispatch({ type: C.JOBFIELD_EDIT_SUBMIT, qid });
  jobfieldsRef.child(qid).remove((error) => {
    dispatch({ type: C.JOBFIELD_EDIT_FINISH, qid });
    if (error) {
      dispatch({
        type: C_feedback.FEEDBACK_DISPLAY_ERROR,
        error: `JobField deletion failed! ${error}`,
      });
    } else {
      dispatch({
        type: C_feedback.FEEDBACK_DISPLAY_MESSAGE,
        message: 'JobField successfully deleted!',
      });
    }
  });
};
