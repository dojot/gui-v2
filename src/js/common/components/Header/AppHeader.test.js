import React from 'react';

import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import AppHeader from './AppHeader';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: key => key,
  }),
}));

describe('AppHeader', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const isOpen = false;
  const mockedHandleClick = jest.fn();
  const title = 'Titulo';
  it('should to able simple render ', () => {
    const { container } = render(
      <AppHeader
        isOpen={isOpen}
        title={title}
        handleClick={mockedHandleClick}
      />,
    );
    expect(container).toBeInTheDocument();
  });

  it('should be able to click on open button', () => {
    const { getByTestId } = render(
      <AppHeader
        isOpen={isOpen}
        title={title}
        handleClick={mockedHandleClick}
      />,
    );
    fireEvent.click(getByTestId('butonOpen'));
    expect(mockedHandleClick).toHaveBeenCalled();
  });

  it('should be able to click on close button', () => {
    const { getByTestId } = render(
      <AppHeader
        isOpen={isOpen}
        title={title}
        handleClick={mockedHandleClick}
      />,
    );
    fireEvent.click(getByTestId('butonNotOpen'));
    expect(mockedHandleClick).toHaveBeenCalled();
  });
});
