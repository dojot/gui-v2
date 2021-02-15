import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './rootReducers';
import sagas from './sagas';

// Redux DevTools Extension for Chrome and Firefox
const reduxDevTool = () => {
  return typeof window === 'object' && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f;
};

// history is passed here, for this example, we don't use history
// eslint-disable-next-line no-unused-vars
export default function configureStore(initialState, history) {
  // eslint-disable-line no-unused-vars, max-len
  const sagaMiddleware = createSagaMiddleware();

  const middleware = applyMiddleware(sagaMiddleware);

  const composedStoreEnhancer = compose(middleware, reduxDevTool());

  const store = composedStoreEnhancer(createStore)(rootReducer, initialState);

  sagaMiddleware.run(sagas);

  if (module.hot) {
    module.hot.accept('./rootReducers', () => {
      store.replaceReducer(require('./rootReducers'));
    });
  }

  return store;
}
