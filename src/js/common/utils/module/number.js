import numeral from 'numeral';

export const formatNumber = (tickItem, type = '0.0a') =>
  numeral(tickItem).format(type);
