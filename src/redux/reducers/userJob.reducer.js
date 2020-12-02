import { combineReducers } from 'redux';

const populateCurrentJobSubcontractors = (state = [], action) => {
  switch (action.type) {
    case 'POPULATE_CURRENT_JOB':
      console.log(action.payload);
      return action.payload[0];
    default:
      return state;
  }
};

export default combineReducers({
  populateCurrentJobSubcontractors,
});
