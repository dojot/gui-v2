import React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from 'enzyme';
import { mergeDeepRight } from 'ramda';
import { Provider } from 'react-redux';

import { history } from '../../app-history';
import configureStore from '../../redux/configureStore';
import rootReducer from '../../redux/rootReducers';

export const makeMountRender = (Component, defaultProps = {}) => {
  return (customProps = {}) => {
    const props = {
      ...defaultProps,
      ...customProps,
    };
    return mount(<Component {...props} />);
  };
};

export const makeStore = (customState = {}) => {
  const root = rootReducer({}, { type: '@@INIT' });
  const state = mergeDeepRight(root, customState);

  return configureStore(state, history);
};

export const reduxify = (Component, props = {}, state = {}) => {
  return function reduxWrap() {
    return (
      <Provider store={makeStore(state)}>
        <Component {...props} />
      </Provider>
    );
  };
};

export const snapshotify = reactWrapper => {
  return reactWrapper.html();
};
