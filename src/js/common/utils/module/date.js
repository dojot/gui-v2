import moment from 'moment';

export const formatDate = tickItem => {
  return moment(tickItem).format('HH:mm:ss');
};

export const formatToISO = date => {
  return date ? moment(date).toISOString() : null;
};
