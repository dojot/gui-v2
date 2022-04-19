import React from 'react';

import { render } from '@testing-library/react';

import { StepLine } from './index';

describe('StepLine', () => {
  it('should to able simple render', () => {
    const { container } = render(<StepLine />);
    expect(container).toBeInTheDocument();
  });

  it('should be shorted when active is true', () => {
    const { container } = render(<StepLine active />);
    expect(container.firstChild).toHaveClass('shorted');
  });

  it('should be shorted when completed is true', () => {
    const { container } = render(<StepLine completed />);
    expect(container.firstChild).toHaveClass('shorted');
  });

  it('should be shorted when completed and active are true', () => {
    const { container } = render(<StepLine active completed />);
    expect(container.firstChild).toHaveClass('shorted');
  });
});
