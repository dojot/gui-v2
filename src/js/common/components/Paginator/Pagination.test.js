/* eslint-disable no-undef */
import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Paginator from './Paginator';

const onPageChangeMocked = jest.fn();
const onPageSizeChangeMocked = jest.fn();

const initialProps = {
  currentPage: 1,
  pageSize: 10,
  totalPages: 10,
  onPageChange: onPageChangeMocked,
  onPageSizeChange: onPageSizeChangeMocked,
};

beforeEach(() => {
  onPageChangeMocked.mockClear();
  onPageSizeChangeMocked.mockClear();
});

describe('Paginator', () => {
  it('Simple render', () => {
    const { container } = render(<Paginator {...initialProps} />);
    expect(container.querySelector('.MuiPagination-root')).toBeInTheDocument();
  });
  it('should show paginations buttons', () => {
    const { container } = render(<Paginator {...initialProps} />);
    const buttonsPage = container.querySelectorAll('.MuiPaginationItem-page');
    expect(buttonsPage).toHaveLength(8);
  });
  it('should page change when some page is clicked', () => {
    const { container } = render(<Paginator {...initialProps} />);
    const buttonsPage = container.querySelectorAll('.MuiPaginationItem-page');
    fireEvent.click(buttonsPage[2]);
    expect(onPageChangeMocked).toHaveBeenCalledTimes(1);
  });
  it('should page not change when some page is clicked and paginator is disabled', () => {
    const { container } = render(<Paginator {...initialProps} disabled />);
    const buttonsPage = container.querySelectorAll('.MuiPaginationItem-page');
    fireEvent.click(buttonsPage[2]);
    expect(onPageChangeMocked).not.toHaveBeenCalled();
  });
  it('should show first and last page button', () => {
    const { container } = render(
      <Paginator {...initialProps} showLastButton showFirstButton />,
    );
    const buttonsPage = container.querySelectorAll('.MuiPaginationItem-page');
    const firstButton = container.querySelectorAll(
      '.MuiPaginationItem-page',
    )[0];
    const lastButton = container.querySelectorAll('.MuiPaginationItem-page')[
      buttonsPage.length - 1
    ];

    expect(firstButton).toHaveAttribute('aria-label', 'Go to first page');
    expect(lastButton).toHaveAttribute('aria-label', 'Go to last page');
  });
  it('should hide previos and next page button', () => {
    const { container } = render(
      <Paginator {...initialProps} hidePrevButton hideNextButton />,
    );
    const buttonsPage = container.querySelectorAll('.MuiPaginationItem-page');
    const firstButton = container.querySelectorAll(
      '.MuiPaginationItem-page',
    )[0];
    const lastButton = container.querySelectorAll('.MuiPaginationItem-page')[
      buttonsPage.length - 1
    ];

    expect(firstButton).not.toHaveAttribute(
      'aria-label',
      'Go to previous page',
    );
    expect(lastButton).not.toHaveAttribute('aria-label', 'Go to next page');
  });
});
