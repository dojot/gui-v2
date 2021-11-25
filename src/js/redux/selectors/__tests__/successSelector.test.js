import { Map } from 'immutable';

import { successToastSelector } from '../successSelector';

describe('Errors selector tests', () => {
  const fakeSuccessToast = {
    isShowing: true,
    i18nMessage: 'message',
    duration: 3000,
  };

  const fakeState = {
    success: Map({
      successToast: fakeSuccessToast,
    }),
  };

  it('should return the success toast data', () => {
    expect(successToastSelector(fakeState)).toEqual(fakeSuccessToast);
  });
});
