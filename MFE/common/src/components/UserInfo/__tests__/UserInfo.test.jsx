import React from 'react';

import { render, act, fireEvent } from '@testing-library/react';

import * as auth from '../../../../common/utils/module/auth';
import { UserInfo } from '../index';

jest.spyOn(auth, 'getUserInformation').mockReturnValue({
  userName: 'user',
  tenant: 'tenant',
  profile: 'profile',
});

describe('UserInfo', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers(); // Disable Material UI Popper Warning
  });

  it('should render', () => {
    const { container } = render(<UserInfo />);
    jest.runAllTimers(); // Run all timers after rendering the Popper
    expect(container).toBeInTheDocument();
  });

  it('should open the user menu when click the button', () => {
    const { getByTestId } = render(<UserInfo />);

    const menuButton = getByTestId('menuButton');

    act(() => {
      fireEvent.click(menuButton);
    });

    jest.runAllTimers(); // Run all timers after rendering the Popper

    const tenant = getByTestId('tenant');
    const version = getByTestId('version');
    const darkMode = getByTestId('darkMode');
    const logout = getByTestId('logout');

    expect(tenant).toBeVisible();
    expect(version).toBeVisible();
    expect(darkMode).toBeVisible();
    expect(logout).toBeVisible();
  });

  it('should open the languages menu when click the button', () => {
    const { getByTestId } = render(<UserInfo />);

    const switchLanguageButton = getByTestId('switchLanguageButton');

    act(() => {
      fireEvent.click(switchLanguageButton);
    });

    jest.runAllTimers(); // Run all timers after rendering the Popper

    const englishItem = getByTestId('language-item-en');
    expect(englishItem).toBeVisible();
  });
});
