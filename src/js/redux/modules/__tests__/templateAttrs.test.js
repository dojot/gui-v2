import { constants } from '../templateAttrs';

describe('Template attrs module tests', () => {
  it('should declare the constants in the correct format', () => {
    Object.entries(constants).every(([name, value]) => {
      return value === `app/base/${name}`;
    });
  });
});
