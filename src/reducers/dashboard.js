const initialState = {
  loading: true,
  dates: ['lun', 'mar', 'mer', 'jeu', 'ven', 'sam', 'dim'],
  dailyGains: [3, 20, 5.27, 12, 15, 16, 20],
  accountValue: 41550.25,
  accountValueConverted: 40850.25,
  accountPercent: 20.25,
  accountPercentConverted: 54.23,
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
