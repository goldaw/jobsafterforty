import C from '../../constants';

const initialState = {
  hasReceivedData: false,
  submittingNew: false,
  errorMessage: '',
  selectRegion:'',
  selectRegionName:'',
  data: {},
  status: {},
};

export default (state, action) => {
  let newState;
  switch (action.type) {
    case C.REGIONS_RECEIVE_DATA:
      return {
        ...state,
        hasReceivedData: true,
        data: action.data,
        errorMessage: '',
      };
    case C.REGIONS_RECEIVE_DATA_ERROR:
      return {
        ...state,
        data: null,
        errorMessage: action.message,
      };
    case C.REGION_AWAIT_CREATION_RESPONSE:
      return {
        ...state,
        submittingNew: true,
      };
    case C.REGION_RECEIVE_CREATION_RESPONSE:
      return {
        ...state,
        submittingNew: false,
      };
    case C.REGION_EDIT:
      newState = { ...state };
      newState.status[action.qid] = C.REGION_EDITING;
      return newState;
    case C.REGION_EDIT_FINISH:
      newState = { ...state };
      delete newState.status[action.qid];
      return newState;
    case C.REGION_EDIT_SUBMIT:
      newState = { ...state };
      newState.status[action.qid] = C.REGION_SUBMITTING;
      return newState;
    case C.CHOOSE_EREGION:
    return{
      ...state,
      selectRegion:action.selectRegion,
      selectRegionName:action.selectRegionName,
    };
    default:
      return state || initialState;
  }
};
