import C from '../../constants';

const initialState = {
  hasReceivedData: false,
  submittingNew: false,
  errorMessage: '',
  data: {},
  status: {},
  checkedScopesArrId:{},
  checkedScopesArrName:{},
};

export default (state, action) => {
  let newState;
  switch (action.type) {
    case C.SCOPES_RECEIVE_DATA:
      return {
        ...state,
        hasReceivedData: true,
        data: action.data,
        errorMessage: '',
      };
    case C.SCOPES_RECEIVE_DATA_ERROR:
      return {
        ...state,
        data: null,
        errorMessage: action.message,
      };
    case C.SCOPE_AWAIT_CREATION_RESPONSE:
      return {
        ...state,
        submittingNew: true,
      };
    case C.SCOPE_RECEIVE_CREATION_RESPONSE:
      return {
        ...state,
        submittingNew: false,
      };
    case C.SCOPE_EDIT:
      newState = { ...state };
      newState.status[action.qid] = C.SCOPE_EDITING;
      return newState;
    case C.SCOPE_EDIT_FINISH:
      newState = { ...state };
      delete newState.status[action.qid];
      return newState;
    case C.SCOPE_EDIT_SUBMIT:
      newState = { ...state };
      newState.status[action.qid] = C.SCOPE_SUBMITTING;
      return newState;
    case C.SCOPE_CHOOSESCOPE:
      return{
        ...state,
        checkedScopesArrId:action.checkedScopesArrId,
        checkedScopesArrName:action.checkedScopesArrName,
      }  
    default:
      return state || initialState;
  }
};
