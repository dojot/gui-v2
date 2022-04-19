import { constants } from '../templateAttrs';

describe('Template attrs module tests', () => {
  it('should declare the constants in the correct format', () => {
    Object.entries(constants).forEach(([key, value]) => {
      expect(value).toBe(`app/templateAttrs/${key}`);
    });
  });
});
