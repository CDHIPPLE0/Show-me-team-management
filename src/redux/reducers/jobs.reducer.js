import { combineReducers } from 'redux';

const populateJobs = (state = [], action) => {
  switch (action.type) {
    case 'POPULATE_JOBS':
      return action.payload;
    default:
      return state;
  }
};

const getDetailJob = (state = [], action) => {
  switch (action.type) {
    case 'GET_THIS_JOB':
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  populateJobs,
  getDetailJob,
});
