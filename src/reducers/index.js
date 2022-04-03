import { combineReducers } from 'redux';

import dashboardReducer from './dashboard';
import walletReducer from './wallet';
import addTransactionReducer from './add-transaction';
import historyReducer from './history';
import accountReducer from './account';
import addAccountReducer from './add-account';
import accountsDataReducer from './accountsData';

const rootReducer = combineReducers({
  accountsData: accountsDataReducer,
  dashboard: dashboardReducer,
  wallet: walletReducer,
  addTransaction: addTransactionReducer,
  history: historyReducer,
  account: accountReducer,
  addAccount: addAccountReducer,
});

export default rootReducer;