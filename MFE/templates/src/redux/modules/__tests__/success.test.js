import { constants, actions, reducers, initialState } from '../success';

describe('Loading module tests', () => {
  it('should declare the constants in the correct format', () => {
    Object.entries(constants).forEach(([key, value]) => {
      expect(value).toBe(`app/success/${key}`);
    });
  });

  it('should show a success toast with default duration', () => {
    const action = actions.showSuccessToast({ i18nMessage: 'A message' });
    const newState = reducers[action.type](initialState(), action);
    expect(newState.get('successToast')).toEqual({
      isShowing: true,
      i18nMessage: 'A message',
      duration: action.payload.duration,
    });
  });

  it('should hide the success toast', () => {
    const action = actions.hideSuccessToast();
    const fakeInitialState = initialState().set('successToast', {
      isShowing: true,
      i18nMessage: 'A message',
      duration: 3000,
    });
    const newState = reducers[action.type](fakeInitialState, action);
    expect(newState.get('successToast')).toEqual({
      ...fakeInitialState.get('successToast'),
      isShowing: false,
    });
  });
});
