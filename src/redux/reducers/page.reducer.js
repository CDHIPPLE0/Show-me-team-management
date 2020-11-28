const pageReducer = (state = {}, action) => {
  switch (action.type) {
    case 'IN_USER':
      return 1;
    case 'LEAVING_USER':
      return 0;
    default:
      return state;
  }
};

export default pageReducer;
