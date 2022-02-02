import { constants, actions, reducers, initialState } from '../base';

describe('Base module tests', () => {
  it('should declare the constants in the correct format', () => {
    Object.entries(constants).forEach(([key, value]) => {
      expect(value).toBe(`app/base/${key}`);
    });
  });

  it('should update the menu visibility state', () => {
    const action = actions.updateIsMenuOpen(true);
    const newState = reducers[action.type](initialState(), action);
    expect(newState.get('isMenuOpen')).toBe(true);
  });

  it('should update the header title', () => {
    const action = actions.updateHeaderTitle('Header Title');
    const newState = reducers[action.type](initialState(), action);
    expect(newState.get('headerTitle')).toBe('Header Title');
  });
});
