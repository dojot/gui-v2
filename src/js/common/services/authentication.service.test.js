import * as api from 'APIs';
import * as authenticationActions from 'Utils/module/auth';

import * as authenticationService from './authentication.service';

describe('authentication.service', () => {
  it('should be able to get a user data', async () => {
    jest.spyOn(api, 'restAPI').mockImplementationOnce(() => ({
      tenant: 'admin',
      username: 'user_test',
      urlAcc: 'localhost:8000',
    }));

    const userInfo = jest.fn();
    await authenticationService.getUserData();
    const { profile, tenant, userName } = authenticationActions.getUserInformation();
    expect(profile).toEqual('localhost:8000');
    expect(tenant).toEqual('admin');
    expect(userName).toEqual('user_test');
  });

  it('should not be able to get user information', async () => {
    jest.spyOn(api, 'restAPI').mockImplementationOnce(() => undefined);
    const userInfo = jest.fn();
    try {
      await authenticationService.getUserData();
      expect(userInfo).toHaveBeenCalledTimes(1);
    } catch (error) {
      expect(error.message).toBe('ERROR');
    }
  });
});
