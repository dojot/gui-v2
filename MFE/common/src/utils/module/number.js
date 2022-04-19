import numeral from 'numeral';

export const formatNumber = (tickItem, type = '0.00a') => numeral(tickItem).format(type);
