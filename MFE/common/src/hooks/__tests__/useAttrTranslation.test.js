import { act, renderHook } from '@testing-library/react-hooks';

import { useAttrTranslation } from '..';
import { TEMPLATE_ATTR_TYPES, TEMPLATE_ATTR_VALUE_TYPES } from '../../constants';

describe('useAttrTranslation', () => {
  it('should return functions to get translations', () => {
    const { result } = renderHook(() => useAttrTranslation());
    expect(typeof result.current.getAttrTypeTranslation).toBe('function');
    expect(typeof result.current.getAttrValueTypeTranslation).toBe('function');
  });

  it('should get the attr type translation', () => {
    const { result } = renderHook(() => useAttrTranslation());

    act(() => {
      Object.values(TEMPLATE_ATTR_TYPES).forEach(attrType => {
        expect(result.current.getAttrTypeTranslation(attrType.value)).toBe(attrType.translation);
      });
    });
  });

  it('should get the attr value type translation', () => {
    const { result } = renderHook(() => useAttrTranslation());

    act(() => {
      Object.values(TEMPLATE_ATTR_VALUE_TYPES).forEach(attrValueType => {
        expect(result.current.getAttrValueTypeTranslation(attrValueType.value)).toBe(
          attrValueType.translation,
        );
      });
    });
  });

  it('should return the attr type if the translation was not found', () => {
    const { result } = renderHook(() => useAttrTranslation());

    act(() => {
      expect(result.current.getAttrTypeTranslation('unknown')).toBe('unknown');
    });
  });

  it('should return the attr value type if the translation was not found', () => {
    const { result } = renderHook(() => useAttrTranslation());

    act(() => {
      expect(result.current.getAttrValueTypeTranslation('unknown')).toBe('unknown');
    });
  });
});
