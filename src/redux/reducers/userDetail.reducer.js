const userDetails = (state = [], action) => {
  console.log('in userDetails with:', action.payload);
  switch (action.type) {
    case 'GET_DETAILS':
      console.log('in details', action.payload);
      return action.payload;
    default:
      return state;
  }
};

export default userDetails;
