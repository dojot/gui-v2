import { formatNumber } from 'Utils/module/number';

describe('checking number function', () => {
  it('should return a value rounded', () => {
    const tests = [
      [1000, '1.00k'],
      [0.5, '0.50'],
      [null, '0.00'],
      ['1,000', '1.00k'],
      ['not a number', '0.00'],
    ];
    let num;

    tests.forEach(element => {
      num = formatNumber(element[0]);
      expect(num).toEqual(element[1]);
    });
  });

  it('should format passing a type rounding', () => {
    const tests = [
      [2280002, '0.00a', '2.28m'],
      [10000.23, '0,0', '10,000'],
      [1000.234, '0,0.00', '1,000.23'],
      [0.97487823, '0.000', '0.975'],
      [-0.433, '0.0', '-0.4'],
    ];
    tests.forEach(element => {
      expect(formatNumber(element[0], element[1])).toEqual(element[2]);
    });
  });
});
