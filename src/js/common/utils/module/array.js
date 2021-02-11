export const object2Array = props =>
  Object.values(props).filter(x => x !== null);
