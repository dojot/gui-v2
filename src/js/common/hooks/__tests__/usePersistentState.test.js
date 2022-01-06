import { renderHook, act } from '@testing-library/react-hooks';

import { usePersistentState } from '..';

describe('usePersistentState', () => {
  const TESTING_KEY = 'USE_PERSISTENT_STATE';

  afterEach(() => {
    localStorage.removeItem(TESTING_KEY);
  });

  it('should return the correct structure', () => {
    const { result } = renderHook(() => usePersistentState({ key: TESTING_KEY }));

    expect(result.current).toHaveLength(3);
    expect(typeof result.current[0]).toBe('undefined');
    expect(typeof result.current[1]).toBe('function');
    expect(typeof result.current[2]).toBe('function');
  });

  it('should the value be the default value', () => {
    const { result } = renderHook(() =>
      usePersistentState({
        key: TESTING_KEY,
        defaultValue: 'default',
      }),
    );

    expect(result.current[0]).toBe('default');
  });

  it('should get the existing string value from local storage', () => {
    localStorage.setItem(TESTING_KEY, 'testing');
    const { result } = renderHook(() => usePersistentState({ key: TESTING_KEY }));
    expect(result.current[0]).toBe('testing');
  });

  it('should get a JSON value from local storage and parse to object', () => {
    localStorage.setItem(TESTING_KEY, '{ "testing": 51 }');

    const { result } = renderHook(() =>
      usePersistentState({
        key: TESTING_KEY,
        isJson: true,
      }),
    );

    expect(result.current[0]).toEqual({ testing: 51 });
  });

  it('should update a string value in the localStorage and in the state', () => {
    localStorage.setItem(TESTING_KEY, 'test');

    const { result } = renderHook(() => usePersistentState({ key: TESTING_KEY }));

    expect(result.current[0]).toBe('test');
    expect(localStorage.getItem(TESTING_KEY)).toBe('test');

    act(() => {
      const setState = result.current[1];
      setState('changed');
    });

    expect(result.current[0]).toBe('changed');
    expect(localStorage.getItem(TESTING_KEY)).toBe('changed');
  });

  it('should update a JSON value in the localStorage and in the state', () => {
    const oldValue = { testing: 51 };
    const oldValueJSON = JSON.stringify(oldValue);

    const newValue = { value: 'changed' };
    const newValueJSON = JSON.stringify(newValue);

    localStorage.setItem(TESTING_KEY, oldValueJSON);

    const { result } = renderHook(() =>
      usePersistentState({
        key: TESTING_KEY,
        isJson: true,
      }),
    );

    expect(result.current[0]).toEqual(oldValue);
    expect(localStorage.getItem(TESTING_KEY)).toBe(oldValueJSON);

    act(() => {
      const setState = result.current[1];
      setState(newValue);
    });

    expect(result.current[0]).toEqual(newValue);
    expect(localStorage.getItem(TESTING_KEY)).toBe(newValueJSON);
  });

  it('should restore value to default value', () => {
    localStorage.setItem(TESTING_KEY, 'data');

    const { result } = renderHook(() =>
      usePersistentState({
        key: TESTING_KEY,
        defaultValue: 'default',
      }),
    );

    expect(result.current[0]).toBe('data');

    act(() => {
      const restoreDefault = result.current[2];
      restoreDefault();
    });

    expect(localStorage.getItem(TESTING_KEY)).toBe('default');
    expect(result.current[0]).toBe('default');
  });

  it('should return the default value when the value is null and isJson === true', () => {
    localStorage.setItem(TESTING_KEY, null);

    const { result } = renderHook(() =>
      usePersistentState({
        key: TESTING_KEY,
        defaultValue: 'default',
        isJson: true,
      }),
    );

    expect(result.current[0]).toBe('default');
  });
});
