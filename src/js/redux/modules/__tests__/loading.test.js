import { constants, actions, reducers, initialState } from '../loading';

describe('Loading module tests', () => {
  const LOADING_KEY_1 = 'LOADING_KEY_1';
  const LOADING_KEY_2 = 'LOADING_KEY_2';

  it('should declare the constants in the correct format', () => {
    Object.entries(constants).forEach(([key, value]) => {
      expect(value).toBe(`app/loading/${key}`);
    });
  });

  it('should add multiple loadings to the state', () => {
    const action = actions.addLoading(LOADING_KEY_1, LOADING_KEY_2);
    const newState = reducers[action.type](initialState(), action);
    expect(newState.get('loading')).toEqual({
      [LOADING_KEY_1]: true,
      [LOADING_KEY_2]: true,
    });
  });

  it('should remove a loading from the state', () => {
    const action = actions.removeLoading(LOADING_KEY_1);
    const fakeInitialState = initialState().set('loading', {
      [LOADING_KEY_1]: true,
      [LOADING_KEY_2]: true,
    });
    const newState = reducers[action.type](fakeInitialState, action);
    expect(newState.get('loading')).toEqual({
      [LOADING_KEY_2]: true,
    });
  });
});
