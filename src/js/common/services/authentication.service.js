import { restAPI } from 'APIs';
import { URL } from 'Constants';
import { setUserInformation } from 'Utils/module/auth';

export const getUserData = async () => {
  try {
    const result = await restAPI(URL.USER_INFO);
    const { tenant, username, urlAcc } = result;
    setUserInformation({ tenant, username, profile: urlAcc });
  } catch (e) {
    throw new Error('ERROR');
  }
};
