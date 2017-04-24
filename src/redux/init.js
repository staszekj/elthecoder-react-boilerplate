import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import React from 'react';
import reducers from 'elRedux';

const store = createStore(reducers, {}, applyMiddleware(thunk));
const initRedux = () => {
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('elRedux', () => {
      const nextRootReducer = reducers;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default initRedux;