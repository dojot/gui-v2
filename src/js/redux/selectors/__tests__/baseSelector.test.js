import { Map } from 'immutable';

import { menuSelector, titleSelector } from '../baseSelector';

describe('Base selector tests', () => {
  const fakeState = {
    base: Map({
      isMenuOpen: true,
      headerTitle: 'The title',
    }),
  };

  it('should return if the menu is open or not', () => {
    expect(menuSelector(fakeState)).toEqual({ isMenuOpen: true });
  });

  it('should return the header title', () => {
    expect(titleSelector(fakeState)).toEqual({ headerTitle: 'The title' });
  });
});
