/* eslint-disable no-undef */
import React from 'react';

import { render } from '@testing-library/react';

import WizardFooter from './WizardFooter.jsx';

const initialProps = {
  isOpen: false,
  activeStep: 0,
  steps: [0, 1, 2],
  isValid: true,
};

describe('WizardFooter', () => {
  it('should be able to simple render', () => {
    const { container } = render(<WizardFooter {...initialProps} />);
    expect(container).toBeInTheDocument();
  });

  it('should be able to disable next button when invalid state', () => {
    const { getByTestId } = render(<WizardFooter {...initialProps} isValid={false} />);
    const wizardButton = getByTestId('wizard-button');
    expect(wizardButton).toHaveAttribute('disabled');
  });
  it('should be able to display next button label when non last step', () => {
    const { getByTestId } = render(<WizardFooter {...initialProps} />);
    const wizardButton = getByTestId('wizard-button');
    expect(wizardButton.querySelector('span').innerHTML).toEqual('next');
  });

  it('should be able to display finish button label when last step', () => {
    const { getByTestId } = render(<WizardFooter {...initialProps} activeStep={2} />);
    const wizardButton = getByTestId('wizard-button');
    expect(wizardButton.querySelector('span').innerHTML).toEqual('finish');
  });
});
