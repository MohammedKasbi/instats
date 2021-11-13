import { combineReducers } from 'redux';

import dashboardReducer from './dashboard';
import walletReducer from './wallet';

const rootReducer = combineReducers({
  dashboard: dashboardReducer,
  wallet: walletReducer,
});

export default rootReducer;