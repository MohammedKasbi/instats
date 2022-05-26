const initialState = {
  loading: true,
  newType: 'gain',
  newAccount: '',
  newDate: '',
  newAmount: '',
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'CHANGE_TYPE_VALUE':
      return {
        ...state,
        newType: action.newType,
      };
    case 'CHANGE_ACCOUNT_VALUE':
      return {
        ...state,
        newAccount: action.newAccount,
      };
    case 'CHANGE_DATE':
      return {
        ...state,
        newDate: action.newDate,
      }
    case 'CHANGE_AMOUNT_VALUE':
      return {
        ...state,
        newAmount: action.newAmount,
      };
    case 'CANCEL_VALUES':
      return {
        ...state,
        newType: 'gain',
        newAccount: '',
        newDate: '',
        newAmount: '',
      }
    default:
      return state;
  }
}

export default reducer;
