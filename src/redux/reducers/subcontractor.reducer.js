import { combineReducers } from 'redux';

const availableSubcontractors = (state = {}, action) => {
  switch (action.type) {
    case 'AVAILABLE_SUBCONTRACTORS':
      return action.payload;
    default:
      return state;
  }
};

const allSubcontractors = (state = [], action) => {
  switch (action.type) {
    case 'POPULATE_SUBCONTRACTORS':
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  availableSubcontractors,
  allSubcontractors,
});
