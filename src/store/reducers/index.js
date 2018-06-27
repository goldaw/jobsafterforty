import { combineReducers } from 'redux';
import jobs from './jobs';
import auth from './auth';
import feedback from './feedback';
import leftmenu from './leftmenu';
import regions from './regions';
import jobfields from './jobfields';

const rootReducer = combineReducers({
  jobs,
  auth,
  feedback,
  leftmenu,
  regions,
  jobfields,
});

export default rootReducer;
