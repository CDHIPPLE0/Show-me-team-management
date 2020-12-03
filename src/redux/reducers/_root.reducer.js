import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import jobs from './jobs.reducer';
import userJob from './userJob.reducer';
import Subcontractors from './subcontractor.reducer';
import userDetails from './userDetail.reducer';

const rootReducer = combineReducers({
  errors,
  user,
  jobs,
  userJob,
  Subcontractors,
  userDetails,
});

export default rootReducer;
