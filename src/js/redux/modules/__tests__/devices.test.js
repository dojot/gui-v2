import { constants, actions, reducers, initialState } from '../devices';

describe('Devices module tests', () => {
  const fakeDevice = { id: 'id123' };

  const fakePaginationControl = {
    totalPages: 150,
    currentPage: 27,
  };

  it('should declare the constants in the correct format', () => {
    Object.entries(constants).every(([name, value]) => {
      return value === `app/base/${name}`;
    });
  });

  it('should update the devices list', () => {
    const action = actions.updateDevices({ devices: [fakeDevice] });
    const newState = reducers[action.type](initialState(), action);
    expect(newState.get('devices')).toEqual([fakeDevice]);
  });

  it('should update the pagination control', () => {
    const action = actions.updateDevices({ paginationControl: fakePaginationControl });
    const newState = reducers[action.type](initialState(), action);
    expect(newState.get('paginationControl')).toEqual(fakePaginationControl);
  });
});
