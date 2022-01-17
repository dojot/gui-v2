import React from 'react';

import { ThemeProvider } from '@material-ui/core';
import { fireEvent, render } from '@testing-library/react';
import theme from 'Themes/index';

import CollapsibleList from './CollapsibleList';

describe('CollapsibleList', () => {
  const ThemeWrapper = ({ children }) => {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
  };

  it('should render with a title, caption and content', () => {
    const { container, getByText } = render(
      <CollapsibleList
        title='TitleText'
        caption='CaptionText'
        handleToggleContent={jest.fn()}
        isContentVisible
      >
        <div>Content</div>
      </CollapsibleList>,
      {
        wrapper: ThemeWrapper,
      },
    );

    expect(container).toBeVisible();
    expect(container).toBeInTheDocument();

    expect(getByText('Content')).toBeVisible();
    expect(getByText('TitleText')).toBeVisible();
    expect(getByText('CaptionText')).toBeVisible();
  });

  it('should the content be hidden and call handleToggleContent function', () => {
    const handleToggleContent = jest.fn();

    const { getByText, getByTestId } = render(
      <CollapsibleList
        title='TitleText'
        caption='CaptionText'
        isContentVisible={false}
        handleToggleContent={handleToggleContent}
      >
        <div>Content</div>
      </CollapsibleList>,
      {
        wrapper: ThemeWrapper,
      },
    );

    expect(getByText('TitleText')).toBeVisible();
    expect(getByText('CaptionText')).toBeVisible();

    // getByText will not find the element and will throw an error
    expect(() => getByText('Content')).toThrow();

    fireEvent.click(getByTestId('collapsible-list-header'));
    expect(handleToggleContent).toBeCalledTimes(1);
  });

  it('should the caption be highlighted', () => {
    const { getByText } = render(
      <CollapsibleList
        title='TitleText'
        caption='CaptionText'
        handleToggleContent={jest.fn()}
        isContentVisible
        isCaptionHighlighted
      >
        <div>Content</div>
      </CollapsibleList>,
      {
        wrapper: ThemeWrapper,
      },
    );

    expect(getByText('CaptionText')).toBeVisible();
    expect(getByText('CaptionText').parentElement.innerHTML).toBe('<strong>CaptionText</strong>');
  });
});
