import { unprotectedAPI } from 'APIs';
import { isAuthenticated, login as loginAction, logout as logoutAction } from 'sharedComponents/Utils';

const GQL_USER_TOKEN = `
  mutation login($username: String, $passwd: String) {
  login(username: $username , passwd: $passwd) {
    jwt
    user {
      username
      profile
    }
  }
}
`;

const getUserTokenQuery = (username, passwd) => {
  const variables = {
    username,
    passwd,
  };
  return {
    query: GQL_USER_TOKEN,
    variables: JSON.stringify(variables),
  };
};

export const login = async ({ user, password }) => {
  const response = await unprotectedAPI(getUserTokenQuery(user, password));
  if (!response.login) {
    throw new Error('Erro ao efetuar login');
  }
  loginAction(response.login.jwt);
  return isAuthenticated();
};

export const logout = () => {
  // TODO: So far there is no treatment
  logoutAction();
};
