/* eslint-disable no-undef */
import React from 'react';

import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Loading from './Loading';

describe('Loading Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be able to display the loading screen', () => {
    const { getByTestId } = render(<Loading isLoading timedOut={false} pastDelay error={false} />);
    expect(getByTestId('loading-spinner')).toBeTruthy();
  });
  it('should be able to display the timeout error message', () => {
    const { getByTestId } = render(<Loading isLoading timedOut pastDelay={false} error={false} />);
    expect(getByTestId('loading-timeout')).toBeTruthy();
  });

  it('should be able to display the error message', () => {
    const { getByTestId } = render(
      <Loading isLoading={false} timedOut={false} pastDelay={false} error />,
    );
    expect(getByTestId('loading-error')).toBeTruthy();
  });

  it('should return null when isLoading is true', () => {
    const { container } = render(
      <Loading isLoading timedOut={false} pastDelay={false} error={false} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it('should return null when all properties are false', () => {
    const { container } = render(
      <Loading isLoading={false} timedOut={false} pastDelay={false} error={false} />,
    );
    expect(container.firstChild).toBeNull();
  });
});
