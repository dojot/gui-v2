import { constants, actions, reducers, initialState } from '../templates';

describe('Templates module tests', () => {
  const fakeTemplate = { id: 'id123' };

  const fakePaginationControl = {
    totalPages: 150,
    currentPage: 27,
    itemsPerPage: 10,
  };

  it('should declare the constants in the correct format', () => {
    Object.entries(constants).every(([name, value]) => {
      return value === `app/base/${name}`;
    });
  });

  it('should update the templates list', () => {
    const action = actions.updateTemplates({ templates: [fakeTemplate] });
    const newState = reducers[action.type](initialState(), action);
    expect(newState.get('templates')).toEqual([fakeTemplate]);
  });

  it('should update the pagination control', () => {
    const action = actions.updateTemplates({ paginationControl: fakePaginationControl });
    const newState = reducers[action.type](initialState(), action);
    expect(newState.get('paginationControl')).toEqual(fakePaginationControl);
  });
});
