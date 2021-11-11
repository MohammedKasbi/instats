import { applyMiddleware, compose, createStore } from 'redux';

import ajax from '../middlewares/ajax';
import reducer from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
  applyMiddleware(ajax),
);

const store = createStore(reducer, enhancers);

export default store;
