const initialState = {
  loading: true,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'SAVE_ACCOUNTS_LIST':
      return {
        ...state,
        loading: false,
        accountsList: action.accountsList,
      };
    default:
      return state;
  }
};

export default reducer;
