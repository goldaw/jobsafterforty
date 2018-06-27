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
    case C.JOBFIELDS_RECEIVE_DATA:
      return {
        ...state,
        hasReceivedData: true,
        data: action.data,
        errorMessage: '',
      };
    case C.JOBFIELDS_RECEIVE_DATA_ERROR:
      return {
        ...state,
        data: null,
        errorMessage: action.message,
      };
    case C.JOBFIELD_AWAIT_CREATION_RESPONSE:
      return {
        ...state,
        submittingNew: true,
      };
    case C.JOBFIELD_RECEIVE_CREATION_RESPONSE:
      return {
        ...state,
        submittingNew: false,
      };
    case C.JOBFIELD_EDIT:
      newState = { ...state };
      newState.status[action.qid] = C.JOBFIELD_EDITING;
      return newState;
    case C.JOBFIELD_EDIT_FINISH:
      newState = { ...state };
      delete newState.status[action.qid];
      return newState;
    case C.JOBFIELD_EDIT_SUBMIT:
      newState = { ...state };
      newState.status[action.qid] = C.JOBFIELD_SUBMITTING;
      return newState;
    default:
      return state || initialState;
  }
};
