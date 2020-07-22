import moment from 'moment';

moment.locale('pt-br');

export const formatDate = tickItem => {
  return moment(tickItem).format('HH:mm:ss');
};

export const formatToISO = date => {
  return date
    ? moment(date)
        .toISOString(true)
        .replace('-03:00', 'Z')
    : '';
};
