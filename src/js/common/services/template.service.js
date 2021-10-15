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

export const createTemplate = template => {
  return protectAPI({
    query: `
      mutation createTemplate($name: [String]!, $attrs: Attrs) {
        createTemplate(name: $name, attrs: $attrs) {
          id
        }
      }
    `,
    variables: JSON.stringify({
      name: template.name,
      attrs: template.attrs,
    }),
  });
};

export const duplicateTemplate = templateId => {
  return protectAPI({
    query: `
      mutation duplicateTemplate($templateId: String!) {
        duplicateTemplate(templateId: $templateId) {
          id
        }
      }
    `,
    variables: JSON.stringify({
      templateId,
    }),
  });
};
