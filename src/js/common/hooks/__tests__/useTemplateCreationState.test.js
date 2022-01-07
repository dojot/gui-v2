import { act, renderHook } from '@testing-library/react-hooks';

import { useTemplateCreationState } from '..';
import { TEMPLATE_ATTR_TYPES, TEMPLATE_ATTR_VALUE_TYPES } from '../../constants';

describe('useTemplateCreationState', () => {
  const currentTimestamp = Date.now();

  const fakeNoDataAttr = {
    label: '',
    type: '',
    valueType: '',
    staticValue: '',
  };

  const fakeAttrWithLabel = {
    ...fakeNoDataAttr,
    label: 'attr',
  };

  const fakeNoDataAttrWithTimestampId = {
    id: currentTimestamp,
    ...fakeNoDataAttr,
  };

  const fakeAttrsWithId = [
    fakeNoDataAttrWithTimestampId,
    fakeNoDataAttrWithTimestampId,
    fakeNoDataAttrWithTimestampId,
  ];

  const fakeAttrsWithoutId = [fakeNoDataAttr, fakeNoDataAttr, fakeNoDataAttr];

  beforeAll(() => {
    jest.useFakeTimers('modern').setSystemTime(currentTimestamp);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should return the correct structure', () => {
    const { result } = renderHook(() => useTemplateCreationState());

    expect(Array.isArray(result.current.attrs)).toBe(true);
    expect(typeof result.current.canSaveTemplate).toBe('boolean');
    expect(typeof result.current.getAttrsWithoutId).toBe('function');
    expect(typeof result.current.handleClearState).toBe('function');
    expect(typeof result.current.handleCreateAttr).toBe('function');
    expect(typeof result.current.handleDeleteAttr).toBe('function');
    expect(typeof result.current.handleUpdateAttr).toBe('function');
    expect(typeof result.current.setAttrs).toBe('function');
    expect(typeof result.current.setTemplateLabel).toBe('function');
    expect(typeof result.current.templateLabel).toBe('string');
  });

  it('should set the template label', () => {
    const { result } = renderHook(() => useTemplateCreationState());

    expect(result.current.templateLabel).toBe('');
    act(() => result.current.setTemplateLabel('Template_Name'));
    expect(result.current.templateLabel).toBe('Template_Name');
  });

  it('should set attrs', () => {
    const { result } = renderHook(() => useTemplateCreationState());

    expect(result.current.attrs).toEqual([]);
    act(() => result.current.setAttrs([fakeNoDataAttr]));
    expect(result.current.attrs).toEqual([fakeNoDataAttr]);
  });

  it('should create an attr', () => {
    const { result } = renderHook(() => useTemplateCreationState());

    expect(result.current.attrs).toEqual([]);
    act(() => result.current.handleCreateAttr());
    expect(result.current.attrs).toEqual([fakeNoDataAttrWithTimestampId]);
  });

  it('should update an attr', () => {
    const { result } = renderHook(() => useTemplateCreationState());

    expect(result.current.attrs).toEqual([]);
    act(() => result.current.setAttrs([{ ...fakeNoDataAttr }]));
    expect(result.current.attrs).toEqual([fakeNoDataAttr]);

    act(() => result.current.handleUpdateAttr(0, 'label', 'attr'));
    expect(result.current.attrs).toEqual([fakeAttrWithLabel]);
  });

  it('should delete an attr', () => {
    const { result } = renderHook(() => useTemplateCreationState());

    expect(result.current.attrs).toEqual([]);
    act(() => result.current.setAttrs([fakeNoDataAttr]));
    expect(result.current.attrs).toEqual([fakeNoDataAttr]);

    act(() => result.current.handleDeleteAttr(0));
    expect(result.current.attrs).toEqual([]);
  });

  it('should get all attrs without ID', () => {
    const { result } = renderHook(() => useTemplateCreationState());

    expect(result.current.attrs).toEqual([]);
    act(() => result.current.setAttrs(fakeAttrsWithId));
    expect(result.current.attrs).toEqual(fakeAttrsWithId);

    act(() => {
      expect(result.current.getAttrsWithoutId()).toEqual(fakeAttrsWithoutId);
    });
  });

  it('should be possible to save a template when the required data of all attrs are filled', () => {
    const { result } = renderHook(() => useTemplateCreationState());

    expect(result.current.attrs).toEqual([]);
    act(() => result.current.setAttrs([{ ...fakeNoDataAttr }]));
    expect(result.current.attrs).toEqual([fakeNoDataAttr]);

    expect(result.current.canSaveTemplate).toBe(false);

    act(() => result.current.setTemplateLabel('Template_Name'));
    expect(result.current.canSaveTemplate).toBe(false);

    act(() => result.current.handleUpdateAttr(0, 'label', 'attr'));
    expect(result.current.canSaveTemplate).toBe(false);

    act(() => {
      const dynamicType = TEMPLATE_ATTR_TYPES.DYNAMIC.value;
      result.current.handleUpdateAttr(0, 'type', dynamicType);
    });

    expect(result.current.canSaveTemplate).toBe(false);

    act(() => {
      const boolValueType = TEMPLATE_ATTR_VALUE_TYPES.BOOL.value;
      result.current.handleUpdateAttr(0, 'valueType', boolValueType);
    });

    expect(result.current.canSaveTemplate).toBe(true);
  });

  it('should clear the entire state', () => {
    const { result } = renderHook(() => useTemplateCreationState());

    expect(result.current.attrs).toEqual([]);
    act(() => result.current.setAttrs(fakeAttrsWithId));
    expect(result.current.attrs).toEqual(fakeAttrsWithId);

    expect(result.current.templateLabel).toBe('');
    act(() => result.current.setTemplateLabel('Template_Name'));
    expect(result.current.templateLabel).toBe('Template_Name');

    act(() => result.current.handleClearState());
    expect(result.current.attrs).toEqual([]);
    expect(result.current.templateLabel).toBe('');
  });
});
