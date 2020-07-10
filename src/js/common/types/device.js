// enum ValueTypeType = {
//   NUMBER,
//   STRING,
//   BOOLEAN,
//   GEO,
//   UNDEFINED
//
// }

export type attrType = {
  label: string,
  valueType: number,
};

export type deviceType = {
  id: string,
  label: string,
  attr: [attrType],
};

export type devicesRet = {
  devices: [deviceType],
  totalPages: number,
  currentPage: number,
};
