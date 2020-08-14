/* eslint-disable no-undef */
import React from 'react';

import { shallow } from 'enzyme';

import Loading from './Loading';

describe('Loading Screen', () => {
  it('should be able to display the loading screen', () => {
    const loading = shallow(
      <Loading isLoading timedOut={false} pastDelay error={false} />,
    );
    expect(loading.find('#loading-spinner').exists()).toBeTruthy();
  });
  it('should be able to display the timeout error message', () => {
    const loading = shallow(
      <Loading isLoading timedOut pastDelay={false} error={false} />,
    );
    expect(loading.find('#loading-timeout').exists()).toBeTruthy();
  });

  it('should be able to display the error message', () => {
    const loading = shallow(
      <Loading isLoading={false} timedOut={false} pastDelay={false} error />,
    );
    expect(loading.find('#loading-error').exists()).toBeTruthy();
  });

  it('should return null when isLoading is true', () => {
    const loading = shallow(
      <Loading isLoading timedOut={false} pastDelay={false} error={false} />,
    );
    expect(loading.type()).toEqual(null);
  });

  it('should return null when all properties are false', () => {
    const loading = shallow(
      <Loading
        isLoading={false}
        timedOut={false}
        pastDelay={false}
        error={false}
      />,
    );
    expect(loading.type()).toEqual(null);
  });
});
