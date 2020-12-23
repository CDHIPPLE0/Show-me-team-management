const unverified = (state = [], action) => {
  switch (action.type) {
    case 'GET_UNVERIFIED':
      return action.payload;
    default:
      return state;
  }
};

export default unverified;
