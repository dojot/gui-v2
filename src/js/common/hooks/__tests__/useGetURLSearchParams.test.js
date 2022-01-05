import React from 'react';

import { renderHook } from '@testing-library/react-hooks';
import { MemoryRouter } from 'react-router-dom';

import { useGetURLSearchParams } from '..';

describe('useGetURLSearchParams', () => {
  it('should return undefined because there is no search params', () => {
    const { result } = renderHook(() => useGetURLSearchParams(), { wrapper: MemoryRouter });
    expect(result.current).toBe(undefined);
  });

  it('should return an object with all search param values', () => {
    const { result } = renderHook(() => useGetURLSearchParams(), {
      wrapper({ children }) {
        return (
          <MemoryRouter
            initialEntries={[
              {
                pathname: '/testing',
                search: '?param1=first&param2=second',
              },
            ]}
          >
            {children}
          </MemoryRouter>
        );
      },
    });

    expect(result.current).toEqual({ param1: 'first', param2: 'second' });
  });
});
