import C from '../../constants';

const initialState = {
  hasReceivedData: false,
  submittingNew: false,
  errorMessage: '',
  data: {},
  status: {},
};

export default (state, action) => {
  let newState;
  switch (action.type) {
    case C.JOBS_RECEIVE_DATA:
      return {
        ...state,
        hasReceivedData: true,
        data: action.data,
        errorMessage: '',
      };
    case C.JOBS_RECEIVE_DATA_ERROR:
      return {
        ...state,
        data: null,
        errorMessage: action.message,
      };
    case C.JOB_AWAIT_CREATION_RESPONSE:
      return {
        ...state,
        submittingNew: true,
      };
    case C.JOB_RECEIVE_CREATION_RESPONSE:
      return {
        ...state,
        submittingNew: false,
      };
    case C.JOB_EDIT:
      newState = { ...state };
      newState.status[action.qid] = C.JOB_EDITING;
      return newState;
    case C.JOB_EDIT_FINISH:
      newState = { ...state };
      delete newState.status[action.qid];
      return newState;
    case C.JOB_EDIT_SUBMIT:
      newState = { ...state };
      newState.status[action.qid] = C.JOB_SUBMITTING;
      return newState;
    default:
      return state || initialState;
  }
};
