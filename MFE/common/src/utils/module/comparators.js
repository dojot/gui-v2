export const descendingComparator = (a, b, orderBy, valueFormatterFn) => {
  const aValue = valueFormatterFn ? valueFormatterFn(a) : a[orderBy];
  const bValue = valueFormatterFn ? valueFormatterFn(b) : b[orderBy];
  if (bValue < aValue) return -1;
  if (bValue > aValue) return 1;
  return 0;
};

export const getComparator = (isDescending, orderBy, valueFormatterFn) => {
  return isDescending
    ? (a, b) => descendingComparator(a, b, orderBy, valueFormatterFn)
    : (a, b) => -descendingComparator(a, b, orderBy, valueFormatterFn);
};
