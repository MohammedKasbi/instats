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
    // case 'SAVE_HISTORY_ACCOUNT_VALUES':
    //   return {
    //     ...state,
    //     loading: false,
    //     dates: action.dates,
    //     values: action.values,
    //   };
    default:
      return state;
  }
};

export default reducer;
