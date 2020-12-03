const userDetails = (state = [], action) => {
  switch (action.type) {
    case 'GET_DETAILS':
      console.log(action.payload);
      return action.payload;
    default:
      return state;
  }
};

export default userDetails;
