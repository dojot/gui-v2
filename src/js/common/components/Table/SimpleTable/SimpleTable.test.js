/* eslint-disable no-undef */
import React from 'react';

import { ThemeProvider } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { act } from '@testing-library/react';
import { mount } from 'enzyme';
import theme from 'Themes';
import '@testing-library/jest-dom/extend-expect';

import SimpleTable from '.';

const mockColumns = [
  { dataKey: '5a709bletters', name: 'letters' },
  { dataKey: '5a709btemp', name: 'temperatura' },
  { dataKey: '4f0e72hum', name: 'umidade' },
];
const mockRows = [
  {
    timestamp: '2020-08-10T17:46:26',
    '5a709bletters': 'j',
    '5a709btemp': null,
    '4f0e72hum': '50',
  },
  {
    timestamp: '2020-08-10T17:46:11',
    '5a709bletters': 'ç',
    '5a709btemp': '15',
    '4f0e72hum': '43',
  },
  {
    timestamp: '2020-08-10T17:45:56',
    '5a709bletters': 'd',
    '5a709btemp': '17',
    '4f0e72hum': '40',
  },
  {
    timestamp: '2020-08-10T17:45:41',
    '5a709bletters': 'Z',
    '5a709btemp': '21',
    '4f0e72hum': '39',
  },
];

describe('Simple Table', () => {
  const wrapper = mount(
    <ThemeProvider theme={theme}>
      <SimpleTable columns={mockColumns} rows={mockRows} hasTimestamp />
    </ThemeProvider>,
  );

  it('should be able to display a table with 4 rows', () => {
    expect(wrapper.find(TableBody).find(TableRow)).toHaveLength(mockRows.length);
  });

  it('should be able to display the header with 4 titles', () => {
    expect(wrapper.find(TableHead).find(TableCell)).toHaveLength(mockColumns.length + 1);
  });

  it('should be able to display the value of row 1, column 4', () => {
    expect(wrapper.find(TableBody).find(TableCell).at(3).text()).toEqual('50');
  });

  it('should be able to display the null value of row 1, column 3', () => {
    expect(wrapper.find(TableBody).find(TableCell).at(2).text()).toEqual('-');
  });

  it('should be able sorting to asc and desc order the timestamp column', () => {
    act(() => {
      wrapper.find(TableHead).find(TableCell).at(0).find('button').simulate('click');
    });
    wrapper.update();
    expect(wrapper.find(TableBody).find(TableCell).at(0).text()).toEqual('10/08/2020 17:45:41');

    act(() => {
      wrapper.find(TableHead).find(TableCell).at(0).find('button').simulate('click');
    });
    wrapper.update();
    expect(wrapper.find(TableBody).find(TableCell).at(0).text()).toEqual('10/08/2020 17:46:26');
  });

  it('should be able sorting to asc and desc order the string column', () => {
    act(() => {
      wrapper.find(TableHead).find(TableCell).at(1).find('button').simulate('click');
    });
    wrapper.update();
    expect(wrapper.find(TableBody).find(TableCell).at(1).text()).toEqual('ç');

    act(() => {
      wrapper.find(TableHead).find(TableCell).at(1).find('button').simulate('click');
    });
    wrapper.update();
    expect(wrapper.find(TableBody).find(TableCell).at(1).text()).toEqual('Z');
  });
});
