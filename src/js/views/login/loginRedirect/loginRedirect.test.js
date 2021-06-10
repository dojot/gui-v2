import React from 'react';

import { mount } from 'enzyme';

import LoginRedirect from './loginRedirect';

jest.mock('react-router-dom', () => {
  return {
    Redirect: jest.fn(options => {
      return <div>{options.to.pathname}</div>;
    }),
  };
});

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: key => key,
  }),
}));

describe('Login', () => {
  const DEFAULT_TENANT = 'test';

  it('shoud be show characters minimum message', async () => {
    const wrapper = mount(<LoginRedirect />);
    wrapper.find('input[name="tenant"]').simulate('change', { target: { value: DEFAULT_TENANT } });
    expect(wrapper.find('input[name="tenant"]').props().value).toEqual(DEFAULT_TENANT);
  });
});
