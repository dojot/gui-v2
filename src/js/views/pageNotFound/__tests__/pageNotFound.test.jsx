import React from 'react';

import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import PageNotFound from '../View';

describe('PageNotFound view', () => {
  it('should render', () => {
    const { container } = render(<PageNotFound />, { wrapper: MemoryRouter });
    expect(container).toBeInTheDocument();
  });

  it('should render a button to go back', () => {
    const { getByRole } = render(<PageNotFound />, { wrapper: MemoryRouter });
    expect(getByRole('button')).toBeVisible();
  });
});
