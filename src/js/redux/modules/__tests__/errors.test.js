import { constants, actions, reducers, initialState } from '../errors';

describe('Error module tests', () => {
  const defaultFakeError = {
    message: 'Error message',
    i18nMessage: 'error',
  };

  const fakeErrorWithDuration = {
    ...defaultFakeError,
    duration: 3000,
  };

  const fakeErrorWithId = {
    ...defaultFakeError,
    id: '1651981651321981',
  };

  it('should declare the constants in the correct format', () => {
    Object.entries(constants).every(([name, value]) => {
      return value === `app/base/${name}`;
    });
  });

  it('should add an error to the state', () => {
    const action = actions.addError(defaultFakeError);
    const newState = reducers[action.type](initialState(), action);
    expect(newState.get('errors')).toEqual({
      [action.payload.id]: {
        ...defaultFakeError,
        id: action.payload.id,
        duration: action.payload.duration,
      },
    });
  });

  it('should add an error to the state with a duration', () => {
    const action = actions.addError(fakeErrorWithDuration);
    const newState = reducers[action.type](initialState(), action);
    expect(action.payload.duration).toBe(fakeErrorWithDuration.duration);
    expect(newState.get('errors')).toEqual({
      [action.payload.id]: { ...fakeErrorWithDuration, id: action.payload.id },
    });
  });

  it('should remove an error from the state', () => {
    const action = actions.removeError(fakeErrorWithId.id);
    const fakeInitialState = initialState().set('errors', {
      [fakeErrorWithId.id]: fakeErrorWithId,
    });
    const newState = reducers[action.type](fakeInitialState, action);
    expect(newState.get('errors')).toEqual({});
  });
});
