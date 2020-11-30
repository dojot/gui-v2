import { compareAll } from './compare';

const ASC = 1;
const DESC = -1;

const caseOne = {
  vet: [2, -434, 1231],
  expectedAsc: [-434, 2, 1231],
  expectedDesc: [1231, 2, -434],
};

const caseTwo = {
  vet: ['CA', 'ab', 'çd', 'sw', 'ãããá'],
  expectedAsc: ['ãããá', 'ab', 'CA', 'çd', 'sw'],
  expectedDesc: ['sw', 'çd', 'CA', 'ab', 'ãããá'],
};

const caseThree = {
  vet: [2 / 5, 0.23, -1, 0, 234 / 12323],
  expectedAsc: [-1, 0, 0.01898888257729449, 0.23, 0.4],
  expectedDesc: [0.4, 0.23, 0.01898888257729449, 0, -1],
};

const caseFour = {
  vet: ['as', -2, undefined, null, 0.23, undefined, null, '1'],
  expectedAsc: ['as', -2, null, 0.23, null, '1', undefined, undefined],
  expectedDesc: ['as', -2, null, 0.23, null, '1', undefined, undefined],
};

describe('compare util tests', () => {
  it('should be able to sort numbers in a vector', () => {
    const { vet, expectedAsc, expectedDesc } = caseOne;
    vet.sort((a, b) => {
      return compareAll(a, b, ASC);
    });
    expect(vet).toEqual(expectedAsc);

    vet.sort((a, b) => {
      return compareAll(a, b, DESC);
    });
    expect(vet).toEqual(expectedDesc);
  });

  it('should be able to sort strings in a vector', () => {
    const { vet, expectedAsc, expectedDesc } = caseTwo;
    vet.sort((a, b) => {
      return compareAll(a, b, ASC);
    });
    expect(vet).toEqual(expectedAsc);
    vet.sort((a, b) => {
      return compareAll(a, b, DESC);
    });
    expect(vet).toEqual(expectedDesc);
  });

  it('should be able to sort floats in a vector', () => {
    const { vet, expectedAsc, expectedDesc } = caseThree;
    vet.sort((a, b) => {
      return compareAll(a, b, ASC);
    });
    expect(vet).toEqual(expectedAsc);
    vet.sort((a, b) => {
      return compareAll(a, b, DESC);
    });
    expect(vet).toEqual(expectedDesc);
  });

  it('shouldnt be capable to order an invalid vector', () => {
    const { vet, expectedAsc, expectedDesc } = caseFour;
    vet.sort((a, b) => {
      return compareAll(a, b, ASC);
    });
    expect(vet).toEqual(expectedAsc);
    vet.sort((a, b) => {
      return compareAll(a, b, DESC);
    });
    expect(vet).toEqual(expectedDesc);
  });
});
