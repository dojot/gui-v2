import { constants } from '../dashboard';

describe('Dashboard module tests', () => {
  it('should declare the constants in the correct format', () => {
    Object.entries(constants).forEach(([key, value]) => {
      expect(value).toBe(`app/dashboard/${key}`);
    });
  });
});
