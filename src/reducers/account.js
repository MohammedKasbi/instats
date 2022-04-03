const initialState = {
  loading: true,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'SAVE_ACCOUNT':
      return {
        ...state,
        loading: false,
        accountData: action.account
      };
    default:
      return state;
  }
};

export default reducer;
