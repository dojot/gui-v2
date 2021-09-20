import React from 'react';

import { SimpleTable } from '../../common/components/Table';

const columns = [
  { dataKey: 'id', name: 'ID' },
  { dataKey: 'firstName', name: 'First name' },
  { dataKey: 'lastName', name: 'Last name' },
  { dataKey: 'age', name: 'Age' },
];

const rows = [
  { id: 1, lastName: 'Testing', firstName: 'Testing', age: 21 },
  { id: 2, lastName: 'Testing', firstName: 'Testing', age: 21 },
  { id: 3, lastName: 'Testing', firstName: 'Testing', age: 21 },
  { id: 4, lastName: 'Testing', firstName: 'Testing', age: 21 },
  { id: 5, lastName: 'Testing', firstName: 'Testing', age: 21 },
  { id: 6, lastName: 'Testing', firstName: 'Testing', age: 21 },
  { id: 7, lastName: 'Testing', firstName: 'Testing', age: 21 },
  { id: 8, lastName: 'Testing', firstName: 'Testing', age: 21 },
  { id: 9, lastName: 'Testing', firstName: 'Testing', age: 21 },
];

const DataTable = () => {
  return <SimpleTable columns={columns} rows={rows} withRank />;
};

export default DataTable;
