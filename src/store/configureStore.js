import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import initialState from './initialState';
import pagesReducer from '../reducers/pages';
import contractInfoReducer from '../reducers/contractInfo';
import USstatesReducer from '../reducers/USstates';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      pages: pagesReducer,
      contractInfo: contractInfoReducer,
      USstates: USstatesReducer
    }),
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
