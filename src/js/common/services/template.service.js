import { protectAPI } from 'APIs';

export const getTemplatesList = page => {
  return protectAPI({
    query: `
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
    `,
    variables: JSON.stringify({
      page,
    }),
  });
};

export const deleteTemplate = templateId => {
  return protectAPI({
    query: `
      mutation deleteTemplate($templateId: String!) {
        deleteTemplate(templateId: $templateId) {
          id
        }
      }
    `,
    variables: JSON.stringify({
      templateId,
    }),
  });
};

export const deleteMultipleTemplates = templateIdArray => {
  return protectAPI({
    query: `
      mutation deleteMultipleTemplates($templateIdArray: [String]!) {
        deleteMultipleTemplates(templateIdArray: $templateIdArray) {
          id
        }
      }
    `,
    variables: JSON.stringify({
      templateIdArray,
    }),
  });
};
