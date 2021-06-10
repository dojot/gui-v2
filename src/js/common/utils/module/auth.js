export const isAuthenticated = () => sessionStorage.getItem('USER_NAME') !== null;

export const setUserInformation = userInfo => {
  const { tenant, username, profile } = userInfo;
  sessionStorage.setItem('USER_PROFILE', profile);
  sessionStorage.setItem('USER_TENANT', tenant);
  sessionStorage.setItem('USER_NAME', username);
};

export const clearUserInformation = () => {
  sessionStorage.clear();
};

export const getUserInformation = () => {
  return {
    userName: sessionStorage.getItem('USER_NAME'),
    tenant: sessionStorage.getItem('USER_TENANT'),
    profile: sessionStorage.getItem('USER_PROFILE'),
  };
};
