const initialState = {
  loading: true,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'SATA':
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
