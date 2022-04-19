import React from 'react';

import { renderHook } from '@testing-library/react-hooks';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-test-renderer';

import { useSearchParamState } from '../useSearchParamState';

describe('useSearchParamState', () => {
  const getRouteWrapper = searchParams => ({ children }) => {
    const searchParamsString = new URLSearchParams(searchParams).toString();

    return (
      <MemoryRouter
        initialEntries={[
          {
            pathname: '/route',
            search: searchParamsString,
          },
        ]}
      >
        {children}
      </MemoryRouter>
    );
  };

  it('should return the correct structure', () => {
    const { result } = renderHook(
      () =>
        useSearchParamState({
          key: 'key',
          type: 'string',
        }),
      {
        wrapper: getRouteWrapper({ key: 'something' }),
      },
    );

    expect(result.current[0]).toBe('something');
    expect(typeof result.current[1]).toBe('function');
  });

  it('should return the default value when there is no key', () => {
    const { result } = renderHook(() => useSearchParamState({ defaultValue: 'default' }), {
      wrapper: getRouteWrapper(),
    });

    expect(result.current[0]).toBe('default');
  });

  it('should get the default value when it is a function', () => {
    const { result } = renderHook(() => useSearchParamState({ defaultValue: () => 'default' }), {
      wrapper: getRouteWrapper(),
    });

    expect(result.current[0]).toBe('default');
  });

  it('should return the value as a string', () => {
    const { result } = renderHook(() => useSearchParamState({ key: 'key', type: 'string' }), {
      wrapper: getRouteWrapper({ key: 'text' }),
    });

    expect(typeof result.current[0]).toBe('string');
  });

  it('should return the value as a number', () => {
    const { result } = renderHook(() => useSearchParamState({ key: 'key', type: 'number' }), {
      wrapper: getRouteWrapper({ key: 123 }),
    });

    expect(typeof result.current[0]).toBe('number');
  });

  it('should return the value as a boolean', () => {
    const { result } = renderHook(() => useSearchParamState({ key: 'key', type: 'boolean' }), {
      wrapper: getRouteWrapper({ key: true }),
    });

    expect(typeof result.current[0]).toBe('boolean');
  });

  it('should not format the value if pass an unknown type', () => {
    const { result } = renderHook(() => useSearchParamState({ key: 'key', type: 'unknown' }), {
      wrapper: getRouteWrapper({ key: 50 }),
    });

    // Not formatted search params are always strings
    expect(typeof result.current[0]).toBe('string');
  });

  it('should format the value', () => {
    const { result } = renderHook(
      () =>
        useSearchParamState({
          key: 'key',
          type: 'number',
          valueFormatter(value) {
            return value ** 2;
          },
        }),
      {
        wrapper: getRouteWrapper({ key: 5 }),
      },
    );

    expect(result.current[0]).toBe(25);
  });

  it('should pass the value and default value to the value formatter function', () => {
    const { result } = renderHook(
      () =>
        useSearchParamState({
          key: 'key',
          type: 'number',
          defaultValue: 1,
          valueFormatter(value, defaultValue) {
            return value % 2 === 0 ? value : defaultValue;
          },
        }),
      {
        wrapper: getRouteWrapper({ key: 17 }),
      },
    );

    expect(result.current[0]).toBe(1);
  });

  it('should not set the value if the key is not present', () => {
    const valueChangerFn = jest.fn();

    const { result } = renderHook(() => useSearchParamState({}), {
      wrapper: getRouteWrapper(),
    });

    act(() => {
      const setValue = result.current[1];
      setValue(valueChangerFn);
    });

    expect(valueChangerFn).not.toBeCalled();
  });

  it('should change the value when there is an initial value', async () => {
    const { result, rerender } = renderHook(() => useSearchParamState({ key: 'key' }), {
      wrapper: getRouteWrapper({ key: 'value' }),
    });

    expect(result.current[0]).toBe('value');

    act(() => {
      const setValue = result.current[1];
      setValue('other');
      rerender();
    });

    expect(result.current[0]).toBe('other');
  });

  it('should change the value with no initial value', async () => {
    const { result, rerender } = renderHook(() => useSearchParamState({ key: 'key' }), {
      wrapper: getRouteWrapper(),
    });

    expect(result.current[0]).toBe(undefined);

    act(() => {
      const setValue = result.current[1];
      setValue('new');
      rerender();
    });

    expect(result.current[0]).toBe('new');
  });

  it('should change the value passing a function to the setValue function', async () => {
    const { result, rerender } = renderHook(
      () => useSearchParamState({ key: 'key', type: 'number' }),
      {
        wrapper: getRouteWrapper({ key: 5 }),
      },
    );

    expect(result.current[0]).toBe(5);

    act(() => {
      const setValue = result.current[1];
      setValue(currentValue => currentValue + 5);
      rerender();
    });

    expect(result.current[0]).toBe(10);
  });

  it('should delete the value from search params if the new value is an empty string', async () => {
    const { result, rerender } = renderHook(() => useSearchParamState({ key: 'key' }), {
      wrapper: getRouteWrapper({ key: 'not empty' }),
    });

    expect(result.current[0]).toBe('not empty');

    act(() => {
      const setValue = result.current[1];
      setValue('');
      rerender();
    });

    expect(result.current[0]).toBe(undefined);
  });
});
