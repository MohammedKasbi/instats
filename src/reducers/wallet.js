const initialState = {
  loading: true,
  accountsNames: ['FIN888', 'EmpireX', 'Gold Robot', 'TTD', 'UAG Trade', 'Whalinvest'],
  capitals: [3000, 2500, 2000, 1500, 1000, 500],
  accountsData: [
    {
      id: 1,
      image: '',
      name: 'Compte A',
      capital: 3000,
      percent: 10.58,
      percentConverted: 511.95,
    },
    {
      id: 2,
      image: '',
      name: 'Compte B',
      capital: 2500,
      percent: 1.5,
      percentConverted: 51.5,
    },
    {
      id: 3,
      image: '',
      name: 'Compte C',
      capital: 2000,
      percent: 15.85,
      percentConverted: 71.5,
    },
  ],
  accountValue: 45850.25,
  accountValueConverted: 40850.25,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'WALLET':
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
