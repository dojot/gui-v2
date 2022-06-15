import { Map } from 'immutable';

import {
  devicesSelector,
  favoriteDeviceSelector,
  paginationControlSelector,
  deviceDataSelector,
} from '../devicesSelector';

describe('Devices selector tests', () => {
  const fakeDeviceData = {
    id: 'id123',
    attrs: [{ id: 'id456' }],
    certificate: { id: 'id789' },
  };

  const fakeDevices = [fakeDeviceData];

  const fakeFavoriteDevices = [{ label: 'device', id: 'id123' }];

  const fakePaginationControl = {
    totalPages: 150,
    currentPage: 27,
    itemsPerPage: 10,
  };

  const fakeState = {
    devices: Map({
      devices: fakeDevices,
      favoriteDevices: fakeFavoriteDevices,
      deviceData: fakeDeviceData,
      paginationControl: fakePaginationControl,
    }),
  };

  it('should return the list of devices', () => {
    expect(devicesSelector(fakeState)).toEqual(fakeDevices);
  });

  it('should return the list of favorite devices', () => {
    expect(favoriteDeviceSelector(fakeState)).toEqual(fakeFavoriteDevices);
  });

  it('should return the data of a device', () => {
    expect(deviceDataSelector(fakeState)).toEqual(fakeDeviceData);
  });

  it('should return the pagination control data', () => {
    expect(paginationControlSelector(fakeState)).toEqual(fakePaginationControl);
  });
});
