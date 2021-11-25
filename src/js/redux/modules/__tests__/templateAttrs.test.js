import { constants, actions, reducers, initialState } from '../templateAttrs';

describe('Template attrs module tests', () => {
  const fakeAttr = { id: 'id123' };

  const fakePaginationControl = {
    totalPages: 150,
    currentPage: 27,
  };

  it('should declare the constants in the correct format', () => {
    Object.entries(constants).every(([name, value]) => {
      return value === `app/base/${name}`;
    });
  });

  it('should update the template attrs list', () => {
    const action = actions.updateAttrs({ attrs: [fakeAttr] });
    const newState = reducers[action.type](initialState(), action);
    expect(newState.get('attrs')).toEqual([fakeAttr]);
  });

  it('should update the pagination control', () => {
    const action = actions.updateAttrs(fakePaginationControl);
    const newState = reducers[action.type](initialState(), action);
    expect(newState.get('paginationControl')).toEqual(fakePaginationControl);
  });
});
