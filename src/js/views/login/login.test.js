import React from 'react';

import Alert from '@material-ui/lab/Alert';
import { render, fireEvent, act } from '@testing-library/react';
import * as api from 'APIs/index';
import { mount } from 'enzyme';
import { Authentication } from 'Services';

import Login, { LoginForm } from './View';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: key => key,
  }),
}));

const updateFormikField = async (nativeFieldWrapper, targetName, value) => {
  await act(async () => {
    nativeFieldWrapper.simulate('change', {
      target: { name: targetName, value },
    });
  });
  await act(async () => {
    nativeFieldWrapper.simulate('blur', { target: { name: targetName } });
  });
};

const submitFormikForm = async nativeFormWrapper => {
  await act(async () => {
    nativeFormWrapper.simulate('submit', { preventDefault: () => {} });
  });
};

describe('Login', () => {
  const password = 'ps';

  it('shoud be able to simple render error', async () => {
    jest.spyOn(api, 'unprotectedAPI').mockImplementationOnce(() => ({
      login: null,
    }));

    const wrapper = mount(<Login />);

    const userField = wrapper.find('input[name="user"]').first();
    await updateFormikField(userField, 'user', 'user123456');

    const passwordField = wrapper.find('input[name="password"]').first();
    await updateFormikField(passwordField, 'password', 'password123456');

    const htmlForm = wrapper.find('form');

    await submitFormikForm(htmlForm);
    wrapper.update();
    expect(wrapper.find(LoginForm).find(Alert)).toHaveLength(1);
  });

  it('shoud be able to simple render Network error', async () => {
    jest.spyOn(Authentication, 'login').mockImplementationOnce(() => {
      throw new Error('404');
    });

    const wrapper = mount(<Login />);

    const userField = wrapper.find('input[name="user"]').first();
    await updateFormikField(userField, 'user', 'user123456');

    const passwordField = wrapper.find('input[name="password"]').first();
    await updateFormikField(passwordField, 'password', 'password123456');

    const htmlForm = wrapper.find('form');

    await submitFormikForm(htmlForm);

    wrapper.update();
    expect(wrapper.find(LoginForm).find(Alert).at(0).text()).toEqual(
      'login:networkError',
    );
  });

  it('shoud be able to simple render Login Error', async () => {
    jest.spyOn(Authentication, 'login').mockImplementationOnce(() => {
      throw new Error('Erro ao efetuar login');
    });

    const wrapper = mount(<Login />);

    const userField = wrapper.find('input[name="user"]').first();
    await updateFormikField(userField, 'user', 'user123456');

    const passwordField = wrapper.find('input[name="password"]').first();
    await updateFormikField(passwordField, 'password', 'password123456');

    const htmlForm = wrapper.find('form');

    await submitFormikForm(htmlForm);

    wrapper.update();
    expect(wrapper.find(LoginForm).find(Alert).at(0).text()).toEqual(
      'login:loginError',
    );
  });

  it('shoud be able to simple render', () => {
    const { container } = render(<Login />);
    expect(container).toBeInTheDocument();
  });

  it('user field should return 1', () => {
    const { getByTestId } = render(<Login />);
    fireEvent.change(getByTestId('userTest'), { target: { value: '1' } });
    expect(getByTestId('userTest')).toHaveValue('1');
  });

  it('password field should return ps', () => {
    const { getByTestId } = render(<Login />);
    fireEvent.change(getByTestId('passwordTest'), {
      target: { value: password },
    });
    expect(getByTestId('passwordTest')).toHaveValue('ps');
  });
});
