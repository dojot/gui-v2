import React from 'react';

import { render } from '@testing-library/react';

import { StepIcon } from '.';

describe('StepIcon', () => {
  it('should to able simple render', () => {
    const { container } = render(<StepIcon />);
    expect(container).toBeInTheDocument();
  });

  it('should be active when active is true', () => {
    const { container } = render(<StepIcon active />);
    expect(container.firstChild.firstChild).toHaveClass('active');
    expect(container).toBeInTheDocument();
  });

  it('should be completed when completed is true', () => {
    const { container } = render(<StepIcon completed />);
    expect(container.firstChild.firstChild).toHaveClass('completed');
  });

  it('should be completed and active when completed and active are true', () => {
    const { container } = render(<StepIcon active completed />);
    expect(container.firstChild.firstChild).toHaveClass('completed');
    expect(container.firstChild.firstChild).toHaveClass('active');
  });

  it('should render check icon when completed', () => {
    const { container } = render(<StepIcon completed icon={3} />);
    const groupItens = container.querySelectorAll('svg');
    expect(groupItens.length).toBe(1);
  });

  it('should be render correct icon step', () => {
    const iconStep = 3;
    const { container } = render(<StepIcon icon={iconStep} />);
    expect(container.firstChild.firstChild.innerHTML).toBe(String(iconStep));
  });
});
