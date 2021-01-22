import { login, getUserInformation, logout } from 'Utils/module/auth';

describe('checking login', () => {
  const jwtSample =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBQk9MVkVadVZWV0VLdW5sRzQ1SnBjWUdyTEFSa1BKVCIsImlhdCI6MTYxMTMyMzQwMywiZXhwIjoxNjExMzIzODIzLCJwcm9maWxlIjoidXNlciIsImdyb3VwcyI6WzJdLCJ1c2VyaWQiOjIsImp0aSI6IjgwYzFjMDA5ZDI5OGNiMTM0OTg2NWRlYWE0YjI5NTEwIiwic2VydmljZSI6ImFkbWluIiwidXNlcm5hbWUiOiJ1c2VyX3Rlc3QifQ.sNoRKsIuZrrKWtnuG0WFQqg812he_cQBhJ67SPzCBOw';

  it('should split the jwt token and save in localStorage', () => {
    login(jwtSample);
    const { profile, tenant, userName } = getUserInformation();
    const token = localStorage.getItem('TOKEN_KEY');
    expect(profile).toEqual('user');
    expect(tenant).toEqual('admin');
    expect(userName).toEqual('user_test');
    expect(token).toEqual(jwtSample);
  });
});

describe('checking logout', () => {
  it('should remove user from localStorage', () => {
    logout();
    const { profile, tenant, userName } = getUserInformation();
    const token = localStorage.getItem('TOKEN_KEY');
    expect(profile).toEqual(null);
    expect(tenant).toEqual(null);
    expect(userName).toEqual(null);
    expect(token).toEqual(null);
  });
});
