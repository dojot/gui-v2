import { protectAPI } from '../api';

export const getFlowsList = id => {
  return protectAPI({
    query: `
      query getAllFlows($id: String) {
        getAllFlows(id: $id) {
          flows {
            flow
            name
            id
            enabled
            created
            updated
          }
        }
      }
    `,
    variables: JSON.stringify({ id }),
  });
};

export const getFlowByID = id => {
  return protectAPI({
    query: `
      query getFlowByID($id: String!) {
        getFlowByID(id: $id) {
          flow
          id
          name
          created
          updated
          enabled
        }
      }
    `,
    variables: JSON.stringify({ id }),
  });
};

export const createFlow = flow => {
  return protectAPI({
    query: `
      mutation createFlow($flow: String!){
        createFlow(flow: $flow)
      }
    `,
    variables: JSON.stringify({ flow }),
  });
};

export const updateFlow = (id, flow) => {
  return protectAPI({
    query: `
    mutation editFlow($id: String!, $flow: String!){
      editFlow(id: $id, flow: $flow)
    }`,
    variables: JSON.stringify({ id, flow }),
  });
};

export const deleteFlow = id => {
  return protectAPI({
    query: `
      mutation deleteFlowByID($id: String!) {
        deleteFlowByID(id: $id)
      }
    `,
    variables: JSON.stringify({ id }),
  });
};

export const getNodesList = id => {
  return protectAPI({
    query: ``,
    variables: JSON.stringify({}),
  });
};
