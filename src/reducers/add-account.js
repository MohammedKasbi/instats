const initialState = {
  loading: true,
  newAccountValue: '',
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'CHANGE_NEW_ACCOUNT_VALUE':
      return {
        ...state,
        newAccountValue: action.value
      };
    case 'NEW_ACCOUNT_ADDED':
      return {
        ...state,
        newAccountValue: '',
      }
    default:
      return state;
  }
};

export default reducer;
