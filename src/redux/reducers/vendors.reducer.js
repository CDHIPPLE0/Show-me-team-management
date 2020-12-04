const allVendors = (state = {}, action) => {
  switch (action.type) {
    case 'ALL_VENDORS':
      return action.payload;
    default:
      return state;
  }
};

export default allVendors;
