import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Login from './View';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: key => key,
  }),
}));

describe('Login', () => {
  let mount;

  const user = 'user';
  const password = 'ps';
  it('shoud be able to simple render', () => {
    const { container, debug } = render(<Login />);
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
