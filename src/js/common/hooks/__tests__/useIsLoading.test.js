import React from 'react';

import { renderHook } from '@testing-library/react-hooks';
import { Map } from 'immutable';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { useIsLoading } from '..';

describe('useIsLoading', () => {
  const mockStore = configureStore();

  const store = mockStore({
    loading: Map({
      loading: {
        KEY_1: true,
        KEY_2: false,
      },
    }),
  });

  const StoreWrapper = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
  };

  it('should return false if the key does not exist', () => {
    const { result } = renderHook(() => useIsLoading('NOT_EXISTING_KEY'), {
      wrapper: StoreWrapper,
    });

    expect(result.current).toBe(false);
  });

  it('should return true if the key is true in the state', () => {
    const { result, rerender } = renderHook((...keys) => useIsLoading(keys), {
      initialProps: 'KEY_1',
      wrapper: StoreWrapper,
    });

    expect(result.current).toBe(true);

    rerender('KEY_2');
    expect(result.current).toBe(false);

    rerender('KEY_1');
    expect(result.current).toBe(true);
  });

  it('should return true if one or more keys are true', () => {
    const { result } = renderHook(() => useIsLoading('KEY_2', 'KEY_1'), {
      wrapper: StoreWrapper,
    });

    expect(result.current).toBe(true);
  });

  it('should return false if do not pass a key as param', () => {
    const { result } = renderHook(() => useIsLoading(), {
      wrapper: StoreWrapper,
    });

    expect(result.current).toBe(false);
  });
});
