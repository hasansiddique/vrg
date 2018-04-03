import thunkMiddleware from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import {createEpicMiddleware} from 'redux-observable';

import rootEpic from './rootEpic';
import rootReducer from './rootReducer';

const epicMiddleware = createEpicMiddleware(rootEpic);

let middleware = [thunkMiddleware, epicMiddleware];

if (process.env.NODE_ENV !== 'production') {
  let loggerMiddleware = require('redux-logger');
  // middleware = [...middleware, loggerMiddleware.createLogger()];
}

const configureStore = (predefinedState) => {
  return createStore(
    rootReducer,
    predefinedState,
    applyMiddleware(...middleware)
  );
};

export default configureStore;
