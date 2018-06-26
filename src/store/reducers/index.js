import { combineReducers } from 'redux';
import jobs from './jobs';
import auth from './auth';
import feedback from './feedback';
import leftmenu from './leftmenu';
import regions from './regions';

const rootReducer = combineReducers({
  jobs,
  auth,
  feedback,
  leftmenu,
  regions,
});

export default rootReducer;
