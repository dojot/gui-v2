import { protectAPI } from 'APIs';

const GQL_UPDATE_DASHBOARD_CONFIG = `
mutation updateConfig($user: String, $tenant: String!, $config: String!) {
  updateConfig(user: $user, tenant: $tenant, config: $config)
}
`;

const GQL_GET_DASHBOARD_CONFIG = `
query getConfig($user: String, $tenant: String!) {
  getConfig(user: $user, tenant: $tenant)
}
`;

const getDashboardConfigQuery = (user, tenant) => {
  const variables = {
    user,
    tenant,
  };
  return {
    query: GQL_GET_DASHBOARD_CONFIG,
    variables: JSON.stringify(variables),
  };
};

const updateDashboardConfigQuery = (user, tenant, config) => {
  const variables = {
    user,
    tenant,
    config,
  };
  return {
    query: GQL_UPDATE_DASHBOARD_CONFIG,
    variables: JSON.stringify(variables),
  };
};

export const getDashboardConfig = (user, tenant) => {
  return protectAPI(getDashboardConfigQuery(user, tenant));
};

export const updateDashboardConfig = (user, tenant, config) => {
  return protectAPI(updateDashboardConfigQuery(user, tenant, config));
};
