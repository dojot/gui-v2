import { hexToRgb, rgbToHex } from 'Utils';

describe('converter util tests', () => {
  it('should be able to converter hex to rgb', () => {
    const expectedOne = {
      r: 69,
      g: 91,
      b: 188,
    };
    const rgb = hexToRgb('#455BBC');
    expect(expectedOne).toEqual(rgb);
  });

  it('should not be able to converter hex to rgb', () => {
    const expectedOne = null;
    const rgb = hexToRgb('##455BBC');
    expect(expectedOne).toEqual(rgb);
  });

  it('should be able to converter rgb to hex', () => {
    const r = 69;
    const g = 91;
    const b = 188;
    const hexColor = '#455bbc';
    const result = rgbToHex(r, g, b);
    expect(result).toEqual(hexColor);
  });
});
