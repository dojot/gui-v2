import moment from 'moment';

export const formatDate = (tickItem, formatter = 'HH:mm:ss') =>
  moment(tickItem).isValid() ? moment(tickItem).local().format(formatter) : '-';

export const formatToISO = date => {
  return date ? moment(date).toISOString() : null;
};
