import {
  setUserInformation,
  getUserInformation,
  clearUserInformation,
  isAuthenticated,
} from 'Utils';

describe('auth utils', () => {
  it('should verify if user does not have a session', () => {
    const auth = isAuthenticated();
    expect(auth).toEqual(false);
  });

  it('should verify if user has a session', () => {
    setUserInformation({ tenant: 'admin', username: 'user_test', profile: null });
    const auth = isAuthenticated();
    expect(auth).toEqual(true);
  });

  it('should split the jwt token and save in localStorage', () => {
    setUserInformation({ tenant: 'admin', username: 'user_test', profile: null });
    const { profile, tenant, userName } = getUserInformation();
    expect(profile).toEqual('null');
    expect(tenant).toEqual('admin');
    expect(userName).toEqual('user_test');
  });

  it('should remove user from sessionStorage', () => {
    clearUserInformation();
    const { userName, tenant, profile } = getUserInformation();
    expect(profile).toEqual(null);
    expect(tenant).toEqual(null);
    expect(userName).toEqual(null);
  });
});
