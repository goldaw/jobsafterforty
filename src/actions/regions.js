import C from '../constants/regions';
import C_feedback from '../constants/feedback';
import { database } from '../firebaseApp';

const regionsRef = database.ref('regions');

export const listenToRegions = () => dispatch =>
  regionsRef.on(
    'value',
    snapshot =>
      dispatch({
        type: C.REGIONS_RECEIVE_DATA,
        data: Object.keys(snapshot.val()).map(key => ({ name: snapshot.val()[key].content.name, uid: key })),
      }),
    error =>
      dispatch({
        type: C.REGIONS_RECEIVE_DATA_ERROR,
        message: error.message,
      }),
  );

export const submitRegion = content => (dispatch, getState) => {
  const state = getState();
  const region = {
    content,
    username: state.auth.username,
    uid: state.auth.uid,
  };
  dispatch({ type: C.REGION_AWAIT_CREATION_RESPONSE });
  regionsRef.push(region, (error) => {
    dispatch({ type: C.REGION_RECEIVE_CREATION_RESPONSE });
    if (error) {
      dispatch({
        type: C_feedback.FEEDBACK_DISPLAY_ERROR,
        error: `Region submission failed! ${error}`,
      });
    } else {
      dispatch({
        type: C_feedback.FEEDBACK_DISPLAY_MESSAGE,
        message: 'Region successfully saved!',
      });
    }
  });
};


export const chooseRegion = (checkedRegionsArrId,checkedRegionsArrName) => dispatch =>
  dispatch({type:C.CHOOSE_EREGION,checkedRegionsArrId,checkedRegionsArrName});


export const startRegionEdit = qid => dispatch =>
  dispatch({ type: C.REGION_EDIT, qid });

export const cancelRegionEdit = qid => dispatch =>
  dispatch({ type: C.REGION_EDIT_FINISH, qid });

export const submitRegionEdit = (qid, content) => (dispatch, getState) => {
  const state = getState();
  const region = {
    content,
    username: state.auth.username,
    uid: state.auth.uid,
  };
  dispatch({ type: C.REGION_EDIT_SUBMIT, qid });
  regionsRef.child(qid).set(region, (error) => {
    dispatch({ type: C.REGION_EDIT_FINISH, qid });
    if (error) {
      dispatch({
        type: C_feedback.FEEDBACK_DISPLAY_ERROR,
        error: `Region update failed! ${error}`,
      });
    } else {
      dispatch({
        type: C_feedback.FEEDBACK_DISPLAY_MESSAGE,
        message: 'Region successfully updated!',
      });
    }
  });
};

export const deleteRegion = qid => (dispatch) => {
  dispatch({ type: C.REGION_EDIT_SUBMIT, qid });
  regionsRef.child(qid).remove((error) => {
    dispatch({ type: C.REGION_EDIT_FINISH, qid });
    if (error) {
      dispatch({
        type: C_feedback.FEEDBACK_DISPLAY_ERROR,
        error: `Region deletion failed! ${error}`,
      });
    } else {
      dispatch({
        type: C_feedback.FEEDBACK_DISPLAY_MESSAGE,
        message: 'Region successfully deleted!',
      });
    }
  });
};
