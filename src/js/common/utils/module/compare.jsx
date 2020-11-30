// A and B: should be the same type;
// Order: should be -1 or 1;
export const compareAll = (a, b, order) => {
  if (a === undefined || b === undefined || a === null || b === null) return 0; // non-compatible cases to compare

  if (typeof a !== typeof b) return 0; // non-compatible types to compare

  if (typeof a === 'string') {
    // toUpper: avoid uppercases situations
    // localeCompare: avoid non-ASCII characters errors
    const aa = a.toUpperCase();
    const bb = b.toUpperCase();
    return aa.localeCompare(bb) * order;
  }
  return (a - b) * order;
};
