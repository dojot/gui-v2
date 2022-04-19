import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import EmptyPlaceholder from './EmptyPlaceholder';

describe('EmptyPlaceholder', () => {
  it('should render a message, icon and a clickable action button', () => {
    const onClick = jest.fn();

    const { container, getByText } = render(
      <EmptyPlaceholder
        icon={<i>Icon</i>}
        textButton='Button'
        emptyListMessage='Message'
        handleButtonClick={onClick}
      />,
    );

    expect(getByText('Icon')).toBeVisible();
    expect(getByText('Button')).toBeVisible();
    expect(getByText('Message')).toBeVisible();

    fireEvent.click(container.querySelector('button'));
    expect(onClick).toBeCalledTimes(1);
  });
});
