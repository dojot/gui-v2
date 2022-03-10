import { restAPI } from 'APIs';

export const getUserData = () => {
  return restAPI('/auth/user-info');
};
