import { protectAPI } from '../api';

export const deleteTemplateAttrs = (templateId, attrIds) => {
  return protectAPI({
    query: `
      mutation deleteTemplateAttrs($templateId: String!, $attrIds: [String]!) {
        deleteTemplateAttrs(templateId: $templateId, attrIds: $attrIds) {
          id
        }
      }
    `,
    variables: JSON.stringify({
      templateId,
      attrIds,
    }),
  });
};

export const createTemplateAttr = (templateId, attr) => {
  return protectAPI({
    query: `
      mutation createTemplateAttr($templateId: String!, $attr: TemplateAttr!) {
        createTemplateAttr(templateId: $templateId, attr: $attr) {
          id
        }
      }
    `,
    variables: JSON.stringify({
      templateId,
      attr,
    }),
  });
};

export const editTemplateAttr = (templateId, attrId, attr) => {
  return protectAPI({
    query: `
      mutation editTemplateAttr($templateId: String!, $attrId: String!, $attr: TemplateAttr!) {
        editTemplateAttr(templateId: $templateId, attrId: $attrId, attr: $attr) {
          id
        }
      }
    `,
    variables: JSON.stringify({
      templateId,
      attrId,
      attr,
    }),
  });
};
