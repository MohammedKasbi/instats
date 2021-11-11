const initialState = {
  loading: true,
  dates: ['31/10', '01/11', '02/11', '03/11', '04/11', '05/11', '06/11', '07/11', '08/11', '09/11',],
  dailyGains: [3, 20, 5.27, 12, 15, 16, 20, 19, 22, 27],
  accountValue: 45850.25,
  accountValueConverted: 40850.25,
  accountPercent: 10.89,
  accountPercentConverted: 516.52,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'SAVE_DASHBOARD_DATA':
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
