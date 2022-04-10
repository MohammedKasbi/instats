// == Imports : npm
import { combineReducers } from 'redux';

// == Imports : local
import accountReducer from './account';
import accountsReducer from './accounts';
import walletReducer from './wallet';
import addAccountReducer from './add-account';
import addTransactionReducer from './add-transaction';

// == Reducer
const rootReducer = combineReducers({
  accounts: accountsReducer,
  wallet: walletReducer,
  addTransaction: addTransactionReducer,
  account: accountReducer,
  addAccount: addAccountReducer,
});

// == Export
export default rootReducer;
