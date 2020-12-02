import { combineReducers } from 'redux';

const populateCurrentJobSubcontractors = (state = [], action) => {
  switch (action.type) {
    case 'POPULATE_CURRENT_JOB':
      console.log(action.payload);
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  populateCurrentJobSubcontractors,
});
