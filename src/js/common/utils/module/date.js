import moment from 'moment';
import 'moment/locale/pt-br';

export const formatDate = (tickItem, formatter = 'HH:mm:ss') =>
  moment(tickItem).isValid()
    ? moment(tickItem)
        .locale('pt-br')
        .format(formatter)
    : '-';

export const formatToISO = date => {
  return date ? moment(date).toISOString() : null;
};
