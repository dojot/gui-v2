import React from 'react';

import { render, act, fireEvent } from '@testing-library/react';

import LanguagesMenu from '../LanguagesMenu';

describe('LanguagesMenu', () => {
  beforeEach(() => {
    jest.useFakeTimers(); // Disable Material UI Popper Warning
  });

  it('should list one item for each language', () => {
    const { getByTestId } = render(
      <LanguagesMenu
        isShowingLanguagesMenu
        languages={['en', 'pt']}
        handleChangeLanguage={jest.fn()}
        handleHideLanguagesMenu={jest.fn()}
        handleClickAwayLanguagesMenu={jest.fn()}
      />,
    );

    jest.runAllTimers(); // Run all timers after rendering the Popper

    const englishItem = getByTestId('language-item-en');
    const portugueseItem = getByTestId('language-item-pt');

    expect(englishItem).toBeInTheDocument();
    expect(portugueseItem).toBeInTheDocument();
  });

  it('should the menu be hidden', () => {
    const { getByTestId } = render(
      <LanguagesMenu
        languages={['en', 'pt']}
        handleChangeLanguage={jest.fn()}
        handleHideLanguagesMenu={jest.fn()}
        handleClickAwayLanguagesMenu={jest.fn()}
      />,
    );

    jest.runAllTimers(); // Run all timers after rendering the Popper

    expect(() => getByTestId('language-item-en')).toThrow();
    expect(() => getByTestId('language-item-pt')).toThrow();
  });

  it('should call the click away function', () => {
    const handleClickAwayLanguagesMenu = jest.fn();

    const { getByText } = render(
      <div>
        <div>Click Me</div>
        <LanguagesMenu
          isShowingLanguagesMenu
          languages={['en', 'pt']}
          handleChangeLanguage={jest.fn()}
          handleHideLanguagesMenu={jest.fn()}
          handleClickAwayLanguagesMenu={handleClickAwayLanguagesMenu}
        />
      </div>,
    );

    jest.runAllTimers(); // Run all timers after rendering the Popper

    act(() => {
      fireEvent.click(getByText('Click Me'));
    });

    expect(handleClickAwayLanguagesMenu).toBeCalledTimes(1);
  });

  it('should call the function to change the language and to hide the menu', () => {
    const handleChangeLanguage = jest.fn();
    const handleHideLanguagesMenu = jest.fn();
    const handleClickAwayLanguagesMenu = jest.fn();

    const { getByTestId } = render(
      <LanguagesMenu
        isShowingLanguagesMenu
        languages={['en', 'pt']}
        handleChangeLanguage={handleChangeLanguage}
        handleHideLanguagesMenu={handleHideLanguagesMenu}
        handleClickAwayLanguagesMenu={handleClickAwayLanguagesMenu}
      />,
    );

    jest.runAllTimers(); // Run all timers after rendering the Popper

    const englishItem = getByTestId('language-item-en');

    act(() => {
      fireEvent.click(englishItem);
    });

    expect(handleChangeLanguage).toBeCalledTimes(1);
    expect(handleHideLanguagesMenu).toBeCalledTimes(1);
    expect(handleClickAwayLanguagesMenu).toBeCalledTimes(0);
  });

  it('should the selected language item be highlighted', () => {
    const { getByTestId } = render(
      <LanguagesMenu
        isShowingLanguagesMenu
        languages={['en', 'pt']}
        handleChangeLanguage={jest.fn()}
        handleHideLanguagesMenu={jest.fn()}
        handleClickAwayLanguagesMenu={jest.fn()}
      />,
    );

    jest.runAllTimers(); // Run all timers after rendering the Popper

    const englishItem = getByTestId('language-item-en');

    const filteredClasses = Array.from(englishItem.classList).filter(className =>
      className.includes('selected'),
    );

    expect(filteredClasses).toHaveLength(1);
  });
});
