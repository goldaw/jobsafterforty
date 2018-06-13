import C from '../../constants';

const initialState = {
  hasReceivedData: false,
  hasReceivedData1: false,
  submittingNew: false,
  errorMessage: '',
  data: {},
  dataSearch:{},
  status: {},
};

export default (state, action) => {
  let newState;
  switch (action.type) {
    case C.JOBS_RECEIVE_DATA:
      return {
        ...state,
        hasReceivedData: true,
        data: action.data,//data: action.dataSearch,
        errorMessage: '',
      };
      case C.SEARCH_RECEIVE_DATA:
      return {
        ...state,
        hasReceivedData1: true,
        dataSearch: action.dataSearch,
        errorMessage: '',
      };
    case C.JOBS_RECEIVE_DATA_ERROR:
      return {
        ...state,
        data: null,
        errorMessage: action.message,
      };
      case C.SEARCH_RECEIVE_DATA_ERROR:
      return {
        ...state,
        dataSearch: null,
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
