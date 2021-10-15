import { protectAPI } from 'APIs';

export const getAttrList = page => {
  return protectAPI({
    query: `
    query getAttrs($page: PageInput) {
      getAttrs(page: $page) {
        totalPages
        currentPage
        attrs {
          id
          label
          type
          valueType
          value
        }
      }
    }
    `,
    variables: JSON.stringify({
      page,
    }),
  });
};

export const deleteAttr = (templateId, attrId) => {
  return protectAPI({
    query: `
      mutation deleteAttr($templateId: String!, $attrId: String!) {
        deleteAttr(templateId: $templateId, attrId: $attrId) {
          id
        }
      }
    `,
    variables: JSON.stringify({
      templateId,
      attrId,
    }),
  });
};

export const deleteMultipleAttrs = (templateId, attrIdArray) => {
  return protectAPI({
    query: `
      mutation deleteMultipleAttrs($templateId: String!, $attrIdArray: [String]!) {
        deleteMultipleAttrs(templateId: $templateId, attrIdArray: $attrIdArray) {
          id
        }
      }
    `,
    variables: JSON.stringify({
      templateId,
      attrIdArray,
    }),
  });
};

export const createAttr = (templateId, attr) => {
  return protectAPI({
    query: `
      mutation createAttr($templateId: String!, $attr: Attr) {
        createAttr(templateId: $templateId, attr: $attr) {
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

export const editAttr = (templateId, attr) => {
  return protectAPI({
    query: `
      mutation createAttr($templateId: String!, $attr: Attr) {
        createAttr(templateId: $templateId, attr: $attr) {
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
