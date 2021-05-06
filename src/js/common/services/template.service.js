import { protectAPI } from 'APIs';

const GQL_TEMPLATES_LIST = `
query getTemplates($page: PageInput) {
  getTemplates(page: $page) {
    totalPages
    currentPage
    templates {
      id
      label
      attrs{
        label
        valueType
        isDynamic
        staticValue
      }
    }
  }
}
`;

const parseDevicesListQuery = page => {
  const variables = {
    page,
  };
  return {
    query: GQL_TEMPLATES_LIST,
    variables: JSON.stringify(variables),
  };
};

export const getTemplatesList = page => {
  return protectAPI(parseDevicesListQuery(page));
};
