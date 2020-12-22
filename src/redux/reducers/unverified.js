const unverified = (state = [], action) => {
  console.log('in unverified with:', action.payload);
  switch (action.type) {
    case 'GET_UNVERIFIED':
      console.log('in details', action.payload);
      return action.payload;
    default:
      return state;
  }
};

export default unverified;
