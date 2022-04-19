import React from 'react';

import { fireEvent, render } from '@testing-library/react';
import { DATA_ORDER } from 'Constants';

import DataTableHead from './DataTableHead';

describe('DataTableHead', () => {
  const TableWrapper = ({ children }) => {
    return (
      <table>
        {children}
        <tbody />
      </table>
    );
  };

  const fakeColumns = [
    { id: '1', label: 'Column_1' },
    { id: '2', label: 'Column_2' },
    { id: '3', label: 'Column_3' },
    { id: '4', label: 'Column_4' },
  ];

  const fakeColumnsWithAllAttrs = [
    { id: '1', label: 'Column_1', align: 'center', className: 'fake-class', disableOrderBy: true },
    { id: '2', label: 'Column_2', align: 'center', className: 'fake-class', disableOrderBy: true },
    { id: '3', label: 'Column_3', align: 'center', className: 'fake-class', disableOrderBy: true },
    { id: '4', label: 'Column_4', align: 'center', className: 'fake-class', disableOrderBy: true },
  ];

  it('should render simple columns', () => {
    const { getByText } = render(
      <TableWrapper>
        <DataTableHead cells={fakeColumns} />
      </TableWrapper>,
    );

    fakeColumns.forEach(column => {
      expect(getByText(column.label)).toBeVisible();
    });
  });

  it('should add a className to the table head', () => {
    const { container } = render(
      <TableWrapper>
        <DataTableHead className='custom-class' cells={[]} />
      </TableWrapper>,
    );

    expect(container.querySelector('thead')).toHaveClass('custom-class');
  });

  it('should render extra cells', () => {
    const { getByText } = render(
      <TableWrapper>
        <DataTableHead
          cells={[{ id: '1', label: 'Column_1' }]}
          startExtraCells={<th>Start_Extra_Cell</th>}
          endExtraCells={<th>End_Extra_Cell</th>}
        />
      </TableWrapper>,
    );

    expect(getByText('Start_Extra_Cell')).toBeVisible();
    expect(getByText('End_Extra_Cell')).toBeVisible();
  });

  it('should render a checkbox to select all rows', () => {
    const onSelectAllClick = jest.fn();

    const { container } = render(
      <TableWrapper>
        <DataTableHead cells={[]} onSelectAllClick={onSelectAllClick} />
      </TableWrapper>,
    );

    const checkbox = container.querySelector('input[type="checkbox"]');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(onSelectAllClick).toHaveBeenCalledTimes(1);
  });

  it('should the checkbox be checked when all rows are selected', () => {
    const { container } = render(
      <TableWrapper>
        <DataTableHead cells={[]} numSelected={10} rowCount={10} />
      </TableWrapper>,
    );

    const checkbox = container.querySelector('input[type="checkbox"]');
    expect(checkbox).toBeChecked();
  });

  it('should the checkbox be indeterminate when just some rows are selected', () => {
    const { container } = render(
      <TableWrapper>
        <DataTableHead cells={[]} numSelected={2} rowCount={10} />
      </TableWrapper>,
    );

    const checkbox = container.querySelector('input[type="checkbox"]');
    expect(checkbox).toHaveAttribute('data-indeterminate', 'true');
    expect(checkbox).not.toBeChecked();
  });

  it('should the checkbox be hidden/disabled', () => {
    const { container } = render(
      <TableWrapper>
        <DataTableHead cells={[]} disableCheckbox />
      </TableWrapper>,
    );

    const checkbox = container.querySelector('input[type="checkbox"]');
    expect(checkbox).toBeFalsy();
  });

  it('should sort by the first column in ascending order', () => {
    const onRequestSort = jest.fn();

    const { container } = render(
      <TableWrapper>
        <DataTableHead
          cells={fakeColumns}
          order={DATA_ORDER.ASC}
          orderBy={fakeColumns[0].id}
          onRequestSort={onRequestSort}
          disableCheckbox
        />
      </TableWrapper>,
    );

    const firstColumn = container.querySelector('th:first-of-type');
    const firstColumnSpan = firstColumn.querySelector('span');

    expect(firstColumn).toHaveAttribute('aria-sort', 'ascending');
    expect(firstColumnSpan).toHaveClass('MuiTableSortLabel-active');

    fireEvent.click(firstColumnSpan);
    expect(onRequestSort).toHaveBeenCalledTimes(1);
  });

  it('should sort by the first column in descending order', () => {
    const onRequestSort = jest.fn();

    const { container } = render(
      <TableWrapper>
        <DataTableHead
          cells={fakeColumns}
          order={DATA_ORDER.DESC}
          orderBy={fakeColumns[0].id}
          onRequestSort={onRequestSort}
          disableCheckbox
        />
      </TableWrapper>,
    );

    const firstColumn = container.querySelector('th:first-of-type');
    const firstColumnSpan = firstColumn.querySelector('span');

    expect(firstColumn).toHaveAttribute('aria-sort', 'descending');
    expect(firstColumnSpan).toHaveClass('MuiTableSortLabel-active');

    fireEvent.click(firstColumnSpan);
    expect(onRequestSort).toHaveBeenCalledTimes(1);
  });

  it('should sorting be disabled', () => {
    const { container } = render(
      <TableWrapper>
        <DataTableHead
          cells={fakeColumns}
          orderBy={fakeColumns[0].id}
          disableOrderBy
          disableCheckbox
        />
      </TableWrapper>,
    );

    const firstColumn = container.querySelector('th:first-of-type');
    const firstColumnSpan = firstColumn.querySelector('span');

    expect(firstColumn).toHaveAttribute('aria-sort', 'ascending');
    expect(firstColumnSpan).toHaveClass('Mui-disabled');

    // This click will do nothing because the prop onRequestSort was not provided
    fireEvent.click(firstColumnSpan);
  });

  it('should render cells with custom className, alignment and disabling sorting', () => {
    const { container } = render(
      <TableWrapper>
        <DataTableHead cells={fakeColumnsWithAllAttrs} disableCheckbox />
      </TableWrapper>,
    );

    fakeColumnsWithAllAttrs.forEach((column, index) => {
      const columnElement = container.querySelector(`th:nth-child(${index + 1})`);
      const ColumnSpanElement = columnElement.querySelector('span');
      expect(columnElement).toHaveClass(column.className);
      expect(columnElement).toHaveClass(`MuiTableCell-alignCenter`);
      expect(ColumnSpanElement).toHaveClass('Mui-disabled');
    });
  });
});
