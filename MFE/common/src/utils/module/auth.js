export const isAuthenticated = () => localStorage.getItem('TOKEN_KEY') !== null;

export const getToken = () => localStorage.getItem('TOKEN_KEY');

export const login = token => {
  // eslint-disable-next-line no-unused-vars
  const [generalInfo, userInfo, check] = token.split('.');
  const { profile, service, username } = JSON.parse(atob(userInfo));
  localStorage.setItem('USER_PROFILE', profile);
  localStorage.setItem('USER_TENANT', service);
  localStorage.setItem('USER_USER', username);
  localStorage.setItem('TOKEN_KEY', token);
};

export const logout = () => {
  localStorage.removeItem('USER_PROFILE');
  localStorage.removeItem('USER_TENANT');
  localStorage.removeItem('USER_USER');
  localStorage.removeItem('TOKEN_KEY');
};

export const getUserInformation = () => {
  return {
    userName: localStorage.getItem('USER_USER'),
    tenant: localStorage.getItem('USER_TENANT'),
    profile: localStorage.getItem('USER_PROFILE'),
  };
};
