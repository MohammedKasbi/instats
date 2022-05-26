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
    case 'CHANGE_VALUE':
      return {
        ...state,
        [action.key]: action.value
      };
    case 'DEFAULT_VALUES_TRANSACTION':
      return {
        ...state,
        newDayResult: action.newDayResult,
        newDeposit: action.newDeposit,
        newWithdrawal: action.newWithdrawal,
        newDate: action.newDate,
      };
    default:
      return state;
  }
};

export default reducer;
