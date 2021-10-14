import React from 'react';

import { render, act, fireEvent } from '@testing-library/react';

import * as auth from '../../../common/utils/module/auth';
import { UserInfo } from './index';

jest.spyOn(auth, 'getUserInformation').mockReturnValueOnce({
  userName: 'user',
  tenant: 'tenant',
  profile: 'profile',
});

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: key => key,
  }),
}));

describe('UserInfo', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be able to simple render', () => {
    const { container } = render(<UserInfo />);
    expect(container).toBeInTheDocument();
  });

  it('should be able to open menu when button menu is clicked', () => {
    const { getByTestId } = render(<UserInfo />);
    const menuButton = getByTestId('menuButton');

    act(() => {
      fireEvent.click(menuButton);
    });

    const tenant = getByTestId('tenant');
    const version = getByTestId('version');
    const darkMode = getByTestId('darkMode');
    const changePassword = getByTestId('changePassword');
    const logout = getByTestId('logout');

    expect(tenant).toBeInTheDocument();
    expect(version).toBeInTheDocument();
    expect(darkMode).toBeInTheDocument();
    expect(changePassword).toBeInTheDocument();
    expect(logout).toBeInTheDocument();
  });
});
