import { combineReducers } from 'redux';

import dashboardReducer from './dashboard';
import walletReducer from './wallet';
import addTransactionReducer from './add-transaction';

const rootReducer = combineReducers({
  dashboard: dashboardReducer,
  wallet: walletReducer,
  addTransaction: addTransactionReducer,
});

export default rootReducer;