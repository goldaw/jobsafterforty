import { combineReducers } from 'redux';
import jobs from './jobs';
import auth from './auth';
import feedback from './feedback';
import leftmenu from './leftmenu';

const rootReducer = combineReducers({
  jobs,
  auth,
  feedback,
  leftmenu,
});

export default rootReducer;
