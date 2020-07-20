import moment from 'moment';

export const formatDate = tickItem => {
  return moment(tickItem).format('HH:mm:ss');
};
