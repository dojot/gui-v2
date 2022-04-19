import * as api from 'APIs';
import * as loginActions from 'Utils/module/auth';

import * as authenticationService from './authentication.service';

describe('authentication.service', () => {
  it('should be able to authenticate a user', async () => {
    jest.spyOn(api, 'unprotectedAPI').mockImplementationOnce(() => ({
      login: {
        jwt: 'jwt-token',
      },
    }));

    const login = jest.fn();
    loginActions.login = login;

    await authenticationService.login({ user: 'user', password: 'password' });
    expect(login).toHaveBeenCalledWith('jwt-token');
  });

  it('should not be able to authenticate a user', async () => {
    jest.spyOn(api, 'unprotectedAPI').mockImplementationOnce(() => ({
      login: null,
    }));

    try {
      await authenticationService.login({ user: 'user', password: 'password' });
      expect('success').toBe('exception');
    } catch (error) {
      expect(error.message).toBe('Erro ao efetuar login');
    }
  });

  it('should be able to logout user', async () => {
    const logout = jest.fn();
    loginActions.logout = logout;

    authenticationService.logout();
    expect(logout).toHaveBeenCalledTimes(1);
  });
});
