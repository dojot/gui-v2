import { origin } from 'Constants';
import _ from 'lodash';
import { Device as DeviceService } from 'Services/index';
import { formatToISO, object2Array } from 'Utils';

export const generateScheme = props => {
  const {
    filterType,
    lastRegs,
    lastDynamicsValue,
    lastDynamicsOption,
    dateFrom,
    dateTo,
    isRealTime,
  } = props.filters;
  let lastN;
  let operationType;
  const attrs = _.groupBy(object2Array(props.attributes), 'deviceID');
  const devices = {};
  const templates = {};

  switch (filterType) {
    case '0':
      lastN = parseInt(lastRegs, 10);
      operationType = parseInt(filterType, 10);
      break;
    case '1':
      lastN = parseInt(lastDynamicsValue, 10);
      operationType = parseInt(lastDynamicsOption, 10);
      break;
    case '2':
      operationType = 99;
      break;
    case '3':
      lastN = 1;
      operationType = 8;
      break;
    default:
      operationType = 99;
      break;
  }

  Object.keys(attrs).forEach(key => {
    const staticAttrs = [];
    const dynamicAttrs = [];
    attrs[key].forEach(attribute => {
      if (attribute.isDynamic) {
        dynamicAttrs.push(attribute.label);
      } else {
        staticAttrs.push(attribute.label);
      }
    });
    if (props.selector === origin.DEVICE) {
      devices[key] = {
        deviceID: key,
        staticAttrs,
        dynamicAttrs,
      };
    } else {
      templates[key] = {
        templateID: key,
        staticAttrs,
        dynamicAttrs,
      };
    }
  });

  return DeviceService.parseHistoryQuery(
    {
      templates: Object.values(templates),
      devices: Object.values(devices),
      dateFrom: formatToISO(dateFrom),
      dateTo: formatToISO(dateTo),
      lastN,
    },
    { sourceType: props.selector, operationType },
    isRealTime,
  );
};
