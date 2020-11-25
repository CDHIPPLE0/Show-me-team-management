import { combineReducers } from 'redux';

const populateJobs = (state = [], action) => {
  switch (action.type) {
    case 'POPULATE_JOBS':
      console.log(action.payload);
      return action.payload[0].array;
    default:
      return state;
  }
};

export default combineReducers({
  populateJobs,
});
