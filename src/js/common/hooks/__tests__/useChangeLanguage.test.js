import { waitFor } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';

import { useChangeLanguage } from '..';
import { LANGUAGE_KEYS } from '../../constants';

describe('useChangeLanguage', () => {
  it('should return languages and a function to change the language', () => {
    const { result } = renderHook(() => useChangeLanguage());
    expect(Array.isArray(result.current.languages)).toBe(true);
    expect(typeof result.current.handleChangeLanguage).toBe('function');
  });

  it('should set the new language in localStorage', async () => {
    const { result } = renderHook(() => useChangeLanguage());
    await act(() => result.current.handleChangeLanguage('en-US'));
    await waitFor(() => expect(localStorage.getItem(LANGUAGE_KEYS.LANGUAGE)).toBe('en-US'));
  });
});
