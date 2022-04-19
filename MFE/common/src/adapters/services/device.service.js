export const parseHistoryQuery = (filter, configs, isRealTime) => {
  return {
    query: `
      query getDeviceHistory($filter: HistoryInput!, $configs: ConfigsInput) {
        getDeviceHistoryForDashboard(filter: $filter, configs: $configs)
      }
    `,
    variables: JSON.stringify({
      filter,
      configs,
    }),
    isRealTime,
  };
};
