import { SOURCE, OPERATION } from 'Constants';
import _ from 'lodash';
import { Device as DeviceService } from 'Services';
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
    case OPERATION.LAST.N:
      lastN = parseInt(lastRegs, 10);
      operationType = parseInt(filterType, 10);
      break;
    case OPERATION.ORDER:
      lastN = parseInt(lastDynamicsValue, 10);
      operationType = parseInt(lastDynamicsOption, 10);
      break;
    case OPERATION.DATE:
      operationType = 99;
      break;
    case OPERATION.NO_OP:
      lastN = 1;
      operationType = 0;
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
    if (props.selector === SOURCE.TEMPLATE) {
      templates[key] = {
        templateID: key,
        staticAttrs,
        dynamicAttrs,
      };
    } else {
      devices[key] = {
        deviceID: key,
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
    { sourceType: props.selector, operationType, widgetType: props.widgetType },
    isRealTime,
  );
};
