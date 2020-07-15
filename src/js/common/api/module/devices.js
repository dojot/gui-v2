import { HTTP } from 'Utils';

export const getWithGraphQL = query => {
  return HTTP.post('graphql?', query);
};

export const getAuthGraphQL = query => {
  return HTTP.post('graphql-auth/', query);
};
