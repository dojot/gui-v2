import { protectAPI } from 'APIs';

export const getTemplatesList = (page, filter) => {
  return protectAPI({
    query: `
    query getTemplates($page: PageInput, $filter: FilterTemplateInput) {
      getTemplates(page: $page, filter: $filter) {
        totalPages
        currentPage
        templates {
          id
          label
          created
          attrs {
            id
            type
            label
            created
            valueType
            isDynamic
            templateId
            staticValue
          }
        }
      }
    }
    `,
    variables: JSON.stringify({
      page,
      filter,
    }),
  });
};

export const getTemplateById = templateId => {
  return protectAPI({
    query: `
    query getTemplateById($templateId: String!) {
      getTemplateById(templateId: $templateId) {
        id
        label
        created
        attrs {
          id
          type
          label
          created
          valueType
          isDynamic
          templateId
          staticValue
        }
      }
    }
    `,
    variables: JSON.stringify({
      templateId,
    }),
  });
};

export const deleteTemplates = templateIds => {
  return protectAPI({
    query: `
      mutation deleteTemplates($templateIds: [String]!) {
        deleteTemplates(templateIds: $templateIds)
      }
    `,
    variables: JSON.stringify({
      templateIds,
    }),
  });
};

export const createTemplate = ({ label, attrs }) => {
  return protectAPI({
    query: `
      mutation createTemplate($label: String!, $attrs: [TemplateAttr]!) {
        createTemplate(label: $label, attrs: $attrs) {
          id
        }
      }
    `,
    variables: JSON.stringify({
      label,
      attrs,
    }),
  });
};

export const editTemplate = ({ id, label, attrs }) => {
  return protectAPI({
    query: `
      mutation editTemplate($id: String!, $label: String!, $attrs: [TemplateAttr]!) {
        editTemplate(id: $id, label: $label, attrs: $attrs) {
          id
        }
      }
    `,
    variables: JSON.stringify({
      id,
      label,
      attrs,
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
