import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import initialState from './initialState';
import pagesReducer from '../reducers/pages';
import invoiceInfoReducer from '../reducers/invoiceInfo';
import USstatesReducer from '../reducers/USstates';
import FeeTypesReducer from '../reducers/FeeTypes';
import colorReducer from '../reducers/FeeTypes';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      pages: pagesReducer,
      invoiceInfo: invoiceInfoReducer,
      USstates: USstatesReducer,
      FeeTypes: FeeTypesReducer,
      Colors: colorReducer
    }),
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
