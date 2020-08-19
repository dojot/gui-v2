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
    const buttonMenu = getByTestId('buttonMenu');

    act(() => {
      fireEvent.click(buttonMenu);
    });

    const version = getByTestId('version');
    const profile = getByTestId('profile');
    const tenant = getByTestId('tenant');

    expect(version).toBeInTheDocument();
    expect(profile).toBeInTheDocument();
    expect(tenant).toBeInTheDocument();
  });
});
