import moment from 'moment';
import 'moment/locale/pt-br';

export const formatDate = tickItem => {
  return moment(tickItem)
    .locale('pt-br')
    .format('HH:mm:ss');
};

export const formatToISO = date => {
  return date ? moment(date).toISOString() : null;
};
