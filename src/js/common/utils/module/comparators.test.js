import { descendingComparator, getComparator } from './comparators';

describe('Comparators Utils', () => {
  it('should return 1 when B > A', () => {
    expect(descendingComparator({ number: 1 }, { number: 2 }, 'number')).toBe(1);
    expect(descendingComparator({ text: 'abc' }, { text: 'cba' }, 'text')).toBe(1);
  });

  it('should return -1 when A > B', () => {
    expect(descendingComparator({ number: 2 }, { number: 1 }, 'number')).toBe(-1);
    expect(descendingComparator({ text: 'cba' }, { text: 'abc' }, 'text')).toBe(-1);
  });

  it('should return 0 when A = B', () => {
    expect(descendingComparator({ number: 1 }, { number: 1 }, 'number')).toBe(0);
    expect(descendingComparator({ text: 'abc' }, { text: 'abc' }, 'text')).toBe(0);
  });

  it('should return a comparator function', () => {
    const comparator = getComparator(true, 'text');
    expect(typeof comparator).toBe('function');
  });

  it('should the comparator returns 1 when is descending and B > A', () => {
    const comparator = getComparator(true, 'number');
    expect(comparator({ number: 1 }, { number: 2 })).toBe(1);
    expect(comparator({ number: 'abc' }, { number: 'cba' })).toBe(1);
  });

  it('should the comparator returns -1 when is descending and A > B', () => {
    const comparator = getComparator(true, 'number');
    expect(comparator({ number: 2 }, { number: 1 })).toBe(-1);
    expect(comparator({ number: 'cba' }, { number: 'abc' })).toBe(-1);
  });

  it('should the comparator returns -1 when is ascending and B > A', () => {
    const comparator = getComparator(false, 'number');
    expect(comparator({ number: 1 }, { number: 2 })).toBe(-1);
    expect(comparator({ number: 'abc' }, { number: 'cba' })).toBe(-1);
  });

  it('should the comparator returns 1 when is ascending and A > B', () => {
    const comparator = getComparator(false, 'number');
    expect(comparator({ number: 2 }, { number: 1 })).toBe(1);
    expect(comparator({ number: 'cba' }, { number: 'abc' })).toBe(1);
  });
});
