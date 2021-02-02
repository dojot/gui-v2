import _ from 'lodash';
import { Device as DeviceService } from 'Services/index';
import { formatToISO } from 'Utils';
import { object2Array } from 'Utils/module/array';

export const generateScheme = props => {
  const {
    filterType,
    lastRegs,
    lastDynamicsValue,
    operationType,
    dateFrom,
    dateTo,
    isRealTime,
  } = props.filters;
  const lastN =
    filterType === 0 ? parseInt(lastRegs, 10) : parseInt(lastDynamicsValue, 10);

  return DeviceService.parseHistoryQuery({
    devices: _.values(
      _.mapValues(
        _.groupBy(object2Array(props.attributes), 'deviceID'),
        (value, key) => ({
          deviceID: key,
          dynamicAttrs: value.map(val => val.label),
        }),
      ),
    ),
    dateFrom: formatToISO(dateFrom),
    dateTo: formatToISO(dateTo),
    operationType,
    lastN,
    isRealTime,
  });
};
