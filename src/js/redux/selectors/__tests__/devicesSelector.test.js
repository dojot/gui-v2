import { Map } from 'immutable';

import {
  devicesForDataTableSelector,
  devicesSelector,
  paginationControlSelector,
  deviceDataSelector,
} from '../devicesSelector';

describe('Devices selector tests', () => {
  const fakeDeviceData = {
    id: 'id123',
    attrs: [{ id: 'id456' }],
    certificate: { id: 'id789' },
  };

  const fakeDeviceDataForDataTable = {
    ...fakeDeviceData,
    attrsLength: fakeDeviceData.attrs.length,
    hasCertificate: !!fakeDeviceData.certificate,
  };

  const fakeDevices = [fakeDeviceData];

  const fakePaginationControl = {
    totalPages: 150,
    currentPage: 27,
  };

  const fakeState = {
    devices: Map({
      devices: fakeDevices,
      deviceData: fakeDeviceData,
      paginationControl: fakePaginationControl,
    }),
  };

  it('should return the list of devices', () => {
    expect(devicesSelector(fakeState)).toEqual(fakeDevices);
  });

  it('should return the list of devices for the data table', () => {
    expect(devicesForDataTableSelector(fakeState)).toEqual([fakeDeviceDataForDataTable]);

    const deviceWithoutAttrs = { ...fakeDeviceData };
    delete deviceWithoutAttrs.attrs;
    const fakeStateWithoutAttrs = fakeState.devices.set('devices', [deviceWithoutAttrs]);

    expect(devicesForDataTableSelector({ devices: fakeStateWithoutAttrs })).toEqual([
      {
        ...deviceWithoutAttrs,
        attrsLength: 0,
        hasCertificate: true,
      },
    ]);
  });

  it('should return the data of a device', () => {
    expect(deviceDataSelector(fakeState)).toEqual(fakeDeviceData);
  });

  it('should return the pagination control data', () => {
    expect(paginationControlSelector(fakeState)).toEqual(fakePaginationControl);
  });
});
