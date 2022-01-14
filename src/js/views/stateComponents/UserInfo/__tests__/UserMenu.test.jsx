import React from 'react';

import { render, act, fireEvent } from '@testing-library/react';

import UserMenu from '../UserMenu';

describe('UserMenu', () => {
  beforeEach(() => {
    jest.useFakeTimers(); // Disable Material UI Popper Warning
  });

  it('should render', () => {
    const { container, getByText } = render(
      <UserMenu
        tenant='tenant'
        version='version'
        handleChangeTheme={jest.fn()}
        handleChangePassword={jest.fn()}
        handleShowLogoutModal={jest.fn()}
        handleClickAwayUserMenu={jest.fn()}
        isShowingUserMenu
      />,
    );

    jest.runAllTimers(); // Run all timers after rendering the Popper

    expect(container).toBeInTheDocument();
    expect(getByText('tenant')).toBeVisible();
    expect(getByText('version')).toBeVisible();
  });

  it('should show nothing because the user menu is hidden', () => {
    const { getByText } = render(
      <UserMenu
        tenant='tenant'
        version='version'
        handleChangeTheme={jest.fn()}
        handleChangePassword={jest.fn()}
        handleShowLogoutModal={jest.fn()}
        handleClickAwayUserMenu={jest.fn()}
      />,
    );

    jest.runAllTimers(); // Run all timers after rendering the Popper

    expect(() => getByText('tenant')).toThrow();
    expect(() => getByText('version')).toThrow();
  });

  it('should call the click away function', () => {
    const handleClickAwayUserMenu = jest.fn();

    const { getByText } = render(
      <div>
        <div>Click Me</div>
        <UserMenu
          tenant='tenant'
          version='version'
          handleChangeTheme={jest.fn()}
          handleChangePassword={jest.fn()}
          handleShowLogoutModal={jest.fn()}
          handleClickAwayUserMenu={handleClickAwayUserMenu}
          isShowingUserMenu
        />
      </div>,
    );

    jest.runAllTimers(); // Run all timers after rendering the Popper

    act(() => {
      fireEvent.click(getByText('Click Me'));
    });

    expect(handleClickAwayUserMenu).toBeCalledTimes(1);
  });

  it('should call the function to show the logout modal', () => {
    const handleShowLogoutModal = jest.fn();

    const { getByTestId } = render(
      <UserMenu
        tenant='tenant'
        version='version'
        handleChangeTheme={jest.fn()}
        handleChangePassword={jest.fn()}
        handleShowLogoutModal={handleShowLogoutModal}
        handleClickAwayUserMenu={jest.fn()}
        isShowingUserMenu
      />,
    );

    jest.runAllTimers(); // Run all timers after rendering the Popper

    act(() => {
      fireEvent.click(getByTestId('logout'));
    });

    expect(handleShowLogoutModal).toBeCalledTimes(1);
  });

  it('should call the function to change the theme', () => {
    const handleChangeTheme = jest.fn();

    const { getByRole } = render(
      <UserMenu
        tenant='tenant'
        version='version'
        handleChangeTheme={handleChangeTheme}
        handleChangePassword={jest.fn()}
        handleShowLogoutModal={jest.fn()}
        handleClickAwayUserMenu={jest.fn()}
        isShowingUserMenu
      />,
    );

    jest.runAllTimers(); // Run all timers after rendering the Popper

    act(() => {
      fireEvent.click(getByRole('checkbox'));
    });

    expect(handleChangeTheme).toBeCalledTimes(1);
  });
});
