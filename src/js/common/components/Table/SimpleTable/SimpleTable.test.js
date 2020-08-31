/* eslint-disable no-undef */
import React from 'react';

import { ThemeProvider } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { mount } from 'enzyme';
import theme from 'Themes';
import '@testing-library/jest-dom/extend-expect';

import SimpleTable from '.';

const mockColumns = [
  { dataKey: '5a709bspeed', name: 'velocidade' },
  { dataKey: '5a709btemp', name: 'temperatura' },
  { dataKey: '4f0e72hum', name: 'umidade' },
];
const mockRows = [
  {
    timestamp: '2020-08-10T17:46:26',
    '5a709bspeed': '5',
    '5a709btemp': null,
    '4f0e72hum': '50',
  },
  {
    timestamp: '2020-08-10T17:46:11',
    '5a709bspeed': '9',
    '5a709btemp': '15',
    '4f0e72hum': '43',
  },
  {
    timestamp: '2020-08-10T17:45:56',
    '5a709bspeed': '8',
    '5a709btemp': '17',
    '4f0e72hum': '40',
  },
  {
    timestamp: '2020-08-10T17:45:41',
    '5a709bspeed': '12',
    '5a709btemp': '21',
    '4f0e72hum': '39',
  },
];

describe('Simple Table', () => {
  const wrapper = mount(
    <ThemeProvider theme={theme}>
      <SimpleTable columns={mockColumns} rows={mockRows} />
    </ThemeProvider>,
  );

  it('should be able to display a table with 4 rows', () => {
    expect(wrapper.find(TableBody).find(TableRow)).toHaveLength(
      mockRows.length,
    );
  });

  it('should be able to display the header with 4 titles', () => {
    expect(wrapper.find(TableHead).find(TableCell)).toHaveLength(
      mockColumns.length,
    );
  });

  it('should be able to display the value of row 1, column 1', () => {
    expect(
      wrapper
        .find(TableBody)
        .find(TableCell)
        .at(0)
        .text(),
    ).toEqual('5');
  });

  it('should be able to display the null value of row 1, column 2', () => {
    expect(
      wrapper
        .find(TableBody)
        .find(TableCell)
        .at(1)
        .text(),
    ).toEqual('-');
  });
});
