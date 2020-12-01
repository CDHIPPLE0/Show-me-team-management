const availableSubcontractors = (state = {}, action) => {
  switch (action.type) {
    case 'AVAILABLE_SUBCONTRACTORS':
      return action.payload;
    default:
      return state;
  }
};

export default availableSubcontractors;
