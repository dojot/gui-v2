import { waitFor } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';

import { useDebounce } from '..';

describe('useDebouce', () => {
  it('should return a function to trigger the debouce', () => {
    const { result } = renderHook(() => useDebounce());
    expect(typeof result.current).toBe('function');
  });

  it('should call the callback functions using the default delay', async () => {
    const startCallback = jest.fn();
    const stopCallback = jest.fn();

    const { result } = renderHook(() =>
      useDebounce({
        startCallback,
        stopCallback,
      }),
    );

    act(() => {
      result.current();
    });

    expect(startCallback).toBeCalledTimes(1);
    await waitFor(() => expect(stopCallback).toBeCalledTimes(1));
  });

  it('should call the callback functions using a custom delay', async () => {
    const startCallback = jest.fn();
    const stopCallback = jest.fn();
    const delay = 500;

    const { result } = renderHook(() =>
      useDebounce({
        delay,
        startCallback,
        stopCallback,
      }),
    );

    act(() => {
      result.current();
    });

    expect(startCallback).toBeCalledTimes(1);

    await waitFor(
      () => {
        expect(stopCallback).toBeCalledTimes(1);
      },
      { timeout: delay + 50 },
    );
  });

  it('should forward props to callback functions', async () => {
    const startCallback = jest.fn();
    const stopCallback = jest.fn();
    const myProp = 'MY PROP';

    const { result } = renderHook(() =>
      useDebounce({
        startCallback,
        stopCallback,
      }),
    );

    act(() => {
      // Doesn't matter the type or how many props you put here
      // They will be forwarded to the callback functions
      result.current(myProp, myProp, myProp);
    });

    expect(startCallback).toBeCalledWith(myProp, myProp, myProp);
    await waitFor(() => expect(stopCallback).toBeCalledWith(myProp, myProp, myProp));
  });
});
