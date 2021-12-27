import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import DataCard from '.';

describe('DataCard', () => {
  it('should render a data card with title, content and footer', () => {
    const { getByText } = render(
      <DataCard headerTitle='Title' headerIcon={<i>Icon</i>} footer={<div>Footer</div>}>
        <div>Content</div>
      </DataCard>,
    );

    expect(getByText('Icon')).toBeVisible();
    expect(getByText('Title')).toBeVisible();
    expect(getByText('Footer')).toBeVisible();
    expect(getByText('Content')).toBeVisible();
  });

  it('should the card and options button be clickable', () => {
    const onClick = jest.fn();
    const onClickOptions = jest.fn();

    const { container, getByLabelText } = render(
      <DataCard headerTitle='Title' onClick={onClick} onOptionsClick={onClickOptions}>
        <div>Content</div>
      </DataCard>,
    );

    fireEvent.click(container.firstElementChild);
    expect(onClick).toBeCalledTimes(1);

    fireEvent.click(getByLabelText('options'));
    expect(onClickOptions).toBeCalledTimes(1);
  });
});
