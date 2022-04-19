import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import AlertDialog from './index';

describe('AlertDialog', () => {
  it('should not be visible because is closed', () => {
    const { container } = render(
      <AlertDialog
        isOpen={false}
        title='Title'
        message='Message'
        cancelButtonText='CancelButton'
        confirmButtonText='ConfirmButton'
        handleClose={jest.fn()}
        handleConfirm={jest.fn()}
      />,
    );
    expect(container.firstElementChild).not.toBeInTheDocument();
  });

  it('should be visible, have a title, message and action buttons', () => {
    const { getByText } = render(
      <AlertDialog
        isOpen
        title='Title'
        message='Message'
        cancelButtonText='CancelButton'
        confirmButtonText='ConfirmButton'
        handleClose={jest.fn()}
        handleConfirm={jest.fn()}
      />,
    );

    expect(getByText('Title')).toBeVisible();
    expect(getByText('Message')).toBeVisible();
    expect(getByText('CancelButton')).toBeVisible();
    expect(getByText('ConfirmButton')).toBeVisible();
  });

  it('should call the callback functions', () => {
    const handleClose = jest.fn();
    const handleCancel = jest.fn();
    const handleConfirm = jest.fn();

    const { getByText } = render(
      <AlertDialog
        isOpen
        title='Title'
        message='Message'
        cancelButtonText='CancelButton'
        confirmButtonText='ConfirmButton'
        handleClose={handleClose}
        handleCancel={handleCancel}
        handleConfirm={handleConfirm}
        shouldCloseWhenCancel
        shouldCloseWhenConfirm
      />,
    );

    fireEvent.click(getByText('ConfirmButton'));
    expect(handleConfirm).toBeCalledTimes(1);
    expect(handleClose).toBeCalledTimes(1);

    fireEvent.click(getByText('CancelButton'));
    expect(handleCancel).toBeCalledTimes(1);
    expect(handleClose).toBeCalledTimes(2);
  });

  it('should not close when cancel or confirm', () => {
    const handleClose = jest.fn();
    const handleCancel = jest.fn();
    const handleConfirm = jest.fn();

    const { getByText } = render(
      <AlertDialog
        isOpen
        title='Title'
        message='Message'
        cancelButtonText='CancelButton'
        confirmButtonText='ConfirmButton'
        handleClose={handleClose}
        handleCancel={handleCancel}
        handleConfirm={handleConfirm}
        shouldCloseWhenCancel={false}
        shouldCloseWhenConfirm={false}
      />,
    );

    fireEvent.click(getByText('ConfirmButton'));
    expect(handleConfirm).toBeCalledTimes(1);
    expect(handleClose).not.toBeCalled();

    fireEvent.click(getByText('CancelButton'));
    expect(handleCancel).toBeCalledTimes(1);
    expect(handleClose).not.toBeCalled();
  });

  it('should confirm button have focus', () => {
    const { getByText } = render(
      <AlertDialog
        isOpen
        title='Title'
        message='Message'
        cancelButtonText='CancelButton'
        confirmButtonText='ConfirmButton'
        handleClose={jest.fn()}
        handleConfirm={jest.fn()}
        autoFocusConfirmationButton
      />,
    );

    expect(getByText('ConfirmButton').parentElement).toHaveFocus();
  });
});
