import C from '../constants/jobs';
import C_feedback from '../constants/feedback';
import { database } from '../firebaseApp';

const jobsRef = database.ref('jobs').limitToLast(15);
const jobsSearchRef = database.ref('jobs').limitToLast(10);;
         
export const listenToJobs = () => dispatch =>
  jobsRef.on(
    'value',
    snapshot =>
      dispatch({
        type: C.JOBS_RECEIVE_DATA,
        data: Object.keys(snapshot.val()).map(key => ({ title: snapshot.val()[key].content.position, location: snapshot.val()[key].content.location, company: snapshot.val()[key].content.company })),
      }),
    error =>
      dispatch({
        type: C.JOBS_RECEIVE_DATA_ERROR,
        message: error.message,
      }),
  );
  export const submitSearch = content => (dispatch, getState) => {
    const state = getState();
    const searchParams = {
      content,
      username: state.auth.username,
      uid: state.auth.uid,
    };
   
    var tree='content/'
    jobsSearchRef.orderByChild(tree+content.selectedcategory).equalTo(content.valueSearch).on(
        'value',
      snapshot =>
      dispatch({
          type: C.SEARCH_RECEIVE_DATA,//data1
          dataSearch: Object.keys(snapshot.val()).map(key => ({ title: snapshot.val()[key].content.position, location: snapshot.val()[key].content.location, company: snapshot.val()[key].content.company })),
        }),
      error =>
        dispatch({
          type: C.SEARCH_RECEIVE_DATA_ERROR,
          message: error.message,
        }),
    );
  };

export const submitJob = content => (dispatch, getState) => {
  const state = getState();
  const job = {
    content,
    username: state.auth.username,
    uid: state.auth.uid,
  };
  dispatch({ type: C.JOB_AWAIT_CREATION_RESPONSE });
  jobsRef.push(job, (error) => {
    dispatch({ type: C.JOB_RECEIVE_CREATION_RESPONSE });
    if (error) {
      dispatch({
        type: C_feedback.FEEDBACK_DISPLAY_ERROR,
        error: `Job submission failed! ${error}`,
      });
    } else {
      dispatch({
        type: C_feedback.FEEDBACK_DISPLAY_MESSAGE,
        message: 'Job successfully saved!',
      });
    }
  });
};

export const startJobEdit = qid => dispatch =>
  dispatch({ type: C.JOB_EDIT, qid });

export const cancelJobEdit = qid => dispatch =>
  dispatch({ type: C.JOB_EDIT_FINISH, qid });

export const submitJobEdit = (qid, content) => (dispatch, getState) => {
  const state = getState();
  const job = {
    content,
    username: state.auth.username,
    uid: state.auth.uid,
  };
  dispatch({ type: C.JOB_EDIT_SUBMIT, qid });
  jobsRef.child(qid).set(job, (error) => {
    dispatch({ type: C.JOB_EDIT_FINISH, qid });
    if (error) {
      dispatch({
        type: C_feedback.FEEDBACK_DISPLAY_ERROR,
        error: `Job update failed! ${error}`,
      });
    } else {
      dispatch({
        type: C_feedback.FEEDBACK_DISPLAY_MESSAGE,
        message: 'Job successfully updated!',
      });
    }
  });
};

export const deleteJob = qid => (dispatch) => {
  dispatch({ type: C.JOB_EDIT_SUBMIT, qid });
  jobsRef.child(qid).remove((error) => {
    dispatch({ type: C.JOB_EDIT_FINISH, qid });
    if (error) {
      dispatch({
        type: C_feedback.FEEDBACK_DISPLAY_ERROR,
        error: `Job deletion failed! ${error}`,
      });
    } else {
      dispatch({
        type: C_feedback.FEEDBACK_DISPLAY_MESSAGE,
        message: 'Job successfully deleted!',
      });
    }
  });
};
