import { Map } from 'immutable';

import { errorsSelector } from '../errorsSelector';

describe('Errors selector tests', () => {
  const fakeErrors = {
    123456789: {
      id: '123456789',
      message: 'The error',
    },
  };

  const fakeState = {
    errors: Map({
      errors: fakeErrors,
    }),
  };

  it('should return all errors', () => {
    expect(errorsSelector(fakeState)).toEqual(fakeErrors);
  });
});
